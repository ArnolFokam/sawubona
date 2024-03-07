import express, { Router, Request, Response } from 'express';
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import Welcome from '@/client/pages/Welcome';

const router = Router();

// Home Web App
router.use('/static', express.static(__dirname + "/../../../build/welcome")); // serve static files
router.use('/', (req: Request, res: Response) => {
    const html = renderToString(
        <StaticRouter location={req.url}>
            <Welcome />
        </StaticRouter>
    );
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
            <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Welcome</title>
            </head>
            <body>
                <div id="root">${html}</div>
                <script src="/static/client.js"></script>
            </body>
        </html>
    `);
});

export default router;