import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const uploadPdf = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "orion/documents",
        resource_type: "raw",
        public_id: `${Date.now()}-${filename.replace(".pdf", "")}`,
      },
      (error, result) => {
        if (error) return reject(error);

        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};