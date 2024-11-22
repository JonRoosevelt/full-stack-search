import { initializeMongo } from "../../db/mongoClient";
import { Request, Response } from "express";
import { queryAllByText } from "./accommodations.service";

export async function filterAccommodationsHotelsController(
  req: Request,
  res: Response,
) {
  const mongoClient = await initializeMongo();
  console.log("aqui");
  const { search } = req.query;
  if (!search) {
    return res
      .status(400)
      .json({ error: "Missing required parameter: search" });
  }
  try {
    const { hotels, cities, countries } = await queryAllByText({
      mongoClient,
      search: search as string,
    });
    res.send({ hotels, cities, countries });
  } finally {
    await mongoClient.close();
  }
}
