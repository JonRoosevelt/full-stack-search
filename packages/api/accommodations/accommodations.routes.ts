import { Router } from "express";
import {
  filterAccommodationsHotelsController,
  getHotelController,
} from "./accommodations.controllers";

const accommodationsRouter = Router();

accommodationsRouter.get("/", filterAccommodationsHotelsController);
accommodationsRouter.get("/hotels/:id", getHotelController);

export default accommodationsRouter;
