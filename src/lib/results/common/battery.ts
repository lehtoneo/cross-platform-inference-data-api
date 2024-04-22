import { z } from 'zod';
import { SendResultsMetadata, SendSpeedResultsBodyType } from './speed';
import { getResultPaths } from './util';
import fileUtils from '@/lib/util/files';

export const SendBatteryResultsBodySchema = SendResultsMetadata.and(
  z.object({
    batteryStartLevel: z.number().min(0).max(100),
    batteryEndLevel: z.number().min(0).max(100),
    timeMs: z.number()
  })
);

export type SendBatteryResultsBodyType = z.infer<
  typeof SendBatteryResultsBodySchema
>;

const getPath = (input: SendResultsMetadata) => {
  const paths = getResultPaths(input);
  const folder = `${paths.start}/battery/${paths.end}`;
  return folder;
};

const hasResults = async (input: SendResultsMetadata) => {
  const folder = getPath(input);

  try {
    const files = await fileUtils.json.readJSONFileCountFromDirectory(folder);
    console.log(files);
    return files >= 2;
  } catch (e) {
    return false;
  }
};

const writeBatteryResultsToFile = (input: SendBatteryResultsBodyType) => {
  const folder = getPath(input);
  fileUtils.createFolderIfNotExists(folder);

  const filePath = `${folder}/${input.resultsId}.json`;

  fileUtils.createFileIfNotExists(filePath, '[]');

  fileUtils.json.writeToJSONFile(filePath, input);
};

export const batteryResultUtils = {
  writeBatteryResultsToFile,
  hasResults
};
