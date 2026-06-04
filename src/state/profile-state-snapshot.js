function profileCaptureWorldArrays() {
  return {
    terrain: terrain.map(row => row.slice()),
    altitude: altitude.map(row => row.slice()),
    landform: landform.map(row => row.slice()),
    habitat: habitat.map(row => row.slice()),
    muddyShallows: muddyShallows.map(row => row.slice()),
    lianaBridges: lianaBridges.map(row => row.slice())
  };
}

function profileCaptureState() {
  const logEl = document.getElementById("log");
  const logLines = logEl ? Array.from(logEl.querySelectorAll("p")).slice(-PROFILE_LOG_CAP).map(p => ({
    text: p.textContent,
    className: p.className
  })) : [];

  return {
    worldArrays: profileCaptureWorldArrays(),
    player: JSON.parse(JSON.stringify(player)),
    waterState: JSON.parse(JSON.stringify(waterState)),
    currentEncounter: currentEncounter ? JSON.parse(JSON.stringify(currentEncounter)) : null,
    tileEncounterQueue: JSON.parse(JSON.stringify(tileEncounterQueue)),
    carcass: carcass ? JSON.parse(JSON.stringify(carcass)) : null,
    interruptedFood: interruptedFood ? JSON.parse(JSON.stringify(interruptedFood)) : null,
    nearbyEntities: JSON.parse(JSON.stringify(nearbyEntities)),
    persistentEntities: JSON.parse(JSON.stringify(persistentEntities)),
    worldRegistry: JSON.parse(JSON.stringify(worldRegistry)),
    nextRegistryId,
    exploredTiles: Array.from(exploredTiles),
    nextEntityId,
    nextInstanceId,
    knownMapEntities: JSON.parse(JSON.stringify(knownMapEntities)),
    staticTileContents: JSON.parse(JSON.stringify(staticTileContents)),
    consumedStaticTileKeys: JSON.parse(JSON.stringify(consumedStaticTileKeys)),
    burnedTiles: JSON.parse(JSON.stringify(burnedTiles)),
    dangerGrace,
    recentPredatorWarning: recentPredatorWarning ? JSON.parse(JSON.stringify(recentPredatorWarning)) : null,
    activePursuit: activePursuit ? JSON.parse(JSON.stringify(activePursuit)) : null,
    investigationText,
    investigationEncounterRef,
    lastLookText,
    lastLookTurn,
    lastNarration,
    groupSceneNotice: groupSceneNotice ? JSON.parse(JSON.stringify(groupSceneNotice)) : null,
    heardText,
    smellText,
    nearbyRecentSocial: nearbyRecentSocial ? JSON.parse(JSON.stringify(nearbyRecentSocial)) : null,
    lastActionKind,
    lastDamageContext: lastDamageContext ? JSON.parse(JSON.stringify(lastDamageContext)) : null,
    debugLastAction: debugLastAction ? JSON.parse(JSON.stringify(debugLastAction)) : null,
    callStreak,
    lastCallTurn,
    socialGroup: JSON.parse(JSON.stringify(socialGroup)),
    noiseLevel,
    lastCravingCueTurn,
    lastRiskMemoryCueTurn,
    individualSocialState: individualSocialState ? JSON.parse(JSON.stringify(individualSocialState)) : null,
    lastHabitatKey,
    environment: JSON.parse(JSON.stringify(environment)),
    timeState: {phase: timeState.phase, phaseTurn: timeState.phaseTurn, sleepTurnsRemaining: timeState.sleepTurnsRemaining},
    debugTrace: debugTrace.slice(-PROFILE_TRACE_CAP),
    logLines
  };
}

function profileRestoreState(state) {
  if (state.worldArrays) {
    for (let xi = 0; xi < WORLD_SIZE; xi++) {
      for (let yi = 0; yi < WORLD_SIZE; yi++) {
        terrain[xi][yi] = state.worldArrays.terrain[xi][yi];
        altitude[xi][yi] = state.worldArrays.altitude[xi][yi];
        landform[xi][yi] = state.worldArrays.landform[xi][yi];
        habitat[xi][yi] = state.worldArrays.habitat[xi][yi];
        muddyShallows[xi][yi] = state.worldArrays.muddyShallows[xi][yi];
        lianaBridges[xi][yi] = state.worldArrays.lianaBridges[xi][yi];
      }
    }
  }

  Object.assign(player, state.player);
  waterState = state.waterState;
  currentEncounter = state.currentEncounter;
  tileEncounterQueue = state.tileEncounterQueue;
  carcass = state.carcass;
  interruptedFood = state.interruptedFood;
  nearbyEntities = state.nearbyEntities;
  persistentEntities = state.persistentEntities;
  worldRegistry = state.worldRegistry;
  nextRegistryId = state.nextRegistryId;
  exploredTiles = new Set(state.exploredTiles);
  nextEntityId = state.nextEntityId;
  nextInstanceId = state.nextInstanceId;
  knownMapEntities = state.knownMapEntities;
  staticTileContents = state.staticTileContents;
  consumedStaticTileKeys = state.consumedStaticTileKeys;
  burnedTiles = state.burnedTiles;
  dangerGrace = state.dangerGrace;
  recentPredatorWarning = state.recentPredatorWarning;
  activePursuit = state.activePursuit;
  investigationText = state.investigationText;
  investigationEncounterRef = state.investigationEncounterRef;
  lastLookText = state.lastLookText;
  lastLookTurn = state.lastLookTurn;
  lastNarration = state.lastNarration;
  groupSceneNotice = state.groupSceneNotice;
  heardText = state.heardText;
  smellText = state.smellText;
  nearbyRecentSocial = state.nearbyRecentSocial;
  lastActionKind = state.lastActionKind;
  lastDamageContext = state.lastDamageContext;
  debugLastAction = state.debugLastAction;
  callStreak = state.callStreak;
  lastCallTurn = state.lastCallTurn;
  socialGroup = state.socialGroup;
  noiseLevel = state.noiseLevel;
  lastCravingCueTurn = state.lastCravingCueTurn;
  lastRiskMemoryCueTurn = state.lastRiskMemoryCueTurn;
  individualSocialState = state.individualSocialState;
  lastHabitatKey = state.lastHabitatKey;
  Object.assign(environment, state.environment);
  timeState.phase = state.timeState.phase;
  timeState.phaseTurn = state.timeState.phaseTurn;
  timeState.sleepTurnsRemaining = state.timeState.sleepTurnsRemaining;
  if (Array.isArray(state.debugTrace)) debugTrace = state.debugTrace;

  const logEl = document.getElementById("log");
  if (logEl && Array.isArray(state.logLines)) {
    logEl.innerHTML = "";
    state.logLines.forEach(entry => {
      const p = document.createElement("p");
      p.textContent = entry.text;
      if (entry.className) p.className = entry.className;
      logEl.appendChild(p);
    });
  }
}
