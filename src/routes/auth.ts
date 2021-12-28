import { Router } from 'express'
import * as ctrl from '../controllers/auth';
import { validateToken } from '../middleware';

const router = Router();

router.post('/signupuntr1vialendp0int', ctrl.signUp);

router.post('/s1gn1n', ctrl.signIn);

router.get('/check-token', validateToken, ctrl.checkToken)

export default router;