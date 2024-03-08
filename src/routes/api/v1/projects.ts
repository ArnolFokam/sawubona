import { Router } from 'express';

import { create_project, delete_project, get_all_projects, get_project_by_id, get_project_by_name } from '@/controllers/projects';
import isProjectOwner from '@/middlewares/isProjectOwner';
import runsRoutes from '@/routes/api/v1/runs';
import { authenticate } from '@/middlewares/auth';

const router = Router();
router.post('/', create_project);
router.get('/', get_all_projects);
router.get('/:projectId', isProjectOwner, get_project_by_id);
router.get('/:projectName', isProjectOwner, get_project_by_name);
router.delete('/:projectId', isProjectOwner, delete_project);
router.use('/:projectId/runs', isProjectOwner, runsRoutes);

export default router;