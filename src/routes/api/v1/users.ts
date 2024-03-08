import { Router } from 'express';

import { delete_current_user } from '@/controllers/users';
import { authenticateToken } from '@/middlewares/auth'; // Import the missing 'authenticate' function


const router = Router();

router.delete('/me', authenticateToken, delete_current_user);

export default router;