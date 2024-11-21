import { Router } from "express";
import { filterAccommodationsHotelsController } from "./accommodations.controllers";

const accommodationsRouter = Router();

accommodationsRouter.get("/", filterAccommodationsHotelsController);

export default accommodationsRouter;
