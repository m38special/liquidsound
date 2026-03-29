"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main style={{ background: "#000000" }}>
      {/* Full page mockup background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Image
          src="/assets/mockup-bg.png"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          priority
        />
      </div>

      {/* Overlay gradient for readability - stronger */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Navigation - clean and minimal */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "28px 60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "transparent",
        }}
      >
        <div style={{ display: "flex", gap: "48px" }}>
          {[
            { label: "HOME", href: "/" },
            { label: "ABOUT", href: "/about" },
            { label: "MEDIA", href: "/media" },
            { label: "CONTACT", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.8rem",
                letterSpacing: "0.3em",
                color: "#ffffff",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
                textDecoration: "none",
                textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#7eb8e8";
                e.currentTarget.style.textShadow =
                  "0 0 15px rgba(126,184,232,0.8), 0 2px 10px rgba(0,0,0,0.8)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.textShadow = "0 2px 10px rgba(0,0,0,0.8)";
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Hero Section - Centered content over background */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
          padding: "550px 24px 80px",
          textAlign: "center",
        }}
      >
        {/* Tagline */}
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(0.8rem, 1.5vw, 1.1rem)",
            letterSpacing: "0.4em",
            color: "#7eb8e8",
            marginBottom: "40px",
            textTransform: "uppercase",
            textShadow: "0 2px 15px rgba(0,0,0,0.9)",
          }}
        >
          Sound Design • Content Studio • Distribution
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
            color: "rgba(255,255,255,0.9)",
            maxWidth: "550px",
            marginBottom: "50px",
            lineHeight: 1.9,
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          A next-generation music and creative content studio operating at the intersection of sound
          design, sacred geometry, and digital art.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/contact"
            style={{
              padding: "14px 36px",
              background: "rgba(126,184,232,0.1)",
              border: "1px solid #7eb8e8",
              borderRadius: "2px",
              color: "#7eb8e8",
              fontFamily: "var(--font-heading)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 20px rgba(126,184,232,0.2)",
              transition: "all 0.3s ease",
              textDecoration: "none",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = "0 0 40px rgba(126,184,232,0.4)";
              e.currentTarget.style.background = "rgba(126,184,232,0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = "0 0 20px rgba(126,184,232,0.2)";
              e.currentTarget.style.background = "rgba(126,184,232,0.1)";
            }}
          >
            Enter the Frequency
          </Link>
          <Link
            href="/media"
            style={{
              padding: "14px 36px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "2px",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "var(--font-heading)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
              textDecoration: "none",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}
          >
            View Our Work
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          padding: "80px 24px",
          background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
              letterSpacing: "0.15em",
              color: "#7eb8e8",
              textAlign: "center",
              marginBottom: "50px",
            }}
          >
            Our Three Pillars
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
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
            ].map((service, i) => (
              <div
                key={i}
                style={{
                  padding: "32px 28px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(126,184,232,0.1)",
                  borderRadius: "4px",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "rgba(126,184,232,0.3)";
                  e.currentTarget.style.background = "rgba(126,184,232,0.03)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "rgba(126,184,232,0.1)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    letterSpacing: "0.1em",
                    color: "#ffffff",
                    marginBottom: "14px",
                  }}
                >
                  {service.title}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.8,
                  }}
                >
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          padding: "50px 24px",
          background: "rgba(0,0,0,0.8)",
          borderTop: "1px solid rgba(126,184,232,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "30px",
          }}
        >
          {[
            { label: "Content Pieces", value: "500+" },
            { label: "Hours of Audio", value: "1,200+" },
            { label: "Platforms", value: "8" },
            { label: "Upload Cadence", value: "Daily" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  color: "#7eb8e8",
                  marginBottom: "6px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.4)",
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
          position: "relative",
          zIndex: 10,
          padding: "100px 24px",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            color: "#ffffff",
            marginBottom: "20px",
          }}
        >
          Ready to Create?
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.6)",
            maxWidth: "450px",
            margin: "0 auto 35px",
          }}
        >
          Join us in building the future of sound and content.
        </p>
        <Link
          href="/contact"
          style={{
            padding: "16px 45px",
            background: "transparent",
            border: "1px solid #7eb8e8",
            borderRadius: "2px",
            color: "#7eb8e8",
            fontFamily: "var(--font-heading)",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            display: "inline-block",
            transition: "all 0.3s ease",
            textDecoration: "none",
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
      </section>

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 10,
          padding: "30px 24px",
          background: "rgba(0,0,0,0.9)",
          borderTop: "1px solid rgba(126,184,232,0.1)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.1em",
          }}
        >
          © 2026 LiQUiD SOUND — All Rights Reserved
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.15)",
            marginTop: "10px",
            letterSpacing: "0.2em",
          }}
        >
          1 1 1 1 1 0 1 1 1 1 0 1 0 0 1
        </div>
      </footer>
    </main>
  );
}
