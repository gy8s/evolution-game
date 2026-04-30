#!/usr/bin/env node
// Extracts all inline <script> blocks from HTML files and checks they parse as
// valid JavaScript. Also checks that index.html points to game/play.html.
// Exit code 0 = all clear. Exit code 1 = at least one error found.

import { readFileSync, existsSync } from 'fs';
import vm from 'vm';

const HTML_FILES = [
  'game/play.html',
  'game/evolution_game_v66_57.html'
];

function extractScriptBlocks(html) {
  const blocks = [];
  const re = /<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    blocks.push(m[1]);
  }
  return blocks;
}

let hasError = false;

// --- Check index.html points to game/play.html ---
if (!existsSync('index.html')) {
  console.error('ERROR: index.html not found');
  hasError = true;
} else {
  const index = readFileSync('index.html', 'utf8');
  if (!index.includes('game/play.html')) {
    console.error('ERROR: index.html does not reference game/play.html');
    hasError = true;
  } else {
    console.log('OK: index.html references game/play.html');
  }
}

// --- Check game/play.html exists ---
if (!existsSync('game/play.html')) {
  console.error('ERROR: game/play.html not found');
  hasError = true;
}

// --- Syntax-check script blocks in each HTML file ---
for (const file of HTML_FILES) {
  if (!existsSync(file)) {
    if (file === 'game/play.html') {
      // Already reported above
    } else {
      console.log(`SKIP: ${file} not found`);
    }
    continue;
  }

  const html = readFileSync(file, 'utf8');
  const blocks = extractScriptBlocks(html);

  if (blocks.length === 0) {
    console.log(`WARN: ${file} — no inline script blocks found`);
    continue;
  }

  let fileOk = true;
  for (let i = 0; i < blocks.length; i++) {
    try {
      new vm.Script(blocks[i]);
    } catch (e) {
      console.error(`ERROR: ${file} — script block ${i + 1}: ${e.message}`);
      fileOk = false;
      hasError = true;
    }
  }

  if (fileOk) {
    console.log(`OK: ${file} — ${blocks.length} script block(s) parsed cleanly`);
  }
}

if (hasError) {
  console.error('\nSyntax check FAILED.');
  process.exit(1);
}

console.log('\nAll checks passed.');
