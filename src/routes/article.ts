import { Router } from 'express'
import multer from 'multer'

import * as ctrl from '../controllers/article';
import { validateToken } from '../middleware';

const upload = multer({ dest: 'src/uploads/' });

const router = Router()

router.post('/', validateToken, upload.single('articleImage'), ctrl.postArticle)

router.get('/all', ctrl.getArticles)

router.get('/:articleId', ctrl.getArticle)

// TODO: Deactivate this endpoint when you read MVP!
router.delete('/all', ctrl.deleteAllArticles)

export default router;