import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  const { email, pwd } = req.body;

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
  try {
    const user = await User.getSingle(req.body.email)
    let failed = false;

    if (!user) {
      failed = true;
      console.error('No User with this email.');
    } else {
      const pwdOk = await bcrypt.compare(req.body.pwd, user.pwd)
      if (!pwdOk) {
        failed = true;
        console.error('Wrong password');
      } else {
        // Generate jwt
      }
    }

    if (failed) {
      res.json({
        err: 'Wrong credentials.'
      })
    }
  } catch (err) {
    console.error(err);
  }
};
