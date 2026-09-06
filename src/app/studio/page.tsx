"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { addHours, format } from "date-fns";
import {
  ArrowLeft,
  Check,
  Link2,
  Loader2,
  Radio,
  Sparkles,
  Unplug,
  CalendarClock,
  Copy,
  Wand2,
} from "lucide-react";
import { PLATFORMS } from "@/lib/platforms";
import { useRiffStore } from "@/lib/store";
import type { BrandDNA, CampaignPack, GeneratedPost, PlatformId } from "@/lib/types";

export default function StudioPage() {
  const {
    brand,
    setBrand,
    pack,
    setPack,
    accounts,
    connectAccount,
    disconnectAccount,
    schedulePost,
    clearAll,
    hydrated,
  } = useRiffStore();

  const [url, setUrl] = useState("https://heycatch.ai");
  const [hint, setHint] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const [activePlatform, setActivePlatform] = useState<PlatformId>("tiktok");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"create" | "connect" | "calendar">("create");

  const activePost = useMemo(
    () => pack?.posts.find((p) => p.platform === activePlatform) ?? null,
    [pack, activePlatform],
  );

  async function analyze() {
    setError(null);
    setAnalyzing(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, hint }),
      });
      const data = (await res.json()) as { brand?: BrandDNA; source?: string; error?: string };
      if (!res.ok || !data.brand) throw new Error(data.error || "Analyze failed");
      setBrand(data.brand);
      setSource(data.source ?? null);
      setPack(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analyze failed");
    } finally {
      setAnalyzing(false);
    }
  }

  async function generate() {
    if (!brand) return;
    setError(null);
    setGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand }),
      });
      const data = (await res.json()) as { pack?: CampaignPack; source?: string; error?: string };
      if (!res.ok || !data.pack) throw new Error(data.error || "Generate failed");
      setPack(data.pack);
      setSource(data.source ?? null);
      setActivePlatform("tiktok");
      setTab("create");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generate failed");
    } finally {
      setGenerating(false);
    }
  }

  function copyPost(post: GeneratedPost) {
    const text = [post.hook, "", post.body, "", post.cta, post.hashtags.join(" ")]
      .filter(Boolean)
      .join("\n");
    void navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  if (!hydrated) {
    return (
      <div className="mesh flex min-h-screen items-center justify-center text-fog">
        <Loader2 className="h-5 w-5 animate-spin text-signal" />
      </div>
    );
  }

  return (
    <div className="noise mesh min-h-screen">
      <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-ink/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-fog hover:text-ivory transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link href="/" className="font-display text-xl font-extrabold text-ivory">
              Riff<span className="text-signal">.</span>
            </Link>
            <span className="hidden rounded-full border border-[var(--line)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-fog sm:inline">
              Studio
            </span>
          </div>
          <div className="flex items-center gap-2">
            {source && (
              <span className="hidden text-xs text-fog sm:inline">
                Mode: <span className="text-signal">{source === "ai" ? "AI live" : "Demo engine"}</span>
              </span>
            )}
            <button type="button" onClick={clearAll} className="btn-ghost !py-2 !px-3 text-xs">
              Reset
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-4">
          <div className="rounded-[22px] border border-[var(--line)] bg-ink-elevated/80 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-signal">
              Product DNA
            </p>
            <label className="mb-1 block text-xs text-fog">Product URL</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yourproduct.com"
              className="mb-3 w-full rounded-xl border border-[var(--line)] bg-ink px-3 py-2.5 text-sm text-ivory outline-none focus:border-signal/50"
            />
            <label className="mb-1 block text-xs text-fog">Optional product hint</label>
            <input
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              placeholder="AI marketing for solo founders"
              className="mb-4 w-full rounded-xl border border-[var(--line)] bg-ink px-3 py-2.5 text-sm text-ivory outline-none focus:border-signal/50"
            />
            <button
              type="button"
              onClick={analyze}
              disabled={analyzing || !url.trim()}
              className="btn-primary w-full disabled:opacity-60"
            >
              {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              {analyzing ? "Scanning…" : "Scan DNA"}
            </button>
            {error && <p className="mt-3 text-sm text-danger">{error}</p>}
          </div>

          {brand && (
            <div className="rounded-[22px] border border-[var(--line)] bg-ink-elevated/80 p-5 animate-rise">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-xl font-bold text-ivory">{brand.name}</p>
                  <p className="mt-1 text-sm text-fog">{brand.category}</p>
                </div>
                <Sparkles className="h-4 w-4 text-signal" />
              </div>
              <p className="text-sm leading-relaxed text-ivory/90">{brand.tagline}</p>
              <div className="mt-4 space-y-3 text-sm">
                <Meta label="Audience" value={brand.audience} />
                <Meta label="Voice" value={brand.voice.join(" · ")} />
                <div>
                  <p className="mb-1.5 text-xs uppercase tracking-[0.14em] text-fog">Differentiators</p>
                  <ul className="space-y-1.5 text-ivory/85">
                    {brand.differentiators.slice(0, 3).map((d) => (
                      <li key={d} className="flex gap-2">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                type="button"
                onClick={generate}
                disabled={generating}
                className="btn-primary mt-5 w-full disabled:opacity-60"
              >
                {generating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Radio className="h-4 w-4" />
                )}
                {generating ? "Engineering posts…" : "Generate viral pack"}
              </button>
            </div>
          )}

          <div className="flex rounded-full border border-[var(--line)] bg-ink-elevated/70 p-1 text-xs font-semibold">
            {(
              [
                ["create", "Create"],
                ["connect", "Connect"],
                ["calendar", "Calendar"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`flex-1 rounded-full px-3 py-2 transition-colors ${
                  tab === id ? "bg-signal text-ink" : "text-fog hover:text-ivory"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </aside>

        <section className="min-h-[70vh] rounded-[24px] border border-[var(--line)] bg-ink-elevated/50 p-5 md:p-7">
          {tab === "create" && (
            <>
              {!pack ? (
                <EmptyState
                  title="Your campaign pack lands here"
                  body="Scan a product URL, then generate platform-native posts with viral scores — TikTok through Reddit."
                />
              ) : (
                <div className="space-y-6">
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-fog">
                      Top hooks
                    </p>
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                      {pack.hooks.map((h) => (
                        <div
                          key={h.text}
                          className="rounded-2xl border border-[var(--line)] bg-ink/50 p-4"
                        >
                          <div className="mb-2 flex items-center justify-between text-xs">
                            <span className="text-fog">{h.style}</span>
                            <span className="font-extrabold text-signal">{h.score}</span>
                          </div>
                          <p className="text-sm font-semibold leading-snug text-ivory">{h.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setActivePlatform(p.id)}
                        className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                          activePlatform === p.id
                            ? "bg-ivory text-ink"
                            : "border border-[var(--line)] text-fog hover:text-ivory"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {activePost && (
                    <article className="rounded-[22px] border border-[var(--line)] bg-ink/60 p-5 md:p-7 animate-rise">
                      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fog">
                            {activePost.format}
                          </p>
                          <h2 className="font-display mt-2 max-w-2xl text-2xl font-bold leading-snug text-ivory md:text-3xl">
                            {activePost.hook}
                          </h2>
                        </div>
                        <div
                          className="score-ring grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full"
                          style={{ ["--score" as string]: activePost.viralScore }}
                        >
                          <div className="grid h-[56px] w-[56px] place-items-center rounded-full bg-ink">
                            <span className="text-lg font-extrabold text-signal">{activePost.viralScore}</span>
                          </div>
                        </div>
                      </div>

                      <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed text-ivory/90">
                        {activePost.body}
                      </pre>

                      <p className="mt-5 text-sm font-semibold text-signal">{activePost.cta}</p>
                      {activePost.hashtags.length > 0 && (
                        <p className="mt-3 text-sm text-fog">{activePost.hashtags.join(" ")}</p>
                      )}

                      <div className="mt-6 grid gap-4 border-t border-[var(--line)] pt-5 md:grid-cols-2">
                        <div>
                          <p className="mb-1 text-xs uppercase tracking-[0.14em] text-fog">
                            Visual direction
                          </p>
                          <p className="text-sm leading-relaxed text-ivory/85">
                            {activePost.visualDirection}
                          </p>
                        </div>
                        <div>
                          <p className="mb-1 text-xs uppercase tracking-[0.14em] text-fog">
                            Why it works
                          </p>
                          <p className="text-sm leading-relaxed text-ivory/85">{activePost.whyItWorks}</p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => copyPost(activePost)}
                          className="btn-ghost !py-2.5"
                        >
                          <Copy className="h-4 w-4" />
                          {copied ? "Copied" : "Copy post"}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            schedulePost(
                              activePost.id,
                              addHours(new Date(), 3 + PLATFORMS.findIndex((p) => p.id === activePost.platform)).toISOString(),
                            )
                          }
                          className="btn-primary !py-2.5"
                        >
                          <CalendarClock className="h-4 w-4" />
                          Schedule
                        </button>
                      </div>
                    </article>
                  )}
                </div>
              )}
            </>
          )}

          {tab === "connect" && (
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-ivory">Connect platforms</h2>
                <p className="mt-2 max-w-2xl text-fog">
                  Wire every network you post on. OAuth credentials plug in for production; this MVP
                  saves connection state locally so you can rehearse the full publish workflow.
                </p>
              </div>
              <div className="grid gap-3">
                {accounts.map((account) => {
                  const meta = PLATFORMS.find((p) => p.id === account.id);
                  const connected = account.status === "connected";
                  return (
                    <div
                      key={account.id}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--line)] bg-ink/50 px-4 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-10 w-10 rounded-xl"
                          style={{ background: meta?.accent ?? "#2ee6a6", opacity: 0.85 }}
                        />
                        <div>
                          <p className="font-semibold text-ivory">{account.name}</p>
                          <p className="text-sm text-fog">
                            {connected
                              ? account.handle
                              : meta?.characterHint ?? "Not connected"}
                          </p>
                        </div>
                      </div>
                      {connected ? (
                        <button
                          type="button"
                          onClick={() => disconnectAccount(account.id)}
                          className="btn-ghost !py-2 !px-3 text-sm"
                        >
                          <Unplug className="h-4 w-4" />
                          Disconnect
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            connectAccount(account.id, `@${(brand?.name || "riff").toLowerCase()}`)
                          }
                          className="btn-primary !py-2 !px-3 text-sm"
                        >
                          <Link2 className="h-4 w-4" />
                          Connect
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "calendar" && (
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-ivory">Schedule queue</h2>
                <p className="mt-2 text-fog">
                  Drafts you schedule appear here. Connected accounts are ready for one-click publish
                  once OAuth keys are added.
                </p>
              </div>
              {!pack?.posts.some((p) => p.status === "scheduled") ? (
                <EmptyState
                  title="Nothing scheduled yet"
                  body="Open Create, pick a platform draft, and hit Schedule."
                />
              ) : (
                <div className="space-y-3">
                  {pack!.posts
                    .filter((p) => p.status === "scheduled")
                    .map((p) => (
                      <div
                        key={p.id}
                        className="rounded-2xl border border-[var(--line)] bg-ink/50 p-4"
                      >
                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm">
                          <span className="font-semibold text-ivory">
                            {PLATFORMS.find((x) => x.id === p.platform)?.label}
                          </span>
                          <span className="text-signal">
                            {p.scheduledFor
                              ? format(new Date(p.scheduledFor), "MMM d · h:mm a")
                              : "Queued"}
                          </span>
                        </div>
                        <p className="text-sm text-fog line-clamp-2">{p.hook}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-xs uppercase tracking-[0.14em] text-fog">{label}</p>
      <p className="text-ivory/90">{value}</p>
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
      <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-[var(--line)] bg-ink text-signal">
        <Sparkles className="h-6 w-6" />
      </div>
      <h2 className="font-display text-2xl font-bold text-ivory">{title}</h2>
      <p className="mt-3 max-w-md text-fog leading-relaxed">{body}</p>
    </div>
  );
}
