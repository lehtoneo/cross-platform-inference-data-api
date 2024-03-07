import express from 'express';

const cocoRouter = express.Router();

import sharp from 'sharp';
import {
  FetchImagesQuery,
  FetchImagesQuerySchema,
  getImagesAsync
} from '../util';

cocoRouter.get('/', async (req, res) => {
  console.log('Coco data');
  try {
    console.log({ query: req.query });
    const query: FetchImagesQuery = FetchImagesQuerySchema.parse(req.query);

    const startPath = 'coco/000000000';

    const images = await getImagesAsync({
      startPath,
      query,
      extension: 'jpg'
    });

    res.send(images);
    return;
  } catch (e) {
    console.log({ e });
    res.status(400).send(e.errors);
    return;
  }
});

export default cocoRouter;
