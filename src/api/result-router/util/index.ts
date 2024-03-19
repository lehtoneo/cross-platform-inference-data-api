import { z } from 'zod';

export const SendResultsBodySchema = z.object({
  // coerce so that it will convert string to number
  platform: z.string(),
  frameWork: z.string(),
  precision: z.string(),
  library: z.string(),
  inputIndex: z.number().int()
});
