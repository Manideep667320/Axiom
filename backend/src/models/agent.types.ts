export interface AgentStateInfo {
  agentId: string;
  status: string; // running, stopped, error
  autonomous: boolean;
  initializedAt?: Date | null;
  lastActiveAt?: Date | null;
  uptimeSeconds?: number;
  activeJobId?: string | null;
  failureCount: number;
}

export interface AgentRunSummary {
  id: string;
  agentId: string;
  startedAt: Date;
  completedAt?: Date | null;
  status: string;
  topicsDiscovered: number;
  topicsRejected: number;
  topicsAccepted: number;
  postsPublished: number;
  errorMessage?: string | null;
}
