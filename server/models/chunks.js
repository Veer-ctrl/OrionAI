import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },

    chunkIndex: {
      type: Number,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
    vectorId: {
      type: String,
      default: null,
    },
    embedding: {
      type: [Number],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
chunkSchema.index({ owner: 1 });
chunkSchema.index({ document: 1 });
chunkSchema.index({ document: 1, chunkIndex: 1 });
export default mongoose.model("Chunk", chunkSchema);
