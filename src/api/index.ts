import express from 'express';
import dataRouter from './data-router';
import exp from 'constants';

const apiRouter = express.Router();

apiRouter.use('/data', dataRouter);

export default apiRouter;
