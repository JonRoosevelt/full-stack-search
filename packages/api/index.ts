import initializeExpressApp from "app";
import { initializeMongo } from "db/mongoClient";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3001;

const mongoClient = await initializeMongo();

const app = initializeExpressApp(mongoClient);

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
