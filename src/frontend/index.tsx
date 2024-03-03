import { Router, Request, Response } from 'express';
import { renderToString } from 'react-dom/server';

import App from "@/frontend/App";

const router = Router();

router.use('/', (req: Request, res: Response) => {
    const html = renderToString(<App />);
    res.send(html);
}); // react app endpoints

export default router;