import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

export const chunkText = async (text) => {
  const docs = await splitter.createDocuments([text]);

  return docs.map((doc) => doc.pageContent);
};