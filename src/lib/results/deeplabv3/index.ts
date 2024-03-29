import { z } from 'zod';
import { SendResultsBodySchema } from '../common';
import fs from 'fs';

const deeplabArray = z.array(z.number()).length(512 * 512);

const Array512x512Schema = z
  .array(z.array(z.number()))
  .refine(
    (array) =>
      array.length === 512 &&
      array.every((innerArray) => innerArray.length === 512),
    {
      message: 'Array must be of size 512x512'
    }
  );

const DeeplabV3ResultBodySchema = SendResultsBodySchema.and(
  // Accept both 1D and 2D arrays
  z.object({
    output: z.union([deeplabArray, Array512x512Schema])
  })
);

type DeeplabV3ResultBody = z.infer<typeof DeeplabV3ResultBodySchema>;

const validateDeeplabV3Result = (input: DeeplabV3ResultBody) => {
  const body = input;
  try {
    if (body.inputIndex === 0) {
      console.log(body.output);
    }
    const curr = body.inputIndex + 1;
    const leadingZeros = curr < 10 ? '00' : curr < 100 ? '0' : '';
    const path = `ade20k-annotations/ADE_val_00000${leadingZeros}${curr}.raw`;

    const t = fs.readFileSync(path);
    const groundTruth = Array.from(t);
    const preds =
      body.output.length === 512 * 512
        ? (body.output as number[])
        : body.output.flat();

    const accuracy = calculateAccuracy(preds, groundTruth);
    const miou = calculateMIoU(preds, groundTruth);
    console.log({ accuracy, miou });
  } catch (e) {
    console.log({ e });
  }
};

function calculateAccuracy(outputs: number[], labels: number[]): number {
  let correct = 0;
  outputs.forEach((output, index) => {
    if (output === labels[index]) {
      correct += 1;
    }
  });
  return correct / outputs.length;
}

function calculateIoU(classId, outputs, labels) {
  let intersection = 0;
  let union = 0;

  for (let i = 0; i < outputs.length; i++) {
    const isOutputClassId = outputs[i] === classId;
    const isLabelClassId = labels[i] === classId;

    if (isOutputClassId || isLabelClassId) {
      union++;

      if (isOutputClassId && isLabelClassId) {
        intersection++;
      }
    }
  }

  return union === 0 ? 0 : intersection / union;
}
function calculateMIoU(outputs: number[], labels: number[]): number {
  labels = labels.map((label) => {
    if (label > 32) {
      return 32;
    }
    return label;
  });
  const classes = Array.from(new Set([...outputs, ...labels]));
  const ious = classes.map((classId) => calculateIoU(classId, outputs, labels));
  const sum = ious.reduce((a, b) => a + b, 0);
  return sum / classes.length;
}
const deeplabv3Util = {
  validateDeeplabV3Result
};

export { DeeplabV3ResultBodySchema, deeplabv3Util };
