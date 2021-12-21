import express, { Application, Request, Response } from 'express'
import { connectDb } from './storage/db'

const app: Application = express()

const { allowCors } = require('./middleware');
const articleRoutes = require('./routes/article');

app.use(allowCors);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to BLOG API!'
  })
  return
})

app.use('/article', articleRoutes)

const PORT = process.env.PORT;

connectDb(() => {
  app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
  });
})