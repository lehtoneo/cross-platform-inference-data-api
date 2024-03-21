import { getTopXIndicesInOrder } from '../../util/common';
import { imageNetGroundTruth } from './imagenet_ground_truth';

type ImageNetValidationOptions = {
  topX: number;
};
const validateImageNetResult = (
  input: {
    predicted: number[];
    dataSetIndex: number;
  },
  opts: ImageNetValidationOptions
) => {
  const topXIndices = getTopXIndicesInOrder(input.predicted, opts.topX);
  const correctResult = imageNetGroundTruth[input.dataSetIndex] + 1; // +1 because the ground truth is 1-indexed
  console.log({ correctResult, topXIndices });
  const isCorrect = topXIndices.includes(correctResult);
  return isCorrect;
};

export const imageNetUtil = {
  validateImageNetResult
};
