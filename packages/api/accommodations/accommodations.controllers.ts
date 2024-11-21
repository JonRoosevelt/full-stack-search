import { initializeMongo } from "db/mongoClient";
import { Request, Response } from "express";
import {
  getCityById,
  getCountryById,
  getHotelById,
  queryAllByText,
} from "./accommodations.service";

export async function filterAccommodationsHotelsController(
  req: Request,
  res: Response,
) {
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

export async function getCountryController(req: Request, res: Response) {
  const mongoClient = await initializeMongo();
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Missing country id" });
  }
  try {
    const country = await getCountryById({ mongoClient, id: id.toString() });
    res.send(country);
  } finally {
    await mongoClient.close();
  }
}
