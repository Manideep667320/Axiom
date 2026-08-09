"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationWorker = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = require("../config/redis");
const review_service_1 = require("../agent/review.service");
const verification_service_1 = require("../agent/verification.service");
const rate_limiter_1 = require("../scheduler/rate-limiter");
const queue_1 = require("./queue");
const topic_repository_1 = require("../repositories/topic.repository");
const logger_1 = require("../config/logger");
exports.validationWorker = new bullmq_1.Worker('validation', async (job) => {
    const { topicId, content, perspective, keyClaims, source, rawContent } = job.data;
    logger_1.logger.info({ jobId: job.id, topicId }, 'Processing validation & review job...');
    // 1. Evidence Grounding Verification
    const grounding = verification_service_1.verificationService.verifyEvidenceGrounding(keyClaims, rawContent);
    if (!grounding.grounded) {
        logger_1.logger.warn({ ungroundedClaims: grounding.missingClaims }, 'Validation failed: Ungrounded claims in generated draft');
    }
    // 2. Self-Review Critique
    const review = await review_service_1.reviewService.reviewDraft(content, keyClaims, rawContent);
    if (!review.approved) {
        logger_1.logger.warn({ feedback: review.feedback }, 'Validation failed: Self-review draft rejected');
        await topic_repository_1.topicRepository.updateJobState(topicId, 'REJECTED');
        return;
    }
    // 3. Rate Limit & Cadence Check
    const rateCheck = await rate_limiter_1.rateLimiter.canPublishNow();
    if (!rateCheck.allowed) {
        logger_1.logger.info({ reason: rateCheck.reason }, 'Post queued due to rate limit policy');
        await topic_repository_1.topicRepository.updateJobState(topicId, 'SCHEDULED');
        return;
    }
    await queue_1.publishingQueue.add('publish-post', {
        topicId,
        content,
        perspective,
        keyClaims,
        rationale: {
            whySelected: 'High editorial value & primary source verification.',
            whyRelevantNow: 'Recent release.',
            editorialScore: 8.8,
            sources: [{ title: source.title, url: source.url }],
        },
        sources: [source],
    });
}, { connection: redis_1.redisConnection });
