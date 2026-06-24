// services/pdfService.js

import pdf from "pdf-parse-debugging-disabled";

export const extractText = async (buffer) => {
  const data = await pdf(buffer);

  return {
    text: data.text,
    pageCount: data.numpages,
  };
};