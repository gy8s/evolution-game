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

## BG-004 — Documentation drift: docs not updated alongside code changes

**Status:** Active guardrail

**Observed failure:**
Multiple PRs were merged without updating documentation that described the affected systems. Over time, `docs/architecture-notes.md` described line ranges from an earlier build (~13,400 lines) while the actual file had grown to ~18,400 lines. Systems added since the docs were last written (profiles, saves, Field Journal, Fossil Record, Achievements) were absent from architecture documentation entirely.

**Player/tester symptom:**
Not directly visible in gameplay, but the codebase became harder to oversee. Reviewers and AI assistants had to guess at structure rather than reading reliable documentation.

**Root cause:**
Documentation updates were not treated as a mandatory part of the PR process. No PR template section required authors to explicitly check whether docs were affected.

**Known affected area:**
- All documentation files whenever code, structure, systems, or workflow change.
- Specifically: `README.md`, `docs/current-game-structure.md`, `docs/architecture-notes.md`, `docs/project-plan.md`, `docs/bug-guardrails.md`, `docs/release-checklist.md`, `.github/pull_request_template.md`, `CLAUDE.md`.

**Future guardrail:**
Every PR must explicitly confirm documentation status using one of these two forms in the PR body:

- `Documentation updated: [list of files]`
- `Documentation checked; no wider docs required because: [specific reason]`

Silence on documentation impact is a process failure.

**Required PR check:**
- Check `docs/documentation-map.md` to identify which documents apply to the change.
- Update any affected document in the same PR.
- Include the documentation gate statement in the PR body.

**Reviewer instruction:**
Do not describe a PR as complete, safe, or ready to merge unless the documentation gate statement is present in the PR body.

---

## BG-005 — isInvertebrateEncounter regex gap causes wrong sex assignment for invertebrate encounters

**Status:** Active guardrail

**Observed failure:**
`isInvertebrateEncounter()` in `game/play.html` uses a hardcoded regex against the encounter key and name. New invertebrate encounter entries (`antSwarm`, `titanomyrma`, `titanomyrmaSwarm`, `treeCrab`, `freshwaterCrayfish`) were added to `src/data/encounter-data.js` without extending the regex, causing them to fall through to the sex-determination path that assigns male/female pronouns. Invertebrates should return no sex.

**Player/tester symptom:**
Ant and crab/crayfish encounters received male or female sex descriptors in flavour text and pronoun resolution paths — grammatically and ecologically wrong.

**Root cause:**
The classification function is maintained manually as a regex literal. Every new invertebrate encounter key must be added to the regex at `isInvertebrateEncounter()`. There is no automated check or shared list.

**Known affected area:**
- `game/play.html` — `isInvertebrateEncounter()` function
- Any new entry in `src/data/encounter-data.js` that is an invertebrate but does not contain the existing regex terms in its key or name

**Future guardrail:**
When adding any new encounter entry to `src/data/encounter-data.js`, explicitly check whether it is an invertebrate. If so, verify that its key or name matches at least one term in the `isInvertebrateEncounter` regex. If not, add the term before opening the PR.

**Required PR check:**
- Search `isInvertebrateEncounter` in `game/play.html`.
- Confirm every invertebrate encounter key or name contains a term in the regex.
- If a new invertebrate was added, confirm the regex was extended to cover it.

**Reviewer instruction:**
If a PR adds any new invertebrate encounter entry, explicitly check `isInvertebrateEncounter` coverage. Block merge if the regex was not updated.

---

## BG-006 — addLog + setNarration dual-call causes event text to appear twice in the scene panel

**Status:** Active guardrail

**Observed failure:**
A no-encounter danger-layer warning was passed to both `addLog()` (which writes to the event alert box) and `setNarration()` (which writes to the scene description body). The same sentence appeared in both places in the same render cycle.

**Player/tester symptom:**
Identical text shown in the brown alert box at the top of the scene panel AND in the plain scene description text immediately below it.

**Root cause:**
`setNarration()` sets `lastNarration`, which the scene body renderer reads directly. Any code path that calls both `addLog(text)` and `setNarration(text)` with the same string will duplicate the text in the UI. Only one of the two should be used for any given string. Event notifications belong in `addLog`; scene-state descriptions belong in `setNarration`.

**Known affected area:**
- `game/play.html` — any code path calling `addLog` and `setNarration` with the same string

**Future guardrail:**
When writing code that produces a player-facing string, decide whether it is an event (use `addLog`) or a scene state (use `setNarration`). Do not call both with the same text.

**Required PR check:**
- Search for `setNarration` calls adjacent to `addLog` calls and verify they are not using the same string.

**Reviewer instruction:**
If a PR adds a code path that calls both `addLog(text)` and `setNarration(text)` with the same content, flag it before merge.

---

## BG-007 — hiddenSubtypeSuspicionText uses animal-predation language for forage/plant hidden subtypes

**Status:** Active guardrail

**Observed failure:**
`hiddenSubtypeSuspicionText()` returns investigation narration that references "prey", "defended", and "bold warning cues, little fear, no hurry to escape" — all of which are animal-predation framing. When a poisonous forage item (e.g., brown mushrooms) spawned as a hidden-subtype variant, investigation showed "Slow, exposed prey is often defended. This one deserves care." for a fungus.

**Player/tester symptom:**
Investigation text for a mushroom read as if the player were investigating a defensive animal.

**Root cause:**
`hiddenSubtypeSuspicionText()` had no `kind` check. The rank >= 4 and rank >= 2 branches generated text written for animals regardless of the encounter's kind.

**Known affected area:**
- `game/play.html` — `hiddenSubtypeSuspicionText()` function

**Future guardrail:**
When writing investigation or suspicion text in `hiddenSubtypeSuspicionText()`, add a `kind !== "animal"` guard for any branch whose language is specific to animals (predator posture, prey behaviour, escape response, etc.).

**Required PR check:**
- If modifying `hiddenSubtypeSuspicionText()`, verify that all return branches are checked: does the narration text make sense for both an animal and a forage/plant/nest/remedy item?

**Reviewer instruction:**
If investigation text contains "prey", "defended", "flee", "posture", or similar animal-behaviour language in a branch that can fire for forage items, flag it before merge.

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
