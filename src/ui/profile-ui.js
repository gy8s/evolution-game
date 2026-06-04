function showWinModal() {
  const modal = document.getElementById("winModal");
  const msg = document.getElementById("winModalMessage");
  if (!modal) return;
  if (msg) msg.textContent = "You have completed 5 successful matings. Your lineage continues. You can record this as a win on your profile, or keep playing.";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function hideWinModal() {
  const modal = document.getElementById("winModal");
  if (modal) { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); }
}

function onWinAchieved() {
  if (winAchievedThisRun) return;
  winAchievedThisRun = true;
  showWinModal();
}
// << SPLIT: profileUpdatePanelUI >>
function profileUpdatePanelUI() {
  const label = document.getElementById("profileCurrentLabel");
  const histEl = document.getElementById("profileHistoryList");
  if (!currentProfileId) {
    if (label) label.textContent = "No profile active";
    if (histEl) histEl.innerHTML = "";
    return;
  }
  const store = profileLoadStore();
  const profile = store.profiles[currentProfileId];
  if (!profile) { if (label) label.textContent = "No profile active"; return; }
  const s = profile.stats;
  const gmCount = s.godModeRuns || 0;
  const gmNote = gmCount > 0 ? " | GM runs: " + gmCount : "";
  if (label) label.textContent = profile.name + " | Runs: " + s.totalRuns + " | Deaths: " + s.deaths + " | Wins: " + s.wins + gmNote + " | Best turn: " + s.bestTurn;
  if (histEl) {
    const recent = (profile.runHistory || []).slice(0, 5);
    if (!recent.length) {
      histEl.innerHTML = "<em>No runs yet.</em>";
    } else {
      histEl.innerHTML = recent.map((r, i) => {
        const cls = r.outcome === "win" ? "win" : r.outcome === "death" ? "death" : "abandoned";
        const cause = r.deathCause ? " — " + r.deathCause.slice(0, 40) : "";
        const gmFlag = profileRunIsGodMode(r) ? ' <span style="color:#f0a840">[GM]</span>' : "";
        return '<span class="' + cls + '">Run ' + (i + 1) + ': ' + r.outcome + gmFlag + ' | Turn ' + r.turnsSurvived + ' | Matings: ' + r.matingCount + '/5' + cause + '</span>';
      }).join("<br>");
    }
  }
}
