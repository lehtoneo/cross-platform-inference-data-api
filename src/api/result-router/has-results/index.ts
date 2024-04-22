import { SendResultsMetaData, resultUtils } from '@/lib/results/common';
import express from 'express';

const hasResultsRouter = express.Router();

hasResultsRouter.post('/', async (_req, res) => {
  const body = SendResultsMetaData.parse(_req.body);
  const result = await resultUtils.hasResults(body);
  console.log({ result });

  if (result) {
    res.send('true');
  } else {
    res.status(404).send('false');
  }
});

export { hasResultsRouter };
