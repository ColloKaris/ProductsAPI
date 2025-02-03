import { Request, Response, NextFunction } from 'express';
import { addTimestamps } from '../utils/db/addTimeStamps.js';
import { User } from '../models/user.model.js';
import { createUser } from '../services/user.service.js';
import { ExpressError } from '../utils/ExpressError.js';
import { CreateUserInput } from '../schema/user.schema.js';

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  const newUser: User = addTimestamps({ name, email, password });

  const result = await createUser(newUser);

  if (result?.acknowledged) {
    res.status(201).send('Created a user successfully');
  } else {
    throw new ExpressError('COULD NOT CREATE A USER', 500);
  }
};
