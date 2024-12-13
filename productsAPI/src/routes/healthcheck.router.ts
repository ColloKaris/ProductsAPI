import express, { Request, Response, NextFunction } from 'express';

export const healthcheckRouter = express.Router({mergeParams: true});

// if this endpoint returns 200, our API is up and running
healthcheckRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(200);
})