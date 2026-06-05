/**
 * Adds a structured developer-only diagnostic event.
 *
 * This is separate from the player event log. It captures current position,
 * habitat, action kind, vital stats, poison, water state, current encounter, and
 * caller-specific detail. The downloaded debug report uses this to reconstruct
 * why a turn behaved the way it did.
 */
// @target [STATE] Add Debug Trace
function addDebugTrace(type, detail = {}) {
  try {
    debugTrace.unshift({type, generatedAt: new Date().toISOString(), turn: player.turn, x: player.x, y: player.y, z: player.z, layer: layers[player.z], terrain: terrainAt(player.x, player.y), altitude: altitudeAt(player.x, player.y), landform: landformAt(player.x, player.y), habitatKey: habitatKeyAt(player.x, player.y), habitatName: habitatAt(player.x, player.y).name, actionKind: lastActionKind, fitness: player.fitness, energy: player.energy, size: player.size, poison: cloneDebug(player.poison), waterState: cloneDebug(waterState), currentEncounter: currentEncounter ? {name: currentEncounter.name, key: currentEncounter.key, instanceId: currentEncounter.instanceId, kind: currentEncounter.kind, dangerProfile: currentEncounter.dangerProfile, temperament: currentEncounter.temperament, poison: cloneDebug(currentEncounter.poison)} : null, detail: cloneDebug(detail)});
    if (debugTrace.length > 8000) debugTrace.length = 8000;
  } catch (err) {}
}

/**
 * RNG wrapper used when a random decision may need later explanation.
 *
 * To keep exports useful, failed high-volume immediate encounter rolls are mostly
 * suppressed. Passed rolls, forced logs, and non-encounter rolls are retained.
 */
// @target [STATE] Debug Roll
function debugRoll(label, chance, meta = {}) {
  const value = Math.random() * 100;
  const passed = value < chance;
  // Raw failed encounter-table rolls made exports enormous and hid useful signals.
  // Keep all passed rolls, non-encounter rolls, and explicitly forced rolls.
  if (passed || label !== "immediate encounter roll" || meta.forceLog) {
    addDebugTrace("rng", {label, chance, value: Math.round(value * 1000) / 1000, passed, meta});
  }
  return passed;
}

// @target [STATE] Important State Snapshot
function importantStateSnapshot() {
  return {
    turn: player.turn,
    x: player.x,
    y: player.y,
    z: player.z,
    layer: layers[player.z],
    terrain: terrainAt(player.x, player.y),
    habitatKey: habitatKeyAt(player.x, player.y),
    habitatName: habitatAt(player.x, player.y).name,
    fitness: player.fitness,
    energy: player.energy,
    hydration: player.hydration,
    size: player.size,
    growthProgress: player.growthProgress,
    phase: timeState.phase,
    phaseTurn: timeState.phaseTurn,
    poison: cloneDebug(player.poison),
    waterState: cloneDebug(waterState),
    socialGroup: {
      ...cloneDebug(socialGroup),
      members: (socialGroup.members || []).map(m => cloneDebug(m))
    },
    encounter: currentEncounter ? {
      name: currentEncounter.name,
      key: currentEncounter.key,
      instanceId: currentEncounter.instanceId,
      kind: currentEncounter.kind,
      dangerProfile: currentEncounter.dangerProfile,
      temperament: currentEncounter.temperament,
      poison: cloneDebug(currentEncounter.poison)
    } : null,
    activePursuit: cloneDebug(activePursuit)
  };
}

// @target [STATE] Diff Snapshots
function diffSnapshots(before, after) {
  const deltas = {};
  if (!before || !after) return deltas;
  for (const key of ["x", "y", "z", "layer", "terrain", "habitatKey", "habitatName", "fitness", "energy", "hydration", "size", "growthProgress", "phase", "phaseTurn"]) {
    if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) deltas[key] = {before: before[key], after: after[key]};
  }
  if (JSON.stringify(before.poison) !== JSON.stringify(after.poison)) deltas.poison = {before: before.poison, after: after.poison};
  if (JSON.stringify(before.waterState) !== JSON.stringify(after.waterState)) deltas.waterState = {before: before.waterState, after: after.waterState};
  if (JSON.stringify(before.encounter) !== JSON.stringify(after.encounter)) deltas.encounter = {before: before.encounter, after: after.encounter};
  if (JSON.stringify(before.activePursuit) !== JSON.stringify(after.activePursuit)) deltas.activePursuit = {before: before.activePursuit, after: after.activePursuit};
  return deltas;
}

// @target [STATE] God Mode QA Back Snapshot
function takeQABackSnapshot() {
  try {
    qaBackSnapshot = JSON.parse(JSON.stringify({
      player: player,
      waterState: waterState,
      currentEncounter: currentEncounter,
      tileEncounterQueue: tileEncounterQueue,
      carcass: carcass,
      interruptedFood: interruptedFood,
      nearbyEntities: nearbyEntities,
      persistentEntities: persistentEntities,
      worldRegistry: worldRegistry,
      nextRegistryId: nextRegistryId,
      exploredTiles: Array.from(exploredTiles),
      nextEntityId: nextEntityId,
      nextInstanceId: nextInstanceId,
      knownMapEntities: knownMapEntities,
      staticTileContents: staticTileContents,
      consumedStaticTileKeys: consumedStaticTileKeys,
      burnedTiles: burnedTiles,
      dangerGrace: dangerGrace,
      recentPredatorWarning: recentPredatorWarning,
      activePursuit: activePursuit,
      investigationText: investigationText,
      investigationEncounterRef: investigationEncounterRef,
      lastLookText: lastLookText,
      lastLookTurn: lastLookTurn,
      lastNarration: lastNarration,
      groupSceneNotice: groupSceneNotice,
      heardText: heardText,
      smellText: smellText,
      nearbyRecentSocial: nearbyRecentSocial,
      lastActionKind: lastActionKind,
      lastDamageContext: lastDamageContext,
      debugLastAction: debugLastAction,
      callStreak: callStreak,
      lastCallTurn: lastCallTurn,
      socialGroup: socialGroup,
      noiseLevel: noiseLevel,
      lastCravingCueTurn: lastCravingCueTurn,
      lastRiskMemoryCueTurn: lastRiskMemoryCueTurn,
      individualSocialState: individualSocialState,
      lastHabitatKey: lastHabitatKey,
      environment: environment,
      timeState: {phase: timeState.phase, phaseTurn: timeState.phaseTurn, sleepTurnsRemaining: timeState.sleepTurnsRemaining}
    }));
  } catch (e) {
    qaBackSnapshot = null;
  }
}

function restoreQABackSnapshot() {
  if (!qaBackSnapshot) return;
  const snap = qaBackSnapshot;
  const originalDeathContext = cloneDebug(player.deathContext);

  Object.assign(player, snap.player);
  waterState = snap.waterState;
  currentEncounter = snap.currentEncounter;
  tileEncounterQueue = snap.tileEncounterQueue;
  carcass = snap.carcass;
  interruptedFood = snap.interruptedFood;
  nearbyEntities = snap.nearbyEntities;
  persistentEntities = snap.persistentEntities;
  worldRegistry = snap.worldRegistry;
  nextRegistryId = snap.nextRegistryId;
  exploredTiles = new Set(snap.exploredTiles);
  nextEntityId = snap.nextEntityId;
  nextInstanceId = snap.nextInstanceId;
  knownMapEntities = snap.knownMapEntities;
  staticTileContents = snap.staticTileContents;
  consumedStaticTileKeys = snap.consumedStaticTileKeys;
  burnedTiles = snap.burnedTiles;
  dangerGrace = snap.dangerGrace;
  recentPredatorWarning = snap.recentPredatorWarning;
  activePursuit = snap.activePursuit;
  investigationText = snap.investigationText;
  investigationEncounterRef = snap.investigationEncounterRef;
  lastLookText = snap.lastLookText;
  lastLookTurn = snap.lastLookTurn;
  lastNarration = snap.lastNarration;
  groupSceneNotice = snap.groupSceneNotice;
  heardText = snap.heardText;
  smellText = snap.smellText;
  nearbyRecentSocial = snap.nearbyRecentSocial;
  lastActionKind = snap.lastActionKind;
  lastDamageContext = snap.lastDamageContext;
  debugLastAction = snap.debugLastAction;
  callStreak = snap.callStreak;
  lastCallTurn = snap.lastCallTurn;
  socialGroup = snap.socialGroup;
  noiseLevel = snap.noiseLevel;
  lastCravingCueTurn = snap.lastCravingCueTurn;
  lastRiskMemoryCueTurn = snap.lastRiskMemoryCueTurn;
  individualSocialState = snap.individualSocialState;
  lastHabitatKey = snap.lastHabitatKey;
  Object.assign(environment, snap.environment);
  timeState.phase = snap.timeState.phase;
  timeState.phaseTurn = snap.timeState.phaseTurn;
  timeState.sleepTurnsRemaining = snap.timeState.sleepTurnsRemaining;

  runQaBackUses++;
  addDebugTrace("qa-back-used", {
    originalDeathContext,
    restoredTurn: player.turn,
    restoredPosition: {x: player.x, y: player.y, z: player.z},
    godModeEnabled: true
  });
  addLog(`Turn ${player.turn}: QA Back used: restored state before fatal action.`, "minor");

  hideDeathModal();
  deathRestartPromptOpen = false;
  render();
}

// @target [STATE] Add Turn Delta Trace
function addTurnDeltaTrace(stage, before, extra = {}) {
  const after = importantStateSnapshot();
  const deltas = diffSnapshots(before, after);
  if (Object.keys(deltas).length || Object.keys(extra).length) {
    addDebugTrace("state-delta", {stage, deltas, before, after, extra});
  }
  return after;
}

// @target [STATE] Add Debug Flag
function addDebugFlag(message, detail = {}) {
  addDebugTrace("debug-flag", {message, detail});
}

// @target [STATE] Suspicious state diagnostics
function scanForSuspiciousState(context = "") {
  if (player.energy < 15) addDebugFlag("Energy critically low", {context, energy: player.energy});
  if (player.fitness < 20 && !player.dead) addDebugFlag("Fitness critically low", {context, fitness: player.fitness});
  if (player.poison && poisonIsCritical(player.poison) && player.poison.criticalTimer <= 2) {
    addDebugFlag("Critical poison near expiry", {context, poison: cloneDebug(player.poison)});
  }
  if (isWaterTile(player.x, player.y) && player.z !== 0) addDebugFlag("Water tile with non-ground layer", {context, x: player.x, y: player.y, z: player.z});
  if (!layerAllowedAt(player.x, player.y, player.z)) addDebugFlag("Current layer not allowed by habitat", {context, habitat: habitatAt(player.x, player.y), z: player.z});
}
