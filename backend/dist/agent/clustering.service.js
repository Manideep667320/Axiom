"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clusteringService = exports.ClusteringService = void 0;
const logger_1 = require("../config/logger");
class ClusteringService {
    clusterTopics(topics) {
        const clusters = [];
        const visited = new Set();
        for (const topic of topics) {
            if (visited.has(topic.id))
                continue;
            const related = [];
            visited.add(topic.id);
            for (const other of topics) {
                if (visited.has(other.id) || topic.id === other.id)
                    continue;
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
        logger_1.logger.debug({ totalTopics: topics.length, totalClusters: clusters.length }, 'Clustered candidate topics');
        return clusters;
    }
}
exports.ClusteringService = ClusteringService;
exports.clusteringService = new ClusteringService();
