import { initializeMongo } from "db/mongoClient";
import { Request, Response } from "express";
import { getHotelById, queryAllByText } from "./hotels.service";

export async function filterHotelsController(req: Request, res: Response) {
  console.log("aqui");
  const mongoClient = await initializeMongo();
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

export async function getHotelController(req: Request, res: Response) {
  const mongoClient = await initializeMongo();
  const { id } = req.params;
  console.log(id);
  if (!id) {
    return res.status(400).json({ error: "Missing hotel id" });
  }
  try {
    const hotel = await getHotelById({ mongoClient, id: id.toString() });
    res.send(hotel);
  } finally {
    await mongoClient.close();
  }
}
