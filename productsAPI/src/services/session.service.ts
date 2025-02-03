import * as mongodb from 'mongodb';
import config from 'config';

import { Session } from '../models/session.model.js';
import { collections } from '../utils/db/connectToDB.js';
import { signJwt, verifyJwt } from '../utils/jwt.utils.js';
import { findUser } from './user.service.js';

export const createSession = async (session: Session) => {
  const result = await collections.sessions?.insertOne(session);
  return result;
};

export const findSessions = async (userId: string) => {
  const sessions = await collections.sessions?.find({user: new mongodb.ObjectId(userId), valid: true}).toArray(); // gets all docs from cursor
  return sessions; // Array of docs
};

export const findSessionsById = async (sessionId: string) => {
  const session = await collections.sessions?.findOne({_id: new mongodb.ObjectId(sessionId), valid: true});
  return session; // Array of docs
};

export const updateSession = async (userId: string) => {
  const result = await collections.sessions?.updateOne({user: new mongodb.ObjectId(userId)}, {$set: {valid: false}});
  return result;
};

// Reissue an access token
export const reIssueAccessToken = async ({refreshToken}: {refreshToken: string}) => {
  // decode refresh token to make sure it is valid
  const {decoded} = verifyJwt(refreshToken);

  if(!decoded) return false;
  
  const session = await findSessionsById(decoded.sessionId);

  if (!session) return false;

  const user = await findUser(decoded.userId);

  if (!user) return false;

  const accessToken = signJwt(
    {
      userId: user._id.toString(),
      sessionId: session._id.toString(),
    },
    { expiresIn: config.get<string>('jwt.accessTokenTtl') } // 15 min
  );
};