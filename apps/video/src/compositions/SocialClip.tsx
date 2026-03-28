import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface SocialClipProps {
  headline: string;
  subtext?: string;
  ctaText?: string;
  hashtags?: string[];
  brandColor?: string;
  accentColor?: string;
}

// 15s branded short for Instagram/TikTok (9:16)
export const SocialClip: React.FC<SocialClipProps> = ({
  headline,
  subtext,
  ctaText = "Follow for more",
  hashtags = [],
  brandColor = "#7C3AED",
  accentColor = "#06B6D4",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  const headlineScale = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 100 } });
  const subtextOpacity = spring({ frame: frame - 12, fps, config: { damping: 20 } });
  const ctaOpacity = spring({ frame: frame - 20, fps, config: { damping: 20 } });

  // Pulsing ring animation
  const ringScale = interpolate(frame % (fps * 2), [0, fps], [1, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringOpacity = interpolate(frame % (fps * 2), [0, fps, fps * 2], [0.5, 0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Gradient background */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, #0D0D1F 0%, #1A0F35 50%, #0D1A2F 100%)`,
        }}
      />

      {/* Animated background circles */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "-10%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${brandColor}22 0%, transparent 70%)`,
            transform: `scale(${ringScale})`,
            opacity: ringOpacity,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "-5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)`,
            transform: `scale(${2 - ringScale})`,
            opacity: ringOpacity,
          }}
        />
      </AbsoluteFill>

      {/* Content */}
      <AbsoluteFill
        style={{
          fontFamily: "sans-serif",
          padding: "100px 60px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 28,
        }}
      >
        {/* Brand tag */}
        <div
          style={{
            background: `linear-gradient(90deg, ${brandColor}, ${accentColor})`,
            borderRadius: 100,
            padding: "8px 24px",
            fontSize: 22,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: 1,
          }}
        >
          LiQUiDSOUND
        </div>

        {/* Headline */}
        <div
          style={{
            transform: `scale(${headlineScale})`,
            transformOrigin: "left center",
            fontSize: 64,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.1,
          }}
        >
          {headline}
        </div>

        {/* Subtext */}
        {subtext && (
          <div
            style={{
              opacity: subtextOpacity,
              fontSize: 32,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.4,
            }}
          >
            {subtext}
          </div>
        )}

        {/* CTA */}
        <div
          style={{
            opacity: ctaOpacity,
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: accentColor,
            }}
          >
            {ctaText} ↗
          </div>

          {/* Hashtags */}
          {hashtags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 22,
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: 500,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
