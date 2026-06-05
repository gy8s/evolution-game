const KNOWLEDGE_MAX = 30;
const KNOWLEDGE_PER_ENTITY_CAP = 2;
const KNOWLEDGE_INFO_UNLOCK = 10;
const KNOWLEDGE_NH_THRESHOLDS = [10, 14, 18, 22, 26];
const KNOWLEDGE_TIERS = [
  { threshold: 0,  tier: 0, label: "unknown" },
  { threshold: 1,  tier: 1, label: "noticed" },
  { threshold: 5,  tier: 2, label: "familiar" },
  { threshold: 10, tier: 3, label: "understood" },
  { threshold: 20, tier: 4, label: "expert" },
  { threshold: 30, tier: 5, label: "natural-historian" }
];

let socialGroup = {
  members: [],
  cohesion: 0,
  sharedFoodRatio: 1,
  turnsTogether: 0,
  lastFoodTurn: 0,
  lastWaterTurn: 0,
  stressDebt: 0,
  losses: 0
};

let noiseLevel = 0;
let lastCravingCueTurn = -999;
let lastRiskMemoryCueTurn = -999;

// Engine ceiling for encountered group size — future species can raise their groupSizeCap toward this.
const SOCIAL_ENGINE_MAX_GROUP = 10;

const playerSpeciesProfile = {
  species: "tree-climber",
  groupName: "tree-climber band",
  icon: "🐒",
  maxGroupSize: 10,
  groupSizeCap: 6,       // T. belgica: encountered groups draw up to this ceiling
  baseSocialChance: 6
};

// << SPLIT: environmentState >>

const environment = {
  wind: "still",
  weather: "humid",
  storm: {active: false, turnsRemaining: 0, intensity: 0},
  wildfire: {active: false, x: 0, y: 0, radius: 0, turnsRemaining: 0, intensity: 0}
};

const timeState = {
  phase: "day",
  phaseTurn: 0,
  sleepTurnsRemaining: 0
};

const timePhaseDurations = {
  day: 28,
  dusk: 5,
  night: 18,
  dawn: 5
};

const windOptions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "still"];
const weatherOptions = ["humid", "light rain", "heavy rain", "mist", "warm still air", "bright humid heat"];

const layerNarration = {
  "Ground": [
    "The forest floor is dark and broken by roots. Down here, food is easy to smell, but so are you.",
    "Wet leaves cling to the ground. Every step carries scent, sound, and risk.",
    "The ground offers fallen food, but little safety."
  ],
  "Undergrowth": [
    "The undergrowth is crowded with stems and shadow. It hides you, but it hides other things as well.",
    "You push through green stems and hanging leaves, where every rustle could mean food or danger.",
    "In the lower growth, the world is close, damp, and full of movement."
  ],
  "Mid-storey": [
    "The mid-storey is a maze of crossing branches. Here, agility matters more than size.",
    "You move where the forest is broken into narrow paths of bark and leaves.",
    "Light comes in patches. Below you, the forest floor is a dangerous distance away."
  ],
  "Canopy": [
    "The canopy shifts in the humid air. It is safer from the largest hunters, but every branch must hold your weight.",
    "Above the forest floor, leaves flash with insects, birds, and sudden movement.",
    "The high branches offer escape, but little room for mistakes."
  ]
};
