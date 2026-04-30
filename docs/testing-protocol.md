# Testing Protocol

This document defines what testing is required before a PR can be considered ready to merge. Claude and GPT should follow these levels consistently and not invent different standards per patch.

---

## Test levels

### Level 0 — Documentation only
No code changed. No render test required.

Examples: updating README, CHANGELOG, docs folder, issue templates.

### Level 1 — App structure or loading touched
Any change to `game/play.html`, `game/evolution_game_v66_57.html`, `index.html`, `manifest.json`, or anything that affects how the game loads.

Required:
- Run `node scripts/check_html_js_syntax.mjs` — must pass
- Open `game/play.html` in a browser
- Confirm: map visible, player UI visible, action controls visible, no red console errors
- Take at least one action/turn

### Level 2 — Gameplay logic touched
Any change to how the game works: movement, encounters, survival stats, ecology, actions.

Required:
- Everything in Level 1
- Run a short bot session (100–200 steps)
- Confirm bot completes without crashing
- Check QA issue count is not significantly higher than before the change

### Level 3 — Ecology or balance touched
Changes to spawn rates, habitat rules, predator/prey behaviour, stat scaling, or anything affecting long-term survival.

Required:
- Everything in Level 2
- Run a full bot session (1000 steps)
- Save the compact log to the repo
- Note any significant change in death rate or QA issue count

### Level 4 — Release candidate
The build that will become the stable version on `game/play.html`.

Required:
- Everything in Level 3
- Multiple bot runs across different sessions if possible
- A consolidated report produced and saved to `logs/consolidated/`
- Manual playtest by the owner
- All items on `docs/release-checklist.md` ticked

---

## Log usage guide

**Compact log** — use for routine review. Contains all QA issues, run summaries, and patch gate summary. Start here.

**Full log** — use only for targeted deep dives. Contains per-step before/after snapshots. Large file; only pull it up if the compact log flags something specific that needs tracing.

**Consolidated report** — produced by Claude or GPT after reviewing one or more compact logs. Saved to `logs/consolidated/`. Used to decide what goes into the next patch.

---

## What counts as blocking

A PR is **blocked** if any of these are true:

- `node scripts/check_html_js_syntax.mjs` fails
- The game does not load (blank screen, no map, no player UI)
- A red JavaScript error appears in the browser console on load
- The bot crashes with `ERR_ACTION_EXCEPTION` at a rate significantly above the baseline
- An existing bug guardrail in `docs/bug-guardrails.md` is triggered and not addressed

---

## What can be parked

The following do not block a PR but should be noted in the CHANGELOG:

- New QA warnings (`WARN_*`) that existed before the change
- Minor layout issues on specific screen sizes
- Bot survival rate changes within normal variance
