import fs from 'fs'
import { Request, Response } from 'express'

import s3 from '../storage/aws-s3'
import Article from '../models/article'

exports.postArticle = async (req: Request, res: Response) => {
  const { articleTitle, articleBody } = req.body
  const imageName = req.file.originalname

  try {
    const s3Res = await s3.saveFile(req.file)
    fs.unlinkSync(req.file.path)

    const article = new Article({
      title: articleTitle,
      body: articleBody,
      imageName
    })
    const dbRes = await article.save()

    res.json({
      code: 'POSTED',
      msg: {
        db: `Document inserted with _id: ${dbRes.insertedId}`,
        s3: `Image uploaded with ETag: ${s3Res.ETag}`
      }
    })

  } catch (err) {
    console.error(err)
    res.json({
      code: 'FAILED',
      err
    })
  }
}

exports.uploadImage = async (req: any, res: any) => {
  let httpCode = 0
  try {
    const s3Res = await s3.saveFile(req.file)
    fs.unlinkSync(req.file.path)
    httpCode = +s3Res.$metadata.httpStatusCode!

    res.status(httpCode).json({
      msg: 'UPLOAD_DONE'
    })

  } catch (err) {
    console.error(err)
    res.json(err)
  }
}