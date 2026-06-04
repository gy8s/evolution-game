function profileShowStartupModal(onChoiceMade) {
  const modal = document.getElementById("profileModal");
  const body = document.getElementById("profileModalBody");
  const actions = document.getElementById("profileModalActions");
  if (!modal || !body || !actions) { onChoiceMade(null); return; }

  const store = profileLoadStore();
  const profileList = Object.values(store.profiles);
  let selectedProfileId = null;

  try {
    const lastId = localStorage.getItem(ACTIVE_PROFILE_KEY_STORE);
    if (lastId && store.profiles[lastId]) selectedProfileId = lastId;
    else if (profileList.length === 1) selectedProfileId = profileList[0].profileId;
  } catch (_) {}

  function renderModalContent() {
    body.innerHTML = "";
    actions.innerHTML = "";

    if (!profileList.length) {
      body.innerHTML = "<p style='color:#999;margin:0 0 8px'>No profiles yet. Create your first profile to begin.</p>";
    } else {
      profileList.forEach(p => {
        const div = document.createElement("div");
        div.className = "profileEntry" + (selectedProfileId === p.profileId ? " selected" : "");
        div.dataset.id = p.profileId;
        const compat = profileCheckBuildCompatibility(p);
        const compatWarn = compat.compatible ? "" : ' <span style="color:#f0a840">[build mismatch]</span>';
        let runText = "";
        if (p.activeRun) {
          const sm = p.activeRun.summary || {};
          runText = '<div class="profileEntryRun profileEntryRunActive">Active run: Turn ' + (sm.turn || 0) + ' | Matings: ' + (sm.matingCount || 0) + '/5 | Group: ' + (sm.groupSize || 0) + '</div>';
        } else if ((p.runHistory || []).length) {
          const last = p.runHistory[0];
          const gmTag = profileRunIsGodMode(last) ? ' <span style="color:#f0a840">[GM]</span>' : "";
          runText = '<div class="profileEntryRun">Last: ' + last.outcome + gmTag + ' | Turn ' + last.turnsSurvived + '</div>';
        } else {
          runText = '<div class="profileEntryRun">No runs yet.</div>';
        }
        div.innerHTML = '<div class="profileEntryName">' + escapeHtml(p.name) + compatWarn + '<button class="profileEntryDeleteBtn" type="button" data-delid="' + escapeHtml(p.profileId) + '" title="Delete profile">Delete</button></div><div class="profileEntryMeta">Build: ' + escapeHtml((p.buildId || "").slice(0, 35)) + ' | Runs: ' + ((p.stats || {}).totalRuns || 0) + '</div>' + runText;
        div.addEventListener("click", (ev) => {
          if (ev.target.closest("[data-delid]")) return;
          selectedProfileId = p.profileId;
          renderModalContent();
        });
        const delBtn = div.querySelector("[data-delid]");
        if (delBtn) {
          delBtn.addEventListener("click", (ev) => {
            ev.stopPropagation();
            const targetId = delBtn.dataset.delid;
            const targetName = escapeHtml(p.name);
            body.querySelectorAll(".profileDeleteConfirm").forEach(el => el.remove());
            const confirm = document.createElement("div");
            confirm.className = "profileDeleteConfirm";
            confirm.innerHTML = '<p><strong>Delete "' + targetName + '"?</strong><br>This permanently erases all data for this profile: run history, Field Journal, Fossil Record, and Achievements. <strong>This cannot be undone.</strong></p><div class="deleteConfirmBtns"></div>';
            const btns = confirm.querySelector(".deleteConfirmBtns");
            const cancelBtn = document.createElement("button");
            cancelBtn.textContent = "Cancel";
            cancelBtn.addEventListener("click", () => confirm.remove());
            const confirmBtn = document.createElement("button");
            confirmBtn.textContent = "Delete permanently";
            confirmBtn.className = "danger";
            confirmBtn.addEventListener("click", () => {
              const idx = profileList.findIndex(x => x.profileId === targetId);
              if (idx !== -1) profileList.splice(idx, 1);
              if (selectedProfileId === targetId) selectedProfileId = profileList.length ? profileList[0].profileId : null;
              deleteProfile(targetId);
              renderModalContent();
            });
            btns.appendChild(cancelBtn);
            btns.appendChild(confirmBtn);
            div.after(confirm);
          });
        }
        body.appendChild(div);
      });
    }

    const newBtn = document.createElement("button");
    newBtn.textContent = "New Profile";
    newBtn.addEventListener("click", () => {
      const name = window.prompt("Profile name:", "Profile " + (profileList.length + 1));
      if (!name) return;
      const newP = profileCreateNew(name.slice(0, 40));
      store.profiles[newP.profileId] = newP;
      profileList.push(newP);
      selectedProfileId = newP.profileId;
      renderModalContent();
    });
    actions.appendChild(newBtn);

    if (selectedProfileId) {
      const selProfile = profileList.find(p => p.profileId === selectedProfileId);
      if (selProfile && selProfile.activeRun) {
        const resumeBtn = document.createElement("button");
        resumeBtn.textContent = "Resume Run";
        resumeBtn.className = "primary";
        resumeBtn.addEventListener("click", () => {
          currentProfileId = selectedProfileId;
          try { localStorage.setItem(ACTIVE_PROFILE_KEY_STORE, selectedProfileId); } catch (_) {}
          modal.classList.remove("open");
          modal.setAttribute("aria-hidden", "true");
          onChoiceMade({profileId: selectedProfileId, resume: true, profile: selProfile});
        });
        actions.appendChild(resumeBtn);
      }
      const playBtn = document.createElement("button");
      playBtn.textContent = (selProfile && selProfile.activeRun) ? "Start New Run" : "Play";
      if (!(selProfile && selProfile.activeRun)) playBtn.className = "primary";
      playBtn.addEventListener("click", () => {
        currentProfileId = selectedProfileId;
        try { localStorage.setItem(ACTIVE_PROFILE_KEY_STORE, selectedProfileId); } catch (_) {}
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        onChoiceMade({profileId: selectedProfileId, resume: false, profile: selProfile || null});
      });
      actions.appendChild(playBtn);
    }
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  renderModalContent();
}
