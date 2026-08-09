"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = exports.RateLimiter = void 0;
const post_repository_1 = require("../repositories/post.repository");
const policies_1 = require("./policies");
class RateLimiter {
    async canPublishNow() {
        const lastPost = await post_repository_1.postRepository.getLastPublishedPost();
        if (lastPost) {
            const diffMinutes = (Date.now() - lastPost.publishedAt.getTime()) / (1000 * 60);
            if (diffMinutes < policies_1.publishingPolicies.minimumIntervalMinutes) {
                return {
                    allowed: false,
                    reason: `Minimum publish interval (${policies_1.publishingPolicies.minimumIntervalMinutes}m) not reached. Last published ${diffMinutes.toFixed(1)}m ago.`,
                };
            }
        }
        const posts24h = await post_repository_1.postRepository.getRecentPostCountInWindow(24);
        if (posts24h >= policies_1.publishingPolicies.maxPostsPer24Hours) {
            return {
                allowed: false,
                reason: `Daily publication cap (${policies_1.publishingPolicies.maxPostsPer24Hours} posts/24h) reached. Current: ${posts24h}.`,
            };
        }
        return { allowed: true };
    }
}
exports.RateLimiter = RateLimiter;
exports.rateLimiter = new RateLimiter();
