import express from 'express';
import { createUserHandler } from '../controller/user.controller.js';
import { validate } from '../middleware/validateResource.js';
import { createUserSchema } from '../schema/user.schema.js';
import { wrapAsync } from '../utils/asyncErrorHandler.js';


export const userRouter = express.Router({mergeParams: true});

userRouter.post('/', validate(createUserSchema), wrapAsync(createUserHandler));