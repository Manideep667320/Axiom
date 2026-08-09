import Redis from 'ioredis';
import { config } from './env';
import { logger } from './logger';

export const redisConnection = new Redis(config.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  retryStrategy(times) {
    if (times > 3) {
      logger.warn('Redis connection retry limit reached. Operating in serverless database mode.');
      return null; // Stop retrying to prevent hanging serverless functions
    }
    return Math.min(times * 200, 1000);
  },
});

redisConnection.on('connect', () => {
  logger.info('Connected to Redis');
});

redisConnection.on('error', (err) => {
  logger.warn({ err: err.message }, 'Redis connection warning (optional background queue store)');
});
