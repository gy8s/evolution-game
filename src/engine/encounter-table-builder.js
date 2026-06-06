// @target [DATA-SPAWN] Build Encounter Tables
function buildEncounterTables() {
  const tables = {};
  for (const [key, enc] of Object.entries(encounters)) {
    if (!enc.layers || typeof enc.layers !== "object") continue;
    for (const [layerName, chance] of Object.entries(enc.layers)) {
      if (!tables[layerName]) tables[layerName] = [];
      tables[layerName].push([key, chance]);
    }
  }
  return tables;
}
