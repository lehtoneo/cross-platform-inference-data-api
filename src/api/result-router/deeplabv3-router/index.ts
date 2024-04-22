import {
  DeeplabV3ResultBodySchema,
  deeplabv3Util
} from '@/lib/results/deeplabv3';
import { createResultRouter } from '../util';

const deeplabv3Router = createResultRouter({
  schema: DeeplabV3ResultBodySchema,
  validate: (body) => {
    deeplabv3Util.validateDeeplabV3Result(body);
    return false;
  },
  writeOutputToFile: false
});

export { deeplabv3Router };
