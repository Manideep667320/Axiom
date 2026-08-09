import { Request, Response, NextFunction } from 'express';
import { postRepository } from '../../repositories/post.repository';
import { agentRepository } from '../../repositories/agent.repository';
import { config } from '../../config/env';

export async function getFeedController(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
    const posts = await postRepository.getFeedPosts(limit);
    const agent = await agentRepository.getAgent(config.AGENT_ID);

    res.json({
      agent: {
        id: config.AGENT_ID,
        name: agent?.name || 'Axiom',
        role: agent?.persona?.role || 'Autonomous AI Systems Analyst',
      },
      posts: posts.map((p) => ({
        id: p.id,
        publishedAt: p.publishedAt,
        content: p.content,
        perspective: p.perspective,
        keyClaims: p.keyClaims,
        rationale: p.rationale,
        sources: p.postSources.map((s) => ({ id: s.sourceId, title: s.title, url: s.url })),
      })),
    });
  } catch (err) {
    next(err);
  }
}
