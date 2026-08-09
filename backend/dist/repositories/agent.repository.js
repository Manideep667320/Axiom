"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentRepository = exports.AgentRepository = void 0;
const database_1 = require("../config/database");
class AgentRepository {
    async getAgent(agentId) {
        return database_1.prisma.agent.findUnique({
            where: { id: agentId },
            include: { persona: true, agentState: true, schedulerState: true },
        });
    }
    async updateAgentStatus(agentId, status, initializedAt) {
        return database_1.prisma.agent.update({
            where: { id: agentId },
            data: {
                status,
                lastActiveAt: new Date(),
                ...(initializedAt ? { initializedAt } : {}),
            },
        });
    }
    async getOrCreateAgentState(agentId) {
        return database_1.prisma.agentState.upsert({
            where: { agentId },
            update: { updatedAt: new Date() },
            create: { agentId },
        });
    }
    async updateAgentState(agentId, data) {
        return database_1.prisma.agentState.update({
            where: { agentId },
            data: { ...data, updatedAt: new Date() },
        });
    }
}
exports.AgentRepository = AgentRepository;
exports.agentRepository = new AgentRepository();
