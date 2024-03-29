import { SendResultsBody } from '@/lib/results/common';
import fileUtils from '@/lib/util/files';

const resultFolder = 'results';

const calculateAvgInferenceTime = (results: SendResultsBody[]) => {
  const total = results.reduce((acc, curr) => acc + curr.inferenceTimeMs, 0);
  return total / results.length;
};

const calculateHighestInferenceTime = (results: SendResultsBody[]) => {
  return results.reduce((acc, curr) => Math.max(acc, curr.inferenceTimeMs), 0);
};

const calculateLowestInferenceTime = (results: SendResultsBody[]) => {
  return results.reduce(
    (acc, curr) => Math.min(acc, curr.inferenceTimeMs),
    Infinity
  );
};

const calculate95PercentileInferenceTime = (results: SendResultsBody[]) => {
  const sorted = results.map((r) => r.inferenceTimeMs).sort((a, b) => a - b);
  const index = Math.floor(sorted.length * 0.95);
  return sorted[index];
};

(async () => {
  const results = await fileUtils.json.readJSONFilesFromDirectory<
    (SendResultsBody & { output: any })[]
  >(`${process.cwd()}/${resultFolder}`);

  results.forEach((result) => {
    const content = result.content;

    const { model, precision, delegate, frameWork, library } = content[0];

    const inferenceTime = calculateAvgInferenceTime(content);
    const highestInferenceTime = calculateHighestInferenceTime(content);
    const lowestInferenceTime = calculateLowestInferenceTime(content);
    const percentile95InferenceTime =
      calculate95PercentileInferenceTime(content);
    console.log({
      frameWork,
      library,
      name: `${model}_${precision}_${delegate}`,
      inferenceTime,
      highestInferenceTime,
      lowestInferenceTime,
      percentile95InferenceTime
    });
  });
})();
