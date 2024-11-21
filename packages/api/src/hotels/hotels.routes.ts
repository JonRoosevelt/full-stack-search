import { Router } from "express";
import { getHotelController } from "./hotels.controllers";

const hotelsRouter = Router();

hotelsRouter.get("/:id", getHotelController);

export default hotelsRouter;
