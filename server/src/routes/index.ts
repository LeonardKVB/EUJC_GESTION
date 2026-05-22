import { Router } from 'express';
import authRoutes from './authRoutes';
import provinceRoutes from './provinceRoutes';
import depenseRoutes from './depenseRoutes';
import stationRoutes from './stationRoutes';
import bergerieRoutes from './bergerieRoutes';
import memberRoutes from './memberRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/provinces', provinceRoutes);
router.use('/depenses', depenseRoutes);
router.use('/stations', stationRoutes);
router.use('/bergeries', bergerieRoutes);
router.use('/members', memberRoutes);

export default router;
