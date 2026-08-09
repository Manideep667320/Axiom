import { LLMProviderFactory } from '../llm/provider.factory';

export class EmbeddingService {
  async generateEmbedding(text: string): Promise<number[]> {
    const provider = LLMProviderFactory.getProvider();
    return provider.generateEmbeddings(text);
  }
}

export const embeddingService = new EmbeddingService();
