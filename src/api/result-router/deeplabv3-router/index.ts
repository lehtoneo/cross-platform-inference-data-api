import { SendResultsBodySchema, resultUtils } from '@/lib/results/common';
import express from 'express';
import { z } from 'zod';
import fs from 'fs';
import {
  DeeplabV3ResultBodySchema,
  deeplabv3Util
} from '@/lib/results/deeplabv3';

const deeplabv3Router = express.Router();

deeplabv3Router.post('/', (_req, res) => {
  try {
    const body = DeeplabV3ResultBodySchema.parse(_req.body);
    const { output, ...allButOutPut } = body;

    deeplabv3Util.validateDeeplabV3Result({
      ...allButOutPut,
      output: body.output.flat()
    });
    resultUtils.writeResultToFile({
      ...allButOutPut,
      output: body.output.flat()
    });

    res.send('ok');
  } catch (e) {
    console.log({ e });
    res.status(400).send(e.errors);
  }
});

export { deeplabv3Router };
