import { z } from 'zod';
import { SendResultsBodySchema } from '../common';
import { getTopXIndicesInOrder } from '../../util/common';
import { imageNetGroundTruth } from './imagenet_ground_truth';

export const MobileNetResultBodySchema = SendResultsBodySchema.and(
  z.object({
    output: z.array(z.number())
  })
);

type MobileNetResultBody = z.infer<typeof MobileNetResultBodySchema>;

type MobileNetValidationOptions = {
  topX: number;
};
const validateMobileNetResult = (
  input: MobileNetResultBody,
  opts: MobileNetValidationOptions
) => {
  const topXIndices = getTopXIndicesInOrder(input.output, opts.topX);
  const correctResult = imageNetGroundTruth[input.inputIndex] + 1; // +1 because the ground truth is 1-indexed
  console.log({ correctResult, topXIndices });
  const isCorrect = topXIndices.includes(correctResult);
  return isCorrect;
};

export const mobileNetUtil = {
  validateMobileNetResult
};
