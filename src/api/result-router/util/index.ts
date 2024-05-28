import {
  SendSpeedResultsBodyType,
  speedResultUtils
} from '@/lib/results/common/speed';
import express from 'express';
import { z } from 'zod';

export const createResultRouter = (opts: {
  schema: z.ZodType<SendSpeedResultsBodyType, any, any>;
  validate?: (body: any) => boolean;
  writeOutputToFile: boolean;
}) => {
  const multipleSchema = z.array(opts.schema);
  const router = express.Router();
  var writeOutputToFile =
    opts.writeOutputToFile === undefined ? true : opts.writeOutputToFile;
  router.post('/', async (_req, res) => {
    try {
      const body = opts.schema.parse(_req.body);
      const validationResult = opts.validate ? opts.validate(body) : true;

      speedResultUtils.writeSpeedResultsToFile(body, writeOutputToFile);

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

      body.forEach((b) => speedResultUtils.writeSpeedResultsToFile(b));

      res.send('Ok');
    } catch (e) {
      console.log({ e });
      res.status(400).send(e.errors);
    }
  });

  return router;
};
