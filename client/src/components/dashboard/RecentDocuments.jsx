import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import DocumentItem from "./DocumentItem";

const documents = [
  {
    id: 1,
    name: "React Handbook.pdf",
    size: "2.4 MB",
    uploadedAt: "Today",
  },
  {
    id: 2,
    name: "Machine Learning Notes.pdf",
    size: "5.9 MB",
    uploadedAt: "Yesterday",
  },
  {
    id: 3,
    name: "System Design.pdf",
    size: "1.8 MB",
    uploadedAt: "2 days ago",
  },
];

const RecentDocuments = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Documents</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {documents.map((doc) => (
          <DocumentItem
            key={doc.id}
            name={doc.name}
            size={doc.size}
            uploadedAt={doc.uploadedAt}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentDocuments;