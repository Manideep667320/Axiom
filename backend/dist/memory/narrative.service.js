"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.narrativeService = exports.NarrativeService = void 0;
const narrative_repository_1 = require("./repositories/narrative.repository");
class NarrativeService {
    async recordPostNarrative(theme, editorialStance, postId) {
        return narrative_repository_1.narrativeRepository.upsertNarrative(theme, editorialStance, postId);
    }
    async getOngoingThemes() {
        return narrative_repository_1.narrativeRepository.getAllNarratives();
    }
}
exports.NarrativeService = NarrativeService;
exports.narrativeService = new NarrativeService();
