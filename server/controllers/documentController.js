// controllers/documentController.js
import Chunk from "../models/chunks.js";
import { chunkText } from "../services/chunkService.js";
import Document from "../models/document.js";
import { extractText } from "../services/pdfService.js";
import { generateEmbeddings } from "../services/embeddingService.js";
import { upsertChunks,deleteChunks } from "../services/vectorService.js";
// POST /api/documents/upload
import mongoose from "mongoose";

export const uploadDocument = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (!req.file) {
      throw new Error("No PDF file uploaded.");
    }

    // 1. Extract text
    const { text, pageCount } = await extractText(req.file.buffer);

    if (!text.trim()) {
      throw new Error(
        "Could not extract text from PDF. The file may be scanned or image-based."
      );
    }

    // 2. Create document
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
      { session }
    );

    const savedDocument = document[0];

    // 3. Split into chunks
    const chunks = await chunkText(text);

    // 4. Generate embeddings
    const vectors = await generateEmbeddings(chunks);

    if (vectors.length !== chunks.length) {
      throw new Error("Embedding generation failed.");
    }

    // 5. Prepare chunks for Pinecone
    const pineconeChunks = chunks.map((content, index) => ({
      content,
      embedding: vectors[index],
      chunkIndex: index,
    }));

    // 6. Upload vectors to Pinecone
    await upsertChunks(
      pineconeChunks,
      savedDocument._id.toString()
    );

    // 7. Prepare MongoDB chunk documents
    const chunkDocuments = chunks.map((content, index) => ({
      owner: req.user.id,
      document: savedDocument._id,
      chunkIndex: index,
      content,
      embedding: vectors[index],
      vectorId: `${savedDocument._id}-${index}`,
    }));

    // 8. Save chunks
    await Chunk.insertMany(chunkDocuments, {
      session,
    });

    // 9. Commit transaction
    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      document: {
        id: savedDocument._id,
        filename: savedDocument.filename,
        size: savedDocument.size,
        pageCount: savedDocument.pageCount,
        chunkCount: chunkDocuments.length,
        createdAt: savedDocument.createdAt,
      },
    });
  } catch (error) {
    await session.abortTransaction();

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    session.endSession();
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
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const document = await Document.findOne({
      _id: req.params.id,
      owner: req.user.id,
    }).session(session);

    if (!document) {
      throw new Error("Document not found.");
    }

    // 1. Delete vectors from Pinecone
    await deleteChunks(document._id.toString());

    // 2. Delete chunks from MongoDB
    await Chunk.deleteMany(
      {
        document: document._id,
      },
      { session }
    );

    // 3. Delete document
    await Document.deleteOne(
      {
        _id: document._id,
      },
      { session }
    );

    await session.commitTransaction();

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully.",
    });
  } catch (error) {
    await session.abortTransaction();

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    session.endSession();
  }
};
