import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ChatHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div>
          <h1 className="text-xl font-semibold">
            {title}
          </h1>

          <p className="text-sm text-muted-foreground">
            Chat with your document using AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;