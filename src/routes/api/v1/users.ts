import { Router } from 'express';

import { delete_current_user, get_current_user } from '@/controllers/users';


const router = Router();

router.get('/', get_current_user);
router.delete('/', delete_current_user);

export default router;