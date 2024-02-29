import express from 'express';
import imageNetRouter from './imagenet';

const dataRouter = express.Router();

dataRouter.use('/imagenet', imageNetRouter);

export default dataRouter;
