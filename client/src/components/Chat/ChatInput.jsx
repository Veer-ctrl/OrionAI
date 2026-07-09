import { useState } from "react";
import { SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const ChatInput = ({ onSend, sending }) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = async () => {
    const value = question.trim();

    if (!value) return;

    await onSend(value);

    setQuestion("");
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      await handleSubmit();
    }
  };

  return (
    <div className="border-t pt-4">
      <div className="flex gap-3">
        <Textarea
          value={question}
          rows={2}
          placeholder="Ask anything about this document..."
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />

        <Button
          size="icon"
          onClick={handleSubmit}
          disabled={sending}
        >
          <SendHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;