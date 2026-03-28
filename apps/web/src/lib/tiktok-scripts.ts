import type { TikTokScript } from "@liquid-sound/types";

/**
 * RANGIKU's Batch 1 scripts (LIQA-27) — 6 scripts for daily 4-hour rotation.
 * Theme cycle: Brand Story → Education → Practical → Ritual → Brand Story → Empowerment
 */
export const TIKTOK_SCRIPTS: TikTokScript[] = [
  {
    title: "Sound Is Sacred",
    slides: [
      { text: "Sound is not background noise." },
      { text: "It lives in your body." },
      { text: "Frequency is medicine." },
      { text: "We build with sound." },
      { text: "Follow for the frequency." },
    ],
    hashtags: ["liquidsound", "soundhealing", "frequency", "consciousness", "wellness"],
    cta: "Follow for the frequency.",
  },
  {
    title: "Why Most Music Doesn't Heal You",
    slides: [
      { text: "Most music is designed to sell." },
      { text: "Not all frequencies are equal." },
      { text: "Certain frequencies shift your state." },
      { text: "We engineer for your nervous system." },
      { text: "Start listening differently." },
    ],
    hashtags: ["liquidsound", "soundhealing", "binauralbeats", "nervousystem", "healing"],
    cta: "Start listening differently.",
  },
  {
    title: "The 4-Minute Reset",
    slides: [
      { text: "You don't need an hour." },
      { text: "You need 4 minutes." },
      { text: "Beta to Alpha in minutes." },
      { text: "The reset is real." },
      { text: "Try it today. Link in bio." },
    ],
    hashtags: ["liquidsound", "stressrelief", "binauralbeats", "mindfulness", "reset"],
    cta: "Try it today. Link in bio.",
  },
  {
    title: "What Is LiQUiD SOUND?",
    slides: [
      { text: "Everything begins with a vibration." },
      { text: "We started as musicians." },
      { text: "Then we went deeper." },
      { text: "LiQUiD SOUND was born." },
      { text: "This is our mission." },
    ],
    hashtags: ["liquidsound", "brandstory", "soundhealing", "music", "frequency"],
    cta: "This is our mission.",
  },
  {
    title: "Morning Frequency Protocol",
    slides: [
      { text: "Your morning sets your frequency." },
      { text: "Sound before screen." },
      { text: "Theta into Alpha. Rise clean." },
      { text: "This is the practice." },
      { text: "We made a morning track." },
    ],
    hashtags: ["liquidsound", "morningroutine", "frequency", "meditation", "mindset"],
    cta: "We made a morning track. Link in bio.",
  },
  {
    title: "You Are the Instrument",
    slides: [
      { text: "Your body generates frequency." },
      { text: "Your heartbeat is a rhythm track." },
      { text: "We resonate together." },
      { text: "You are the instrument." },
      { text: "Follow the resonance." },
    ],
    hashtags: ["liquidsound", "soundhealing", "resonance", "vibration", "consciousness"],
    cta: "Follow. We'll keep sending signal.",
  },
];

/** Pick the script for a given slot index (0–5, wraps around). */
export function getScriptForSlot(slot: number): TikTokScript {
  return TIKTOK_SCRIPTS[slot % TIKTOK_SCRIPTS.length]!;
}
