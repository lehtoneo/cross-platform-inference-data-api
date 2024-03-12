import express from 'express';
import dataRouter from './data-router';

const apiRouter = express.Router();

apiRouter.use('/data', dataRouter);

export default apiRouter;
