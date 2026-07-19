import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const SourceViewer = ({ sources }) => {
  const [expanded, setExpanded] = useState(false);

  if (!sources?.length) return null;

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[10px] font-medium text-muted-foreground transition-colors duration-150 hover:text-accent"
      >
        <BookOpen className="h-3 w-3" />
        {sources.length} source{sources.length !== 1 ? "s" : ""}
        {expanded ? (
          <ChevronUp className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )}
      </button>

      <div
        className={cn(
          "grid transition-all duration-200",
          expanded
            ? "mt-2 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-1.5 rounded-xl border border-border bg-secondary/40 p-2.5">
            {sources.map((source, index) => (
              <div
                key={index}
                className="rounded-lg bg-card px-3 py-2 text-[11px] leading-relaxed text-muted-foreground"
              >
                {typeof source === "string"
                  ? source
                  : source.text || source.content || JSON.stringify(source)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceViewer;
