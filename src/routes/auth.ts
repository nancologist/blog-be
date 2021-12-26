import { Router } from 'express'
import * as ctrl from '../controllers/auth';

const router = Router();

router.post('/signupuntr1vialendp0int', ctrl.signUp);

router.post('/signin', ctrl.signIn)

export default router;