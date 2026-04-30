# Design Decisions

Decisions already made and why. Do not reopen these without a clear reason.

---

## Repo structure

**Decision:** The public-facing game file is always `game/play.html`.
**Reason:** The Android home screen shortcut and the GitHub Pages link (`https://gy8s.github.io/evolution-game/`) must not break when the version number changes. A stable filename solves this permanently.
**Consequence:** On every release, `game/play.html` is replaced with the new build. Versioned copies (e.g. `game/evolution_game_v66_57.html`) are kept as archives.

**Decision:** `index.html` at the repo root redirects to `game/play.html` using a meta-refresh.
**Reason:** GitHub Pages serves `index.html` as the entry point. The redirect keeps the stable URL working and gives a fallback link for browsers that block meta-refresh.

**Decision:** `manifest.json` `start_url` points to `game/play.html`.
**Reason:** The PWA manifest controls what opens when the home screen shortcut is tapped on Android. It must match the stable filename.

---

## Bot logging

**Decision:** Raw bot logs go to `logs/bot-runs/<run-id>/` with three files: `compact.txt`, `full.txt`, `meta.json`.
**Reason:** Compact logs are sufficient for routine review and are small enough to read quickly. Full logs are large and only needed for targeted debugging. Keeping them separate means Claude and GPT can be asked to review compact logs first without loading the full file.

**Decision:** Consolidated reports (produced by Claude or GPT after reviewing logs) go to `logs/consolidated/`.
**Reason:** Keeps raw data and analysis separate. Consolidated reports are the input for patch decisions.

**Decision:** Old bot logs are retained in the repo rather than deleted after a patch.
**Reason:** Traceability. Being able to compare pre- and post-patch bot behaviour is useful for catching regressions.

---

## Security

**Decision:** The GitHub PAT for auto-save is stored in `sessionStorage`, not `localStorage`.
**Reason:** The game is served from a public GitHub Pages URL. `localStorage` persists to disk and is readable by any script on the same origin. `sessionStorage` clears when the tab closes and is not written to disk. The PAT must be re-entered each session, which is an acceptable trade-off.

**Decision:** No session URLs (e.g. `claude.ai/code/session_...`) in commit messages.
**Reason:** The repo is public. Session URLs embedded in commit messages are visible to anyone browsing the git history. Even if session content requires authentication, embedding them is unnecessary and potentially exposes conversation metadata.

---

## Development process

**Decision:** All changes go through a PR reviewed by Codex before merging to main.
**Reason:** Prevents both Claude and GPT from merging breaking changes without a second pair of eyes. The broken-game incident (BG-001) happened because a change was merged without adequate review.

**Decision:** Branch protection on main requires the smoke check GitHub Action to pass.
**Reason:** Automates the most critical check (JS syntax) so it cannot be forgotten or skipped even under time pressure.

**Decision:** Claude and GPT do not make changes without explicit authorisation from the owner.
**Reason:** Both assistants have demonstrated a tendency to bundle unauthorised changes into PRs or act on assumptions. The owner decides what gets built.
