"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = exports.PostRepository = void 0;
const database_1 = require("../config/database");
class PostRepository {
    async findByIdempotencyKey(key) {
        return database_1.prisma.post.findUnique({
            where: { idempotencyKey: key },
        });
    }
    async createPost(data) {
        return database_1.prisma.post.create({
            data: {
                agentId: data.agentId,
                topicId: data.topicId,
                idempotencyKey: data.idempotencyKey,
                content: data.content,
                perspective: data.perspective,
                keyClaims: data.keyClaims,
                rationale: data.rationale,
                postSources: {
                    create: data.sources.map((s) => ({
                        sourceId: s.id,
                        title: s.title,
                        url: s.url,
                    })),
                },
            },
            include: { postSources: true },
        });
    }
    async getFeedPosts(limit = 20) {
        return database_1.prisma.post.findMany({
            orderBy: { publishedAt: 'desc' },
            take: limit,
            include: { postSources: true, topic: true },
        });
    }
    async getRecentPostCountInWindow(hours = 24) {
        const since = new Date(Date.now() - hours * 3600 * 1000);
        return database_1.prisma.post.count({
            where: { publishedAt: { gte: since } },
        });
    }
    async getLastPublishedPost() {
        return database_1.prisma.post.findFirst({
            orderBy: { publishedAt: 'desc' },
        });
    }
}
exports.PostRepository = PostRepository;
exports.postRepository = new PostRepository();
