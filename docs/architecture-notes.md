# Architecture Notes

This document is a map of how the game HTML file is organised. Read this before making any edits to the game files.

---

## The single-file structure

The entire game lives in one large HTML file (`game/play.html`, ~18,400 lines). There is no build step, no bundler, and no separate JavaScript files. Everything — CSS, HTML structure, and all JavaScript — is in one file.

Ten source files have been extracted and are inlined back into `game/play.html` by `scripts/build_play_html.mjs`. The playable file still ships all content inline, so it works with no build step at runtime. The build script replaces only the regions between these marker comments:

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

**Profile factory helpers** (inside the `<script>` block, ~line 4500) — three factory/helper functions:
```
// BEGIN GENERATED JS: src/state/profile-factories.js
...generated js...
// END GENERATED JS: src/state/profile-factories.js
```
This region sits after the profile state variables and before `profileLoadStore`, preserving load order. Only `profileGenerateId`, `profileEmptyStore`, and `profileDefaultStats` are extracted; `profileLoadStore`, `profileSaveStore`, `profileCreateNew`, fossil record logic, active-run logic, achievement persistence, and save/load logic remain in `game/play.html`. The three functions were not contiguous in the original file; they have been consolidated into this single region (safe because `function` declarations are hoisted). Profile factory helpers should be edited in `src/state/profile-factories.js`, not inside the generated region of `game/play.html`.

**Profile store core helpers** (inside the `<script>` block, ~line 4514) — five profile store functions:
```
// BEGIN GENERATED JS: src/state/profile-store-core.js
...generated js...
// END GENERATED JS: src/state/profile-store-core.js
```
This region sits immediately after the profile factory helpers region and before `profileCaptureWorldArrays`, preserving load order. Only `profileLoadStore`, `profileSaveStore`, `profileCreateNew`, `profileGetActive`, and `profileCheckBuildCompatibility` are extracted; `profileCaptureWorldArrays`, `profileCaptureState`, `profileRestoreState`, `profileUpdateStats`, `profileOnRunEnd`, fossil record logic, active-run logic, achievement persistence, and save/load logic remain in `game/play.html`. Profile store core helpers should be edited in `src/state/profile-store-core.js`, not inside the generated region of `game/play.html`.

**Profile state snapshot helpers** (inside the `<script>` block, ~line 4579) — three active-run capture/restore functions:
```
// BEGIN GENERATED JS: src/state/profile-state-snapshot.js
...generated js...
// END GENERATED JS: src/state/profile-state-snapshot.js
```
This region sits immediately after the profile store core region and before `profileKnowledgeCount`, preserving load order. Only `profileCaptureWorldArrays`, `profileCaptureState`, and `profileRestoreState` are extracted; `profileKnowledgeCount`, `profileBuildRunSummary`, `profileUpdateStats`, `profileOnRunEnd`, active-run lifecycle logic, fossil record logic, achievement persistence, and save/load logic remain in `game/play.html`. The saved/restored field names, save schema, and restore order are unchanged. Profile state snapshot helpers should be edited in `src/state/profile-state-snapshot.js`, not inside the generated region of `game/play.html`.

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

**Profile run lifecycle helpers** (inside the `<script>` block) — eight run-summary/run-lifecycle functions, inlined into THREE separate regions because the source functions are not contiguous in `game/play.html` (other already-generated regions and unrelated systems sit between them):
```
// BEGIN GENERATED JS: src/state/profile-run-lifecycle.js [1/3]   (~line 4720)
...profileKnowledgeCount, profileBuildRunSummary, profileRunIsGodMode, profileUpdateStats...
// END GENERATED JS: src/state/profile-run-lifecycle.js [1/3]

// BEGIN GENERATED JS: src/state/profile-run-lifecycle.js [2/3]   (~line 5013)
...profileOnRunEnd, profileSaveActiveRun...
// END GENERATED JS: src/state/profile-run-lifecycle.js [2/3]

// BEGIN GENERATED JS: src/state/profile-run-lifecycle.js [3/3]   (~line 5152)
...profileStartNewRun, profileResumeActiveRun...
// END GENERATED JS: src/state/profile-run-lifecycle.js [3/3]
```
Part [1/3] sits between `profileRestoreState` and the run-tracking region; part [2/3] sits between `updateRunTracking` and the field-journal-state generated region; part [3/3] sits between the field-journal-state generated region and the win-modal section. The functions stay exactly where they were — no code was moved. The achievement system, Field Journal state helpers (now a generated region), and run-tracking/achievement-data generated regions that sit between them are NOT part of this source file. (`profileClearActiveRun` does not exist in the codebase, so it was not extracted.) Profile run lifecycle helpers should be edited in `src/state/profile-run-lifecycle.js`, not inside the generated regions of `game/play.html`.

**Field Journal state/persistence helpers** (inside the `<script>` block, ~line 5107) — four journal helper functions:
```
// BEGIN GENERATED JS: src/state/field-journal-state.js
...profileLoadFieldJournal, profileWriteJournalEntry, getEncounterLogCategory, journalMarkFirstSeen...
// END GENERATED JS: src/state/field-journal-state.js
```
This region sits between the profile-run-lifecycle [2/3] generated region and the profile-run-lifecycle [3/3] generated region. The four functions were contiguous; no split marker was needed. Only these four helpers are extracted; Field Journal rendering, Fossil Record rendering, profile panel rendering, and all other Field Journal code remain in `game/play.html`. Field Journal state helpers should be edited in `src/state/field-journal-state.js`, not inside the generated region of `game/play.html`.

**Achievement persistence helpers** (inside the `<script>` block) — four achievement persistence functions (`loadAchievements`, `saveAchievements`, `awardAchievement`, `checkAchievements`), inlined into THREE separate regions because `getProfileAchievements` (not extracted) and the toast system (`clearToastQueue`, `showAchievementToast`, `_processToastQueue` — not extracted) sit between the four target functions in `game/play.html`:
```
// BEGIN GENERATED JS: src/state/achievement-persistence.js [1/3]   (~line 4877)
...loadAchievements, saveAchievements...
// END GENERATED JS: src/state/achievement-persistence.js [1/3]

// BEGIN GENERATED JS: src/state/achievement-persistence.js [2/3]   (~line 4901)
...awardAchievement...
// END GENERATED JS: src/state/achievement-persistence.js [2/3]

// BEGIN GENERATED JS: src/state/achievement-persistence.js [3/3]   (~line 4946)
...checkAchievements...
// END GENERATED JS: src/state/achievement-persistence.js [3/3]
```
Part [1/3] sits immediately after the achievement-data generated region; part [2/3] sits between the achievement-ui [1/3] and [2/3] regions; part [3/3] sits between the achievement-ui [2/3] and [3/3] regions. The functions stay exactly where they were — no code was moved. Achievement persistence helpers should be edited in `src/state/achievement-persistence.js`, not inside the generated regions of `game/play.html`.

**Achievement UI/support** (inside the `<script>` block) — seven items (`getProfileAchievements`, `_toastQueue`, `_toastActive`, `clearToastQueue`, `showAchievementToast`, `_processToastQueue`, `renderAchievements`), inlined into THREE separate regions because the achievement-persistence [2/3] and [3/3] generated regions sit between the target groups in `game/play.html`:
```
// BEGIN GENERATED JS: src/ui/achievement-ui.js [1/3]   (~line 4896)
...getProfileAchievements...
// END GENERATED JS: src/ui/achievement-ui.js [1/3]

// BEGIN GENERATED JS: src/ui/achievement-ui.js [2/3]   (~line 4919)
..._toastQueue, _toastActive, clearToastQueue, showAchievementToast, _processToastQueue...
// END GENERATED JS: src/ui/achievement-ui.js [2/3]

// BEGIN GENERATED JS: src/ui/achievement-ui.js [3/3]   (~line 4968)
...renderAchievements...
// END GENERATED JS: src/ui/achievement-ui.js [3/3]
```
Part [1/3] sits between the achievement-persistence [1/3] and [2/3] regions; part [2/3] sits between the achievement-persistence [2/3] and [3/3] regions; part [3/3] sits between the achievement-persistence [3/3] region and the run-tracking-update region. Achievement UI/support should be edited in `src/ui/achievement-ui.js`, not inside the generated regions of `game/play.html`.

**Run-tracking update** (inside the `<script>` block, ~line 4999) — the `updateRunTracking` function only:
```
// BEGIN GENERATED JS: src/state/run-tracking-update.js
...updateRunTracking...
// END GENERATED JS: src/state/run-tracking-update.js
```
This region sits immediately after the achievement-ui [3/3] region and before the profile-run-lifecycle [2/3] region. Only `updateRunTracking` is extracted. Run-tracking update should be edited in `src/state/run-tracking-update.js`, not inside the generated region of `game/play.html`.

`src/data/encounter-data.js` uses a `// << SPLIT: hiddenSubtypePools >>` line to divide part 1 from part 2; the build script splits on it and inlines each part into its region. `src/state/profile-run-lifecycle.js` uses two split lines (`// << SPLIT: profileOnRunEnd >>` and `// << SPLIT: profileStartNewRun >>`) to divide its three parts. `src/state/achievement-persistence.js` uses two split lines (`// << SPLIT: awardAchievement >>` and `// << SPLIT: checkAchievements >>`) to divide its three parts. `src/ui/achievement-ui.js` uses two split lines (`// << SPLIT: toastHelpers >>` and `// << SPLIT: renderAchievements >>`) to divide its three parts. The split markers themselves are not inlined. All other source files have no split marker and each maps to one contiguous region.

**Edit CSS in `src/styles/game.css`, encounter data in `src/data/encounter-data.js`, pure utility helpers in `src/utils/core-utils.js`, achievement definitions in `src/data/achievement-data.js`, run-tracking factory in `src/state/run-tracking.js`, profile/storage constants in `src/state/profile-storage-constants.js`, profile factory helpers in `src/state/profile-factories.js`, profile store core helpers in `src/state/profile-store-core.js`, profile state snapshot helpers in `src/state/profile-state-snapshot.js`, profile run lifecycle helpers in `src/state/profile-run-lifecycle.js`, achievement persistence helpers in `src/state/achievement-persistence.js`, Field Journal state helpers in `src/state/field-journal-state.js`, achievement UI/support in `src/ui/achievement-ui.js`, and run-tracking update in `src/state/run-tracking-update.js`, then run `node scripts/build_play_html.mjs` — do not hand-edit the generated regions.** The build script never touches code outside the marked regions.

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
| 4491–4499 | Profile state variables (currentProfileId, currentRunId, runGodModeUsed, etc.) |
| 4500–4512 | Profile factory helpers — generated, source in `src/state/profile-factories.js` |
| 4514–4577 | Profile store core helpers — generated, source in `src/state/profile-store-core.js` |
| 4579–4718 | Profile state snapshot helpers — generated, source in `src/state/profile-state-snapshot.js` |
| 4720–4771 | Profile run lifecycle [1/3] (profileKnowledgeCount, profileBuildRunSummary, profileRunIsGodMode, profileUpdateStats) — generated, source in `src/state/profile-run-lifecycle.js` |
| 4773–4804 | Run-tracking state factory (`freshRunTracking`) — generated, source in `src/state/run-tracking.js` |
| 4810–4875 | Achievement definitions (`ACHIEVEMENT_DEFS`, 50 defs) — generated, source in `src/data/achievement-data.js` |
| 4877–4894 | Achievement persistence [1/3] (loadAchievements, saveAchievements) — generated, source in `src/state/achievement-persistence.js` |
| 4896–4901 | Achievement UI [1/3] (getProfileAchievements) — generated, source in `src/ui/achievement-ui.js` |
| 4903–4917 | Achievement persistence [2/3] (awardAchievement) — generated, source in `src/state/achievement-persistence.js` |
| 4919–4948 | Achievement UI [2/3] (toast queue/helpers) — generated, source in `src/ui/achievement-ui.js` |
| 4950–4966 | Achievement persistence [3/3] (checkAchievements) — generated, source in `src/state/achievement-persistence.js` |
| 4968–4997 | Achievement UI [3/3] (renderAchievements) — generated, source in `src/ui/achievement-ui.js` |
| 4999–5025 | Run-tracking update — generated, source in `src/state/run-tracking-update.js` |
| 5013–5099 | Profile run lifecycle [2/3] (profileOnRunEnd, profileSaveActiveRun) — generated, source in `src/state/profile-run-lifecycle.js` |
| 5107–5158 | Field Journal state/persistence helpers — generated, source in `src/state/field-journal-state.js` |
| 5160–5210 | Profile run lifecycle [3/3] (profileStartNewRun, profileResumeActiveRun) — generated, source in `src/state/profile-run-lifecycle.js` |
| 5204–5851 | Win modal, profile panel UI, profile stats, profiles, save/load, Field Journal render, Fossil Record |
| 5853–5942 | Core utility helpers — generated, source in `src/utils/core-utils.js`: pure stateless helpers (clamp, roll, choice, clonePlain, escapeHtml, chooseWeighted, text-sanitisation) |
| 5943–6068 | Remaining [UTILS]: logging, narration setters, noise, risk memory (not extracted — side effects) |
| 6069–6147 | hiddenSubtypePools — generated, source in `src/data/encounter-data.js` [2/2] |
| 6148–7646 | Remaining utilities + turn flow: `startTurn`, `endTurn`, metabolism, ecology tick |
| 7645–8461 | Nearby entity simulation: spawning, persistence, world registry |
| 8462–11359 | Social system, same-species encounters, group management, calls |
| 11360–11858 | Threat and predator logic: pursuit, escalation, flee/fight resolution |
| 11859–12555 | Player action handlers: move, eat, drink, climb, wait, groom, look, etc. |
| 12556–14503 | Investigation system, carcass interactions, encounter resolution helpers, Field Journal render |
| 14504–15871 | Bot/QA: `botState`, strategy, step execution, goal planner, loop detection |
| 15872–16719 | Debug helpers: compact/full report generation, GitHub API push, debug downloads |
| 16720–17172 | Rendering helpers: encounter card HTML builder, button state logic |
| 17173–18466 | Main `render()` function, event listeners, game initialisation call, tag extension pass |

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
- **The CSS region, both encounter-data regions, the core-utils region, the achievement-data region, the run-tracking region, the profile-storage-constants region, the profile-factories region, the profile-store-core region, the profile-state-snapshot region, and the three profile-run-lifecycle regions in `game/play.html` are generated.** Hand edits are overwritten on the next `node scripts/build_play_html.mjs`. Edit `src/styles/game.css`, `src/data/encounter-data.js`, `src/utils/core-utils.js`, `src/data/achievement-data.js`, `src/state/run-tracking.js`, `src/state/profile-storage-constants.js`, `src/state/profile-factories.js`, `src/state/profile-store-core.js`, `src/state/profile-state-snapshot.js`, and `src/state/profile-run-lifecycle.js` instead. Do not remove any BEGIN/END marker comments, the `// << SPLIT: hiddenSubtypePools >>` line, or the `// << SPLIT: profileOnRunEnd >>` / `// << SPLIT: profileStartNewRun >>` lines — the build script requires all of them.

---

## Do not touch without checking

- The encounter resolution logic (~11328–12523) — tightly coupled, easy to break survival balance
- The world generation functions — changing these affects the entire map layout and habitat distribution
- The `render()` function and anything that calls it — re-entrancy issues can cause visible glitches
- The bot timer and step logic — race conditions are possible if the timer interval and step validation get out of sync
- The profile save/resume logic — incorrect resets silently lose player data across runs
