"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSSAdapter = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
const env_1 = require("../config/env");
const logger_1 = require("../config/logger");
class RSSAdapter {
    name;
    type = 'rss';
    url;
    sourceId;
    parser;
    constructor(sourceId, name, url) {
        this.sourceId = sourceId;
        this.name = name;
        this.url = url;
        this.parser = new rss_parser_1.default({
            timeout: 10000,
        });
    }
    async fetchTopics() {
        if (env_1.config.MOCK_SOURCES_ENABLED) {
            return [
                {
                    title: `[Mock] Latest AI Agent Framework Updates from ${this.name}`,
                    summary: 'A new release introduces self-healing memory and decoupled tool calling capabilities for high-reliability agent systems.',
                    url: `${this.url}/mock-post-1`,
                    sourceId: this.sourceId,
                    sourceType: 'rss',
                    discoveredAt: new Date(),
                    publishedAt: new Date(),
                    rawContent: 'Primary technical details about autonomous agent resilience and memory persistence benchmarks.',
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
                    sourceType: 'rss',
                    discoveredAt: new Date(),
                    publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
                    rawContent: item.content || item.contentSnippet || item.title,
                });
            }
            return candidates;
        }
        catch (error) {
            logger_1.logger.error({ err: error, source: this.name }, 'Failed to fetch RSS source');
            return [];
        }
    }
}
exports.RSSAdapter = RSSAdapter;
