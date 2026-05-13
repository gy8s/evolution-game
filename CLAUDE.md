# CLAUDE EXECUTION RULES — EVOLUTION GAME

These rules are mandatory. They override all default behaviour.

Failure to follow them = removal from implementation work.

---

## 1. DEFAULT STATE

You are ALWAYS in ANALYSIS MODE.

You are NOT allowed to:
- write to the repo
- create branches
- commit
- open PRs
- add/edit files (including logs or reports)

UNLESS explicitly told:

>>> ENTER EXECUTION MODE

No variation of this phrase counts.

---

## 2. ANALYSIS MODE (STRICT OUTPUT FORMAT)

Every response MUST be:

1. UNDERSTANDING  
2. PLAN (no action)  
3. FILES TO CHANGE  
4. RISKS  
5. WAIT  

You STOP after this.

No repo actions. No files. No "helpful additions".

---

## 3. EXECUTION MODE (WHEN AUTHORISED ONLY)

When explicitly authorised:

You MUST:

1. Create a NEW branch  
   - Never reuse branches  
   - One patch = one branch  

2. Modify ONLY approved files  

3. Implement ONLY approved changes  
   - No additions  
   - No refactors  
   - No "while I'm here" fixes  

4. Update `CHANGELOG.txt` (MANDATORY)  
   - Every code PR must include this  
   - If unsure → ASK before proceeding  

5. Complete the mandatory documentation gate  
   - Check whether wider documentation must be updated  
   - Update all affected docs in the same PR  
   - If no wider docs are required, explain the specific reason in the PR body  
   - If unsure → ASK before proceeding  

6. Ensure:
   - NO claude.ai links  
   - NO session URLs  
   - NO internal tool references  

7. Open PR  

8. STOP  

No follow-up commits. No silent fixes.

---

## 4. MANDATORY DOCUMENTATION GATE

Documentation discipline is mandatory. Documentation drift is a serious process failure.

Every implementation PR must explicitly check whether the change affects repository documentation.

`CHANGELOG.txt` remains mandatory for every code, gameplay, UI, bot/debug, app-loading, documentation, workflow, or repo-structure change.

In addition, you MUST explicitly assess whether any of these files need updating:

- `README.md`
- `docs/current-game-structure.md`
- `docs/architecture-notes.md`
- `docs/project-plan.md`
- `docs/bug-guardrails.md`
- `docs/release-checklist.md`
- `.github/pull_request_template.md`
- `CLAUDE.md`

You MUST update any affected document in the same PR.

If no wider documentation update is required, the PR body must include this exact form with a specific reason:

`Documentation checked; no wider docs required because: [specific reason]`

If documentation was updated, the PR body must include this exact form:

`Documentation updated: [list files]`

You are not allowed to say a PR is complete, safe, ready, or ready to merge if this documentation gate has not been addressed.

Examples:

- New major feature or user-facing system → check/update `README.md`, `docs/current-game-structure.md`, `docs/project-plan.md`, and `CHANGELOG.txt`.
- Runtime flow, save/profile flow, rendering, encounter lifecycle, bot/QA lifecycle, or file/module structure changes → check/update `docs/current-game-structure.md` and `docs/architecture-notes.md`.
- Bug fix, regression repair, repeated failure, misleading QA output, or process failure → check/update `docs/bug-guardrails.md`.
- Release, build, CI, smoke-check, PR-template, or assistant workflow changes → check/update `docs/release-checklist.md`, `.github/pull_request_template.md`, and/or `CLAUDE.md`.

Silence on documentation impact is failure.

---

## 5. STRICT SCOPE CONTROL

You are NOT allowed to:
- add new systems
- optimise beyond request
- refactor unrelated code
- create additional files
- write reports into repo

If it is not explicitly requested:
→ DO NOT DO IT

---

## 6. VERSION CONTROL RULES

- One patch = one new branch  
- NEVER reuse branches  
- NEVER mix multiple patches  
- NEVER open speculative PRs  
- NEVER self-merge  

All PRs must be intentional and authorised.

---

## 7. REPORTING RULES

- Analysis is done in CHAT  
- NOT in the repo  

You must NOT:
- create files in `logs/consolidated`
- create analysis PRs
- store notes in repo

Unless explicitly told.

Analysis, reports, and reviews must NEVER be written to the repository.
These are always delivered in chat. Repository writes are restricted to
implementation changes only (game/play.html, CHANGELOG.txt, and explicitly
authorised log commits). No exceptions without direct instruction from George.

---

## 8. SECURITY RULE (CRITICAL)

You must NEVER include:

- claude.ai links  
- session URLs  
- internal tool references  

This repo is public.

Violation = critical failure.

---

## 9. FAILURE CONDITIONS

Any of the following:

- repo changes without permission  
- missing CHANGELOG  
- missing required documentation update  
- failing to explicitly state why wider docs were not updated  
- documentation gate omitted or answered vaguely  
- adding unrequested files  
- reusing branches  
- including forbidden links  
- scope creep  
- silent extra changes  

= immediate removal from implementation role

---

## 10. UNCERTAINTY RULE

If ANYTHING is unclear:

→ ASK  
→ DO NOT ACT  

Guessing is not allowed.

---

## 11. CURRENT WORKFLOW

1. GPT + Claude analyse  
2. Plan is agreed  
3. George authorises execution  
4. Claude implements EXACTLY that  
5. Codex reviews  
6. George merges  

You do not deviate from this flow.

---

## 12. BOT LOG LOCATION AND REVIEW PROCESS

Committed bot logs live in:

`logs/bot-runs/<RUN_ID>/`

Each run folder normally contains:
- `compact.txt` — primary review file
- `meta.json` — run metadata
- `full.txt` — only when retained; often intentionally pruned

To find the latest bot log:
1. Fetch/pull latest `main`.
2. List `logs/bot-runs/`.
3. Choose the newest timestamped folder.
4. Read `compact.txt`.
5. Compare against previous relevant run folders.

Do not say a log is unavailable just because it is not in the local checkout.
First update from `main` or check the remote repo.

Current important recent logs:
- `logs/bot-runs/20260430-224611/compact.txt` — pre-Patch10 baseline
- `logs/bot-runs/20260430-235932/compact.txt` — post-Patch10 regression
- `logs/bot-runs/20260501-082425/compact.txt` — post-Patch11 improvement

Analysis should usually be returned in chat, not written into `logs/consolidated`, unless George explicitly authorises a repo report.

---

END
