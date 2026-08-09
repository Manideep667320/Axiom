import { memoryService } from '../memory/memory.service';
import { narrativeService } from '../memory/narrative.service';

export class LearningService {
  async learnFromPublication(postId: string, title: string, content: string, perspective: string) {
    // 1. Update Semantic Memory Embeddings & Breeth
    await memoryService.recordPublishedPostMemory(postId, content, title);

    // 2. Extract & Update Narrative Themes
    const theme = title.slice(0, 50);
    await narrativeService.recordPostNarrative(theme, perspective, postId);
  }
}

export const learningService = new LearningService();
