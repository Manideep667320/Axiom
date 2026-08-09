import apiClient from './client';
import type { FeedResponse } from '../types/post';

export const feedApi = {
  getFeed: async (): Promise<FeedResponse> => {
    const { data } = await apiClient.get<FeedResponse>('/agent/feed');
    return data;
  },
};
