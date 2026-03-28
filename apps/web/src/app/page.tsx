import Link from "next/link";

const pillars = [
  {
    title: "Sound Design",
    description:
      "Original beats, frequencies, and sonic signatures crafted at the intersection of ancient knowledge and modern architecture.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="18" stroke="#7eb8e8" strokeWidth="1.5" />
        <path
          d="M12 20 Q16 12 20 20 Q24 28 28 20"
          stroke="#7eb8e8"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="2" fill="#7eb8e8" />
      </svg>
    ),
  },
  {
    title: "Content Studio",
    description:
      "TikTok slides, visual narratives, and scripted media — every piece a ritualistic transmission of sound and light.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="6" y="8" width="28" height="22" rx="2" stroke="#7eb8e8" strokeWidth="1.5" />
        <path
          d="M16 14 L28 20 L16 26 Z"
          stroke="#7eb8e8"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Distribution",
    description:
      "Multi-platform automated pipeline — delivering frequencies to the world every 4 hours without pause.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="20" r="4" stroke="#7eb8e8" strokeWidth="1.5" />
        <circle cx="32" cy="10" r="4" stroke="#7eb8e8" strokeWidth="1.5" />
        <circle cx="32" cy="30" r="4" stroke="#7eb8e8" strokeWidth="1.5" />
        <line x1="12" y1="18" x2="28" y2="12" stroke="#7eb8e8" strokeWidth="1.5" />
        <line x1="12" y1="22" x2="28" y2="28" stroke="#7eb8e8" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <main style={{ background: "var(--bg-void)" }}>
      {/* Hero Section */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: "64px",
        }}
      >
        {/* Radial glow background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(126,184,232,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Sacred geometry watermark */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/assets/metatron-cube.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "60%",
            opacity: 0.03,
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          style={{
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            padding: "0 24px",
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              marginBottom: "var(--space-xl)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <svg
              width="140"
              height="140"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: "drop-shadow(0 0 30px rgba(126,184,232,0.4))" }}
            >
              <circle cx="200" cy="200" r="190" stroke="#7eb8e8" strokeWidth="2" opacity="0.6" />
              <circle cx="200" cy="200" r="110" stroke="#7eb8e8" strokeWidth="1.5" opacity="0.4" />
              <circle cx="200" cy="90" r="110" stroke="#7eb8e8" strokeWidth="1" opacity="0.2" />
              <circle cx="200" cy="310" r="110" stroke="#7eb8e8" strokeWidth="1" opacity="0.2" />
              <circle cx="105" cy="145" r="110" stroke="#7eb8e8" strokeWidth="1" opacity="0.2" />
              <circle cx="295" cy="145" r="110" stroke="#7eb8e8" strokeWidth="1" opacity="0.2" />
              <circle cx="105" cy="255" r="110" stroke="#7eb8e8" strokeWidth="1" opacity="0.2" />
              <circle cx="295" cy="255" r="110" stroke="#7eb8e8" strokeWidth="1" opacity="0.2" />
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
              <polygon
                points="200,90 295,145 295,255 200,310 105,255 105,145"
                stroke="#7eb8e8"
                strokeWidth="1.5"
                opacity="0.5"
                fill="none"
              />
              <circle cx="200" cy="200" r="10" fill="#7eb8e8" opacity="0.9" />
            </svg>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 4vw, 2.8rem)",
              letterSpacing: "0.15em",
              color: "var(--silver-light)",
              textShadow: "0 0 20px rgba(126,184,232,0.5), 0 0 60px rgba(126,184,232,0.2)",
              marginBottom: "var(--space-md)",
            }}
          >
            S O U N D &nbsp;·&nbsp; F R E Q U E N C Y
          </h1>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1rem, 3vw, 2rem)",
              letterSpacing: "0.15em",
              color: "var(--silver-mid)",
              marginBottom: "var(--space-lg)",
              fontWeight: 400,
            }}
          >
            C R E A T I O N
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "var(--silver-mid)",
              maxWidth: "480px",
              margin: "0 auto var(--space-xl)",
              letterSpacing: "0.03em",
            }}
          >
            A next-generation music and creative content studio operating at the intersection of
            sound design, sacred geometry, and digital art.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: "var(--space-md)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/contact"
              style={{
                padding: "12px 28px",
                border: "1px solid var(--glow-primary)",
                background: "rgba(126, 184, 232, 0.08)",
                color: "var(--glow-bright)",
                fontFamily: "var(--font-heading)",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "inline-block",
              }}
            >
              Enter the Frequency
            </Link>
            <Link
              href="/media"
              style={{
                padding: "12px 28px",
                border: "1px solid rgba(126, 184, 232, 0.3)",
                background: "transparent",
                color: "var(--silver-mid)",
                fontFamily: "var(--font-heading)",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "inline-block",
              }}
            >
              Our Work ↓
            </Link>
          </div>

          {/* Decorative binary */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--silver-dim)",
              opacity: 0.5,
              marginTop: "var(--space-2xl)",
              letterSpacing: "0.15em",
            }}
          >
            1 1 1 1 1 0 1 1 1 1 0 1 0 0 1
          </p>
        </div>
      </section>

      {/* What We Do Strip */}
      <section
        style={{
          padding: "var(--space-2xl) 0",
          borderTop: "1px solid rgba(126, 184, 232, 0.08)",
          borderBottom: "1px solid rgba(126, 184, 232, 0.08)",
        }}
      >
        <div className="section-container" style={{ textAlign: "center" }}>
          <hr
            style={{
              border: "none",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(126, 184, 232, 0.3) 30%, rgba(126, 184, 232, 0.3) 70%, transparent)",
              marginBottom: "var(--space-xl)",
            }}
          />
          <p
            style={{
              maxWidth: "720px",
              margin: "0 auto",
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              color: "var(--silver-mid)",
              lineHeight: "1.9",
            }}
          >
            LiQUiD SOUND is a next-generation music and creative content studio operating at the
            intersection of sound design, sacred geometry, and digital art.
          </p>
          <hr
            style={{
              border: "none",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(126, 184, 232, 0.3) 30%, rgba(126, 184, 232, 0.3) 70%, transparent)",
              marginTop: "var(--space-xl)",
            }}
          />
        </div>
      </section>

      {/* Pillars Section */}
      <section style={{ padding: "var(--space-3xl) 0" }}>
        <div className="section-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-lg)",
            }}
          >
            {pillars.map(({ title, description, icon }) => (
              <div
                key={title}
                style={{
                  background: "var(--bg-deep)",
                  border: "1px solid rgba(126, 184, 232, 0.15)",
                  padding: "var(--space-xl)",
                }}
              >
                <div style={{ marginBottom: "var(--space-lg)" }}>{icon}</div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.9rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--silver-light)",
                    marginBottom: "var(--space-md)",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    color: "var(--silver-mid)",
                    lineHeight: "1.7",
                  }}
                >
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section
        style={{
          padding: "var(--space-3xl) 0",
          textAlign: "center",
          borderTop: "1px solid rgba(126, 184, 232, 0.08)",
        }}
      >
        <div className="section-container">
          <hr
            style={{
              border: "none",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(126, 184, 232, 0.3) 30%, rgba(126, 184, 232, 0.3) 70%, transparent)",
              marginBottom: "var(--space-xl)",
            }}
          />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.2rem, 3vw, 2rem)",
              letterSpacing: "0.12em",
              color: "var(--silver-light)",
              textShadow: "0 0 15px rgba(126,184,232,0.4)",
              marginBottom: "var(--space-md)",
            }}
          >
            Step Into The Frequency
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--silver-mid)",
              marginBottom: "var(--space-xl)",
            }}
          >
            Join the LiQUiD SOUND inner circle.
          </p>
          <Link
            href="/contact"
            style={{
              padding: "14px 36px",
              border: "1px solid var(--glow-primary)",
              background: "rgba(126, 184, 232, 0.08)",
              color: "var(--glow-bright)",
              fontFamily: "var(--font-heading)",
              fontSize: "0.85rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "inline-block",
            }}
          >
            Contact Us
          </Link>
          <hr
            style={{
              border: "none",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(126, 184, 232, 0.3) 30%, rgba(126, 184, 232, 0.3) 70%, transparent)",
              marginTop: "var(--space-xl)",
            }}
          />
        </div>
      </section>
    </main>
  );
}
