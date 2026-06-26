import { Pinecone } from "@pinecone-database/pinecone";

console.log("Inside pinecone.js:", process.env.PINECONE_API_KEY);

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.index(process.env.PINECONE_INDEX);

export default index;