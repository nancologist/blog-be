import { Router } from 'express'
import multer from 'multer'
import * as ctrl from '../controllers/article'

const upload = multer({ dest: 'src/uploads/' });

const router = Router()

router.post('/', upload.single('articleImage'), ctrl.postArticle)

router.get('/all', ctrl.getArticles)

router.get('/:articleId', ctrl.getArticle)

router.delete('/all', ctrl.deleteAllArticles)

export default router;