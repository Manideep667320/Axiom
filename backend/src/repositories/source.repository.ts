import { prisma } from '../config/database';

export class SourceRepository {
  async getActiveSources() {
    return prisma.source.findMany({
      where: { active: true },
    });
  }

  async updateLastFetched(sourceId: string) {
    return prisma.source.update({
      where: { id: sourceId },
      data: { lastFetched: new Date() },
    });
  }
}

export const sourceRepository = new SourceRepository();
