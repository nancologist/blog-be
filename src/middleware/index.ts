import { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const allowCors = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL!);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}

export const catchError: ErrorRequestHandler = (err, req, res, next) => {
  if (req.url === '/auth/check-token') {
    // console.log('Client\'s auth on first load failed.');
    return;
  }

  if (req.url.split('/')[1] === 'auth') {
    res.status(401).json(err);
    return
  }

  res.status(500).json(err)
  return;
};

export const validateToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
    if (!authHeader) {
      console.error('Not Authenticated!');
      res.json({
        code: 'HEADER_NOT_FOUND',
        err: 'Auth Not Found In Header!'
      })
      return;
    }
    const token = authHeader.split(' ')[1]; // arr[0] = "Bearer"

    let decodedToken;
    try {
        decodedToken = <JwtPayload>jwt.verify(token, process.env.JWT_KEY!)
    } catch (err) {
        throw 'Token can not be verified.'
    }

    const invalidToken = !decodedToken;
    if (invalidToken) {
      res.json({
        code: 'TOKEN_INVALID',
        err: 'Token is invalid'
      });
      return;
    }

    req.userId = decodedToken.userId;
    next();
};