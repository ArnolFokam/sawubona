import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { renderToString } from "react-dom/server";
import react from "react";

import APIV1Routes from "@/api/v1";
import App from "@/client/components/App";

dotenv.config();

const app: Express = express();
app.use('/static', express.static(__dirname + "/static/")); // serve static files

// setup routes
app.use('/api/v1', APIV1Routes); // api endpoints
app.use('/', (req: Request, res: Response) => {
    const renderedApp = renderToString(react.createElement(App));
    res.send(`
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>My app</title>
            </head>
            <body>
                <div id="root">${renderedApp}</div>
                <script src="/static/client.js"></script>
            </body>
        </html>
    `);
}); // app-ui endpoints


const port = process.env.PORT || 3000;
app.listen(port || 3000, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});