import { createContext, useState } from "react";

import conversationService from "@/services/conversationService";
import chatService from "@/services/chatService";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversationId, setConversationId] =
    useState(null);

  const [document, setDocument] = useState(null);

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const [error, setError] = useState(null);

  // Load an existing conversation
  const loadConversation = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response =
        await conversationService.getConversation(id);

      const conversation = response.conversation;

      setConversationId(conversation._id);
      setDocument(conversation.document);
      setMessages(conversation.messages || []);

      return conversation;
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || err.message
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Open a document (resume existing conversation or create one)
  const initializeChat = async (docId, title) => {
    setLoading(true);
    setError(null);

    try {
      let conversation;

      try {
        const response =
          await conversationService.getConversationByDocument(
            docId
          );

        conversation = response.conversation;
      } catch (err) {
        if (err.response?.status === 404) {
          const response =
            await conversationService.createConversation(
              docId,
              title
            );

          conversation = response.conversation;
        } else {
          throw err;
        }
      }

      setConversationId(conversation._id);
      setDocument(conversation.document);
      setMessages(conversation.messages || []);

      return conversation;
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || err.message
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Send message
  const sendMessage = async (question) => {
    if (!conversationId) {
      throw new Error("Conversation not loaded.");
    }

    setSending(true);
    setError(null);

    const userMessage = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response =
        await chatService.sendMessage({
          conversationId,
          question,
        });

      const assistantMessage = {
        role: "assistant",
        content: response.data.answer,
        sources: response.data.sources,
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);

      return response;
    } catch (err) {
      console.error(err);

      setMessages((prev) => prev.slice(0, -1));

      setError(
        err.response?.data?.message || err.message
      );

      throw err;
    } finally {
      setSending(false);
    }
  };

  const clearChat = () => {
    setConversationId(null);
    setDocument(null);
    setMessages([]);
    setError(null);
  };

  const value = {
    conversationId,
    document,

    messages,

    loading,
    sending,
    error,

    initializeChat,
    loadConversation,
    sendMessage,
    clearChat,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};