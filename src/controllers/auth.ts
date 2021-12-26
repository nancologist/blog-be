import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  const { email, pwd } = req.body

  try {
    const hashedPwd = await bcrypt.hash(pwd, 12);
    const dbRes = await new User({ email, pwd: hashedPwd }).save()
    res.json({
      code: 'STORED',
      id: dbRes.insertedId
    })
  } catch (err) {
    console.error(err);
    res.json({
      err
    })
  }
};

export const signIn: RequestHandler = async (req: Request, res: Response) => {
  
};
