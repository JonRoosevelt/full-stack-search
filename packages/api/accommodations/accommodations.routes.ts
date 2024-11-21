import { Router } from "express";
import {
  filterAccommodationsHotelsController,
  getCityController,
  getCountryController,
  getHotelController,
} from "./accommodations.controllers";

const accommodationsRouter = Router();

accommodationsRouter.get("/", filterAccommodationsHotelsController);
accommodationsRouter.get("/hotels/:id", getHotelController);
accommodationsRouter.get("/cities/:id", getCityController);
accommodationsRouter.get("/countries/:id", getCountryController);

export default accommodationsRouter;
