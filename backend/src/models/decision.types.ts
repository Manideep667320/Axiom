export type DecisionAction = 'publish_now' | 'queue' | 'monitor' | 'merge' | 'skip' | 'reject';

export interface RationaleDetails {
  whySelected: string;
  whyRelevantNow: string;
  whyThisOverAlternatives?: string;
  editorialScore: number;
  sources: Array<{ title: string; url: string }>;
  supportingContext?: string[];
}

export interface EditorialDecisionRecord {
  id: string;
  agentId: string;
  topicId: string;
  passedHardGates: boolean;
  rejectionReason?: string | null;
  action: DecisionAction;
  overallScore: number;
  relevanceScore: number;
  noveltyScore: number;
  technicalDepthScore: number;
  impactScore: number;
  credibilityScore: number;
  narrativeContinuityScore: number;
  rationale: RationaleDetails;
  createdAt: Date;
}
