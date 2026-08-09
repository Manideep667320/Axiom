import express from 'express';
import cors from 'cors';
import { requestIdMiddleware } from './api/middleware/request-id.middleware';
import { errorMiddleware } from './api/middleware/error.middleware';

import agentRoutes from './api/routes/agent.routes';
import feedRoutes from './api/routes/feed.routes';
import decisionRoutes from './api/routes/decision.routes';
import runRoutes from './api/routes/run.routes';
import healthRoutes from './api/routes/health.routes';

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

export default app;
