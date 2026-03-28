const categories = ["All", "Video", "Audio", "Visual Art", "Live"];

const placeholderContent = [
  { id: 1, title: "Frequency Drop #001", tag: "Video", date: "Mar 28" },
  { id: 2, title: "Sacred Geometry Meditation", tag: "Audio", date: "Mar 28" },
  { id: 3, title: "Crystal Resonance", tag: "Video", date: "Mar 27" },
  { id: 4, title: "Metatron Transmission", tag: "Visual Art", date: "Mar 27" },
  { id: 5, title: "Void Frequencies", tag: "Audio", date: "Mar 26" },
  { id: 6, title: "Celestial Pulse #003", tag: "Video", date: "Mar 26" },
  { id: 7, title: "Binary Dream State", tag: "Visual Art", date: "Mar 25" },
  { id: 8, title: "Ice Architecture", tag: "Video", date: "Mar 25" },
];

export default function MediaPage() {
  return (
    <main style={{ background: "var(--bg-void)", paddingTop: "64px" }}>
      {/* Header */}
      <section
        style={{
          padding: "var(--space-3xl) 0 var(--space-xl)",
          textAlign: "center",
          borderBottom: "1px solid rgba(126, 184, 232, 0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(126,184,232,0.04) 0%, transparent 70%)",
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
            marginBottom: "var(--space-md)",
            position: "relative",
            zIndex: 1,
          }}
        >
          C O N T E N T &nbsp; C H A N N E L
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--silver-mid)",
            position: "relative",
            zIndex: 1,
          }}
        >
          Frequency drops every 4 hours. Stay tuned.
        </p>
      </section>

      {/* Filter Bar */}
      <div
        style={{
          borderBottom: "1px solid rgba(126, 184, 232, 0.1)",
          background: "rgba(5, 8, 16, 0.6)",
          position: "sticky",
          top: "64px",
          zIndex: 10,
        }}
      >
        <div
          className="section-container"
          style={{
            display: "flex",
            gap: "0",
            overflowX: "auto",
          }}
        >
          {categories.map((cat, i) => (
            <button
              key={cat}
              style={{
                padding: "16px 20px",
                background: "none",
                border: "none",
                borderBottom: i === 0 ? "2px solid var(--glow-primary)" : "2px solid transparent",
                color: i === 0 ? "var(--glow-primary)" : "var(--silver-mid)",
                fontFamily: "var(--font-heading)",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "color 0.2s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <section style={{ padding: "var(--space-2xl) 0" }}>
        <div className="section-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "var(--space-lg)",
            }}
          >
            {placeholderContent.map(({ id, title, tag, date }) => (
              <div
                key={id}
                style={{
                  background: "var(--bg-deep)",
                  border: "1px solid rgba(126, 184, 232, 0.15)",
                  cursor: "pointer",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {/* Thumbnail placeholder (9:16 aspect) */}
                <div
                  style={{
                    aspectRatio: "9/16",
                    background: `linear-gradient(135deg, rgba(126,184,232,0.05) 0%, rgba(5,8,16,1) 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Subtle geometry overlay */}
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 400 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ opacity: 0.15 }}
                  >
                    <circle cx="200" cy="200" r="190" stroke="#7eb8e8" strokeWidth="2" />
                    <polygon
                      points="200,90 295,255 105,255"
                      stroke="#7eb8e8"
                      strokeWidth="3"
                      fill="none"
                    />
                    <polygon
                      points="200,310 105,145 295,145"
                      stroke="#7eb8e8"
                      strokeWidth="3"
                      fill="none"
                    />
                    <circle cx="200" cy="200" r="12" fill="#7eb8e8" />
                  </svg>

                  {/* Play icon overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.2s ease",
                      background: "rgba(0,0,0,0.4)",
                    }}
                    className="thumb-overlay"
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="20" r="18" stroke="#7eb8e8" strokeWidth="1.5" />
                      <path d="M16 13 L30 20 L16 27 Z" fill="#7eb8e8" />
                    </svg>
                  </div>
                </div>

                {/* Meta */}
                <div style={{ padding: "var(--space-md)" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.8rem",
                      letterSpacing: "0.05em",
                      color: "var(--silver-light)",
                      marginBottom: "var(--space-sm)",
                      lineHeight: "1.4",
                    }}
                  >
                    {title}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "var(--space-sm)",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        border: "1px solid var(--glow-primary)",
                        color: "var(--glow-primary)",
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {tag}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: "var(--silver-dim)",
                      }}
                    >
                      {date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div style={{ textAlign: "center", marginTop: "var(--space-2xl)" }}>
            <button
              style={{
                padding: "12px 36px",
                border: "1px solid rgba(126, 184, 232, 0.3)",
                background: "transparent",
                color: "var(--silver-mid)",
                fontFamily: "var(--font-heading)",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Load More
            </button>
          </div>
        </div>
      </section>

      <style>{`
        div:hover > .thumb-overlay { opacity: 1 !important; }
      `}</style>
    </main>
  );
}
