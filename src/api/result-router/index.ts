import express from 'express';
import { mobileNetRouter } from './mobilenet-router';
import { ssdMobileNetRouter } from './ssd_mobilenet-router';
import { deeplabv3Router } from './deeplabv3-router';

const resultRouter = express.Router();

resultRouter.use('/mobilenet', mobileNetRouter);
resultRouter.use('/ssd-mobilenet', ssdMobileNetRouter);
resultRouter.use('/deeplabv3', deeplabv3Router);

export default resultRouter;
