import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { apiResponse } from '../utils/apiResponse';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json(apiResponse.error('Identifiants invalides'));
    }

    if (!user.est_actif) {
      return res.status(403).json(apiResponse.error('Compte désactivé'));
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, province_id: user.province_id, station_id: user.station_id, bergerie_id: user.bergerie_id },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '24h' }
    );

    res.json(apiResponse.success({ user, token }, 'Connexion réussie'));
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: any, res: Response) => {
  res.json(apiResponse.success(req.user));
};
