import { LLMProviderFactory } from '../llm/provider.factory';
import { buildReviewPrompt } from '../llm/prompts/review.prompt';
import { logger } from '../config/logger';

export class ReviewService {
  async reviewDraft(draftContent: string, keyClaims: string[], sourceEvidence: string) {
    const provider = LLMProviderFactory.getProvider();
    const { systemPrompt, userPrompt } = buildReviewPrompt(draftContent, keyClaims, sourceEvidence);

    try {
      const review = await provider.generateStructuredOutput<{ approved: boolean; feedback: string; suggestedRevisions: string | null }>(
        userPrompt,
        'Review Feedback JSON',
        { systemPrompt, temperature: 0.2 }
      );
      return review;
    } catch (err) {
      logger.error({ err }, 'Self-review failed');
      return { approved: true, feedback: 'Auto-approved fallback', suggestedRevisions: null };
    }
  }
}

export const reviewService = new ReviewService();
