require('dotenv').config()
const express = require('express');

const app = express()

const { allowCors } = require('./middleware');
const articleRoutes = require('./routes/article');
const { connectDb } = require('./storage/mongodb');

app.use(allowCors);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/article', articleRoutes)

const PORT = process.env.PORT;

connectDb(() => {
  app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
  });
})