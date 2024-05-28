import { DeeplabV3ResultBodySchema } from '@/lib/results/deeplabv3';
import { createResultRouter } from '../util';

const deeplabv3Router = createResultRouter({
  schema: DeeplabV3ResultBodySchema,
  validate: (_body) => {
    return false;
  },
  writeOutputToFile: false
});

export { deeplabv3Router };
