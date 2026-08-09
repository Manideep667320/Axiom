import { useState, useEffect, useCallback } from 'react';
import { decisionApi } from '../api/decision.api';
import type { Decision } from '../types/decision';

export function useDecisions(pollInterval = 30000) {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDecisions = useCallback(async () => {
    try {
      const data = await decisionApi.getDecisions();
      setDecisions(data.decisions);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch decisions';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDecisions();
    const interval = setInterval(fetchDecisions, pollInterval);
    return () => clearInterval(interval);
  }, [fetchDecisions, pollInterval]);

  return { decisions, loading, error, refetch: fetchDecisions };
}
