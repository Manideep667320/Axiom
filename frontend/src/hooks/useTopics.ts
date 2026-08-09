import { useState, useEffect, useCallback } from 'react';
import { agentApi } from '../api/agent.api';
import type { DiscoveredTopic } from '../types/topic';

export function useTopics(pollInterval = 15000) {
  const [topics, setTopics] = useState<DiscoveredTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopics = useCallback(async () => {
    try {
      const data = await agentApi.getTopics();
      setTopics(data.topics);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch topics';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopics();
    const interval = setInterval(fetchTopics, pollInterval);
    return () => clearInterval(interval);
  }, [fetchTopics, pollInterval]);

  return { topics, loading, error, refetch: fetchTopics };
}
