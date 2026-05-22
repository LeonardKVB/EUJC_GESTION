import { Router } from 'express';
import * as stationController from '../controllers/stationController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { ROLES } from '../utils/constants';

const router = Router();

router.use(authMiddleware);

router.get('/', stationController.getAllStations);
router.post('/', roleMiddleware([ROLES.SUPER_ADMIN, ROLES.PROVINCIAL_REP]), stationController.createStation);
router.get('/:id', stationController.getStationById);

export default router;
