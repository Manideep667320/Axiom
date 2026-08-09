export interface Decision {
  id: string;
  topicId: string;
  topicTitle?: string;
  decision: 'accepted' | 'rejected' | 'monitoring' | 'queued';
  score: number;
  reason: string;
  createdAt: string;
}

export interface DecisionsResponse {
  decisions: Decision[];
}
