import {
  MobileNetResultBodySchema,
  mobileNetUtil
} from '@/lib/results/mobilenet';
import { createResultRouter } from '../util';

const mobileNetRouter = createResultRouter({
  schema: MobileNetResultBodySchema,
  validate: (body) => {
    return mobileNetUtil.validateMobileNetResult(body, {
      topX: 1
    });
  },
  writeOutputToFile: true
});

export { mobileNetRouter };
