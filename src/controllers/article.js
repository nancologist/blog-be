const fs = require('fs');
const s3 = require('../storage/aws-s3');
const Article = require('../models/article')

exports.postArticle = async (req, res) => {
  const { title, body, imagePath } = req.body

  const article = new Article({ title, body, imagePath })
  
  try {
    const dbRes = await article.save()
    console.log('dbRes: ', dbRes);

    res.json({
      msg: `Document inserted with _id: ${dbRes.insertedId}`
    })

  } catch (err) {
    console.log(err);
    res.json({
      msg: 'Failed to store document',
      ...err
    })
  }
}

exports.uploadImage = async (req, res) => {
  let httpCode = 0
  try {
    const s3Res = await s3.saveFile(req.file)
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