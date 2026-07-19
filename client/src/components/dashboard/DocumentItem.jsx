import { FileText, Trash2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { useChat } from "@/hooks/useChat";

const DocumentItem = ({ id, name, size, uploadedAt, onDelete, isEven }) => {
  const navigate = useNavigate();
  const { initializeChat } = useChat();
  const [deleting, setDeleting] = useState(false);

  const handleOpenChat = async () => {
    try {
      const conversation = await initializeChat(id, name);
      navigate(`/chat/${conversation._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (deleting) return;
    setDeleting(true);
    try {
      await toast.promise(onDelete(id), {
        loading: "Deleting...",
        success: "Document deleted.",
        error: (err) => err?.response?.data?.message || "Failed to delete.",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className="group grid items-center gap-4 px-5 py-3.5 cursor-pointer transition-all duration-150 last:border-b-0"
      style={{
        gridTemplateColumns: "minmax(0,1fr) auto auto 32px",
        backgroundColor: isEven ? "transparent" : "rgba(7,21,51,0.02)",
        borderBottom: "1px solid rgba(7,21,51,0.06)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,138,31,0.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isEven ? "transparent" : "rgba(7,21,51,0.02)")}
      onClick={handleOpenChat}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpenChat();
        }
      }}
    >
      {/* Name */}
      <div className="flex min-w-0 items-center gap-2.5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "rgba(255,138,31,0.1)" }}
        >
          <FileText className="h-3.5 w-3.5" style={{ color: "#FF8A1F" }} />
        </div>
        <span
          className="truncate text-sm font-medium transition-colors duration-150"
          style={{ color: "#071533" }}
        >
          {name}
        </span>
      </div>

      {/* Size */}
      <span
        className="whitespace-nowrap text-right text-xs tabular-nums"
        style={{ color: "rgba(7,21,51,0.45)" }}
      >
        {size}
      </span>

      {/* Date */}
      <span
        className="whitespace-nowrap text-right text-xs"
        style={{ color: "rgba(7,21,51,0.45)" }}
      >
        {uploadedAt}
      </span>

      {/* Delete */}
      <button
        onClick={handleDelete}
        disabled={deleting}
        aria-label="Delete document"
        className="flex items-center justify-center w-7 h-7 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-150"
        style={{ color: "rgba(7,21,51,0.35)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(220,38,38,0.08)";
          e.currentTarget.style.color = "#dc2626";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "rgba(7,21,51,0.35)";
        }}
      >
        {deleting ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Trash2 className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
};

export default DocumentItem;
