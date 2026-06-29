import Conversation from "../models/Conversation.js";
import { searchChunks } from "./vectorService.js";
import { buildPrompt } from "./promptService.js";
import { generateResponse } from "./geminiService.js";
import { generateQueryEmbedding } from "./embeddingService.js";
export const generateChatResponse = async ({
  conversationId,
  documentId,
  question,
  userId,
}) => {
  let conversation;
  const document = await Document.findOne({
    _id: documentId,
    owner: userId,
  });

  // Find existing conversation or create a new one
  if (conversationId) {
    conversation = await Conversation.findOne({
      _id: conversationId,
      owner: userId,
    });

    if (!conversation) {
      throw new Error("Conversation not found.");
    }
  } else {
    conversation = await Conversation.create({
      owner: userId,
      document: documentId,
      title: `${document.filename} Chat`,
      messages: [],
    });
  }

  // Save user's message immediately
  conversation.messages.push({
    role: "user",
    content: question,
  });

  await conversation.save();

  try {
    // Retrieve relevant chunks
    // Generate embedding for the user's question
    const queryEmbedding = await generateQueryEmbedding(question);

    // Search Pinecone
    const retrievedChunks = await searchChunks(queryEmbedding, documentId);
    // Extract text
    const context = retrievedChunks.map((chunk) => chunk.text);
    // Build prompt
    const prompt = buildPrompt({
      history: conversation.messages,
      context,
      question,
    });

    // Generate AI response
    const answer = await generateResponse(prompt);

    // Save assistant response
    conversation.messages.push({
      role: "assistant",
      content: answer,
      sources: retrievedChunks.map((chunk) => ({
        chunkIndex: chunk.chunkIndex,
        score: chunk.score,
      })),
    });

    await conversation.save();

    return {
      answer,
      conversationId: conversation._id,
      sources: retrievedChunks,
    };
  } catch (error) {
    console.error("Chat Service Error:", error);

    throw new Error("Failed to generate AI response.");
  }
};
