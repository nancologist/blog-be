require('dotenv').config()
const fs = require('fs');
const app = require('express')();
const bodyParser = require('body-parser');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL

// ALLOW CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', CLIENT_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// MULTER - UPLOAD
const upload = multer({ dest: 'uploads/' });
app.post('/up-image', upload.single('myImage'), async (req, res) => {

  const client = new S3Client({
    region: 'eu-central-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  })

  const command = new PutObjectCommand({
    Bucket: 'nancologist-blog',
    Body: fs.createReadStream(req.file.path),
    Key: req.file.originalname
  })

  let httpCode = 0
  try {
    const s3Res = await client.send(command)
    fs.unlinkSync(req.file.path)
    httpCode = s3Res.$metadata.httpStatusCode
    res.status(httpCode).json({
      msg: 'File successfully uploaded'
    })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
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