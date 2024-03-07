import { Router } from 'express';

import welcomeRoutes from '@/routes/client/welcome';
import dashboardRoutes from '@/routes/client/dashboard';

const router = Router();

router.use('/dashboard', dashboardRoutes);
router.use('/', welcomeRoutes);

export default router;