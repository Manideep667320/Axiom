import { LLMProviderFactory } from '../llm/provider.factory';
import { buildGenerationPrompt } from '../llm/prompts/generation.prompt';
import { agentRepository } from '../repositories/agent.repository';
import { topicRepository } from '../repositories/topic.repository';
import { memoryService } from '../memory/memory.service';
import { config } from '../config/env';

export class GenerationService {
  async generateContent(topicId: string) {
    const topic = await topicRepository.getTopicById(topicId);
    if (!topic) throw new Error(`Topic ${topicId} not found`);

    const agent = await agentRepository.getAgent(config.AGENT_ID);
    if (!agent || !agent.persona) throw new Error('Agent or persona missing');

    await topicRepository.updateJobState(topicId, 'GENERATING');

    const memoryContext = await memoryService.searchRelatedPostMemory(topic.title + ' ' + topic.summary);
    const { systemPrompt, userPrompt } = buildGenerationPrompt(agent.persona, topic, memoryContext.summaryText);

    const provider = LLMProviderFactory.getProvider();
    const result = await provider.generateStructuredOutput<{ content: string; perspective: string; keyClaims: string[] }>(
      userPrompt,
      'Content Generation JSON',
      { systemPrompt, temperature: 0.5 }
    );

    return {
      topic,
      content: result.content,
      perspective: result.perspective,
      keyClaims: result.keyClaims || [],
    };
  }
}

export const generationService = new GenerationService();
