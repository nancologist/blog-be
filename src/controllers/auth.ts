import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
    const user = await User.getSingle(req.body.email);
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
        // Generate jwt ...
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id.toString()
          },
          process.env.JWT_KEY!,
          { expiresIn: '1h' }
        )

        res.json({ token: token, userId: user._id.toString() });
        return;
      }
    }

    if (failed) {
      res.status(401).json({
        code: 'WRONG_CRED',
        err: 'Wrong credentials.'
      })
    }
  } catch (err) {
    console.error(err);
  }
};
