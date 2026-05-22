import { Request, Response, NextFunction } from 'express';
import { Province } from '../models/Hierarchy';
import { apiResponse } from '../utils/apiResponse';

export const getAllProvinces = async (req: any, res: Response, next: NextFunction) => {
  try {
    // Filtrage par scope (si implémenté dans le middleware)
    const provinces = await Province.findAll();
    res.json(apiResponse.success(provinces, 'Provinces récupérées'));
  } catch (error) {
    next(error);
  }
};

export const createProvince = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const province = await Province.create(req.body);
    res.status(201).json(apiResponse.success(province, 'Province créée avec succès'));
  } catch (error) {
    next(error);
  }
};

export const getProvinceById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const province = await Province.findByPk(req.params.id);
    if (!province) return res.status(404).json(apiResponse.error('Province non trouvée'));
    res.json(apiResponse.success(province));
  } catch (error) {
    next(error);
  }
};
