import { Router } from 'express'
import multer from 'multer'
// const controller = require('../controllers/article');
import * as ctrl from '../controllers/article'

const upload = multer({ dest: 'src/uploads/' });

const router = Router()

router.post('/', upload.single('articleImage'), ctrl.postArticle)

router.get('/all', ctrl.getArticles)

module.exports = router;