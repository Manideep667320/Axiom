export type SourceType = 'rss' | 'official_blog' | 'github' | 'arxiv' | 'hacker_news';

export interface TopicCandidate {
  title: string;
  summary: string;
  url: string;
  sourceId: string;
  publishedAt?: Date;
  discoveredAt: Date;
  sourceType: SourceType;
  rawContent?: string;
}

export interface SourceRecord {
  id: string;
  name: string;
  type: SourceType;
  url: string;
  tier: number;
  active: boolean;
  lastFetched?: Date | null;
}
