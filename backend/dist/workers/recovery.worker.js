"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoveryWorker = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = require("../config/redis");
const database_1 = require("../config/database");
const logger_1 = require("../config/logger");
exports.recoveryWorker = new bullmq_1.Worker('recovery', async (job) => {
    logger_1.logger.info({ jobId: job.id }, 'Processing worker crash recovery check...');
    // Recover stale topics stuck in intermediate evaluation/generation states for over 30 mins
    const staleTime = new Date(Date.now() - 30 * 60 * 1000);
    const staleTopics = await database_1.prisma.topic.findMany({
        where: {
            jobState: { in: ['EVALUATING', 'GENERATING', 'VALIDATING'] },
            updatedAt: { lt: staleTime },
        },
    });
    for (const t of staleTopics) {
        logger_1.logger.warn({ topicId: t.id }, 'Recovering stale topic back to DISCOVERED state');
        await database_1.prisma.topic.update({
            where: { id: t.id },
            data: { jobState: 'DISCOVERED' },
        });
    }
}, { connection: redis_1.redisConnection });
