import express from 'express';
import { SendResultsBodySchema } from '../util';
import { z } from 'zod';

const ssdMobileNetRouter = express.Router();

const SsdMobileNetResultBodySchema = SendResultsBodySchema.and(
  z.object({
    results: z.array(z.array(z.number())).length(4)
  })
);

ssdMobileNetRouter.post('/', (_req, res) => {
  console.log(_req.body);
  const body = SsdMobileNetResultBodySchema.parse(_req.body);
  console.log(body.results);
  res.send('ok');
});

export { ssdMobileNetRouter };
