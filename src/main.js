const app = require('express')();

const PORT = process.env.PORT || 8000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', CLIENT_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// MULTER - UPLOAD
const upload = multer({ dest: 'uploads/' });
app.post('/up-image', upload.single('myImage'), (req, res) => {
  console.log('fjskafjkajfk');
  console.log(req.file)

  res.status(200).json({
    msg: 'UP_IMAGE'
  })
})
app.get('/test', (req, res) => {
  res.status(200).json({
    name: 'Helmut',
    age: 32,
    country: 'Senegal'
  })
})

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});