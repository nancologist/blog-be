import { Router } from 'express';
import multer from 'multer';

import * as ctrl from '../controllers/article';
import { validateToken } from '../middleware';

const upload = multer({ dest: 'src/uploads/' });

const router = Router();

router.post('/', validateToken, upload.single('articleImage'), ctrl.postArticle);

router.put('/', validateToken, ctrl.updateArticle);

router.get('/all', ctrl.getArticles);

router.get('/:articleId', ctrl.getArticle);

// router.delete('/all', validateToken, ctrl.deleteAllArticles);

router.delete('/:articleId', validateToken, ctrl.deleteArticle);

export default router;