#!/usr/bin/env node
// build_play_html.mjs
//
// Inlines source files into the generated regions of game/play.html so the
// file stays directly playable without external dependencies at runtime.
//
// Currently inlines:
//   1. src/styles/game.css       → the <style> block (CSS)
//   2. src/data/encounter-data.js → two JS regions:
//        [1/2] encounters + encounterTables  (~line 1040)
//        [2/2] hiddenSubtypePools            (~line 6035)
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

const CSS_SOURCE  = resolve(repoRoot, 'src/styles/game.css');
const DATA_SOURCE = resolve(repoRoot, 'src/data/encounter-data.js');
const PLAY_HTML   = resolve(repoRoot, 'game/play.html');

// CSS markers (CSS comment style, inside <style>)
const CSS_BEGIN = '/* BEGIN GENERATED CSS: src/styles/game.css */';
const CSS_END   = '/* END GENERATED CSS: src/styles/game.css */';

// Encounter-data markers (JS comment style, inside <script>)
const JS_BEGIN1 = '// BEGIN GENERATED JS: src/data/encounter-data.js [1/2]';
const JS_END1   = '// END GENERATED JS: src/data/encounter-data.js [1/2]';
const JS_BEGIN2 = '// BEGIN GENERATED JS: src/data/encounter-data.js [2/2]';
const JS_END2   = '// END GENERATED JS: src/data/encounter-data.js [2/2]';

// The split comment that divides the source file into part1 and part2.
const JS_SPLIT  = '// << SPLIT: hiddenSubtypePools >>';

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
if (!existsSync(CSS_SOURCE))  fail('cannot find src/styles/game.css');
if (!existsSync(DATA_SOURCE)) fail('cannot find src/data/encounter-data.js');
if (!existsSync(PLAY_HTML))   fail('cannot find game/play.html');

const css    = readFileSync(CSS_SOURCE,  'utf8');
const jsData = readFileSync(DATA_SOURCE, 'utf8');
let   html   = readFileSync(PLAY_HTML,   'utf8');

// --- Split encounter-data into two parts at the SPLIT marker ---
const splitIdx = jsData.indexOf(JS_SPLIT);
if (splitIdx === -1) fail(`missing split marker in src/data/encounter-data.js: ${JS_SPLIT}`);
const jsPart1 = jsData.slice(0, splitIdx).replace(/\s+$/, '');
const jsPart2 = jsData.slice(splitIdx + JS_SPLIT.length).replace(/^\n/, '').replace(/\s+$/, '');

// --- Apply all three regions ---
const original = html;
html = inlineRegion(html, CSS_BEGIN,  CSS_END,  css.replace(/\s+$/, ''), 'CSS');
html = inlineRegion(html, JS_BEGIN1,  JS_END1,  jsPart1, 'encounter-data [1/2]');
html = inlineRegion(html, JS_BEGIN2,  JS_END2,  jsPart2, 'encounter-data [2/2]');

if (html === original) {
  console.log('build_play_html: no change — game/play.html already matches all source files.');
} else {
  writeFileSync(PLAY_HTML, html, 'utf8');
  console.log('build_play_html: regenerated game/play.html from source files.');
}
