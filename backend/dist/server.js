"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const logger_1 = require("./config/logger");
// Import workers for background process mode
require("./workers/discovery.worker");
require("./workers/editorial.worker");
require("./workers/generation.worker");
require("./workers/validation.worker");
require("./workers/publishing.worker");
require("./workers/memory.worker");
require("./workers/recovery.worker");
const PORT = env_1.config.PORT;
const server = app_1.default.listen(PORT, () => {
    logger_1.logger.info(`Axiom Backend Server running on port ${PORT} [env: ${env_1.config.NODE_ENV}]`);
});
process.on('SIGTERM', () => {
    logger_1.logger.info('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        logger_1.logger.info('HTTP server closed');
    });
});
exports.default = app_1.default;
