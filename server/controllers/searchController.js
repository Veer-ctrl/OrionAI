import { generateQueryEmbedding } from "../services/embeddingService.js";
import { searchChunks } from "../services/vectorService.js";

export const searchDocument = async (req, res) => {
  try {
    const { query, documentId } = req.body;

    if (!query || !documentId) {
      return res.status(400).json({
        success: false,
        message: "Query and documentId are required.",
      });
    }

    // Generate embedding for user's question
    const queryEmbedding = await generateQueryEmbedding(query);

    // Search Pinecone
    const results = await searchChunks(
      queryEmbedding,
      documentId,
      5
    );

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No relevant content found.",
      });
    }

    return res.status(200).json({
      success: true,
      results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};