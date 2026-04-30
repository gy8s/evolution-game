# Bot Run Consolidated Review — IntelligentBot Saved Log

**Reviewed by**: GPT  
**Review date**: 2026-04-30  
**Consolidated report ID**: 20260430-002  
**Scope**: QA review + proposed IntelligentBot behaviour patch list (no gameplay code changed in this document)

---

## Runs Reviewed

| Run ID | Bot | Actions | Runs | Deaths | Median death turn | Mean death turn | Longest run |
|---|---|---:|---:|---:|---:|---:|---:|
| 20260430-101214 | RandomBot | 1000 | 139 | 138 | 7 | 14 | 75 |
| 20260430-134119 | IntelligentBot | 1000 | 57 | 56 | 36 | 35 | 120 |

Sources:
- `logs/bot-runs/20260430-101214/compact.txt`
- `logs/bot-runs/20260430-134119/compact.txt`
- `logs/bot-runs/20260430-134119/meta.json`

---

## Headline Comparison

1. **IntelligentBot clearly survives longer than RandomBot in this sample**: far fewer resets/runs (57 vs 139) and much higher median run duration (36 vs 7 turns).
2. **The new saved IntelligentBot run still shows concentrated predator mortality** in run summaries (Gastornis, mesonychid-like ground predator, Lesmesodon-like creodont, large constrictor, crocodile).
3. **Hydration collapse is still present** (`"You collapse from dehydration."` appears in multiple runs), indicating the water plan is improved but not fully robust under pressure.
4. **One compact-reporting issue remains visible in the saved log**: `Death causes: unknown: 56` despite rich per-run death contexts in that same file. Treat this as likely stale-export evidence from an older build session or a remaining export-path mismatch to verify in the next run.

---

## Evidence Notes (IntelligentBot run 20260430-134119)

- Patch-gate status is clean: no action crashes/errors; 3 warnings (`WARN_STATIC_QUEUED_ENCOUNTER_DISAPPEARED`).
- Run summary examples show meaningful death context, including:
  - `Gastornis kills you on the forest floor.`
  - `The large constrictor overpowers you.`
  - `The crocodile takes you while you drink.`
  - `The mesonychid-like ground predator keeps contact ... and catches you.`
  - `You collapse from dehydration.`
  - `Parasites and exhaustion wear you down.`
- Duplicate terminal lines per run are still present in run summaries (`reason=player died` and `reason=player died before next action`), so aggregation must continue to dedupe by `runIndex`.

---

## Proposed Behaviour Patch List (next gameplay PR)

> These are proposed gameplay/bot-behaviour changes for a dedicated follow-up PR. They are intentionally separated from tooling/reporting fixes.

### P1 — Immediate anti-predator opening policy (high impact)

When a fatal ground predator/threat is seen in the first ~8 turns, prioritize:
- vertical safety move (if available and safer),
- no exploratory investigate unless known-safe,
- avoid waiting on exposed ground unless all moves are worse.

**Why:** many short deaths still look like rapid predator contact chains.

### P2 — Water approach safety envelope (high impact)

When thirsty, approach water with explicit safety constraints:
- prefer adjacent drink positions over entering water,
- add "recent crocodile/water predator memory" to block risky banks,
- if threat is active nearby, delay drinking and reposition first.

**Why:** at least one explicit crocodile-at-drink death and repeated dehydration indicate unstable thirst-risk tradeoff.

### P3 — Low-hydration panic mode (medium-high impact)

At hydration below a threshold (e.g., <=25):
- stop low-value investigations,
- heavily prioritize safe water routeing,
- reduce energy-costly evasive loops unless predator contact is immediate.

**Why:** several long runs end in dehydration, suggesting indecision or route inefficiency before collapse.

### P4 — Ambush-snake avoidance scoring (medium impact)

Increase avoidance score for known ambush signatures (large constrictor / pitviper-like signals):
- penalize investigate on high-risk encounters while injured or low agility state,
- bias movement away from repeated ambush zones.

**Why:** constrictor deaths remain frequent in sampled run lines.

### P5 — Pursuit break strategy tuning (medium impact)

If active pursuit persists >N turns:
- switch from local evasive oscillation to hard escape policy (vertical change / long directional break / obstacle use).

**Why:** some deaths indicate prolonged predator contact before kill.

---

## Next Validation Plan

1. Run a fresh 1000-step IntelligentBot session after behaviour patch.
2. Export compact + full logs.
3. Compare against this baseline on:
   - deaths,
   - median/mean death turn,
   - dehydration deaths,
   - crocodile/water-edge deaths,
   - top predator causes.
4. Confirm compact death-cause rollup is not all `unknown`.

