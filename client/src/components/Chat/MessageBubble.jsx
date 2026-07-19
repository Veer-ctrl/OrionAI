import AIMessage from "./AIMessage";
import UserMessage from "./UserMessage";

const MessageBubble = ({ message }) => {
  return message.role === "user" ? (
    <UserMessage message={message} />
  ) : (
    <AIMessage message={message} />
  );
};

export default MessageBubble;