import { City } from "lib";
import { MongoClient, ObjectId } from "mongodb";

interface GetByIdProps {
  mongoClient: MongoClient;
  id: string;
}

export async function getCityById({
  mongoClient,
  id,
}: GetByIdProps): Promise<City | null> {
  await mongoClient.connect();
  console.log("connected");

  const db = mongoClient.db();

  const objectId = new ObjectId(id);
  const city = (await db
    .collection("cities")
    .findOne({ _id: objectId })) as unknown as City | null;

  return city;
}
