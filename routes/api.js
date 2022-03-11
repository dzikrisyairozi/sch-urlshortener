import { Router } from 'express'
import shortenerRoutes from './shortener.js'
import dashboardRoutes from './dashboard.js'
import authRoutes from './auth.js'
import reqAuth from '../middleware/auth.js'

const router = Router();
const { requireAuth, checkUser } = reqAuth;

router.use('/shortener', shortenerRoutes);
router.use('/dashboard', requireAuth, dashboardRoutes);
router.use('/auth', authRoutes);


export default router;