# Release Checklist

Run through this every time a new version becomes the stable build.

---

## Version and files

- [ ] `GAME_VERSION` constant in the game HTML updated to the new version string
- [ ] New versioned HTML file created (e.g. `game/evolution_game_v68_00.html`)
- [ ] `game/play.html` replaced with the new build
- [ ] `index.html` still points to `game/play.html` (not a versioned filename)
- [ ] `manifest.json` `start_url` still set to `game/play.html`

## Build step

- [ ] If `src/styles/game.css` was changed, `node scripts/build_play_html.mjs` was run to inline the CSS into `game/play.html`
- [ ] If `src/data/encounter-data.js` was changed, `node scripts/build_play_html.mjs` was run to inline the encounter data into `game/play.html`
- [ ] If `src/utils/core-utils.js` was changed, `node scripts/build_play_html.mjs` was run to inline the utility helpers into `game/play.html`
- [ ] If `src/data/achievement-data.js` was changed, `node scripts/build_play_html.mjs` was run to inline the achievement definitions into `game/play.html`
- [ ] If `src/state/run-tracking.js` was changed, `node scripts/build_play_html.mjs` was run to inline the run-tracking factory into `game/play.html`
- [ ] If `src/state/profile-storage-constants.js` was changed, `node scripts/build_play_html.mjs` was run to inline the profile/storage constants into `game/play.html`
- [ ] The generated regions in `game/play.html` were not hand-edited (CSS → `src/styles/game.css`; encounter data → `src/data/encounter-data.js`; utility helpers → `src/utils/core-utils.js`; achievement defs → `src/data/achievement-data.js`; run-tracking factory → `src/state/run-tracking.js`; profile/storage constants → `src/state/profile-storage-constants.js`)

## Syntax and render check

- [ ] `node scripts/check_html_js_syntax.mjs` passed
- [ ] `game/play.html` opened in browser — map visible, player UI visible, no console errors
- [ ] At least one action taken to confirm the game runs

## Bot testing

- [ ] At least one full bot run (1000 steps) completed on the new build
- [ ] Compact log saved to `logs/bot-runs/`
- [ ] No new `ERR_*` errors compared to previous build
- [ ] Consolidated report produced if multiple runs were done

## Documentation gate

Check `docs/documentation-map.md` to identify which files apply to this release.

- [ ] `CHANGELOG.txt` updated with a plain-English entry
- [ ] `docs/current-game-structure.md` checked — line ranges and system descriptions still accurate
- [ ] `docs/architecture-notes.md` checked — line ranges still accurate; new fragile areas noted
- [ ] `docs/bug-guardrails.md` checked — any new lessons from this patch added
- [ ] `docs/project-plan.md` updated if design or phase changed
- [ ] `README.md` updated if build version, layout, or workflow changed
- [ ] PR body includes documentation gate statement: `Documentation updated: [files]` or `Documentation checked; no wider docs required because: [reason]`

## GitHub

- [ ] PR raised, Codex reviewed, and approved before merge
- [ ] Smoke check GitHub Action passed on the PR
- [ ] No session URLs (claude.ai/code/...) in any commit messages

## After merge

- [ ] GitHub Pages deployed (usually automatic within a few minutes)
- [ ] Open `https://gy8s.github.io/evolution-game/` and confirm the new build loads
- [ ] Android home screen shortcut tested if app-loading files were changed
