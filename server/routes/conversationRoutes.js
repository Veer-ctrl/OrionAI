import express from "express";
import { createConversation,getConversation,addMessage } from "../controllers/conversationController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getConversationByDocument } from "../controllers/conversationController.js";
import { getUserConversations } from "../controllers/conversationController.js";
const router = express.Router();

router.post("/", authMiddleware, createConversation);
router.get(
  "/document/:documentId",
  authMiddleware,
  getConversationByDocument
);
router.get(
  "/",
  authMiddleware,
  getUserConversations
);
router.get("/:id", authMiddleware, getConversation);
router.patch("/:id/messages", authMiddleware, addMessage);
export default router;