// testPinecone.js
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config();

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

try {
  const indexes = await pc.listIndexes();
  console.log(indexes);
} catch (err) {
  console.error(err);
}