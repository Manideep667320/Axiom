"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArXivAdapter = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
const env_1 = require("../config/env");
const logger_1 = require("../config/logger");
class ArXivAdapter {
    name;
    type = 'arxiv';
    url;
    sourceId;
    parser;
    constructor(sourceId, name = 'arXiv Computer Science / AI', url = 'http://export.arxiv.org/rss/cs.AI') {
        this.sourceId = sourceId;
        this.name = name;
        this.url = url;
        this.parser = new rss_parser_1.default({ timeout: 10000 });
    }
    async fetchTopics() {
        if (env_1.config.MOCK_SOURCES_ENABLED) {
            return [
                {
                    title: '[Mock arXiv:2608.12345] Scalable Intent Memory Vectors for Autonomous Agents',
                    summary: 'We propose a novel hybrid retrieval memory architecture for autonomous AI agents that improves long-horizon context retention by 42%.',
                    url: 'https://arxiv.org/abs/2608.12345',
                    sourceId: this.sourceId,
                    sourceType: 'arxiv',
                    discoveredAt: new Date(),
                    publishedAt: new Date(),
                    rawContent: 'Abstract: Autonomous agents suffer from context decay over long evaluation windows. We introduce intent-aware graph indexing.',
                },
            ];
        }
        try {
            const feed = await this.parser.parseURL(this.url);
            const candidates = [];
            for (const item of feed.items.slice(0, 10)) {
                if (!item.title || !item.link)
                    continue;
                candidates.push({
                    title: item.title,
                    summary: item.contentSnippet || item.summary || item.title,
                    url: item.link,
                    sourceId: this.sourceId,
                    sourceType: 'arxiv',
                    discoveredAt: new Date(),
                    publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
                    rawContent: item.content || item.contentSnippet || item.title,
                });
            }
            return candidates;
        }
        catch (error) {
            logger_1.logger.error({ err: error, source: this.name }, 'Failed to fetch arXiv RSS papers');
            return [];
        }
    }
}
exports.ArXivAdapter = ArXivAdapter;
