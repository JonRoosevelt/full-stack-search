import { Request, Response } from "express";
import { initializeMongo } from "db/mongoClient";
import { getHotelById } from "./hotels.services";

export async function getHotelController(req: Request, res: Response) {
  const mongoClient = await initializeMongo();
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Missing hotel id" });
  }
  try {
    const hotel = await getHotelById({ mongoClient, id: id.toString() });
    if (!hotel) {
      res.status(404);
    }
    res.send(hotel);
  } finally {
    await mongoClient.close();
  }
}
