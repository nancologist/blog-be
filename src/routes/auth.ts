import { Router } from 'express'
import * as ctrl from '../controllers/auth';

const router = Router();

router.post('/signupuntr1vialendp0int', ctrl.signUp);

router.post('/s1gn1n', ctrl.signIn)

export default router;