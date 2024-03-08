import { Router } from 'express';

import authRoutes from '@/routes/api/v1/auth';
import usersRoutes from '@/routes/api/v1/users';
import projectsRoutes from '@/routes/api/v1/projects';
import { authenticateToken, authenticate } from '@/middlewares/auth';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', authenticateToken, usersRoutes);
router.use('/projects', authenticate, projectsRoutes);

export default router;