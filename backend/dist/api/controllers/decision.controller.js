"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecisionsController = getDecisionsController;
const decision_repository_1 = require("../../repositories/decision.repository");
async function getDecisionsController(req, res, next) {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 50;
        const decisions = await decision_repository_1.decisionRepository.getRecentDecisions(limit);
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
    }
    catch (err) {
        next(err);
    }
}
