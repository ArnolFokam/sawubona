import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import { renderToString } from "react-dom/server";
import react from "react";

import apiRoutes from "@/routes/api/v1";
import App from "@/client/components/App";
import { authenticate } from "@/middlewares/auth";
import connectDB from "@/db";

dotenv.config();

const app: Express = express();

connectDB();

app.use('/static', express.static(__dirname + "/static/")); // serve static files

app.use(express.json());

app.use('/api/v1', apiRoutes); 

// Dashboard App
app.get('/dashboard', authenticate, (req: Request, res: Response) => {
    res.json({ message: `Welcome ${req.user.email}` });
});

// Home Web App
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
});


const port = process.env.PORT || 3000;
app.listen(port || 3000, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});