import Parser from 'rss-parser';
import { SourceAdapter } from './source.interface';
import { SourceType, TopicCandidate } from '../models/source.types';
import { config } from '../config/env';
import { logger } from '../config/logger';

export class RSSAdapter implements SourceAdapter {
  name: string;
  type: SourceType = 'rss';
  private url: string;
  private sourceId: string;
  private parser: Parser;

  constructor(sourceId: string, name: string, url: string) {
    this.sourceId = sourceId;
    this.name = name;
    this.url = url;
    this.parser = new Parser({
      timeout: 10000,
    });
  }

  async fetchTopics(): Promise<TopicCandidate[]> {
    if (config.MOCK_SOURCES_ENABLED) {
      return [
        {
          title: `[Mock] Latest AI Agent Framework Updates from ${this.name}`,
          summary: 'A new release introduces self-healing memory and decoupled tool calling capabilities for high-reliability agent systems.',
          url: `${this.url}/mock-post-1`,
          sourceId: this.sourceId,
          sourceType: 'rss',
          discoveredAt: new Date(),
          publishedAt: new Date(),
          rawContent: 'Primary technical details about autonomous agent resilience and memory persistence benchmarks.',
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
          sourceType: 'rss',
          discoveredAt: new Date(),
          publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
          rawContent: item.content || item.contentSnippet || item.title,
        });
      }

      return candidates;
    } catch (error) {
      logger.error({ err: error, source: this.name }, 'Failed to fetch RSS source');
      return [];
    }
  }
}
