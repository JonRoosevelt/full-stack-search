import { Router } from "express";
import { getCountryController } from "./countries.controllers";

const countriesRouter = Router();

countriesRouter.get("/:id", getCountryController);

export default countriesRouter;
