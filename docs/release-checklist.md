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
- [ ] If `src/state/profile-factories.js` was changed, `node scripts/build_play_html.mjs` was run to inline the profile factory helpers into `game/play.html`
- [ ] If `src/state/profile-store-core.js` was changed, `node scripts/build_play_html.mjs` was run to inline the profile store core helpers into `game/play.html`
- [ ] If `src/state/profile-state-snapshot.js` was changed, `node scripts/build_play_html.mjs` was run to inline the profile state snapshot helpers into `game/play.html`
- [ ] If `src/state/profile-run-lifecycle.js` was changed, `node scripts/build_play_html.mjs` was run to inline the profile run lifecycle helpers into `game/play.html`
- [ ] If `src/state/achievement-persistence.js` was changed, `node scripts/build_play_html.mjs` was run to inline the achievement persistence helpers into `game/play.html`
- [ ] If `src/state/field-journal-state.js` was changed, `node scripts/build_play_html.mjs` was run to inline the Field Journal state helpers into `game/play.html`
- [ ] If `src/ui/achievement-ui.js` was changed, `node scripts/build_play_html.mjs` was run to inline the achievement UI/support into `game/play.html`
- [ ] If `src/state/run-tracking-update.js` was changed, `node scripts/build_play_html.mjs` was run to inline the run-tracking update function into `game/play.html`
- [ ] If `src/ui/profile-ui.js` was changed, `node scripts/build_play_html.mjs` was run to inline the profile UI helpers into `game/play.html`
- [ ] If `src/ui/field-journal-ui.js` was changed, `node scripts/build_play_html.mjs` was run to inline the Field Journal UI helpers into `game/play.html`
- [ ] If `src/state/fossil-record-state.js` was changed, `node scripts/build_play_html.mjs` was run to inline the Fossil Record persistence helper into `game/play.html`
- [ ] If `src/ui/fossil-record-ui.js` was changed, `node scripts/build_play_html.mjs` was run to inline the Fossil Record UI helpers into `game/play.html`
- [ ] If `src/state/profile-delete.js` was changed, `node scripts/build_play_html.mjs` was run to inline the profile delete helper into `game/play.html`
- [ ] If `src/ui/profile-startup-modal.js` was changed, `node scripts/build_play_html.mjs` was run to inline the profile startup modal into `game/play.html`
- [ ] If `src/bootstrap/game-init.js` was changed, `node scripts/build_play_html.mjs` was run to inline the game bootstrap into `game/play.html`
- [ ] The generated regions in `game/play.html` were not hand-edited (CSS → `src/styles/game.css`; encounter data → `src/data/encounter-data.js`; utility helpers → `src/utils/core-utils.js`; achievement defs → `src/data/achievement-data.js`; run-tracking factory → `src/state/run-tracking.js`; profile/storage constants → `src/state/profile-storage-constants.js`; profile factory helpers → `src/state/profile-factories.js`; profile store core helpers → `src/state/profile-store-core.js`; profile state snapshot helpers → `src/state/profile-state-snapshot.js`; profile run lifecycle helpers → `src/state/profile-run-lifecycle.js`; achievement persistence helpers → `src/state/achievement-persistence.js`; Field Journal state helpers → `src/state/field-journal-state.js`; achievement UI/support → `src/ui/achievement-ui.js`; run-tracking update → `src/state/run-tracking-update.js`; profile UI helpers → `src/ui/profile-ui.js`; Field Journal UI helpers → `src/ui/field-journal-ui.js`; Fossil Record persistence → `src/state/fossil-record-state.js`; Fossil Record UI helpers → `src/ui/fossil-record-ui.js`; profile delete helper → `src/state/profile-delete.js`; profile startup modal → `src/ui/profile-startup-modal.js`; game bootstrap → `src/bootstrap/game-init.js`)

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
