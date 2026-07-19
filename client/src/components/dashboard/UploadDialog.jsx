import { useState } from "react";
import { Upload } from "lucide-react";
import { useDocuments } from "@/hooks/useDocuments";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UploadDialog = ({ open, onOpenChange }) => {
  const { uploadDocument, uploading } = useDocuments();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      await uploadDocument(file);
      setFile(null);
      onOpenChange(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF</DialogTitle>
          <DialogDescription>
            Select a PDF document to upload and make it available for chat.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <label className="grid gap-2 text-sm font-medium">
            Document file
            <Input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </label>

          <div className="rounded-xl border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Tip</p>
            <p className="mt-1">Upload a PDF to start asking questions from its content.</p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="ml-auto"
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
