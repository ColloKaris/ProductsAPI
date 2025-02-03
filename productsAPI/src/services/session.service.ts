import { Session } from '../models/session.model.js';
import { collections } from '../utils/db/connectToDB.js';
import * as mongodb from 'mongodb';

export const createSession = async (session: Session) => {
  const result = await collections.sessions?.insertOne(session);
  return result;
}

export const findSessions = async (userId: string) => {
  const sessions = await collections.sessions?.find({_id: new mongodb.ObjectId(userId), valid: true}).toArray(); // gets all docs from cursor
  return sessions; // Array of docs
} 