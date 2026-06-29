import express from "express";
import { createConversation,getConversation,addMessage } from "../controllers/conversationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createConversation);
router.get("/:id", authMiddleware, getConversation);
router.patch("/:id/messages", authMiddleware, addMessage);
export default router;