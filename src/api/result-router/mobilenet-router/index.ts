import { Router } from 'express';
import {
  MobileNetResultBodySchema,
  mobileNetUtil
} from '@/lib/results/mobilenet';
import { resultUtils } from '@/lib/results/common';

const mobileNetRouter = Router();

mobileNetRouter.post('/', (_req, res) => {
  try {
    const r = MobileNetResultBodySchema.parse(_req.body);
    const correct = mobileNetUtil.validateMobileNetResult(r, {
      topX: 1
    });

    try {
      resultUtils.writeResultToFile(r, 'mobilenet');
    } catch (e) {
      console.log({ e });
    }

    res.send({
      correct
    });
  } catch (e) {
    console.log({ e });
    res.status(400).send(e.errors);
  }
});

export { mobileNetRouter as imageNetRouter };
