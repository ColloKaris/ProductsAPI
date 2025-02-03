import express from 'express';
import { createUserSessionHandler, getUserSessionsHandler } from '../controller/session.controller.js';
import { validate } from '../middleware/validateResource.js';
import { createSessionSchema } from '../schema/session.schema.js';
import { requireUser } from '../middleware/requireUser.js';
import { deserializeUser } from '../middleware/deserializeUser.js';
import { wrapAsync } from '../utils/asyncErrorHandler.js';

export const sessionRouter = express.Router({mergeParams: true});

sessionRouter.post('/', validate(createSessionSchema) , wrapAsync(createUserSessionHandler));

sessionRouter.get('/', deserializeUser, requireUser, wrapAsync(getUserSessionsHandler));