import api from "../lib/axios";


export const getConversations = async () => {
  const response = await api.get("/conversations");

  return response.data;
};

export const createConversation = async (documentId, title) => {
  const response = await api.post("/conversations", {
    documentId,
    title,
  });

  return response.data;
};

export const getConversation = async (conversationId) => {
  const response = await api.get(
    `/conversations/${conversationId}`
  );

  return response.data;
};

export const getConversationByDocument = async (documentId) => {
  const response = await api.get(
    `/conversations/document/${documentId}`
  );

  return response.data;
};

export const addMessage = async (
  conversationId,
  role,
  content
) => {
  const response = await api.patch(
    `/conversations/${conversationId}/messages`,
    {
      role,
      content,
    }
  );

  return response.data;
};

const conversationService = {
  createConversation,
  getConversation,
  getConversationByDocument,
  addMessage,
  getConversations,
};

export default conversationService;