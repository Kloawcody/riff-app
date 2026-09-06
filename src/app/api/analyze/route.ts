import { generateObject } from "ai";
import { z } from "zod";
import { NextResponse } from "next/server";
import { synthesizeBrandDNA } from "@/lib/demo-content";
import type { BrandDNA } from "@/lib/types";

export const runtime = "nodejs";

const brandSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  category: z.string(),
  audience: z.string(),
  voice: z.array(z.string()).min(2).max(5),
  differentiators: z.array(z.string()).min(2).max(5),
  proofPoints: z.array(z.string()).min(2).max(5),
  keywords: z.array(z.string()).min(3).max(8),
  emotionalTriggers: z.array(z.string()).min(3).max(6),
  competitors: z.array(z.string()).min(2).max(5),
});

export async function POST(req: Request) {
  const body = (await req.json()) as { url?: string; hint?: string };
  const url = body.url?.trim();
  if (!url) {
    return NextResponse.json({ error: "Product URL is required" }, { status: 400 });
  }

  const fallback = synthesizeBrandDNA(url, body.hint);

  try {
    const { object } = await generateObject({
      model: "anthropic/claude-sonnet-4.5",
      schema: brandSchema,
      prompt: `You are a world-class product marketer. Analyze this product URL and infer Brand DNA for viral social content.
URL: ${url}
Optional hint: ${body.hint || "none"}

Return sharp, specific, non-generic fields. Voice adjectives should feel human. Differentiators must be concrete.`,
    });

    const brand: BrandDNA = {
      url: url.startsWith("http") ? url : `https://${url}`,
      ...object,
    };
    return NextResponse.json({ brand, source: "ai" });
  } catch {
    return NextResponse.json({ brand: fallback, source: "demo" });
  }
}
