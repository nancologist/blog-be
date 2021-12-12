const app = require('express')();
const bodyParser = require('body-parser');
const multer = require('multer');

const PORT = process.env.PORT || 8000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'

// ALLOW CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', CLIENT_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// MULTER - UPLOAD
const upload = multer({ dest: 'uploads/' });
app.post('/up-image', upload.single('myImage'), (req, res) => {
  
  // console.log(req.file) =>
  // {
  //   fieldname: 'myImage',
  //   originalname: 'beachball.jpeg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: 'uploads/',
  //   filename: 'c7a08486172dd1ef854c91de9dbd5038',
  //   path: 'uploads/c7a08486172dd1ef854c91de9dbd5038',
  //   size: 25582
  // }

  res.status(200).json({
    msg: 'UP_IMAGE'
  })
})


// BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));

// API ENDPOINTS:
app.get('/test', (req, res) => {
  res.status(200).json({
    name: 'Helmut',
    age: 32,
    country: 'Senegal'
  })
})

// RUN SERVER
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});