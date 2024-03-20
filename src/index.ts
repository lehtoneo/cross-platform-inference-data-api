import express from 'express';
import apiRouter from './api';
import healthRouter from './health';
import loggerMiddleware from './lib/middleware/logging';

const app = express();

app.use(loggerMiddleware);
const port = 3000;

app.use(
  express.json({
    limit: '50mb'
  })
);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.use('/health', healthRouter);
app.use('/api', apiRouter);

const _app = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
