import axios from 'axios';
import { config } from '../../config/env';
import { logger } from '../../config/logger';

export interface BreethMemoryEpisode {
  id?: string;
  text: string;
  extractIntent?: boolean;
  metadata?: Record<string, any>;
}

export class BreethMemoryProvider {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string = config.BREETH_API_KEY, baseUrl: string = config.BREETH_API_URL) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey);
  }

  async recordEpisode(episode: BreethMemoryEpisode): Promise<string | null> {
    if (!this.isConfigured()) {
      logger.debug('Breeth API key not configured. Skipping Breeth cloud episode record.');
      return null;
    }

    try {
      const res = await axios.post(
        `${this.baseUrl}/episodes`,
        {
          content: episode.text,
          text: episode.text,
          extract_intent: episode.extractIntent ?? true,
          metadata: episode.metadata || {},
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      logger.info({ episodeId: res.data?.id }, 'Successfully recorded episode in Breeth Memory Layer');
      return res.data?.id || null;
    } catch (err) {
      logger.error({ err }, 'Failed to record episode to Breeth API');
      return null;
    }
  }

  async searchMemory(query: string, limit: number = 5): Promise<string[]> {
    if (!this.isConfigured()) {
      return [];
    }

    try {
      const res = await axios.post(
        `${this.baseUrl}/search`,
        {
          query,
          limit,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 8000,
        }
      );

      return (res.data?.results || []).map((r: any) => r.text || r.content || '');
    } catch (err) {
      logger.error({ err }, 'Failed to search Breeth Memory');
      return [];
    }
  }
}

export const breethMemoryProvider = new BreethMemoryProvider();
