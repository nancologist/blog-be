import express from 'express';
const app = express();
const port = 8000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // * = Allow Any Client
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Allowing the Http Methods which you need (separated by a comma)
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/test', (req, res) => {
  res.status(200).json({
    name: 'Helmut',
    age: 32,
    country: 'Senegal'
  })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});