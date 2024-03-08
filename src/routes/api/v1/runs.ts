import { Router } from 'express';

import isProjectOwner from '@/middlewares/isProjectOwner';
import { get_all_runs, delete_run, create_run, log_run_metric } from '@/controllers/runs';

const router = Router({ mergeParams: true });
router.post('/', create_run);
router.get('/', get_all_runs);
router.delete('/:runId', isProjectOwner, delete_run);
router.put('/:runId/log', isProjectOwner, log_run_metric);

export default router;