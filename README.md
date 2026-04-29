# Evolution Game

A browser-based survival and evolution simulation. You play as a creature navigating a dynamic ecosystem — foraging, avoiding predators, surviving weather events, and adapting over time. The game runs entirely in a single HTML file; no installation required.

---

## How to play

1. Go to the `game/` folder in this repository.
2. Download the `.html` file (or clone the repo).
3. Open the file in any modern web browser.
4. That's it — no server, no install, no account needed.

> **Playtesting tip:** Open the HTML file directly in your browser. Do not use embedded browser previews inside ChatGPT or similar tools — they can slow down or crash the tab.

---

## What's in this repository

```
evolution-game/
├── README.md                        ← You are here
├── CHANGELOG.txt                    ← Full log of every change made to the repo
├── .gitignore                       ← Tells git what files to ignore
├── game/
│   └── evolution_game_v66_57.html   ← The playable game (current version)
└── docs/
    └── patch8-short-eco-cycles.txt  ← Detailed notes for the current patch
```

---

## Current version

| Field      | Value                                          |
|------------|------------------------------------------------|
| Version    | v66.57                                         |
| Patch      | Patch 8 — Short Ecological Cycles              |
| Build ID   | `v66.57_patch8_short_eco_cycles_2026-04-29`    |
| SHA256     | `0d7a7ff8ab4791076c06614923dfdf5e873d51f80a1c16cb41c5bab39ba78193` |

### What Patch 8 adds

Short ecological cycle events that temporarily shift what the creature encounters in the environment. Seven cycle types can activate during a run:

- **Fruiting Pulse** — forage is more abundant for a stretch of turns
- **Insect Bloom** — insects spike in frequency
- **Dry Spell** — forage and insects both drop
- **Wet Spell** — insects rise, forage improves slightly
- **Scavenger Pulse** — carcasses become more common
- **Predator Lull** — predators thin out temporarily
- **Predator Spike** — predators surge

Cycles are announced in the game log when they start and end. Only one cycle is active at a time. All effects are temporary and reversible.

---

## Project workflow

- **`main` is the stable, playable version.** It should always contain a working build that can be opened and played immediately.
- **No direct edits to `main`.** All changes — no matter how small — must be made on a separate branch.
- **The person or assistant making the change opens a pull request** against `main` when the work is ready.
- **The other assistant reviews the pull request in plain English** before it is merged — confirming what changed, what didn't, and whether anything looks off.
- **George merges the pull request** only after the review confirms the change is correct and limited to what was intended.
- **Pull requests must clearly state** which of the following were affected: gameplay logic, UI/layout, bot or debug tools, or documentation. If none of those changed, say so explicitly.
- **Keep patches small and focused.** One purpose per branch. Don't bundle unrelated changes.
- **The CHANGELOG must be updated** with a timestamped entry for every commit that changes the codebase or repository structure.
- Large debug logs, bot reports, and QA output files should **not** be committed — they are excluded by `.gitignore`.
