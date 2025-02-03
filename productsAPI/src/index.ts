import express, { Request, Response,NextFunction } from 'express';
import config from 'config';
import cookieParser from 'cookie-parser';

import { connectToDatabase } from './utils/db/connectToDB.js';
import { logger } from './utils/logger.js';
import { productRouter } from './routes/products.routes.js';
import { sessionRouter } from './routes/sessions.routes.js';
import { userRouter } from './routes/users.routes.js';
import { healthcheckRouter } from './routes/healthcheck.routes.js';
import { ExpressError } from './utils/ExpressError.js';

const port = config.get<number>('port');
const dbUri = config.get<string>('database.dbUri');

const app = express();

app.use(express.json());
app.use(cookieParser());

// Routing
//app.use(productRouter);
app.use('/api/sessions',sessionRouter);
app.use('/api/users', userRouter);
app.use('/healthcheck', healthcheckRouter);

// Error handling middleware to handle all errors thrown in the application
// also handles unexpected or non-standard errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof ExpressError ? err.statusCode : 500;
  const message = err.message || 'Something went wrong';

  logger.error(`[ERROR] ${statusCode} - ${message}`);

  // check accept headers sent by the client to determine preferred media type in response
  if (req.accepts('html')) {
    res.status(statusCode).send(`${statusCode} - ${message}`)
  } else {
    res.status(statusCode).json({error: message, details: err.details || []})
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
