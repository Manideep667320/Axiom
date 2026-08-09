import { config } from '../config/env';

export const publishingPolicies = {
  minimumIntervalMinutes: config.MIN_PUBLISH_INTERVAL_MINUTES,
  maxPostsPer24Hours: config.MAX_POSTS_PER_24H,
  discoveryIntervalMinutes: config.DISCOVERY_INTERVAL_MINUTES,
};
