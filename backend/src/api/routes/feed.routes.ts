import { Router } from 'express';
import { getFeedController } from '../controllers/feed.controller';

const router = Router();

router.get('/', getFeedController);

export default router;
