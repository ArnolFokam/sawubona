import { Router } from 'express';

import checkRunProject from '@/middlewares/checkRunProject';
import { get_all_runs, delete_run, create_run, get_run, log_run_metric } from '@/controllers/runs';

const router = Router({ mergeParams: true });
router.get('/', get_all_runs);
router.post('/', create_run);
router.get('/:runId', checkRunProject, get_run);
router.delete('/:runId', checkRunProject, delete_run);
router.put('/:runId/log', checkRunProject, log_run_metric);

export default router;