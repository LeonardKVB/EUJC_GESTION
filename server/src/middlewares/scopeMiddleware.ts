import { Response, NextFunction } from 'express';

export const scopeMiddleware = (req: any, res: Response, next: NextFunction) => {
  const user = req.user;
  let scope: any = {};

  if (user.role === 'SUPER_ADMIN') {
    // Pas de filtre
  } else if (user.role === 'PROVINCIAL_REP') {
    scope.province_id = user.province_id;
  } else if (user.role === 'APOTRE') {
    scope.station_id = user.station_id;
  } else if (user.role === 'BERGER') {
    scope.bergerie_id = user.bergerie_id;
  }

  req.scope = scope;
  next();
};
