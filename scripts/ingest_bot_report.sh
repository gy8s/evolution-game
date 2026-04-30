#!/usr/bin/env bash
# Usage:
#   ./scripts/ingest_bot_report.sh <compact_file> [full_file]
#
# Moves downloaded bot reports into logs/bot-runs/<run-id>/ and writes meta.json.
# Run from the repo root. Optionally pass --commit to auto-commit afterwards.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
COMPACT_FILE=""
FULL_FILE=""
AUTO_COMMIT=0

for arg in "$@"; do
  case "$arg" in
    --commit) AUTO_COMMIT=1 ;;
    *)
      if [ -z "$COMPACT_FILE" ]; then
        COMPACT_FILE="$arg"
      elif [ -z "$FULL_FILE" ]; then
        FULL_FILE="$arg"
      fi
      ;;
  esac
done

if [ -z "$COMPACT_FILE" ]; then
  echo "Usage: $0 <compact_file> [full_file] [--commit]" >&2
  exit 1
fi

if [ ! -f "$COMPACT_FILE" ]; then
  echo "Error: file not found: $COMPACT_FILE" >&2
  exit 1
fi

if [ -n "$FULL_FILE" ] && [ ! -f "$FULL_FILE" ]; then
  echo "Error: file not found: $FULL_FILE" >&2
  exit 1
fi

# Extract metadata from the compact report header
extract_field() {
  grep -m1 "^$1:" "$COMPACT_FILE" | sed "s/^$1: *//" | tr -d '\r' || echo ""
}

GAME_VERSION="$(extract_field "Game version")"
STARTED="$(extract_field "Started")"
ENDED="$(extract_field "Ended")"
STOP_REASON="$(extract_field "Stop reason")"
BOT_ACTIONS="$(extract_field "Bot actions")"
RUNS="$(extract_field "Runs recorded")"
DEATHS="$(extract_field "Deaths")"

# Derive run ID from started timestamp (YYYYMMDD-HHMMSS) or current time
if [ -n "$STARTED" ] && [ "$STARTED" != "not recorded" ]; then
  # Parse ISO timestamp: 2026-04-30T14:30:22.000Z → 20260430-143022
  RUN_ID=$(echo "$STARTED" | sed 's/[-:]//g' | sed 's/T/-/' | cut -c1-15)
else
  RUN_ID=$(date '+%Y%m%d-%H%M%S')
fi

# Short version (e.g. v66.57 from v66.57_patch8_...)
SHORT_VERSION=$(echo "$GAME_VERSION" | cut -d'_' -f1)

RUN_DIR="$REPO_ROOT/logs/bot-runs/${RUN_ID}"

if [ -d "$RUN_DIR" ]; then
  echo "Warning: run directory already exists: $RUN_DIR — appending suffix" >&2
  RUN_DIR="${RUN_DIR}_dup$(date +%S)"
fi

# Derive the effective ID from the actual folder name (may include _dup suffix)
EFFECTIVE_RUN_ID="$(basename "$RUN_DIR")"

mkdir -p "$RUN_DIR"

cp "$COMPACT_FILE" "$RUN_DIR/compact.txt"
if [ -n "$FULL_FILE" ]; then
  cp "$FULL_FILE" "$RUN_DIR/full.txt"
fi

cat > "$RUN_DIR/meta.json" <<EOF
{
  "runId": "${EFFECTIVE_RUN_ID}",
  "gameVersion": "${GAME_VERSION}",
  "shortVersion": "${SHORT_VERSION}",
  "startedAt": "${STARTED}",
  "endedAt": "${ENDED}",
  "stopReason": "${STOP_REASON}",
  "botActions": "${BOT_ACTIONS}",
  "runsRecorded": "${RUNS}",
  "deaths": "${DEATHS}",
  "hasFullReport": $([ -n "$FULL_FILE" ] && echo "true" || echo "false"),
  "ingestedAt": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF

echo "Ingested to: $RUN_DIR"
echo "  compact.txt"
[ -n "$FULL_FILE" ] && echo "  full.txt"
echo "  meta.json"

if [ "$AUTO_COMMIT" -eq 1 ]; then
  cd "$REPO_ROOT"
  REL_DIR="logs/bot-runs/${EFFECTIVE_RUN_ID}"
  git add "$REL_DIR"
  git commit -m "$(cat <<COMMITMSG
Add bot run logs ${EFFECTIVE_RUN_ID} (${SHORT_VERSION})

Started: ${STARTED}
Runs: ${RUNS}, Deaths: ${DEATHS}, Stop: ${STOP_REASON}

https://claude.ai/code/session_01EDFN8t9jAL7uFADpeM1g4p
COMMITMSG
)"
  echo "Committed."
fi
