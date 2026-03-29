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
          clipPath: "inset(200px 0 0 0)",
        }}
      >
        <Image
          src="/assets/mockup-888.jpg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          priority
        />
      </div>

      {/* Overlay gradient for readability */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.8) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Navigation */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Image
            src="/assets/brand-logo.jpg"
            alt="LiQUiD SOUND"
            width={40}
            height={40}
            style={{ borderRadius: "4px" }}
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              letterSpacing: "0.1em",
              color: "#e8eef5",
            }}
          >
            LiQUiD SOUND
          </span>
        </Link>
        <div style={{ display: "flex", gap: "32px" }}>
          {["Home", "About", "Media", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.85rem",
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.8)",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#7eb8e8")}
              onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
          padding: "120px 24px 80px",
          textAlign: "center",
        }}
      >
        {/* Brand Logo */}
        <div style={{ marginBottom: "40px" }}>
          <Image
            src="/assets/brand-logo.jpg"
            alt="LiQUiD SOUND"
            width={450}
            height={450}
            style={{
              filter: "drop-shadow(0 0 50px rgba(126,184,232,0.5))",
              borderRadius: "12px",
              maxWidth: "100%",
              height: "auto",
            }}
            priority
          />
        </div>

        {/* Main Headline */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            letterSpacing: "0.15em",
            color: "#ffffff",
            textShadow: "0 0 40px rgba(126,184,232,0.6)",
            marginBottom: "16px",
          }}
        >
          LiQUiD SOUND
        </h1>

        {/* Tagline */}
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(0.9rem, 2vw, 1.3rem)",
            letterSpacing: "0.25em",
            color: "#7eb8e8",
            marginBottom: "32px",
            textTransform: "uppercase",
          }}
        >
          Sound Design • Content Studio • Distribution
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
            color: "rgba(255,255,255,0.85)",
            maxWidth: "600px",
            marginBottom: "48px",
            lineHeight: 1.8,
          }}
        >
          A next-generation music and creative content studio operating at the intersection of sound
          design, sacred geometry, and digital art.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/contact"
            style={{
              padding: "16px 40px",
              background:
                "linear-gradient(135deg, rgba(126,184,232,0.2) 0%, rgba(126,184,232,0.1) 100%)",
              border: "1px solid #7eb8e8",
              borderRadius: "4px",
              color: "#7eb8e8",
              fontFamily: "var(--font-heading)",
              fontSize: "0.85rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 30px rgba(126,184,232,0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = "0 0 50px rgba(126,184,232,0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = "0 0 30px rgba(126,184,232,0.3)";
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
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "4px",
              color: "rgba(255,255,255,0.8)",
              fontFamily: "var(--font-heading)",
              fontSize: "0.85rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.color = "rgba(255,255,255,0.8)";
            }}
          >
            View Our Work
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em" }}
          >
            SCROLL
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, rgba(126,184,232,0.8), transparent)",
            }}
          />
        </div>
      </section>

      {/* Services Section */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          padding: "100px 24px",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              letterSpacing: "0.1em",
              color: "#7eb8e8",
              textAlign: "center",
              marginBottom: "60px",
            }}
          >
            Our Three Pillars
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
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
                  padding: "40px 32px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(126,184,232,0.15)",
                  borderRadius: "8px",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "rgba(126,184,232,0.4)";
                  e.currentTarget.style.background = "rgba(126,184,232,0.05)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "rgba(126,184,232,0.15)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    letterSpacing: "0.1em",
                    color: "#ffffff",
                    marginBottom: "16px",
                  }}
                >
                  {service.title}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    color: "rgba(255,255,255,0.7)",
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
          padding: "60px 24px",
          background: "rgba(0,0,0,0.8)",
          borderTop: "1px solid rgba(126,184,232,0.1)",
          borderBottom: "1px solid rgba(126,184,232,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "40px",
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
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  color: "#7eb8e8",
                  marginBottom: "8px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.5)",
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
          padding: "120px 24px",
          textAlign: "center",
          background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            color: "#ffffff",
            marginBottom: "24px",
          }}
        >
          Ready to Create?
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "rgba(255,255,255,0.7)",
            maxWidth: "500px",
            margin: "0 auto 40px",
          }}
        >
          Join us in building the future of sound and content.
        </p>
        <Link
          href="/contact"
          style={{
            padding: "18px 50px",
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
      </section>

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 10,
          padding: "40px 24px",
          background: "rgba(0,0,0,0.9)",
          borderTop: "1px solid rgba(126,184,232,0.1)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
          }}
        >
          © 2026 LiQUiD SOUND — All Rights Reserved
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.2)",
            marginTop: "12px",
            letterSpacing: "0.15em",
          }}
        >
          1 1 1 1 1 0 1 1 1 1 0 1 0 0 1
        </div>
      </footer>
    </main>
  );
}
