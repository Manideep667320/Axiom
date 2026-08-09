"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedController = getFeedController;
const post_repository_1 = require("../../repositories/post.repository");
const agent_repository_1 = require("../../repositories/agent.repository");
const env_1 = require("../../config/env");
async function getFeedController(req, res, next) {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 20;
        const posts = await post_repository_1.postRepository.getFeedPosts(limit);
        const agent = await agent_repository_1.agentRepository.getAgent(env_1.config.AGENT_ID);
        res.json({
            agent: {
                id: env_1.config.AGENT_ID,
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
    }
    catch (err) {
        next(err);
    }
}
