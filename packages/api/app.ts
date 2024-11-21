import accommodationsRouter from "src/accommodations/accommodations.routes";
import citiesRouter from "src/cities/cities.routes";
import cors from "cors";
import countriesRouter from "src/countries/countries.routes";
import express from "express";
import hotelsRouter from "src/hotels/hotels.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/accommodations", accommodationsRouter);
app.use("/countries", countriesRouter);
app.use("/cities", citiesRouter);
app.use("/hotels", hotelsRouter);

export default app;
