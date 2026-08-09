import { prisma } from '../../config/database';

export class TopicMemoryRepository {
  async saveEmbedding(topicId: string, content: string, vector: number[], metadata: any) {
    // Save metadata string in Prisma
    return prisma.embedding.create({
      data: {
        topicId,
        content,
        metadata,
      },
    });
  }
}

export const topicMemoryRepository = new TopicMemoryRepository();
