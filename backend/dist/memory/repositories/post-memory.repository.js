"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMemoryRepository = exports.PostMemoryRepository = void 0;
const database_1 = require("../../config/database");
class PostMemoryRepository {
    async saveEmbedding(postId, content, vector, metadata) {
        return database_1.prisma.embedding.create({
            data: {
                postId,
                content,
                metadata,
            },
        });
    }
    async getRecentPostEmbeddings(limit = 50) {
        return database_1.prisma.embedding.findMany({
            where: { postId: { not: null } },
            take: limit,
            orderBy: { createdAt: 'desc' },
        });
    }
}
exports.PostMemoryRepository = PostMemoryRepository;
exports.postMemoryRepository = new PostMemoryRepository();
