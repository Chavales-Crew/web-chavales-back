import 'dotenv/config';
import errorHandler from '@middleware/errorHandler';
import express from 'express';
import cors from 'cors';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json());

  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.send('OK');
  });

  app.use(errorHandler);

  return app;
};

export { createServer };
