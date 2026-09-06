#!/usr/bin/env bash
# Push Riff source to GitHub using a personal access token with Contents: Write
# Usage: GITHUB_TOKEN=ghp_xxx ./scripts/push-to-github.sh
set -euo pipefail
OWNER="${GITHUB_OWNER:-Kloawcody}"
REPO="${GITHUB_REPO:-riff-app}"
BRANCH="${GITHUB_BRANCH:-main}"
TOKEN="${GITHUB_TOKEN:?Set GITHUB_TOKEN with repo contents write}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
API="https://api.github.com/repos/$OWNER/$REPO/contents"

put_file() {
  local path="$1"
  local abs="$ROOT/$path"
  local b64
  b64=$(base64 -w0 < "$abs")
  local sha
  sha=$(curl -s -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
    "$API/$path?ref=$BRANCH" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('sha',''))" 2>/dev/null || true)
  local body
  if [ -n "$sha" ]; then
    body=$(python3 -c "import json,sys; print(json.dumps({'message': f'add {sys.argv[1]}', 'content': sys.argv[2], 'branch': sys.argv[3], 'sha': sys.argv[4]}))" "$path" "$b64" "$BRANCH" "$sha")
  else
    body=$(python3 -c "import json,sys; print(json.dumps({'message': f'add {sys.argv[1]}', 'content': sys.argv[2], 'branch': sys.argv[3]}))" "$path" "$b64" "$BRANCH")
  fi
  echo "→ $path"
  curl -s -X PUT -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
    -H "Content-Type: application/json" \
    "$API/$path" -d "$body" | python3 -c "import sys,json; d=json.load(sys.stdin); print('  ok' if 'content' in d else d)" 
}

FILES=(
  ".env.example"
  ".gitignore"
  "AGENTS.md"
  "CLAUDE.md"
  "PROJECT_STATUS.md"
  "README.md"
  "eslint.config.mjs"
  "next-env.d.ts"
  "next.config.ts"
  "package-lock.json"
  "package.json"
  "postcss.config.mjs"
  "public/file.svg"
  "public/globe.svg"
  "public/next.svg"
  "public/vercel.svg"
  "public/window.svg"
  "src/app/api/analyze/route.ts"
  "src/app/api/generate/route.ts"
  "src/app/globals.css"
  "src/app/layout.tsx"
  "src/app/page.tsx"
  "src/app/studio/page.tsx"
  "src/lib/demo-content.ts"
  "src/lib/platforms.ts"
  "src/lib/store.ts"
  "src/lib/types.ts"
  "tsconfig.json"
)

for f in "${FILES[@]}"; do
  put_file "$f"
done
echo "Done → https://github.com/$OWNER/$REPO"
