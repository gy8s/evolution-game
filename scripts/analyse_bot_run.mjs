#!/usr/bin/env node

// Analyse saved Evolution Game bot logs and produce a concise QA summary.
//
// This script is intentionally standalone: it reads existing saved bot output
// from logs/bot-runs/<run-id>/ and derives a more useful death-cause summary
// than the current compact export, which can collapse many deaths to "unknown".
//
// Usage:
//   node scripts/analyse_bot_run.mjs logs/bot-runs/20260430-101214
//   node scripts/analyse_bot_run.mjs logs/bot-runs/20260430-101214 --json

import fs from "node:fs";
import path from "node:path";

function usage() {
  console.error("Usage: node scripts/analyse_bot_run.mjs <logs/bot-runs/run-id> [--json]");
  process.exit(1);
}

const args = process.argv.slice(2);
if (!args.length) usage();

const runDir = args[0];
const asJson = args.includes("--json");

function readOptional(filePath) {
  try { return fs.readFileSync(filePath, "utf8"); }
  catch { return ""; }
}

function parseMeta(runDir) {
  const raw = readOptional(path.join(runDir, "meta.json"));
  if (!raw.trim()) return {};
  try { return JSON.parse(raw); }
  catch (err) { return { metaParseError: err.message }; }
}

function extractJsonObjectsAfter(text, marker) {
  const out = [];
  let index = 0;
  while (index < text.length) {
    const markerIndex = text.indexOf(marker, index);
    if (markerIndex === -1) break;
    const start = text.indexOf("{", markerIndex + marker.length);
    if (start === -1) break;

    let depth = 0;
    let inString = false;
    let escaped = false;
    let end = -1;

    for (let i = start; i < text.length; i++) {
      const ch = text[i];
      if (escaped) { escaped = false; continue; }
      if (ch === "\\") { escaped = true; continue; }
      if (ch === '"') { inString = !inString; continue; }
      if (inString) continue;
      if (ch === "{") depth++;
      if (ch === "}") {
        depth--;
        if (depth === 0) { end = i + 1; break; }
      }
    }

    if (end === -1) {
      index = start + 1;
      continue;
    }

    const jsonText = text.slice(start, end);
    try { out.push(JSON.parse(jsonText)); }
    catch { /* compact logs can truncate objects; ignore unparseable fragments */ }
    index = end;
  }
  return out;
}

function deathCauseFromContext(ctx) {
  if (!ctx || typeof ctx !== "object") return "unknown";

  const encounterName = ctx.encounterAtDeath && ctx.encounterAtDeath.name;
  if (encounterName && typeof encounterName === "string") return encounterName;

  const source = ctx.context && ctx.context.source;
  if (source && typeof source === "string" && source !== "unknown") return source;

  if (ctx.message && typeof ctx.message === "string") {
    if (/drown/i.test(ctx.message)) return "drowning";
    if (/dehydration/i.test(ctx.message)) return "dehydration";
    if (/starv/i.test(ctx.message)) return "starvation";
    if (/poison|venom/i.test(ctx.message)) return "poison/venom";
    return ctx.message.slice(0, 80);
  }

  return "unknown";
}

function countBy(items) {
  const counts = new Map();
  for (const item of items) counts.set(item, (counts.get(item) || 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

const compact = readOptional(path.join(runDir, "compact.txt"));
const full = readOptional(path.join(runDir, "full.txt"));
const meta = parseMeta(runDir);

if (!compact && !full) {
  console.error(`No compact.txt or full.txt found in ${runDir}`);
  process.exit(2);
}

const sourceText = compact || full;
const deathContexts = extractJsonObjectsAfter(sourceText, "deathContext=");
const causes = deathContexts.map(deathCauseFromContext);
const causeCounts = countBy(causes);

const issueMatches = [...sourceText.matchAll(/^(ERROR|WARNING)\s+([A-Z0-9_]+)/gm)]
  .map(match => ({ severity: match[1], code: match[2] }));
const issueCounts = countBy(issueMatches.map(i => `${i.severity} ${i.code}`));

const survivalDistribution = (sourceText.match(/Distribution: .*$/m) || [""])[0].replace(/^Distribution:\s*/, "");
const compactDeathCausesLine = (sourceText.match(/^Death causes: .*$/m) || [""])[0];

const result = {
  runDir,
  meta,
  sourceUsed: compact ? "compact.txt" : "full.txt",
  parsedDeathContexts: deathContexts.length,
  compactDeathCausesLine,
  improvedDeathCauseCounts: Object.fromEntries(causeCounts),
  issueCounts: Object.fromEntries(issueCounts),
  survivalDistribution
};

if (asJson) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log("EVOLUTION BOT RUN ANALYSIS");
  console.log(`Run folder: ${runDir}`);
  if (meta.gameVersion) console.log(`Game version: ${meta.gameVersion}`);
  if (meta.botActions) console.log(`Actions: ${meta.botActions}`);
  if (meta.runsRecorded) console.log(`Runs recorded: ${meta.runsRecorded}`);
  if (meta.deaths) console.log(`Deaths: ${meta.deaths}`);
  if (meta.stopReason) console.log(`Stop reason: ${meta.stopReason}`);
  console.log(`Source used: ${result.sourceUsed}`);
  console.log(`Parsed death contexts: ${deathContexts.length}`);
  if (survivalDistribution) console.log(`Survival distribution: ${survivalDistribution}`);
  if (compactDeathCausesLine) console.log(`Original compact death cause line: ${compactDeathCausesLine}`);
  console.log("\nImproved death cause counts:");
  if (!causeCounts.length) console.log("  No parseable death contexts found.");
  for (const [cause, count] of causeCounts) console.log(`  ${cause}: ${count}`);
  console.log("\nIssue counts:");
  if (!issueCounts.length) console.log("  No issue codes found.");
  for (const [issue, count] of issueCounts) console.log(`  ${issue}: ${count}`);
}
