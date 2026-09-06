import { generateObject } from "ai";
import { z } from "zod";
import { NextResponse } from "next/server";
import { buildDemoHooks, buildDemoPosts } from "@/lib/demo-content";
import type { BrandDNA, CampaignPack } from "@/lib/types";

export const runtime = "nodejs";

const packSchema = z.object({
  hooks: z
    .array(
      z.object({
        text: z.string(),
        style: z.string(),
        score: z.number().min(1).max(100),
      }),
    )
    .min(4)
    .max(6),
  posts: z
    .array(
      z.object({
        platform: z.enum(["tiktok", "instagram", "x", "linkedin", "reddit"]),
        format: z.string(),
        hook: z.string(),
        body: z.string(),
        cta: z.string(),
        hashtags: z.array(z.string()),
        visualDirection: z.string(),
        viralScore: z.number().min(1).max(100),
        whyItWorks: z.string(),
      }),
    )
    .min(5)
    .max(5),
});

export async function POST(req: Request) {
  const body = (await req.json()) as { brand?: BrandDNA };
  if (!body.brand) {
    return NextResponse.json({ error: "Brand DNA is required" }, { status: 400 });
  }

  const brand = body.brand;

  try {
    const { object } = await generateObject({
      model: "anthropic/claude-sonnet-4.5",
      schema: packSchema,
      prompt: `You are the best viral social strategist alive — sharper than Zeely ad templates and more executional than HeyCatch playbooks.

Create a campaign pack for this product Brand DNA:
${JSON.stringify(brand, null, 2)}

Rules:
- Exactly one post for each platform: tiktok, instagram, x, linkedin, reddit
- Platform-native formats (never identical captions resized)
- Hooks must stop the scroll in under 1 second
- Avoid purple-prose AI slop, emojis overuse, and generic "Unlock your potential" lines
- Viral scores should be honest (80-96 range for strong drafts)
- whyItWorks must cite a concrete psychological or platform mechanic
- Hashtags only where natural (skip for X/Reddit unless essential)`,
    });

    const pack: CampaignPack = {
      brand,
      hooks: object.hooks,
      posts: object.posts.map((p, i) => ({
        ...p,
        id: `${p.platform}-${Date.now()}-${i}`,
        status: "draft" as const,
      })),
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ pack, source: "ai" });
  } catch {
    const pack: CampaignPack = {
      brand,
      hooks: buildDemoHooks(brand),
      posts: buildDemoPosts(brand),
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json({ pack, source: "demo" });
  }
}
