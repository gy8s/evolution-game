# Evolution Game

Private working repository for the Evolution Game prototype.

## Current baseline

Current intended baseline build:

- Version: `v66.57`
- Build ID: `v66.57_patch8_short_eco_cycles_2026-04-29`
- Patch: Patch 8 — Short Ecological Cycles
- Playable file from the package: `evolution_game_v66_57.html`
- SHA256: `0d7a7ff8ab4791076c06614923dfdf5e873d51f80a1c16cb41c5bab39ba78193`

## How this repo should be used

- `main` should stay stable and playable.
- New patches should be made on separate branches.
- Patch changes should be reviewed as a diff before being merged.
- Large debug and bot logs should not be committed unless deliberately needed.

## Build notes

Patch notes for v66.57 are stored at:

- `docs/p8_notes.txt`

## Important workflow rule

For playtesting, use the standalone HTML file directly. Do not rely on embedded browser previews inside ChatGPT, because they can slow down or crash the browser tab.
