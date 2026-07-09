import { useState } from "react";
import { Upload } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useDocuments } from "@/hooks/useDocuments";

const UploadDialog = ({ open, onOpenChange }) => {
  const { uploadDocument, uploading } = useDocuments();

  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    try {
      await uploadDocument(file);

      setFile(null);

      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Upload PDF
          </DialogTitle>

          <DialogDescription>
            Select a PDF document to upload.
          </DialogDescription>
        </DialogHeader>

        <Input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            
          >
            Cancel
          </Button>

          <Button
            onClick={handleUpload}
            disabled={!file || uploading}
          >
            <Upload className="mr-2 h-4 w-4" />

            {uploading
              ? "Uploading..."
              : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;