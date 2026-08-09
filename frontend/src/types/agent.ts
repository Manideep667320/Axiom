export interface AgentInfo {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error';
  autonomous: boolean;
  role?: string;
}

export interface AgentRun {
  id: string;
  agentId: string;
  startedAt: string;
  completedAt: string | null;
  status: 'running' | 'completed' | 'failed';
  topicsDiscovered: number;
  topicsRejected: number;
  topicsAccepted: number;
  postsPublished: number;
  errorMessage: string | null;
}

export interface AgentStatusResponse {
  agent: AgentInfo;
  uptimeSeconds: number;
  lastSuccessfulRun: AgentRun | null;
  failureCount: number;
  lastRun: AgentRun | null;
}

export interface AgentInitResponse {
  agentId: string;
  status: string;
  autonomous: boolean;
  initializedAt: string;
}

export interface RunsResponse {
  runs: AgentRun[];
}
