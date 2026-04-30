# Architecture Notes

This document is a map of how the game HTML file is organised. Read this before making any edits to the game files.

---

## The single-file structure

The entire game lives in one large HTML file (`game/play.html`, ~13,400 lines). There is no build step, no bundler, and no separate JavaScript files. Everything — CSS, HTML structure, and all JavaScript — is in one file.

`game/evolution_game_v66_57.html` is the versioned archive of the same build. `game/play.html` is the stable public-facing copy that gets replaced on each release.

**Critical consequence:** A single JavaScript syntax error anywhere in the script block prevents the entire game from loading. The browser cannot run any of the script if it fails to parse. This is why `scripts/check_html_js_syntax.mjs` exists and must pass before any game file PR is merged.

---

## File layout (approximate line ranges)

| Lines | Area |
|-------|------|
| 1–700 | HTML head, CSS styles, HTML body structure (UI panels, buttons, modals) |
| 700–780 | Game constants (`GAME_VERSION`, world size, layer names, etc.) |
| 780–2050 | Static data: encounter definitions, spawn tables |
| 2050–2860 | World generation: habitat, altitude, terrain, water, clay deposits |
| 2860–3340 | Game state helpers: water tiles, habitat change, debug logging infrastructure |
| 3340–5000 | Player actions: movement, drinking, grooming, climbing, waiting |
| 5000–8000 | Encounter system: active encounters, pursuit, resolution, combat |
| 8000–10000 | Group/social system, ecology, world tick, spawning |
| 10000–10900 | Bot infrastructure: `botState` object, QA issue tracking, run summaries |
| 10900–11250 | Bot execution: `runRandomBot`, `stepRandomBot`, `stopRandomBot` |
| 11250–12120 | Bot reporting and GitHub auto-save |
| 12120–13200 | Rendering: map, UI panels, status bars, button state |
| 13200–13400 | Event listener setup and game initialisation |

---

## Key areas explained

### Game state
The player state is a single object (`player`) with fields for position, fitness, energy, hydration, death status, and current layer. World state is stored in flat arrays indexed by tile coordinates.

### World/map generation
The world is generated once at startup. It is a fixed grid (`WORLD_SIZE` × `WORLD_SIZE`). Habitats, altitude, terrain, and water are all generated procedurally. There is no save/load of world state.

### Encounters
Encounters are defined in a static data table. An active encounter is tracked in a separate object. Encounters can be: passive (observation), social, predator, prey, or environmental. Each has its own resolution logic.

### Player actions
Every player action (move, wait, drink, groom, etc.) follows the same pattern: validate → execute → advance turn → log → render. The bot calls the same action functions that the player UI does.

### Bot / debug tools
The bot (`botState`) runs the game automatically by picking random valid actions on a timer. It records every step, validates game invariants after each action, and accumulates QA issues. When it stops, it can push reports directly to GitHub via the API.

### Logging / reporting
Two logging layers:
- `debugLog` — structured per-turn log, max 5,000 entries, included in debug downloads
- `debugTrace` — raw diagnostic events, max 8,000 entries

Bot reports have two formats:
- **Compact** — QA issues, run summaries, patch gate summary. Use for routine review.
- **Full** — everything above plus per-step snapshots and raw JSON. Only needed for deep debugging.

### Rendering
All rendering is done by a single `render()` call that redraws the map, UI panels, and button states. There is no virtual DOM or reactive framework — it is direct DOM manipulation.

---

## Known fragile areas

- **Any syntax error in the `<script>` block breaks the entire game.** Always run the syntax check.
- **The bot auto-save uses the GitHub API directly from the browser.** It requires a fine-grained PAT with `Contents: read and write`. The PAT is stored in `sessionStorage` and clears when the tab closes.
- **`game/play.html` and `game/evolution_game_v66_57.html` must be kept in sync** on each release. If you edit one, copy the change to the other, or replace `play.html` entirely.
- **`index.html` and `manifest.json` must both reference `game/play.html`.** The syntax check script verifies `index.html`. Check `manifest.json` manually on releases.

---

## Do not touch without checking

- The encounter resolution logic (lines ~5000–8000) — tightly coupled, easy to break survival balance
- The world generation functions — changing these affects the entire map layout and habitat distribution
- The `render()` function and anything that calls it — re-entrancy issues can cause visible glitches
- The bot timer and step logic — race conditions are possible if the timer interval and step validation get out of sync
