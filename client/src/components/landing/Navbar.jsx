import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Logo from "@/assets/Logo.svg";
const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const { isAuthenticated } = useAuth();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(255,248,236,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(7,21,51,0.08)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "transparent" }}
          >
            <span className="text-xs font-bold"><img src={Logo} alt="Orion AI Logo" className="h-8 w-auto" /></span>
          </div>
          <span className="font-semibold text-sm tracking-tight" style={{ color: "#071533" }}>
            Orion AI
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleAnchor(e, link.href)}
              className="text-sm transition-colors duration-200"
              style={{ color: "rgba(7,21,51,0.6)" }}
              onMouseEnter={(e) => (e.target.style.color = "#071533")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(7,21,51,0.6)")}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-sm transition-colors duration-200 px-4 py-2 rounded-lg"
                style={{ color: "rgba(7,21,51,0.6)" }}
                onMouseEnter={(e) => (e.target.style.color = "#071533")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(7,21,51,0.6)")}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
                style={{ backgroundColor: "#071533", color: "#FFF8EC" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#FF8A1F";
                  e.target.style.color = "#071533";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#071533";
                  e.target.style.color = "#FFF8EC";
                }}
              >
                Get Started
              </Link>
            </>
          ) : (
            <Link
              to="/dashboard"
              className="text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
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
              Dashboard
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-0.5 transition-all duration-200"
            style={{
              backgroundColor: "#071533",
              transform: menuOpen ? "rotate(45deg) translate(2px, 4px)" : "none",
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-200"
            style={{
              backgroundColor: "#071533",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-0.5 transition-all duration-200"
            style={{
              backgroundColor: "#071533",
              transform: menuOpen ? "rotate(-45deg) translate(2px, -4px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ backgroundColor: "rgba(255,248,236,0.97)", borderTop: "1px solid rgba(7,21,51,0.08)" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleAnchor(e, link.href)}
              className="text-sm"
              style={{ color: "rgba(7,21,51,0.7)" }}
            >
              {link.label}
            </a>
          ))}
          <hr style={{ borderColor: "rgba(7,21,51,0.08)" }} />
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-sm" style={{ color: "rgba(7,21,51,0.7)" }}>
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium px-4 py-2 rounded-lg text-center"
                style={{ backgroundColor: "#071533", color: "#FFF8EC" }}
              >
                Get Started
              </Link>
            </>
          ) : (
            <Link
              to="/dashboard"
              className="text-sm font-medium px-4 py-2 rounded-lg text-center"
              style={{ backgroundColor: "#071533", color: "#FFF8EC" }}
            >
              Dashboard
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
