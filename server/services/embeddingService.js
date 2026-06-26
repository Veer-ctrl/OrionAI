import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-001",
  apiKey: process.env.GEMINI_API_KEY,
});

// Generate embeddings for document chunks
export const generateEmbeddings = async (chunks) => {
  return await embeddings.embedDocuments(chunks);
};

// Generate embedding for a user's search query
export const generateQueryEmbedding = async (query) => {
  return await embeddings.embedQuery(query);
};