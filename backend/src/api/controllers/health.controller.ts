import { Request, Response } from 'express';
import { prisma } from '../../config/database';
import { redisConnection } from '../../config/redis';

export async function healthCheckController(req: Request, res: Response) {
  let dbStatus = 'ok';
  let redisStatus = 'ok';

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    dbStatus = 'error';
  }

  try {
    await redisConnection.ping();
  } catch {
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
