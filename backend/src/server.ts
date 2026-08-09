import app from './app';
import { config } from './config/env';
import { logger } from './config/logger';

// Import workers for background process mode
import './workers/discovery.worker';
import './workers/editorial.worker';
import './workers/generation.worker';
import './workers/validation.worker';
import './workers/publishing.worker';
import './workers/memory.worker';
import './workers/recovery.worker';

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
