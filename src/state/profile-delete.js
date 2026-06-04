function deleteProfile(profileId) {
  if (!profileId) return;
  const store = profileLoadStore();
  delete store.profiles[profileId];
  profileSaveStore(store);
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_STORE_KEY);
    const all = raw ? JSON.parse(raw) : {};
    delete all[profileId];
    localStorage.setItem(ACHIEVEMENTS_STORE_KEY, JSON.stringify(all));
  } catch (_) {}
  try {
    const raw = localStorage.getItem(FOSSIL_RECORD_KEY);
    let records = raw ? JSON.parse(raw) : [];
    if (Array.isArray(records)) {
      records = records.filter(r => r.profileId && r.profileId !== profileId);
      localStorage.setItem(FOSSIL_RECORD_KEY, JSON.stringify(records));
    }
  } catch (_) {}
  try {
    if (localStorage.getItem(ACTIVE_PROFILE_KEY_STORE) === profileId) {
      localStorage.removeItem(ACTIVE_PROFILE_KEY_STORE);
    }
  } catch (_) {}
  if (currentProfileId === profileId) currentProfileId = null;
}
