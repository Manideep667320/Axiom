import { useState, useEffect, useCallback } from 'react';
import { feedApi } from '../api/feed.api';
import type { FeedResponse } from '../types/post';

export function useFeed(pollInterval = 30000) {
  const [feed, setFeed] = useState<FeedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeed = useCallback(async () => {
    try {
      const data = await feedApi.getFeed();
      setFeed(data);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch feed';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
    const interval = setInterval(fetchFeed, pollInterval);
    return () => clearInterval(interval);
  }, [fetchFeed, pollInterval]);

  return { feed, loading, error, refetch: fetchFeed };
}
