// controllers/documentController.js

import Document from "../models/Document.js";
import { extractText } from "../services/pdfService.js";

// POST /api/documents/upload
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF file uploaded",
      });
    }

    const { text, pageCount } = await extractText(
      req.file.buffer
    );

    if (!text.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Could not extract text from PDF. The file may be scanned or image-based.",
      });
    }
    console.log("req.user._id", req.user.id);
    const document = await Document.create({
      owner: req.user.id,
      filename: req.file.originalname,
      extractedText: text,
      size: req.file.size,
      pageCount,
    });

    res.status(201).json({
      success: true,
      document: {
        id: document._id,
        filename: document.filename,
        size: document.size,
        pageCount: document.pageCount,
        createdAt: document.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
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