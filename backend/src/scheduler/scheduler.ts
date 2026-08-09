import { discoveryQueue } from '../workers/queue';
import { publishingPolicies } from './policies';
import { logger } from '../config/logger';

export class Scheduler {
  private intervalId: NodeJS.Timeout | null = null;

  startAutonomousScheduler() {
    if (this.intervalId) return;
    logger.info({ intervalMinutes: publishingPolicies.discoveryIntervalMinutes }, 'Starting autonomous discovery scheduler...');

    // Trigger immediate initial discovery
    discoveryQueue.add('discover-job', { timestamp: Date.now() });

    this.intervalId = setInterval(() => {
      logger.info('Scheduler triggering discovery job...');
      discoveryQueue.add('discover-job', { timestamp: Date.now() });
    }, publishingPolicies.discoveryIntervalMinutes * 60 * 1000);
  }

  stopAutonomousScheduler() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      logger.info('Stopped autonomous discovery scheduler');
    }
  }
}

export const scheduler = new Scheduler();
