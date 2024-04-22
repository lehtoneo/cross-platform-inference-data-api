import {
  SendBatteryResultsBodySchema,
  batteryResultUtils
} from '@/lib/results/common/battery';
import express from 'express';

const batteryRouter = express.Router();

batteryRouter.post('/', async (_req, res) => {
  try {
    const body = SendBatteryResultsBodySchema.parse(_req.body);

    batteryResultUtils.writeBatteryResultsToFile(body);

    res.send('Ok');
  } catch (e) {
    console.log({ e });
    res.status(400).send(e.errors);
  }
});

export { batteryRouter };
