import { Router } from 'express';
import { initAgentController, getAgentStatusController, getAgentTopicsController } from '../controllers/agent.controller';

const router = Router();

router.post('/init', initAgentController);
router.get('/status', getAgentStatusController);
router.get('/topics', getAgentTopicsController);

export default router;
