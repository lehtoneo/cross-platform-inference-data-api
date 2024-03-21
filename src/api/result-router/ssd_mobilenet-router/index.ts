import express from 'express';
import { z } from 'zod';
import { SendResultsBodySchema } from '@/lib/results/common';
import {
  SsdMobileNetResultBodySchema,
  ssdMobileNetUtil
} from '@/lib/results/ssd_mobilenet';

const ssdMobileNetRouter = express.Router();

ssdMobileNetRouter.post('/', (_req, res) => {
  const body = SsdMobileNetResultBodySchema.parse(_req.body);
  const validationResult = ssdMobileNetUtil.validateSSDMobileNet(body);

  res.send({
    correct: validationResult
  });
});

export { ssdMobileNetRouter };
