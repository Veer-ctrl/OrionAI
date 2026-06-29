import { generateChatResponse } from "../services/chatService.js";

// @desc    Chat with a document
// @route   POST /api/chat
// @access  Private
export const chatWithDocument = async (req, res) => {
  try {
    const { conversationId, documentId, question } = req.body;

    if (!documentId || !question) {
      return res.status(400).json({
        success: false,
        message: "Document ID and question are required.",
      });
    }

    const result = await generateChatResponse({
      conversationId,
      documentId,
      question,
      userId: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "Response generated successfully.",
      conversationId: result.conversationId,
      data: {
        answer: result.answer,
        conversationId: result.conversationId,
        sources: result.sources,
      },
    });
  } catch (error) {
    console.error("Chat Controller Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate response.",
    });
  }
};
