import { Request, Response, NextFunction } from 'express';
import { decisionRepository } from '../../repositories/decision.repository';

export async function getDecisionsController(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const decisions = await decisionRepository.getRecentDecisions(limit);

    res.json({
      decisions: decisions.map((d) => ({
        id: d.id,
        topicId: d.topicId,
        topicTitle: d.topic.title,
        passedHardGates: d.passedHardGates,
        rejectionReason: d.rejectionReason,
        action: d.action,
        overallScore: d.overallScore,
        scores: {
          relevance: d.relevanceScore,
          novelty: d.noveltyScore,
          technicalDepth: d.technicalDepthScore,
          impact: d.impactScore,
          credibility: d.credibilityScore,
          narrativeContinuity: d.narrativeContinuityScore,
        },
        rationale: d.rationale,
        createdAt: d.createdAt,
      })),
    });
  } catch (err) {
    next(err);
  }
}
