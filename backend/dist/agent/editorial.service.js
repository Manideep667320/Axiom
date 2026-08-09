"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editorialService = exports.EditorialService = void 0;
const provider_factory_1 = require("../llm/provider.factory");
const editorial_prompt_1 = require("../llm/prompts/editorial.prompt");
const agent_repository_1 = require("../repositories/agent.repository");
const topic_repository_1 = require("../repositories/topic.repository");
const decision_repository_1 = require("../repositories/decision.repository");
const memory_service_1 = require("../memory/memory.service");
const env_1 = require("../config/env");
const logger_1 = require("../config/logger");
class EditorialService {
    async evaluateTopic(topicId) {
        const topic = await topic_repository_1.topicRepository.getTopicById(topicId);
        if (!topic)
            throw new Error(`Topic ${topicId} not found`);
        const agent = await agent_repository_1.agentRepository.getAgent(env_1.config.AGENT_ID);
        if (!agent || !agent.persona)
            throw new Error('Agent or Persona missing');
        await topic_repository_1.topicRepository.updateJobState(topicId, 'EVALUATING');
        // 1. Check Similarity against Memory (Hard Gate)
        const { maxSimilarity } = await memory_service_1.memoryService.searchRelatedPostMemory(topic.title + ' ' + topic.summary);
        if (maxSimilarity >= 0.90) {
            logger_1.logger.info({ topicId, maxSimilarity }, 'Topic rejected by Hard Gate: Semantic duplicate similarity >= 0.90');
            await decision_repository_1.decisionRepository.createDecision({
                agentId: agent.id,
                topicId: topic.id,
                passedHardGates: false,
                rejectionReason: `Duplicate semantic similarity (${(maxSimilarity * 100).toFixed(1)}%) exceeded 90% threshold.`,
                action: 'reject',
                overallScore: 3.0,
                relevanceScore: 3.0,
                noveltyScore: 1.0,
                technicalDepthScore: 5.0,
                impactScore: 4.0,
                credibilityScore: 7.0,
                narrativeContinuityScore: 2.0,
                rationale: {
                    whySelected: 'N/A - Hard gate duplicate rejection',
                    whyRelevantNow: 'N/A',
                    editorialScore: 3.0,
                    sources: [{ title: topic.source.name, url: topic.url }],
                },
            });
            await topic_repository_1.topicRepository.updateJobState(topicId, 'REJECTED');
            return { accepted: false, decision: 'reject' };
        }
        // 2. Perform LLM Editorial Evaluation
        const provider = provider_factory_1.LLMProviderFactory.getProvider();
        const { systemPrompt, userPrompt } = (0, editorial_prompt_1.buildEditorialPrompt)(agent.persona, {
            title: topic.title,
            summary: topic.summary,
            rawContent: topic.rawContent || '',
            sourceName: topic.source.name,
        });
        try {
            const evaluation = await provider.generateStructuredOutput(userPrompt, 'Editorial Evaluation JSON', {
                systemPrompt,
                temperature: 0.3,
            });
            const overallScore = evaluation.overallScore ?? 7.5;
            const passedGates = evaluation.passedHardGates ?? true;
            const action = passedGates && overallScore >= 8.0 ? 'publish_now' : passedGates && overallScore >= 6.0 ? 'queue' : 'reject';
            await decision_repository_1.decisionRepository.createDecision({
                agentId: agent.id,
                topicId: topic.id,
                passedHardGates: passedGates,
                rejectionReason: passedGates ? null : evaluation.rejectionReason || 'Failed editorial criteria',
                action: action,
                overallScore,
                relevanceScore: evaluation.scores?.relevance || 7.0,
                noveltyScore: evaluation.scores?.novelty || 7.0,
                technicalDepthScore: evaluation.scores?.technicalDepth || 7.0,
                impactScore: evaluation.scores?.impact || 7.0,
                credibilityScore: evaluation.scores?.credibility || 7.0,
                narrativeContinuityScore: evaluation.scores?.narrativeContinuity || 7.0,
                rationale: {
                    whySelected: evaluation.rationale?.whySelected || 'Selected based on high technical relevance and engineering impact.',
                    whyRelevantNow: evaluation.rationale?.whyRelevantNow || 'Recent industry model release/development.',
                    whyThisOverAlternatives: evaluation.rationale?.whyThisOverAlternatives || 'Stronger primary evidence.',
                    editorialScore: overallScore,
                    sources: [{ title: topic.source.name, url: topic.url }],
                },
            });
            if (!passedGates || action === 'reject') {
                await topic_repository_1.topicRepository.updateJobState(topicId, 'REJECTED');
                return { accepted: false, decision: 'reject' };
            }
            await topic_repository_1.topicRepository.updateJobState(topicId, 'ACCEPTED');
            return { accepted: true, decision: action, overallScore };
        }
        catch (err) {
            logger_1.logger.error({ err, topicId }, 'Editorial evaluation failed');
            await topic_repository_1.topicRepository.updateJobState(topicId, 'FAILED');
            throw err;
        }
    }
}
exports.EditorialService = EditorialService;
exports.editorialService = new EditorialService();
