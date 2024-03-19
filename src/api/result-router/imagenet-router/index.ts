import { Router } from 'express';
import { SendResultsBodySchema } from '../util';
import { z } from 'zod';

const imageNetRouter = Router();

const ImageNetResultBodySchema = SendResultsBodySchema.and(
  z.object({
    results: z.array(z.number())
  })
);

imageNetRouter.post('/', (_req, res) => {
  try {
    const r = ImageNetResultBodySchema.parse(_req.body);
    console.log({ r });
    res.send('ok');
  } catch (e) {
    console.log({ e });
    res.status(400).send(e.errors);
  }
});

export { imageNetRouter };
