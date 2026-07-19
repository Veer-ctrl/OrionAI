import Conversation from "../models/Conversation.js";
import Document from "../models/document.js";

import { searchChunks } from "./vectorservice.js";
import { buildPrompt } from "./promptService.js";
import { generateResponse } from "./geminiService.js";
import { generateQueryEmbedding } from "./embeddingService.js";

export const generateChatResponse = async ({
  conversationId,
  question,
  userId,
}) => {
  // Load conversation
  const conversation = await Conversation.findOne({
    _id: conversationId,
    owner: userId,
  });

  if (!conversation) {
    throw new Error("Conversation not found.");
  }

  // Load document from conversation
  const document = await Document.findOne({
    _id: conversation.document,
    owner: userId,
  });

  if (!document) {
    throw new Error("Document not found.");
  }

  // Save user message
  conversation.messages.push({
    role: "user",
    content: question,
  });

  await conversation.save();

  try {
    // Generate embedding
    const queryEmbedding =
      await generateQueryEmbedding(question);

    // Search Pinecone
    const retrievedChunks = await searchChunks(
      queryEmbedding,
      document._id.toString()
    );

    // Build prompt
    const prompt = buildPrompt({
      history: conversation.messages,
      context: retrievedChunks.map(
        (chunk) => chunk.text
      ),
      question,
    });

    // Generate response
    const answer = await generateResponse(prompt);

    // Save assistant message
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