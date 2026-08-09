import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis';
import { discoveryService } from '../agent/discovery.service';
import { topicRepository } from '../repositories/topic.repository';
import { editorialQueue } from './queue';
import { logger } from '../config/logger';

export const discoveryWorker = new Worker(
  'discovery',
  async (job) => {
    logger.info({ jobId: job.id }, 'Processing discovery job...');
    const count = await discoveryService.discoverTopics();

    // Queue discovered topics for editorial evaluation
    const recentTopics = await topicRepository.getRecentTopics(count || 10);
    for (const t of recentTopics) {
      if (t.jobState === 'DISCOVERED') {
        await editorialQueue.add('evaluate-topic', { topicId: t.id });
      }
    }
  },
  { connection: redisConnection as any }
);
