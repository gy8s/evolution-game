function profileLoadFieldJournal() {
  if (!currentProfileId) return {};
  try {
    const store = profileLoadStore();
    const profile = store.profiles[currentProfileId];
    if (!profile || !profile.fieldJournal) return {};
    return JSON.parse(JSON.stringify(profile.fieldJournal));
  } catch (_) { return {}; }
}

function profileWriteJournalEntry(typeKey, entry) {
  if (!currentProfileId) return;
  try {
    const store = profileLoadStore();
    const profile = store.profiles[currentProfileId];
    if (!profile) return;
    if (!profile.fieldJournal) profile.fieldJournal = {};
    profile.fieldJournal[typeKey] = Object.assign({}, entry);
    profileSaveStore(store);
  } catch (_) {}
}

function getEncounterLogCategory(e) {
  if (!e) return "misc";
  const kind = e.kind || "";
  if (kind === "carcass" || kind === "nest") return "misc";
  if (kind === "animal") return "fauna";
  if (kind === "remedy") return "flora";
  const cls = knowledgeClassFor(e);
  if (["insects", "caterpillars", "myriapods", "arachnids", "amphibians"].includes(cls)) return "fauna";
  return "flora";
}

function journalMarkFirstSeen(e) {
  if (!e) return;
  const typeKey = getEncounterTypeKey(e);
  if (!player.knowledgeByEncounterKey) player.knowledgeByEncounterKey = {};
  if (player.knowledgeByEncounterKey[typeKey] && player.knowledgeByEncounterKey[typeKey].firstSeen) return;
  const existing = player.knowledgeByEncounterKey[typeKey] || {};
  const entry = Object.assign(existing, {
    typeKey,
    name: e.name || typeKey,
    category: getEncounterLogCategory(e),
    firstSeen: true,
    firstSeenTurn: player.turn,
    investigations: existing.investigations || 0
  });
  player.knowledgeByEncounterKey[typeKey] = entry;
  profileWriteJournalEntry(typeKey, entry);
}
