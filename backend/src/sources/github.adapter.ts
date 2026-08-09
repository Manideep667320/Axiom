import axios from 'axios';
import { SourceAdapter } from './source.interface';
import { TopicCandidate } from '../models/source.types';
import { config } from '../config/env';
import { logger } from '../config/logger';

export class GitHubAdapter implements SourceAdapter {
  name: string;
  type = 'github' as const;
  private sourceId: string;

  constructor(sourceId: string, name: string = 'GitHub Trending AI') {
    this.sourceId = sourceId;
    this.name = name;
  }

  async fetchTopics(): Promise<TopicCandidate[]> {
    if (config.MOCK_SOURCES_ENABLED) {
      return [
        {
          title: '[Mock] langchain-ai/agent-runtime v0.5.0 Released',
          summary: 'New version introduces distributed agent tracing, state checkpointing, and vector database memory adapters.',
          url: 'https://github.com/mock/agent-runtime/releases/tag/v0.5.0',
          sourceId: this.sourceId,
          sourceType: 'github',
          discoveredAt: new Date(),
          publishedAt: new Date(),
          rawContent: 'Release notes detailing agentic orchestration performance gains and pgvector integration.',
        },
      ];
    }

    try {
      // Fetch trending AI repositories via GitHub Search API
      const res = await axios.get('https://api.github.com/search/repositories', {
        params: {
          q: 'topic:ai-agent OR topic:llm-infrastructure created:>2026-01-01',
          sort: 'stars',
          order: 'desc',
          per_page: 5,
        },
        headers: { 'User-Agent': 'Axiom-Agent-System' },
        timeout: 10000,
      });

      return (res.data.items || []).map((repo: any) => ({
        title: `${repo.full_name}: ${repo.description || 'Open Source AI Repository'}`,
        summary: repo.description || 'No description provided.',
        url: repo.html_url,
        sourceId: this.sourceId,
        sourceType: 'github',
        discoveredAt: new Date(),
        publishedAt: new Date(repo.updated_at),
        rawContent: `Stars: ${repo.stargazers_count}, Language: ${repo.language}. Description: ${repo.description}`,
      }));
    } catch (error) {
      logger.error({ err: error }, 'Failed to fetch GitHub AI trends');
      return [];
    }
  }
}
