import fileUtils from '@/lib/util/files';
import { z } from 'zod';

const SendResultsMetaData = z.object({
  resultsId: z.string(),
  platform: z.string(),
  frameWork: z.string(),
  precision: z.string(),
  library: z.string()
});

type SendResultsMetaData = z.infer<typeof SendResultsMetaData>;

export const SendResultsBodySchema = SendResultsMetaData.and(
  z.object({
    inferenceTimeMs: z.number().int(),
    inputIndex: z.number().int(),
    output: z.any()
  })
);

type SendResultsBody = z.infer<typeof SendResultsBodySchema>;

const writeResultToFile = (input: SendResultsBody, model: string) => {
  const filePath = `${process.cwd()}/results/${input.resultsId}.json`;
  fileUtils.createFileIfNotExists(filePath, '[]');

  fileUtils.json.pushToJsonFileArray(filePath, {
    ...input,
    model
  });
};

export const resultUtils = {
  writeResultToFile
};
