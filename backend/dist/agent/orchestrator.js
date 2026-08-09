"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orchestrator = exports.Orchestrator = void 0;
const agent_repository_1 = require("../repositories/agent.repository");
const run_repository_1 = require("../repositories/run.repository");
const scheduler_1 = require("../scheduler/scheduler");
const discovery_service_1 = require("./discovery.service");
const env_1 = require("../config/env");
const logger_1 = require("../config/logger");
class Orchestrator {
    async initializeAgent() {
        logger_1.logger.info('Initializing Axiom Autonomous Agent System...');
        const agent = await agent_repository_1.agentRepository.getAgent(env_1.config.AGENT_ID);
        if (!agent) {
            throw new Error(`Agent ${env_1.config.AGENT_ID} not found. Please run db:seed first.`);
        }
        const initializedAt = new Date();
        await agent_repository_1.agentRepository.updateAgentStatus(env_1.config.AGENT_ID, 'running', initializedAt);
        await agent_repository_1.agentRepository.getOrCreateAgentState(env_1.config.AGENT_ID);
        // Start background autonomous scheduler loop
        scheduler_1.scheduler.startAutonomousScheduler();
        // Trigger initial run track record
        const run = await run_repository_1.runRepository.startRun(env_1.config.AGENT_ID);
        // Initial immediate discovery call
        discovery_service_1.discoveryService
            .discoverTopics(env_1.config.AGENT_ID)
            .then((count) => {
            run_repository_1.runRepository.updateRunMetrics(run.id, { topicsDiscovered: count });
            run_repository_1.runRepository.completeRun(run.id, 'completed');
        })
            .catch((err) => {
            run_repository_1.runRepository.completeRun(run.id, 'failed', err.message);
        });
        return {
            agentId: env_1.config.AGENT_ID,
            status: 'running',
            autonomous: true,
            initializedAt,
        };
    }
    async getAgentStatus() {
        const agent = await agent_repository_1.agentRepository.getAgent(env_1.config.AGENT_ID);
        const state = await agent_repository_1.agentRepository.getOrCreateAgentState(env_1.config.AGENT_ID);
        const runs = await run_repository_1.runRepository.getRecentRuns(1);
        const uptime = agent?.initializedAt
            ? Math.floor((Date.now() - agent.initializedAt.getTime()) / 1000)
            : 0;
        return {
            agent: {
                id: env_1.config.AGENT_ID,
                name: agent?.name || 'Axiom',
                status: agent?.status || 'stopped',
                autonomous: agent?.isAutonomous ?? true,
            },
            uptimeSeconds: uptime,
            lastSuccessfulRun: state.lastSuccessfulRun,
            failureCount: state.failureCount,
            lastRun: runs[0] || null,
        };
    }
}
exports.Orchestrator = Orchestrator;
exports.orchestrator = new Orchestrator();
