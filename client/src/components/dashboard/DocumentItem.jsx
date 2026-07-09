import {
  FileText,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { useChat } from "@/hooks/useChat";

const DocumentItem = ({
  id,
  name,
  size,
  uploadedAt,
  onDelete,
}) => {
  const navigate = useNavigate();

  const { initializeChat } = useChat();

  const handleOpenChat = async () => {
    try {
      const conversation = await initializeChat(
        id,
        name
      );

      navigate(`/chat/${conversation._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all hover:bg-muted/50"
      onClick={handleOpenChat}
    >
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <FileText className="h-5 w-5 text-primary" />
        </div>

        <div>
          <p className="font-medium">{name}</p>

          <p className="text-sm text-muted-foreground">
            {size} • {uploadedAt}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ChevronRight className="h-4 w-4 text-muted-foreground" />

        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
};

export default DocumentItem;