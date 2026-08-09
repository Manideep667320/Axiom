"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceRepository = exports.SourceRepository = void 0;
const database_1 = require("../config/database");
class SourceRepository {
    async getActiveSources() {
        return database_1.prisma.source.findMany({
            where: { active: true },
        });
    }
    async updateLastFetched(sourceId) {
        return database_1.prisma.source.update({
            where: { id: sourceId },
            data: { lastFetched: new Date() },
        });
    }
}
exports.SourceRepository = SourceRepository;
exports.sourceRepository = new SourceRepository();
