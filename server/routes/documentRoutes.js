// routes/documentRoutes.js

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload, { uploadSingle } from "../middleware/uploadMiddleware.js";

import {
  uploadDocument,
  getDocuments,
  getDocumentById,
  deleteDocument,
} from "../controllers/documentController.js";

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  uploadSingle("document"),
  uploadDocument
);

router.get("/", authMiddleware, getDocuments);
router.get("/:id", authMiddleware, getDocumentById);
router.delete("/:id", authMiddleware, deleteDocument);

export default router;