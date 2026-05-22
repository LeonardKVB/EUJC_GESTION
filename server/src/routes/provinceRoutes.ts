import { Router } from 'express';
import * as provinceController from '../controllers/provinceController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { ROLES } from '../utils/constants';

const router = Router();

router.use(authMiddleware);

router.get('/', provinceController.getAllProvinces);
router.post('/', roleMiddleware([ROLES.SUPER_ADMIN]), provinceController.createProvince);
router.get('/:id', provinceController.getProvinceById);

export default router;
