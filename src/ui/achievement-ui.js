function getProfileAchievements() {
  if (!currentProfileId) return {};
  return loadAchievements(currentProfileId);
}
// << SPLIT: toastHelpers >>
let _toastQueue = [];
let _toastActive = false;

function clearToastQueue() {
  _toastQueue = [];
  _toastActive = false;
  document.querySelectorAll(".achievementToast").forEach(el => el.remove());
}

function showAchievementToast(icon, name) {
  _toastQueue.push({icon, name});
  if (!_toastActive) _processToastQueue();
}

function _processToastQueue() {
  if (!_toastQueue.length) { _toastActive = false; return; }
  _toastActive = true;
  const {icon, name} = _toastQueue.shift();
  const el = document.createElement("div");
  el.className = "achievementToast";
  el.innerHTML = `<span class="achievementToastIcon">${icon}</span><span><div class="achievementToastLabel">${escapeHtml(name)}</div><div class="achievementToastSub">Achievement unlocked</div></span>`;
  document.body.appendChild(el);
  const dismiss = () => {
    el.classList.add("hide");
    setTimeout(() => { el.remove(); _processToastQueue(); }, 420);
  };
  setTimeout(dismiss, 2800);
}
// << SPLIT: renderAchievements >>
function renderAchievements() {
  const ach = getProfileAchievements();
  const unlockedCount = Object.keys(ach).length;
  const total = ACHIEVEMENT_DEFS.length;
  const cats = {};
  for (const def of ACHIEVEMENT_DEFS) {
    if (!cats[def.cat]) cats[def.cat] = [];
    cats[def.cat].push(def);
  }
  let html = `<div class="achievementCount">${unlockedCount} / ${total} unlocked</div>`;
  for (const [cat, defs] of Object.entries(cats)) {
    html += `<div class="achievementGroup"><div class="achievementGroupHeader">${escapeHtml(cat)}</div>`;
    for (const def of defs) {
      const unlocked = !!ach[def.key];
      const dateStr = unlocked ? ach[def.key] : "";
      html += `<div class="achievementEntry ${unlocked ? "unlocked" : "locked"}">
        <span class="achievementIcon">${def.icon}</span>
        <span>
          <span class="achievementName">${escapeHtml(def.name)}</span>
          <span class="achievementDesc"> — ${escapeHtml(def.desc)}</span>
          ${unlocked ? `<div class="achievementDate">Unlocked ${escapeHtml(dateStr)}</div>` : ""}
        </span>
      </div>`;
    }
    html += `</div>`;
  }
  return html;
}
