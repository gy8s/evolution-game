const ACHIEVEMENT_DEFS = [
  // --- Survival ---
  { key: "survive_10",    cat: "Survival", icon: "🌿", name: "First Light",        desc: "Survive 10 turns.",                        check: (p) => (p.turn || 0) >= 10 },
  { key: "survive_50",    cat: "Survival", icon: "🌿", name: "Foothold",           desc: "Survive 50 turns.",                        check: (p) => (p.turn || 0) >= 50 },
  { key: "survive_100",   cat: "Survival", icon: "🌿", name: "Century",            desc: "Survive 100 turns.",                       check: (p) => (p.turn || 0) >= 100 },
  { key: "survive_250",   cat: "Survival", icon: "🌿", name: "Deep Eocene",        desc: "Survive 250 turns.",                       check: (p) => (p.turn || 0) >= 250 },
  { key: "survive_500",   cat: "Survival", icon: "🌿", name: "Ancient One",        desc: "Survive 500 turns.",                       check: (p) => (p.turn || 0) >= 500 },
  { key: "night_3",       cat: "Survival", icon: "🌑", name: "Night Watch",        desc: "Survive 3 nights in a single run.",        check: (p, rt) => (rt.nightSurvivedCount || 0) >= 3 },
  { key: "night_10",      cat: "Survival", icon: "🌑", name: "Creature of the Dark", desc: "Survive 10 nights in a single run.",    check: (p, rt) => (rt.nightSurvivedCount || 0) >= 10 },
  { key: "low_fit_surv",  cat: "Survival", icon: "💀", name: "Last Breath",        desc: "Survive a turn at 10 fitness or below.",   check: (p, rt) => rt.wasNearDeath === true },
  { key: "poison_surv",   cat: "Survival", icon: "☠", name: "Resilient",          desc: "Survive any poison.",                      check: (p, rt) => rt.poisonSurvived === true },
  { key: "poison_deadly", cat: "Survival", icon: "☠", name: "Iron Gut",           desc: "Survive a deadly poison.",                 check: (p, rt) => (rt.worstPoisonRank || 0) >= 5 },

  // --- Foraging ---
  { key: "eat_fruit",     cat: "Foraging", icon: "🍎", name: "First Taste",        desc: "Eat a fruit.",                             check: (p, rt) => (rt.fruitEaten || 0) >= 1 },
  { key: "eat_insect",    cat: "Foraging", icon: "🐛", name: "Bug Hunter",         desc: "Eat an insect.",                           check: (p, rt) => (rt.insectEaten || 0) >= 1 },
  { key: "eat_fungus",    cat: "Foraging", icon: "🍄", name: "Mycophile",          desc: "Eat a fungus.",                            check: (p, rt) => (rt.fungusEaten || 0) >= 1 },
  { key: "eat_meat",      cat: "Foraging", icon: "🦴", name: "Scavenger",          desc: "Eat meat from a carcass.",                 check: (p, rt) => (rt.meatEaten || 0) >= 1 },
  { key: "eat_5types",    cat: "Foraging", icon: "🌾", name: "Opportunist",        desc: "Eat 5 different food types in one run.",   check: (p, rt) => Object.keys(rt.foodTypesEaten || {}).length >= 5 },
  { key: "eat_10types",   cat: "Foraging", icon: "🌾", name: "Generalist",         desc: "Eat 10 different food types in one run.",  check: (p, rt) => Object.keys(rt.foodTypesEaten || {}).length >= 10 },
  { key: "eat_fruit_20",  cat: "Foraging", icon: "🍎", name: "Frugivore",          desc: "Eat 20 fruits in a single run.",           check: (p, rt) => (rt.fruitEaten || 0) >= 20 },
  { key: "eat_insect_10", cat: "Foraging", icon: "🐛", name: "Insectivore",        desc: "Eat 10 insects in a single run.",          check: (p, rt) => (rt.insectEaten || 0) >= 10 },
  { key: "water_10",      cat: "Foraging", icon: "💧", name: "Hydrated",           desc: "Drink water 10 times in a single run.",    check: (p, rt) => (rt.waterDrank || 0) >= 10 },
  { key: "knowledge_5",   cat: "Foraging", icon: "📖", name: "Field Naturalist",   desc: "Learn 5 foods across all runs.",           check: (p, rt, ps) => Object.keys(p.knownFoods || {}).length >= 5 },

  // --- Exploration ---
  { key: "explore_25",    cat: "Exploration", icon: "🗺", name: "Wanderer",         desc: "Explore 25 tiles in a single run.",        check: (p, rt) => (rt.tilesExplored || 0) >= 25 },
  { key: "explore_100",   cat: "Exploration", icon: "🗺", name: "Trailblazer",      desc: "Explore 100 tiles in a single run.",       check: (p, rt) => (rt.tilesExplored || 0) >= 100 },
  { key: "explore_250",   cat: "Exploration", icon: "🗺", name: "Cartographer",     desc: "Explore 250 tiles in a single run.",       check: (p, rt) => (rt.tilesExplored || 0) >= 250 },
  { key: "investigate_3", cat: "Exploration", icon: "🔍", name: "Curious Mind",     desc: "Investigate 3 encounters in a run.",       check: (p, rt) => (rt.investigatedCount || 0) >= 3 },
  { key: "investigate_10",cat: "Exploration", icon: "🔍", name: "Scholar",          desc: "Investigate 10 encounters in a run.",      check: (p, rt) => (rt.investigatedCount || 0) >= 10 },
  { key: "journal_5",     cat: "Exploration", icon: "📕", name: "Archivist",        desc: "Record 5 species in the Field Journal.",   check: (p, rt, ps) => Object.keys(p.knowledgeByEncounterKey || {}).length >= 5 },
  { key: "journal_20",    cat: "Exploration", icon: "📕", name: "Encyclopaedist",   desc: "Record 20 species in the Field Journal.",  check: (p, rt, ps) => Object.keys(p.knowledgeByEncounterKey || {}).length >= 20 },

  // --- Social ---
  { key: "join_group",    cat: "Social",   icon: "🐒", name: "Safety in Numbers", desc: "Join a social group.",                     check: (p, rt) => rt.groupEverJoined === true },
  { key: "mate_once",     cat: "Social",   icon: "❤", name: "Courtship",         desc: "Attempt mating.",                          check: (p, rt) => rt.matingAttempted === true },
  { key: "mate_3",        cat: "Social",   icon: "❤", name: "Progenitor",        desc: "Mate 3 times across all runs.",            check: (p, rt, ps) => (ps.totalMatings || 0) >= 3 },
  { key: "groom_3",       cat: "Social",   icon: "🙈", name: "Groomer",           desc: "Groom a companion 3 times in a run.",      check: (p, rt) => (rt.groomedCount || 0) >= 3 },
  { key: "companion_save",cat: "Social",   icon: "🛡", name: "Protector",         desc: "Have a companion intercept a predator.",   check: (p, rt) => rt.companionInterceptHit === true },
  { key: "group_5",       cat: "Social",   icon: "🐒", name: "Troop",             desc: "Be in a group of 5+ companions.",          check: (p) => (socialGroup && socialGroup.members && socialGroup.members.length >= 5) },

  // --- Danger ---
  { key: "escape_1",      cat: "Danger",   icon: "💨", name: "Close Call",        desc: "Escape a predator pursuit.",               check: (p, rt) => (rt.pursuitsEscaped || 0) >= 1 },
  { key: "escape_5",      cat: "Danger",   icon: "💨", name: "Ghost",             desc: "Escape 5 predator pursuits in a run.",     check: (p, rt) => (rt.pursuitsEscaped || 0) >= 5 },
  { key: "escape_10",     cat: "Danger",   icon: "💨", name: "Untouchable",       desc: "Escape 10 predator pursuits in a run.",    check: (p, rt) => (rt.pursuitsEscaped || 0) >= 10 },
  { key: "survive_wildfire", cat: "Danger",icon: "🔥", name: "Through the Flames",desc: "Survive a wildfire.",                      check: (p, rt) => rt.wildfireEscaped === true },

  // --- Growth ---
  { key: "grown",         cat: "Growth",   icon: "🌱", name: "Coming of Age",     desc: "Grow to adult size.",                      check: (p) => (p.size || 0) >= 10 },
  { key: "turns_100_profile", cat: "Growth", icon: "⏳", name: "Seasoned",        desc: "Accumulate 100 turns across all runs.",    check: (p, rt, ps) => (ps.totalTurns || 0) >= 100 },
  { key: "turns_500_profile", cat: "Growth", icon: "⏳", name: "Veteran",         desc: "Accumulate 500 turns across all runs.",    check: (p, rt, ps) => (ps.totalTurns || 0) >= 500 },
  { key: "turns_1000_profile",cat: "Growth", icon: "⏳", name: "Elder",           desc: "Accumulate 1000 turns across all runs.",   check: (p, rt, ps) => (ps.totalTurns || 0) >= 1000 },
  { key: "runs_5",        cat: "Growth",   icon: "🔁", name: "Persistent",        desc: "Complete 5 runs.",                         check: (p, rt, ps) => (ps.totalRuns || 0) >= 5 },
  { key: "runs_20",       cat: "Growth",   icon: "🔁", name: "Indomitable",       desc: "Complete 20 runs.",                        check: (p, rt, ps) => (ps.totalRuns || 0) >= 20 },

  // --- Milestones ---
  { key: "first_death",   cat: "Milestones", icon: "🪦", name: "Fossil",          desc: "Die for the first time.",                  check: (p, rt, ps) => (ps.totalRuns || 0) >= 1 },
  { key: "best_50",       cat: "Milestones", icon: "🏆", name: "Record Holder",   desc: "Survive 50 turns in a single run.",        check: (p, rt, ps) => (ps.bestTurn || 0) >= 50 },
  { key: "best_200",      cat: "Milestones", icon: "🏆", name: "Champion",        desc: "Survive 200 turns in a single run.",       check: (p, rt, ps) => (ps.bestTurn || 0) >= 200 },
  { key: "companion_1",   cat: "Milestones", icon: "👁", name: "Not Alone",       desc: "Recruit your first companion.",            check: (p, rt) => rt.groupEverJoined === true },
  { key: "full_stats",    cat: "Milestones", icon: "✨", name: "Peak Condition",  desc: "End a turn at 100 fitness, energy, and hydration.", check: (p) => (p.fitness || 0) >= 100 && (p.energy || 0) >= 100 && (p.hydration || 0) >= 100 },
  { key: "alerted",       cat: "Milestones", icon: "👂", name: "Sentinel",        desc: "Use the Alert action 3 times in a run.",   check: (p, rt) => (rt.alertedCount || 0) >= 3 }
];
