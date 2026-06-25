import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const generateEmbeddings = async (chunks) => {
  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: process.env.GEMINI_API_KEY,
  });

  const vectors = await embeddings.embedDocuments(chunks);

  return chunks.map((content, index) => ({
    content,
    embedding: vectors[index],
  }));
};