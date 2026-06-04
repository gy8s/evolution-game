// @target [INVESTIGATION] Show Encounter Journal Entry (single creature window)
function showEncounterJournalEntry(typeKey) {
  if (!typeKey) return;
  const modal = document.getElementById("nhModal");
  const body = document.getElementById("nhModalBody");
  const titleEl = document.getElementById("nhModalTitle");
  if (!modal || !body || !titleEl) return;

  const journal = player.knowledgeByEncounterKey || {};
  const tk = journal[typeKey];
  const count = tk ? (tk.investigations || 0) : 0;
  const name = (tk && tk.name) || typeKey;
  const nh = encounters[typeKey] && encounters[typeKey].naturalHistory;

  const nhSections = [
    { label: "Field Note", key: "fieldNote" },
    { label: "Behaviour", key: "behaviour" },
    { label: "Ecology", key: "ecology" },
    { label: "Danger to you", key: "gameplayInsight" },
    { label: "Science note", key: "scienceNote" }
  ];

  titleEl.textContent = name;
  const oldBadge = titleEl.querySelector(".nhModalProgress");
  if (oldBadge) oldBadge.remove();
  if (count < KNOWLEDGE_MAX) {
    const badge = document.createElement("span");
    badge.className = "nhModalProgress";
    const unlockedCount = KNOWLEDGE_NH_THRESHOLDS.filter(t => count >= t).length;
    badge.textContent = count < KNOWLEDGE_INFO_UNLOCK
      ? `${count} inv.`
      : `${unlockedCount}/${nhSections.length} sections`;
    titleEl.appendChild(badge);
  }

  let html = "";
  if (!nh || count < KNOWLEDGE_INFO_UNLOCK) {
    const needed = KNOWLEDGE_INFO_UNLOCK - count;
    html = `<div class="nhModalSection"><p>${needed > 0
      ? `Investigate ${needed} more time${needed === 1 ? "" : "s"} to unlock field notes.`
      : "Field notes unlocked — keep investigating to reveal more sections."}</p></div>`;
  } else {
    html = nhSections
      .filter((s, i) => count >= KNOWLEDGE_NH_THRESHOLDS[i] && nh[s.key])
      .map(s => `<div class="nhModalSection"><strong>${s.label}</strong><p>${nh[s.key]}</p></div>`)
      .join("") || `<div class="nhModalSection"><p>Continue investigating to expand your field notes.</p></div>`;
  }
  html += `<div class="nhModalSection" style="border-top:1px solid #1a3c22;margin-top:8px;padding-top:8px"><p style="font-size:12px;color:#6db87a">${count}/${KNOWLEDGE_MAX} investigations recorded</p></div>`;

  body.innerHTML = html;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

// @target [INVESTIGATION] Show Field Journal (index)
function showFieldJournal(tab) {
  const modal = document.getElementById("fjModal");
  const body = document.getElementById("fjBody");
  if (!modal || !body) return;

  const activeTab = tab || (modal.querySelector(".fjTab.active") || {}).dataset && modal.querySelector(".fjTab.active").dataset.fjtab || "fauna";
  modal.querySelectorAll(".fjTab").forEach(t => t.classList.toggle("active", t.dataset.fjtab === activeTab));

  if (activeTab === "fossil") {
    let records = [];
    try { records = JSON.parse(localStorage.getItem(FOSSIL_RECORD_KEY) || "[]"); } catch (_) {}
    if (!Array.isArray(records)) records = [];
    records = records.filter(r => !r.profileId || r.profileId === currentProfileId);
    body.innerHTML = `<div style="padding:10px 14px;">${renderFossilRecord(records)}</div>`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    return;
  }

  if (activeTab === "awards") {
    body.innerHTML = `<div style="padding:10px 0;">${renderAchievements()}</div>`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    return;
  }

  const journal = player.knowledgeByEncounterKey || {};
  const entries = Object.values(journal);
  const tabGroups = FJ_TAB_GROUPS[activeTab] || [];
  const tabEntries = entries.filter(tk => tabGroups.includes(getEncounterGroup(tk.typeKey)));

  if (!tabEntries.length) {
    body.innerHTML = `<p style="padding:12px 14px;color:#6db87a;font-style:italic">No ${activeTab} entries yet.</p>`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    return;
  }

  const grouped = {};
  for (const tk of tabEntries) {
    const g = getEncounterGroup(tk.typeKey);
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(tk);
  }

  const html = FJ_GROUPS
    .filter(g => tabGroups.includes(g) && grouped[g])
    .map(g => {
      const rows = grouped[g]
        .slice()
        .sort((a, b) => (a.name || "").localeCompare(b.name || ""))
        .map(tk => {
          const count = tk.investigations || 0;
          const hasNotes = !!(encounters[tk.typeKey] && encounters[tk.typeKey].naturalHistory && count >= KNOWLEDGE_INFO_UNLOCK);
          const label = count >= KNOWLEDGE_MAX ? "✓" : `${count}`;
          return `<div class="fjEntryRow${hasNotes ? " fjEntryRowNH" : ""}" data-fjtk="${tk.typeKey}">
            <span class="fjEntryRowName">${tk.name || tk.typeKey}</span>
            <span class="fjEntryRowCount">${label}</span>
          </div>`;
        }).join("");
      return `<div class="fjGroup"><div class="fjGroupHeader">${g}</div>${rows}</div>`;
    }).join("");

  body.innerHTML = html;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}
