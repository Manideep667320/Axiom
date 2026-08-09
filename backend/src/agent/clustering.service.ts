import { TopicRecord } from '../models/topic.types';
import { logger } from '../config/logger';

export interface TopicCluster {
  primaryTopic: TopicRecord;
  relatedTopics: TopicRecord[];
}

export class ClusteringService {
  clusterTopics(topics: TopicRecord[]): TopicCluster[] {
    const clusters: TopicCluster[] = [];
    const visited = new Set<string>();

    for (const topic of topics) {
      if (visited.has(topic.id)) continue;

      const related: TopicRecord[] = [];
      visited.add(topic.id);

      for (const other of topics) {
        if (visited.has(other.id) || topic.id === other.id) continue;

        // Group by fingerprint or canonical domain
        if (topic.fingerprint === other.fingerprint) {
          related.push(other);
          visited.add(other.id);
        }
      }

      clusters.push({
        primaryTopic: topic,
        relatedTopics: related,
      });
    }

    logger.debug({ totalTopics: topics.length, totalClusters: clusters.length }, 'Clustered candidate topics');
    return clusters;
  }
}

export const clusteringService = new ClusteringService();
