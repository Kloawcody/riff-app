import type { BrandDNA, GeneratedPost, ViralHook } from "./types";

function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h << 5) - h + input.charCodeAt(i);
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number, offset = 0): T {
  return arr[(seed + offset) % arr.length];
}

function hostnameToName(url: string) {
  try {
    const host = new URL(url.startsWith("http") ? url : `https://${url}`).hostname.replace(
      /^www\./,
      "",
    );
    const base = host.split(".")[0] ?? "Product";
    return base.charAt(0).toUpperCase() + base.slice(1);
  } catch {
    return "Your Product";
  }
}

export function synthesizeBrandDNA(url: string, hint?: string): BrandDNA {
  const name = hostnameToName(url);
  const seed = hash(url.toLowerCase());
  const categories = [
    "AI SaaS",
    "Creator tools",
    "E-commerce",
    "Productivity",
    "Consumer app",
    "Marketplace",
  ];
  const audiences = [
    "solo founders shipping weekly",
    "growth marketers at early-stage startups",
    "DTC brand operators who live on short-form",
    "indie hackers tired of posting into the void",
    "agency teams juggling 10+ client accounts",
  ];
  const voices = [
    ["sharp", "confident", "zero fluff"],
    ["warm", "direct", "founder-to-founder"],
    ["witty", "bold", "scroll-stopping"],
    ["expert", "clear", "no buzzwords"],
  ];
  const diffs = [
    `${name} turns product truth into platform-native posts — not recycled captions`,
    "Every draft ships with a viral score and a why-it-works rationale",
    "Hooks engineered for the first second, not the algorithm afterthought",
    "One brand DNA powers TikTok, Instagram, X, LinkedIn, and Reddit without sounding generic",
  ];
  const proofs = [
    "Built for teams who need publish-ready drafts in under 60 seconds",
    "Platform formats trained on what actually gets saved, shared, and replied to",
    "Opinionated creative system — not another ChatGPT wrapper",
  ];
  const keywords = [
    name.toLowerCase(),
    "viral content",
    "organic growth",
    "short-form",
    "product marketing",
  ];
  const triggers = ["curiosity gap", "status signal", "before/after", "contrarian take", "FOMO"];
  const competitors = ["generic AI caption tools", "manual social agencies", "template mills"];

  const productName = name;
  return {
    url: url.startsWith("http") ? url : `https://${url}`,
    name: productName,
    tagline: hint?.trim()
      ? `${productName} — ${hint.trim()}`
      : `${productName} — product marketing that actually gets seen`,
    category: pick(categories, seed),
    audience: pick(audiences, seed, 1),
    voice: pick(voices, seed, 2),
    differentiators: diffs,
    proofPoints: proofs,
    keywords,
    emotionalTriggers: triggers,
    competitors,
  };
}

export function buildDemoHooks(brand: BrandDNA): ViralHook[] {
  const n = brand.name;
  return [
    {
      text: `Stop posting. Start ${n}-ing your feed.`,
      style: "Pattern interrupt",
      score: 91,
    },
    {
      text: `I replaced my content team with ${n} for 7 days. Here's what happened.`,
      style: "Experiment story",
      score: 94,
    },
    {
      text: `Your product is good. Your posts are invisible. Fix #2.`,
      style: "Harsh truth",
      score: 89,
    },
    {
      text: `The $0 distribution channel most founders still ignore in 2026`,
      style: "Curiosity gap",
      score: 87,
    },
    {
      text: `If ${n} had a personality, it would roast your caption strategy.`,
      style: "Brand voice",
      score: 85,
    },
  ];
}

export function buildDemoPosts(brand: BrandDNA): GeneratedPost[] {
  const n = brand.name;
  const now = Date.now();
  return [
    {
      id: `tiktok-${now}`,
      platform: "tiktok",
      format: "Talking-head Reel",
      hook: `POV: you finally have content that sounds like ${n}, not ChatGPT`,
      body: `Cold open on the product screen.\nCut to: "Most AI tools write captions. ${n} writes platform weapons."\nShow 3 hooks scoring 90+.\nEnd on publish button.`,
      cta: `Comment "DNA" and I'll drop the free product scan.`,
      hashtags: ["#buildinpublic", "#saas", "#contentstrategy", `#${n.toLowerCase()}`],
      visualDirection:
        "Vertical 9:16, high-contrast UI screen recording + face cam picture-in-picture, kinetic captions in signal green",
      viralScore: 93,
      whyItWorks:
        "Opens with identity POV, contrasts competitors in one line, and ends with a low-friction CTA that sparks comments.",
      status: "draft",
    },
    {
      id: `ig-${now}`,
      platform: "instagram",
      format: "Carousel (7 slides)",
      hook: `7 slides that make ${n} feel inevitable`,
      body: `1. The problem: your product is better than your posts\n2. What viral actually means in 2026\n3. Extract Product DNA\n4. Hook → Body → CTA structure\n5. Platform-native formats\n6. Viral score preview\n7. Soft CTA: scan your URL`,
      cta: `Save this. Then paste your product URL into ${n}.`,
      hashtags: ["#marketing", "#founders", "#instagramgrowth", "#ai"],
      visualDirection:
        "Bold typography slides on deep ink backgrounds, one idea per slide, brand wordmark as hero on slide 1",
      viralScore: 90,
      whyItWorks:
        "Carousel saveability + numbered list + clear product payoff on the last slide.",
      status: "draft",
    },
    {
      id: `x-${now}`,
      platform: "x",
      format: "Single + mini-thread",
      hook: `Most "AI social tools" are caption autocomplete with a logo.`,
      body: `${n} does three things they don't:\n\n1) Product DNA from your URL\n2) Platform-native formats (not resized captions)\n3) Viral scores with a reason\n\nOrganic distribution is still the highest-ROI channel founders underuse.`,
      cta: `Try the free DNA scan →`,
      hashtags: [],
      visualDirection: "Text-first; optional product UI screenshot as media",
      viralScore: 88,
      whyItWorks:
        "Contrarian opener + concrete triad + industry truth closes the loop without sounding salesy.",
      status: "draft",
    },
    {
      id: `li-${now}`,
      platform: "linkedin",
      format: "Story post",
      hook: `Last quarter we killed our "content calendar" ritual.`,
      body: `It was theater.\n\nWe were shipping posts that sounded like every other SaaS page — polished, polite, forgettable.\n\nThen we rebuilt around Product DNA:\n→ Who it's for\n→ What it refuses to be\n→ Proof people can feel\n\n${n} turns that DNA into TikTok, IG, X, LinkedIn, and Reddit drafts that don't need a rewrite committee.\n\nResult: more replies, more demos, less "we should post more."`,
      cta: `If you're still copy-pasting the same caption across 5 platforms, you're leaving reach on the table.`,
      hashtags: ["#Growth", "#ProductMarketing", "#Startups"],
      visualDirection: "Clean document-style formatting with short lines; optional before/after screenshot",
      viralScore: 86,
      whyItWorks:
        "Narrative credibility + concrete system + soft close that invites silent agreement (and comments).",
      status: "draft",
    },
    {
      id: `reddit-${now}`,
      platform: "reddit",
      format: "Value post",
      hook: `How we generate a week of platform-native posts from one product URL (no ad spend)`,
      body: `Not promoting, just sharing the workflow we use:\n\n1. Paste product URL\n2. Extract positioning, audience, voice, proof\n3. Generate hooks scored for virality\n4. Adapt each platform's native format (TikTok ≠ LinkedIn)\n5. Human edit for 2 minutes, then schedule\n\nTool we built for this: ${n}. Happy to answer questions in the comments.`,
      cta: `What part of content creation burns the most time for you?`,
      hashtags: [],
      visualDirection: "Text post; optional spoilered screenshot of the DNA panel",
      viralScore: 84,
      whyItWorks:
        "Leads with value, discloses tool transparently, and ends with a question that invites discussion.",
      status: "draft",
    },
  ];
}
