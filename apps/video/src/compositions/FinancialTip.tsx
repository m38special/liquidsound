import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface FinancialTipProps {
  title: string;
  tip: string;
  stat?: string;
  statLabel?: string;
  brandColor?: string;
}

// 60s vertical video (9:16) — animated financial tip with data viz
export const FinancialTip: React.FC<FinancialTipProps> = ({
  title,
  tip,
  stat,
  statLabel,
  brandColor = "#7C3AED",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = spring({ frame, fps, config: { damping: 20 } });
  const tipOpacity = spring({ frame: frame - 20, fps, config: { damping: 20 } });
  const statScale = spring({ frame: frame - 40, fps, config: { damping: 14, stiffness: 80 } });

  const barProgress = interpolate(frame, [60, fps * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #0F0F1A 0%, #1A1035 100%)`,
        fontFamily: "sans-serif",
        padding: "80px 60px",
        flexDirection: "column",
        justifyContent: "center",
        gap: 40,
      }}
    >
      {/* Brand accent bar */}
      <div
        style={{
          height: 6,
          width: `${barProgress * 100}%`,
          background: brandColor,
          borderRadius: 3,
          marginBottom: 20,
        }}
      />

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${interpolate(titleOpacity, [0, 1], [30, 0])}px)`,
          fontSize: 56,
          fontWeight: 800,
          color: "#FFFFFF",
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>

      {/* Stat callout */}
      {stat && (
        <div
          style={{
            opacity: statScale,
            transform: `scale(${statScale})`,
            background: brandColor,
            borderRadius: 20,
            padding: "32px 48px",
            alignSelf: "flex-start",
          }}
        >
          <div style={{ fontSize: 80, fontWeight: 900, color: "#FFFFFF", lineHeight: 1 }}>
            {stat}
          </div>
          {statLabel && (
            <div style={{ fontSize: 28, color: "rgba(255,255,255,0.85)", marginTop: 8 }}>
              {statLabel}
            </div>
          )}
        </div>
      )}

      {/* Tip body */}
      <div
        style={{
          opacity: tipOpacity,
          transform: `translateY(${interpolate(tipOpacity, [0, 1], [20, 0])}px)`,
          fontSize: 36,
          color: "rgba(255,255,255,0.85)",
          lineHeight: 1.5,
        }}
      >
        {tip}
      </div>

      {/* LiQUiD SOUND watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 60,
          fontSize: 24,
          fontWeight: 700,
          color: brandColor,
          opacity: 0.7,
          letterSpacing: 2,
        }}
      >
        LiQUiDSOUND
      </div>
    </AbsoluteFill>
  );
};
