import fs from 'fs';
import { Request, Response, RequestHandler } from 'express';

import { File } from '../types';
import s3 from '../storage/aws-s3';
import Article from '../models/article';
import { InsertOneResult } from 'mongodb';

export const postArticle: RequestHandler = async (req: Request, res: Response) => {
  const { articleCategory, articleTitle, articleBody } = req.body

  let imgFile: File;
  let imageName = undefined;
  let s3Res;
  try {
    if (req.file) {
      imgFile = <File> req.file
      imageName = Math.floor(Math.random() * 1000) + '_' + imgFile.originalname
      imgFile.originalname = imageName
      s3Res = await s3.saveFile(imgFile)
      fs.unlinkSync(imgFile.path)
    }

    const article = new Article({
      category: articleCategory,
      title: articleTitle,
      body: articleBody,
      imageName
    })
    const dbRes = await article.save() as InsertOneResult

    res.json({
      code: 'POSTED',
      id: dbRes.insertedId,
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
};

// TODO: Edit Picture too
export const updateArticle: RequestHandler = async (req, res) => {
  const { article: articleProps } = req.body

  let dbRes = {};
  try {
    const updatingArticle = new Article(articleProps);
    dbRes = await updatingArticle.save()
  } catch (err) {
    console.error(err);
  }

  res.json({
    code: 'UPDATED',
    dbRes
  })
  return;
};

export const getArticles: RequestHandler = async (req: Request, res: Response) => {
  try {
    const articles = await Article.getAll()
    res.json(articles.reverse())
  } catch (err) {
    console.error(err);
  }
};

export const getArticle: RequestHandler = async (req: Request, res: Response) => {
  try {
    const article = await Article.getSingle(req.params.articleId)
    res.json(article)
  } catch (err) {
    res.status(404).json({ code: 'NOT_FOUND' })
  }
};

export const deleteArticle: RequestHandler = async (req, res) => {
  try {
    let resCode: string[] = [];
    const dbRes = await Article.deleteSingle(req.params.articleId);

    if (dbRes.ok === 1) {
      resCode = ['ARTICLE_DELETED']

      const deletedArticle = dbRes.value as Article;
      if (deletedArticle.imageName) {
        const s3Res = await s3.deleteFile(deletedArticle.imageName)

        if (s3Res.$metadata.httpStatusCode === 204) {
          resCode.push('FILE_DELETED');
        }
      }
    }

    res.json({
      code: resCode,
    })
    return;

  } catch (err) {
    console.error(err);
  }
};

// export const deleteAllArticles: RequestHandler = async (req: Request, res: Response) => {
//   try {
//     const dbRes = await Article.deleteAll();
//     res.json({
//       code: 'ALL_DELETED',
//       msg: `Total number of ${dbRes.deletedCount} articles have been deleted.`
//     })
//   } catch (err) {
//     console.error(err);
//     throw err
//   }
// };
