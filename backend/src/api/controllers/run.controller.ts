import { Request, Response, NextFunction } from 'express';
import { runRepository } from '../../repositories/run.repository';

export async function getRunsController(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
    const runs = await runRepository.getRecentRuns(limit);
    res.json({ runs });
  } catch (err) {
    next(err);
  }
}
