import { Request, Response } from "express";
import { initializeMongo } from "db/mongoClient";
import { getCityById } from "./cities.service";

export async function getCityController(req: Request, res: Response) {
  const mongoClient = await initializeMongo();
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Missing city id" });
  }
  try {
    const city = await getCityById({ mongoClient, id: id.toString() });
    res.send(city);
  } finally {
    await mongoClient.close();
  }
}
