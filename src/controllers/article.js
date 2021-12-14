const fs = require('fs');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

exports.uploadImage = async (req, res) => {
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
      msg: 'UPLOAD_DONE'
    })
  } catch (err) {
    console.error(err)
    res.json(err)
  }
}