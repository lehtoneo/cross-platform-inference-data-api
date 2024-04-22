import {
  SsdMobileNetResultBodySchema,
  ssdMobileNetUtil
} from '@/lib/results/ssd_mobilenet';
import { createResultRouter } from '../util';

const ssdMobileNetRouter = createResultRouter({
  schema: SsdMobileNetResultBodySchema,
  validate: (_body) => {
    return true;
  },
  writeOutputToFile: false
});

export { ssdMobileNetRouter };
