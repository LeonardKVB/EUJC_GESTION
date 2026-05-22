import { Router } from 'express';
import * as memberController from '../controllers/memberController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', memberController.getAllMembers);
router.post('/disciples', memberController.createDisciple);
router.post('/chretiens', memberController.createChretien);

export default router;
