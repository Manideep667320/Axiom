"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAgentController = initAgentController;
exports.getAgentStatusController = getAgentStatusController;
exports.getAgentTopicsController = getAgentTopicsController;
const orchestrator_1 = require("../../agent/orchestrator");
const topic_repository_1 = require("../../repositories/topic.repository");
async function initAgentController(req, res, next) {
    try {
        const result = await orchestrator_1.orchestrator.initializeAgent();
        res.json(result);
    }
    catch (err) {
        next(err);
    }
}
async function getAgentStatusController(req, res, next) {
    try {
        const status = await orchestrator_1.orchestrator.getAgentStatus();
        res.json(status);
    }
    catch (err) {
        next(err);
    }
}
async function getAgentTopicsController(req, res, next) {
    try {
        const topics = await topic_repository_1.topicRepository.getRecentTopics(50);
        res.json({ topics });
    }
    catch (err) {
        next(err);
    }
}
