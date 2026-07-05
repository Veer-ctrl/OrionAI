import {
  FileText,
  MessageSquare,
  HardDrive,
} from "lucide-react";

import StatCard from "./StatCard";

const stats = [
  {
    title: "Documents",
    value: "0",
    icon: FileText,
  },
  {
    title: "Conversations",
    value: "0",
    icon: MessageSquare,
  },
  {
    title: "Storage",
    value: "0 MB",
    icon: HardDrive,
  },
];

const StatsCards = () => {
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