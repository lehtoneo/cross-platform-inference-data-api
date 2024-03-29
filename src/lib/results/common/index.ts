import { replaceAll } from '@/lib/util/common';
import fileUtils from '@/lib/util/files';
import { z } from 'zod';

const SendResultsMetaData = z.object({
  resultsId: z.string(),
  platform: z.enum(['android', 'ios']),
  deviceModelName: z.string(),
  frameWork: z.enum(['react-native', 'flutter']),
  precision: z.string(),
  library: z.string(),
  model: z.enum([
    'mobilenet',
    'mobilenet_edgetpu',
    'ssd_mobilenet',
    'deeplabv3'
  ]),
  delegate: z.enum([
    'cpu',
    'nnapi',
    'metal',
    'core_ml',
    'webgl',
    'opengl',
    'xxnpack'
  ])
});

type SendResultsMetaData = z.infer<typeof SendResultsMetaData>;

export const SendResultsBodySchema = SendResultsMetaData.and(
  z.object({
    inferenceTimeMs: z.number().int(),
    inputIndex: z.number().int(),
    output: z.any()
  })
);

export type SendResultsBody = z.infer<typeof SendResultsBodySchema>;

const writeResultToFile = (input: SendResultsBody) => {
  const deviceNameFormatted = replaceAll(input.deviceModelName, ' ', '_');

  const delegate = input.delegate === 'webgl' ? 'opengl' : input.delegate;
  const folder = `${process.cwd()}/results/${input.frameWork}/${deviceNameFormatted}/${input.model}_${input.precision}/${input.library}/${delegate}`;
  fileUtils.createFolderIfNotExists(folder);

  const filePath = `${folder}/${input.resultsId}.json`;

  fileUtils.createFileIfNotExists(filePath, '[]');

  fileUtils.json.pushToJsonFileArray(filePath, input);
};

export const resultUtils = {
  writeResultToFile
};
