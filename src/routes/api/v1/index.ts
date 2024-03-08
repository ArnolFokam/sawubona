import { Router } from 'express';

import authRoutes from '@/routes/api/v1/auth';
import usersRoutes from '@/routes/api/v1/users';
import projectsRoutes from '@/routes/api/v1/projects';
import { authenticate } from '@/middlewares/auth';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', authenticate, projectsRoutes);
router.use('/users', authenticate, usersRoutes);

export default router;