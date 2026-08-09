import { prisma } from '../config/database';

export class PostRepository {
  async findByIdempotencyKey(key: string) {
    return prisma.post.findUnique({
      where: { idempotencyKey: key },
    });
  }

  async createPost(data: {
    agentId: string;
    topicId: string;
    idempotencyKey: string;
    content: string;
    perspective: string;
    keyClaims: string[];
    rationale: any;
    sources: Array<{ id: string; title: string; url: string }>;
  }) {
    return prisma.post.create({
      data: {
        agentId: data.agentId,
        topicId: data.topicId,
        idempotencyKey: data.idempotencyKey,
        content: data.content,
        perspective: data.perspective,
        keyClaims: data.keyClaims,
        rationale: data.rationale,
        postSources: {
          create: data.sources.map((s) => ({
            sourceId: s.id,
            title: s.title,
            url: s.url,
          })),
        },
      },
      include: { postSources: true },
    });
  }

  async getFeedPosts(limit: number = 20) {
    return prisma.post.findMany({
      orderBy: { publishedAt: 'desc' },
      take: limit,
      include: { postSources: true, topic: true },
    });
  }

  async getRecentPostCountInWindow(hours: number = 24) {
    const since = new Date(Date.now() - hours * 3600 * 1000);
    return prisma.post.count({
      where: { publishedAt: { gte: since } },
    });
  }

  async getLastPublishedPost() {
    return prisma.post.findFirst({
      orderBy: { publishedAt: 'desc' },
    });
  }
}

export const postRepository = new PostRepository();
