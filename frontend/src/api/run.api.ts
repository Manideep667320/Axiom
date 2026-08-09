import apiClient from './client';
import type { RunsResponse } from '../types/agent';

export const runApi = {
  getRuns: async (): Promise<RunsResponse> => {
    const { data } = await apiClient.get<RunsResponse>('/agent/runs');
    return data;
  },
};
