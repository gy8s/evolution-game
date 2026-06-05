// ---------------------------------------------------------------------------
// [DATA-ENCOUNTERS] moved to data-encounters.js
// [DATA-SPAWN] moved to data-spawn.js
// @target [STATE] Get Encounter Template
function getEncounterTemplate(key) {
  if (Array.isArray(key)) key = key[0];
  if (typeof key !== "string") return null;
  return encounters[key] || null;
}

/**
 * Sanity-checks spawn tables against encounter definitions.
 *
 * Reviewer note:
 * This should be run during startup so missing or malformed encounter keys are
 * visible in the browser console before playtesting begins.
 */
// @target [STATE] Validate Encounter Data
function validateEncounterData() {
  const problems = [];

  for (const layerName of Object.keys(encounterTables)) {
    const table = encounterTables[layerName];

    if (!Array.isArray(table)) {
      problems.push(`${layerName}: table is not an array`);
      continue;
    }

    for (const entry of table) {
      if (!Array.isArray(entry) || typeof entry[0] !== "string" || typeof entry[1] !== "number") {
        problems.push(`${layerName}: invalid table entry ${JSON.stringify(entry)}`);
        continue;
      }

      if (!encounters[entry[0]]) {
        problems.push(`${layerName}: missing definition for ${entry[0]}`);
      }
    }
  }

  if (problems.length) console.warn("Encounter data validation problems:", problems);
  return problems;
}

/**
 * Fills missing encounter fields with safe defaults.
 *
 * This is defensive code. It means every creature/object should remain renderable
 * and investigable even if a new encounter definition is incomplete. It also
 * prevents crashes when reviewers add new species data during iteration.
 */
// @target [DATA-ENCOUNTERS] Encounter safety defaults
function normaliseEncounter(e, key = "unknown") {
  if (!e) {
    return {
      key,
      kind: "unknown",
      name: "unknown animal",
      icon: "?",
      className: "minor",
      canInvestigate: true,
      seen: "Something moves, but the forest hides it before you can make sense of it."
    };
  }

  if (!e.key) e.key = key;
  if (!e.kind) e.kind = "animal";
  if (!e.name) e.name = key;
  if (!e.icon) e.icon = "?";
  if (!e.className) e.className = "minor";
  if (typeof e.canInvestigate !== "boolean") e.canInvestigate = true;
  if (!e.seen) e.seen = `You notice ${article(e.name)} ${e.name}.`;
  if (!e.investigated) e.investigated = genericInvestigationText(e);

  if (e.kind === "animal") {
    if (!e.dangerProfile) e.dangerProfile = "minor";
    if (!e.temperament) e.temperament = "skittish";
    if (typeof e.fitness !== "number") e.fitness = 50;
    if (typeof e.size !== "number") e.size = 1;
    if (typeof e.speed !== "number") e.speed = 30;
    if (typeof e.agility !== "number") e.agility = 30;
    if (typeof e.aggression !== "number") e.aggression = 0;
    if (typeof e.food !== "number") e.food = Math.max(4, Math.round(e.size * 4));
    if (!e.sex && !isInvertebrateEncounter(e)) e.sex = Math.random() < 0.5 ? "male" : "female";
  }

  e.persistence = encounterPersistenceClass(e);
  return e;
}
