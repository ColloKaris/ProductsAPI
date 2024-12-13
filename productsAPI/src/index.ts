import express from 'express';
import config from 'config';

import { connectToDatabase } from './utils/db/connectToDB.js';
import { logger } from './utils/logger.js';

import { productRouter } from './routes/products.router.js';
import { sessionRouter } from './routes/sessions.router.js';
import { userRouter } from './routes/users.router.js';
import { healthcheckRouter } from './routes/healthcheck.router.js';

const port = config.get<number>('port');
const dbUri = config.get<string>('dbUri');

const app = express();

// Routing
app.use(productRouter);
app.use(sessionRouter);
app.use(userRouter);
app.use('/healthcheck', healthcheckRouter);

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
