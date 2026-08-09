"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decisionRepository = exports.DecisionRepository = void 0;
const database_1 = require("../config/database");
class DecisionRepository {
    async createDecision(data) {
        return database_1.prisma.editorialDecision.create({
            data,
        });
    }
    async getRecentDecisions(limit = 50) {
        return database_1.prisma.editorialDecision.findMany({
            orderBy: { createdAt: 'desc' },
            take: limit,
            include: { topic: true },
        });
    }
}
exports.DecisionRepository = DecisionRepository;
exports.decisionRepository = new DecisionRepository();
