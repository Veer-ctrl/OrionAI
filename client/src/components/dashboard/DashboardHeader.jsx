import { useState } from "react";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import UploadDialog from "./UploadDialog";

const DashboardHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            My Documents
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Upload PDFs, organize your knowledge base, and chat with your documents using AI.
          </p>
        </div>

        <Button size="lg" onClick={() => setOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload PDF
        </Button>
      </div>

      <UploadDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

export default DashboardHeader;