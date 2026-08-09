import { useState, useEffect, useCallback } from 'react';
import { agentApi } from '../api/agent.api';
import type { AgentStatusResponse, AgentInitResponse } from '../types/agent';
import type { HealthResponse } from '../types/source';

export function useAgent(pollInterval = 15000) {
  const [status, setStatus] = useState<AgentStatusResponse | null>(null);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const [statusData, healthData] = await Promise.all([
        agentApi.getStatus(),
        agentApi.getHealth(),
      ]);
      setStatus(statusData);
      setHealth(healthData);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch agent status';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const initAgent = useCallback(async (): Promise<AgentInitResponse | null> => {
    try {
      const data = await agentApi.initAgent();
      await fetchStatus();
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to initialize agent';
      setError(message);
      return null;
    }
  }, [fetchStatus]);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, pollInterval);
    return () => clearInterval(interval);
  }, [fetchStatus, pollInterval]);

  return { status, health, loading, error, refetch: fetchStatus, initAgent };
}
