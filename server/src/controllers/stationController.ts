import { Request, Response, NextFunction } from 'express';
import { Station } from '../models/Hierarchy';
import { apiResponse } from '../utils/apiResponse';

export const getAllStations = async (req: any, res: Response, next: NextFunction) => {
  try {
    const where: any = {};
    if (req.user.role === 'PROVINCIAL_REP') {
      where.province_id = req.user.province_id;
    }
    const stations = await Station.findAll({ where });
    res.json(apiResponse.success(stations));
  } catch (error) {
    next(error);
  }
};

export const createStation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const station = await Station.create(req.body);
    res.status(201).json(apiResponse.success(station, 'Station créée'));
  } catch (error) {
    next(error);
  }
};

export const getStationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const station = await Station.findByPk(req.params.id);
    if (!station) return res.status(404).json(apiResponse.error('Station non trouvée'));
    res.json(apiResponse.success(station));
  } catch (error) {
    next(error);
  }
};
