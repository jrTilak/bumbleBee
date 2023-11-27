import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
config();

const app = express();

// accept json
app.use(express.json());

//only in dev mode
app.use(morgan("dev"));
app.use("/api/v1", appRouter);

export default app;
