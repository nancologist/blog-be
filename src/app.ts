import express from 'express';
const app = express();
const port = 3000;

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