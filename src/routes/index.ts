import { Router } from 'express';

import authRoutes from '@/routes/auth';
import dashboardRoutes from '@/routes/dashboard';

const router = Router();

router.post('/auth', authRoutes);
router.post('/dashboard', dashboardRoutes);

export default router;