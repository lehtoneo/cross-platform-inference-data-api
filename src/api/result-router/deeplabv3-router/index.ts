import { SendResultsBodySchema } from '@/lib/results/common';
import express from 'express';
import { z } from 'zod';

const deeplabv3Router = express.Router();

const SsdMobileNetResultBodySchema = SendResultsBodySchema.and(
  z.object({
    output: z.array(z.number()).length(512 * 512)
  })
);

deeplabv3Router.post('/', (_req, res) => {
  try {
    const body = SsdMobileNetResultBodySchema.parse(_req.body);
    console.log('bodyOk');
    res.send('ok');
  } catch (e) {
    console.log({ e });
    res.status(400).send(e.errors);
  }
});

export { deeplabv3Router };
