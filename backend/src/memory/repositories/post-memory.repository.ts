import { prisma } from '../../config/database';

export class PostMemoryRepository {
  async saveEmbedding(postId: string, content: string, vector: number[], metadata: any) {
    return prisma.embedding.create({
      data: {
        postId,
        content,
        metadata,
      },
    });
  }

  async getRecentPostEmbeddings(limit: number = 50) {
    return prisma.embedding.findMany({
      where: { postId: { not: null } },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const postMemoryRepository = new PostMemoryRepository();
