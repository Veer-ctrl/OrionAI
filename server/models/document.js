// models/Document.js

import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    filename: {
      type: String,
      required: true,
      trim: true,
    },

    extractedText: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    pageCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", documentSchema);

export default Document;