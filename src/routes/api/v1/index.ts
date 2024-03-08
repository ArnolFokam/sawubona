import { Router } from 'express';

import authRoutes from '@/routes/api/v1/auth';
import usersRoutes from '@/routes/api/v1/users';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);

export default router;