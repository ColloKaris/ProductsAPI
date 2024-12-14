import { User } from '../models/user.model.js';
import { collections } from '../utils/db/connectToDB.js';
import { hashPassword } from '../utils/passwordUtils.js';
import { ExpressError } from '../utils/ExpressError.js';

export const createUser = async (user: User) => {
  const emailExists = await collections.users?.findOne({email: user.email})
  if(emailExists) throw new ExpressError('Email already exists', 409)
  
  const hashedPassword = await hashPassword(user.password)
  user.password = hashedPassword;

  const result = await collections.users?.insertOne(user);
  return result;
}