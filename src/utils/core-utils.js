// @target [UTILS] Strength Of
function strengthOf(entity) {
  return Math.round((entity.size || 1) * 1.2);
}

// @target [UTILS] Fitness-scaled value helper
function effective(value, fitness) {
  return value * (fitness / 100);
}

// @target [UTILS] Clamp
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// @target [UTILS] Capitalise first letter helper
function capitalise(value) {
  const text = String(value || "");
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// @target [UTILS] Percent chance roll helper
function roll(percentChance) {
  return Math.random() * 100 < percentChance;
}

// @target [UTILS] Choice
function choice(list) {
  if (!Array.isArray(list) || !list.length) return "";
  return list[Math.floor(Math.random() * list.length)];
}

function sanitizeNarrativeText(value, fallback = "") {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string") return value.replace(/\[object Object\]/g, fallback || "forest").trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return sanitizeNarrativeText(value.join(" "), fallback);
  if (typeof value === "object") {
    if (typeof value.text === "string") return value.text.trim();
    if (typeof value.name === "string") return value.name.trim();
    return fallback;
  }
  return fallback;
}

function ensureNarrativeString(input) {
  if (typeof input === "string") return input;
  try {
    if (typeof input === "function") return "[invalid text]";
    if (typeof input === "object") return "[unreadable]";
    return String(input);
  } catch {
    return "[error]";
  }
}

function containsCodeLikeText(str) {
  return /const [a-zA-Z_$]|function [a-zA-Z_$]|=>|&&|\|\||\{|\}/.test(str);
}

function cleanNarrative(str) {
  if (containsCodeLikeText(str)) return "[text error]";
  return str;
}

// @target [UTILS] Escape Html
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch] || ch));
}

// @target [UTILS] Clone Plain
function clonePlain(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// @target [UTILS] Choose Weighted
function chooseWeighted(items) {
  const total = items.reduce((s, item) => s + item.weight, 0);
  let r = Math.random() * total;

  for (const item of items) {
    r -= item.weight;
    if (r <= 0) return item;
  }

  return items[0];
}
