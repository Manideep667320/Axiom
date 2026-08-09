import { Request, Response, NextFunction } from 'express';
import { orchestrator } from '../../agent/orchestrator';
import { topicRepository } from '../../repositories/topic.repository';

export async function initAgentController(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await orchestrator.initializeAgent();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getAgentStatusController(req: Request, res: Response, next: NextFunction) {
  try {
    const status = await orchestrator.getAgentStatus();
    res.json(status);
  } catch (err) {
    next(err);
  }
}

export async function getAgentTopicsController(req: Request, res: Response, next: NextFunction) {
  try {
    const topics = await topicRepository.getRecentTopics(50);
    res.json({ topics });
  } catch (err) {
    next(err);
  }
}
