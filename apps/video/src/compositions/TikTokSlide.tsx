import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TikTokSlideData } from "@liquid-sound/types";

export interface TikTokSlideProps {
  slides: TikTokSlideData[];
  hashtags?: string[];
  cta?: string;
  brandName?: string;
}

// LiQUiD SOUND brand palette — dark celestial aesthetic
const BRAND = {
  bg: "#000000",
  bgGradient: "linear-gradient(180deg, #050510 0%, #0a0a1f 50%, #050510 100%)",
  silver: "#C0C8D8",
  silverBlue: "#8BAFD4",
  glow: "#4A7FB5",
  glowDim: "#1E3A5F",
  white: "#FFFFFF",
  subtitleBg: "rgba(0, 0, 0, 0.72)",
};

// Particle positions for the celestial background (deterministic)
const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  x: (i * 137.508) % 100,
  y: (i * 97.3) % 100,
  size: 1 + ((i * 3) % 3),
  opacity: 0.2 + ((i * 0.17) % 0.5),
}));

function CelestialBackground({ frame }: { frame: number }) {
  const slowPulse = Math.sin(frame / 80) * 0.12 + 0.88;
  const orbitAngle = (frame / 300) * Math.PI * 2;

  return (
    <AbsoluteFill style={{ background: BRAND.bgGradient }}>
      {/* Outer glow ring */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 900,
          height: 900,
          borderRadius: "50%",
          transform: `translate(-50%, -50%) scale(${slowPulse})`,
          background: `radial-gradient(circle, ${BRAND.glowDim}44 0%, transparent 65%)`,
        }}
      />

      {/* Inner glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          transform: `translate(-50%, -50%) scale(${2 - slowPulse})`,
          background: `radial-gradient(circle, ${BRAND.glow}33 0%, transparent 70%)`,
        }}
      />

      {/* Orbiting crescent arc */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: `1px solid ${BRAND.silverBlue}22`,
          transform: `translate(-50%, -50%) rotate(${orbitAngle}rad)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: `1px dashed ${BRAND.silver}11`,
          transform: `translate(-50%, -50%) rotate(${-orbitAngle * 0.7}rad)`,
        }}
      />

      {/* Star particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: BRAND.silver,
            opacity: p.opacity * (0.7 + Math.sin(frame / 40 + i) * 0.3),
          }}
        />
      ))}
    </AbsoluteFill>
  );
}

function BrandHeader({ opacity }: { opacity: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 80,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
      }}
    >
      <div
        style={{
          background: `linear-gradient(90deg, ${BRAND.glowDim}, ${BRAND.glow}, ${BRAND.glowDim})`,
          borderRadius: 100,
          padding: "10px 36px",
          border: `1px solid ${BRAND.silverBlue}55`,
          fontSize: 26,
          fontWeight: 800,
          color: BRAND.silver,
          letterSpacing: 3,
          fontFamily: "sans-serif",
        }}
      >
        LiQUiD SOUND
      </div>
    </div>
  );
}

function SlideContent({
  slide,
  localFrame,
  fps,
  isLast,
  cta,
  hashtags,
}: {
  slide: TikTokSlideData;
  localFrame: number;
  fps: number;
  isLast: boolean;
  cta?: string;
  hashtags?: string[];
}) {
  const textReveal = spring({
    frame: localFrame - 8,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  const lineOpacity = interpolate(localFrame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      {/* TTS Audio */}
      {slide.audioUrl && <Audio src={slide.audioUrl} volume={1} />}

      {/* Accent line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: interpolate(localFrame, [0, 20], [0, 560], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 1,
          background: `linear-gradient(90deg, transparent, ${BRAND.silverBlue}, transparent)`,
          opacity: lineOpacity,
          marginTop: -120,
        }}
      />

      {/* Main subtitle text */}
      <AbsoluteFill
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 80px",
          paddingTop: 200,
          paddingBottom: isLast ? 320 : 200,
        }}
      >
        <div
          style={{
            background: BRAND.subtitleBg,
            borderRadius: 24,
            padding: "40px 60px",
            border: `1px solid ${BRAND.silverBlue}33`,
            backdropFilter: "blur(8px)",
            transform: `scale(${interpolate(textReveal, [0, 1], [0.94, 1])}) translateY(${interpolate(textReveal, [0, 1], [40, 0])}px)`,
            opacity: textReveal,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 52,
              fontWeight: 700,
              color: BRAND.white,
              lineHeight: 1.35,
              textAlign: "center",
              fontFamily: "sans-serif",
              textShadow: `0 0 40px ${BRAND.glow}88`,
            }}
          >
            {slide.text}
          </p>
        </div>
      </AbsoluteFill>

      {/* CTA + hashtags on last slide */}
      {isLast && (
        <div
          style={{
            position: "absolute",
            bottom: 140,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            opacity: interpolate(localFrame, [8, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {cta && (
            <div
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: BRAND.silverBlue,
                fontFamily: "sans-serif",
                letterSpacing: 1,
              }}
            >
              {cta} ↗
            </div>
          )}
          {hashtags && hashtags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 24,
                    color: `${BRAND.silver}99`,
                    fontFamily: "sans-serif",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export const TikTokSlide: React.FC<TikTokSlideProps> = ({
  slides,
  hashtags = [],
  cta = "Follow for more",
  brandName = "LiQUiD SOUND",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Build sequence offsets
  let offset = 0;
  const sequences: Array<{ slide: TikTokSlideData; from: number; isLast: boolean }> = slides.map(
    (slide, i) => {
      const entry = { slide, from: offset, isLast: i === slides.length - 1 };
      offset += slide.durationInFrames;
      return entry;
    }
  );

  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <CelestialBackground frame={frame} />
      <BrandHeader opacity={headerOpacity} />

      {sequences.map(({ slide, from, isLast }, i) => (
        <Sequence key={i} from={from} durationInFrames={slide.durationInFrames} layout="none">
          <SlideContent
            slide={slide}
            localFrame={frame - from}
            fps={fps}
            isLast={isLast}
            cta={cta}
            hashtags={hashtags}
          />
        </Sequence>
      ))}

      {/* Bottom brand bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: `linear-gradient(0deg, ${BRAND.glowDim}88, transparent)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: `${BRAND.silver}66`,
            fontFamily: "sans-serif",
            letterSpacing: 4,
          }}
        >
          {brandName.toUpperCase()}
        </div>
      </div>
    </AbsoluteFill>
  );
};
