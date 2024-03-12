import express from 'express';

import { FetchImagesQuery, FetchImagesQuerySchema, getImagesAsync } from '.';

/**
 * - This is a factory function that creates an image router
 */
const createImageRouter = (opts: { startPath: string; extension: string }) => {
  const router = express.Router();
  router.get('/', async (req, res) => {
    try {
      const query: FetchImagesQuery = FetchImagesQuerySchema.parse(req.query);

      const images = await getImagesAsync({
        startPath: opts.startPath,
        query,
        extension: opts.extension
      });

      res.send(images);
      return;
    } catch (e) {
      console.log({ e });
      res.status(400).send(e.errors);
      return;
    }
  });
  return router;
};

const routersUtil = {
  createImageRouter
};

export default routersUtil;
