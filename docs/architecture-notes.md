# Architecture Notes

This document is a map of how the game HTML file is organised. Read this before making any edits to the game files.

---

## The single-file structure

The game runs from one large HTML file (`game/play.html`, ~18,400 lines). There is no bundler and no separate JavaScript files: HTML structure and all JavaScript are inline.

As of the first extraction step, **CSS is the exception**. Its source lives in `src/styles/game.css` and is inlined back into `game/play.html` by `scripts/build_play_html.mjs`, which replaces only the region between these marker comments inside the `<style>` block:

```
/* BEGIN GENERATED CSS: src/styles/game.css */
...generated css...
/* END GENERATED CSS: src/styles/game.css */
```

The playable file still ships its CSS inline, so it works with no build step at runtime. **Edit CSS in `src/styles/game.css` and run `node scripts/build_play_html.mjs` — do not hand-edit the generated region.** The build script never touches JavaScript or HTML structure.

`game/evolution_game_v66_57.html` is the versioned archive of an earlier build. It is a historical snapshot and is not kept byte-in-sync with `game/play.html` between releases; `game/play.html` is the stable public-facing copy that gets replaced on each release.

**Critical consequence:** A single JavaScript syntax error anywhere in the script block prevents the entire game from loading. The browser cannot run any of the script if it fails to parse. This is why `scripts/check_html_js_syntax.mjs` exists and must pass before any game file PR is merged.

---

## File layout (approximate line ranges)

| Lines | Area |
|-------|------|
| 1–990 | HTML head, CSS styles, HTML body structure (UI panels, buttons, modals) |
| 990–1020 | Game version constant (`GAME_VERSION`) |
| 1021–3413 | Static data: encounter definitions (~100+ encounters with spawn, poison, natural-history blocks) |
| 3414–3630 | Spawn tables: layer-based encounter probability lists |
| 3631–4252 | World generation: terrain, habitats, altitude, water, clay deposits |
| 4253–4791 | Player state object and dynamic world state (waterState, socialGroup, nearbyEntities) |
| 4792–5829 | Achievements (50 defs), profiles, save/load, Field Journal, Fossil Record |
| 5830–6281 | Core utilities: logging, clamping, cloning, debug tracing, invariant checks |
| 6282–7612 | Turn flow: `startTurn`, `endTurn`, metabolism, time of day, ecology tick |
| 7613–8429 | Nearby entity simulation: spawning, persistence, world registry |
| 8430–11327 | Social system, same-species encounters, group management, calls |
| 11328–11826 | Threat and predator logic: pursuit, escalation, flee/fight resolution |
| 11827–12523 | Player action handlers: move, eat, drink, climb, wait, groom, look, etc. |
| 12524–14471 | Investigation system, carcass interactions, encounter resolution helpers, Field Journal render |
| 14472–15839 | Bot/QA: `botState`, strategy, step execution, goal planner, loop detection |
| 15840–16687 | Debug helpers: compact/full report generation, GitHub API push, debug downloads |
| 16688–17140 | Rendering helpers: encounter card HTML builder, button state logic |
| 17141–18434 | Main `render()` function, event listeners, game initialisation call, tag extension pass |

---

## Key areas explained

### Game state
The player state is a single object (`player`) with fields for position, fitness, energy, hydration, growth, poison, alcohol, parasites, knowledge, and run tracking. World state is stored in flat arrays indexed by tile coordinates. The two must be treated separately: world state is not saved between runs; player knowledge and profile data are.

### World/map generation
The world is generated once at startup. It is a fixed grid (`WORLD_SIZE` × `WORLD_SIZE`). Habitats, altitude, terrain, and water are all generated procedurally. There is no save/load of world state between runs.

### Encounters
Encounters are defined in a static data table (~100+ entries). An active encounter is tracked in `currentEncounter`. Encounters have a `dangerProfile`, `temperament`, `persistence` type, and optional `naturalHistory` blocks. The investigation system builds per-encounter knowledge that feeds the Field Journal.

### Player actions
Every player action (move, wait, drink, groom, etc.) follows the same pattern: `startTurn()` → action logic → `endTurn()` → `render()`. The bot calls the same action functions that the player UI does.

### Profiles and saves
Multiple profiles are supported. All persistence uses `localStorage` under versioned keys. Each profile stores cross-run stats, Field Journal knowledge, achievements, the Fossil Record, and an active run snapshot (restorable if the tab is closed mid-run).

### Field Journal, Fossil Record, and Achievements
- **Field Journal**: accumulates knowledge about encounter types across runs. Knowledge tiers (0–30) unlock natural-history text and gameplay tips.
- **Fossil Record**: stores the last 10 run outcomes per profile (turns survived, cause of death, companions, date).
- **Achievements**: 50 definitions checked each turn, on death, and at run end. Stored per profile; displayed in the Field Journal's Awards tab.

### Bot / debug tools
The bot (`botState`) runs the game automatically using a weighted strategy with a goal planner and loop detection. It records every step, validates invariants after each action, and accumulates QA issues. When it stops, compact and full reports are generated and can be pushed to GitHub via the API.

### Logging / reporting
Two logging layers:
- `debugLog` — structured per-turn log, max 5,000 entries, included in debug downloads
- `debugTrace` — raw diagnostic events, max 8,000 entries

Bot reports have two formats:
- **Compact** — QA issues, death-cause rollup, run summary table, patch gate summary. Use for routine review.
- **Full** — everything above plus per-step snapshots and raw JSON. Use only for deep debugging.

### Rendering
All rendering is done by a single `render()` call that redraws the map, UI panels, vitals bars, encounter card, and button states. There is no virtual DOM or reactive framework — it is direct DOM manipulation. `render()` is always the last call in `endTurn()`.

---

## Known fragile areas

- **Any syntax error in the `<script>` block breaks the entire game.** Always run the syntax check.
- **The bot auto-save uses the GitHub API directly from the browser.** It requires a fine-grained PAT with `Contents: read and write`. The PAT is stored in `sessionStorage` and clears when the tab closes.
- **`game/play.html` and `game/evolution_game_v66_57.html` must be kept in sync** on each release. If you edit one, copy the change to the other, or replace `play.html` entirely.
- **`index.html` and `manifest.json` must both reference `game/play.html`.** The syntax check script verifies `index.html`. Check `manifest.json` manually on releases.
- **`player.knowledge` / `player.classKnowledge`** accumulate across runs and feed the Field Journal. Incorrect resets at run boundaries lose journal data permanently.
- **The CSS region in `game/play.html` is generated.** Editing it by hand will be overwritten on the next `node scripts/build_play_html.mjs`. Edit `src/styles/game.css` instead. Do not remove the BEGIN/END marker comments — the build script needs them to find the region.

---

## Do not touch without checking

- The encounter resolution logic (~11328–12523) — tightly coupled, easy to break survival balance
- The world generation functions — changing these affects the entire map layout and habitat distribution
- The `render()` function and anything that calls it — re-entrancy issues can cause visible glitches
- The bot timer and step logic — race conditions are possible if the timer interval and step validation get out of sync
- The profile save/resume logic — incorrect resets silently lose player data across runs
