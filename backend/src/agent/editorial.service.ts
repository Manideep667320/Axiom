import { LLMProviderFactory } from '../llm/provider.factory';
import { buildEditorialPrompt } from '../llm/prompts/editorial.prompt';
import { agentRepository } from '../repositories/agent.repository';
import { topicRepository } from '../repositories/topic.repository';
import { decisionRepository } from '../repositories/decision.repository';
import { memoryService } from '../memory/memory.service';
import { config } from '../config/env';
import { logger } from '../config/logger';

export class EditorialService {
  async evaluateTopic(topicId: string) {
    const topic = await topicRepository.getTopicById(topicId);
    if (!topic) throw new Error(`Topic ${topicId} not found`);

    const agent = await agentRepository.getAgent(config.AGENT_ID);
    if (!agent || !agent.persona) throw new Error('Agent or Persona missing');

    await topicRepository.updateJobState(topicId, 'EVALUATING');

    // 1. Check Similarity against Memory (Hard Gate)
    const { maxSimilarity } = await memoryService.searchRelatedPostMemory(topic.title + ' ' + topic.summary);
    if (maxSimilarity >= 0.90) {
      logger.info({ topicId, maxSimilarity }, 'Topic rejected by Hard Gate: Semantic duplicate similarity >= 0.90');
      await decisionRepository.createDecision({
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
      await topicRepository.updateJobState(topicId, 'REJECTED');
      return { accepted: false, decision: 'reject' };
    }

    // 2. Perform LLM Editorial Evaluation
    const provider = LLMProviderFactory.getProvider();
    const { systemPrompt, userPrompt } = buildEditorialPrompt(agent.persona, {
      title: topic.title,
      summary: topic.summary,
      rawContent: topic.rawContent || '',
      sourceName: topic.source.name,
    });

    try {
      const evaluation = await provider.generateStructuredOutput<any>(userPrompt, 'Editorial Evaluation JSON', {
        systemPrompt,
        temperature: 0.3,
      });

      const overallScore = evaluation.overallScore ?? 7.5;
      const passedGates = evaluation.passedHardGates ?? true;
      const action = passedGates && overallScore >= 8.0 ? 'publish_now' : passedGates && overallScore >= 6.0 ? 'queue' : 'reject';

      await decisionRepository.createDecision({
        agentId: agent.id,
        topicId: topic.id,
        passedHardGates: passedGates,
        rejectionReason: passedGates ? null : evaluation.rejectionReason || 'Failed editorial criteria',
        action: action as any,
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
        await topicRepository.updateJobState(topicId, 'REJECTED');
        return { accepted: false, decision: 'reject' };
      }

      await topicRepository.updateJobState(topicId, 'ACCEPTED');
      return { accepted: true, decision: action, overallScore };
    } catch (err) {
      logger.error({ err, topicId }, 'Editorial evaluation failed');
      await topicRepository.updateJobState(topicId, 'FAILED');
      throw err;
    }
  }
}

export const editorialService = new EditorialService();
