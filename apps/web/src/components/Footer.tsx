import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-void)",
        borderTop: "1px solid rgba(126, 184, 232, 0.15)",
        padding: "var(--space-2xl) 0 var(--space-xl)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
        {/* Logo mark */}
        <div style={{ marginBottom: "var(--space-md)" }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ margin: "0 auto", display: "block" }}
          >
            <circle cx="200" cy="200" r="190" stroke="#7eb8e8" strokeWidth="2" opacity="0.5" />
            <circle cx="200" cy="200" r="110" stroke="#7eb8e8" strokeWidth="1.5" opacity="0.35" />
            <polygon
              points="200,90 295,255 105,255"
              stroke="#7eb8e8"
              strokeWidth="2"
              opacity="0.6"
              fill="none"
            />
            <polygon
              points="200,310 105,145 295,145"
              stroke="#7eb8e8"
              strokeWidth="2"
              opacity="0.6"
              fill="none"
            />
            <circle cx="200" cy="200" r="8" fill="#7eb8e8" opacity="0.8" />
          </svg>
        </div>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1rem",
            letterSpacing: "0.1em",
            color: "var(--silver-light)",
            marginBottom: "var(--space-sm)",
          }}
        >
          LiQUiD SOUND
        </p>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            color: "var(--silver-mid)",
            letterSpacing: "0.08em",
            marginBottom: "var(--space-xl)",
          }}
        >
          Sound. Frequency. Creation.
        </p>

        {/* Nav links */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "var(--space-xl)",
          }}
        >
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/media", label: "Media" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--silver-dim)",
                transition: "color 0.2s ease",
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Decorative divider */}
        <hr
          style={{
            border: "none",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(126, 184, 232, 0.3) 30%, rgba(126, 184, 232, 0.3) 70%, transparent)",
            maxWidth: "400px",
            margin: "0 auto var(--space-lg)",
          }}
        />

        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--silver-dim)",
            marginBottom: "var(--space-sm)",
          }}
        >
          © 2026 LiQUiD SOUND. All rights reserved.
        </p>

        {/* Binary string decoration */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--silver-dim)",
            opacity: 0.5,
            letterSpacing: "0.05em",
          }}
        >
          11111011110101001001101011110010
        </p>
      </div>
    </footer>
  );
}
