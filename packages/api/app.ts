import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

export default function initializeExpressApp(mongoClient: MongoClient) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/hotels", async (_req, res) => {
    console.log("Connecting to MongoDB...");

    try {
      await mongoClient.connect();
      console.log("Successfully connected to MongoDB!");
      const db = mongoClient.db();
      const collection = db.collection("hotels");
      res.send(await collection.find().toArray());
    } finally {
      await mongoClient.close();
    }
  });

  app.get("/cities", async (_req, res) => {
    console.log("Connecting to MongoDB...");

    try {
      await mongoClient.connect();
      console.log("Successfully connected to MongoDB!");
      const db = mongoClient.db();
      const collection = db.collection("cities");
      res.send(await collection.find().toArray());
    } finally {
      await mongoClient.close();
    }
  });

  app.get("/countries", async (_req, res) => {
    console.log("Connecting to MongoDB...");

    try {
      await mongoClient.connect();
      console.log("Successfully connected to MongoDB!");
      const db = mongoClient.db();
      const collection = db.collection("countries");
      res.send(await collection.find().toArray());
    } finally {
      await mongoClient.close();
    }
  });

  app.get("/accommodations", async (req, res) => {
    const { search } = req.query;
    try {
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
      res.send({ hotels, cities, countries });
    } finally {
      await mongoClient.close();
    }
  });

  return app;
}
