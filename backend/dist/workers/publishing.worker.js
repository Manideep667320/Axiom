"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishingWorker = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = require("../config/redis");
const publishing_service_1 = require("../agent/publishing.service");
const logger_1 = require("../config/logger");
exports.publishingWorker = new bullmq_1.Worker('publishing', async (job) => {
    const { topicId, content, perspective, keyClaims, rationale, sources } = job.data;
    logger_1.logger.info({ jobId: job.id, topicId }, 'Processing publishing job...');
    await publishing_service_1.publishingService.publishPost(topicId, content, perspective, keyClaims, rationale, sources);
}, { connection: redis_1.redisConnection });
