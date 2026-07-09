import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";

const MessageList = ({ messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (!messages.length) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">
          Start the conversation by asking a question.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <MessageBubble
          key={index}
          message={message}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;