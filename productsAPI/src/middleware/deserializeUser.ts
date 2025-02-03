import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils.js';

export const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return next();
  }
  
  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded; // Attach the user info to `res.locals`
    return next();
  }
  return next();
};