import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, MessageSquare, FolderOpen } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import UploadDialog from "./UploadDialog";

const actions = [
  {
    id: "upload",
    title: "Upload PDF",
    description: "Add a new document",
    icon: Upload,
  },
  {
    id: "chat",
    title: "Start Chat",
    description: "Chat with your documents",
    icon: MessageSquare,
    path: "/chat",
  },
  {
    id: "documents",
    title: "View Documents",
    description: "Manage uploaded PDFs",
    icon: FolderOpen,
    path: "/documents",
  },
];

const QuickActions = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleActionClick = (action) => {
    if (action.id === "upload") {
      setOpen(true);
      return;
    }

    navigate(action.path);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto w-full justify-start p-4"
                onClick={() => handleActionClick(action)}
              >
                <Icon className="mr-3 h-5 w-5" />

                <div className="text-left">
                  <p className="font-medium">{action.title}</p>

                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      <UploadDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};

export default QuickActions;