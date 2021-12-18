const fs = require('fs');
const s3 = require('../storage/aws-s3');

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