import express from 'express';
import { resultUtils } from '@/lib/results/common';
import {
  SsdMobileNetResultBodySchema,
  ssdMobileNetUtil
} from '@/lib/results/ssd_mobilenet';

const ssdMobileNetRouter = express.Router();

ssdMobileNetRouter.post('/', async (_req, res) => {
  try {
    console.log({ body: _req.body });
    const body = SsdMobileNetResultBodySchema.parse(_req.body);
    const validationResult = ssdMobileNetUtil.validateSSDMobileNet(body);
    resultUtils.writeResultToFile(body);

    res.send({
      correct: validationResult
    });
  } catch (e) {
    console.log({ e });
    res.status(400).send(e.errors);
  }
});

export { ssdMobileNetRouter };
