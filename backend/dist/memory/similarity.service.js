"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.similarityService = exports.SimilarityService = void 0;
class SimilarityService {
    cosineSimilarity(vecA, vecB) {
        if (vecA.length !== vecB.length || vecA.length === 0)
            return 0;
        let dot = 0;
        let normA = 0;
        let normB = 0;
        for (let i = 0; i < vecA.length; i++) {
            dot += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }
        if (normA === 0 || normB === 0)
            return 0;
        return dot / (Math.sqrt(normA) * Math.sqrt(normB));
    }
}
exports.SimilarityService = SimilarityService;
exports.similarityService = new SimilarityService();
