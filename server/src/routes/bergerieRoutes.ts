import { Router } from 'express';
import * as bergerieController from '../controllers/bergerieController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { ROLES } from '../utils/constants';

const router = Router();

router.use(authMiddleware);

router.get('/', bergerieController.getAllBergeries);
router.post('/', roleMiddleware([ROLES.SUPER_ADMIN, ROLES.PROVINCIAL_REP]), bergerieController.createBergerie);

export default router;
