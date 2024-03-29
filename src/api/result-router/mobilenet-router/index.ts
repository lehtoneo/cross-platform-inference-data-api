import { Router } from 'express';
import {
  MobileNetResultBodySchema,
  mobileNetUtil
} from '@/lib/results/mobilenet';
import { resultUtils } from '@/lib/results/common';

const mobileNetRouter = Router();

mobileNetRouter.post('/', (_req, res) => {
  try {
    console.log('??');
    const body = MobileNetResultBodySchema.parse(_req.body);
    console.log({ body });
    const correct = mobileNetUtil.validateMobileNetResult(body, {
      topX: 1
    });

    console.log({ correct });

    try {
      resultUtils.writeResultToFile(body);
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

export { mobileNetRouter };
