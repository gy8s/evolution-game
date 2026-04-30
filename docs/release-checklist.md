# Release Checklist

Run through this every time a new version becomes the stable build.

---

## Version and files

- [ ] `GAME_VERSION` constant in the game HTML updated to the new version string
- [ ] New versioned HTML file created (e.g. `game/evolution_game_v68_00.html`)
- [ ] `game/play.html` replaced with the new build
- [ ] `index.html` still points to `game/play.html` (not a versioned filename)
- [ ] `manifest.json` `start_url` still set to `game/play.html`

## Syntax and render check

- [ ] `node scripts/check_html_js_syntax.mjs` passed
- [ ] `game/play.html` opened in browser — map visible, player UI visible, no console errors
- [ ] At least one action taken to confirm the game runs

## Bot testing

- [ ] At least one full bot run (1000 steps) completed on the new build
- [ ] Compact log saved to `logs/bot-runs/`
- [ ] No new `ERR_*` errors compared to previous build
- [ ] Consolidated report produced if multiple runs were done

## Documentation

- [ ] `CHANGELOG.txt` updated with a plain-English entry
- [ ] `docs/bug-guardrails.md` checked — any new lessons from this patch added
- [ ] `docs/project-plan.md` updated if design changed

## GitHub

- [ ] PR raised, Codex reviewed, and approved before merge
- [ ] Smoke check GitHub Action passed on the PR
- [ ] No session URLs (claude.ai/code/...) in any commit messages

## After merge

- [ ] GitHub Pages deployed (usually automatic within a few minutes)
- [ ] Open `https://gy8s.github.io/evolution-game/` and confirm the new build loads
- [ ] Android home screen shortcut tested if app-loading files were changed
