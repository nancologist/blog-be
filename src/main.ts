import express, { Application, Request, Response } from 'express';
import { connectDb } from './storage/db';
import { allowCors, catchError } from './middleware';
import routes from './routes';

const app: Application = express()

app
  .use(allowCors)
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .get('/', (req: Request, res: Response) => {
    res.json({
      message: 'Welcome to BLOG API!'
    })
    return
  })
  .use('/article', routes.article)
  .use('/auth', routes.auth)
  .use(catchError)

const PORT = process.env.PORT;

connectDb(() => {
  app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
  });
})