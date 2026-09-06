"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Radio, Target } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function HomePage() {
  return (
    <div className="noise mesh relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-60" />

      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="font-display text-2xl font-extrabold tracking-tight text-ivory">
          Riff<span className="text-signal">.</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-fog sm:gap-8">
          <a href="#how" className="hidden hover:text-ivory transition-colors sm:inline">
            How it works
          </a>
          <a href="#edge" className="hidden hover:text-ivory transition-colors sm:inline">
            Why Riff
          </a>
          <Link href="/studio" className="btn-primary !py-2.5 !px-4 text-sm">
            Open studio
          </Link>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-6xl flex-col justify-center px-6 pb-20 pt-8">
          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--line)] bg-white/3 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-signal"
          >
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-signal" />
            Organic viral engine
          </motion.div>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="font-display max-w-4xl text-[clamp(3.2rem,9vw,6.4rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-ivory"
          >
            Riff
            <span className="block text-fog/90">makes your product impossible to scroll past.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-7 max-w-xl text-lg leading-relaxed text-fog md:text-xl"
          >
            Scan product DNA. Generate platform-native hooks for TikTok, Instagram, X, LinkedIn, and
            Reddit — then connect accounts and publish. Built to beat generic AI caption tools at
            organic reach.
          </motion.p>

          <motion.div
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link href="/studio" className="btn-primary">
              Start free DNA scan
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#how" className="btn-ghost">
              See the system
            </a>
          </motion.div>

          <motion.div
            custom={4}
            variants={fade}
            initial="hidden"
            animate="show"
            className="relative mt-16 w-full max-w-4xl overflow-hidden rounded-[28px] border border-[var(--line)] bg-ink-elevated/80 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-signal/20 blur-3xl animate-pulse-soft" />
            <div className="flex items-center gap-2 border-b border-[var(--line)] px-5 py-3 text-xs text-fog">
              <span className="h-2.5 w-2.5 rounded-full bg-danger/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-signal/80" />
              <span className="ml-3 font-medium text-ivory/80">studio.riff / campaign pack</span>
            </div>
            <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4 p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">Hook engine</p>
                <p className="font-display text-2xl font-bold leading-snug text-ivory md:text-3xl">
                  “I replaced my content team with Riff for 7 days. Here&apos;s what happened.”
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className="score-ring grid h-16 w-16 place-items-center rounded-full"
                    style={{ ["--score" as string]: 94 }}
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-ink text-sm font-extrabold text-signal">
                      94
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ivory">Viral score</p>
                    <p className="text-sm text-fog">Experiment story · high comment bait</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-[var(--line)] bg-black/20 p-6 md:border-l md:border-t-0 md:p-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-fog">
                  Platform pack
                </p>
                <ul className="space-y-3 text-sm">
                  {[
                    ["TikTok", "Talking-head · 93"],
                    ["Instagram", "Carousel · 90"],
                    ["X", "Thread starter · 88"],
                    ["LinkedIn", "Story post · 86"],
                    ["Reddit", "Value post · 84"],
                  ].map(([p, meta]) => (
                    <li
                      key={p}
                      className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-ink/40 px-3 py-2.5"
                    >
                      <span className="font-semibold text-ivory">{p}</span>
                      <span className="text-fog">{meta}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="how" className="relative border-t border-[var(--line)] bg-ink/60 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-signal">How it works</p>
            <h2 className="font-display max-w-2xl text-4xl font-bold tracking-tight text-ivory md:text-5xl">
              One product URL. Five native formats. Publish-ready.
            </h2>
            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: "Extract Product DNA",
                  body: "Positioning, audience, voice, proof angles — grounded in what your product actually is.",
                },
                {
                  icon: Sparkles,
                  title: "Score viral hooks",
                  body: "Pattern interrupts, curiosity gaps, and experiment stories ranked before you waste a draft.",
                },
                {
                  icon: Radio,
                  title: "Connect & ship",
                  body: "TikTok, Instagram, X, LinkedIn, Reddit — schedule when each network's audience is awake.",
                },
              ].map((item) => (
                <div key={item.title} className="relative">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--line)] bg-ink-soft text-signal">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-ivory">{item.title}</h3>
                  <p className="mt-3 text-fog leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="edge" className="relative border-t border-[var(--line)] py-24">
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-amber">Why Riff wins</p>
            <h2 className="font-display max-w-3xl text-4xl font-bold tracking-tight text-ivory md:text-5xl">
              Not another growth chat. Not another ad factory.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "vs HeyCatch",
                  body: "They plan distribution. Riff writes the scroll-stopping posts — platform-native, scored, and ready to schedule.",
                },
                {
                  title: "vs Zeely",
                  body: "They excel at paid UGC ads. Riff owns organic: hooks, carousels, threads, and community posts that compound without spend.",
                },
                {
                  title: "vs Buffer AI",
                  body: "Caption helpers rewrite what you already have. Riff invents the campaign from Product DNA.",
                },
                {
                  title: "Honest viral scores",
                  body: "Every draft includes a score and a why — so you ship the winners, not the polite ones.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[22px] border border-[var(--line)] bg-ink-elevated/70 p-7"
                >
                  <div className="mb-3 flex items-center gap-2 text-signal">
                    <Zap className="h-4 w-4" />
                    <h3 className="font-display text-lg font-bold text-ivory">{item.title}</h3>
                  </div>
                  <p className="text-fog leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-14">
              <Link href="/studio" className="btn-primary">
                Open the studio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[var(--line)] px-6 py-10 text-center text-sm text-fog">
        <p>
          <span className="font-display font-bold text-ivory">Riff</span> — viral content engineered for
          your product.
        </p>
      </footer>
    </div>
  );
}
