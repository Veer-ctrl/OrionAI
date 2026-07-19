import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useChat } from "@/hooks/useChat";
import LoadingSpinner from "@/components/Common/LoadingSpinner";

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
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner message="Loading..." size="sm" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <ChatHeader title={document?.filename || "Chat"} />

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <MessageList messages={messages} sending={sending} />
      </div>

      <div className="border-t border-border bg-background/90 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto max-w-2xl">
          <ChatInput sending={sending} onSend={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
