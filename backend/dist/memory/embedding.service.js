"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.embeddingService = exports.EmbeddingService = void 0;
const provider_factory_1 = require("../llm/provider.factory");
class EmbeddingService {
    async generateEmbedding(text) {
        const provider = provider_factory_1.LLMProviderFactory.getProvider();
        return provider.generateEmbeddings(text);
    }
}
exports.EmbeddingService = EmbeddingService;
exports.embeddingService = new EmbeddingService();
