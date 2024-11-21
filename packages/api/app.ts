import express from "express";
import cors from "cors";
import accommodationsRouter from "accommodations/accommodations.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/accommodations", accommodationsRouter);

export default app;
