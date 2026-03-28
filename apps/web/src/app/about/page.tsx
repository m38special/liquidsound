const principles = [
  {
    title: "Celestial",
    body: "We draw from the eternal patterns of the cosmos — moon cycles, sacred geometry, and the frequencies that govern creation.",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 4 C10 4 4 10 4 18 C4 26 10 32 18 32 C26 32 32 26 32 18"
          stroke="#7eb8e8"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="28" cy="8" r="4" stroke="#d4b56a" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    title: "Resonance",
    body: "Sound is the foundational architecture of reality. We tune every piece to frequencies that resonate beyond the surface.",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="18" cy="18" r="14" stroke="#7eb8e8" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="8" stroke="#7eb8e8" strokeWidth="1" opacity="0.6" />
        <circle cx="18" cy="18" r="3" fill="#7eb8e8" />
      </svg>
    ),
  },
  {
    title: "Precision",
    body: "Sacred geometry is perfect by definition. Every design, every beat, every system we build reflects that same obsessive precision.",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="18,4 32,28 4,28" stroke="#7eb8e8" strokeWidth="1.5" fill="none" />
        <line x1="18" y1="4" x2="18" y2="28" stroke="#7eb8e8" strokeWidth="1" opacity="0.5" />
        <line x1="4" y1="28" x2="32" y2="28" stroke="#7eb8e8" strokeWidth="1" opacity="0.5" />
        <circle cx="18" cy="16" r="2" fill="#7eb8e8" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <main style={{ background: "var(--bg-void)", paddingTop: "64px" }}>
      {/* Hero Banner */}
      <section
        style={{
          height: "280px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/assets/metatron-cube.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "80%",
            opacity: 0.05,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(126,184,232,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.2rem, 3vw, 2.2rem)",
            letterSpacing: "0.15em",
            color: "var(--silver-light)",
            textShadow: "0 0 20px rgba(126,184,232,0.4)",
            position: "relative",
            zIndex: 1,
            marginBottom: "var(--space-md)",
          }}
        >
          A B O U T &nbsp; L i Q U i D &nbsp; S O U N D
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--silver-mid)",
            position: "relative",
            zIndex: 1,
            letterSpacing: "0.05em",
          }}
        >
          Sound. Frequency. Creation. All is connected.
        </p>
      </section>

      {/* Brand Story */}
      <section
        style={{
          padding: "var(--space-3xl) 0",
          borderTop: "1px solid rgba(126, 184, 232, 0.08)",
        }}
      >
        <div className="section-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--space-2xl)",
              alignItems: "center",
            }}
          >
            {/* Logo side */}
            <div style={{ textAlign: "center" }}>
              <svg
                width="180"
                height="180"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: "drop-shadow(0 0 40px rgba(126,184,232,0.3))",
                  margin: "0 auto",
                }}
              >
                <circle cx="200" cy="200" r="190" stroke="#7eb8e8" strokeWidth="2" opacity="0.6" />
                <circle
                  cx="200"
                  cy="200"
                  r="110"
                  stroke="#7eb8e8"
                  strokeWidth="1.5"
                  opacity="0.4"
                />
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
              {/* Decorative binary strip */}
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--silver-dim)",
                  opacity: 0.5,
                  marginTop: "var(--space-lg)",
                  letterSpacing: "0.12em",
                }}
              >
                1 1 1 1 0 1 1 0 1 0 1 1 0
              </p>
            </div>

            {/* Text side */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.1rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--silver-light)",
                  marginBottom: "var(--space-lg)",
                }}
              >
                The Vision
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--silver-mid)",
                  lineHeight: "1.9",
                  marginBottom: "var(--space-lg)",
                }}
              >
                LiQUiD SOUND was born from the intersection of ancient sacred knowledge and modern
                sonic architecture. We believe that sound is not merely entertainment — it is a
                fundamental force of the universe, a vibrational language that connects all things.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--silver-mid)",
                  lineHeight: "1.9",
                  marginBottom: "var(--space-lg)",
                }}
              >
                Our studio fuses the precision of sacred geometry with the power of digital
                technology. Each piece we create is designed to carry meaning beyond the surface —
                encoded with frequency, symbol, and intent.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--silver-mid)",
                  lineHeight: "1.9",
                }}
              >
                From TikTok content to automated distribution pipelines, everything we build
                reflects our core belief: that art, mathematics, and technology are not separate
                disciplines — they are three aspects of the same cosmic pattern.
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .about-story-grid { grid-template-columns: 1fr !important; }
            .about-story-grid > div:first-child { order: 2; }
          }
        `}</style>
      </section>

      {/* Principles Section */}
      <section
        style={{
          padding: "var(--space-3xl) 0",
          borderTop: "1px solid rgba(126, 184, 232, 0.08)",
        }}
      >
        <div className="section-container">
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--silver-mid)",
              textAlign: "center",
              marginBottom: "var(--space-2xl)",
            }}
          >
            Our Principles
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "var(--space-lg)",
            }}
          >
            {principles.map(({ title, body, icon }) => (
              <div
                key={title}
                style={{
                  background: "var(--bg-deep)",
                  border: "1px solid rgba(126, 184, 232, 0.15)",
                  padding: "var(--space-xl)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "var(--space-lg)",
                  }}
                >
                  {icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.85rem",
                    letterSpacing: "0.12em",
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
                    fontSize: "0.88rem",
                    color: "var(--silver-mid)",
                    lineHeight: "1.7",
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
