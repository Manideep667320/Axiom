import { useState, useEffect, useCallback } from 'react';
import { runApi } from '../api/run.api';
import type { AgentRun } from '../types/agent';

export function useRuns(pollInterval = 30000) {
  const [runs, setRuns] = useState<AgentRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRuns = useCallback(async () => {
    try {
      const data = await runApi.getRuns();
      setRuns(data.runs);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch runs';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRuns();
    const interval = setInterval(fetchRuns, pollInterval);
    return () => clearInterval(interval);
  }, [fetchRuns, pollInterval]);

  return { runs, loading, error, refetch: fetchRuns };
}
