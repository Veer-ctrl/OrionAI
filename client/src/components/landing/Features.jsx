import { Upload, MessageSquare, Search, BookOpen } from "lucide-react";

const FEATURES = [
  {
    icon: Upload,
    number: "01",
    title: "Upload PDFs",
    description:
      "Drop any PDF — research papers, contracts, manuals. Orion processes and indexes every page instantly.",
    accent: "#FF8A1F",
  },
  {
    icon: MessageSquare,
    number: "02",
    title: "AI Chat",
    description:
      "Ask questions in plain language. Get precise, context-aware answers drawn directly from your document.",
    accent: "#655CFF",
  },
  {
    icon: Search,
    number: "03",
    title: "Semantic Search",
    description:
      "Go beyond keyword matching. Orion understands meaning, finding relevant content even when phrased differently.",
    accent: "#DFFF66",
  },
  {
    icon: BookOpen,
    number: "04",
    title: "Source References",
    description:
      "Every answer is grounded in your document. See exactly which section and page the information came from.",
    accent: "#FF8A1F",
  },
];

function FeatureCard({ icon: Icon, number, title, description, accent }) {
  return (
    <div
      className="group relative p-8 rounded-2xl transition-all duration-300 cursor-default"
      style={{
        backgroundColor: "rgba(7,21,51,0.03)",
        border: "1px solid rgba(7,21,51,0.08)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(7,21,51,0.05)";
        e.currentTarget.style.borderColor = "rgba(7,21,51,0.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(7,21,51,0.03)";
        e.currentTarget.style.borderColor = "rgba(7,21,51,0.08)";
      }}
    >
      <div className="flex items-start justify-between mb-6">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: accent + "20" }}
        >
          <Icon size={20} style={{ color: accent === "#DFFF66" ? "#071533" : accent }} />
        </div>
        <span
          className="text-4xl font-bold tabular-nums select-none"
          style={{ color: "rgba(7,21,51,0.06)" }}
        >
          {number}
        </span>
      </div>
      <h3
        className="text-xl font-semibold mb-3 tracking-tight"
        style={{ color: "#071533" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(7,21,51,0.55)" }}>
        {description}
      </p>
      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-8 right-8 h-px transition-all duration-300 opacity-0 group-hover:opacity-100"
        style={{ backgroundColor: accent }}
      />
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#FF8A1F" }}
          >
            Features
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-sm"
              style={{ color: "#071533" }}
            >
              Everything you need to unlock your documents.
            </h2>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "rgba(7,21,51,0.5)" }}
            >
              From upload to insight — a complete workflow for making your PDFs truly useful.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
