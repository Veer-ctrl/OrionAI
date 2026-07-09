import { Bot, User } from "lucide-react";
// Render message content as plain text to avoid runtime markdown renderer errors
const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-3xl gap-3 ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
        >
          {isUser ? (
            <User className="h-5 w-5" />
          ) : (
            <Bot className="h-5 w-5" />
          )}
        </div>

        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
        >
          <div style={{ whiteSpace: "pre-wrap" }}>
            {String(message.content)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;