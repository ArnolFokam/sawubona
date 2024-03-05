import { Router, Request, Response } from "express";

import { authenticate } from "@/middlewares/auth";


const router = Router();

router.get('/', authenticate, (req: Request, res: Response) => {
    res.json({ message: `Welcome ${req.user.username}` });
});

export default router;