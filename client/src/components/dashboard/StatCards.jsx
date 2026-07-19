import { FileText, MessageSquare, HardDrive } from "lucide-react";
import StatCard from "./StatCard";

const StatsCards = ({ documents, totalConversations }) => {
  const totalDocuments = documents.length;
  const totalStorage =
    documents.reduce((total, doc) => total + doc.size, 0) / (1024 * 1024);

  const stats = [
    { title: "Documents", value: totalDocuments, icon: FileText, accent: "#FF8A1F" },
    { title: "Conversations", value: totalConversations, icon: MessageSquare, accent: "#655CFF" },
    { title: "Storage Used", value: `${totalStorage.toFixed(1)} MB`, icon: HardDrive, accent: "#071533" },
  ];

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;
