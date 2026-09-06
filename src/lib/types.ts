export type PlatformId =
  | "tiktok"
  | "instagram"
  | "x"
  | "linkedin"
  | "reddit";

export type ConnectionStatus = "disconnected" | "connected" | "pending";

export interface PlatformAccount {
  id: PlatformId;
  name: string;
  handle?: string;
  status: ConnectionStatus;
  connectedAt?: string;
}

export interface BrandDNA {
  url: string;
  name: string;
  tagline: string;
  category: string;
  audience: string;
  voice: string[];
  differentiators: string[];
  proofPoints: string[];
  keywords: string[];
  emotionalTriggers: string[];
  competitors: string[];
}

export interface ViralHook {
  text: string;
  style: string;
  score: number;
}

export interface GeneratedPost {
  id: string;
  platform: PlatformId;
  format: string;
  hook: string;
  body: string;
  cta: string;
  hashtags: string[];
  visualDirection: string;
  viralScore: number;
  whyItWorks: string;
  scheduledFor?: string;
  status: "draft" | "scheduled" | "published";
}

export interface CampaignPack {
  brand: BrandDNA;
  hooks: ViralHook[];
  posts: GeneratedPost[];
  createdAt: string;
}
