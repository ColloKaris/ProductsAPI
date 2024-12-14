import express, { Request, Response,NextFunction } from 'express';
import config from 'config';

import { connectToDatabase } from './utils/db/connectToDB.js';
import { logger } from './utils/logger.js';

import { productRouter } from './routes/products.router.js';
import { sessionRouter } from './routes/sessions.router.js';
import { userRouter } from './routes/users.router.js';
import { healthcheckRouter } from './routes/healthcheck.router.js';
import { ExpressError } from './utils/ExpressError.js';

const port = config.get<number>('port');
const dbUri = config.get<string>('dbUri');

const app = express();

// Routing
app.use(productRouter);
app.use(sessionRouter);
app.use(userRouter);
app.use('/healthcheck', healthcheckRouter);

// Error handling middleware to handle all errors thrown in the application
// also handles unexpected or non-standard errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof ExpressError ? err.statusCode : 500;
  const message = err.message || 'Oh No, Something Went Wrong!';
  
  logger.error(`[ERROR] ${statusCode} - ${message}`);
  logger.error(err.stack)

  if (req.accepts('html')) {
    res.status(statusCode).send(`${statusCode} - ${message}`)
  } else {
    res.status(statusCode).json({error: message, statusCode})
  }
})

try {
  await connectToDatabase(dbUri);
  logger.info('DATABASE CONNECTED!');

  app.listen(port, () => {
    logger.info(`App is running at http://localhost:${port}`);
  });
} catch (error) {
  logger.error('Could not connect to the Database');
  process.exit(1);
}
