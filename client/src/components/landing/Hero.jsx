import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

const BADGES = [
  { label: "Gemini", pos: "top-[12%] left-[8%]", delay: "0s" },
  { label: "RAG", pos: "top-[18%] right-[10%]", delay: "0.4s" },
  { label: "Pinecone", pos: "bottom-[28%] left-[5%]", delay: "0.8s" },
  { label: "PDF", pos: "top-[55%] right-[6%]", delay: "1.2s" },
  { label: "Semantic Search", pos: "bottom-[18%] right-[12%]", delay: "0.6s" },
];

function FloatingBadge({ label, pos, delay }) {
  return (
    <div
      className={`absolute ${pos} hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium select-none`}
      style={{
        backgroundColor: "rgba(7,21,51,0.06)",
        border: "1px solid rgba(7,21,51,0.1)",
        color: "rgba(7,21,51,0.6)",
        animation: `floatBadge 4s ease-in-out infinite`,
        animationDelay: delay,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: "#FF8A1F" }}
      />
      {label}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,138,31,0.06) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(101,92,255,0.06) 0%, transparent 50%)`,
        }}
      />

      {/* Floating Badges */}
      {BADGES.map((b) => (
        <FloatingBadge key={b.label} {...b} />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-8"
          style={{
            backgroundColor: "rgba(223,255,102,0.3)",
            border: "1px solid rgba(223,255,102,0.6)",
            color: "#071533",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#071533" }}
          />
          Powered by Gemini &amp; Pinecone
        </div>

        {/* Headline */}
        <h1
          className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8"
          style={{ color: "#071533" }}
        >
          Your Documents.
          <br />
          <span style={{ color: "#FF8A1F" }}>Now Think.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12"
          style={{ color: "rgba(7,21,51,0.55)" }}
        >
          Upload any PDF and have a real conversation with it. Orion AI understands context, finds answers, and cites its sources.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
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
            Get Started
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: "transparent",
              color: "rgba(7,21,51,0.7)",
              border: "1px solid rgba(7,21,51,0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(7,21,51,0.35)";
              e.currentTarget.style.color = "#071533";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(7,21,51,0.15)";
              e.currentTarget.style.color = "rgba(7,21,51,0.7)";
            }}
          >
            <GithubIcon size={16} />
            View on GitHub
          </a>
        </div>

        {/* Social proof line */}
        <p className="mt-10 text-xs" style={{ color: "rgba(7,21,51,0.35)" }}>
          No credit card required &nbsp;·&nbsp; Free to start
        </p>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #FFF8EC)",
        }}
      />

      <style>{`
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
