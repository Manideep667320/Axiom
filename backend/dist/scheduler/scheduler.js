"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduler = exports.Scheduler = void 0;
const queue_1 = require("../workers/queue");
const policies_1 = require("./policies");
const logger_1 = require("../config/logger");
class Scheduler {
    intervalId = null;
    startAutonomousScheduler() {
        if (this.intervalId)
            return;
        logger_1.logger.info({ intervalMinutes: policies_1.publishingPolicies.discoveryIntervalMinutes }, 'Starting autonomous discovery scheduler...');
        // Trigger immediate initial discovery
        queue_1.discoveryQueue.add('discover-job', { timestamp: Date.now() });
        this.intervalId = setInterval(() => {
            logger_1.logger.info('Scheduler triggering discovery job...');
            queue_1.discoveryQueue.add('discover-job', { timestamp: Date.now() });
        }, policies_1.publishingPolicies.discoveryIntervalMinutes * 60 * 1000);
    }
    stopAutonomousScheduler() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            logger_1.logger.info('Stopped autonomous discovery scheduler');
        }
    }
}
exports.Scheduler = Scheduler;
exports.scheduler = new Scheduler();
