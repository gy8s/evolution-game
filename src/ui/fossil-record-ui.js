function renderFossilRecord(records) {
  if (!records || records.length === 0) {
    return '<div class="fossilRecordTitle">Fossil Record</div><div class="fossilRecordEmpty">No specimens yet.</div>';
  }
  const entries = records.map((r, i) => {
    const turns = parseInt(r.turns, 10) || 0;
    const companions = parseInt(r.companions, 10) || 0;
    const meta = [escapeHtml(r.date), companions > 0 ? `${companions} companion${companions !== 1 ? "s" : ""}` : ""].filter(Boolean).join(" · ");
    return `<div class="fossilEntry">
      <span class="fossilEntryTurns">Specimen #${records.length - i} &mdash; ${turns} turn${turns !== 1 ? "s" : ""}</span>
      <span class="fossilEntryCause">${escapeHtml(r.cause)}</span>
      <span class="fossilEntryMeta">${meta}</span>
    </div>`;
  }).join("");
  return `<div class="fossilRecordTitle">Fossil Record &mdash; ${records.length} specimen${records.length !== 1 ? "s" : ""} catalogued</div>${entries}`;
}

function renderRunRecap() {
  const rt = player.runTracking || {};
  const turns = player.turn || 0;
  const nights = rt.nightSurvivedCount || 0;
  const tiles = rt.tilesExplored || 0;
  const foodTypes = Object.keys(rt.foodTypesEaten || {}).length;
  const pursuits = rt.pursuitsEscaped || 0;
  const mates = player.matingCount || 0;
  const companions = (socialGroup && Array.isArray(socialGroup.members)) ? socialGroup.members.length : 0;

  const stats = [
    ["Turns survived", turns],
    ["Nights survived", nights],
    ["Tiles explored", tiles],
    ["Food types tried", foodTypes],
    ["Predators escaped", pursuits],
    ["Matings", `${mates}/5`]
  ];
  if (companions > 0) stats.push(["Companions at death", companions]);
  if (rt.poisonSurvived) stats.push(["Poison survived", "yes"]);
  if (rt.wildfireEscaped) stats.push(["Wildfire survived", "yes"]);

  const gridHtml = stats.map(([label, val]) =>
    `<div class="runRecapStat">${escapeHtml(label)}: <span>${escapeHtml(String(val))}</span></div>`
  ).join("");

  let achHtml = "";
  if (runNewAchievements.length > 0) {
    const entries = runNewAchievements.map(a =>
      `<div class="runRecapAchievementEntry"><span class="rai">${a.icon}</span>${escapeHtml(a.name)}</div>`
    ).join("");
    achHtml = `<div class="runRecapAchievements"><div class="runRecapAchievementsLabel">${runNewAchievements.length} achievement${runNewAchievements.length !== 1 ? "s" : ""} unlocked this run:</div>${entries}</div>`;
  }

  return `<div class="runRecap"><div class="runRecapTitle">Run summary</div><div class="runRecapGrid">${gridHtml}</div>${achHtml}</div>`;
}
