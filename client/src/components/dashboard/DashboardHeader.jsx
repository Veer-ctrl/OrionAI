import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back
        </h1>

        <p className="mt-1 text-muted-foreground">
          {today}
        </p>
      </div>

      <Button>
        <Upload className="mr-2 h-4 w-4" />
        Upload PDF
      </Button>
    </div>
  );
};

export default DashboardHeader;