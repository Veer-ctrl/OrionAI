import index from "../config/pinecone.js";
/**
 * Upload chunk embeddings to Pinecone
 * @param {Array} chunks
 * @param {String} documentId
 */
export const upsertChunks = async (chunks, documentId) => {
  try {
    // Convert chunks into Pinecone vector format
    const vectors = chunks.map((chunk) => ({
      id: `${documentId}-${chunk.chunkIndex}`,
      values: chunk.embedding,
      metadata: {
        text: chunk.content,
        chunkIndex: chunk.chunkIndex,
      },
    }));

    console.log("Vectors:");
    console.log(vectors);
    console.log("Vector Count:", vectors.length);

    if (vectors.length === 0) {
      throw new Error("No vectors to upload.");
    }

    await index.namespace(documentId).upsert({
      records: vectors,
    });

    return {
      success: true,
      count: vectors.length,
    };
  } catch (error) {
    throw new Error(`Failed to upsert vectors: ${error.message}`);
  }
};

/**
 * Search similar chunks
 */
export const searchChunks = async (
  queryEmbedding,
  documentId,
  topK = 5
) => {
  try {
    const response = await index.namespace(documentId).query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
    });

    return response.matches.map((match) => ({
      text: match.metadata.text,
      chunkIndex: match.metadata.chunkIndex,
      score: match.score,
    }));
  } catch (error) {
    throw new Error(`Failed to search vectors: ${error.message}`);
  }
}; 

export const deleteChunks = async (documentId) => {
  try {
    await index.namespace(documentId).deleteAll();

    return true;
  } catch (error) {
    throw new Error(
      `Failed to delete vectors: ${error.message}`
    );
  }
};