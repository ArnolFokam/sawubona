import express, { Router, Request, Response } from 'express';

const router = Router();

// Home Web App
router.use('/static', express.static(__dirname + "/../../../build/dashboard")); // serve static files
router.use('/', (req: Request, res: Response) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
            <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Dashboard</title>
            </head>
            <body>
                <div id="root"></div>
                <script src="/dashboard/static/client.js"></script>
            </body>
        </html>
    `);
});

export default router;