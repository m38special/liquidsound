"use client";

import { useState } from "react";

const socialLinks = [
  {
    label: "TikTok",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.28 8.28 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z"
          stroke="#9fb0c4"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="#9fb0c4" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" stroke="#9fb0c4" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="#9fb0c4" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="5" width="20" height="14" rx="3" stroke="#9fb0c4" strokeWidth="1.5" />
        <path
          d="M10 9 L16 12 L10 15 Z"
          stroke="#9fb0c4"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "SoundCloud",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 13.5 C2 11.5 3.5 10 5.5 10 C5.7 10 5.9 10 6.1 10.05 C6.4 7.8 8.5 6 11 6 C13.8 6 16 8.2 16 11 L16 11.5 C17.9 11.8 19.5 13.4 19.5 15.5 C19.5 17.7 17.7 19.5 15.5 19.5 L6 19.5 C3.8 19.5 2 17.7 2 15.5 Z"
          stroke="#9fb0c4"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

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
          C O N T A C T
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--silver-mid)",
            position: "relative",
            zIndex: 1,
          }}
        >
          Enter the frequency. Reach out.
        </p>
      </section>

      {/* Contact Form + Info */}
      <section style={{ padding: "var(--space-3xl) 0" }}>
        <div className="section-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "var(--space-3xl)",
              alignItems: "start",
            }}
          >
            {/* Form */}
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-lg)",
                  maxWidth: "500px",
                  width: "100%",
                }}
              >
                {/* Name */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--silver-mid)",
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      background: "rgba(10, 15, 30, 0.8)",
                      border: "1px solid rgba(126, 184, 232, 0.2)",
                      color: "var(--silver-light)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(126, 184, 232, 0.7)";
                      e.currentTarget.style.boxShadow = "0 0 12px rgba(126,184,232,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(126, 184, 232, 0.2)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--silver-mid)",
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      background: "rgba(10, 15, 30, 0.8)",
                      border: "1px solid rgba(126, 184, 232, 0.2)",
                      color: "var(--silver-light)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(126, 184, 232, 0.7)";
                      e.currentTarget.style.boxShadow = "0 0 12px rgba(126,184,232,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(126, 184, 232, 0.2)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--silver-mid)",
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      background: "rgba(10, 15, 30, 0.8)",
                      border: "1px solid rgba(126, 184, 232, 0.2)",
                      color: "var(--silver-light)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      outline: "none",
                      resize: "vertical",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(126, 184, 232, 0.7)";
                      e.currentTarget.style.boxShadow = "0 0 12px rgba(126,184,232,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(126, 184, 232, 0.2)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: "14px 28px",
                    border: "1px solid var(--glow-primary)",
                    background: "rgba(126, 184, 232, 0.08)",
                    color: "var(--glow-bright)",
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.85rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    alignSelf: "flex-start",
                    transition: "background 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(126, 184, 232, 0.18)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(126,184,232,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(126, 184, 232, 0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Transmit Message →
                </button>
              </form>
            ) : (
              <div
                style={{
                  background: "var(--bg-deep)",
                  border: "1px solid rgba(126, 184, 232, 0.3)",
                  padding: "var(--space-2xl)",
                  textAlign: "center",
                  maxWidth: "500px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    letterSpacing: "0.1em",
                    color: "var(--glow-bright)",
                    textShadow: "0 0 15px rgba(126,184,232,0.5)",
                    marginBottom: "var(--space-md)",
                  }}
                >
                  Transmission Received
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--silver-mid)",
                  }}
                >
                  Your signal has entered the frequency. We will respond shortly.
                </p>
              </div>
            )}

            {/* Info panel */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--space-lg)",
                minWidth: "160px",
              }}
            >
              {/* Logo mark */}
              <svg
                width="80"
                height="80"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ filter: "drop-shadow(0 0 20px rgba(126,184,232,0.3))" }}
              >
                <circle cx="200" cy="200" r="190" stroke="#7eb8e8" strokeWidth="2" opacity="0.5" />
                <polygon
                  points="200,90 295,255 105,255"
                  stroke="#7eb8e8"
                  strokeWidth="3"
                  opacity="0.6"
                  fill="none"
                />
                <polygon
                  points="200,310 105,145 295,145"
                  stroke="#7eb8e8"
                  strokeWidth="3"
                  opacity="0.6"
                  fill="none"
                />
                <circle cx="200" cy="200" r="10" fill="#7eb8e8" opacity="0.9" />
              </svg>

              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.85rem",
                    letterSpacing: "0.1em",
                    color: "var(--silver-light)",
                    marginBottom: "var(--space-xs)",
                  }}
                >
                  LiQUiD SOUND
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    color: "var(--silver-dim)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Sound. Frequency. Creation.
                </p>
              </div>

              <hr
                style={{
                  border: "none",
                  height: "1px",
                  background: "rgba(126, 184, 232, 0.2)",
                  width: "100%",
                }}
              />

              {/* Social icons */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-md)",
                  alignItems: "center",
                }}
              >
                {socialLinks.map(({ label, icon }) => (
                  <div
                    key={label}
                    title={label}
                    style={{
                      cursor: "pointer",
                      opacity: 0.7,
                      transition: "opacity 0.2s ease, filter 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.opacity = "1";
                      el.style.filter = "drop-shadow(0 0 6px rgba(126,184,232,0.6))";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.opacity = "0.7";
                      el.style.filter = "none";
                    }}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .contact-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </main>
  );
}
