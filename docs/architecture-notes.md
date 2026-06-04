# Architecture Notes

This document is a map of how the game HTML file is organised. Read this before making any edits to the game files.

---

## The single-file structure

The entire game lives in one large HTML file (`game/play.html`, ~18,400 lines). There is no build step, no bundler, and no separate JavaScript files. Everything — CSS, HTML structure, and all JavaScript — is in one file.

Five source files have been extracted and are inlined back into `game/play.html` by `scripts/build_play_html.mjs`. The playable file still ships all content inline, so it works with no build step at runtime. The build script replaces only the regions between these marker comments:

**CSS** (inside the `<style>` block) — source `src/styles/game.css`:
```
/* BEGIN GENERATED CSS: src/styles/game.css */
...generated css...
/* END GENERATED CSS: src/styles/game.css */
```

**Encounter data part 1** (inside the `<script>` block, ~line 1040) — `const encounters` + `const encounterTables`:
```
// BEGIN GENERATED JS: src/data/encounter-data.js [1/2]
...generated js...
// END GENERATED JS: src/data/encounter-data.js [1/2]
```

**Encounter data part 2** (inside the `<script>` block, ~line 6037) — `const hiddenSubtypePools`:
```
// BEGIN GENERATED JS: src/data/encounter-data.js [2/2]
...generated js...
// END GENERATED JS: src/data/encounter-data.js [2/2]
```

**Core utility helpers** (inside the `<script>` block, ~line 5835) — pure stateless helper functions:
```
// BEGIN GENERATED JS: src/utils/core-utils.js
...generated js...
// END GENERATED JS: src/utils/core-utils.js
```

**Profile/storage constants** (inside the `<script>` block, ~line 4481) — seven `const` declarations only:
```
// BEGIN GENERATED JS: src/state/profile-storage-constants.js
...generated js...
// END GENERATED JS: src/state/profile-storage-constants.js
```
This region sits immediately after the `// ===== PROFILE SAVE SYSTEM =====` banner and before `let currentProfileId = null;`, preserving load order. Only the key/cap constants are extracted; all profile functions (`profileLoadStore`, `profileSaveStore`, `profileCreateNew`, etc.), fossil record logic, active-run logic, achievement persistence, and save/load logic remain in `game/play.html`. Profile/storage constants should be edited in `src/state/profile-storage-constants.js`, not inside the generated region of `game/play.html`.

**Run-tracking state factory** (inside the `<script>` block, ~line 4763) — the `freshRunTracking()` function only:
```
// BEGIN GENERATED JS: src/state/run-tracking.js
...generated js...
// END GENERATED JS: src/state/run-tracking.js
```
This region sits between the profile-stats update code and the `[ACHIEVEMENTS]` section, preserving load order. Only the `freshRunTracking()` factory is extracted; profile/save logic, `profileUpdateStats`, achievement logic, and all other run-management code remain in `game/play.html`. The run-tracking state factory should be edited in `src/state/run-tracking.js`, not inside the generated region of `game/play.html`.

**Achievement definitions** (inside the `<script>` block, ~line 4800) — the `ACHIEVEMENT_DEFS` array only:
```
// BEGIN GENERATED JS: src/data/achievement-data.js
...generated js...
// END GENERATED JS: src/data/achievement-data.js
```
This region sits between `freshRunTracking` and `loadAchievements`, preserving load order and access to surrounding functions/globals (e.g. the `check` callbacks reference `socialGroup`). Only the definitions array is extracted; achievement persistence (`loadAchievements`, `saveAchievements`, `checkAchievements`), profile/save logic, and achievement rendering/toast logic remain in `game/play.html`. Achievement definitions should be edited in `src/data/achievement-data.js`, not inside the generated region of `game/play.html`.

`src/data/encounter-data.js` uses a `// << SPLIT: hiddenSubtypePools >>` line to divide part 1 from part 2; the build script splits on it and inlines each part into its region. The split marker itself is not inlined. All other source files have no split marker and each maps to one contiguous region.

**Edit CSS in `src/styles/game.css`, encounter data in `src/data/encounter-data.js`, pure utility helpers in `src/utils/core-utils.js`, achievement definitions in `src/data/achievement-data.js`, run-tracking factory in `src/state/run-tracking.js`, and profile/storage constants in `src/state/profile-storage-constants.js`, then run `node scripts/build_play_html.mjs` — do not hand-edit the generated regions.** The build script never touches code outside the marked regions.

`game/evolution_game_v66_57.html` is the versioned archive of an earlier build. It is a historical snapshot and is not kept byte-in-sync with `game/play.html` between releases; `game/play.html` is the stable public-facing copy that gets replaced on each release.

**Critical consequence:** A single JavaScript syntax error anywhere in the script block prevents the entire game from loading. The browser cannot run any of the script if it fails to parse. This is why `scripts/check_html_js_syntax.mjs` exists and must pass before any game file PR is merged.

---

## File layout (approximate line ranges)

| Lines | Area |
|-------|------|
| 1–990 | HTML head, inline CSS (generated — source in `src/styles/game.css`), HTML body structure |
| 990–1020 | Game version constant (`GAME_VERSION`) |
| 1021–3501 | Static data: encounters + spawn tables — generated, source in `src/data/encounter-data.js` [1/2] |
| 3502–4254 | World generation: terrain, habitats, altitude, water, clay deposits |
| 4253–4478 | Player state object and dynamic world state (waterState, socialGroup, nearbyEntities) |
| 4479–4489 | Profile/storage constants — generated, source in `src/state/profile-storage-constants.js` |
| 4491–4762 | Profile state variables and profile functions (currentProfileId, profileLoadStore, profileSaveStore, etc.) |
| 4763–4794 | Run-tracking state factory (`freshRunTracking`) — generated, source in `src/state/run-tracking.js` |
| 4800–4865 | Achievement definitions (`ACHIEVEMENT_DEFS`, 50 defs) — generated, source in `src/data/achievement-data.js` |
| 4867–5829 | Achievement persistence (load/save/check), profile stats, profiles, save/load, Field Journal, Fossil Record |
| 5830–5924 | Core utility helpers — generated, source in `src/utils/core-utils.js`: pure stateless helpers (clamp, roll, choice, clonePlain, escapeHtml, chooseWeighted, text-sanitisation) |
| 5925–6036 | Remaining [UTILS]: logging, narration setters, noise, risk memory (not extracted — side effects) |
| 6037–6115 | hiddenSubtypePools — generated, source in `src/data/encounter-data.js` [2/2] |
| 6116–7614 | Remaining utilities + turn flow: `startTurn`, `endTurn`, metabolism, ecology tick |
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
- **The CSS region, both encounter-data regions, the core-utils region, the achievement-data region, the run-tracking region, and the profile-storage-constants region in `game/play.html` are generated.** Hand edits are overwritten on the next `node scripts/build_play_html.mjs`. Edit `src/styles/game.css`, `src/data/encounter-data.js`, `src/utils/core-utils.js`, `src/data/achievement-data.js`, `src/state/run-tracking.js`, and `src/state/profile-storage-constants.js` instead. Do not remove any BEGIN/END marker comments or the `// << SPLIT: hiddenSubtypePools >>` line — the build script requires all of them.

---

## Do not touch without checking

- The encounter resolution logic (~11328–12523) — tightly coupled, easy to break survival balance
- The world generation functions — changing these affects the entire map layout and habitat distribution
- The `render()` function and anything that calls it — re-entrancy issues can cause visible glitches
- The bot timer and step logic — race conditions are possible if the timer interval and step validation get out of sync
- The profile save/resume logic — incorrect resets silently lose player data across runs
