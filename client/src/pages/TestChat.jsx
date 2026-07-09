import { useState } from "react";

import conversationService from "../services/conversationService";
import chatService from "../services/chatService";

const TestChat = () => {
  const [documentId, setDocumentId] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [question, setQuestion] = useState("");

  const handleCreateConversation = async () => {
    try {
      const response = await conversationService.createConversation(
        documentId,
        "Test Conversation"
      );

      console.log("Conversation Created:", response);

      setConversationId(response.conversation._id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const response = await chatService.sendMessage({
        conversationId,
        documentId,
        question,
      });

      console.log("Gemini Response:", response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold">
        Chat Service Test
      </h1>

      <input
        className="w-full rounded border p-3"
        placeholder="Document ID"
        value={documentId}
        onChange={(e) => setDocumentId(e.target.value)}
      />

      <button
        onClick={handleCreateConversation}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Create Conversation
      </button>

      <input
        className="w-full rounded border p-3"
        placeholder="Conversation ID"
        value={conversationId}
        onChange={(e) => setConversationId(e.target.value)}
      />

      <textarea
        className="w-full rounded border p-3"
        rows={4}
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={handleSendMessage}
        className="rounded bg-green-600 px-4 py-2 text-white"
      >
        Send Question
      </button>
    </div>
  );
};

export default TestChat;