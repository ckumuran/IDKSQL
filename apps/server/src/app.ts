import express from "express";
import cors from "cors";

import queryRoute from "./routes/query";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/query", queryRoute);

export default app;
