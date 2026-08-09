import { agentRepository } from '../repositories/agent.repository';
import { runRepository } from '../repositories/run.repository';
import { scheduler } from '../scheduler/scheduler';
import { discoveryService } from './discovery.service';
import { config } from '../config/env';
import { logger } from '../config/logger';

export class Orchestrator {
  async initializeAgent() {
    logger.info('Initializing Axiom Autonomous Agent System...');
    const agent = await agentRepository.getAgent(config.AGENT_ID);
    if (!agent) {
      throw new Error(`Agent ${config.AGENT_ID} not found. Please run db:seed first.`);
    }

    const initializedAt = new Date();
    await agentRepository.updateAgentStatus(config.AGENT_ID, 'running', initializedAt);
    await agentRepository.getOrCreateAgentState(config.AGENT_ID);

    // Start background autonomous scheduler loop
    scheduler.startAutonomousScheduler();

    // Trigger initial run track record
    const run = await runRepository.startRun(config.AGENT_ID);

    // Initial immediate discovery call
    discoveryService
      .discoverTopics(config.AGENT_ID)
      .then((count) => {
        runRepository.updateRunMetrics(run.id, { topicsDiscovered: count });
        runRepository.completeRun(run.id, 'completed');
      })
      .catch((err) => {
        runRepository.completeRun(run.id, 'failed', err.message);
      });

    return {
      agentId: config.AGENT_ID,
      status: 'running',
      autonomous: true,
      initializedAt,
    };
  }

  async getAgentStatus() {
    const agent = await agentRepository.getAgent(config.AGENT_ID);
    const state = await agentRepository.getOrCreateAgentState(config.AGENT_ID);
    const runs = await runRepository.getRecentRuns(1);

    const uptime = agent?.initializedAt
      ? Math.floor((Date.now() - agent.initializedAt.getTime()) / 1000)
      : 0;

    return {
      agent: {
        id: config.AGENT_ID,
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

export const orchestrator = new Orchestrator();
