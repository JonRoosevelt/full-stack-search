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

  return app;
}
