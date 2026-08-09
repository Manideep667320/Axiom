import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis';
import { editorialService } from '../agent/editorial.service';
import { generationQueue } from './queue';
import { logger } from '../config/logger';

export const editorialWorker = new Worker(
  'editorial',
  async (job) => {
    const { topicId } = job.data;
    logger.info({ jobId: job.id, topicId }, 'Processing editorial evaluation job...');
    const result = await editorialService.evaluateTopic(topicId);
    if (result.accepted) {
      await generationQueue.add('generate-post', { topicId });
    }
  },
  { connection: redisConnection as any }
);
