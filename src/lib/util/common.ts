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

/**
 * - Get the amount of each number in an array
 * - Example: [1, 1, 2, 3, 3, 3] => {1: 2, 2: 1, 3: 3}
 * @param arr - Array of numbers
 * @returns - Object with the amount of each number in the array
 */
export const getAmountMap = (arr: number[]): Record<number, number> => {
  return arr.reduce((acc, curr) => {
    if (typeof acc[curr] === 'undefined') {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
    return acc;
  }, {});
};

/**
 * - Replace all occurrences of a string in a string
 */
export const replaceAll = (value: string, search: string, replace: string) => {
  return value.split(search).join(replace);
};
