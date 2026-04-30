# Evolution Game — Project Plan and Idea Log

This document is for non-code planning. It captures direction, priorities, design ideas, open questions, and futureproofing notes discussed by George, GPT, and Claude.

It should not contain implementation code. It should help decide what to build next and how smaller early patches should avoid blocking larger future goals.

---

## How to use this document

Add ideas here when they are raised, even if they are not ready to implement.

For each idea, try to capture:

- what the player-facing goal is,
- why it matters,
- rough priority,
- dependencies or risks,
- whether it is design-only, code-ready, or needs more thought.

This is not a promise to build everything. It is a shared memory and prioritisation tool.

---

## Current broad phase

**Phase:** Early ecology and playability expansion.

The current build has enough basic systems to play and test, but many mechanics are still first-pass. The immediate goal is to make the ecosystem feel more alive while keeping the game stable and testable.

Current emphasis:

- richer encounter behaviour,
- clearer survival pressures,
- better debug/bot evidence,
- stronger PR guardrails,
- avoiding repeated breakages,
- keeping the stable play link working.

---

## Guiding principles

- **Stability first:** main must remain playable.
- **Small patches:** one clear change per PR where practical.
- **Evidence before patching:** use bot logs, debug logs, screenshots, or clear reproduction steps.
- **No silent scope creep:** design improvements should not be bundled into unrelated fixes.
- **Player perception matters:** immersion often comes from hints, uncertainty, and consequences, not from explaining everything directly.
- **Futureproof early systems:** simple first-pass mechanics should avoid blocking later richer systems.
- **Traceability:** changes, bugs, and design decisions should be written down.

---

## Near-term priorities

### 1. Keep the playable build reliable

Goal:
- Prevent avoidable breakages such as syntax errors, blank/half-loaded games, missing map, or dead controls.

Current support:
- PR template.
- Changelog requirement.
- Bug guardrails document.

Future improvement:
- Add an automated JavaScript syntax check for embedded scripts.
- Add a lightweight browser smoke test if practical.

Status: Active / high priority.

---

### 2. Bot testing and consolidated reports

Goal:
- Use bot runs to find errors, warnings, and odd behaviours without manually reading huge raw logs.

Current support:
- Compact and full bot reports.
- Repo log structure.
- Consolidated report template.

Future idea:
- Batch testing with a shared batch ID and individual run IDs.
- Prefer compact + meta for routine runs.
- Keep full logs only for serious or unusual failures, or short retention.

Status: Active / high priority.

---

### 3. Ecology richness

Goal:
- Make the world feel less static and less random-for-randomness-sake.

Current support:
- Habitat bias.
- Weather effects.
- Short ecological cycles.

Future directions:
- More logical local encounter persistence.
- Better predator/prey movement and consequences.
- More meaningful water-edge behaviour.
- Static/semi-static resources such as nests, carcasses, hives, fruiting trees, ant trails.

Status: Active / high priority.

---

### 4. Player awareness and perception

Goal:
- Let players infer risk and opportunity from signs rather than direct labels.

Ideas:
- Look/scan action that consumes a turn.
- Awareness-based hints for nearby threats/opportunities.
- Wind direction affecting scent/detection.
- Vague versus clear cues depending on awareness, group size, elevation, weather, and distance.
- Partial sightings of hidden animals.

Status: Design direction active; implementation should be careful and incremental.

---

### 5. Group and social behaviour

Goal:
- Make group membership feel useful, fragile, and socially meaningful.

Ideas:
- Group members improve threat detection.
- Members may leave after repeated poor decisions, starvation, dehydration, or danger.
- Group members can be injured or killed by hazards/predators.
- Socialisation flow for same-species individuals rather than instant joining.
- Group summary UI with health/size/sex indicators.

Status: Planned; some early systems exist.

---

## Medium-term ideas

### Immersion through images

Goal:
- Use landscape and encounter imagery to make locations memorable and atmospheric.

Notes:
- Large image selection is desired so repeated landscapes are not obvious.
- Images should vary by habitat, elevation, weather, time of day, and nearby encounters.
- Hidden threats could be visually present but difficult to spot.
- Example: a pakicetus partly visible in water or a miacid hidden in undergrowth.

Risks:
- Asset generation and storage may become large.
- Visuals should not replace clear gameplay feedback where needed.

Status: Future; not immediate.

---

### Soundscape and audio cues

Goal:
- Add optional sound to increase immersion and provide subtle information.

Ideas:
- Ambient soundscape by habitat/weather/time.
- AI-generated representative animal calls or environmental cues.
- Threat/opportunity cues that experienced players can learn.
- Example: shoebill-like chatter as a warning cue; predator stalking sounds; insect bloom ambience.

Requirements:
- Must be toggleable.
- Should not be required for accessibility.
- Should support, not replace, text/visual cues.

Status: Future; concept stage.

---

### Better water systems

Goal:
- Make streams, ponds, lake edges, drinking, drowning, crocodile/pakicetus risk, and water navigation more coherent.

Ideas:
- Water edge should enable drinking.
- Entering water should be clearly distinct from drinking at edge.
- Movement into water should not happen accidentally or impossibly.
- Water predators should be linked to appropriate conditions and warnings.

Status: Important; likely needs focused patching.

---

### Food learning / poison knowledge

Goal:
- Let the player learn edible/poisonous resources through investigation, experience, and observation.

Ideas:
- Unknown -> maybe/probably edible/poisonous -> known edible/poisonous.
- Severity classes: mild, moderate, high, deadly.
- Learn by repeated investigation, eating, or seeing other animals react.
- Mimicry and uncertainty for some species/resources.

Status: Active design area; likely incremental.

---

### Carcasses, hives, nests, trails, and static resources

Goal:
- Create semi-persistent local features that make places matter.

Ideas:
- Carcasses with multi-turn feeding and predator/scavenger attraction.
- Beehives/wasp nests/termite nests with increasing risk as they are exploited.
- Bird nests and eggs.
- Ant trails connecting nest and resource, with directional flow.
- Fruiting trees or fungal patches that persist for some time.

Status: Planned ecology enrichment.

---

## Longer-term ideas

### Time progression and evolutionary scope

Goal:
- Eventually move forward in time and broaden species/biome context.

Notes:
- Current focus is early primate-style survival.
- Some temporal flexibility is acceptable for gameplay, but later animals should be saved for later time progression where possible.
- Avoid adding too many later predators too early if they belong better in a future phase.

Status: Long-term.

---

### More advanced animal AI

Goal:
- Animals should have simple but believable motivations and movement.

Ideas:
- Predators stalk, abandon, pursue, ambush, or avoid depending on context.
- Prey flee logically and may react to nearby predators.
- Animals respond to weather, time, habitat, group size, injury, and player actions.
- Same species interactions can involve social reads and multi-step outcomes.

Status: Long-term, but early hooks should be futureproofed.

---

### UI and accessibility polish

Goal:
- Make survival state, risk, and available choices readable without overwhelming the player.

Ideas:
- Better stacked status bars/icons.
- Clear but compact group summary.
- Improved map contrast.
- Better action result positioning.
- Optional audio.
- Avoid relying only on colour/audio for critical warnings.

Status: Ongoing.

---

## Known open questions

- What is the right balance between hidden information and player frustration?
- How often should the player encounter something interesting versus empty travel?
- How persistent should local resources and animals be?
- How lethal should early predator mistakes be?
- How much should bot testing drive balance decisions versus just bug detection?
- What raw bot data should be retained long-term versus summarised and deleted?
- How much future asset/audio planning should influence current data structures?

---

## Idea intake log

### 2026-04-30 — Project plan document

George requested a non-code project plan document so ideas raised in conversation are not lost and can be reviewed by George, GPT, and Claude when deciding next steps.

Status: Added.

---

### 2026-04-30 — Batch bot testing concept

Idea:
- Future batch testing could run multiple long bot tests under one shared batch ID, with individual run IDs for each run.

Purpose:
- Allow large evidence runs while keeping outputs structured and reviewable.

Potential structure:
- batch metadata,
- per-run compact logs,
- per-run metadata,
- full logs only for selected failures or short retention,
- consolidated report.

Status: Parked for later.

---

### 2026-04-30 — Raw logs versus consolidated reports

Idea:
- Raw bot outputs can be temporary evidence.
- Higher-level bug reports and consolidated review reports should have longer retention.

Status: Active principle for QA workflow.

---

### 2026-04-30 — Immersive images and soundscape

Idea:
- Later, add large pools of landscape images and optional soundscapes tied to habitat, time, weather, opportunities, and threats.
- Awareness could determine whether the player notices hidden visual/audio cues.

Status: Future concept.

---

## Parking lot

Items here are interesting but not yet prioritised:

- App icon polish.
- Better phone/PWA experience.
- Automated smoke testing.
- Headless bot testing outside the browser.
- Asset pipeline for generated images/audio.
- Structured data model refactor if single-file HTML becomes too difficult to maintain.
