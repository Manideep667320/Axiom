"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoryWorker = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = require("../config/redis");
const logger_1 = require("../config/logger");
exports.memoryWorker = new bullmq_1.Worker('memory', async (job) => {
    logger_1.logger.info({ jobId: job.id }, 'Processing memory consolidation worker job...');
}, { connection: redis_1.redisConnection });
