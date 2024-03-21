import { Router } from 'express';
import { SendResultsBodySchema } from '../util';
import { z } from 'zod';
import { imageNetUtil } from '../../../lib/results/imagenet';

const imageNetRouter = Router();

const ImageNetResultBodySchema = SendResultsBodySchema.and(
  z.object({
    results: z.array(z.number())
  })
);

imageNetRouter.post('/', (_req, res) => {
  try {
    const r = ImageNetResultBodySchema.parse(_req.body);
    const correct = imageNetUtil.validateImageNetResult(
      {
        predicted: r.results,
        dataSetIndex: r.inputIndex
      },
      {
        topX: 1
      }
    );
    console.log({ correct });
    res.send({
      correct
    });
  } catch (e) {
    console.log({ e });
    res.status(400).send(e.errors);
  }
});

export { imageNetRouter };
