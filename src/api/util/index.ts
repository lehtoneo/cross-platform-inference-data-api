import { z } from 'zod';
import imageUtil from '../../lib/util/images';

export const FetchImagesQuerySchema = z.object({
  // coerce so that it will convert string to number
  amount: z.coerce.number().int(),
  skip: z.coerce.number().int()
});

export type FetchImagesQuery = z.infer<typeof FetchImagesQuerySchema>;

export const getImagesAsync = async (opts: {
  query: FetchImagesQuery;
  startPath: string;
  extension: string;
}) => {
  let images: {
    id: string;
    buffer: Buffer;
    rawImageBuffer: Buffer;
    base64Image?: string;
  }[] = [];
  const { query, startPath, extension } = opts;

  const limit = query.skip + query.amount;
  for (let i = query.skip; i < limit; i++) {
    const curr = i + 1;
    const leadingZeros = curr < 10 ? '00' : curr < 100 ? '0' : '';
    const imagePath = `${startPath}${leadingZeros}${curr}.${extension}`;

    const rawImageBuffer = await imageUtil.getRawImageBuffer(imagePath);
    const buffer = await imageUtil.getImageBuffer(imagePath);
    images.push({
      id: imagePath,
      rawImageBuffer,
      buffer: buffer
    });
  }

  return images;
};
