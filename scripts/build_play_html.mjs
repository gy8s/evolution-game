#!/usr/bin/env node
// build_play_html.mjs
//
// Inlines source files into the generated regions of game/play.html so the
// file stays directly playable without external dependencies at runtime.
//
// Currently inlines:
//   1. src/styles/game.css        → the <style> block (CSS)
//   2. src/data/encounter-data.js → two JS regions:
//        [1/2] encounters (with layers + subtypes)  (~line 1040)
//        [2/2] empty (hiddenSubtypePools removed)   (~line 6037)
//   3. src/utils/core-utils.js    → one JS region (~line 5833)
//   4. src/data/achievement-data.js → one JS region (~line 4800)
//   5. src/state/run-tracking.js   → one JS region (~line 4763)
//   6. src/state/profile-storage-constants.js → one JS region (~line 4481)
//   7. src/state/profile-factories.js → one JS region (~line 4500)
//   8. src/state/profile-store-core.js → one JS region (~line 4514)
//   9. src/state/profile-state-snapshot.js → one JS region (~line 4579)
//  10. src/state/profile-run-lifecycle.js → three JS regions:
//        [1/3] knowledge/summary/stats helpers (~line 4720)
//        [2/3] run-end + active-run save       (~line 5013)
//        [3/3] start-new + resume helpers      (~line 5152)
//  11. src/state/achievement-persistence.js → three JS regions:
//        [1/3] loadAchievements + saveAchievements (~line 4877)
//        [2/3] awardAchievement                   (~line 4901)
//        [3/3] checkAchievements                  (~line 4944)
//  12. src/state/field-journal-state.js → one JS region (~line 5107)
//      src/state/lineage.js → one JS region (~line 5298)
//  13. src/ui/achievement-ui.js → three JS regions:
//        [1/3] getProfileAchievements             (~line 4896)
//        [2/3] toast queue/helpers                (~line 4919)
//        [3/3] renderAchievements                 (~line 4968)
//  14. src/state/run-tracking-update.js → one JS region (~line 4999)
//  15. src/ui/profile-ui.js → two JS regions:
//        [1/2] showWinModal + hideWinModal + onWinAchieved (~line 5222)
//        [2/2] profileUpdatePanelUI                        (~line 5246)
//  16. src/ui/field-journal-ui.js → one JS region (~line 12946)
//  17. src/state/fossil-record-state.js → one JS region (~line 14311)
//  18. src/ui/fossil-record-ui.js → one JS region (~line 14330)
//  19. src/state/profile-delete.js → one JS region (~line 5280)
//  20. src/ui/profile-startup-modal.js → one JS region (~line 5311)
//  21. src/bootstrap/game-init.js → one JS region (~line 5441)
//  22. src/state/game-state-globals.js → two JS regions:
//        [1/2] knowledge constants + socialGroup + playerSpeciesProfile (~line 5472)
//        [2/2] environment + timeState + layerNarration                 (~line 5741)
//  23. src/qa/debug-helpers.js → one JS region (~line 5514)
//        addDebugTrace, debugRoll, importantStateSnapshot, diffSnapshots,
//        takeQABackSnapshot, restoreQABackSnapshot, addTurnDeltaTrace,
//        addDebugFlag, scanForSuspiciousState
//  24. src/engine/encounter-helpers.js → one JS region (~line 5792)
//        getEncounterTemplate, validateEncounterData, normaliseEncounter
//  25. src/engine/encounter-table-builder.js → one JS region (~line 5915)
//        buildEncounterTables
//
// Why inline (not external files): game/play.html must open straight from
// disk — or via the GitHub Pages link — with no build step and no runtime
// dependency. Source files live under src/ for editability; this script
// copies them back into the marked generated regions.
//
// This script touches ONLY the marked regions. It never alters JavaScript
// outside the encounter-data regions, HTML structure, or CSS outside the
// CSS region.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here     = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');

const CSS_SOURCE      = resolve(repoRoot, 'src/styles/game.css');
const DATA_SOURCE     = resolve(repoRoot, 'src/data/encounter-data.js');
const UTILS_SOURCE    = resolve(repoRoot, 'src/utils/core-utils.js');
const ACHIEVE_SOURCE  = resolve(repoRoot, 'src/data/achievement-data.js');
const RUNTRACK_SOURCE = resolve(repoRoot, 'src/state/run-tracking.js');
const PROFCONST_SOURCE   = resolve(repoRoot, 'src/state/profile-storage-constants.js');
const PROFFACT_SOURCE    = resolve(repoRoot, 'src/state/profile-factories.js');
const PROFCORE_SOURCE    = resolve(repoRoot, 'src/state/profile-store-core.js');
const PROFSNAP_SOURCE    = resolve(repoRoot, 'src/state/profile-state-snapshot.js');
const PROFLIFE_SOURCE    = resolve(repoRoot, 'src/state/profile-run-lifecycle.js');
const ACHPERS_SOURCE     = resolve(repoRoot, 'src/state/achievement-persistence.js');
const FJSTATE_SOURCE     = resolve(repoRoot, 'src/state/field-journal-state.js');
const LINEAGE_SOURCE     = resolve(repoRoot, 'src/state/lineage.js');
const ACHIEVUI_SOURCE    = resolve(repoRoot, 'src/ui/achievement-ui.js');
const RUNTRUPDATE_SOURCE = resolve(repoRoot, 'src/state/run-tracking-update.js');
const PROFUI_SOURCE      = resolve(repoRoot, 'src/ui/profile-ui.js');
const FJUI_SOURCE        = resolve(repoRoot, 'src/ui/field-journal-ui.js');
const FOSSSTATE_SOURCE   = resolve(repoRoot, 'src/state/fossil-record-state.js');
const FOSSUI_SOURCE      = resolve(repoRoot, 'src/ui/fossil-record-ui.js');
const PROFDELETE_SOURCE  = resolve(repoRoot, 'src/state/profile-delete.js');
const PROFSM_SOURCE      = resolve(repoRoot, 'src/ui/profile-startup-modal.js');
const GAMEINIT_SOURCE    = resolve(repoRoot, 'src/bootstrap/game-init.js');
const GAMESTATEGLOBALS_SOURCE = resolve(repoRoot, 'src/state/game-state-globals.js');
const DEBUGHELPERS_SOURCE          = resolve(repoRoot, 'src/qa/debug-helpers.js');
const ENCOUNTERHELPERS_SOURCE      = resolve(repoRoot, 'src/engine/encounter-helpers.js');
const ENCOUNTERTABLEBUILDER_SOURCE = resolve(repoRoot, 'src/engine/encounter-table-builder.js');
const PLAY_HTML                    = resolve(repoRoot, 'game/play.html');

// CSS markers (CSS comment style, inside <style>)
const CSS_BEGIN = '/* BEGIN GENERATED CSS: src/styles/game.css */';
const CSS_END   = '/* END GENERATED CSS: src/styles/game.css */';

// Encounter-data markers (JS comment style, inside <script>)
const JS_BEGIN1 = '// BEGIN GENERATED JS: src/data/encounter-data.js [1/2]';
const JS_END1   = '// END GENERATED JS: src/data/encounter-data.js [1/2]';
const JS_BEGIN2 = '// BEGIN GENERATED JS: src/data/encounter-data.js [2/2]';
const JS_END2   = '// END GENERATED JS: src/data/encounter-data.js [2/2]';

// Core-utils markers (JS comment style, inside <script>)
const JS_BEGIN_UTILS = '// BEGIN GENERATED JS: src/utils/core-utils.js';
const JS_END_UTILS   = '// END GENERATED JS: src/utils/core-utils.js';

// Achievement-data markers (JS comment style, inside <script>)
const JS_BEGIN_ACHIEVE  = '// BEGIN GENERATED JS: src/data/achievement-data.js';
const JS_END_ACHIEVE    = '// END GENERATED JS: src/data/achievement-data.js';

// Run-tracking markers (JS comment style, inside <script>)
const JS_BEGIN_RUNTRACK  = '// BEGIN GENERATED JS: src/state/run-tracking.js';
const JS_END_RUNTRACK    = '// END GENERATED JS: src/state/run-tracking.js';

// Profile-storage-constants markers (JS comment style, inside <script>)
const JS_BEGIN_PROFCONST = '// BEGIN GENERATED JS: src/state/profile-storage-constants.js';
const JS_END_PROFCONST   = '// END GENERATED JS: src/state/profile-storage-constants.js';

// Profile-factories markers (JS comment style, inside <script>)
const JS_BEGIN_PROFFACT = '// BEGIN GENERATED JS: src/state/profile-factories.js';
const JS_END_PROFFACT   = '// END GENERATED JS: src/state/profile-factories.js';

// Profile-store-core markers (JS comment style, inside <script>)
const JS_BEGIN_PROFCORE = '// BEGIN GENERATED JS: src/state/profile-store-core.js';
const JS_END_PROFCORE   = '// END GENERATED JS: src/state/profile-store-core.js';

// Profile-state-snapshot markers (JS comment style, inside <script>)
const JS_BEGIN_PROFSNAP = '// BEGIN GENERATED JS: src/state/profile-state-snapshot.js';
const JS_END_PROFSNAP   = '// END GENERATED JS: src/state/profile-state-snapshot.js';

// Profile-run-lifecycle markers (JS comment style, inside <script>) — three parts
const JS_BEGIN_PROFLIFE1 = '// BEGIN GENERATED JS: src/state/profile-run-lifecycle.js [1/3]';
const JS_END_PROFLIFE1   = '// END GENERATED JS: src/state/profile-run-lifecycle.js [1/3]';
const JS_BEGIN_PROFLIFE2 = '// BEGIN GENERATED JS: src/state/profile-run-lifecycle.js [2/3]';
const JS_END_PROFLIFE2   = '// END GENERATED JS: src/state/profile-run-lifecycle.js [2/3]';
const JS_BEGIN_PROFLIFE3 = '// BEGIN GENERATED JS: src/state/profile-run-lifecycle.js [3/3]';
const JS_END_PROFLIFE3   = '// END GENERATED JS: src/state/profile-run-lifecycle.js [3/3]';

// Field-journal-state markers (JS comment style, inside <script>)
const JS_BEGIN_FJSTATE = '// BEGIN GENERATED JS: src/state/field-journal-state.js';
const JS_END_FJSTATE   = '// END GENERATED JS: src/state/field-journal-state.js';

// Lineage markers (JS comment style, inside <script>)
const JS_BEGIN_LINEAGE = '// BEGIN GENERATED JS: src/state/lineage.js';
const JS_END_LINEAGE   = '// END GENERATED JS: src/state/lineage.js';

// Achievement-ui markers (JS comment style, inside <script>) — three parts
const JS_BEGIN_ACHIEVUI1 = '// BEGIN GENERATED JS: src/ui/achievement-ui.js [1/3]';
const JS_END_ACHIEVUI1   = '// END GENERATED JS: src/ui/achievement-ui.js [1/3]';
const JS_BEGIN_ACHIEVUI2 = '// BEGIN GENERATED JS: src/ui/achievement-ui.js [2/3]';
const JS_END_ACHIEVUI2   = '// END GENERATED JS: src/ui/achievement-ui.js [2/3]';
const JS_BEGIN_ACHIEVUI3 = '// BEGIN GENERATED JS: src/ui/achievement-ui.js [3/3]';
const JS_END_ACHIEVUI3   = '// END GENERATED JS: src/ui/achievement-ui.js [3/3]';

// Run-tracking-update markers (JS comment style, inside <script>)
const JS_BEGIN_RUNTRUPDATE = '// BEGIN GENERATED JS: src/state/run-tracking-update.js';
const JS_END_RUNTRUPDATE   = '// END GENERATED JS: src/state/run-tracking-update.js';

// Profile-ui markers (JS comment style, inside <script>) — two parts
const JS_BEGIN_PROFUI1 = '// BEGIN GENERATED JS: src/ui/profile-ui.js [1/2]';
const JS_END_PROFUI1   = '// END GENERATED JS: src/ui/profile-ui.js [1/2]';
const JS_BEGIN_PROFUI2 = '// BEGIN GENERATED JS: src/ui/profile-ui.js [2/2]';
const JS_END_PROFUI2   = '// END GENERATED JS: src/ui/profile-ui.js [2/2]';

// Achievement-persistence markers (JS comment style, inside <script>) — three parts
const JS_BEGIN_ACHPERS1 = '// BEGIN GENERATED JS: src/state/achievement-persistence.js [1/3]';
const JS_END_ACHPERS1   = '// END GENERATED JS: src/state/achievement-persistence.js [1/3]';
const JS_BEGIN_ACHPERS2 = '// BEGIN GENERATED JS: src/state/achievement-persistence.js [2/3]';
const JS_END_ACHPERS2   = '// END GENERATED JS: src/state/achievement-persistence.js [2/3]';
const JS_BEGIN_ACHPERS3 = '// BEGIN GENERATED JS: src/state/achievement-persistence.js [3/3]';
const JS_END_ACHPERS3   = '// END GENERATED JS: src/state/achievement-persistence.js [3/3]';

// The split comment that divides the source file into part1 and part2.
// It is NOT inlined into game/play.html.
const JS_SPLIT  = '// << SPLIT: hiddenSubtypePools >>';

// The two split comments that divide profile-run-lifecycle.js into three parts.
// They are NOT inlined into game/play.html.
const JS_SPLIT_PROFLIFE_A = '// << SPLIT: profileOnRunEnd >>';
const JS_SPLIT_PROFLIFE_B = '// << SPLIT: profileStartNewRun >>';

// The two split comments that divide achievement-persistence.js into three parts.
// They are NOT inlined into game/play.html.
const JS_SPLIT_ACHPERS_A = '// << SPLIT: awardAchievement >>';
const JS_SPLIT_ACHPERS_B = '// << SPLIT: checkAchievements >>';

// The two split comments that divide achievement-ui.js into three parts.
// They are NOT inlined into game/play.html.
const JS_SPLIT_ACHIEVUI_A = '// << SPLIT: toastHelpers >>';
const JS_SPLIT_ACHIEVUI_B = '// << SPLIT: renderAchievements >>';

// The split comment that divides profile-ui.js into two parts.
// It is NOT inlined into game/play.html.
const JS_SPLIT_PROFUI = '// << SPLIT: profileUpdatePanelUI >>';

// Field-journal-ui markers (JS comment style, inside <script>)
const JS_BEGIN_FJUI = '// BEGIN GENERATED JS: src/ui/field-journal-ui.js';
const JS_END_FJUI   = '// END GENERATED JS: src/ui/field-journal-ui.js';

// Fossil-record-state markers (JS comment style, inside <script>)
const JS_BEGIN_FOSSSTATE = '// BEGIN GENERATED JS: src/state/fossil-record-state.js';
const JS_END_FOSSSTATE   = '// END GENERATED JS: src/state/fossil-record-state.js';

// Fossil-record-ui markers (JS comment style, inside <script>)
const JS_BEGIN_FOSSUI = '// BEGIN GENERATED JS: src/ui/fossil-record-ui.js';
const JS_END_FOSSUI   = '// END GENERATED JS: src/ui/fossil-record-ui.js';

// Profile-delete markers (JS comment style, inside <script>)
const JS_BEGIN_PROFDELETE = '// BEGIN GENERATED JS: src/state/profile-delete.js';
const JS_END_PROFDELETE   = '// END GENERATED JS: src/state/profile-delete.js';

// Profile-startup-modal markers (JS comment style, inside <script>)
const JS_BEGIN_PROFSM = '// BEGIN GENERATED JS: src/ui/profile-startup-modal.js';
const JS_END_PROFSM   = '// END GENERATED JS: src/ui/profile-startup-modal.js';

// Game-init markers (JS comment style, inside <script>)
const JS_BEGIN_GAMEINIT = '// BEGIN GENERATED JS: src/bootstrap/game-init.js';
const JS_END_GAMEINIT   = '// END GENERATED JS: src/bootstrap/game-init.js';

// Game-state-globals markers (JS comment style, inside <script>) — two parts
const JS_BEGIN_GAMESTATEGLOBALS1 = '// BEGIN GENERATED JS: src/state/game-state-globals.js [1/2]';
const JS_END_GAMESTATEGLOBALS1   = '// END GENERATED JS: src/state/game-state-globals.js [1/2]';
const JS_BEGIN_GAMESTATEGLOBALS2 = '// BEGIN GENERATED JS: src/state/game-state-globals.js [2/2]';
const JS_END_GAMESTATEGLOBALS2   = '// END GENERATED JS: src/state/game-state-globals.js [2/2]';

// The split comment that divides game-state-globals.js into two parts.
// It is NOT inlined into game/play.html.
const JS_SPLIT_GAMESTATEGLOBALS = '// << SPLIT: environmentState >>';

// Debug-helpers markers (JS comment style, inside <script>)
const JS_BEGIN_DEBUGHELPERS = '// BEGIN GENERATED JS: src/qa/debug-helpers.js';
const JS_END_DEBUGHELPERS   = '// END GENERATED JS: src/qa/debug-helpers.js';

// Encounter-helpers markers (JS comment style, inside <script>)
const JS_BEGIN_ENCOUNTERHELPERS = '// BEGIN GENERATED JS: src/engine/encounter-helpers.js';
const JS_END_ENCOUNTERHELPERS   = '// END GENERATED JS: src/engine/encounter-helpers.js';

// Encounter-table-builder markers (JS comment style, inside <script>)
const JS_BEGIN_ENCOUNTERTABLEBUILDER = '// BEGIN GENERATED JS: src/engine/encounter-table-builder.js';
const JS_END_ENCOUNTERTABLEBUILDER   = '// END GENERATED JS: src/engine/encounter-table-builder.js';

function fail(msg) {
  console.error(`build_play_html: ERROR: ${msg}`);
  process.exit(1);
}

// Inline a body string between a BEGIN/END marker pair inside html.
// Returns the rebuilt html string (unchanged if already matches).
function inlineRegion(html, beginMarker, endMarker, body, label) {
  const bi = html.indexOf(beginMarker);
  const ei = html.indexOf(endMarker);
  if (bi === -1) fail(`missing BEGIN marker for ${label}: ${beginMarker}`);
  if (ei === -1) fail(`missing END marker for ${label}: ${endMarker}`);
  if (ei < bi)   fail(`END marker appears before BEGIN marker for ${label}`);
  const before = html.slice(0, bi + beginMarker.length);
  const after  = html.slice(ei);
  // Stable, idempotent: single newline after BEGIN, trimmed body, single newline before END.
  return `${before}\n${body.replace(/\s+$/, '')}\n${after}`;
}

// --- Read sources ---
if (!existsSync(CSS_SOURCE))      fail('cannot find src/styles/game.css');
if (!existsSync(DATA_SOURCE))     fail('cannot find src/data/encounter-data.js');
if (!existsSync(UTILS_SOURCE))    fail('cannot find src/utils/core-utils.js');
if (!existsSync(ACHIEVE_SOURCE))  fail('cannot find src/data/achievement-data.js');
if (!existsSync(RUNTRACK_SOURCE))  fail('cannot find src/state/run-tracking.js');
if (!existsSync(PROFCONST_SOURCE)) fail('cannot find src/state/profile-storage-constants.js');
if (!existsSync(PROFFACT_SOURCE))  fail('cannot find src/state/profile-factories.js');
if (!existsSync(PROFCORE_SOURCE))  fail('cannot find src/state/profile-store-core.js');
if (!existsSync(PROFSNAP_SOURCE))  fail('cannot find src/state/profile-state-snapshot.js');
if (!existsSync(PROFLIFE_SOURCE))  fail('cannot find src/state/profile-run-lifecycle.js');
if (!existsSync(ACHPERS_SOURCE))   fail('cannot find src/state/achievement-persistence.js');
if (!existsSync(FJSTATE_SOURCE))     fail('cannot find src/state/field-journal-state.js');
if (!existsSync(LINEAGE_SOURCE))     fail('cannot find src/state/lineage.js');
if (!existsSync(ACHIEVUI_SOURCE))    fail('cannot find src/ui/achievement-ui.js');
if (!existsSync(RUNTRUPDATE_SOURCE)) fail('cannot find src/state/run-tracking-update.js');
if (!existsSync(PROFUI_SOURCE))      fail('cannot find src/ui/profile-ui.js');
if (!existsSync(FJUI_SOURCE))        fail('cannot find src/ui/field-journal-ui.js');
if (!existsSync(FOSSSTATE_SOURCE))   fail('cannot find src/state/fossil-record-state.js');
if (!existsSync(FOSSUI_SOURCE))      fail('cannot find src/ui/fossil-record-ui.js');
if (!existsSync(PROFDELETE_SOURCE))  fail('cannot find src/state/profile-delete.js');
if (!existsSync(PROFSM_SOURCE))      fail('cannot find src/ui/profile-startup-modal.js');
if (!existsSync(GAMEINIT_SOURCE))         fail('cannot find src/bootstrap/game-init.js');
if (!existsSync(GAMESTATEGLOBALS_SOURCE)) fail('cannot find src/state/game-state-globals.js');
if (!existsSync(DEBUGHELPERS_SOURCE))          fail('cannot find src/qa/debug-helpers.js');
if (!existsSync(ENCOUNTERHELPERS_SOURCE))      fail('cannot find src/engine/encounter-helpers.js');
if (!existsSync(ENCOUNTERTABLEBUILDER_SOURCE)) fail('cannot find src/engine/encounter-table-builder.js');
if (!existsSync(PLAY_HTML))                    fail('cannot find game/play.html');

const css          = readFileSync(CSS_SOURCE,       'utf8');
const jsData       = readFileSync(DATA_SOURCE,      'utf8');
const jsUtils      = readFileSync(UTILS_SOURCE,     'utf8');
const jsAchieve    = readFileSync(ACHIEVE_SOURCE,   'utf8');
const jsRunTrack   = readFileSync(RUNTRACK_SOURCE,  'utf8');
const jsProfConst  = readFileSync(PROFCONST_SOURCE, 'utf8');
const jsProfFact   = readFileSync(PROFFACT_SOURCE,  'utf8');
const jsProfCore   = readFileSync(PROFCORE_SOURCE,  'utf8');
const jsProfSnap   = readFileSync(PROFSNAP_SOURCE,  'utf8');
const jsProfLife   = readFileSync(PROFLIFE_SOURCE,  'utf8');
const jsAchPers    = readFileSync(ACHPERS_SOURCE,   'utf8');
const jsFJState    = readFileSync(FJSTATE_SOURCE,    'utf8');
const jsLineage    = readFileSync(LINEAGE_SOURCE,    'utf8');
const jsAchievUI   = readFileSync(ACHIEVUI_SOURCE,   'utf8');
const jsRunTrUpdate = readFileSync(RUNTRUPDATE_SOURCE, 'utf8');
const jsProfUI     = readFileSync(PROFUI_SOURCE,      'utf8');
const jsFJUI       = readFileSync(FJUI_SOURCE,        'utf8');
const jsFossState  = readFileSync(FOSSSTATE_SOURCE,   'utf8');
const jsFossUI     = readFileSync(FOSSUI_SOURCE,      'utf8');
const jsProfDelete = readFileSync(PROFDELETE_SOURCE,  'utf8');
const jsProfSM     = readFileSync(PROFSM_SOURCE,      'utf8');
const jsGameInit          = readFileSync(GAMEINIT_SOURCE,          'utf8');
const jsGameStateGlobals  = readFileSync(GAMESTATEGLOBALS_SOURCE,  'utf8');
const jsDebugHelpers           = readFileSync(DEBUGHELPERS_SOURCE,           'utf8');
const jsEncounterHelpers       = readFileSync(ENCOUNTERHELPERS_SOURCE,       'utf8');
const jsEncounterTableBuilder  = readFileSync(ENCOUNTERTABLEBUILDER_SOURCE,  'utf8');
let   html                     = readFileSync(PLAY_HTML,                     'utf8');

// --- Split encounter-data into two parts at the SPLIT marker ---
const splitIdx = jsData.indexOf(JS_SPLIT);
if (splitIdx === -1) fail(`missing split marker in src/data/encounter-data.js: ${JS_SPLIT}`);
const jsPart1 = jsData.slice(0, splitIdx).replace(/\s+$/, '');
const jsPart2 = jsData.slice(splitIdx + JS_SPLIT.length).replace(/^\n/, '').replace(/\s+$/, '');

// --- Split profile-run-lifecycle into three parts at its two SPLIT markers ---
const lifeSplitA = jsProfLife.indexOf(JS_SPLIT_PROFLIFE_A);
if (lifeSplitA === -1) fail(`missing split marker in src/state/profile-run-lifecycle.js: ${JS_SPLIT_PROFLIFE_A}`);
const lifeSplitB = jsProfLife.indexOf(JS_SPLIT_PROFLIFE_B);
if (lifeSplitB === -1) fail(`missing split marker in src/state/profile-run-lifecycle.js: ${JS_SPLIT_PROFLIFE_B}`);
if (lifeSplitB < lifeSplitA) fail('profile-run-lifecycle split markers are out of order');
const jsLife1 = jsProfLife.slice(0, lifeSplitA).replace(/\s+$/, '');
const jsLife2 = jsProfLife.slice(lifeSplitA + JS_SPLIT_PROFLIFE_A.length, lifeSplitB).replace(/^\n/, '').replace(/\s+$/, '');
const jsLife3 = jsProfLife.slice(lifeSplitB + JS_SPLIT_PROFLIFE_B.length).replace(/^\n/, '').replace(/\s+$/, '');

// --- Split achievement-ui into three parts at its two SPLIT markers ---
const achievUISplitA = jsAchievUI.indexOf(JS_SPLIT_ACHIEVUI_A);
if (achievUISplitA === -1) fail(`missing split marker in src/ui/achievement-ui.js: ${JS_SPLIT_ACHIEVUI_A}`);
const achievUISplitB = jsAchievUI.indexOf(JS_SPLIT_ACHIEVUI_B);
if (achievUISplitB === -1) fail(`missing split marker in src/ui/achievement-ui.js: ${JS_SPLIT_ACHIEVUI_B}`);
if (achievUISplitB < achievUISplitA) fail('achievement-ui split markers are out of order');
const jsAchievUI1 = jsAchievUI.slice(0, achievUISplitA).replace(/\s+$/, '');
const jsAchievUI2 = jsAchievUI.slice(achievUISplitA + JS_SPLIT_ACHIEVUI_A.length, achievUISplitB).replace(/^\n/, '').replace(/\s+$/, '');
const jsAchievUI3 = jsAchievUI.slice(achievUISplitB + JS_SPLIT_ACHIEVUI_B.length).replace(/^\n/, '').replace(/\s+$/, '');

// --- Split profile-ui into two parts at its SPLIT marker ---
const profUISplit = jsProfUI.indexOf(JS_SPLIT_PROFUI);
if (profUISplit === -1) fail(`missing split marker in src/ui/profile-ui.js: ${JS_SPLIT_PROFUI}`);
const jsProfUI1 = jsProfUI.slice(0, profUISplit).replace(/\s+$/, '');
const jsProfUI2 = jsProfUI.slice(profUISplit + JS_SPLIT_PROFUI.length).replace(/^\n/, '').replace(/\s+$/, '');

// --- Split achievement-persistence into three parts at its two SPLIT markers ---
const achPersSplitA = jsAchPers.indexOf(JS_SPLIT_ACHPERS_A);
if (achPersSplitA === -1) fail(`missing split marker in src/state/achievement-persistence.js: ${JS_SPLIT_ACHPERS_A}`);
const achPersSplitB = jsAchPers.indexOf(JS_SPLIT_ACHPERS_B);
if (achPersSplitB === -1) fail(`missing split marker in src/state/achievement-persistence.js: ${JS_SPLIT_ACHPERS_B}`);
if (achPersSplitB < achPersSplitA) fail('achievement-persistence split markers are out of order');
const jsAchPers1 = jsAchPers.slice(0, achPersSplitA).replace(/\s+$/, '');
const jsAchPers2 = jsAchPers.slice(achPersSplitA + JS_SPLIT_ACHPERS_A.length, achPersSplitB).replace(/^\n/, '').replace(/\s+$/, '');
const jsAchPers3 = jsAchPers.slice(achPersSplitB + JS_SPLIT_ACHPERS_B.length).replace(/^\n/, '').replace(/\s+$/, '');

// --- Split game-state-globals into two parts at its SPLIT marker ---
const gameStateGlobalsSplit = jsGameStateGlobals.indexOf(JS_SPLIT_GAMESTATEGLOBALS);
if (gameStateGlobalsSplit === -1) fail(`missing split marker in src/state/game-state-globals.js: ${JS_SPLIT_GAMESTATEGLOBALS}`);
const jsGameStateGlobals1 = jsGameStateGlobals.slice(0, gameStateGlobalsSplit).replace(/\s+$/, '');
const jsGameStateGlobals2 = jsGameStateGlobals.slice(gameStateGlobalsSplit + JS_SPLIT_GAMESTATEGLOBALS.length).replace(/^\n/, '').replace(/\s+$/, '');

// --- Apply all regions ---
const original = html;
html = inlineRegion(html, CSS_BEGIN,        CSS_END,        css.replace(/\s+$/, ''), 'CSS');
html = inlineRegion(html, JS_BEGIN1,        JS_END1,        jsPart1, 'encounter-data [1/2]');
html = inlineRegion(html, JS_BEGIN2,        JS_END2,        jsPart2, 'encounter-data [2/2]');
html = inlineRegion(html, JS_BEGIN_UTILS,   JS_END_UTILS,   jsUtils.replace(/\s+$/, ''), 'core-utils');
html = inlineRegion(html, JS_BEGIN_ACHIEVE,  JS_END_ACHIEVE,  jsAchieve.replace(/\s+$/, ''),  'achievement-data');
html = inlineRegion(html, JS_BEGIN_RUNTRACK,  JS_END_RUNTRACK,  jsRunTrack.replace(/\s+$/, ''),  'run-tracking');
html = inlineRegion(html, JS_BEGIN_PROFCONST, JS_END_PROFCONST, jsProfConst.replace(/\s+$/, ''), 'profile-storage-constants');
html = inlineRegion(html, JS_BEGIN_PROFFACT,  JS_END_PROFFACT,  jsProfFact.replace(/\s+$/, ''),  'profile-factories');
html = inlineRegion(html, JS_BEGIN_PROFCORE,  JS_END_PROFCORE,  jsProfCore.replace(/\s+$/, ''),  'profile-store-core');
html = inlineRegion(html, JS_BEGIN_PROFSNAP,  JS_END_PROFSNAP,  jsProfSnap.replace(/\s+$/, ''),  'profile-state-snapshot');
html = inlineRegion(html, JS_BEGIN_PROFLIFE1, JS_END_PROFLIFE1, jsLife1, 'profile-run-lifecycle [1/3]');
html = inlineRegion(html, JS_BEGIN_PROFLIFE2, JS_END_PROFLIFE2, jsLife2, 'profile-run-lifecycle [2/3]');
html = inlineRegion(html, JS_BEGIN_PROFLIFE3, JS_END_PROFLIFE3, jsLife3, 'profile-run-lifecycle [3/3]');
html = inlineRegion(html, JS_BEGIN_ACHPERS1, JS_END_ACHPERS1, jsAchPers1, 'achievement-persistence [1/3]');
html = inlineRegion(html, JS_BEGIN_ACHPERS2, JS_END_ACHPERS2, jsAchPers2, 'achievement-persistence [2/3]');
html = inlineRegion(html, JS_BEGIN_ACHPERS3, JS_END_ACHPERS3, jsAchPers3, 'achievement-persistence [3/3]');
html = inlineRegion(html, JS_BEGIN_FJSTATE,    JS_END_FJSTATE,    jsFJState.replace(/\s+$/, ''),       'field-journal-state');
html = inlineRegion(html, JS_BEGIN_LINEAGE,    JS_END_LINEAGE,    jsLineage.replace(/\s+$/, ''),       'lineage');
html = inlineRegion(html, JS_BEGIN_ACHIEVUI1,  JS_END_ACHIEVUI1,  jsAchievUI1,                         'achievement-ui [1/3]');
html = inlineRegion(html, JS_BEGIN_ACHIEVUI2,  JS_END_ACHIEVUI2,  jsAchievUI2,                         'achievement-ui [2/3]');
html = inlineRegion(html, JS_BEGIN_ACHIEVUI3,  JS_END_ACHIEVUI3,  jsAchievUI3,                         'achievement-ui [3/3]');
html = inlineRegion(html, JS_BEGIN_RUNTRUPDATE, JS_END_RUNTRUPDATE, jsRunTrUpdate.replace(/\s+$/, ''), 'run-tracking-update');
html = inlineRegion(html, JS_BEGIN_PROFUI1, JS_END_PROFUI1, jsProfUI1, 'profile-ui [1/2]');
html = inlineRegion(html, JS_BEGIN_PROFUI2, JS_END_PROFUI2, jsProfUI2, 'profile-ui [2/2]');
html = inlineRegion(html, JS_BEGIN_FJUI,     JS_END_FJUI,     jsFJUI.replace(/\s+$/, ''),     'field-journal-ui');
html = inlineRegion(html, JS_BEGIN_FOSSSTATE, JS_END_FOSSSTATE, jsFossState.replace(/\s+$/, ''), 'fossil-record-state');
html = inlineRegion(html, JS_BEGIN_FOSSUI,   JS_END_FOSSUI,   jsFossUI.replace(/\s+$/, ''),   'fossil-record-ui');
html = inlineRegion(html, JS_BEGIN_PROFDELETE, JS_END_PROFDELETE, jsProfDelete.replace(/\s+$/, ''), 'profile-delete');
html = inlineRegion(html, JS_BEGIN_PROFSM,   JS_END_PROFSM,   jsProfSM.replace(/\s+$/, ''),   'profile-startup-modal');
html = inlineRegion(html, JS_BEGIN_GAMEINIT, JS_END_GAMEINIT, jsGameInit.replace(/\s+$/, ''), 'game-init');
html = inlineRegion(html, JS_BEGIN_GAMESTATEGLOBALS1, JS_END_GAMESTATEGLOBALS1, jsGameStateGlobals1, 'game-state-globals [1/2]');
html = inlineRegion(html, JS_BEGIN_DEBUGHELPERS,      JS_END_DEBUGHELPERS,      jsDebugHelpers.replace(/\s+$/, ''), 'debug-helpers');
html = inlineRegion(html, JS_BEGIN_GAMESTATEGLOBALS2,   JS_END_GAMESTATEGLOBALS2,   jsGameStateGlobals2,                          'game-state-globals [2/2]');
html = inlineRegion(html, JS_BEGIN_ENCOUNTERHELPERS,       JS_END_ENCOUNTERHELPERS,       jsEncounterHelpers.replace(/\s+$/, ''),            'encounter-helpers');
html = inlineRegion(html, JS_BEGIN_ENCOUNTERTABLEBUILDER,  JS_END_ENCOUNTERTABLEBUILDER,  jsEncounterTableBuilder.replace(/\s+$/, ''),       'encounter-table-builder');

if (html === original) {
  console.log('build_play_html: no change — game/play.html already matches all source files.');
} else {
  writeFileSync(PLAY_HTML, html, 'utf8');
  console.log('build_play_html: regenerated game/play.html from source files.');
}
