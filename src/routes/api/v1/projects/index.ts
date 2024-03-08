import { Router } from 'express';

import isProjectOwner from '@/middlewares/isProjectOwner';
import runsRoutes from '@/routes/api/v1/projects/runs';
import { create_project, delete_project, get_all_projects, get_project } from '@/controllers/projects';

const router = Router();
router.get('/', get_all_projects);
router.post('/', create_project);
router.get('/:projectId', isProjectOwner, get_project);
router.delete('/:projectId', isProjectOwner, delete_project);
router.use('/:projectId/runs', isProjectOwner, runsRoutes);

export default router;