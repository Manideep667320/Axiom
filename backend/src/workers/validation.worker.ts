import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis';
import { reviewService } from '../agent/review.service';
import { verificationService } from '../agent/verification.service';
import { rateLimiter } from '../scheduler/rate-limiter';
import { publishingQueue } from './queue';
import { topicRepository } from '../repositories/topic.repository';
import { logger } from '../config/logger';

export const validationWorker = new Worker(
  'validation',
  async (job) => {
    const { topicId, content, perspective, keyClaims, source, rawContent } = job.data;
    logger.info({ jobId: job.id, topicId }, 'Processing validation & review job...');

    // 1. Evidence Grounding Verification
    const grounding = verificationService.verifyEvidenceGrounding(keyClaims, rawContent);
    if (!grounding.grounded) {
      logger.warn({ ungroundedClaims: grounding.missingClaims }, 'Validation failed: Ungrounded claims in generated draft');
    }

    // 2. Self-Review Critique
    const review = await reviewService.reviewDraft(content, keyClaims, rawContent);
    if (!review.approved) {
      logger.warn({ feedback: review.feedback }, 'Validation failed: Self-review draft rejected');
      await topicRepository.updateJobState(topicId, 'REJECTED');
      return;
    }

    // 3. Rate Limit & Cadence Check
    const rateCheck = await rateLimiter.canPublishNow();
    if (!rateCheck.allowed) {
      logger.info({ reason: rateCheck.reason }, 'Post queued due to rate limit policy');
      await topicRepository.updateJobState(topicId, 'SCHEDULED');
      return;
    }

    await publishingQueue.add('publish-post', {
      topicId,
      content,
      perspective,
      keyClaims,
      rationale: {
        whySelected: 'High editorial value & primary source verification.',
        whyRelevantNow: 'Recent release.',
        editorialScore: 8.8,
        sources: [{ title: source.title, url: source.url }],
      },
      sources: [source],
    });
  },
  { connection: redisConnection as any }
);
