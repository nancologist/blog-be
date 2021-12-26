import { Request, Response, NextFunction } from 'express'

const CLIENT_URL = process.env.CLIENT_URL

export const allowCors = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', CLIENT_URL!);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}