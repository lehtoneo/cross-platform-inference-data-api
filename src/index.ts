import express from 'express';
import apiRouter from './api';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', apiRouter);

const _app = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
