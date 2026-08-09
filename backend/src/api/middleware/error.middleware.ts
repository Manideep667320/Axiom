import { Request, Response, NextFunction } from 'express';
import { logger } from '../../config/logger';

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error({ err, url: req.url, method: req.method }, 'Unhandled Express Error');
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
}
