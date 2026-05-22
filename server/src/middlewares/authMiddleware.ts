import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { apiResponse } from '../utils/apiResponse';

export const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json(apiResponse.error('Token manquant'));
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    const user = await User.findByPk(decoded.id);

    if (!user || !user.est_actif) {
      return res.status(401).json(apiResponse.error('Utilisateur non autorisé'));
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json(apiResponse.error('Session expirée ou invalide'));
  }
};
