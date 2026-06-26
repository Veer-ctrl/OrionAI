import dotenv from "dotenv";
dotenv.config();

const { upsertChunks } = await import("./services/vectorService.js");

const documentId = "test-document";

const chunks = [
  {
    chunkIndex: 0,
    content: "React Context stores global state.",
    embedding: Array(3072).fill(0.5),
  },
  {
    chunkIndex: 1,
    content: "Context helps avoid prop drilling.",
    embedding: Array(3072).fill(0.3),
  },
];

try {
  const result = await upsertChunks(chunks, documentId);

  console.log(result);
} catch (error) {
  console.error(error);
}