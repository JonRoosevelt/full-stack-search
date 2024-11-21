import { Router } from "express";
import {
  filterHotelsController,
  getHotelController,
} from "./hotels.controllers";

const hotelsRouter = Router();

hotelsRouter.get("/", filterHotelsController);
hotelsRouter.get("/:id", getHotelController);

export default hotelsRouter;
