"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plannerService = exports.PlannerService = void 0;
const provider_factory_1 = require("../llm/provider.factory");
const planner_prompt_1 = require("../llm/prompts/planner.prompt");
const post_repository_1 = require("../repositories/post.repository");
const logger_1 = require("../config/logger");
class PlannerService {
    async planAction(topicTitle, overallScore) {
        const recentPosts = await post_repository_1.postRepository.getFeedPosts(3);
        const recentSummary = recentPosts.map((p) => `- ${p.content.slice(0, 100)}...`).join('\n');
        const provider = provider_factory_1.LLMProviderFactory.getProvider();
        const { systemPrompt, userPrompt } = (0, planner_prompt_1.buildPlannerPrompt)(topicTitle, overallScore, recentSummary);
        try {
            const plan = await provider.generateStructuredOutput(userPrompt, 'Strategic Action JSON', { systemPrompt, temperature: 0.2 });
            return plan;
        }
        catch {
            logger_1.logger.warn('Strategic planner fallback: default to publish_now');
            return { action: 'publish_now', reason: 'High editorial score and primary source grounding.' };
        }
    }
}
exports.PlannerService = PlannerService;
exports.plannerService = new PlannerService();
