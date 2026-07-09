import Conversation from "../models/Conversation.js";
import Document from "../models/document.js";

// @desc    Create a new conversation
// @route   POST /api/conversations
// @access  Private
export const createConversation = async (req, res) => {
  const { documentId, title } = req.body;

  // Validate input
  if (!documentId || !title) {
    return res.status(400).json({
      success: false,
      message: "Document ID and title are required.",
    });
  }

  // Check if document exists and belongs to the logged-in user
  const document = await Document.findOne({
    _id: documentId,
    owner: req.user.id,
  });

  if (!document) {
    return res.status(404).json({
      success: false,
      message: "Document not found.",
    });
  }

  // Create conversation
  const conversation = await Conversation.create({
    owner: req.user.id,
    document: documentId,
    title,
  });

  res.status(201).json({
    success: true,
    message: "Conversation created successfully.",
    conversation,
  });
};


// @desc    Get a conversation by ID
// @route   GET /api/conversations/:id
// @access  Private
export const getConversation = async (req, res) => {
  const { id } = req.params;

  const conversation = await Conversation.findOne({
    _id: id,
    owner: req.user.id,
  }).populate("document", "filename");

  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: "Conversation not found.",
    });
  }

  res.status(200).json({
    success: true,
    conversation,
  });
};

// @desc    Add a message to a conversation
// @route   PATCH /api/conversations/:id/messages
// @access  Private
export const addMessage = async (req, res) => {
  const { id } = req.params;
  const { role, content } = req.body;

  if (!role || !content) {
    return res.status(400).json({
      success: false,
      message: "Role and content are required.",
    });
  }

  const conversation = await Conversation.findOne({
    _id: id,
    owner: req.user.id,
  });

  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: "Conversation not found.",
    });
  }

  conversation.messages.push({
    role,
    content,
  });

  await conversation.save();

  res.status(200).json({
    success: true,
    message: "Message added successfully.",
    conversation,
  });
};

export const getConversationByDocument = async (req, res) => {
  const { documentId } = req.params;

  const conversation = await Conversation.findOne({
    owner: req.user.id,
    document: documentId,
  }).populate("document", "filename");

  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: "Conversation not found.",
    });
  }

  res.status(200).json({
    success: true,
    conversation,
  });
};
export const getUserConversations = async (
  req,
  res
) => {
  const conversations =
    await Conversation.find({
      owner: req.user.id,
    })
      .populate("document", "filename")
      .sort({
        updatedAt: -1,
      });

  res.json({
    success: true,
    conversations,
  });
};