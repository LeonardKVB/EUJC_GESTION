import { Request, Response, NextFunction } from 'express';
import { Depense } from '../models/Depense';
import { apiResponse } from '../utils/apiResponse';

export const getAllDepenses = async (req: any, res: Response, next: NextFunction) => {
  try {
    const depenses = await Depense.findAll({
      where: req.scope || {} // Utilisation du scope injecté par le middleware
    });
    res.json(apiResponse.success(depenses, 'Dépenses récupérées'));
  } catch (error) {
    next(error);
  }
};

export const createDepense = async (req: any, res: Response, next: NextFunction) => {
  try {
    const depenseData = {
      ...req.body,
      enregistre_par: req.user.id,
      statut: 'EN_ATTENTE'
    };
    const depense = await Depense.create(depenseData);
    res.status(201).json(apiResponse.success(depense, 'Dépense enregistrée. En attente de validation.'));
  } catch (error) {
    next(error);
  }
};

export const validateDepense = async (req: any, res: Response, next: NextFunction) => {
  try {
    const depense = await Depense.findByPk(req.params.id);
    if (!depense) return res.status(404).json(apiResponse.error('Dépense non trouvée'));

    await depense.update({
      statut: 'VALIDÉ',
      valide_par: req.user.id
    });

    res.json(apiResponse.success(depense, 'Dépense validée avec succès'));
  } catch (error) {
    next(error);
  }
};
