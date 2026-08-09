import { Router } from 'express';
import { getDecisionsController } from '../controllers/decision.controller';

const router = Router();

router.get('/', getDecisionsController);

export default router;
