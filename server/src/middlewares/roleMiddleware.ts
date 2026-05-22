import { Response, NextFunction } from 'express';
import { apiResponse } from '../utils/apiResponse';

export const roleMiddleware = (roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json(apiResponse.error('Permissions insuffisantes'));
    }
    next();
  };
};
