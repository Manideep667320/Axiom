"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishingPolicies = void 0;
const env_1 = require("../config/env");
exports.publishingPolicies = {
    minimumIntervalMinutes: env_1.config.MIN_PUBLISH_INTERVAL_MINUTES,
    maxPostsPer24Hours: env_1.config.MAX_POSTS_PER_24H,
    discoveryIntervalMinutes: env_1.config.DISCOVERY_INTERVAL_MINUTES,
};
