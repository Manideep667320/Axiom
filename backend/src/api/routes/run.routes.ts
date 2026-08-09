import { Router } from 'express';
import { getRunsController } from '../controllers/run.controller';

const router = Router();

router.get('/', getRunsController);

export default router;
