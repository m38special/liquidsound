import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface CourseIntroProps {
  courseTitle: string;
  instructorName: string;
  tagline?: string;
  coverImageUrl?: string;
  brandColor?: string;
}

// 30s (16:9) course trailer with brand animation
export const CourseIntro: React.FC<CourseIntroProps> = ({
  courseTitle,
  instructorName,
  tagline = "Learn at your own pace",
  coverImageUrl,
  brandColor = "#7C3AED",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Fade out in last 30 frames
  const globalOpacity = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = spring({ frame, fps, config: { damping: 18, stiffness: 60 } });
  const titleY = spring({ frame: frame - 15, fps, config: { damping: 20 } });
  const subtitleOpacity = spring({ frame: frame - 30, fps, config: { damping: 20 } });

  const scanlineX = interpolate(frame, [0, durationInFrames], [-100, 110]);

  return (
    <AbsoluteFill style={{ background: "#0A0A14", opacity: globalOpacity }}>
      {/* Animated gradient background */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${30 + frame * 0.1}% ${40 + Math.sin(frame * 0.02) * 10}%, ${brandColor}33 0%, transparent 60%)`,
        }}
      />

      {/* Scanning light effect */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)`,
          transform: `translateX(${scanlineX}%)`,
        }}
      />

      {/* Cover image (if provided) */}
      {coverImageUrl && (
        <AbsoluteFill style={{ opacity: 0.15 }}>
          <Img src={coverImageUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </AbsoluteFill>
      )}

      {/* Content */}
      <AbsoluteFill
        style={{
          fontFamily: "sans-serif",
          padding: "80px 120px",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {/* Brand logo */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoScale,
            fontSize: 28,
            fontWeight: 900,
            color: brandColor,
            letterSpacing: 3,
            marginBottom: 32,
          }}
        >
          LiQUiDSOUND
        </div>

        {/* Course title */}
        <div
          style={{
            transform: `translateY(${interpolate(titleY, [0, 1], [60, 0])}px)`,
            opacity: titleY,
            fontSize: 72,
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.05,
            maxWidth: "80%",
          }}
        >
          {courseTitle}
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: subtitleOpacity,
            fontSize: 32,
            color: "rgba(255,255,255,0.6)",
            marginTop: 8,
          }}
        >
          {tagline}
        </div>

        {/* Instructor */}
        <Sequence from={fps * 1}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 40,
            }}
          >
            <div
              style={{
                width: 4,
                height: 40,
                background: brandColor,
                borderRadius: 2,
              }}
            />
            <div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
                with
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF" }}>
                {instructorName}
              </div>
            </div>
          </div>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
