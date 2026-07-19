import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

const suggestions = [
  "Summarize this document",
  "What are the key points?",
  "Explain the main concepts",
];

const MessageList = ({ messages, sending }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  if (!messages.length && !sending) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <div className="logo-slot h-12 w-12" />

        <h2 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
          How can I help?
        </h2>

        <p className="mt-2 max-w-xs text-xs text-muted-foreground">
          Ask anything about your document. I&apos;ll find relevant context and
          provide accurate answers.
        </p>

        <div className="mt-6 grid w-full max-w-sm gap-2">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="glass-card rounded-xl px-3.5 py-2.5 text-left text-xs text-muted-foreground transition-all duration-200 hover:border-accent/30 hover:bg-secondary/50"
            >
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col px-4 py-5">
      {messages.map((message, index) => (
        <MessageBubble key={index} message={message} />
      ))}

      {sending && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
