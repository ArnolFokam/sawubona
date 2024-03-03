import 'module-alias/register';
import dotenv from "dotenv";
import express, { Express } from "express";

import APIV1Routes from "@/api/v1";
import frontendRoutes from "@/frontend";

dotenv.config();

const app: Express = express();

// setup routes
app.use('/api/v1', APIV1Routes); // api endpoints
app.use('/', frontendRoutes); // frontend-ui endpoints


const port = process.env.PORT || 3000;
app.listen(port || 3000, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});