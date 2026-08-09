import { RationaleDetails } from './decision.types';

export interface PublishablePost {
  topicId: string;
  content: string;
  perspective: string;
  keyClaims: string[];
  rationale: RationaleDetails;
  sources: Array<{ id: string; title: string; url: string }>;
}

export interface PostRecord {
  id: string;
  agentId: string;
  topicId: string;
  idempotencyKey: string;
  content: string;
  perspective: string;
  keyClaims: string[];
  rationale: RationaleDetails;
  publishedAt: Date;
}
