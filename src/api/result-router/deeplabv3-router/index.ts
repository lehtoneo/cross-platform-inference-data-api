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

    deeplabv3Util.validateDeeplabV3Result(body);
    resultUtils.writeResultToFile(body);

    res.send('ok');
  } catch (e) {
    console.log({ e });
    res.status(400).send(e.errors);
  }
});

export { deeplabv3Router };
