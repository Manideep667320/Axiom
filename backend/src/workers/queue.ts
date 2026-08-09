import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis';

export const discoveryQueue = new Queue('discovery', { connection: redisConnection as any });
export const editorialQueue = new Queue('editorial', { connection: redisConnection as any });
export const memoryQueue = new Queue('memory', { connection: redisConnection as any });
export const generationQueue = new Queue('generation', { connection: redisConnection as any });
export const validationQueue = new Queue('validation', { connection: redisConnection as any });
export const publishingQueue = new Queue('publishing', { connection: redisConnection as any });
export const recoveryQueue = new Queue('recovery', { connection: redisConnection as any });
