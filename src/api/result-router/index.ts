import express from 'express';
import { imageNetRouter } from './imagenet-router';

const resultRouter = express.Router();

resultRouter.use('/imagenet', imageNetRouter);

export default resultRouter;
