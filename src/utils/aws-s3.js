const fs = require('fs');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = {
  saveFile: (file) => {
    const command = new PutObjectCommand({
      Bucket: 'nancologist-blog',
      Body: fs.createReadStream(file.path),
      Key: file.originalname
    })
    return client.send(command)
  }
}

const client = new S3Client({
  region: 'eu-central-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

module.exports = s3;