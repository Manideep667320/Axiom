import Redis from 'ioredis';
import { config } from './env';
import { logger } from './logger';

export const redisConnection = new Redis(config.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

redisConnection.on('connect', () => {
  logger.info('Connected to Redis');
});

redisConnection.on('error', (err) => {
  logger.error({ err }, 'Redis connection error');
});
