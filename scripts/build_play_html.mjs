#!/usr/bin/env node
// build_play_html.mjs
//
// Inlines the CSS source (src/styles/game.css) into the generated CSS region
// of game/play.html.
//
// Why inline (not an external stylesheet): game/play.html must remain a
// directly playable artifact. Opening the file straight from disk — or via the
// GitHub Pages link — must work with no build step and no runtime dependency on
// a separate CSS file. So the CSS *source* lives in src/styles/game.css, and
// this script copies it back into the inline <style> block between two markers.
//
// This script ONLY touches the marked CSS region. It never alters JavaScript,
// HTML structure, or anything outside the markers.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');

const CSS_SOURCE = resolve(repoRoot, 'src/styles/game.css');
const PLAY_HTML = resolve(repoRoot, 'game/play.html');

const BEGIN = '/* BEGIN GENERATED CSS: src/styles/game.css */';
const END = '/* END GENERATED CSS: src/styles/game.css */';

function fail(msg) {
  console.error(`build_play_html: ERROR: ${msg}`);
  process.exit(1);
}

let css;
try {
  css = readFileSync(CSS_SOURCE, 'utf8');
} catch (e) {
  fail(`cannot read CSS source at src/styles/game.css (${e.message})`);
}

let html;
try {
  html = readFileSync(PLAY_HTML, 'utf8');
} catch (e) {
  fail(`cannot read game/play.html (${e.message})`);
}

const beginIdx = html.indexOf(BEGIN);
const endIdx = html.indexOf(END);

if (beginIdx === -1) fail(`missing BEGIN marker in game/play.html: ${BEGIN}`);
if (endIdx === -1) fail(`missing END marker in game/play.html: ${END}`);
if (endIdx < beginIdx) fail('END marker appears before BEGIN marker in game/play.html');

const before = html.slice(0, beginIdx + BEGIN.length);
const after = html.slice(endIdx);

// One newline after the BEGIN marker, the CSS body (trailing whitespace
// trimmed), then one newline before the END marker. This keeps the generated
// region stable and idempotent across repeated builds.
const cssBody = css.replace(/\s+$/, '');
const rebuilt = `${before}\n${cssBody}\n${after}`;

if (rebuilt === html) {
  console.log('build_play_html: no change — game/play.html already matches src/styles/game.css.');
} else {
  writeFileSync(PLAY_HTML, rebuilt, 'utf8');
  console.log('build_play_html: regenerated inline CSS in game/play.html from src/styles/game.css.');
}
