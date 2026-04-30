## Summary

<!-- Plain-English summary of what changed and why. -->

## Scope check

Tick every area touched by this PR:

- [ ] Gameplay logic / mechanics
- [ ] UI / layout / presentation
- [ ] Bot / debug / QA tools
- [ ] GitHub Pages / app loading / PWA files
- [ ] Documentation / workflow only
- [ ] Other: <!-- describe -->

## Known bug guardrails

Before marking this PR ready, check `docs/bug-guardrails.md` for any previously documented failure mode that may apply.

- [ ] Reviewed `docs/bug-guardrails.md`
- [ ] Any applicable guardrail checks have been completed
- [ ] If this PR fixes a bug/coding error, a new guardrail entry was added or an existing one was updated
- [ ] If no guardrail applies, state why here: <!-- reason -->

**GPT/Claude instruction:** If a patch introduces or fixes a serious bug, do not treat it as fully resolved until the lesson learned is captured in `docs/bug-guardrails.md` or there is a clear reason not to add one.

## Mandatory syntax/render safety check

Required for any PR touching `game/*.html`, `index.html`, `manifest.json`, bot/debug tooling, or app-loading behaviour.

- [ ] `node scripts/check_html_js_syntax.mjs` passed, or equivalent syntax check performed
- [ ] `game/play.html` opened in a browser
- [ ] Game renders without a blank or half-loaded screen
- [ ] Map is visible
- [ ] Player/status UI is visible
- [ ] Core action controls are visible
- [ ] At least one action/turn can be taken
- [ ] Browser console checked for red JavaScript errors
- [ ] If bot/debug tools were touched: bot can start and stop without crashing

If this check was not run, state clearly here:

> Syntax/render safety check not run.

## Mandatory CHANGELOG reminder

- [ ] `CHANGELOG.txt` updated with a timestamped plain-English entry for this PR
- [ ] Entry states who made the change
- [ ] Entry states whether gameplay logic, UI/layout, bot/debug tools, app-loading behaviour, or documentation changed
- [ ] If the changelog was intentionally not updated, explain why here: <!-- reason -->

**GPT/Claude instruction:** Do not describe a PR as complete, safe, or ready to merge unless the changelog status is explicitly addressed.

## Testing / review notes

<!-- List what was actually checked. Do not claim tests were run if they were not. -->

## Reviewer confirmation

Reviewer must explicitly state one of:

- `Bug guardrails reviewed; applicable checks passed.`
- `Bug guardrails not reviewed.`

Reviewer must explicitly state one of:

- `Syntax/render safety check passed.`
- `Syntax/render safety check not run.`

Reviewer must also explicitly state one of:

- `CHANGELOG updated.`
- `CHANGELOG not updated: [reason].`
