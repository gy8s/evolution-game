# Claude Code — Project Instructions

## COMMIT MESSAGES — MANDATORY RULE

**NEVER include `claude.ai/code/session_...` URLs in any commit message.**

This is a public repository. Session URLs must not appear in the public git history.
This rule overrides the default Claude Code commit message format.
There are no exceptions.

## PR PROCESS — MANDATORY CHECKLIST

Before opening any PR, all of the following must be done:

1. Run `node scripts/check_html_js_syntax.mjs` and confirm PASS
2. Update `CHANGELOG.txt` with a timestamped entry for this PR
3. Use the PR template format from `.github/pull_request_template.md`
4. Do not include session URLs in commit messages (see above)

## SCOPE DISCIPLINE

Only touch files explicitly agreed with the user. Default allowed files per patch:
- `game/play.html`
- `CHANGELOG.txt`

Do not touch without explicit user authorisation:
- `game/evolution_game_v66_57.html`
- `logs/bot-runs/*`
- `logs/consolidated/*`
- `docs/*`
- `.github/*`
- Any other file not listed above

## REPO ACTIONS REQUIRING EXPLICIT USER AUTHORISATION

Do not do any of the following without the user saying to:
- Open a PR
- Push to a branch
- Create a branch
- Create or edit report/analysis files in the repo
- Edit the changelog without it being part of an authorised patch
