import { MongoClient, ObjectId } from "mongodb";

interface GetByIdProps {
  mongoClient: MongoClient;
  id: string;
}

export async function getCityById({ mongoClient, id }: GetByIdProps) {
  await mongoClient.connect();
  console.log("connected");

  const db = mongoClient.db();

  const objectId = new ObjectId(id);
  const hotel = await db.collection("cities").findOne({ _id: objectId });

  return hotel;
}
