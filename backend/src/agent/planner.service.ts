import { LLMProviderFactory } from '../llm/provider.factory';
import { buildPlannerPrompt } from '../llm/prompts/planner.prompt';
import { postRepository } from '../repositories/post.repository';
import { logger } from '../config/logger';

export class PlannerService {
  async planAction(topicTitle: string, overallScore: number) {
    const recentPosts = await postRepository.getFeedPosts(3);
    const recentSummary = recentPosts.map((p) => `- ${p.content.slice(0, 100)}...`).join('\n');

    const provider = LLMProviderFactory.getProvider();
    const { systemPrompt, userPrompt } = buildPlannerPrompt(topicTitle, overallScore, recentSummary);

    try {
      const plan = await provider.generateStructuredOutput<{ action: string; reason: string }>(
        userPrompt,
        'Strategic Action JSON',
        { systemPrompt, temperature: 0.2 }
      );
      return plan;
    } catch {
      logger.warn('Strategic planner fallback: default to publish_now');
      return { action: 'publish_now', reason: 'High editorial score and primary source grounding.' };
    }
  }
}

export const plannerService = new PlannerService();
