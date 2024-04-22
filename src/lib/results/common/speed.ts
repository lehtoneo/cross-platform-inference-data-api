import { replaceAll } from '@/lib/util/common';
import fileUtils from '@/lib/util/files';
import { z } from 'zod';
import { getResultPaths } from './util';

export const SendResultsMetadata = z.object({
  resultsId: z.string(),
  platform: z.enum(['android', 'ios']),
  deviceModelName: z.string(),
  frameWork: z.enum(['react-native', 'flutter']),
  precision: z.string(),
  library: z.string(),
  model: z.enum([
    'mobilenetv2',
    'mobilenet_edgetpu',
    'ssd_mobilenet',
    'deeplabv3'
  ]),
  delegate: z.enum([
    'cpu',
    'gpu',
    'nnapi',
    'metal',
    'core_ml',
    'webgl',
    'opengl',
    'xnnpack'
  ])
});

export const SendSpeedResultsBodySchema = SendResultsMetadata.and(
  z.object({
    inferenceTimeMs: z.number(),
    inputIndex: z.number().int(),
    output: z.any()
  })
);

export type SendSpeedResultsBodySchemaType = typeof SendSpeedResultsBodySchema;

export type SendSpeedResultsBodyType = z.infer<
  typeof SendSpeedResultsBodySchema
>;

export type SendResultsMetadata = z.infer<typeof SendResultsMetadata>;

const getPath = (input: SendResultsMetadata) => {
  const paths = getResultPaths(input);
  const folder = `${paths.start}/${paths.end}`;
  return folder;
};

const hasResults = async (input: SendResultsMetadata) => {
  const folder = getPath(input);

  try {
    const files = await fileUtils.json.readJSONFileCountFromDirectory(folder);
    console.log(files);
    return files >= 3;
  } catch (e) {
    return false;
  }
};

const writeSpeedResultsToFile = (
  input: SendSpeedResultsBodyType,
  writeOutputToFile = true
) => {
  const folder = getPath(input);
  fileUtils.createFolderIfNotExists(folder);

  const filePath = `${folder}/${input.resultsId}.json`;

  fileUtils.createFileIfNotExists(filePath, '[]');

  const { output, ...allButOutput } = input;
  const writedInput = writeOutputToFile
    ? input
    : { ...allButOutput, output: [] };
  fileUtils.json.pushToJsonFileArray(filePath, writedInput);
};

export const speedResultUtils = {
  writeSpeedResultsToFile,
  hasResults
};
