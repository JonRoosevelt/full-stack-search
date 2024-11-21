import { MongoClient } from "mongodb";

interface QueryAllByTextProps {
  mongoClient: MongoClient;
  search: string;
}

export async function queryAllByText({
  mongoClient,
  search,
}: QueryAllByTextProps) {
  await mongoClient.connect();
  console.log("connected");
  const db = mongoClient.db();

  const hotels = await db
    .collection("hotels")
    .find({
      $or: [
        { chain_name: { $regex: search, $options: "i" } },
        { hotel_name: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
      ],
    })
    .toArray();

  const cities = await db
    .collection("cities")
    .find({
      $or: [{ name: { $regex: search, $options: "i" } }],
    })
    .toArray();

  const countries = await db
    .collection("countries")
    .find({
      $or: [
        { country: { $regex: search, $options: "i" } },
        { countryisocode: { $regex: search, $options: "i" } },
      ],
    })
    .toArray();

  return {
    hotels,
    cities,
    countries,
  };
}
