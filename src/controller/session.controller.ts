import { Request, Response } from 'express';
import { validatePassword, validateUser } from '../services/user.service.js';
import { signJwt } from '../utils/jwt.utils.js';
import { addTimestamps } from '../utils/db/addTimeStamps.js';
import {
  createSession,
  findSessions,
  updateSession,
} from '../services/session.service.js';
import { ExpressError } from '../utils/ExpressError.js';
import config from 'config';

export const createUserSessionHandler = async (req: Request, res: Response) => {
  const { email, password, valid = true } = req.body;

  // Validate User
  const validUser = await validateUser(email);
  if (!validUser) {
    res.status(401).json('User does not exist');
    return;
  }

  // Validate the User's password
  const userWithValidPassword = await validatePassword(validUser, password);

  if (!userWithValidPassword) {
    res.status(401).json('Invalid email or password');
    return;
  }

  if (!userWithValidPassword._id) {
    throw new ExpressError('User ID is undefined', 500);
  }

  // Create a session.
  const newSession = addTimestamps({
    user: userWithValidPassword._id,
    valid,
    userAgent: req.get('user-agent') || '',
  });
  const result = await createSession(newSession);

  if (!result) throw new ExpressError('Could NOT create a session', 500);

  // Create an Access token.
  const accessToken = signJwt(
    {
      userId: userWithValidPassword._id.toString(),
      sessionId: result.insertedId.toString(),
    },
    { expiresIn: config.get<string>('jwt.accessTokenTtl') } // 15 min
  );

  // Create a Refresh token.
  const refreshToken = signJwt(
    {
      userId: userWithValidPassword._id.toString(),
      sessionId: result.insertedId.toString(),
    },
    { expiresIn: config.get<string>('jwt.refreshTokenTtl') } // 1 year
  );

  // Set HTTP-Only Cookies
  res.cookie('accessToken', accessToken, {
    httpOnly: true, // Prevents JavaScript access
    //secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
    sameSite: 'strict', // Protects against CSRF
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    //secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
  });

  res.status(200).json({ message: 'Successfully created a User Session' });
  return;
};

export const getUserSessionsHandler = async (req: Request, res: Response) => {
  const user = res.locals.user;

  const sessions = await findSessions(user.userId);

  res.send(sessions);
  return;
};

export async function deleteSessionHandler(req: Request, res: Response) {
  // update the session setting the
  const userId = res.locals.user.userId;
  const result = await updateSession(userId);

  if (
    result?.acknowledged &&
    result.matchedCount > 0 &&
    result.modifiedCount > 0
  ) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res
      .status(200)
      .json({
        message: 'Successfully logged out and deleted all active Sessions',
      });
  } else {
    res.status(500).json({ message: 'Could not Logout User' });
  }
}
