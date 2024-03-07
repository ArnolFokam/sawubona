import { Router } from 'express';

import authRoutes from '@/routes/api/v1/auth';

const router = Router();

router.use('/auth', authRoutes);

export default router;