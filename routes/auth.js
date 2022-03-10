import { Router } from 'express'
import auth from '../controllers/auth.js'
const router = Router();

router.post('/signup', auth.signup_post);
router.post('/login', auth.login_post);
router.get('/logout', auth.logout_get);

export default router;