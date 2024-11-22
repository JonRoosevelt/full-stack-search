import { initializeMongo } from "db/mongoClient";
import { Request, Response } from "express";
import { getCountryById } from "./countries.service";

export async function getCountryController(req: Request, res: Response) {
  const mongoClient = await initializeMongo();
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Missing country id" });
  }
  try {
    const country = await getCountryById({ mongoClient, id: id.toString() });
    if (!country) {
      res.status(404);
    }
    res.send(country);
  } finally {
    await mongoClient.close();
  }
}
