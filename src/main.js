require('dotenv').config()
const app = require('express')();
const bodyParser = require('body-parser');

const { allowCors } = require('./middleware');
const articleRoutes = require('./routes/article');

app.use(allowCors);
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/image', articleRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});