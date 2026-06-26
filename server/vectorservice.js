import dotenv from "dotenv";
dotenv.config();

import index from "./config/pinecone.js";

try {
  const stats = await index.describeIndexStats();

  console.log(stats);
} catch (error) {
  console.error(error);
}