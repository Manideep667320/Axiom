import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis';
import { prisma } from '../config/database';
import { logger } from '../config/logger';

export const recoveryWorker = new Worker(
  'recovery',
  async (job) => {
    logger.info({ jobId: job.id }, 'Processing worker crash recovery check...');
    // Recover stale topics stuck in intermediate evaluation/generation states for over 30 mins
    const staleTime = new Date(Date.now() - 30 * 60 * 1000);
    const staleTopics = await prisma.topic.findMany({
      where: {
        jobState: { in: ['EVALUATING', 'GENERATING', 'VALIDATING'] },
        updatedAt: { lt: staleTime },
      },
    });

    for (const t of staleTopics) {
      logger.warn({ topicId: t.id }, 'Recovering stale topic back to DISCOVERED state');
      await prisma.topic.update({
        where: { id: t.id },
        data: { jobState: 'DISCOVERED' },
      });
    }
  },
  { connection: redisConnection as any }
);
