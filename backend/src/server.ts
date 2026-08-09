import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import { logger } from './config/logger';
import { requestIdMiddleware } from './api/middleware/request-id.middleware';
import { errorMiddleware } from './api/middleware/error.middleware';

import agentRoutes from './api/routes/agent.routes';
import feedRoutes from './api/routes/feed.routes';
import decisionRoutes from './api/routes/decision.routes';
import runRoutes from './api/routes/run.routes';
import healthRoutes from './api/routes/health.routes';

// Import workers to initialize event processors
import './workers/discovery.worker';
import './workers/editorial.worker';
import './workers/generation.worker';
import './workers/validation.worker';
import './workers/publishing.worker';
import './workers/memory.worker';
import './workers/recovery.worker';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestIdMiddleware);

// Mount API routes
app.use('/api/agent', agentRoutes);
app.use('/api/agent/feed', feedRoutes);
app.use('/api/agent/decisions', decisionRoutes);
app.use('/api/agent/runs', runRoutes);
app.use('/api/health', healthRoutes);

// Error middleware
app.use(errorMiddleware);

const PORT = config.PORT;

const server = app.listen(PORT, () => {
  logger.info(`Axiom Backend Server running on port ${PORT} [env: ${config.NODE_ENV}]`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
  });
});

export default app;
