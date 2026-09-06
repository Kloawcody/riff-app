import type { PlatformId } from "./types";

export const PLATFORMS: {
  id: PlatformId;
  label: string;
  format: string;
  characterHint: string;
  accent: string;
}[] = [
  {
    id: "tiktok",
    label: "TikTok",
    format: "15–30s native hook + on-screen text",
    characterHint: "Spoken-first, pattern interrupt in 1s",
    accent: "#FE2C55",
  },
  {
    id: "instagram",
    label: "Instagram",
    format: "Reel + carousel-ready caption",
    characterHint: "Visual-first, curiosity + saveability",
    accent: "#E1306C",
  },
  {
    id: "x",
    label: "X",
    format: "Punchy thread or single banger",
    characterHint: "Opinionated, quotable, under 280 when possible",
    accent: "#1D9BF0",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    format: "Story-led professional post",
    characterHint: "Credibility + lesson, line breaks for scan",
    accent: "#0A66C2",
  },
  {
    id: "reddit",
    label: "Reddit",
    format: "Value-first community post",
    characterHint: "No hard sell, authentic problem framing",
    accent: "#FF4500",
  },
];

export function platformLabel(id: PlatformId) {
  return PLATFORMS.find((p) => p.id === id)?.label ?? id;
}
