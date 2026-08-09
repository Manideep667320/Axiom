"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discoveryWorker = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = require("../config/redis");
const discovery_service_1 = require("../agent/discovery.service");
const topic_repository_1 = require("../repositories/topic.repository");
const queue_1 = require("./queue");
const logger_1 = require("../config/logger");
exports.discoveryWorker = new bullmq_1.Worker('discovery', async (job) => {
    logger_1.logger.info({ jobId: job.id }, 'Processing discovery job...');
    const count = await discovery_service_1.discoveryService.discoverTopics();
    // Queue discovered topics for editorial evaluation
    const recentTopics = await topic_repository_1.topicRepository.getRecentTopics(count || 10);
    for (const t of recentTopics) {
        if (t.jobState === 'DISCOVERED') {
            await queue_1.editorialQueue.add('evaluate-topic', { topicId: t.id });
        }
    }
}, { connection: redis_1.redisConnection });
