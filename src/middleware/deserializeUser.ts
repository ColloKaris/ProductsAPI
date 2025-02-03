import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils.js';
import { reIssueAccessToken } from '../services/session.service.js';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded; // Attach the user info to `res.locals`
    return next();
  }

  // Issue refresh token if the token is expired
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });
    if (newAccessToken) {
      res.cookie('accessToken', accessToken, {
        httpOnly: true, // Prevents JavaScript access
        //secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        sameSite: 'strict', // Protects against CSRF
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      // Verifying again in order to add decoded to res.locals
      const { decoded, expired } = verifyJwt(newAccessToken);

      if (decoded) {
        res.locals.user = decoded; // Attach the user info to `res.locals`
        return next();
      }
    }
  };
  return next();
};