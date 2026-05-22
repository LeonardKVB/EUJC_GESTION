import { Router } from 'express';
import * as depenseController from '../controllers/depenseController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { scopeMiddleware } from '../middlewares/scopeMiddleware';
import { ROLES } from '../utils/constants';

const router = Router();

router.use(authMiddleware);

router.get('/', scopeMiddleware, depenseController.getAllDepenses);
router.post('/', depenseController.createDepense);
router.patch('/:id/valider', roleMiddleware([ROLES.SUPER_ADMIN]), depenseController.validateDepense);

export default router;
