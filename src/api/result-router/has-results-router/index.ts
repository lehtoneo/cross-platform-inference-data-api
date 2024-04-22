import { batteryResultUtils } from '@/lib/results/common/battery';
import {
  SendResultsMetadata,
  speedResultUtils
} from '@/lib/results/common/speed';
import express from 'express';

const hasResultsRouter = express.Router();

hasResultsRouter.post('/', async (_req, res) => {
  const body = SendResultsMetadata.parse(_req.body);
  const result = await speedResultUtils.hasResults(body);
  console.log({ result });

  if (result) {
    res.send('true');
  } else {
    res.status(404).send('false');
  }
});

hasResultsRouter.post('/battery', async (_req, res) => {
  const body = SendResultsMetadata.parse(_req.body);
  const result = await batteryResultUtils.hasResults(body);

  if (result) {
    res.send('true');
  } else {
    res.status(404).send('false');
  }
});

export { hasResultsRouter };
