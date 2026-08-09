"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheckController = healthCheckController;
const database_1 = require("../../config/database");
const redis_1 = require("../../config/redis");
async function healthCheckController(req, res) {
    let dbStatus = 'ok';
    let redisStatus = 'ok';
    try {
        await database_1.prisma.$queryRaw `SELECT 1`;
    }
    catch {
        dbStatus = 'error';
    }
    try {
        await redis_1.redisConnection.ping();
    }
    catch {
        redisStatus = 'error';
    }
    const isHealthy = dbStatus === 'ok' && redisStatus === 'ok';
    res.status(isHealthy ? 200 : 503).json({
        status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        services: {
            api: 'ok',
            database: dbStatus,
            redis: redisStatus,
        },
    });
}
