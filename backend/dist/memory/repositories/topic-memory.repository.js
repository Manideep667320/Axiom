"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicMemoryRepository = exports.TopicMemoryRepository = void 0;
const database_1 = require("../../config/database");
class TopicMemoryRepository {
    async saveEmbedding(topicId, content, vector, metadata) {
        // Save metadata string in Prisma
        return database_1.prisma.embedding.create({
            data: {
                topicId,
                content,
                metadata,
            },
        });
    }
}
exports.TopicMemoryRepository = TopicMemoryRepository;
exports.topicMemoryRepository = new TopicMemoryRepository();
