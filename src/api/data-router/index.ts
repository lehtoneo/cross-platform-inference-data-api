import express from 'express';
import imageNetRouter from './imagenet-router';
import cocoRouter from './coco-router';
import ade20KRouter from './ade20k-router';

const dataRouter = express.Router();

dataRouter.use('/imagenet', imageNetRouter);
dataRouter.use('/coco', cocoRouter);
dataRouter.use('/ade20k', ade20KRouter);

export default dataRouter;
