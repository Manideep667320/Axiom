"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editorialWorker = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = require("../config/redis");
const editorial_service_1 = require("../agent/editorial.service");
const queue_1 = require("./queue");
const logger_1 = require("../config/logger");
exports.editorialWorker = new bullmq_1.Worker('editorial', async (job) => {
    const { topicId } = job.data;
    logger_1.logger.info({ jobId: job.id, topicId }, 'Processing editorial evaluation job...');
    const result = await editorial_service_1.editorialService.evaluateTopic(topicId);
    if (result.accepted) {
        await queue_1.generationQueue.add('generate-post', { topicId });
    }
}, { connection: redis_1.redisConnection });
