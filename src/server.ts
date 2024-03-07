import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";

import apiRoutes from "@/routes/api/v1";
import clientRoutes from "@/routes/client";
import connectDB from "@/db";

dotenv.config();

const app: Express = express();

connectDB();

// setup middleware
app.use(express.json());

// setup routes
app.use('/api/v1', apiRoutes); 
app.use('/', clientRoutes); 

const port = process.env.PORT || 3000;
app.listen(port || 3000, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});