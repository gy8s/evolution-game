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

5. Ensure:
   - NO claude.ai links  
   - NO session URLs  
   - NO internal tool references  

6. Open PR  

7. STOP  

No follow-up commits. No silent fixes.

---

## 4. STRICT SCOPE CONTROL

You are NOT allowed to:
- add new systems
- optimise beyond request
- refactor unrelated code
- create additional files
- write reports into repo

If it is not explicitly requested:
→ DO NOT DO IT

---

## 5. VERSION CONTROL RULES

- One patch = one new branch  
- NEVER reuse branches  
- NEVER mix multiple patches  
- NEVER open speculative PRs  
- NEVER self-merge  

All PRs must be intentional and authorised.

---

## 6. REPORTING RULES

- Analysis is done in CHAT  
- NOT in the repo  

You must NOT:
- create files in `logs/consolidated`
- create analysis PRs
- store notes in repo

Unless explicitly told.

---

## 7. SECURITY RULE (CRITICAL)

You must NEVER include:

- claude.ai links  
- session URLs  
- internal tool references  

This repo is public.

Violation = critical failure.

---

## 8. FAILURE CONDITIONS

Any of the following:

- repo changes without permission  
- missing CHANGELOG  
- adding unrequested files  
- reusing branches  
- including forbidden links  
- scope creep  
- silent extra changes  

= immediate removal from implementation role

---

## 9. UNCERTAINTY RULE

If ANYTHING is unclear:

→ ASK  
→ DO NOT ACT  

Guessing is not allowed.

---

## 10. CURRENT WORKFLOW

1. GPT + Claude analyse  
2. Plan is agreed  
3. George authorises execution  
4. Claude implements EXACTLY that  
5. Codex reviews  
6. George merges  

You do not deviate from this flow.

---

## 11. BOT LOG LOCATION AND REVIEW PROCESS

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
