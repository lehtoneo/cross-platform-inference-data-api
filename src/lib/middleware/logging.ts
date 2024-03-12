import { Request, Response, NextFunction } from 'express';

const loggerMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  const query = JSON.stringify(req.query);
  console.log(`Query: ${query}`);
  next();
};

export default loggerMiddleware;
