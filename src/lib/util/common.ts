export const getTopXIndicesInOrder = (arr: number[], x: number) => {
  let indexValuePair = arr.map((value, index) => ({ index, value }));

  // Sort the array based on the value
  indexValuePair.sort((a, b) => b.value - a.value);

  // Slice the array to get the top x elements
  let topX = indexValuePair.slice(0, x);

  // Extract the indices from the top x elements
  let topIndices = topX.map((item) => item.index);

  return topIndices;
};
