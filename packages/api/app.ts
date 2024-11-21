import express from "express";
import cors from "cors";
import hotelsRouter from "hotels/hotels.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/accommodations", hotelsRouter);

export default app;
