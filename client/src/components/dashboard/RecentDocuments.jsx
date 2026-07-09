import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import DocumentItem from "./DocumentItem";
import { useDocuments } from "@/hooks/useDocuments";
const formatFileSize = (bytes) => {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const RecentDocuments = ({ documents, onDelete }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Your Documents</CardTitle>{" "}
      </CardHeader>

      <CardContent className="space-y-3">
        {documents.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No documents uploaded yet.
          </p>
        ) : (
          documents.map((doc) => (
            <DocumentItem
              key={doc._id}
              id={doc._id}
              name={doc.filename}
              size={formatFileSize(doc.size)}
              uploadedAt={formatDate(doc.createdAt)}
              onDelete={onDelete}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default RecentDocuments;
