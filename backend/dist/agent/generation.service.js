"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generationService = exports.GenerationService = void 0;
const provider_factory_1 = require("../llm/provider.factory");
const generation_prompt_1 = require("../llm/prompts/generation.prompt");
const agent_repository_1 = require("../repositories/agent.repository");
const topic_repository_1 = require("../repositories/topic.repository");
const memory_service_1 = require("../memory/memory.service");
const env_1 = require("../config/env");
class GenerationService {
    async generateContent(topicId) {
        const topic = await topic_repository_1.topicRepository.getTopicById(topicId);
        if (!topic)
            throw new Error(`Topic ${topicId} not found`);
        const agent = await agent_repository_1.agentRepository.getAgent(env_1.config.AGENT_ID);
        if (!agent || !agent.persona)
            throw new Error('Agent or persona missing');
        await topic_repository_1.topicRepository.updateJobState(topicId, 'GENERATING');
        const memoryContext = await memory_service_1.memoryService.searchRelatedPostMemory(topic.title + ' ' + topic.summary);
        const { systemPrompt, userPrompt } = (0, generation_prompt_1.buildGenerationPrompt)(agent.persona, topic, memoryContext.summaryText);
        const provider = provider_factory_1.LLMProviderFactory.getProvider();
        const result = await provider.generateStructuredOutput(userPrompt, 'Content Generation JSON', { systemPrompt, temperature: 0.5 });
        return {
            topic,
            content: result.content,
            perspective: result.perspective,
            keyClaims: result.keyClaims || [],
        };
    }
}
exports.GenerationService = GenerationService;
exports.generationService = new GenerationService();
