import { z } from 'zod';
import { SendSpeedResultsBodySchema } from '../common/speed';
import { getTopXIndicesInOrder } from '../../util/common';
import { imageNetGroundTruth } from '../../../../imagenet_ground_truth';

export const MobileNetResultBodySchema = SendSpeedResultsBodySchema.and(
  z.object({
    output: z.array(z.number())
  })
);

type MobileNetOutput = z.infer<typeof MobileNetResultBodySchema>['output'];

type MobileNetResultBody = z.infer<typeof MobileNetResultBodySchema>;

type MobileNetValidationOptions = {
  topX: number;
};
const validateMobileNetResult = (
  input: MobileNetResultBody,
  opts: MobileNetValidationOptions
) => {
  const topXIndices = getTopXIndicesInOrder(input.output, opts.topX);
  const indexType = input.model === 'mobilenet_edgetpu' ? 1 : 0;
  const correctResult = imageNetGroundTruth[input.inputIndex] + indexType; // mobilenet_edgetpu has different indices
  console.log({ correctResult, topXIndices });

  const isCorrect = topXIndices.includes(correctResult);
  return isCorrect;
};

export const mobileNetUtil = {
  validateMobileNetResult
};
