import express from 'express';
import imageNetRouter from './imagenet-router';
import cocoRouter from './coco-router';

const dataRouter = express.Router();

dataRouter.use('/imagenet', imageNetRouter);
dataRouter.use('/coco', cocoRouter);

export default dataRouter;
