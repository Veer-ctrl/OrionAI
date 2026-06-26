import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { searchDocument } from "../controllers/searchController.js";

const router = express.Router();

router.post("/", authMiddleware, searchDocument);

export default router;