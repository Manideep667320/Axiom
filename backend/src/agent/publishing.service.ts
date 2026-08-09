import { postRepository } from '../repositories/post.repository';
import { topicRepository } from '../repositories/topic.repository';
import { generateSHA256 } from '../utils/hashing';
import { learningService } from './learning.service';
import { config } from '../config/env';
import { logger } from '../config/logger';

export class PublishingService {
  async publishPost(
    topicId: string,
    content: string,
    perspective: string,
    keyClaims: string[],
    rationale: any,
    sources: Array<{ id: string; title: string; url: string }>
  ) {
    const topic = await topicRepository.getTopicById(topicId);
    if (!topic) throw new Error(`Topic ${topicId} not found`);

    const contentHash = generateSHA256(content);
    const idempotencyKey = `${config.AGENT_ID}:${topicId}:${contentHash}`;

    // Check Idempotency
    const existing = await postRepository.findByIdempotencyKey(idempotencyKey);
    if (existing) {
      logger.warn({ idempotencyKey }, 'Post publication skipped due to duplicate idempotency key');
      return existing;
    }

    const post = await postRepository.createPost({
      agentId: config.AGENT_ID,
      topicId: topic.id,
      idempotencyKey,
      content,
      perspective,
      keyClaims,
      rationale,
      sources,
    });

    await topicRepository.updateJobState(topicId, 'PUBLISHED');
    await learningService.learnFromPublication(post.id, topic.title, content, perspective);

    logger.info({ postId: post.id, topicTitle: topic.title }, 'Successfully published post to simulated feed');
    return post;
  }
}

export const publishingService = new PublishingService();
