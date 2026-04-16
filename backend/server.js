import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/postRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes);

const MONGODB_URL = process.env.MONGO_URI;

if (!MONGODB_URL) {
  console.error("MONGO_URI is not defined in .env file");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("DB Error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
