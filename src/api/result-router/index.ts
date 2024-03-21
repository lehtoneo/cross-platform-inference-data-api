import express from 'express';
import { imageNetRouter } from './mobilenet-router';
import { ssdMobileNetRouter } from './ssd_mobilenet-router';
import { deeplabv3Router } from './deeplabv3-router';

const resultRouter = express.Router();

resultRouter.use('/imagenet', imageNetRouter);
resultRouter.use('/ssd-mobilenet', ssdMobileNetRouter);
resultRouter.use('/deeplabv3', deeplabv3Router);

export default resultRouter;
