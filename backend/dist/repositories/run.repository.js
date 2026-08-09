"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runRepository = exports.RunRepository = void 0;
const database_1 = require("../config/database");
class RunRepository {
    async startRun(agentId) {
        return database_1.prisma.agentRun.create({
            data: {
                agentId,
                startedAt: new Date(),
                status: 'running',
            },
        });
    }
    async updateRunMetrics(runId, metrics) {
        return database_1.prisma.agentRun.update({
            where: { id: runId },
            data: metrics,
        });
    }
    async completeRun(runId, status = 'completed', errorMessage) {
        return database_1.prisma.agentRun.update({
            where: { id: runId },
            data: {
                status,
                completedAt: new Date(),
                errorMessage,
            },
        });
    }
    async getRecentRuns(limit = 20) {
        return database_1.prisma.agentRun.findMany({
            orderBy: { startedAt: 'desc' },
            take: limit,
        });
    }
}
exports.RunRepository = RunRepository;
exports.runRepository = new RunRepository();
