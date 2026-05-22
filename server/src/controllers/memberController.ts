import { Request, Response, NextFunction } from 'express';
import { Disciple, Chretien } from '../models/Hierarchy';
import { apiResponse } from '../utils/apiResponse';

export const getAllMembers = async (req: any, res: Response, next: NextFunction) => {
  try {
    const disciples = await Disciple.findAll();
    const chretiens = await Chretien.findAll();
    res.json(apiResponse.success({ disciples, chretiens }));
  } catch (error) {
    next(error);
  }
};

export const createDisciple = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const disciple = await Disciple.create(req.body);
    res.status(201).json(apiResponse.success(disciple, 'Disciple ajouté'));
  } catch (error) {
    next(error);
  }
};

export const createChretien = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chretien = await Chretien.create(req.body);
    res.status(201).json(apiResponse.success(chretien, 'Chrétien ajouté'));
  } catch (error) {
    next(error);
  }
};
