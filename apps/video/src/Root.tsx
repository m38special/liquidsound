import { Composition } from "remotion";
import { CourseIntro, CourseIntroProps } from "./compositions/CourseIntro";
import { FinancialTip, FinancialTipProps } from "./compositions/FinancialTip";
import { SocialClip, SocialClipProps } from "./compositions/SocialClip";
import { TikTokSlide, TikTokSlideProps } from "./compositions/TikTokSlide";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* TikTokSlide — dynamic duration (9:16) at 30fps, driven by RANGIKU scripts */}
      <Composition<TikTokSlideProps>
        id="TikTokSlide"
        component={TikTokSlide}
        durationInFrames={900} // placeholder — real duration set via inputProps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          slides: [
            {
              text: "LiQUiD SOUND — where music meets the cosmos.",
              audioUrl: undefined,
              durationInFrames: 150,
            },
          ],
          hashtags: ["liquidsound", "music", "tiktok"],
          cta: "Follow for more",
        }}
        calculateMetadata={({ props }) => ({
          durationInFrames: props.slides.reduce((sum, s) => sum + s.durationInFrames, 0) || 900,
        })}
      />

      {/* FinancialTip — 60s vertical (9:16) at 30fps = 1800 frames */}
      <Composition<FinancialTipProps>
        id="FinancialTip"
        component={FinancialTip}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          title: "Money Tip of the Day",
          tip: "Invest 20% of every paycheck before you spend anything else.",
          stat: "20%",
          statLabel: "savings rate target",
          brandColor: "#7C3AED",
        }}
      />

      {/* CourseIntro — 30s landscape (16:9) at 30fps = 900 frames */}
      <Composition<CourseIntroProps>
        id="CourseIntro"
        component={CourseIntro}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          courseTitle: "Personal Finance Fundamentals",
          instructorName: "Your Instructor",
          tagline: "Master your money in 30 days",
          brandColor: "#7C3AED",
        }}
      />

      {/* SocialClip — 15s vertical (9:16) at 30fps = 450 frames */}
      <Composition<SocialClipProps>
        id="SocialClip"
        component={SocialClip}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          headline: "One tip that changed everything",
          subtext: "Start before you're ready.",
          ctaText: "Follow for more",
          hashtags: ["finance", "investing", "liquidsound"],
          brandColor: "#7C3AED",
          accentColor: "#06B6D4",
        }}
      />
    </>
  );
};
