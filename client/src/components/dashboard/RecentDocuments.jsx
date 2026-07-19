import { useState } from "react";
import { Search, FileText } from "lucide-react";
import DocumentItem from "./DocumentItem";

const formatFileSize = (bytes) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
      style={{ backgroundColor: "rgba(7,21,51,0.05)", border: "1px solid rgba(7,21,51,0.08)" }}
    >
      <FileText className="h-5 w-5" style={{ color: "rgba(7,21,51,0.3)" }} />
    </div>
    <h3 className="text-sm font-semibold mb-1" style={{ color: "#071533" }}>No documents yet</h3>
    <p className="text-xs max-w-[200px]" style={{ color: "rgba(7,21,51,0.45)" }}>
      Upload a PDF to start building your knowledge base.
    </p>
  </div>
);

const RecentDocuments = ({ documents, onDelete }) => {
  const [search, setSearch] = useState("");

  const filtered = documents.filter((doc) =>
    doc.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold tracking-tight" style={{ color: "#071533" }}>
            Library
          </h2>
          {documents.length > 0 && (
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(255,138,31,0.15)", color: "#FF8A1F" }}
            >
              {documents.length}
            </span>
          )}
        </div>

        {documents.length > 0 && (
          <div className="relative">
            <Search
              className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 pointer-events-none"
              style={{ color: "rgba(7,21,51,0.35)" }}
            />
            <input
              placeholder="Filter documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 pr-4 text-xs rounded-xl outline-none transition-all duration-200"
              style={{
                backgroundColor: "rgba(7,21,51,0.04)",
                border: "1px solid rgba(7,21,51,0.1)",
                color: "#071533",
                width: "200px",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(7,21,51,0.25)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(7,21,51,0.1)")}
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid rgba(7,21,51,0.08)" }}
      >
        {documents.length > 0 && filtered.length > 0 && (
          <div
            className="grid gap-4 px-5 py-3 text-[10px] font-semibold uppercase tracking-widest"
            style={{
              gridTemplateColumns: "minmax(0,1fr) auto auto 32px",
              backgroundColor: "rgba(7,21,51,0.03)",
              borderBottom: "1px solid rgba(7,21,51,0.07)",
              color: "rgba(7,21,51,0.35)",
            }}
          >
            <span>Name</span>
            <span className="text-right">Size</span>
            <span className="text-right">Uploaded</span>
            <span />
          </div>
        )}

        <div className={filtered.length > 8 ? "max-h-[440px] overflow-y-auto" : ""}>
          {documents.length === 0 ? (
            <EmptyState />
          ) : filtered.length === 0 ? (
            <p className="py-10 text-center text-xs" style={{ color: "rgba(7,21,51,0.4)" }}>
              No matches found.
            </p>
          ) : (
            filtered.map((doc, index) => (
              <DocumentItem
                key={doc._id}
                id={doc._id}
                name={doc.filename}
                size={formatFileSize(doc.size)}
                uploadedAt={formatDate(doc.createdAt)}
                onDelete={onDelete}
                isEven={index % 2 === 0}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentDocuments;
