function loadAchievements(profileId) {
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_STORE_KEY);
    const all = raw ? JSON.parse(raw) : {};
    return all[profileId] || {};
  } catch (_) { return {}; }
}

function saveAchievements(profileId, achObj) {
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_STORE_KEY);
    const all = raw ? JSON.parse(raw) : {};
    all[profileId] = achObj;
    localStorage.setItem(ACHIEVEMENTS_STORE_KEY, JSON.stringify(all));
  } catch (_) {}
}
// << SPLIT: awardAchievement >>
function awardAchievement(key, name) {
  if (!currentProfileId) return false;
  const ach = loadAchievements(currentProfileId);
  if (ach[key]) return false;
  ach[key] = new Date().toLocaleDateString();
  saveAchievements(currentProfileId, ach);
  addLog(`Achievement unlocked: ${name}`, "achievement");
  const def = ACHIEVEMENT_DEFS.find(d => d.key === key);
  const icon = def ? def.icon : "✨";
  runNewAchievements.push({key, name, icon});
  showAchievementToast(icon, name);
  return true;
}
// << SPLIT: checkAchievements >>
function checkAchievements() {
  if (!currentProfileId) return;
  const rt = player.runTracking || {};
  const profileData = profileGetActive();
  const ps = (profileData && profileData.stats) ? profileData.stats : {};
  const ach = loadAchievements(currentProfileId);
  for (const def of ACHIEVEMENT_DEFS) {
    if (ach[def.key]) continue;
    try {
      if (def.check(player, rt, ps)) {
        awardAchievement(def.key, def.name);
      }
    } catch (_) {}
  }
}
