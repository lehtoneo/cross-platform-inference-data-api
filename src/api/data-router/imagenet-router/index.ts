import express from 'express';

const imageNetRouter = express.Router();

import sharp from 'sharp';
import {
  FetchImagesQuery,
  FetchImagesQuerySchema,
  getImagesAsync
} from '../util';

imageNetRouter.get('/', async (req, res) => {
  console.log('ImageNet data');
  try {
    console.log({ query: req.query });
    const query: FetchImagesQuery = FetchImagesQuerySchema.parse(req.query);

    const startPath = 'imagenet/ILSVRC2012_val_00000';

    const images = await getImagesAsync({
      startPath,
      query,
      extension: 'JPEG'
    });

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
