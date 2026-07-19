import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import useAuth from "@/hooks/useAuth";

export default function CTA() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          className="relative rounded-3xl px-10 py-20 md:px-20 overflow-hidden"
          style={{ backgroundColor: "#071533" }}
        >
          {/* Subtle background accents */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(101,92,255,0.2) 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,138,31,0.15) 0%, transparent 70%)",
              transform: "translate(-30%, 30%)",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div className="max-w-lg">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "rgba(223,255,102,0.8)" }}
              >
                Get Started Today
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
                style={{ color: "#FFF8EC" }}
              >
                Ready to chat with your documents?
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              {!isAuthenticated ? (
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{ backgroundColor: "#FF8A1F", color: "#071533" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#DFFF66";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF8A1F";
                  }}
                >
                  Get Started
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{ backgroundColor: "#FF8A1F", color: "#071533" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#DFFF66";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF8A1F";
                  }}
                >
                  Go to Dashboard
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              )}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: "transparent",
                  color: "rgba(255,248,236,0.6)",
                  border: "1px solid rgba(255,248,236,0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#FFF8EC";
                  e.currentTarget.style.borderColor = "rgba(255,248,236,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,248,236,0.6)";
                  e.currentTarget.style.borderColor = "rgba(255,248,236,0.15)";
                }}
              >
                View Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
