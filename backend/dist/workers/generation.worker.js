"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generationWorker = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = require("../config/redis");
const generation_service_1 = require("../agent/generation.service");
const queue_1 = require("./queue");
const logger_1 = require("../config/logger");
exports.generationWorker = new bullmq_1.Worker('generation', async (job) => {
    const { topicId } = job.data;
    logger_1.logger.info({ jobId: job.id, topicId }, 'Processing generation job...');
    const result = await generation_service_1.generationService.generateContent(topicId);
    await queue_1.validationQueue.add('validate-post', {
        topicId,
        content: result.content,
        perspective: result.perspective,
        keyClaims: result.keyClaims,
        source: { id: result.topic.sourceId, title: result.topic.source.name, url: result.topic.url },
        rawContent: result.topic.rawContent || result.topic.summary,
    });
}, { connection: redis_1.redisConnection });
