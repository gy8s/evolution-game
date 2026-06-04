function profileLoadStore() {
  try {
    const raw = localStorage.getItem(PROFILE_STORE_KEY);
    if (!raw) return profileEmptyStore();
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") throw new Error("bad-format");
    return data;
  } catch (e) {
    try {
      const raw = localStorage.getItem(PROFILE_STORE_KEY);
      if (raw) localStorage.setItem("evolutionGameProfiles_corruptBackup_" + Date.now(), raw.slice(0, 100000));
    } catch (_) {}
    return profileEmptyStore();
  }
}

function profileSaveStore(data) {
  try {
    localStorage.setItem(PROFILE_STORE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    addDebugTrace("profile-save-error", {error: String(e)});
    return false;
  }
}

function profileCreateNew(name) {
  const store = profileLoadStore();
  const profileId = profileGenerateId("profile");
  const now = new Date().toISOString();
  store.profiles[profileId] = {
    profileId,
    name: name || "Profile 1",
    createdAt: now,
    lastPlayedAt: now,
    buildId: GAME_VERSION,
    buildCompatible: true,
    stats: profileDefaultStats(),
    activeRun: null,
    runHistory: [],
    fieldJournal: {}
  };
  profileSaveStore(store);
  currentProfileId = profileId;
  try { localStorage.setItem(ACTIVE_PROFILE_KEY_STORE, profileId); } catch (_) {}
  return store.profiles[profileId];
}

function profileGetActive() {
  if (!currentProfileId) return null;
  const store = profileLoadStore();
  return store.profiles[currentProfileId] || null;
}

function profileCheckBuildCompatibility(profile) {
  if (!profile) return {compatible: false};
  const savedBuild = profile.buildId || "";
  const localBuild = GAME_VERSION;
  const compatible = savedBuild === localBuild;
  if (!compatible) addDebugTrace("profile-build-mismatch", {savedBuild, localBuild, profileId: profile.profileId});
  return {compatible, savedBuild, localBuild};
}
