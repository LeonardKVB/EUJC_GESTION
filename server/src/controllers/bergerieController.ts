import { Request, Response, NextFunction } from 'express';
import { Bergerie } from '../models/Hierarchy';
import { apiResponse } from '../utils/apiResponse';

export const getAllBergeries = async (req: any, res: Response, next: NextFunction) => {
  try {
    const where: any = {};
    if (req.user.role === 'PROVINCIAL_REP') {
      where.province_id = req.user.province_id;
    }
    const bergeries = await Bergerie.findAll({ where });
    res.json(apiResponse.success(bergeries));
  } catch (error) {
    next(error);
  }
};

export const createBergerie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bergerie = await Bergerie.create(req.body);
    res.status(201).json(apiResponse.success(bergerie, 'Bergerie créée'));
  } catch (error) {
    next(error);
  }
};
