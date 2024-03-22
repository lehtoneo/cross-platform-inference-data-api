import express from 'express';
import { resultUtils } from '@/lib/results/common';
import {
  SsdMobileNetResultBodySchema,
  ssdMobileNetUtil
} from '@/lib/results/ssd_mobilenet';

const ssdMobileNetRouter = express.Router();

ssdMobileNetRouter.post('/', async (_req, res) => {
  const body = SsdMobileNetResultBodySchema.parse(_req.body);
  const validationResult = ssdMobileNetUtil.validateSSDMobileNet(body);
  resultUtils.writeResultToFile(body);

  res.send({
    correct: validationResult
  });
});

export { ssdMobileNetRouter };
