// controllers/documentController.js
import Chunk from "../models/chunks.js";
import { chunkText } from "../services/chunkService.js";
import Document from "../models/document.js";
import { extractText } from "../services/pdfService.js";
import { generateEmbeddings } from "../services/embeddingService.js";
// POST /api/documents/upload
import mongoose from "mongoose";

export const uploadDocument = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (!req.file) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        success: false,
        message: "No PDF file uploaded",
      });
    }

    const { text, pageCount } = await extractText(req.file.buffer);

    if (!text.trim()) {
      await session.abortTransaction();
      session.endSession();

      return res.status(400).json({
        success: false,
        message:
          "Could not extract text from PDF. The file may be scanned or image-based.",
      });
    }

    const document = await Document.create(
      [
        {
          owner: req.user.id,
          filename: req.file.originalname,
          extractedText: text,
          size: req.file.size,
          pageCount,
        },
      ],
      { session },
    );

    const savedDocument = document[0];

    const chunks = await chunkText(text);

    const embeddedChunks = await generateEmbeddings(chunks);
    if (vectors.length !== chunks.length) {
    throw new Error(
        "Embedding generation failed."
    );
}

    const chunkDocuments = chunks.map((content, index) => ({
      owner: req.user.id,
      document: savedDocument._id,
      chunkIndex: index,
      content,
      embedding: vectors[index],
    }));
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      document: {
        id: savedDocument._id,
        filename: savedDocument.filename,
        size: savedDocument.size,
        pageCount: savedDocument.pageCount,
        chunkCount: chunks.length,
        createdAt: savedDocument.createdAt,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/documents
export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      owner: req.user.id,
    })
      .select("-extractedText")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: documents.length,
      documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/documents/:id
export const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.status(200).json({
      success: true,
      document,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /api/documents/:id
export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    await document.deleteOne();

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
