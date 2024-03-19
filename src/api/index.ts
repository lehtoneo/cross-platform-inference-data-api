import express from 'express';
import dataRouter from './data-router';
import resultRouter from './result-router';

const apiRouter = express.Router();

apiRouter.use('/data', dataRouter);
apiRouter.use('/results', resultRouter);

export default apiRouter;
