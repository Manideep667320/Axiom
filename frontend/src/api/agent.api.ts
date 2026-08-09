import apiClient from './client';
import type { AgentStatusResponse, AgentInitResponse } from '../types/agent';
import type { HealthResponse } from '../types/source';
import type { TopicsResponse } from '../types/topic';

export const agentApi = {
  getStatus: async (): Promise<AgentStatusResponse> => {
    const { data } = await apiClient.get<AgentStatusResponse>('/agent/status');
    return data;
  },

  getTopics: async (): Promise<TopicsResponse> => {
    const { data } = await apiClient.get<TopicsResponse>('/agent/topics');
    return data;
  },

  initAgent: async (): Promise<AgentInitResponse> => {
    const { data } = await apiClient.post<AgentInitResponse>('/agent/init');
    return data;
  },

  getHealth: async (): Promise<HealthResponse> => {
    const { data } = await apiClient.get<HealthResponse>('/health');
    return data;
  },
};
