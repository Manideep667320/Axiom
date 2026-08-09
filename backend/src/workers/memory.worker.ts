import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis';
import { logger } from '../config/logger';

export const memoryWorker = new Worker(
  'memory',
  async (job) => {
    logger.info({ jobId: job.id }, 'Processing memory consolidation worker job...');
  },
  { connection: redisConnection as any }
);
