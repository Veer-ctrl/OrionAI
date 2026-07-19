import { ArrowLeft, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FILE_STYLES = {
  pdf: "bg-gradient-to-br from-rose-500/15 to-orange-400/10 text-rose-600 ring-rose-500/15",
  docx: "bg-gradient-to-br from-sky-500/15 to-blue-400/10 text-sky-600 ring-sky-500/15",
  default: "bg-gradient-to-br from-muted to-muted/50 text-muted-foreground ring-border",
};

const getFileType = (name = "") => {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return "pdf";
  if (["doc", "docx"].includes(ext)) return "docx";
  return "default";
};

const ChatHeader = ({
  title,
  pageCount,
  uploadDate,
  aiReady = true,
}) => {
  const navigate = useNavigate();
  const fileType = getFileType(title);
  const iconStyle = FILE_STYLES[fileType];

  const metaParts = [
    fileType !== "default" && fileType.toUpperCase(),
    pageCount && `${pageCount} pages`,
    uploadDate,
  ].filter(Boolean);

  return (
    <div className="sticky top-2 z-10 px-4 pt-2">
      <header
        className="
          mx-auto flex max-w-4xl items-center gap-3
          rounded-3xl border border-border/50
          bg-background/70 px-4 py-3
          shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]
          backdrop-blur-xl backdrop-saturate-150
          transition-shadow duration-300
          sm:px-5 sm:py-3.5
        "
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/dashboard")}
          aria-label="Back to dashboard"
          className="
            h-9 w-9 shrink-0 rounded-full
            border border-border/60 bg-background/80
            text-muted-foreground shadow-sm
            transition-all duration-200 ease-out
            hover:scale-105 hover:bg-muted hover:text-foreground hover:shadow-md
            active:scale-95
            focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          "
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ${iconStyle}`}
        >
          <FileText className="h-4 w-4" strokeWidth={2} />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[15px] font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            {metaParts.map((part, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-border">·</span>}
                <span className="truncate">{part}</span>
              </span>
            ))}
          </div>
        </div>

       
      </header>
    </div>
  );
};

export default ChatHeader;