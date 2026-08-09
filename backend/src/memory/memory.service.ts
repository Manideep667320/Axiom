import { embeddingService } from './embedding.service';
import { similarityService } from './similarity.service';
import { postMemoryRepository } from './repositories/post-memory.repository';
import { breethMemoryProvider } from './providers/breeth.provider';
import { logger } from '../config/logger';

export class MemoryService {
  async searchRelatedPostMemory(queryText: string): Promise<{ summaryText: string; maxSimilarity: number }> {
    const queryVec = await embeddingService.generateEmbedding(queryText);
    const recentEmbeddings = await postMemoryRepository.getRecentPostEmbeddings(30);

    let maxSimilarity = 0;
    const matchingContexts: string[] = [];

    for (const item of recentEmbeddings) {
      if (item.content) {
        const itemVec = await embeddingService.generateEmbedding(item.content);
        const sim = similarityService.cosineSimilarity(queryVec, itemVec);
        if (sim > maxSimilarity) {
          maxSimilarity = sim;
        }
        if (sim >= 0.70) {
          matchingContexts.push(item.content);
        }
      }
    }

    // Also check Breeth Memory Provider if configured
    if (breethMemoryProvider.isConfigured()) {
      const breethResults = await breethMemoryProvider.searchMemory(queryText, 3);
      if (breethResults.length > 0) {
        matchingContexts.push(...breethResults.map((b) => `[Breeth Memory] ${b}`));
      }
    }

    logger.debug({ maxSimilarity, contextCount: matchingContexts.length }, 'Completed memory retrieval search');
    return {
      summaryText: matchingContexts.slice(0, 5).join('\n---\n'),
      maxSimilarity,
    };
  }

  async recordPublishedPostMemory(postId: string, content: string, title: string) {
    const vector = await embeddingService.generateEmbedding(`${title}\n${content}`);
    await postMemoryRepository.saveEmbedding(postId, content, vector, { title, postId });

    // Stream to Breeth API if configured
    if (breethMemoryProvider.isConfigured()) {
      await breethMemoryProvider.recordEpisode({
        id: postId,
        text: `Published Post: "${title}"\nContent: ${content}`,
        extractIntent: true,
        metadata: { postId, title },
      });
    }
  }
}

export const memoryService = new MemoryService();
