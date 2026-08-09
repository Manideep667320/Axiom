export interface DiscoveredTopic {
  id: string;
  title: string;
  summary: string;
  url: string;
  sourceType: string;
  jobState: 'DISCOVERED' | 'EVALUATING' | 'REJECTED' | 'ACCEPTED' | 'PLANNING' | 'GENERATING' | 'PUBLISHED' | 'FAILED';
  discoveredAt: string;
  source?: {
    name: string;
    type: string;
  };
}

export interface TopicsResponse {
  topics: DiscoveredTopic[];
}
