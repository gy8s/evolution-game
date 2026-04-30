# Bug Guardrails / Lessons Learned

This document records serious bugs or coding errors that caused avoidable breakage or rework.

Purpose:
- make repeated mistakes visible,
- turn each bug into a future prevention check,
- give GPT, Claude, and human reviewers a shared checklist before approving patches.

When to add an entry:
- a patch breaks game rendering or core playability,
- a syntax/runtime error prevents the game from loading,
- a bug is repeated across more than one patch or assistant,
- a bot/debug/reporting failure creates misleading evidence,
- a bug causes significant avoidable rework.

Each entry should include:
- what failed,
- symptom seen by the player/tester,
- root cause,
- affected files/area,
- future guardrail,
- required PR check.

---

## BG-001 — JavaScript syntax error prevents full game initialisation

**Status:** Active guardrail

**Observed failure:**
A patch introduced a bare `try {` wrapper with no matching `catch` or `finally` around an inner try/catch/finally block.

**Player/tester symptom:**
The page opened, but the game itself did not initialise correctly: no map and no creatures/encounters.

**Root cause:**
The playable build is a large HTML file with embedded JavaScript. A syntax error anywhere in the script prevents the browser from parsing and running the whole script.

**Known affected area:**
- `game/play.html`
- `game/evolution_game_v66_57.html`
- especially bot/debug/tooling edits inside the main script block

**Future guardrail:**
Any PR touching game HTML, bot/debug tooling, or app-loading behaviour must include a syntax/render smoke check before it is described as complete or safe.

**Required PR check:**
- Run `node scripts/check_html_js_syntax.mjs`, or an equivalent JavaScript syntax check, once available.
- Open `game/play.html` in a browser.
- Confirm map, player/status UI, core controls, and at least one action/turn work.
- Check browser console for red JavaScript errors.

**Reviewer instruction:**
If this check was not run, the reviewer must say so plainly. Do not approve based only on a diff review.

---

## BG-002 — CHANGELOG omitted after repo or code changes

**Status:** Active guardrail

**Observed failure:**
Several merged PRs were not recorded in `CHANGELOG.txt` and later had to be added retrospectively.

**Player/tester symptom:**
Not directly visible in gameplay, but repo history became harder to follow and traceability was weakened.

**Root cause:**
The changelog update was treated as optional or easy to forget instead of a mandatory part of every repo/code change.

**Known affected area:**
- all PRs that change code, documentation, workflow, app-loading files, bot/debug tools, or repo structure

**Future guardrail:**
Every PR must explicitly address changelog status.

**Required PR check:**
- Add a timestamped plain-English entry to `CHANGELOG.txt`.
- State who made the change.
- State whether gameplay logic, UI/layout, bot/debug tools, app-loading behaviour, or documentation changed.
- If the changelog was intentionally not updated, explain why in the PR.

**Reviewer instruction:**
Do not describe a PR as ready to merge unless `CHANGELOG.txt` status is explicitly confirmed.

---

## BG-003 — Bot compact death-cause summaries must use meaningful source fields and dedupe runs

**Status:** Active guardrail

**Observed failure:**
Compact bot summaries reported deaths mostly as `unknown` and could over-count deaths because duplicate run summaries for the same `runIndex` were both counted.

**Player/tester symptom:**
QA evidence in compact exports became misleading: detailed run lines showed meaningful encounter/predator context, while the top-level death-cause rollup hid that context and inflated totals.

**Root cause:**
Death-cause aggregation used shallow fallback fields (`cause/type`) and did not deduplicate repeated per-run terminal summaries before counting.

**Known affected area:**
- `game/play.html`
- `game/evolution_game_v66_57.html`
- bot compact report/export functions (`compactDeathStats`, related helpers)

**Future guardrail:**
Compact report summaries must derive death causes from the richest available death context and must deduplicate by `runIndex` before aggregate counting.

**Required PR check:**
- Verify compact death-cause output contains meaningful encounter/context labels when present.
- Verify duplicate terminal summaries for one `runIndex` do not increase death totals.
- Run `node scripts/check_html_js_syntax.mjs` after HTML script edits.

**Reviewer instruction:**
If a compact report still shows mostly `unknown` while run-level context is present, or if duplicate run records inflate counts, block merge until fixed.

---

## Entry template for future bugs

```md
## BG-XXX — Short name

**Status:** Active guardrail / Retired / Superseded by automated check

**Observed failure:**

**Player/tester symptom:**

**Root cause:**

**Known affected area:**

**Future guardrail:**

**Required PR check:**

**Reviewer instruction:**
```
