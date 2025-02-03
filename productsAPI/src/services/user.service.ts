import bcrypt from 'bcrypt';
import * as mongodb from 'mongodb';

import { User } from '../models/user.model.js';
import { collections } from '../utils/db/connectToDB.js';
import { hashPassword } from '../utils/passwordUtils.js';
import { ExpressError } from '../utils/ExpressError.js';


export async function createUser(user: User) {
  const emailExists = await collections.users?.findOne({ email: user.email });
  if (emailExists) throw new ExpressError('Email already exists', 409);

  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;

  const result = await collections.users?.insertOne(user);
  return result;
};

export async function validateUser(email: string) {
  const result = await collections.users?.findOne({ email: email });
  return result;
};

export async function validatePassword(validUser: User, password: string) {
  const isValid = await bcrypt.compare(password, validUser.password);
  if (!isValid) return false;
  return {
    _id: validUser._id,
    name: validUser.name,
    email: validUser.email,
    createdAt: validUser.createdAt,
    updatedAt: validUser.updatedAt,
  };
};

export async function findUser(userId: string) {
  const result = await collections.users?.findOne({_id: new mongodb.ObjectId(userId)});
  return result;
}