import { getAmountMap } from '@/lib/util/common';
import { SendResultsBodySchema } from '../common';
import { z } from 'zod';

const numberArray = z.array(z.number());

export const SsdMobileNetResultBodySchema = SendResultsBodySchema.and(
  z.object({
    output: z.tuple([numberArray, numberArray, numberArray, numberArray])
  })
);

type SsdMobileNetResultBody = z.infer<typeof SsdMobileNetResultBodySchema>;

var t: CocoGroundTruth[] = require('./array_grouped_coco_val_tiny.json');

const validateSSDMobileNet = (body: SsdMobileNetResultBody) => {
  const o = body.output;
  const groundTruth = t[body.inputIndex];
  const groundTruthObjects = groundTruth.objects.map((o) => o.class_id);
  const boxes = body.output[0];
  const classes = body.output[1].map((c) => c + 1);
  const scores = body.output[2];
  const numDetections = body.output[3];

  let treshHoldDetections: number[] = [];

  scores.forEach((score, i) => {
    if (score >= 0.4) {
      // console.log(`Detected object ${classes[i]} with score: ${score}`);
      treshHoldDetections.push(classes[i]);
    }
  });

  const amountMap = getAmountMap(treshHoldDetections);
  const groundTruthAmountMap = getAmountMap(groundTruthObjects);

  let errors = false;
  Object.keys(groundTruthAmountMap).forEach((key) => {
    if (groundTruthAmountMap[key] !== amountMap[key]) {
      console.log(`Amount of detected object ${key} is not correct`);
      errors = true;
    }
  });

  return errors ? false : true;
};

const ssdMobileNetUtil = {
  validateSSDMobileNet
};

export { ssdMobileNetUtil };
