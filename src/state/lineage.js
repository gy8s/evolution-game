// ---------------------------------------------------------------------------
// LINEAGE PROGRESSION — concrete taxon route (Purgatorius → Eosimias)
// ---------------------------------------------------------------------------
// Drives the playable lineage stages. The player starts as Purgatorius and
// unlocks the next stage once they reach the adult life stage AND mate
// successfully at least LINEAGE_MATINGS_REQUIRED times in the current stage.
//
// Scientific wording rule: these taxa are NOT presented as a guaranteed direct
// ancestor-descendant chain. Each entry is a representative stage on the
// human-line route ("lineage stage"), not a claim of direct descent.
//
// Scope note: encounter tables and world generation are NOT rebuilt here. The
// internal player.species label and encounter narration are intentionally left
// unchanged for now; a later task will wire geologically accurate ecosystems
// and encounters per stage. Stage identity here is purely the progression
// framework plus its UI.

const LINEAGE_MATINGS_REQUIRED = 3;

const lineageStages = {
  purgatorius: {
    id: "purgatorius",
    displayName: "Purgatorius",
    timePeriod: "Early Paleocene",
    shortDescription: "A tiny arboreal mammal surviving in the recovering forests after the K-Pg extinction.",
    nextStageId: "teilhardina",
    unlockText: "Your lineage has survived as a small arboreal mammal in the recovering Paleocene forests. The next representative stage on the human-line route, Teilhardina, is now available."
  },
  teilhardina: {
    id: "teilhardina",
    displayName: "Teilhardina",
    timePeriod: "Early Eocene",
    shortDescription: "An early true primate moving through warm Eocene forests with grasping limbs and sharper vision.",
    nextStageId: "notharctus",
    unlockText: "Your lineage has survived as an early true primate in the warm Eocene canopy. The next representative lineage stage, Notharctus, is now available."
  },
  notharctus: {
    id: "notharctus",
    displayName: "Notharctus",
    timePeriod: "Eocene",
    shortDescription: "A larger Eocene forest primate — a representative forest-primate stage, not a direct human ancestor.",
    nextStageId: "eosimias",
    unlockText: "Your lineage has survived as a larger Eocene forest primate. This is a representative forest-primate stage on the route, not a direct human ancestor. The next lineage stage, Eosimias, is now available."
  },
  eosimias: {
    id: "eosimias",
    displayName: "Eosimias",
    timePeriod: "Middle/Late Eocene",
    shortDescription: "A small anthropoid-grade primate on the route toward monkeys, apes, and humans.",
    nextStageId: null,
    unlockText: "Your lineage has reached an early anthropoid-grade stage. From here, later routes can lead toward catarrhines, apes, and eventually hominins."
  }
  // TODO (future task): add the next lineage stage, likely Aegyptopithecus,
  // once geologically accurate encounter tables and world generation exist.
};

function getLineageStage(id) {
  return (id && lineageStages[id]) ? lineageStages[id] : null;
}

// Fresh per-run + default progression state. Used at first load and as a
// fallback when no profile is active. References no other module-level const,
// so it is safe to call during early initialisation (function-hoisted).
function getInitialLineageState() {
  return {
    currentStageId: "purgatorius",
    completedStages: [],
    evolutionUnlocked: false,
    stageProgress: {
      adultReached: false,
      successfulMatingCount: 0
    }
  };
}

// --- Profile-scoped persistence (mirrors profileLoadFieldJournal) ---
// currentStageId and completedStages persist across runs/deaths so that a
// restart resumes as the current species and death never erases unlocked
// progression. Per-run progress is always reset to a fresh state here.
function profileLoadLineage() {
  const fresh = getInitialLineageState();
  if (typeof currentProfileId === "undefined" || !currentProfileId) return fresh;
  try {
    const store = profileLoadStore();
    const profile = store.profiles[currentProfileId];
    if (profile && profile.lineage) {
      if (profile.lineage.currentStageId && getLineageStage(profile.lineage.currentStageId)) {
        fresh.currentStageId = profile.lineage.currentStageId;
      }
      if (Array.isArray(profile.lineage.completedStages)) {
        fresh.completedStages = profile.lineage.completedStages.slice();
      }
    }
  } catch (_) {}
  return fresh;
}

function profileSaveLineage() {
  if (typeof currentProfileId === "undefined" || !currentProfileId || !player.lineage) return;
  try {
    const store = profileLoadStore();
    const profile = store.profiles[currentProfileId];
    if (!profile) return;
    profile.lineage = {
      currentStageId: player.lineage.currentStageId,
      completedStages: (player.lineage.completedStages || []).slice()
    };
    profileSaveStore(store);
  } catch (_) {}
}

// --- Progress hooks (called from existing gameplay events) ---

// Called from the existing growth/maturity path. Marks adult once the existing
// isPlayerMature() growth gate (player.size >= adult threshold) is satisfied.
function lineageRecordAdult() {
  if (!player.lineage) player.lineage = getInitialLineageState();
  if (player.lineage.stageProgress.adultReached) return;
  if (typeof isPlayerMature === "function" && isPlayerMature()) {
    player.lineage.stageProgress.adultReached = true;
    checkLineageUnlock();
  }
}

// Called from the existing successful-mating logic (both encounter and group
// mating paths), alongside the player.matingCount increment.
function lineageRecordMating() {
  if (!player.lineage) player.lineage = getInitialLineageState();
  player.lineage.stageProgress.successfulMatingCount =
    (player.lineage.stageProgress.successfulMatingCount || 0) + 1;
  checkLineageUnlock();
}

// Evaluates the two unlock gates: adult reached AND >= 3 successful matings.
// Does not force evolution — it only marks evolution as available.
function checkLineageUnlock() {
  if (!player.lineage || player.lineage.evolutionUnlocked) return;
  const p = player.lineage.stageProgress;
  if (p.adultReached && (p.successfulMatingCount || 0) >= LINEAGE_MATINGS_REQUIRED) {
    player.lineage.evolutionUnlocked = true;
    const stage = getLineageStage(player.lineage.currentStageId);
    if (stage && stage.nextStageId) {
      const next = getLineageStage(stage.nextStageId);
      addLog(`Lineage stage complete. You may now evolve to ${next ? next.displayName : "the next stage"}, or keep exploring this ecosystem.`, "primate");
    } else {
      addLog("Lineage stage complete. The current lineage arc is finished — you may keep exploring.", "primate");
    }
    if (typeof render === "function") render();
  }
}

// Advances to the next stage and starts a fresh run as that species. Used by
// the lineage panel ("Evolve now") and the death screen ("Evolve to ..."). The
// just-finished run is recorded against the CURRENT stage before advancing;
// the advanced stage is persisted at profile level so the fresh run loads it.
function lineageEvolveNow() {
  if (!player.lineage || !player.lineage.evolutionUnlocked) return;
  const cur = getLineageStage(player.lineage.currentStageId);
  if (!cur || !cur.nextStageId) return;
  const next = getLineageStage(cur.nextStageId);
  // Close out the run that was just played (recorded as the current stage).
  try { profileOnRunEnd(player.dead ? "death" : "evolved"); } catch (_) {}
  // Advance the lineage and persist it before the fresh run is built.
  const completed = (player.lineage.completedStages || []).slice();
  if (!completed.includes(cur.id)) completed.push(cur.id);
  player.lineage.completedStages = completed;
  player.lineage.currentStageId = cur.nextStageId;
  player.lineage.evolutionUnlocked = false;
  player.lineage.stageProgress = { adultReached: false, successfulMatingCount: 0 };
  profileSaveLineage();
  try { hideDeathModal(); } catch (_) {}
  // Fresh run as the new stage. resetGameForPlayer reloads lineage from the
  // profile (now advanced) via profileLoadLineage().
  resetGameForPlayer(`evolved to ${next ? next.displayName : "next lineage stage"}`);
  addLog(`Your lineage advances to ${next ? next.displayName : "the next stage"}${next ? " (" + next.timePeriod + ")" : ""}.`, "primate");
  if (typeof render === "function") render();
}

// --- Progress UI ---
// Renders the visible lineage panel. Plain English, concise; shows current
// species, epoch, adult status, mating progress, and evolution state.
function renderLineagePanel() {
  const el = document.getElementById("lineagePanel");
  if (!el) return;
  if (!player.lineage) player.lineage = getInitialLineageState();
  const stage = getLineageStage(player.lineage.currentStageId) || getLineageStage("purgatorius");
  const p = player.lineage.stageProgress || { adultReached: false, successfulMatingCount: 0 };
  const matings = Math.min(p.successfulMatingCount || 0, LINEAGE_MATINGS_REQUIRED);
  const adultText = p.adultReached ? "Yes" : "Not yet";
  const next = stage.nextStageId ? getLineageStage(stage.nextStageId) : null;

  let evoBlock;
  if (player.lineage.evolutionUnlocked) {
    if (next) {
      evoBlock = `
        <div class="lineageEvoAvailable">Evolution available — next lineage stage: <strong>${escapeHtml(next.displayName)}</strong></div>
        <div class="lineageUnlockText">${escapeHtml(stage.unlockText)}</div>
        <div class="lineageActions">
          <button type="button" id="lineageEvolveBtn">Evolve to ${escapeHtml(next.displayName)}</button>
          <button type="button" id="lineageContinueBtn">Continue exploring</button>
        </div>`;
    } else {
      evoBlock = `
        <div class="lineageEvoAvailable">Current lineage arc complete.</div>
        <div class="lineageUnlockText">${escapeHtml(stage.unlockText)}</div>
        <div class="lineageActions">
          <button type="button" id="lineageContinueBtn">Continue exploring</button>
        </div>`;
    }
  } else {
    evoBlock = `<div class="lineageEvoLocked">Evolution: Locked until this stage is complete (adult + ${LINEAGE_MATINGS_REQUIRED} successful matings).</div>`;
  }

  el.innerHTML = `
    <div class="lineagePanelTitle">Lineage</div>
    <div class="lineageStage"><strong>Current stage:</strong> ${escapeHtml(stage.displayName)}</div>
    <div class="lineageMeta">Time: ${escapeHtml(stage.timePeriod)}</div>
    <div class="lineageDesc">${escapeHtml(stage.shortDescription)}</div>
    <div class="lineageProgress">
      <div>Adult: ${adultText}</div>
      <div>Successful matings: ${matings} / ${LINEAGE_MATINGS_REQUIRED}</div>
    </div>
    ${evoBlock}`;

  const evolveBtn = el.querySelector("#lineageEvolveBtn");
  if (evolveBtn) evolveBtn.addEventListener("click", () => lineageEvolveNow());
  const continueBtn = el.querySelector("#lineageContinueBtn");
  if (continueBtn) continueBtn.addEventListener("click", () => {
    addLog("You stay in this ecosystem for now. You can evolve later from the Lineage panel, or on death.", "minor");
  });
}
