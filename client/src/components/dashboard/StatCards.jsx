import {
  FileText,
  MessageSquare,
  HardDrive,
} from "lucide-react";

import StatCard from "./StatCard";

const StatsCards = ({ documents, totalConversations }) => {
  // Total documents
  const totalDocuments = documents.length;

  // Total storage (bytes → MB)
  const totalStorage =
    documents.reduce((total, document) => {
      return total + document.size;
    }, 0) /
    (1024 * 1024);

  const stats = [
    {
      title: "Documents",
      value: totalDocuments,
      icon: FileText,
    },
    {
      title: "Conversations",
      value: totalConversations,
      icon: MessageSquare,
    },
    {
      title: "Storage",
      value: `${totalStorage.toFixed(2)} MB`,
      icon: HardDrive,
    },
  ];

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default StatsCards;