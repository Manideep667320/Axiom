import { SourceType } from './source.types';

export type JobState =
  | 'DISCOVERED'
  | 'EVALUATING'
  | 'REJECTED'
  | 'ACCEPTED'
  | 'MEMORY_RETRIEVAL'
  | 'PLANNING'
  | 'GENERATING'
  | 'VALIDATING'
  | 'SCHEDULED'
  | 'PUBLISHED'
  | 'FAILED';

export interface TopicRecord {
  id: string;
  agentId: string;
  sourceId: string;
  title: string;
  summary: string;
  url: string;
  canonicalUrl: string;
  contentHash: string;
  fingerprint: string;
  sourceType: SourceType;
  rawContent?: string | null;
  jobState: JobState;
  publishedAt?: Date | null;
  discoveredAt: Date;
}
