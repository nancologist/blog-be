import { Router } from 'express'
import multer from 'multer'

import * as ctrl from '../controllers/article';
import { authenticateToken } from '../middleware';

const upload = multer({ dest: 'src/uploads/' });

const router = Router()

router.post('/', authenticateToken, upload.single('articleImage'), ctrl.postArticle)

router.get('/all', ctrl.getArticles)

router.get('/:articleId', ctrl.getArticle)

router.delete('/all', authenticateToken, ctrl.deleteAllArticles)

export default router;