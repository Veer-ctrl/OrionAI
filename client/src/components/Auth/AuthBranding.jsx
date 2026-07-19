import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "@/assets/Logo.svg";
const MockChat = () => (
  <div
    className="rounded-2xl overflow-hidden"
    style={{
      backgroundColor: "rgba(255,248,236,0.05)",
      border: "1px solid rgba(255,248,236,0.09)",
    }}
  >
    {/* Chat header */}
    <div
      className="flex items-center gap-2.5 px-4 py-3"
      style={{ borderBottom: "1px solid rgba(255,248,236,0.07)" }}
    >
      <div
        className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "rgba(255,138,31,0.2)" }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF8A1F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
      <div>
        <p className="text-[11px] font-semibold leading-none" style={{ color: "rgba(255,248,236,0.85)" }}>
          research-2024.pdf
        </p>
        <p className="text-[9px] mt-0.5 leading-none" style={{ color: "rgba(255,248,236,0.3)" }}>
          148 pages · Indexed
        </p>
      </div>
      <div className="ml-auto flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#DFFF66" }} />
        <span className="text-[9px]" style={{ color: "rgba(255,248,236,0.35)" }}>Ready</span>
      </div>
    </div>

    {/* Messages */}
    <div className="px-4 py-3 space-y-3">
      {/* User bubble */}
      <div className="flex justify-end">
        <div
          className="px-3 py-2 rounded-2xl rounded-br-sm text-[11px] leading-relaxed max-w-[85%]"
          style={{ backgroundColor: "#FF8A1F", color: "#071533", fontWeight: 500 }}
        >
          Summarise the key findings in chapter 2
        </div>
      </div>

      {/* AI bubble */}
      <div className="flex items-start gap-2">
        <div
          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ backgroundColor: "#DFFF66" }}
        >
          <span className="text-[8px] font-bold" style={{ color: "#071533" }}>O</span>
        </div>
        <div
          className="px-3 py-2 rounded-2xl rounded-bl-sm text-[11px] leading-relaxed max-w-[85%]"
          style={{
            backgroundColor: "rgba(255,248,236,0.07)",
            color: "rgba(255,248,236,0.75)",
            border: "1px solid rgba(255,248,236,0.07)",
          }}
        >
          Chapter 2 identifies three core findings: 94% retrieval accuracy, sub-second query latency, and citation reliability across 500+ sources.
          <div className="mt-2">
            <span
              className="text-[9px] px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: "rgba(223,255,102,0.15)", color: "#DFFF66" }}
            >
              ↗ p.34 – Chapter 2
            </span>
          </div>
        </div>
      </div>

      {/* Typing indicator */}
      <div className="flex items-center gap-1.5 pl-7">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: "rgba(255,248,236,0.25)",
              animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

const AuthBranding = () => (
  <div
    className="hidden lg:flex flex-col relative overflow-hidden p-8 xl:p-10"
    style={{
      width: "45%",
      flexShrink: 0,
      backgroundColor: "#071533",
      backgroundImage: `
        radial-gradient(ellipse 80% 60% at 100% 0%, rgba(101,92,255,0.2) 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 0% 100%, rgba(255,138,31,0.1) 0%, transparent 55%)
      `,
    }}
  >
    {/* Decorative grid lines */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,248,236,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,248,236,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
    />

    {/* Top row: logo + back button */}
    <div className="relative z-10 flex items-center justify-between mb-auto">
      <div className="flex items-center gap-2.5">
       
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "transparent" }}
          aria-label="Orion AI logo"
        >
          <img src={Logo} alt="Orion AI Logo" className="h-8 w-auto" />
        </div>
        <span className="text-sm font-semibold tracking-tight" style={{ color: "#FFF8EC" }}>
          Orion AI
        </span>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200"
        style={{
          backgroundColor: "rgba(255,248,236,0.07)",
          color: "rgba(255,248,236,0.55)",
          border: "1px solid rgba(255,248,236,0.1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255,248,236,0.12)";
          e.currentTarget.style.color = "rgba(255,248,236,0.9)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255,248,236,0.07)";
          e.currentTarget.style.color = "rgba(255,248,236,0.55)";
        }}
      >
        <ArrowLeft size={11} />
        Back to website
      </Link>
    </div>

    {/* Center: headline + mock chat */}
    <div className="relative z-10 flex flex-col justify-center flex-1 py-8">
      <p
        className="text-[11px] font-semibold uppercase tracking-widest mb-3"
        style={{ color: "#FF8A1F" }}
      >
        Document Intelligence
      </p>
      <h2
        className="text-3xl xl:text-4xl font-bold tracking-tight leading-tight mb-3"
        style={{ color: "#FFF8EC" }}
      >
        Chat with your
        <br />
        <span style={{ color: "#FF8A1F" }}>documents,</span>
        <br />
        instantly.
      </h2>
      <p
        className="text-sm leading-relaxed mb-7"
        style={{ color: "rgba(255,248,236,0.45)", maxWidth: "320px" }}
      >
        Upload any PDF and get precise, sourced answers in seconds — powered by Gemini and Pinecone.
      </p>

      <MockChat />
    </div>

    {/* Bottom: tech badges */}
    <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-2">
      {["Gemini", "Pinecone", "RAG", "Semantic Search"].map((b) => (
        <span
          key={b}
          className="text-[10px] font-medium px-2.5 py-1 rounded-lg"
          style={{
            backgroundColor: "rgba(255,248,236,0.06)",
            color: "rgba(255,248,236,0.4)",
            border: "1px solid rgba(255,248,236,0.08)",
          }}
        >
          {b}
        </span>
      ))}
    </div>

    <style>{`
      @keyframes pulse {
        0%, 100% { opacity: 0.25; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
    `}</style>
  </div>
);

export default AuthBranding;
