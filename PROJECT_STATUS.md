# Riff — Project Status

## Vision
AI social marketing studio that turns any product into platform-native viral content and publishes across channels — sharper than HeyCatch (growth planning) and Zeely (paid ad creatives) on **organic viral content quality + multi-platform native formats**.

## Product: Riff
Tagline: *Viral content engineered for your product.*

## Differentiation shipped
- Product DNA scan from URL (+ optional hint)
- Viral Hook Engine with scores
- Platform-native packs: TikTok, Instagram, X, LinkedIn, Reddit
- Connect accounts + schedule queue
- AI Gateway generation with demo engine fallback

## Stack
Next.js 16 · Tailwind 4 · AI SDK · Framer Motion · Syne/Manrope

## Batches
| Batch | Status | Notes |
|-------|--------|-------|
| 1. Scaffold + landing | done | Brand-first hero |
| 2. Studio + APIs | done | `/api/analyze`, `/api/generate` |
| 3. Connect + calendar | done | Local persistence |
| 4. Verify + walkthrough | done | E2E browser flow passed locally |
| 5. Deploy / GitHub sync | partial | Vercel deploy created then 403 on redeploy; GitHub MCP write 403 |

## Local
```bash
cd /agent/riff && npm run dev
```
Open http://localhost:3000 → `/studio`

## Walkthrough artifacts
`walkthrough/01-landing.webp` … `05-calendar.webp`

## Next (when credentials available)
1. Push to GitHub (`riff` / `riff-studio` repos exist but token lacks contents:write)
2. Wire real OAuth for TikTok / Meta / X / LinkedIn / Reddit
3. Set `AI_GATEWAY_API_KEY` for live model packs
4. Persist campaigns in a database (Neon/Postgres) instead of localStorage

## GitHub (2026-09-06)
- Created public repo: https://github.com/Kloawcody/riff-app
- Also exists: https://github.com/Kloawcody/riff-studio
- Cursor GitHub MCP token can create repos + read, but **Contents write returns 403**
- To upload code: grant the GitHub connection **Contents: Read and write**, then re-run the agent, OR run:
  `GITHUB_TOKEN=ghp_xxx ./scripts/push-to-github.sh`
