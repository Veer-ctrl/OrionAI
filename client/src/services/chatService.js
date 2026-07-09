import api from "../lib/axios";

export const sendMessage = async ({
  conversationId,
  question,
}) => {
  const response = await api.post("/chat", {
    conversationId,
    question,
  });

  return response.data;
};

const chatService = {
  sendMessage,
};

export default chatService;