import { replaceAll } from '@/lib/util/common';
import { SendResultsMetadata } from './speed';

export const getResultPaths = (input: SendResultsMetadata) => {
  const deviceNameFormatted = replaceAll(input.deviceModelName, ' ', '_');
  const delegate = input.delegate === 'webgl' ? 'opengl' : input.delegate;
  const start = `${process.cwd()}/results`;
  const end = `${input.frameWork}/${deviceNameFormatted}/${input.model}_${input.precision}/${input.library}/${delegate}`;
  return {
    /**
     * - Start of the path (process.cwd()/results)
     */
    start: `${process.cwd()}/results`,
    /**
     * - End of the path (input.frameWork/deviceNameFormatted/input.model_input.precision/input.library/delegate)
     */
    end: `${input.frameWork}/${deviceNameFormatted}/${input.model}_${input.precision}/${input.library}/${delegate}`,
    /**
     * - Full path (start/end)
     */
    full: `${start}/${end}`
  };
};
