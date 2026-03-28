"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(5, 8, 16, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(126, 184, 232, 0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 40px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <svg
              width="36"
              height="36"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0 }}
            >
              <circle cx="200" cy="200" r="190" stroke="#7eb8e8" strokeWidth="2" opacity="0.6" />
              <circle cx="200" cy="200" r="110" stroke="#7eb8e8" strokeWidth="1.5" opacity="0.4" />
              <polygon
                points="200,90 295,255 105,255"
                stroke="#7eb8e8"
                strokeWidth="2"
                opacity="0.7"
                fill="none"
              />
              <polygon
                points="200,310 105,145 295,145"
                stroke="#7eb8e8"
                strokeWidth="2"
                opacity="0.7"
                fill="none"
              />
              <circle cx="200" cy="200" r="8" fill="#7eb8e8" opacity="0.9" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                letterSpacing: "0.15em",
                color: "var(--silver-light)",
              }}
            >
              LiQUiD SOUND
            </span>
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", gap: "32px" }} className="nav-links-desktop">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: pathname === href ? "var(--glow-primary)" : "var(--silver-mid)",
                  borderBottom:
                    pathname === href ? "1px solid var(--glow-primary)" : "1px solid transparent",
                  paddingBottom: "2px",
                  transition: "color 0.2s ease, border-color 0.2s ease, text-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "var(--glow-primary)";
                  el.style.textShadow = "0 0 8px rgba(126,184,232,0.6)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = pathname === href ? "var(--glow-primary)" : "var(--silver-mid)";
                  el.style.textShadow = "none";
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-hamburger"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "none",
              flexDirection: "column",
              gap: "5px",
              padding: "4px",
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  background: "var(--glow-primary)",
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
          }}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.5rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: pathname === href ? "var(--glow-primary)" : "var(--silver-light)",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
