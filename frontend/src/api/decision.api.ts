import apiClient from './client';
import type { DecisionsResponse } from '../types/decision';

export const decisionApi = {
  getDecisions: async (): Promise<DecisionsResponse> => {
    const { data } = await apiClient.get<DecisionsResponse>('/agent/decisions');
    return data;
  },
};
