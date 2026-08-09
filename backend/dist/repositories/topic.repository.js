"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicRepository = exports.TopicRepository = void 0;
const database_1 = require("../config/database");
class TopicRepository {
    async findByCanonicalUrlAndHash(canonicalUrl, contentHash) {
        return database_1.prisma.topic.findUnique({
            where: {
                canonicalUrl_contentHash: {
                    canonicalUrl,
                    contentHash,
                },
            },
        });
    }
    async createTopic(data) {
        return database_1.prisma.topic.create({
            data: {
                ...data,
                jobState: 'DISCOVERED',
            },
        });
    }
    async updateJobState(topicId, jobState) {
        return database_1.prisma.topic.update({
            where: { id: topicId },
            data: { jobState, updatedAt: new Date() },
        });
    }
    async getTopicById(topicId) {
        return database_1.prisma.topic.findUnique({
            where: { id: topicId },
            include: { source: true },
        });
    }
    async getRecentTopics(limit = 50) {
        return database_1.prisma.topic.findMany({
            orderBy: { discoveredAt: 'desc' },
            take: limit,
            include: { source: true },
        });
    }
}
exports.TopicRepository = TopicRepository;
exports.topicRepository = new TopicRepository();
