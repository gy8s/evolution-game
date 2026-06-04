function initGame(resumeChoice) {
  if (!player.runTracking) player.runTracking = freshRunTracking();
  runNewAchievements = [];
  clearToastQueue();
  generateTerrain();
  generateHabitats();
  lastHabitatKey = habitatKeyAt(player.x, player.y);
  if (resumeChoice && resumeChoice.resume && resumeChoice.profile) {
    const ok = profileResumeActiveRun(resumeChoice.profile);
    if (!ok) {
      seedClayDeposits();
      reconcileCurrentTileState();
      profileStartNewRun();
      addLog("Resume failed. Starting new run.", "minor");
      addLog("Prototype started. You are small, agile, and vulnerable.", "minor");
      addLog("Controls: WASD/arrows move, Q/E/Z/C diagonals, space waits, R climbs, X descends, F attacks, I investigates, V eats/drinks, K looks, B grooms, H opens call menu, G leaves group, L sleeps.", "minor");
      render();
    }
  } else {
    seedClayDeposits();
    reconcileCurrentTileState();
    profileStartNewRun();
    render();
    addLog("Prototype started. You are small, agile, and vulnerable.", "minor");
    addLog("Controls: WASD/arrows move, Q/E/Z/C diagonals, space waits, R climbs, X descends, F attacks, I investigates, V eats/drinks, K looks, B grooms, H opens call menu, G leaves group, L sleeps.", "minor");
  }
  profileUpdatePanelUI();
}