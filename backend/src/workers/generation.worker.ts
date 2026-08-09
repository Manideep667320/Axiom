import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis';
import { generationService } from '../agent/generation.service';
import { validationQueue } from './queue';
import { logger } from '../config/logger';

export const generationWorker = new Worker(
  'generation',
  async (job) => {
    const { topicId } = job.data;
    logger.info({ jobId: job.id, topicId }, 'Processing generation job...');
    const result = await generationService.generateContent(topicId);
    await validationQueue.add('validate-post', {
      topicId,
      content: result.content,
      perspective: result.perspective,
      keyClaims: result.keyClaims,
      source: { id: result.topic.sourceId, title: result.topic.source.name, url: result.topic.url },
      rawContent: result.topic.rawContent || result.topic.summary,
    });
  },
  { connection: redisConnection as any }
);
