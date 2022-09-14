import { Application } from 'express';
import { Server } from 'http';

import { discordRouter } from './discord';

const setupRoutes = (app: Application, _server: Server) => {
  app.get('/', (_req, res) => {
    res.send('Hello World!');
  });

  app.use('/discord', discordRouter);
};

export { setupRoutes };
