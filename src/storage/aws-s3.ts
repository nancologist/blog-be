import fs from 'fs'
import { S3Client, PutObjectCommand, DeleteObjectCommand, Delete } from '@aws-sdk/client-s3'
import { File } from '../types'

const s3 = {
  saveFile: (file: File) => {
    const putCommand = new PutObjectCommand({
      Bucket: 'nancologist-blog',
      Body: fs.createReadStream(file.path),
      Key: file.originalname
    })
    return client.send(putCommand)
  },

  deleteFile: (fileName: string) => {
    const delCommand = new DeleteObjectCommand({
      Bucket: 'nancologist-blog',
      Key: fileName
    });
    return client.send(delCommand)
  }
}

const client = new S3Client({
  region: 'eu-central-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})

export default s3;