import { Request, Response, NextFunction, RequestHandler } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const allowCors = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL!);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}

export const authenticateToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
    if (!authHeader) {
      console.error('Not Authenticated!');
      res.json({
        err: 'Auth Not Found In Header!'
      })
      return;
    }
    const token = authHeader.split(' ')[1]; // arr[0] = "Bearer"

    let decodedToken;
    try {
        decodedToken = <JwtPayload>jwt.verify(token, process.env.JWT_KEY!)
    } catch (err) {
        console.error('Token can not be verified');
        res.json({
          code: 'TOKEN_NOT_VERIFIED',
          err: 'Token can not be verified'
        });
        return;
    }

    const invalidToken = !decodedToken;
    if (invalidToken) {
      console.error('Not Authenticated!');
      res.json({
        code: 'TOKEN_INVALID',
        err: 'Token is invalid'
      });
      return;
    }

    req.userId = decodedToken.userId;
    next();
};