import fs from 'fs'
import { Request, Response, RequestHandler } from 'express'

import { File } from '../types'
import s3 from '../storage/aws-s3'
import Article from '../models/article'

export const postArticle: RequestHandler = async (req: Request, res: Response) => {
  const { articleTitle, articleBody } = req.body

  let imgFile: File;
  let imageName = undefined;
  let s3Res;
  try {
    if (req.file) {
      imgFile = <File> req.file
      imageName = imgFile.originalname
      s3Res = await s3.saveFile(imgFile)
      fs.unlinkSync(imgFile.path)
    }

    // TODO: Store creation date
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
        s3: s3Res ? `Image uploaded with ETag: ${s3Res.ETag}` : 'NO_IMAGE'
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

export const getArticles: RequestHandler = async (req: Request, res: Response) => {
  try {
    const articles = await Article.getAll()
    console.log(articles);
  } catch (err) {
    console.error(err);
  }
}
