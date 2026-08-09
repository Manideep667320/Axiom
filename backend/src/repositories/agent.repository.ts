import { prisma } from '../config/database';

export class AgentRepository {
  async getAgent(agentId: string) {
    return prisma.agent.findUnique({
      where: { id: agentId },
      include: { persona: true, agentState: true, schedulerState: true },
    });
  }

  async updateAgentStatus(agentId: string, status: string, initializedAt?: Date) {
    return prisma.agent.update({
      where: { id: agentId },
      data: {
        status,
        lastActiveAt: new Date(),
        ...(initializedAt ? { initializedAt } : {}),
      },
    });
  }

  async getOrCreateAgentState(agentId: string) {
    return prisma.agentState.upsert({
      where: { agentId },
      update: { updatedAt: new Date() },
      create: { agentId },
    });
  }

  async updateAgentState(agentId: string, data: { activeJobId?: string | null; activeTopicId?: string | null; failureCount?: number; lastSuccessfulRun?: Date }) {
    return prisma.agentState.update({
      where: { agentId },
      data: { ...data, updatedAt: new Date() },
    });
  }
}

export const agentRepository = new AgentRepository();
