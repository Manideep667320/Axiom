"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishingService = exports.PublishingService = void 0;
const post_repository_1 = require("../repositories/post.repository");
const topic_repository_1 = require("../repositories/topic.repository");
const hashing_1 = require("../utils/hashing");
const learning_service_1 = require("./learning.service");
const env_1 = require("../config/env");
const logger_1 = require("../config/logger");
class PublishingService {
    async publishPost(topicId, content, perspective, keyClaims, rationale, sources) {
        const topic = await topic_repository_1.topicRepository.getTopicById(topicId);
        if (!topic)
            throw new Error(`Topic ${topicId} not found`);
        const contentHash = (0, hashing_1.generateSHA256)(content);
        const idempotencyKey = `${env_1.config.AGENT_ID}:${topicId}:${contentHash}`;
        // Check Idempotency
        const existing = await post_repository_1.postRepository.findByIdempotencyKey(idempotencyKey);
        if (existing) {
            logger_1.logger.warn({ idempotencyKey }, 'Post publication skipped due to duplicate idempotency key');
            return existing;
        }
        const post = await post_repository_1.postRepository.createPost({
            agentId: env_1.config.AGENT_ID,
            topicId: topic.id,
            idempotencyKey,
            content,
            perspective,
            keyClaims,
            rationale,
            sources,
        });
        await topic_repository_1.topicRepository.updateJobState(topicId, 'PUBLISHED');
        await learning_service_1.learningService.learnFromPublication(post.id, topic.title, content, perspective);
        logger_1.logger.info({ postId: post.id, topicTitle: topic.title }, 'Successfully published post to simulated feed');
        return post;
    }
}
exports.PublishingService = PublishingService;
exports.publishingService = new PublishingService();
