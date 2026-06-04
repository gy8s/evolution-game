function saveFossilRecord(deathMessage) {
  let records = [];
  try { records = JSON.parse(localStorage.getItem(FOSSIL_RECORD_KEY) || "[]"); } catch (_) {}
  if (!Array.isArray(records)) records = [];
  const companions = (socialGroup && Array.isArray(socialGroup.members)) ? socialGroup.members.length : 0;
  records.unshift({
    profileId: currentProfileId || null,
    turns: player.turn || 0,
    cause: (deathMessage || "Unknown").replace(/^Turn \d+:\s*/i, ""),
    companions,
    date: new Date().toLocaleDateString()
  });
  if (records.length > FOSSIL_RECORD_CAP) records.length = FOSSIL_RECORD_CAP;
  try { localStorage.setItem(FOSSIL_RECORD_KEY, JSON.stringify(records)); } catch (_) {}
  return records.filter(r => !r.profileId || r.profileId === currentProfileId);
}
