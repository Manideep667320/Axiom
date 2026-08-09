import { SourceType, TopicCandidate } from '../models/source.types';

export interface SourceAdapter {
  name: string;
  type: SourceType;
  fetchTopics(): Promise<TopicCandidate[]>;
}
