import { Router } from 'express';

import { delete_current_user } from '@/controllers/users';
import { authenticate } from '@/middlewares/auth'; // Import the missing 'authenticate' function


const router = Router();

router.delete('/me', authenticate, delete_current_user);

export default router;