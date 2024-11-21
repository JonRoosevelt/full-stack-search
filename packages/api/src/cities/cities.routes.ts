import { Router } from "express";
import { getCityController } from "./cities.controllers";

const citiesRouter = Router();

citiesRouter.get("/:id", getCityController);

export default citiesRouter;
