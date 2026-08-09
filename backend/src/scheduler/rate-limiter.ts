import { postRepository } from '../repositories/post.repository';
import { publishingPolicies } from './policies';
import { logger } from '../config/logger';

export class RateLimiter {
  async canPublishNow(): Promise<{ allowed: boolean; reason?: string }> {
    const lastPost = await postRepository.getLastPublishedPost();
    if (lastPost) {
      const diffMinutes = (Date.now() - lastPost.publishedAt.getTime()) / (1000 * 60);
      if (diffMinutes < publishingPolicies.minimumIntervalMinutes) {
        return {
          allowed: false,
          reason: `Minimum publish interval (${publishingPolicies.minimumIntervalMinutes}m) not reached. Last published ${diffMinutes.toFixed(1)}m ago.`,
        };
      }
    }

    const posts24h = await postRepository.getRecentPostCountInWindow(24);
    if (posts24h >= publishingPolicies.maxPostsPer24Hours) {
      return {
        allowed: false,
        reason: `Daily publication cap (${publishingPolicies.maxPostsPer24Hours} posts/24h) reached. Current: ${posts24h}.`,
      };
    }

    return { allowed: true };
  }
}

export const rateLimiter = new RateLimiter();
