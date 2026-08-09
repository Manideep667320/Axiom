import { narrativeRepository } from './repositories/narrative.repository';

export class NarrativeService {
  async recordPostNarrative(theme: string, editorialStance: string, postId?: string) {
    return narrativeRepository.upsertNarrative(theme, editorialStance, postId);
  }

  async getOngoingThemes() {
    return narrativeRepository.getAllNarratives();
  }
}

export const narrativeService = new NarrativeService();
