function profileGenerateId(prefix) {
  return prefix + "_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
}

function profileEmptyStore() {
  return {schemaVersion: 1, profiles: {}};
}

function profileDefaultStats() {
  return {totalRuns: 0, completedRuns: 0, deaths: 0, wins: 0, godModeRuns: 0, bestTurn: 0, bestMatingCount: 0, bestKnowledgeUnlocks: 0, totalTurns: 0, totalMatings: 0};
}
