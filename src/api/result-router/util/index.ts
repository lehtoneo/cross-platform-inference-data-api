import { SendResultsBody, resultUtils } from '@/lib/results/common';
import express from 'express';
import { z } from 'zod';

export const createResultRouter = (opts: {
  schema: z.ZodType<SendResultsBody, any, any>;
  validate?: (body: any) => boolean;
  writeOutputToFile: boolean;
}) => {
  const multipleSchema = z.array(opts.schema);
  const router = express.Router();
  var writeOutputToFile =
    opts.writeOutputToFile === undefined ? true : opts.writeOutputToFile;
  router.post('/', async (_req, res) => {
    try {
      console.log('??');
      const body = opts.schema.parse(_req.body);
      const validationResult = opts.validate ? opts.validate(body) : true;

      resultUtils.writeResultToFile(body, writeOutputToFile);

      res.send({
        correct: validationResult
      });
    } catch (e) {
      console.log({ e });
      res.status(400).send(e.errors);
    }
  });

  router.post('/multiple', async (_req, res) => {
    try {
      const body = multipleSchema.parse(_req.body);

      body.forEach((b) => resultUtils.writeResultToFile(b));

      res.send('Ok');
    } catch (e) {
      console.log({ e });
      res.status(400).send(e.errors);
    }
  });

  return router;
};
