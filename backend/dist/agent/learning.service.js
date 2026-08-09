"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.learningService = exports.LearningService = void 0;
const memory_service_1 = require("../memory/memory.service");
const narrative_service_1 = require("../memory/narrative.service");
class LearningService {
    async learnFromPublication(postId, title, content, perspective) {
        // 1. Update Semantic Memory Embeddings & Breeth
        await memory_service_1.memoryService.recordPublishedPostMemory(postId, content, title);
        // 2. Extract & Update Narrative Themes
        const theme = title.slice(0, 50);
        await narrative_service_1.narrativeService.recordPostNarrative(theme, perspective, postId);
    }
}
exports.LearningService = LearningService;
exports.learningService = new LearningService();
