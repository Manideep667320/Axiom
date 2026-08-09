import Parser from 'rss-parser';
import { SourceAdapter } from './source.interface';
import { TopicCandidate } from '../models/source.types';
import { config } from '../config/env';
import { logger } from '../config/logger';

export class ArXivAdapter implements SourceAdapter {
  name: string;
  type = 'arxiv' as const;
  private url: string;
  private sourceId: string;
  private parser: Parser;

  constructor(sourceId: string, name: string = 'arXiv Computer Science / AI', url: string = 'http://export.arxiv.org/rss/cs.AI') {
    this.sourceId = sourceId;
    this.name = name;
    this.url = url;
    this.parser = new Parser({ timeout: 10000 });
  }

  async fetchTopics(): Promise<TopicCandidate[]> {
    if (config.MOCK_SOURCES_ENABLED) {
      return [
        {
          title: '[Mock arXiv:2608.12345] Scalable Intent Memory Vectors for Autonomous Agents',
          summary: 'We propose a novel hybrid retrieval memory architecture for autonomous AI agents that improves long-horizon context retention by 42%.',
          url: 'https://arxiv.org/abs/2608.12345',
          sourceId: this.sourceId,
          sourceType: 'arxiv',
          discoveredAt: new Date(),
          publishedAt: new Date(),
          rawContent: 'Abstract: Autonomous agents suffer from context decay over long evaluation windows. We introduce intent-aware graph indexing.',
        },
      ];
    }

    try {
      const feed = await this.parser.parseURL(this.url);
      const candidates: TopicCandidate[] = [];

      for (const item of feed.items.slice(0, 10)) {
        if (!item.title || !item.link) continue;
        candidates.push({
          title: item.title,
          summary: item.contentSnippet || item.summary || item.title,
          url: item.link,
          sourceId: this.sourceId,
          sourceType: 'arxiv',
          discoveredAt: new Date(),
          publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
          rawContent: item.content || item.contentSnippet || item.title,
        });
      }

      return candidates;
    } catch (error) {
      logger.error({ err: error, source: this.name }, 'Failed to fetch arXiv RSS papers');
      return [];
    }
  }
}
