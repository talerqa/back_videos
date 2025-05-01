import express, {Express} from 'express';
import {homeTask01Router} from "./hometask_01/routers/routers";
import {setupSwagger} from "./core/swagger/setup-swagger";

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get('/', (req, res) => {
    res.status(200).send('hello world!!!');
  });

  // // Подключаем роутеры
  app.use('/hometask_01/api', homeTask01Router);
  // app.use('/testing', testingRouter);
  setupSwagger(app);
  return app;
};