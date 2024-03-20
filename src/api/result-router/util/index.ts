import { z } from 'zod';

export const SendResultsBodySchema = z.object({
  resultsId: z.string(),
  platform: z.string(),
  frameWork: z.string(),
  precision: z.string(),
  library: z.string(),
  inputIndex: z.number().int()
});
