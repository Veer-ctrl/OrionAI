import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useChat } from "@/hooks/useChat";

import ChatHeader from "@/components/chat/ChatHeader";
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";

const ChatPage = () => {
  const { conversationId } = useParams();

  const {
    loadConversation,
    document,
    messages,
    loading,
    sending,
    sendMessage,
  } = useChat();

  useEffect(() => {
    if (!conversationId) return;

    loadConversation(conversationId);
  }, [conversationId]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <p className="text-muted-foreground">
          Loading conversation...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col">
      <ChatHeader
        title={document?.filename || "Chat"}
      />

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto w-full max-w-4xl">
          <MessageList messages={messages} />
        </div>
      </div>

      <ChatInput
        sending={sending}
        onSend={sendMessage}
      />
    </div>
  );
};

export default ChatPage;