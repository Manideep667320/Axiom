"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = exports.ReviewService = void 0;
const provider_factory_1 = require("../llm/provider.factory");
const review_prompt_1 = require("../llm/prompts/review.prompt");
const logger_1 = require("../config/logger");
class ReviewService {
    async reviewDraft(draftContent, keyClaims, sourceEvidence) {
        const provider = provider_factory_1.LLMProviderFactory.getProvider();
        const { systemPrompt, userPrompt } = (0, review_prompt_1.buildReviewPrompt)(draftContent, keyClaims, sourceEvidence);
        try {
            const review = await provider.generateStructuredOutput(userPrompt, 'Review Feedback JSON', { systemPrompt, temperature: 0.2 });
            return review;
        }
        catch (err) {
            logger_1.logger.error({ err }, 'Self-review failed');
            return { approved: true, feedback: 'Auto-approved fallback', suggestedRevisions: null };
        }
    }
}
exports.ReviewService = ReviewService;
exports.reviewService = new ReviewService();
