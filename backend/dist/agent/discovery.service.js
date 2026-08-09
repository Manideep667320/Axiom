"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discoveryService = exports.DiscoveryService = void 0;
const rss_adapter_1 = require("../sources/rss.adapter");
const github_adapter_1 = require("../sources/github.adapter");
const arxiv_adapter_1 = require("../sources/arxiv.adapter");
const hacker_news_adapter_1 = require("../sources/hacker-news.adapter");
const official_blog_adapter_1 = require("../sources/official-blog.adapter");
const source_repository_1 = require("../repositories/source.repository");
const topic_repository_1 = require("../repositories/topic.repository");
const canonical_url_1 = require("../utils/canonical-url");
const hashing_1 = require("../utils/hashing");
const env_1 = require("../config/env");
const logger_1 = require("../config/logger");
class DiscoveryService {
    async discoverTopics(agentId = env_1.config.AGENT_ID) {
        logger_1.logger.info('Starting topic discovery cycle...');
        const activeSources = await source_repository_1.sourceRepository.getActiveSources();
        let newTopicsCount = 0;
        for (const src of activeSources) {
            try {
                let adapter;
                switch (src.type) {
                    case 'official_blog':
                        adapter = new official_blog_adapter_1.OfficialBlogAdapter(src.id, src.name, src.url);
                        break;
                    case 'github':
                        adapter = new github_adapter_1.GitHubAdapter(src.id, src.name);
                        break;
                    case 'arxiv':
                        adapter = new arxiv_adapter_1.ArXivAdapter(src.id, src.name, src.url);
                        break;
                    case 'hacker_news':
                        adapter = new hacker_news_adapter_1.HackerNewsAdapter(src.id, src.name);
                        break;
                    case 'rss':
                    default:
                        adapter = new rss_adapter_1.RSSAdapter(src.id, src.name, src.url);
                        break;
                }
                const candidates = await adapter.fetchTopics();
                await source_repository_1.sourceRepository.updateLastFetched(src.id);
                for (const candidate of candidates) {
                    const canonicalUrl = (0, canonical_url_1.normalizeCanonicalUrl)(candidate.url);
                    const contentHash = (0, hashing_1.generateSHA256)(candidate.summary + (candidate.rawContent || ''));
                    const fingerprint = (0, hashing_1.generateFingerprint)(candidate.title, candidate.summary);
                    // Deduplicate by Canonical URL + Content Hash
                    const existing = await topic_repository_1.topicRepository.findByCanonicalUrlAndHash(canonicalUrl, contentHash);
                    if (!existing) {
                        await topic_repository_1.topicRepository.createTopic({
                            agentId,
                            sourceId: src.id,
                            title: candidate.title,
                            summary: candidate.summary,
                            url: candidate.url,
                            canonicalUrl,
                            contentHash,
                            fingerprint,
                            sourceType: candidate.sourceType,
                            rawContent: candidate.rawContent,
                        });
                        newTopicsCount++;
                    }
                }
            }
            catch (err) {
                logger_1.logger.error({ err, source: src.name }, 'Error discovering topics for source');
            }
        }
        logger_1.logger.info({ newTopicsCount }, 'Completed discovery cycle');
        return newTopicsCount;
    }
}
exports.DiscoveryService = DiscoveryService;
exports.discoveryService = new DiscoveryService();
