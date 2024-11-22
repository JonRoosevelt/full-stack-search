import { Country } from "lib";
import { MongoClient, ObjectId } from "mongodb";

interface GetByIdProps {
  mongoClient: MongoClient;
  id: string;
}

export async function getHotelById({
  mongoClient,
  id,
}: GetByIdProps): Promise<Country | null> {
  await mongoClient.connect();
  console.log("connected");

  const db = mongoClient.db();

  const objectId = new ObjectId(id);
  const hotel = (await db
    .collection("hotels")
    .findOne({ _id: objectId })) as unknown as Country | null;

  return hotel;
}
