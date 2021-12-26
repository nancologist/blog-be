import express, { Application, Request, Response } from 'express';
import { connectDb } from './storage/db';
import { allowCors } from './middleware';
import routes from './routes';

const app: Application = express()

app.use(allowCors);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to BLOG API!'
  })
  return
})

app.use('/article', routes.article)
app.use('/auth', routes.auth)

// TODO: Add global error catcher on "app"

const PORT = process.env.PORT;

connectDb(() => {
  app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
  });
})