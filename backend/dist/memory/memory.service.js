"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoryService = exports.MemoryService = void 0;
const embedding_service_1 = require("./embedding.service");
const similarity_service_1 = require("./similarity.service");
const post_memory_repository_1 = require("./repositories/post-memory.repository");
const breeth_provider_1 = require("./providers/breeth.provider");
const logger_1 = require("../config/logger");
class MemoryService {
    async searchRelatedPostMemory(queryText) {
        const queryVec = await embedding_service_1.embeddingService.generateEmbedding(queryText);
        const recentEmbeddings = await post_memory_repository_1.postMemoryRepository.getRecentPostEmbeddings(30);
        let maxSimilarity = 0;
        const matchingContexts = [];
        for (const item of recentEmbeddings) {
            if (item.content) {
                const itemVec = await embedding_service_1.embeddingService.generateEmbedding(item.content);
                const sim = similarity_service_1.similarityService.cosineSimilarity(queryVec, itemVec);
                if (sim > maxSimilarity) {
                    maxSimilarity = sim;
                }
                if (sim >= 0.70) {
                    matchingContexts.push(item.content);
                }
            }
        }
        // Also check Breeth Memory Provider if configured
        if (breeth_provider_1.breethMemoryProvider.isConfigured()) {
            const breethResults = await breeth_provider_1.breethMemoryProvider.searchMemory(queryText, 3);
            if (breethResults.length > 0) {
                matchingContexts.push(...breethResults.map((b) => `[Breeth Memory] ${b}`));
            }
        }
        logger_1.logger.debug({ maxSimilarity, contextCount: matchingContexts.length }, 'Completed memory retrieval search');
        return {
            summaryText: matchingContexts.slice(0, 5).join('\n---\n'),
            maxSimilarity,
        };
    }
    async recordPublishedPostMemory(postId, content, title) {
        const vector = await embedding_service_1.embeddingService.generateEmbedding(`${title}\n${content}`);
        await post_memory_repository_1.postMemoryRepository.saveEmbedding(postId, content, vector, { title, postId });
        // Stream to Breeth API if configured
        if (breeth_provider_1.breethMemoryProvider.isConfigured()) {
            await breeth_provider_1.breethMemoryProvider.recordEpisode({
                id: postId,
                text: `Published Post: "${title}"\nContent: ${content}`,
                extractIntent: true,
                metadata: { postId, title },
            });
        }
    }
}
exports.MemoryService = MemoryService;
exports.memoryService = new MemoryService();
