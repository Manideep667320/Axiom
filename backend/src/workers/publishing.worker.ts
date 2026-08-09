import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis';
import { publishingService } from '../agent/publishing.service';
import { logger } from '../config/logger';

export const publishingWorker = new Worker(
  'publishing',
  async (job) => {
    const { topicId, content, perspective, keyClaims, rationale, sources } = job.data;
    logger.info({ jobId: job.id, topicId }, 'Processing publishing job...');
    await publishingService.publishPost(topicId, content, perspective, keyClaims, rationale, sources);
  },
  { connection: redisConnection as any }
);
