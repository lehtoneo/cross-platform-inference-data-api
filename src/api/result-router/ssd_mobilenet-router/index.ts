import express from 'express';
import { SendResultsBodySchema } from '../util';
import { z } from 'zod';
import { ssdMobileNetUtil } from '../util/ssd_mobilenet';

const ssdMobileNetRouter = express.Router();

const numberArray = z.array(z.number());

const SsdMobileNetResultBodySchema = SendResultsBodySchema.and(
  z.object({
    results: z.tuple([numberArray, numberArray, numberArray, numberArray])
  })
);

ssdMobileNetRouter.post('/', (_req, res) => {
  const body = SsdMobileNetResultBodySchema.parse(_req.body);
  const validationResult = ssdMobileNetUtil.validateSSDMobileNet({
    result: body.results,
    index: body.inputIndex
  });

  console.log({ validationResult });
  res.send({
    correct: validationResult
  });
});

export { ssdMobileNetRouter };
