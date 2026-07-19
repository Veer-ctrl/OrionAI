import { useState } from "react";
import { Upload } from "lucide-react";
import UploadDialog from "./UploadDialog";
import useAuth from "@/hooks/useAuth";

const DashboardHeader = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <>
      <header className="mb-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#FF8A1F" }}>
            Dashboard
          </p>
          <h1 className="text-3xl font-bold tracking-tight leading-tight" style={{ color: "#071533" }}>
            Welcome back, {firstName}.
          </h1>
          <p className="mt-2 text-sm" style={{ color: "rgba(7,21,51,0.5)" }}>
            Upload PDFs and start chatting with your documents.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex-shrink-0"
          style={{ backgroundColor: "#071533", color: "#FFF8EC" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#FF8A1F";
            e.currentTarget.style.color = "#071533";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#071533";
            e.currentTarget.style.color = "#FFF8EC";
          }}
        >
          <Upload className="h-4 w-4" />
          Upload PDF
        </button>
      </header>

      <UploadDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

export default DashboardHeader;
