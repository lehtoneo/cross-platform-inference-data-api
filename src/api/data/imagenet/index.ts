import express from 'express';

const imageNetRouter = express.Router();

import { z } from 'zod';
import imageUtil from '../../../lib/util/images';
import sharp from 'sharp';

const ImagenetQuerySchema = z.object({
  // coerce so that it will convert string to number
  amount: z.coerce.number().int(),
  skip: z.coerce.number().int(),
  type: z.enum(['uint8', 'float32'])
});

type ImageNetQuery = z.infer<typeof ImagenetQuerySchema>;

imageNetRouter.get('/', async (req, res) => {
  console.log('ImageNet data');
  try {
    console.log({ query: req.query });
    const query: ImageNetQuery = ImagenetQuerySchema.parse(req.query);

    const pics = 300;
    const limit = query.skip + query.amount;

    if (limit > pics) {
      res.status(400).send('Out of bounds');
      return;
    }

    let images: {
      id: string;
      buffer: Buffer;
      rawImageBuffer: Buffer;
      base64Image?: string;
    }[] = [];
    const startPath = 'imagenet/ILSVRC2012_val_00000';
    for (let i = query.skip; i < limit; i++) {
      const curr = i + 1;
      const leadingZeros = curr < 10 ? '00' : curr < 100 ? '0' : '';
      const imagePath = `${startPath}${leadingZeros}${curr}.JPEG`;

      const rawImageBuffer = await imageUtil.getRawImageBuffer(
        imagePath,
        query.type
      );
      const buffer = await imageUtil.getImageBuffer(imagePath);
      images.push({
        id: imagePath,
        rawImageBuffer,
        buffer: buffer
      });
    }

    res.send(images);
    return;
  } catch (e) {
    console.log({ e });
    res.status(400).send(e.errors);
    return;
  }
});

imageNetRouter.get('/img', async (req, res) => {
  console.log('test data');
  try {
    const path = './imagenet/ILSVRC2012_val_00000284.JPEG';

    const b = await sharp(path).raw().toBuffer();
    res.send(b);
    return;
  } catch (e) {
    console.log({ e });
    res.status(400).send(e.errors);
    return;
  }
});

export default imageNetRouter;
