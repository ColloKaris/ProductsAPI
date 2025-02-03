// Validate a request against a schema - using Zod
// uses currying
import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ExpressError } from '../utils/ExpressError.js';

export const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    });
    next();
  } catch (e: any) {
    // pass the error to the global error handling middleware
    // e.errors - error messages from zod, will be stored under details
    // e.errors has - messages, path, input, error properties
    const error = new ExpressError(e.errors[0].message, 400, e.errors); // 400(bad request)
    next(error);
  }
}

