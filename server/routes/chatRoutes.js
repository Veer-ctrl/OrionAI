import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { chatWithDocument } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", authMiddleware, chatWithDocument);

export default router;