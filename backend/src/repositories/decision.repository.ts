import { prisma } from '../config/database';
import { DecisionAction } from '@prisma/client';

export class DecisionRepository {
  async createDecision(data: {
    agentId: string;
    topicId: string;
    passedHardGates: boolean;
    rejectionReason?: string;
    action: DecisionAction;
    overallScore: number;
    relevanceScore: number;
    noveltyScore: number;
    technicalDepthScore: number;
    impactScore: number;
    credibilityScore: number;
    narrativeContinuityScore: number;
    rationale: any;
  }) {
    return prisma.editorialDecision.create({
      data,
    });
  }

  async getRecentDecisions(limit: number = 50) {
    return prisma.editorialDecision.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { topic: true },
    });
  }
}

export const decisionRepository = new DecisionRepository();
