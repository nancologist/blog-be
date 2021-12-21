import { Router } from 'express'
import multer from 'multer'
// const controller = require('../controllers/article');
import * as controller from '../controllers/article'

const upload = multer({ dest: 'src/uploads/' });

const router = Router()

router.post('/', upload.single('articleImage'), controller.postArticle)

// router.post('/post-image', upload.single('myImage'), controller.uploadImage);

module.exports = router;