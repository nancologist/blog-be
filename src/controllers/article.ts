import fs from 'fs'
import { Request, Response, RequestHandler } from 'express'

import { File } from '../types'
import s3 from '../storage/aws-s3'
import Article from '../models/article'

export const postArticle: RequestHandler = async (req: Request, res: Response) => {
  const imgFile = <File> req.file
  const { articleTitle, articleBody } = req.body
  const imageName = imgFile.originalname

  try {
    const s3Res = await s3.saveFile(imgFile)
    fs.unlinkSync(imgFile.path)

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
