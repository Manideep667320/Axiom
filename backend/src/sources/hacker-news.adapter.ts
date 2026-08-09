import axios from 'axios';
import { SourceAdapter } from './source.interface';
import { TopicCandidate } from '../models/source.types';
import { config } from '../config/env';
import { logger } from '../config/logger';

export class HackerNewsAdapter implements SourceAdapter {
  name: string;
  type = 'hacker_news' as const;
  private sourceId: string;

  constructor(sourceId: string, name: string = 'Hacker News AI') {
    this.sourceId = sourceId;
    this.name = name;
  }

  async fetchTopics(): Promise<TopicCandidate[]> {
    if (config.MOCK_SOURCES_ENABLED) {
      return [
        {
          title: '[Mock HN] Show HN: Open-Source AI Agent Framework with Intent Memory',
          summary: 'Community discussions on building resilient AI agents with persistent vector stores.',
          url: 'https://news.ycombinator.com/item?id=9999999',
          sourceId: this.sourceId,
          sourceType: 'hacker_news',
          discoveredAt: new Date(),
          publishedAt: new Date(),
          rawContent: 'Points: 450, Comments: 180. Discussion around production LLM agent state machines.',
        },
      ];
    }

    try {
      const topIdsRes = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json', { timeout: 8000 });
      const topIds: number[] = topIdsRes.data.slice(0, 15);
      const candidates: TopicCandidate[] = [];

      for (const id of topIds) {
        const itemRes = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, { timeout: 5000 });
        const item = itemRes.data;
        if (!item || !item.title) continue;

        const titleLower = item.title.toLowerCase();
        // Filter for AI/Tech engineering topics
        if (titleLower.includes('ai') || titleLower.includes('llm') || titleLower.includes('agent') || titleLower.includes('model') || titleLower.includes('gpu')) {
          candidates.push({
            title: item.title,
            summary: `Hacker News Post (${item.score || 0} points, ${item.descendants || 0} comments)`,
            url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
            sourceId: this.sourceId,
            sourceType: 'hacker_news',
            discoveredAt: new Date(),
            publishedAt: item.time ? new Date(item.time * 1000) : new Date(),
            rawContent: `Title: ${item.title}. URL: ${item.url}. Points: ${item.score}`,
          });
        }
      }

      return candidates;
    } catch (error) {
      logger.error({ err: error }, 'Failed to fetch Hacker News AI topics');
      return [];
    }
  }
}
