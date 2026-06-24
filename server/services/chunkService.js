const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

export const chunkText = (text) => {
  const chunks = [];

  let start = 0;

  while (start < text.length) {
    const end = start + CHUNK_SIZE;

    const chunk = text.slice(start, end);

    chunks.push(chunk);

    start += CHUNK_SIZE - CHUNK_OVERLAP;
  }

  return chunks;
};