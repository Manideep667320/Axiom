"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const logger_1 = require("./config/logger");
const request_id_middleware_1 = require("./api/middleware/request-id.middleware");
const error_middleware_1 = require("./api/middleware/error.middleware");
const agent_routes_1 = __importDefault(require("./api/routes/agent.routes"));
const feed_routes_1 = __importDefault(require("./api/routes/feed.routes"));
const decision_routes_1 = __importDefault(require("./api/routes/decision.routes"));
const run_routes_1 = __importDefault(require("./api/routes/run.routes"));
const health_routes_1 = __importDefault(require("./api/routes/health.routes"));
// Import workers to initialize event processors
require("./workers/discovery.worker");
require("./workers/editorial.worker");
require("./workers/generation.worker");
require("./workers/validation.worker");
require("./workers/publishing.worker");
require("./workers/memory.worker");
require("./workers/recovery.worker");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(request_id_middleware_1.requestIdMiddleware);
// Mount API routes
app.use('/api/agent', agent_routes_1.default);
app.use('/api/agent/feed', feed_routes_1.default);
app.use('/api/agent/decisions', decision_routes_1.default);
app.use('/api/agent/runs', run_routes_1.default);
app.use('/api/health', health_routes_1.default);
// Error middleware
app.use(error_middleware_1.errorMiddleware);
const PORT = env_1.config.PORT;
const server = app.listen(PORT, () => {
    logger_1.logger.info(`Axiom Backend Server running on port ${PORT} [env: ${env_1.config.NODE_ENV}]`);
});
process.on('SIGTERM', () => {
    logger_1.logger.info('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        logger_1.logger.info('HTTP server closed');
    });
});
exports.default = app;
