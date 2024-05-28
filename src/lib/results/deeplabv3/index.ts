import { z } from 'zod';
import { SendSpeedResultsBodySchema } from '../common/speed';

const deeplabArray = z.array(z.number());

const Array512x512Schema = z
  .array(z.array(z.number()))
  .refine(
    (array) =>
      array.length === 512 &&
      array.every((innerArray) => innerArray.length === 512),
    {
      message: 'Array must be of size 512x512'
    }
  );

const DeeplabV3ResultBodySchema = SendSpeedResultsBodySchema.and(
  // Accept both 1D and 2D arrays
  z.object({
    output: z.union([deeplabArray, Array512x512Schema])
  })
);

export { DeeplabV3ResultBodySchema };
