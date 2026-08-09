"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConnection = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const env_1 = require("./env");
const logger_1 = require("./logger");
exports.redisConnection = new ioredis_1.default(env_1.config.REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    retryStrategy(times) {
        if (times > 3) {
            logger_1.logger.warn('Redis connection retry limit reached. Operating in serverless database mode.');
            return null; // Stop retrying to prevent hanging serverless functions
        }
        return Math.min(times * 200, 1000);
    },
});
exports.redisConnection.on('connect', () => {
    logger_1.logger.info('Connected to Redis');
});
exports.redisConnection.on('error', (err) => {
    logger_1.logger.warn({ err: err.message }, 'Redis connection warning (optional background queue store)');
});
