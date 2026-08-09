"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubAdapter = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
const logger_1 = require("../config/logger");
class GitHubAdapter {
    name;
    type = 'github';
    sourceId;
    constructor(sourceId, name = 'GitHub Trending AI') {
        this.sourceId = sourceId;
        this.name = name;
    }
    async fetchTopics() {
        if (env_1.config.MOCK_SOURCES_ENABLED) {
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
            const res = await axios_1.default.get('https://api.github.com/search/repositories', {
                params: {
                    q: 'topic:ai-agent OR topic:llm-infrastructure created:>2026-01-01',
                    sort: 'stars',
                    order: 'desc',
                    per_page: 5,
                },
                headers: { 'User-Agent': 'Axiom-Agent-System' },
                timeout: 10000,
            });
            return (res.data.items || []).map((repo) => ({
                title: `${repo.full_name}: ${repo.description || 'Open Source AI Repository'}`,
                summary: repo.description || 'No description provided.',
                url: repo.html_url,
                sourceId: this.sourceId,
                sourceType: 'github',
                discoveredAt: new Date(),
                publishedAt: new Date(repo.updated_at),
                rawContent: `Stars: ${repo.stargazers_count}, Language: ${repo.language}. Description: ${repo.description}`,
            }));
        }
        catch (error) {
            logger_1.logger.error({ err: error }, 'Failed to fetch GitHub AI trends');
            return [];
        }
    }
}
exports.GitHubAdapter = GitHubAdapter;
