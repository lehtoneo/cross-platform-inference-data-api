import { imageNetGroundTruth } from './imagenet_ground_truth';

const getTopXIndicesInOrder = (arr: number[], x: number) => {
  let indexValuePair = arr.map((value, index) => ({ index, value }));

  // Sort the array based on the value
  indexValuePair.sort((a, b) => b.value - a.value);

  // Slice the array to get the top x elements
  let topX = indexValuePair.slice(0, x);

  // Extract the indices from the top x elements
  let topIndices = topX.map((item) => item.index);

  return topIndices;
};

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
