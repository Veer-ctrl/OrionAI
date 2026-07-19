import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const ChatInput = ({ onSend, sending }) => {
  const [question, setQuestion] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [question]);

  const handleSubmit = async () => {
    const value = question.trim();
    if (!value || sending) return;
    setQuestion("");
    await onSend(value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSubmit();
    }
  };

  const canSend = question.trim().length > 0 && !sending;

  return (
    <div className="w-full">
      <div
        className={cn(
          "relative flex items-end rounded-xl border border-border bg-card shadow-glow transition-all duration-200",
          "focus-within:border-accent/50 focus-within:shadow-glow-purple"
        )}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={question}
          placeholder="Ask about this document..."
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={sending}
          className="max-h-[160px] min-h-[44px] flex-1 resize-none bg-transparent px-4 py-3 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60 scrollbar-thin"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSend}
          aria-label="Send message"
          className={cn(
            "m-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
            canSend
              ? "bg-accent text-accent-foreground shadow-glow-purple hover:brightness-110 active:scale-95"
              : "bg-muted text-muted-foreground"
          )}
        >
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
