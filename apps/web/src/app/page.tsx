"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main style={{ background: "var(--bg-void)" }}>
      {/* Hero Section - Full viewport with logo as centerpiece */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated gradient background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse 100% 80% at 50% 120%, rgba(126,184,232,0.12) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 50% 0%, rgba(126,184,232,0.08) 0%, transparent 50%),
              linear-gradient(180deg, #000000 0%, #050810 50%, #0a0f1e 100%)
            `,
            pointerEvents: "none",
          }}
        />

        {/* Floating particles effect - simulated with CSS */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              radial-gradient(2px 2px at 20% 30%, rgba(126,184,232,0.3) 0%, transparent 100%),
              radial-gradient(2px 2px at 40% 70%, rgba(126,184,232,0.2) 0%, transparent 100%),
              radial-gradient(1px 1px at 60% 20%, rgba(126,184,232,0.4) 0%, transparent 100%),
              radial-gradient(2px 2px at 80% 50%, rgba(126,184,232,0.25) 0%, transparent 100%),
              radial-gradient(1px 1px at 10% 80%, rgba(126,184,232,0.3) 0%, transparent 100%),
              radial-gradient(2px 2px at 90% 10%, rgba(126,184,232,0.2) 0%, transparent 100%)
            `,
            pointerEvents: "none",
            animation: "twinkle 8s ease-in-out infinite",
          }}
        />

        {/* Main content */}
        <div
          style={{
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            padding: "40px 24px",
            maxWidth: "900px",
          }}
        >
          {/* Brand Logo - Large centered */}
          <div
            style={{
              marginBottom: "var(--space-2xl)",
              display: "flex",
              justifyContent: "center",
              animation: "float 6s ease-in-out infinite",
            }}
          >
            <Image
              src="/assets/brand-logo.jpg"
              alt="LiQUiD SOUND"
              width={400}
              height={400}
              style={{
                filter: "drop-shadow(0 0 60px rgba(126,184,232,0.5))",
                borderRadius: "12px",
                maxWidth: "100%",
                height: "auto",
              }}
              priority
            />
          </div>

          {/* Tagline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
              letterSpacing: "0.2em",
              color: "#e8eef5",
              textShadow: "0 0 30px rgba(126,184,232,0.6), 0 0 80px rgba(126,184,232,0.3)",
              marginBottom: "var(--space-lg)",
              lineHeight: 1.3,
            }}
          >
            LiQUiD SOUND
          </h1>

          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(0.9rem, 2vw, 1.4rem)",
              letterSpacing: "0.3em",
              color: "#7eb8e8",
              marginBottom: "var(--space-xl)",
              fontWeight: 400,
              textTransform: "uppercase",
            }}
          >
            Sound Design • Content Studio • Distribution
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
              color: "#9fb0c4",
              maxWidth: "600px",
              margin: "0 auto var(--space-2xl)",
              lineHeight: 1.8,
            }}
          >
            A next-generation music and creative content studio operating at the intersection of
            sound design, sacred geometry, and digital art.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: "var(--space-lg)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/contact"
              style={{
                padding: "16px 40px",
                background:
                  "linear-gradient(135deg, rgba(126,184,232,0.15) 0%, rgba(126,184,232,0.05) 100%)",
                border: "1px solid rgba(126,184,232,0.5)",
                borderRadius: "4px",
                color: "#7eb8e8",
                fontFamily: "var(--font-heading)",
                fontSize: "0.85rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                display: "inline-block",
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 30px rgba(126,184,232,0.2)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = "0 0 50px rgba(126,184,232,0.4)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "0 0 30px rgba(126,184,232,0.2)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Enter the Frequency
            </Link>
            <Link
              href="/media"
              style={{
                padding: "16px 40px",
                background: "transparent",
                border: "1px solid rgba(126,184,232,0.2)",
                borderRadius: "4px",
                color: "#9fb0c4",
                fontFamily: "var(--font-heading)",
                fontSize: "0.85rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                display: "inline-block",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "rgba(126,184,232,0.5)";
                e.currentTarget.style.color = "#7eb8e8";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "rgba(126,184,232,0.2)";
                e.currentTarget.style.color = "#9fb0c4";
              }}
            >
              View Our Work
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            animation: "float 3s ease-in-out infinite",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "60px",
              background: "linear-gradient(to bottom, rgba(126,184,232,0.5), transparent)",
            }}
          />
        </div>
      </section>

      {/* Services Section - Three pillars */}
      <section
        style={{
          padding: "var(--space-3xl) 24px",
          position: "relative",
          background: "linear-gradient(180deg, #0a0f1e 0%, #050810 100%)",
        }}
      >
        {/* Gradient glow from below */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: "200px",
            background:
              "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(126,184,232,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.2rem, 3vw, 2rem)",
                letterSpacing: "0.15em",
                color: "#7eb8e8",
                marginBottom: "var(--space-md)",
              }}
            >
              Our Three Pillars
            </h3>
            <div
              style={{
                width: "100px",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(126,184,232,0.5), transparent)",
                margin: "0 auto",
              }}
            />
          </div>

          {/* Three pillars grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-xl)",
            }}
          >
            {[
              {
                title: "Sound Design",
                desc: "Original beats, frequencies, and sonic signatures crafted at the intersection of ancient knowledge and modern architecture.",
              },
              {
                title: "Content Studio",
                desc: "TikTok slides, visual narratives, and scripted media — every piece a ritualistic transmission of sound and light.",
              },
              {
                title: "Distribution",
                desc: "Multi-platform automated pipeline — delivering frequencies to the world every 4 hours without pause.",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                style={{
                  padding: "var(--space-xl)",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(126,184,232,0.1)",
                  borderRadius: "8px",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "rgba(126,184,232,0.3)";
                  e.currentTarget.style.background = "rgba(126,184,232,0.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "rgba(126,184,232,0.1)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    letterSpacing: "0.1em",
                    color: "#e8eef5",
                    marginBottom: "var(--space-md)",
                  }}
                >
                  {pillar.title}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    color: "#9fb0c4",
                    lineHeight: 1.7,
                  }}
                >
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section
        style={{
          padding: "var(--space-2xl) 24px",
          background: "rgba(5,8,16,0.8)",
          borderTop: "1px solid rgba(126,184,232,0.1)",
          borderBottom: "1px solid rgba(126,184,232,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "var(--space-xl)",
          }}
        >
          {[
            { label: "Content Pieces", value: "500+" },
            { label: "Hours of Audio", value: "1,200+" },
            { label: "Platforms", value: "8" },
            { label: "Uploads", value: "Daily" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                  color: "#7eb8e8",
                  marginBottom: "var(--space-xs)",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  color: "#4a5a6e",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "var(--space-3xl) 24px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 50% 50% at 50% 100%, rgba(126,184,232,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              color: "#e8eef5",
              marginBottom: "var(--space-lg)",
            }}
          >
            Ready to Create?
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "#9fb0c4",
              maxWidth: "500px",
              margin: "0 auto var(--space-xl)",
            }}
          >
            Join us in building the future of sound and content.
          </p>
          <Link
            href="/contact"
            style={{
              padding: "16px 48px",
              background: "transparent",
              border: "1px solid #7eb8e8",
              borderRadius: "4px",
              color: "#7eb8e8",
              fontFamily: "var(--font-heading)",
              fontSize: "0.9rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "inline-block",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(126,184,232,0.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
