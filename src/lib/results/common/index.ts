import { replaceAll } from '@/lib/util/common';
import fileUtils from '@/lib/util/files';
import { z } from 'zod';

export const SendResultsMetaData = z.object({
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

export const SendResultsBodySchema = SendResultsMetaData.and(
  z.object({
    inferenceTimeMs: z.number(),
    inputIndex: z.number().int(),
    output: z.any()
  })
);

export type SendResultsBodySchemaType = typeof SendResultsBodySchema;

export type SendResultsBody = z.infer<typeof SendResultsBodySchema>;

export type SendResultsMetaData = z.infer<typeof SendResultsMetaData>;

const hasResults = async (input: SendResultsMetaData) => {
  const folder = getPath(input);

  if (input.deviceModelName.toLowerCase() === 'iphone13,1') {
    return false;
  }

  try {
    const files = await fileUtils.json.readJSONFileCountFromDirectory(folder);
    console.log(files);
    return files >= 3;
  } catch (e) {
    return false;
  }
};

const writeResultToFile = (
  input: SendResultsBody,
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

const getPath = (input: SendResultsMetaData) => {
  const deviceNameFormatted = replaceAll(input.deviceModelName, ' ', '_');
  const delegate = input.delegate === 'webgl' ? 'opengl' : input.delegate;

  return `${process.cwd()}/results/${input.frameWork}/${deviceNameFormatted}/${input.model}_${input.precision}/${input.library}/${delegate}`;
};

export const resultUtils = {
  writeResultToFile,
  hasResults
};
