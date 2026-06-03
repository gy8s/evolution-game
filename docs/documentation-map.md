# Documentation Map

This document explains what each documentation file covers, when it must be updated, and what questions it answers. Use it when deciding which files need updating for a given change.

---

## Files and their purpose

### CHANGELOG.txt
**What it covers:** Plain-English history of every change to the project.  
**Update when:** Any PR that touches code, documentation, workflow, app-loading files, bot/debug tools, or repository structure.  
**Answers:** What changed, when, and who made it?

---

### README.md
**What it covers:** Project overview, play link, current build version, repository layout, development workflow, and notes for AI assistants.  
**Update when:** New top-level files or directories are added; the build version changes; workflow rules change significantly; a new phase or direction is introduced.  
**Answers:** What is this project? How do I play it? How is the repo laid out? How does development work?

---

### docs/current-game-structure.md
**What it covers:** What the game currently is, how every system works, what lives in `game/play.html`, runtime flow diagrams, and known fragile areas.  
**Update when:** A new system is added or significantly changed; line ranges shift noticeably; a fragile area is fixed or a new one appears; a rebuild phase moves code out of `play.html`.  
**Answers:** How does the game work right now? What happens during a turn? How does saving work? What is the bot?

---

### docs/architecture-notes.md
**What it covers:** The internal layout of `game/play.html`: section line ranges, key data structures, fragile areas, and do-not-touch warnings.  
**Update when:** Significant code is added, moved, or restructured; line ranges become stale; a new fragile area is identified.  
**Answers:** Where is this code in the file? What should I not change without checking?

---

### docs/project-plan.md
**What it covers:** Non-code planning: current phase, priorities, design direction, open questions, and the idea intake log.  
**Update when:** The current phase changes; a major design decision is made; a new area of work is agreed; an idea is raised that should not be lost.  
**Answers:** What are we building? What should we build next? What design decisions have been made?

---

### docs/bug-guardrails.md
**What it covers:** Documented failure modes: serious bugs, repeated mistakes, and the prevention checks that come from them.  
**Update when:** A patch introduces or fixes a serious bug; a failure mode recurs; a new mandatory PR check is identified.  
**Answers:** What has gone wrong before? What checks must pass before this PR is ready?

---

### docs/release-checklist.md
**What it covers:** Step-by-step checklist for releasing a new version: version constants, file sync, syntax check, bot testing, documentation gate, and GitHub steps.  
**Update when:** The release process changes; new mandatory checks are added; documentation gate requirements change.  
**Answers:** What do I need to do before and after a release?

---

### .github/pull_request_template.md
**What it covers:** The required PR checklist: scope, bug guardrails, syntax/render safety, CHANGELOG, commit message check, and documentation gate.  
**Update when:** New mandatory PR checks are added; the documentation gate wording changes; new scope categories appear.  
**Answers:** What must every PR address before it can be merged?

---

### CLAUDE.md
**What it covers:** Operating rules for AI assistants: execution modes, scope control, documentation requirements, version control rules, and workflow.  
**Update when:** The workflow changes; new rules are needed; the documentation gate requirements change; new forbidden patterns are identified.  
**Answers:** How should Claude behave when working on this repo?

---

## Quick reference — when to update which files

| Change type | Required doc updates |
|-------------|---------------------|
| New gameplay system or major feature | README, current-game-structure, project-plan, CHANGELOG |
| Code extracted to a source file / build step added | README (layout + build notes), current-game-structure, architecture-notes, release-checklist, CHANGELOG |
| System significantly changed | current-game-structure, architecture-notes, CHANGELOG |
| Code moved or file structure changed | README (layout), architecture-notes, current-game-structure, CHANGELOG |
| Bug introduced and fixed | bug-guardrails (new or updated entry), CHANGELOG |
| New release | release-checklist review, README (build version), CHANGELOG |
| New mandatory PR check | pull_request_template, release-checklist, bug-guardrails (if from a bug) |
| New assistant workflow rule | CLAUDE.md, CHANGELOG |
| New phase or design direction | project-plan, README, CHANGELOG |
| Documentation repair only | CHANGELOG |
