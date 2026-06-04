function updateRunTracking() {
  const rt = player.runTracking;
  if (!rt) return;
  if ((player.fitness || 0) < 11) {
    rt.wasNearDeath = true;
    rt.turnsAtMinFitness = (rt.turnsAtMinFitness || 0) + 1;
  }
  if ((player.fitness || 0) < (rt.lowestFitness || 100)) {
    rt.lowestFitness = player.fitness;
  }
  if (player.poison && player.poison.rank >= 1) {
    if ((player.poison.rank) > (rt.worstPoisonRank || 0)) {
      rt.worstPoisonRank = player.poison.rank;
    }
  }
  if (!player.poison && rt.worstPoisonRank >= 1) {
    rt.poisonSurvived = true;
  }
  if (timeState.phase === "dawn" && rt.lastTrackedPhase === "night") {
    rt.nightSurvivedCount = (rt.nightSurvivedCount || 0) + 1;
  }
  rt.lastTrackedPhase = timeState.phase;
  const newTiles = exploredTiles ? exploredTiles.size : 0;
  rt.tilesExplored = newTiles;
}
