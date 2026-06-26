import dotenv from "dotenv";
import { Pinecone } from "@pinecone-database/pinecone";

dotenv.config();

const apiKey = process.env.PINECONE_API_KEY;
const indexName = process.env.PINECONE_INDEX;

if (!apiKey || !indexName) {
  throw new Error(
    "Missing Pinecone configuration. Set PINECONE_API_KEY and PINECONE_INDEX in your .env file."
  );
}

const pinecone = new Pinecone({
  apiKey,
});

const index = pinecone.index(indexName);

export default index;