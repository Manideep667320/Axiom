import { prisma } from '../config/database';
import { JobState, SourceType } from '@prisma/client';

export class TopicRepository {
  async findByCanonicalUrlAndHash(canonicalUrl: string, contentHash: string) {
    return prisma.topic.findUnique({
      where: {
        canonicalUrl_contentHash: {
          canonicalUrl,
          contentHash,
        },
      },
    });
  }

  async createTopic(data: {
    agentId: string;
    sourceId: string;
    title: string;
    summary: string;
    url: string;
    canonicalUrl: string;
    contentHash: string;
    fingerprint: string;
    sourceType: SourceType;
    rawContent?: string;
  }) {
    return prisma.topic.create({
      data: {
        ...data,
        jobState: 'DISCOVERED',
      },
    });
  }

  async updateJobState(topicId: string, jobState: JobState) {
    return prisma.topic.update({
      where: { id: topicId },
      data: { jobState, updatedAt: new Date() },
    });
  }

  async getTopicById(topicId: string) {
    return prisma.topic.findUnique({
      where: { id: topicId },
      include: { source: true },
    });
  }

  async getRecentTopics(limit: number = 50) {
    return prisma.topic.findMany({
      orderBy: { discoveredAt: 'desc' },
      take: limit,
      include: { source: true },
    });
  }
}

export const topicRepository = new TopicRepository();
