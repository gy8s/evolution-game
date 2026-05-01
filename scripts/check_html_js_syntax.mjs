#!/usr/bin/env node
// Extracts all inline <script> blocks from HTML files and checks they parse as
// valid JavaScript. Also checks that index.html's meta-refresh points to game/play.html.
// Exit code 0 = all clear. Exit code 1 = at least one error found.

import { readFileSync, existsSync, readdirSync } from 'fs';
import vm from 'vm';

// Always check play.html; also discover any other .html files in game/ dynamically
// so the check stays valid after version bumps without needing to update this script.
function getGameHtmlFiles() {
  const files = ['game/play.html'];
  if (existsSync('game')) {
    for (const f of readdirSync('game')) {
      if (f.endsWith('.html') && f !== 'play.html') {
        files.push(`game/${f}`);
      }
    }
  }
  return files;
}

function extractScriptBlocks(html) {
  const blocks = [];
  const re = /<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    blocks.push(m[1]);
  }
  return blocks;
}

// Extract the URL from the meta-refresh content attribute, e.g.
// <meta http-equiv="refresh" content="0; url=game/play.html">
function extractMetaRefreshUrl(html) {
  const m = html.match(/<meta[^>]+http-equiv=["']refresh["'][^>]+content=["'][^"']*url=([^"'\s]+)/i)
    || html.match(/<meta[^>]+content=["'][^"']*url=([^"'\s]+)[^"']*["'][^>]+http-equiv=["']refresh["']/i);
  return m ? m[1] : null;
}


function stripNonVisibleBlocks(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--([\s\S]*?)-->/g, ' ');
}

function htmlToVisibleText(html) {
  const stripped = stripNonVisibleBlocks(html);
  return stripped
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function assertNoBleedVisibleText(file, html) {
  const visible = htmlToVisibleText(html);
  const forbidden = [
    /actorSize/i,
    /victimSize/i,
    /const\s+actorSize/i,
    /needle-billed\|hummingbird\|orchid bee/i
  ];

  for (const pattern of forbidden) {
    if (pattern.test(visible)) {
      console.error(`ERROR: ${file} visible HTML contains forbidden bleed text matching ${pattern}`);
      return false;
    }
  }

  return true;
}

let hasError = false;

// --- Check index.html meta-refresh points to game/play.html ---
if (!existsSync('index.html')) {
  console.error('ERROR: index.html not found');
  hasError = true;
} else {
  const index = readFileSync('index.html', 'utf8');
  const redirectUrl = extractMetaRefreshUrl(index);
  if (!redirectUrl) {
    console.error('ERROR: index.html has no meta-refresh redirect');
    hasError = true;
  } else if (redirectUrl !== 'game/play.html') {
    console.error(`ERROR: index.html meta-refresh points to "${redirectUrl}", expected "game/play.html"`);
    hasError = true;
  } else {
    console.log('OK: index.html meta-refresh points to game/play.html');
  }
}

// --- Check game/play.html exists ---
if (!existsSync('game/play.html')) {
  console.error('ERROR: game/play.html not found');
  hasError = true;
}

// --- Syntax-check script blocks in all game HTML files ---
for (const file of getGameHtmlFiles()) {
  if (!existsSync(file)) {
    if (file === 'game/play.html') {
      // Already reported above
    } else {
      console.log(`SKIP: ${file} not found`);
    }
    continue;
  }

  const html = readFileSync(file, 'utf8');
  if (!assertNoBleedVisibleText(file, html)) {
    hasError = true;
  }
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
