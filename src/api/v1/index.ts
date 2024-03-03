import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', function(req: Request, res: Response) {
    res.json({ message: "All v1 routes" });
});

export default router;