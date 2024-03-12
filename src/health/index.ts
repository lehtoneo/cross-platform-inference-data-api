import express from 'express';

const healthRouter = express.Router();

healthRouter.get('/', (_req, res) => {
  res.send('Healthy!');
});

export default healthRouter;
