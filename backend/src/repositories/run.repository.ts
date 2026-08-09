import { prisma } from '../config/database';

export class RunRepository {
  async startRun(agentId: string) {
    return prisma.agentRun.create({
      data: {
        agentId,
        startedAt: new Date(),
        status: 'running',
      },
    });
  }

  async updateRunMetrics(runId: string, metrics: {
    topicsDiscovered?: number;
    topicsRejected?: number;
    topicsAccepted?: number;
    postsPublished?: number;
  }) {
    return prisma.agentRun.update({
      where: { id: runId },
      data: metrics,
    });
  }

  async completeRun(runId: string, status: 'completed' | 'failed' = 'completed', errorMessage?: string) {
    return prisma.agentRun.update({
      where: { id: runId },
      data: {
        status,
        completedAt: new Date(),
        errorMessage,
      },
    });
  }

  async getRecentRuns(limit: number = 20) {
    return prisma.agentRun.findMany({
      orderBy: { startedAt: 'desc' },
      take: limit,
    });
  }
}

export const runRepository = new RunRepository();
