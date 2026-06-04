function profileKnowledgeCount() {
  return Object.keys(player.knowledgeByEncounterKey || {}).length;
}

function profileBuildRunSummary(outcome) {
  const sz = (socialGroup.members || []).length;
  if (sz > runMaxGroupSize) runMaxGroupSize = sz;
  const dc = player.deathContext;
  return {
    runId: currentRunId || profileGenerateId("run"),
    buildId: GAME_VERSION,
    startedAt: runStartedAt || new Date().toISOString(),
    endedAt: new Date().toISOString(),
    outcome,
    turnsSurvived: player.turn,
    deathCause: dc ? String(dc.message || "") : "",
    deathContextSource: dc && dc.context ? String(dc.context.source || "") : "",
    matingCount: player.matingCount || 0,
    matingGoal: 5,
    maxGroupSize: runMaxGroupSize,
    finalSize: player.size,
    finalLifeStage: typeof isPlayerMature === "function" ? (isPlayerMature() ? "adult" : "juvenile") : "unknown",
    knowledgeUnlockCount: profileKnowledgeCount(),
    seed: currentRunId || "",
    usedGodMode: runGodModeUsed,
    qaBackUses: runQaBackUses
  };
}

function profileRunIsGodMode(summary) {
  return !!(summary.usedGodMode || summary.qaBackUses > 0);
}

function profileUpdateStats(profile, summary) {
  const s = profile.stats;
  const gm = profileRunIsGodMode(summary);
  if (gm) {
    s.godModeRuns = (s.godModeRuns || 0) + 1;
  } else {
    s.totalRuns = (s.totalRuns || 0) + 1;
    if (summary.outcome === "death") s.deaths = (s.deaths || 0) + 1;
    if (summary.outcome === "win") { s.wins = (s.wins || 0) + 1; s.completedRuns = (s.completedRuns || 0) + 1; }
    if (summary.outcome === "abandoned") s.completedRuns = (s.completedRuns || 0) + 1;
  }
  if (summary.turnsSurvived > (s.bestTurn || 0)) s.bestTurn = summary.turnsSurvived;
  if (summary.matingCount > (s.bestMatingCount || 0)) s.bestMatingCount = summary.matingCount;
  if (summary.knowledgeUnlockCount > (s.bestKnowledgeUnlocks || 0)) s.bestKnowledgeUnlocks = summary.knowledgeUnlockCount;
  s.totalTurns = (s.totalTurns || 0) + (summary.turnsSurvived || 0);
  s.totalMatings = (s.totalMatings || 0) + (summary.matingCount || 0);
}
// << SPLIT: profileOnRunEnd >>
function profileOnRunEnd(outcome) {
  if (!currentProfileId) return;
  const store = profileLoadStore();
  const profile = store.profiles[currentProfileId];
  if (!profile) return;
  const summary = profileBuildRunSummary(outcome);
  profile.runHistory = profile.runHistory || [];
  profile.runHistory.unshift(summary);
  if (profile.runHistory.length > 20) profile.runHistory.length = 20;
  profileUpdateStats(profile, summary);
  profile.activeRun = null;
  profile.lastPlayedAt = new Date().toISOString();
  profileSaveStore(store);
  checkAchievements();
  runGodModeUsed = false;
  runQaBackUses = 0;
  runMaxGroupSize = 0;
  runStartedAt = null;
  winAchievedThisRun = false;
  currentRunId = null;
  runNewAchievements = [];
  clearToastQueue();
  profileUpdatePanelUI();
}

function profileSaveActiveRun() {
  if (!currentProfileId) { addLog("No active profile — create one in Developer / QA tools.", "minor"); return; }
  if (player.dead) { addLog("Cannot save: current run has ended.", "minor"); return; }
  const store = profileLoadStore();
  const profile = store.profiles[currentProfileId];
  if (!profile) return;
  let state;
  try { state = profileCaptureState(); } catch (e) {
    addLog("Save failed — could not capture state.", "minor");
    addDebugTrace("profile-save-capture-error", {error: String(e)});
    return;
  }
  let stateJson;
  try { stateJson = JSON.stringify(state); } catch (e) {
    addLog("Save failed — state could not be serialised.", "minor");
    return;
  }
  const sizeKB = Math.round(stateJson.length / 1024);
  if (sizeKB > 4000) addLog(`Save state is large (${sizeKB} KB). localStorage may reject it.`, "minor");

  if (!currentRunId) currentRunId = profileGenerateId("run");
  if (!runStartedAt) runStartedAt = new Date().toISOString();

  profile.activeRun = {
    runId: currentRunId,
    startedAt: runStartedAt,
    lastSavedAt: new Date().toISOString(),
    buildId: GAME_VERSION,
    seed: currentRunId,
    runGodModeUsed,
    runQaBackUses,
    runNewAchievements: runNewAchievements.slice(),
    summary: {
      turn: player.turn,
      x: player.x,
      y: player.y,
      z: player.z,
      layer: typeof layers !== "undefined" ? (layers[player.z] || player.z) : player.z,
      dead: player.dead,
      matingCount: player.matingCount,
      groupSize: (socialGroup.members || []).length,
      lifeStage: typeof isPlayerMature === "function" ? (isPlayerMature() ? "adult" : "juvenile") : "unknown",
      sex: player.sex
    },
    state
  };
  profile.lastPlayedAt = new Date().toISOString();
  profile.buildId = GAME_VERSION;

  const saved = profileSaveStore(store);
  if (saved) {
    addLog(`Run saved at turn ${player.turn} (${sizeKB} KB).`, "minor");
    addDebugTrace("profile-run-saved", {turn: player.turn, sizeKB, runId: currentRunId});
  } else {
    addLog("Save failed — localStorage write error (quota or security). Run was not persisted.", "death");
    addDebugTrace("profile-save-write-error", {turn: player.turn, sizeKB, runId: currentRunId});
    profile.activeRun = null;
  }
  profileUpdatePanelUI();
}
// << SPLIT: profileStartNewRun >>
function profileStartNewRun() {
  currentRunId = profileGenerateId("run");
  runStartedAt = new Date().toISOString();
  runGodModeUsed = false;
  runQaBackUses = 0;
  runMaxGroupSize = 0;
  winAchievedThisRun = false;
  runNewAchievements = [];
  clearToastQueue();
  player.knowledgeByEncounterKey = profileLoadFieldJournal();
  addDebugTrace("profile-new-run", {profileId: currentProfileId || "none", runId: currentRunId});
}

function profileResumeActiveRun(profile) {
  if (!profile || !profile.activeRun || !profile.activeRun.state) {
    addLog("No active run to resume.", "minor");
    return false;
  }
  const compat = profileCheckBuildCompatibility(profile);
  if (!compat.compatible) {
    const ok = window.confirm(
      "This profile was saved on build:\n" + compat.savedBuild +
      "\n\nCurrent build:\n" + compat.localBuild +
      "\n\nLoading may not be fully compatible. Continue?"
    );
    if (!ok) return false;
  }
  currentRunId = profile.activeRun.runId || profileGenerateId("run");
  runStartedAt = profile.activeRun.startedAt || new Date().toISOString();
  runGodModeUsed = !!(profile.activeRun.runGodModeUsed);
  runQaBackUses = profile.activeRun.runQaBackUses || 0;
  runMaxGroupSize = 0;
  winAchievedThisRun = false;
  runNewAchievements = Array.isArray(profile.activeRun.runNewAchievements) ? profile.activeRun.runNewAchievements.slice() : [];
  clearToastQueue();
  clearRunLogsForNewGame();
  try {
    profileRestoreState(profile.activeRun.state);
  } catch (e) {
    addLog("Resume failed — state could not be restored.", "minor");
    addDebugTrace("profile-resume-error", {error: String(e)});
    return false;
  }
  addLog("Run resumed at turn " + player.turn + ".", "minor");
  addDebugTrace("profile-run-resumed", {runId: currentRunId, turn: player.turn});
  render();
  profileUpdatePanelUI();
  return true;
}
