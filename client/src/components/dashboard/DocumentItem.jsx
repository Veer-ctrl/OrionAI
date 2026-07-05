import { FileText } from "lucide-react";

const DocumentItem = ({ name, size, uploadedAt }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
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
    </div>
  );
};

export default DocumentItem;