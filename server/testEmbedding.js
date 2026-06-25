import dotenv from "dotenv";
dotenv.config();

import { generateEmbeddings } from "./services/embeddingService.js";

const chunks = [
  "React is a JavaScript library.",
  "MongoDB is a NoSQL database.",
];

try {
  const result = await generateEmbeddings(chunks);

  console.log(result[0].embedding.length);
  console.log(result[0]);
} catch (error) {
  console.error(error);
}