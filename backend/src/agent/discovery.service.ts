import { SourceAdapter } from '../sources/source.interface';
import { RSSAdapter } from '../sources/rss.adapter';
import { GitHubAdapter } from '../sources/github.adapter';
import { ArXivAdapter } from '../sources/arxiv.adapter';
import { HackerNewsAdapter } from '../sources/hacker-news.adapter';
import { OfficialBlogAdapter } from '../sources/official-blog.adapter';
import { sourceRepository } from '../repositories/source.repository';
import { topicRepository } from '../repositories/topic.repository';
import { normalizeCanonicalUrl } from '../utils/canonical-url';
import { generateSHA256, generateFingerprint } from '../utils/hashing';
import { config } from '../config/env';
import { logger } from '../config/logger';

export class DiscoveryService {
  async discoverTopics(agentId: string = config.AGENT_ID): Promise<number> {
    logger.info('Starting topic discovery cycle...');
    const activeSources = await sourceRepository.getActiveSources();
    let newTopicsCount = 0;

    for (const src of activeSources) {
      try {
        let adapter: SourceAdapter;
        switch (src.type) {
          case 'official_blog':
            adapter = new OfficialBlogAdapter(src.id, src.name, src.url);
            break;
          case 'github':
            adapter = new GitHubAdapter(src.id, src.name);
            break;
          case 'arxiv':
            adapter = new ArXivAdapter(src.id, src.name, src.url);
            break;
          case 'hacker_news':
            adapter = new HackerNewsAdapter(src.id, src.name);
            break;
          case 'rss':
          default:
            adapter = new RSSAdapter(src.id, src.name, src.url);
            break;
        }

        const candidates = await adapter.fetchTopics();
        await sourceRepository.updateLastFetched(src.id);

        for (const candidate of candidates) {
          const canonicalUrl = normalizeCanonicalUrl(candidate.url);
          const contentHash = generateSHA256(candidate.summary + (candidate.rawContent || ''));
          const fingerprint = generateFingerprint(candidate.title, candidate.summary);

          // Deduplicate by Canonical URL + Content Hash
          const existing = await topicRepository.findByCanonicalUrlAndHash(canonicalUrl, contentHash);
          if (!existing) {
            await topicRepository.createTopic({
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
      } catch (err) {
        logger.error({ err, source: src.name }, 'Error discovering topics for source');
      }
    }

    logger.info({ newTopicsCount }, 'Completed discovery cycle');
    return newTopicsCount;
  }
}

export const discoveryService = new DiscoveryService();
