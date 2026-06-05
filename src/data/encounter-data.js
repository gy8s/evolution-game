const encounters = {
  // small animals and invertebrates
  largeInsect: {
    kind: "animal", name: "hard-shelled beetle", icon: "🪲", className: "prey",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 30, size: 1, speed: 25, agility: 50, aggression: 5, food: 10,
    poison: null,
    seen: "A hard-shelled beetle clings to the bark. It may be useful food, but beetles are not all the same.",
    investigationDetails: ["Hard shell and slow movement suggest possible food, but the shell hides scent and taste clues.", "You check colour, smell, legs, and feeding marks. The signs are useful, not certain.", "This beetle type is becoming familiar. Mimicry and chemical defence can still fool you."],
    investigated: "The beetle looks like possible food, but you cannot be certain without experience or a taste.",
    naturalHistory: {
      title: "Hard-shelled beetle",
      fieldNote: "Coleoptera \u2014 beetles \u2014 are the most species-rich order of animals on Earth, a diversity built on the sclerotised forewing (elytron) that protects the flight wing and allows exploitation of almost every substrate.",
      behaviour: "Moves slowly across bark and woody debris, pausing to feed or deposit eggs. Drops from perch and folds into the substrate when disturbed, using camouflage rather than flight.",
      ecology: "A decomposer, wood-borer, or seed-feeder depending on species. Beetles cycle nutrients through dead wood faster than almost any other organism.",
      gameplayInsight: "Edible but the hard carapace reduces processing efficiency \u2014 worth collecting when protein is scarce but not a priority over softer prey.",
      scienceNote: "Coleoptera appear in the Permian and achieve enormous diversity by the Eocene. Messel fossils preserve beetle elytra in extraordinary colour-preserving detail, revealing metallic structural colouration in many species \u2014 an ancient optical phenomenon."
    }
  },
  antTrail: {
    kind: "forage", name: "ant trail", icon: "🐜", className: "food",
    canInvestigate: true, portions: 1, energy: 4,
    poison: {severity: "mild", rank: 1, toxinType: "irritant", lethal: false, turns: 2, damage: 1, warning: "Biting ants / acid"},
    seen: "A dark line of ants travels with purpose through the leaf litter. It hints at food nearby, and a swarm of biting bodies if disturbed.",
    investigated: "The trail runs with intent, not chaos. One direction returns to the colony; the other may lead to fruit, carrion, grubs, or conflict.",
    naturalHistory: {
      title: "Ant trail",
      fieldNote: "An ant column encodes information in its pheromone trail \u2014 concentration gradients communicate both direction and resource quality, with heavier trails indicating higher-value food sources.",
      behaviour: "Moves in a disciplined column with workers following the pheromone path precisely. Scouts break from the column at regular intervals to verify route quality and assess threats.",
      ecology: "A nutrient transport system linking the colony to food resources and cycling organic material through the forest floor. Trail activity shifts as resources deplete and new ones are discovered.",
      gameplayInsight: "Edible directly from the column \u2014 lick them off bark or scoop them rapidly. Following the trail in the food direction leads to either a food source or the colony itself.",
      scienceNote: "Pheromone trail communication is established across all major ant subfamilies represented in the Eocene. Baltic amber preserves ants in column formation, suggesting trail-following behaviour was already colony-wide in Eocene formicine species."
    }
  },

  antNest: {
    kind: "nest", name: "ant nest", icon: "🐜", className: "threat",
    canInvestigate: true, eggs: 3, energy: 8,
    guardianKey: "antSwarm", guardianChance: 30,
    poison: {severity: "mild", rank: 1, toxinType: "irritant", lethal: false, turns: 3, damage: 2, warning: "Biting ants / acid"},
    seen: "An ant nest opens into the damp soil and bark, busy with workers moving in and out.",
    investigated: "This is an ant nest, not a termite mound. It may contain food, but disturbing it can bring a defensive ant swarm.",
    naturalHistory: {
      title: "Ant nest",
      fieldNote: "An ant colony is not a collection of individuals but a superorganism \u2014 its collective behaviours, memory, and adaptive responses emerge from chemical communication rather than any central control.",
      behaviour: "Breach triggers an immediate defensive response \u2014 soldiers mobilise toward the intrusion point while workers evacuate larvae inward. The response scales with intrusion severity and colony size.",
      ecology: "A nutrient concentration point and soil aerator. Ant colonies represent enormous accumulated biomass and their trails connect the nest to food resources across a significant territorial radius.",
      gameplayInsight: "Ant larvae and pupae are the highest caloric yield items in the nest. Target the brood chambers, which are the deeper galleries, and exit before soldier numbers build to overwhelming levels.",
      scienceNote: "Formicine and myrmicine ants with complex brood-care behaviours are known from Eocene Baltic amber in extraordinary detail \u2014 preserved queens, workers, soldiers, and brood in the same inclusions. Superorganism-level collective behaviour is inferred from the caste diversity preserved."
    }
  },

  antSwarm: {
    kind: "animal", name: "ant swarm", icon: "🐜", className: "threat",
    dangerProfile: "predator", temperament: "swarm", canInvestigate: true,
    fitness: 65, size: 5, speed: 28, agility: 35, aggression: 70, food: 12,
    poison: {severity: "mild", rank: 1, toxinType: "irritant", lethal: false, turns: 3, damage: 2, warning: "Swarming bites and acid"},
    seen: "A defensive ant swarm spreads from disturbed soil, many small bodies moving as one living patch.",
    investigated: "These are ants, not termites and not giant ants. They are individually small, but dangerous in numbers.",
    naturalHistory: {
      title: "Ant swarm",
      fieldNote: "A column of ants in defensive formation is not merely an inconvenience \u2014 the combined formic acid load and mandible force of thousands of individuals can drive off animals many times their individual size.",
      behaviour: "Moves as a coordinated mass. Individual scouts break from the column to investigate disturbances. Agitation spreads through the swarm almost instantly.",
      ecology: "Ants are ecosystem engineers, aerating soil, dispersing seeds, and controlling invertebrate populations. A defensive swarm is a temporary state of an otherwise structured colony.",
      gameplayInsight: "Moving through or over a disturbed swarm applies cumulative damage \u2014 leave the area immediately rather than waiting for the response to subside.",
      scienceNote: "Formicine and myrmicine ants were well-established by the Eocene. Amber deposits from Baltic and Fushun sites preserve diverse ant faunas, including workers, queens, and males, confirming complex eusocial organisation."
    }
  },

  predatorLeftovers: {
    kind: "carcass", name: "predator leftovers", icon: "☠️", className: "food",
    canInvestigate: true, portions: 2, energy: 18, attraction: 22,
    poison: null,
    seen: "Fresh torn leftovers lie under leaves. Something killed here recently and may come back.",
    investigated: "The meat is fresh, but the kill is not yours. Feeding here is fast energy with return-risk.",
    naturalHistory: {
      title: "Predator leftovers",
      fieldNote: "A partially consumed kill is simultaneously a food resource and a predator marker \u2014 the original killer may be within sensory range, resting or actively defending against scavengers.",
      behaviour: "The remains attract secondary scavengers of all sizes, from invertebrates to competing carnivores. Activity near the kill is concentrated and competitive.",
      ecology: "Partial kills in the food web transfer energy from the primary predator's surplus to scavengers that cannot make kills of their own. This secondary transfer is ecologically significant in predator-rich environments.",
      gameplayInsight: "Feed fast and disengage \u2014 the predator that made this kill is unlikely to be far. Any returning sound or movement should trigger immediate retreat.",
      scienceNote: "Kleptoparasitism \u2014 stealing food from the animal that caught it \u2014 is documented across a wide range of Eocene carnivore groups. Dental trace analysis on Eocene mammal bones shows multiple species feeding on the same carcass in overlapping sequences."
    }
  },

  wasp: {
    kind: "animal", name: "large wasp", icon: "🐝", className: "threat",
    dangerProfile: "sting", temperament: "defensive", canInvestigate: true,
    fitness: 35, size: 1, speed: 55, agility: 70, aggression: 55, food: 4,
    poison: {severity: "mild", rank: 1, toxinType: "venom", lethal: false, turns: 3, damage: 2, warning: "Painful sting risk"},
    seen: "A large wasp moves over a torn patch of fruit. Its body is small, but the warning is obvious.",
    investigated: "The narrow body, restless wings, and pointed abdomen mark it as dangerous to handle.",
    naturalHistory: {
      title: "Large wasp",
      fieldNote: "Social wasp venom contains multiple independent toxin classes \u2014 phospholipases, mastoparans, and kinins \u2014 that work synergistically to cause pain, local tissue damage, and systemic effects.",
      behaviour: "Patrols a territory around the nest or a food source with a distinctive rapid, hovering investigative flight before committing to sting. Stings multiple times without losing the stinger.",
      ecology: "Both predator and scavenger \u2014 wasps hunt caterpillars and soft-bodied arthropods to provision larvae, and also consume fruit, nectar, and carrion. Their ecological role spans multiple trophic levels.",
      gameplayInsight: "Retreat from patrol response immediately \u2014 continued proximity escalates to sting. A single sting is manageable but repeated contact is compounding.",
      scienceNote: "Vespidae (social wasps) appear in the Cretaceous. Eocene social wasp nests and workers are known from Baltic amber. Wasp venom chemistry is among the most complex of any insect, with over 20 distinct peptide and enzyme compounds identified in some species."
    }
  },
  scorpion: {
    kind: "animal", name: "small scorpion", icon: "🦂", className: "threat",
    dangerProfile: "sting", temperament: "defensive", canInvestigate: true,
    fitness: 45, size: 2, speed: 25, agility: 35, aggression: 70, food: 8,
    poison: {severity: "moderate", rank: 2, toxinType: "venom", lethal: false, turns: 4, damage: 4, warning: "Venomous sting"},
    seen: "A small scorpion waits beneath a curl of bark, claws open and tail held ready.",
    investigated: "The raised tail is a clear danger sign. This is food only if desperation makes you careless.",
    naturalHistory: {
      title: "Small scorpion",
      fieldNote: "Scorpions are among the oldest terrestrial arthropods with a body plan essentially unchanged since the Silurian \u2014 one of the longest-lived successful designs in animal evolution.",
      behaviour: "Forages nocturnally under bark and in leaf litter, grasping prey with pedipalps before stinging. Fluoresces under ultraviolet light due to hyaline layer compounds in the cuticle.",
      ecology: "A predator of invertebrates in bark and litter microhabitats. Its sting suppresses nocturnal invertebrate movement through fear-based avoidance rather than direct predation pressure alone.",
      gameplayInsight: "Nocturnal and concentrated under bark and rocks. Move these materials carefully at night \u2014 the sting causes localised damage and temporary effect.",
      scienceNote: "Scorpiones are known from the Silurian and show remarkable morphological conservation. Eocene scorpions from Baltic amber are indistinguishable from modern species. The UV fluorescence is caused by beta-carboline compounds in the cuticle \u2014 its biological function remains debated."
    }
  },
  tarantula: {
    kind: "animal", name: "large spider", icon: "🕷️", className: "threat",
    dangerProfile: "bite", temperament: "defensive", canInvestigate: true,
    fitness: 50, size: 3, speed: 35, agility: 45, aggression: 45, food: 12,
    poison: {severity: "mild", rank: 1, toxinType: "venom", lethal: false, turns: 3, damage: 2, warning: "Painful bite"},
    seen: "A heavy spider rests against the bark, still enough to be mistaken for shadow.",
    investigated: "It does not rush at you, but its fangs would make a poor mistake memorable.",
    naturalHistory: {
      title: "Large spider",
      fieldNote: "Large theraphosid-grade spiders are ambush predators capable of taking prey significantly larger than insects \u2014 lizards, small frogs, and even juvenile birds fall within the hunting range of large species.",
      behaviour: "Waits at burrow entrance or in bark crevice with forelegs extended to detect vibration. Rushes to contact on any vibration crossing its detection threshold.",
      ecology: "An apex invertebrate predator in bark and ground microhabitats. Its silk-lined burrow is a permanent feature of its territory, and the surrounding area shows reduced small invertebrate density.",
      gameplayInsight: "Venom causes painful but non-fatal effects \u2014 disengage immediately. Urticating hairs (in new world species) cause additional irritation if contact is prolonged.",
      scienceNote: "Theraphosidae (tarantulas) appear in the fossil record from the Eocene. Eocene theraphosid specimens from French amber preserve the body plan and cheliceral structure of modern species. Their longevity and slow growth rates are adaptations to unpredictable prey environments."
    }
  },
  caterpillar: {
    kind: "forage", name: "hairy caterpillar", icon: "🐛", className: "food",
    canInvestigate: true, portions: 1, energy: 8,
    poison: {severity: "mild", rank: 1, toxinType: "irritant", lethal: false, turns: 3, damage: 2, warning: "Irritating hairs / possible toxin"},
    seen: "A hairy caterpillar feeds along the edge of a leaf.",
    investigated: "The hairs are a bad sign. It might be edible, but it may punish the attempt.",
    naturalHistory: {
      title: "Hairy caterpillar",
      fieldNote: "Caterpillar urticating hairs are not venom delivery systems but physical irritants \u2014 hollow or barbed setae that detach and embed in mucous membranes or skin, causing inflammation through purely mechanical means.",
      behaviour: "Moves slowly along leaf surfaces and stems, feeding continuously. Hairy species make no attempt to hide or flee \u2014 their defence is passive and continuous.",
      ecology: "A major consumer of leaf material, channelling plant biomass into caterpillar body mass that becomes available to predators, parasitoids, and eventually decomposers.",
      gameplayInsight: "Handle from beneath or at the smooth anterior end \u2014 avoid contact with the hair surface. The protein return is high and worth the minor processing difficulty.",
      scienceNote: "Lepidopteran larvae with urticating setae appear across multiple families. Eocene compression fossils and amber specimens preserve larval morphology in detail sufficient to identify hairy forms. The mechanical irritant function requires no biological activation \u2014 purely physical."
    }
  },
  snail: {
    kind: "forage", name: "forest snail", icon: "🐌", className: "food",
    canInvestigate: true, portions: 1, energy: 10,
    poison: null,
    seen: "A forest snail moves slowly over wet bark, leaving a silver trail behind it.",
    investigated: "Soft-bodied and slow. It seems edible, if not especially rich.",
    naturalHistory: {
      title: "Forest snail",
      fieldNote: "The gastropod shell is a calcium carbonate structure grown continuously from the mantle edge \u2014 each growth band records environmental conditions at the time of deposition, making snail shells a detailed palaeoclimate archive.",
      behaviour: "Active during wet periods and sealed within its shell behind an epiphragm during dry conditions. Grazes algae, fungi, and plant material on bark and soil surfaces.",
      ecology: "A decomposer and herbivore with a shell that concentrates calcium in the forest floor ecosystem. Snail shells are dietary calcium sources for birds and small mammals in calcium-limited forest environments.",
      gameplayInsight: "The shell requires processing \u2014 crush or use a hard surface to crack before consuming the body tissue inside. Predictably located on bark and wet surfaces after rain.",
      scienceNote: "Land snails (Pulmonata) are known from Carboniferous deposits. Eocene land snails are abundant and diverse in European fossil sites including Messel. Snail shell oxygen isotope analysis from Eocene specimens has provided high-resolution climate records of Eocene humidity and temperature cycles."
    }
  },
  centipede: {
    kind: "animal", name: "large centipede", icon: "🪱", className: "threat",
    dangerProfile: "bite", temperament: "defensive", canInvestigate: true,
    fitness: 55, size: 2, speed: 55, agility: 55, aggression: 65, food: 7,
    poison: {severity: "moderate", rank: 2, toxinType: "venom", lethal: false, turns: 4, damage: 3, warning: "Venomous bite"},
    seen: "A many-legged predator moves through the leaf litter with unsettling speed.",
    investigated: "The speed and venomous jaws make it a dangerous mouthful.",
    naturalHistory: {
      title: "Large centipede",
      fieldNote: "Large scolopendromorph centipedes are active hunters capable of subduing prey far exceeding a single insect \u2014 lizards, frogs, and small mammals fall within their range.",
      behaviour: "Moves fast and directionally when hunting, slower when patrolling. Investigates crevices and bark with its antennae before committing to entry.",
      ecology: "A generalist invertebrate predator of the forest floor and bark microhabitat. Its venom immobilises prey rapidly, allowing it to hunt animals larger than itself.",
      gameplayInsight: "Venom causes sustained damage \u2014 disengage immediately rather than fighting through the bite effect.",
      scienceNote: "Scolopendromorph centipedes have changed little since the Carboniferous. Eocene examples are known from amber and compression fossils. Modern giant species like Scolopendra gigantea regularly prey on bats and small rodents."
    }
  },
  millipede: {
    kind: "forage", name: "millipede", icon: "🪱", className: "food",
    canInvestigate: true, portions: 1, energy: 6,
    poison: null,
    seen: "A millipede coils beneath a wet leaf. Slow does not always mean safe.",
    cardDetail: "It remains tightly coiled, glossy segments catching what little light reaches the forest floor.",
    investigationDetails: ["Its shape and movement are clear, but the important question is chemical defence.", "You look for warning smell, colour, and whether predators have avoided it. The signs suggest risk, but not certainty.", "This millipede type is becoming familiar. Some are defended, some are harmless mimics, and some are worse than they look."],
    investigated: "It is tempting because it is slow, but millipedes can punish a careless mouthful.",
    naturalHistory: {
      title: "Millipede",
      fieldNote: "Millipedes defend themselves with quinone and hydrogen cyanide secretions from ozopore glands along the body \u2014 chemical defence that stains and repels most predators through a combination of irritation and toxicity.",
      behaviour: "Moves slowly through leaf litter in a steady, wave-propelled gait. Coils into a spiral when disturbed, presenting the hard dorsal plates and releasing chemical secretions.",
      ecology: "A primary shredder of leaf litter, processing dead plant material into smaller fragments for fungal and bacterial decomposition. Millipedes are keystone nutrient cyclers in the forest floor ecosystem.",
      gameplayInsight: "Edible after removing the dorsal secretion glands or roasting \u2014 but requires processing. Raw consumption causes mucosal irritation. Not worth the effort unless alternatives are exhausted.",
      scienceNote: "Diplopoda (millipedes) appear in the Silurian as some of the earliest terrestrial animals. Eocene millipedes from Baltic amber preserve fine morphological detail including ozopore positions. Some Eocene millipede species exceeded 30 cm \u2014 larger than most modern forms."
    }
  },

  // plants/fungi
  redBerries: {
    kind: "forage", name: "red berries", icon: "🍒", className: "food",
    canInvestigate: true, portions: 2, energy: 14,
    poison: {severity: "mild", rank: 1, toxinType: "plant", lethal: false, turns: 4, damage: 2, warning: "Mildly poisonous berries"},
    seen: "A cluster of red berries hangs beneath glossy leaves.",
    investigationDetails: [
      "The skins are bright and mostly untouched. Abundance without feeding marks can be a warning.",
      "The smell is sharp under the sweetness. These may fill you, but your gut may pay for it.",
      "A few insects avoid the split berries. That does not prove poison, but it argues for caution."
    ],
    investigated: "The berries are bright and intact, with little sign of feeding. That may be warning, not abundance.",
    naturalHistory: {
      title: "Red berries",
      fieldNote: "Red colouration in fruits is a dual signal \u2014 attractive to birds with red-sensitive vision, and in some lineages, convergent with the warning colouration of toxic species, creating identification uncertainty for mammals.",
      behaviour: "Small red fruits on shrubs and low trees, maturing in clusters. Some species ripen uniformly; others show mixed ripe and unripe fruits in the same cluster.",
      ecology: "A bird-dispersed fruit type in most cases, targeting robin and thrush-like frugivores. Mammal exploitation of red fruits is secondary and often less efficient due to visual spectrum differences.",
      gameplayInsight: "Requires individual species assessment \u2014 red colouration alone is not a safety indicator. Test with a small sample and wait before committing to full consumption.",
      scienceNote: "Red fruit colours in multiple plant families evolved convergently targeting similar disperser guilds. Eocene bird diversity included frugivores with full colour vision capable of red-fruit targeting. Some red berries in Eocene flora (Ericaceae relatives) are known from fossil seeds."
    }
  },
  purpleBerries: {
    kind: "forage", name: "purple berries", icon: "🫐", className: "food",
    canInvestigate: true, portions: 2, energy: 16,
    poison: null,
    seen: "Dark purple berries hang in a small cluster, several already pecked by birds.",
    investigationDetails: [
      "Several berries are torn open by small beaks. Other animals have risked them before you.",
      "The juice smells clean and sweet rather than bitter. This looks like useful food.",
      "The safest berries are the damaged ones: they prove something else ate and moved on."
    ],
    investigated: "Bird marks and torn skins suggest these are likely edible.",
    naturalHistory: {
      title: "Purple berries",
      fieldNote: "Anthocyanin pigmentation \u2014 the chemistry producing purple, blue, and red in berries \u2014 is itself a signal, with different colours attracting different disperser guilds through millions of years of coevolution.",
      behaviour: "Clusters of small purple fruits on shrubs and low trees, detaching readily at ripeness. Fermentation begins quickly in hot conditions, producing aromatic signals that reach further.",
      ecology: "A bird-dispersed fruit type in many forest systems. The anthocyanin pigment is reflective in ultraviolet light \u2014 a signal channel that birds detect but most mammals do not.",
      gameplayInsight: "High in sugars and generally edible across most shrub berry species. Competition from frugivorous birds is high \u2014 exploit clusters before they are stripped.",
      scienceNote: "Purple-fruited shrubs appear across multiple families in Eocene fossil floras. Anthocyanin biochemistry is ancient within angiosperms. Bird colour vision sensitivity to UV-reflective anthocyanin fruits is considered a coevolved disperser targeting mechanism established well before the Eocene."
    }
  },

  bitterLeaves: {
    kind: "forage", name: "bitter leaves", icon: "🌿", className: "food",
    canInvestigate: true, portions: 2, energy: 4,
    poison: null,
    seen: "A patch of bitter-smelling leaves grows low in the shade.",
    investigationDetails: [
      "The smell is sharp and unpleasant rather than rotten.",
      "These leaves are poor food, but the bitterness may matter if your gut is upset.",
      "The plant is easy to relocate once you have found it."
    ],
    investigated: "The leaves taste bitter and medicinal. Not good food, but worth remembering.",
    naturalHistory: {
      title: "Bitter leaves",
      fieldNote: "Plant secondary compounds \u2014 alkaloids, tannins, phenolics \u2014 are the chemical defence arsenal of sessile organisms that cannot flee, and bitterness is the taste signal that vertebrate herbivores evolved to read as toxicity warning.",
      behaviour: "Stationary resource. No behavioural component. Visual assessment of leaf condition, colour, and context provides the primary safety information.",
      ecology: "Heavy secondary compound investment in leaves reduces herbivory but has an energetic cost to the plant. High-alkaloid plants often show reduced herbivore damage and are shade-tolerant species with long leaf lifespans.",
      gameplayInsight: "Bitterness is the signal \u2014 do not override it. Small samples to test are reasonable; full consumption of intensely bitter material is not.",
      scienceNote: "Alkaloid diversity in Eocene plants was already high, driven by millions of years of plant-herbivore coevolution. London Clay and Messel plant assemblages include families (Menispermaceae, Ranunculaceae) known for high alkaloid investment in leaf tissue."
    }
  },

  fallenFruit: {
    kind: "forage", name: "fallen fruit", icon: "🍈", className: "food",
    canInvestigate: true, portions: 3, energy: 18,
    poison: null,
    seen: "A soft fallen fruit lies among leaves, bruised but rich with sugar.",
    cardDetail: "The skin is split and damp with sugar scent; insects are already feeding at the torn edge.",
    investigationDetails: [
      "The bruised flesh smells sweet, not rotten. Tiny insects are already feeding in the split skin.",
      "The fruit is soft enough to eat quickly, but the scent will not stay private for long.",
      "This is good fuel, especially for a group, but lingering over it may advertise you."
    ],
    investigated: "The smell is sweet rather than sour. Insects are feeding freely on the torn flesh.",
    naturalHistory: {
      title: "Fallen fruit",
      fieldNote: "Fallen fruit on the forest floor is a temporary resource pulse \u2014 available to ground-level foragers but degrading through insect colonisation, fungal invasion, and fermentation within hours of falling.",
      behaviour: "Stationary resource on the ground. Fermentation produces alcohol and volatile attractant compounds that broadcast the resource to frugivores at increasing distance as ripeness advances.",
      ecology: "A nutrient subsidy from canopy to ground, feeding ground-level frugivores, invertebrates, and even attracting larger mammals. Fallen fruit determines where ground animals concentrate their activity.",
      gameplayInsight: "Ground-level access means ground predator exposure. Assess the surroundings, feed quickly, and return to height \u2014 the nutritional return often justifies brief ground exposure.",
      scienceNote: "Fruit fermentation and the associated attraction of frugivores is documented across primate and bat ecology studies. Eocene mammals show dental evidence of fruit-dominated diets in several lineages, and the behaviour of exploiting fallen fruit is inferred from isotope studies of fossil tooth enamel."
    }
  },

  laurelDrupe: {
    kind: "forage", name: "laurel-like drupes", icon: "🟣", className: "food",
    canInvestigate: true, portions: 2, energy: 13, hydration: 2,
    poison: null,
    seen: "Dark oily drupes hang from glossy laurel-like leaves.",
    investigationDetails: [
      "The flesh is thin and rich rather than sugary. Several fruits show tooth marks.",
      "The stone inside is hard. The useful part is the dark, oily outer flesh.",
      "A faint resin scent clings to them, but birds and small mammals have fed here."
    ],
    investigated: "Oily dark fruit with feeding marks. Likely edible, but not as sweet as soft fruit.",
    naturalHistory: {
      title: "Laurel-like drupes",
      fieldNote: "Lauraceae drupes \u2014 oil-rich, single-seeded fruits \u2014 are among the most calorie-dense small fruits in the forest, their fat content representing a significant energy surplus relative to sugary fruits of similar size.",
      behaviour: "Attached to branches in small clusters, turning dark blue or black at ripeness. The oily outer layer is thin and offers a brief exploitation window before birds strip them.",
      ecology: "A fat-rich seed dispersal mechanism targeting birds with wide gapes. Lauraceae seed dispersal by birds is one of the most studied plant-disperser relationships in tropical ecology.",
      gameplayInsight: "High fat content per unit \u2014 prioritise when available. Competition from frugivorous birds is intense; exploit during low avian activity periods at dawn and dusk.",
      scienceNote: "Lauraceae are one of the dominant families in Eocene fossil floras globally, particularly in the London Clay and Messel. Fossil lauraceous fruits and leaves show remarkable morphological similarity to modern species in the family, which includes avocado, cinnamon, and camphor."
    }
  },

  palmFruit: {
    kind: "forage", name: "palm-like fruit", icon: "🟠", className: "food",
    canInvestigate: true, portions: 3, energy: 18, hydration: 3,
    poison: null,
    seen: "Oval palm-like fruits hang in a dense cluster beneath long fronds.",
    investigationDetails: [
      "The outer flesh is fibrous but rich. This is worth effort if you have time.",
      "Some fruits are gnawed open below the cluster. Other animals know this source.",
      "The food is awkward to handle, but dense enough to matter."
    ],
    investigated: "Fibrous, rich palm-like fruit. Good food, but slow to process.",
    naturalHistory: {
      title: "Palm-like fruit",
      fieldNote: "Palm fruits range from primarily carbohydrate to extraordinarily fat-rich \u2014 oil palms produce the highest vegetable oil yield per hectare of any crop plant, and their wild relatives show comparable seed oil content.",
      behaviour: "Produced in large clusters at the crown base. Individual fruits detach progressively as they ripen. Fallen fruits accumulate at the palm base and are exploited by ground animals.",
      ecology: "A high-energy seed dispersal mechanism targeting large frugivores. Palm fruit density and synchrony structures the seasonal movements of frugivore communities across wide areas.",
      gameplayInsight: "High fat and carbohydrate content. Abundant and spatially predictable. Ground accumulation below the trunk is accessible without climbing, but exposes you to ground-level predator risk.",
      scienceNote: "Oil palm relatives (Elaeis-like palms) have an Eocene fossil record in Africa. London Clay flora includes palm fruits of multiple genera. The fat-rich mesocarp of palms evolved as a megafauna dispersal reward \u2014 some of the original dispersers are now extinct."
    }
  },

  nypaFruit: {
    kind: "forage", name: "mangrove palm fruit", icon: "🌴", className: "food",
    canInvestigate: true, portions: 2, energy: 11, hydration: 4,
    poison: null,
    seen: "A heavy mangrove-palm fruit cluster lies near damp ground.",
    investigationDetails: [
      "The fruit is tough and fibrous, with watery flesh in places.",
      "It is not delicate food. It takes chewing and handling, but offers safe bulk.",
      "The damp setting makes it easier to smell, and easier for others to find."
    ],
    investigated: "Tough but useful wetland fruit. Safe-looking, fibrous, and filling enough.",
    naturalHistory: {
      title: "Mangrove palm fruit",
      fieldNote: "Nypa fruticans is a living fossil \u2014 the global distribution of fossil Nypa pollen across Eocene deposits from Britain to West Africa to South America indicates it was one of the most widespread plants on Earth during peak Eocene warmth.",
      behaviour: "Large, spherical compound fruits hang from the base of the palm crown above tidal or swamp water. Individual fruit segments float when detached \u2014 water is the primary dispersal medium.",
      ecology: "A dominant species of tidal mangrove and coastal swamp habitats, forming mono-dominant stands that stabilise sediment and provide refuge for estuarine fauna.",
      gameplayInsight: "Edible seed endosperm in the fruit segments. Coastal or swamp access required \u2014 factor in the high predator density of water margin habitats when approaching.",
      scienceNote: "Nypa pollen is one of the most abundant Eocene palynomorphs globally. During the Eocene Climatic Optimum, Nypa palms grew as far north as southern England and Germany. The genus is now restricted to Indo-Pacific mangroves \u2014 a dramatic range contraction tracking global cooling."
    }
  },

  vitisBerries: {
    kind: "forage", name: "grape-like berries", icon: "🍇", className: "food",
    canInvestigate: true, portions: 2, energy: 15, hydration: 4,
    poison: null,
    seen: "Small grape-like berries hang from a climbing vine.",
    investigationDetails: [
      "Several berries are split and sticky. Insects and birds have already fed here.",
      "The skin is taut, the pulp wet and sweet. It is quick food.",
      "The vine tangles through nearby branches, making the cluster easy to revisit."
    ],
    investigated: "Sweet vine berries with feeding marks. Good quick food.",
    naturalHistory: {
      title: "Grape-like berries",
      fieldNote: "Vitis and its relatives produce berries whose sugar-to-acid ratio changes predictably through ripening \u2014 a graded signal that rewards early-arriving frugivores with sourness and late-arriving ones with maximum sweetness.",
      behaviour: "Clusters of small round berries on climbing vines in forest edge and canopy gaps. Colour change from green to purple or red indicates ripening stage. Juice releases when compressed.",
      ecology: "A bird and mammal dispersed fruit type whose vine habit allows it to climb using existing tree structure rather than investing in trunk wood \u2014 a rapid height-gaining strategy at canopy gaps.",
      gameplayInsight: "High sugar content at full ripeness \u2014 prioritise deep-coloured, soft clusters over green or firm ones. Forest edge and gap locations where vines climb are the primary search areas.",
      scienceNote: "Vitaceae (grape family) are known from Eocene fossil pollen and leaves in Europe and North America. Fossil Vitis seeds from the Eocene show morphology consistent with modern wild grape species. The family's climbing vine habit appears to have been established by the mid-Eocene."
    }
  },

  menispermBerry: {
    kind: "forage", name: "moonseed-like berries", icon: "🟤", className: "food",
    canInvestigate: true, portions: 2, energy: 9,
    poison: {severity: "moderate", rank: 2, toxinType: "plant", lethal: false, turns: 5, damage: 3, warning: "Bitter moonseed-like fruit"},
    seen: "Round berries hang from a twining vine, their skins dull and unmarked.",
    investigationDetails: [
      "The berries are tempting, but almost untouched. That silence around them matters.",
      "A bitter scent sits under the fruit smell. The vine itself tastes sharp on the tongue.",
      "The seed shape feels wrong under the pulp. This may be food only for animals that know it."
    ],
    investigated: "Dull, mostly untouched vine berries with a bitter scent. Risky.",
    naturalHistory: {
      title: "Moonseed-like berries",
      fieldNote: "Menispermaceae produce berries that are visually indistinguishable from edible species but contain alkaloids including trilobine and dauricine \u2014 compounds with cardiac and neuromuscular effects at low doses.",
      behaviour: "Clusters of small, dark-coloured berries on twining vines in the understorey. Animal avoidance of these berries at high concentration sites is observable if you watch closely.",
      ecology: "A chemically defended fruiting plant that reduces seed predation through toxicity. Some specialised frugivores with detoxification capacity exploit these berries specifically.",
      gameplayInsight: "Treat dark berries on twining understorey vines with caution. Visible animal avoidance of a berry cluster is a reliable warning signal worth respecting.",
      scienceNote: "Menispermaceae have an extensive Eocene fossil record, particularly from the London Clay flora where multiple genera are identified from seeds. The family's alkaloid diversity was already high by the Eocene, based on phylogenetic inference from the fossil record."
    }
  },

  arilFruit: {
    kind: "forage", name: "bright aril fruit", icon: "🔴", className: "food",
    canInvestigate: true, portions: 1, energy: 10, hydration: 2,
    poison: {severity: "mild", rank: 1, toxinType: "seed", lethal: false, turns: 4, damage: 2, warning: "Edible flesh around risky seeds"},
    seen: "Bright fleshy arils cling around hard dark seeds.",
    investigationDetails: [
      "The coloured flesh is the lure. The hard seeds are the danger.",
      "Birds have stripped some arils clean and left the seeds behind.",
      "A careful animal would eat the flesh and avoid crushing the seed."
    ],
    investigated: "The flesh may be edible, but the seed is risky. Careless chewing could punish you.",
    naturalHistory: {
      title: "Bright aril fruit",
      fieldNote: "An aril is a seed coating evolved specifically to attract animal dispersers \u2014 its colour, texture, and nutrition are adaptations to the visual and dietary preferences of a target disperser.",
      behaviour: "Hangs conspicuously from seed pods or capsules, often in colour contrast to surrounding vegetation. The aril decays quickly once the seed is exposed.",
      ecology: "A seed dispersal mechanism linking the parent plant to mobile animal vectors. Aril fruiting is often synchronised to peak disperser activity periods.",
      gameplayInsight: "High sugar and fat content in a visible, reliably located package. Consume the aril \u2014 avoid the seed itself, which may contain secondary compounds.",
      scienceNote: "Arillate seeds are known from Eocene fossil deposits including specimens from the London Clay flora. Several Eocene plant families including Sapindaceae and Celastraceae produced arillate seeds adapted to bird and mammal dispersal during this period."
    }
  },

  custardAppleFruit: {
    kind: "forage", name: "custard-apple-like fruit", icon: "🍈", className: "food",
    canInvestigate: true, portions: 3, energy: 20, hydration: 5,
    poison: null,
    seen: "A lumpy green fruit has split open, exposing soft pale flesh.",
    investigationDetails: [
      "The flesh is soft, sweet, and already drawing small insects.",
      "The black seeds are hard and should be avoided, but the pulp looks valuable.",
      "This is exactly the sort of fruit a small primate would remember."
    ],
    investigated: "Soft sweet pulp, high value, with hard seeds to avoid.",
    naturalHistory: {
      title: "Custard-apple-like fruit",
      fieldNote: "Annonaceae fruits are ancient \u2014 their family appears in the Cretaceous, and their large, sweet, multi-seeded structure is considered a relic adaptation to megafauna dispersers that no longer exist in most of their range.",
      behaviour: "Ripens to a soft, fragrant mass and falls from the tree when fully ripe, or drops when branches are disturbed. Aroma increases dramatically at peak ripeness.",
      ecology: "A high-sugar fruit adapted to large-bodied frugivores capable of processing the seeds. In the Eocene, appropriate megafaunal dispersers are present, making the mutualism intact.",
      gameplayInsight: "Rich caloric source when ripe. The strong aroma at full ripeness also attracts competing frugivores \u2014 expect competition from other animals at ripe fruit falls.",
      scienceNote: "Annonaceae pollen and leaf fossils are known from Eocene deposits globally. The family is considered one of the most primitive flowering plant lineages. Some living Annonaceae species show morphological stasis compared to Eocene specimens \u2014 a rare example of evolutionary conservatism over 50 million years."
    }
  },

  resinousFruit: {
    kind: "forage", name: "resinous yellow fruit", icon: "🟡", className: "food",
    canInvestigate: true, portions: 2, energy: 8,
    poison: {severity: "mild", rank: 1, toxinType: "resin", lethal: false, turns: 3, damage: 2, warning: "Irritating resin"},
    seen: "Yellow fruits bead sticky resin where the skin is broken.",
    investigationDetails: [
      "The smell is sharp and resinous rather than cleanly sweet.",
      "Few animals have touched the damaged fruit. The sticky sap clings unpleasantly.",
      "There may be energy here, but the resin could upset your mouth and gut."
    ],
    investigated: "Sticky resin and little feeding damage. Edible-looking, but risky.",
    naturalHistory: {
      title: "Resinous yellow fruit",
      fieldNote: "Resinous fruits use terpenoid compounds as both disperser attractants and seed protectants \u2014 the same chemicals that deter most herbivores make the fruit's ripening scent signal distinctive and far-carrying.",
      behaviour: "Yellow-orange fruits in the mid-canopy with sticky surface texture when ripe. Strong aromatic scent carries downwind and is detectable at distance. Pulp adheres to handling surfaces.",
      ecology: "A specialist dispersal mechanism attracting animals with terpenoid tolerance \u2014 certain bird species, some primates, and bats. Most invertebrates avoid the resin surface.",
      gameplayInsight: "The sticky resin can complicate hand and fur grooming \u2014 consume efficiently rather than handling repeatedly. The aromatic scent marks your location to animals with chemical senses.",
      scienceNote: "Resinous fruits appear in Eocene flora across multiple tropical families. Burseraceae (frankincense and myrrh relatives) produce resinous fruits known from Eocene fossil deposits. The terpenoid compounds in resin are biosynthetically related to those used in plant-herbivore defence."
    }
  },

  soapberryFruit: {
    kind: "forage", name: "soapberry-like fruit", icon: "🟡", className: "food",
    canInvestigate: true, portions: 2, energy: 7,
    poison: {severity: "moderate", rank: 2, toxinType: "saponin", lethal: false, turns: 4, damage: 3, warning: "Foaming bitter fruit"},
    seen: "Translucent yellow fruits hang in a sparse cluster.",
    investigationDetails: [
      "A crushed fruit foams slightly against wet bark. That is not a good sign.",
      "The sweetness is thin, with bitterness underneath.",
      "These may be useful to some animals, but they do not look safe for a quick meal."
    ],
    investigated: "Foaming, bitter fruit. Risky despite the bright colour.",
    naturalHistory: {
      title: "Soapberry-like fruit",
      fieldNote: "Sapindaceae fruits contain saponins \u2014 amphipathic molecules that disrupt cell membranes \u2014 in concentrations that are toxic to fish and many invertebrates but tolerated at low doses by most vertebrates.",
      behaviour: "Small round fruits in clusters at mid-canopy level, turning from green to yellow or orange-red at ripeness. The flesh between seed and skin is the palatable zone.",
      ecology: "A dispersal mechanism targeting medium-sized frugivores capable of saponin tolerance. The chemical deterrence discourages seed predators (who consume the seed) while allowing seed dispersers (who swallow and excrete).",
      gameplayInsight: "Edible in moderate amounts \u2014 the saponin concentration in ripe fruit flesh is generally below threshold for vertebrate toxicity. Avoid consuming in bulk or eating the seeds.",
      scienceNote: "Sapindaceae are among the dominant families in Eocene fossil floras, particularly in the London Clay. The family includes lychee, longan, and maple. Saponin-containing Sapindaceae fruits from Eocene deposits are identified from seed morphology in multiple collections."
    }
  },

  podFruit: {
    kind: "forage", name: "bean-like pods", icon: "🫘", className: "food",
    canInvestigate: true, portions: 2, energy: 12,
    poison: {severity: "mild", rank: 1, toxinType: "seed", lethal: false, turns: 4, damage: 2, warning: "Hard defensive seeds"},
    seen: "Bean-like pods hang dry and rattling from a branch.",
    investigationDetails: [
      "The pod wall is fibrous and the seeds are hard. This is not soft fruit.",
      "Gnaw marks suggest something can use them, but not without effort.",
      "Crushing the seeds may be risky; picking around them would be safer."
    ],
    investigated: "Possible food with hard defensive seeds. More effort and risk than soft fruit.",
    naturalHistory: {
      title: "Bean-like pods",
      fieldNote: "Legume pods represent one of the most successful seed dispersal designs in plant evolution \u2014 the explosive dehiscence mechanism or the edible pod wall each serve different dispersal strategies within the same family.",
      behaviour: "Pods hang on climbing or standing shrubs and trees, drying and darkening at maturity. Some species split explosively on hot afternoons. Others retain seeds in the pod.",
      ecology: "Leguminosae (Fabaceae) were already among the dominant families in Eocene forests and are key nitrogen-fixers through root nodule bacteria \u2014 a contribution to soil fertility with ecosystem-wide effects.",
      gameplayInsight: "Seeds inside mature pods are often edible and calorie-dense. Listen for pod-splitting sounds on warm afternoons to locate fresh seed falls.",
      scienceNote: "Fabaceae are among the most species-rich families in Eocene fossil floras globally. London Clay and Messel preserve legume leaves, pods, and seeds. Nitrogen-fixing root nodules in legumes are inferred to have Eocene or earlier origins based on molecular clock estimates."
    }
  },

  pandanusFruit: {
    kind: "forage", name: "screw-palm-like fruit", icon: "🟧", className: "food",
    canInvestigate: true, portions: 3, energy: 16, hydration: 3,
    poison: null,
    seen: "A segmented screw-palm-like fruit rests among broad leaves.",
    investigationDetails: [
      "The fruit is fibrous and divided into tough sections.",
      "It smells ripe rather than rotten. The best parts are the softer orange edges.",
      "This is not quick food, but it is substantial."
    ],
    investigated: "Fibrous segmented fruit. Useful if you can spend time on it.",
    naturalHistory: {
      title: "Screw-palm-like fruit",
      fieldNote: "Pandanus fruits are aggregated into a dense compound structure with individual keys \u2014 each key containing seeds surrounded by fibrous, starchy, and sometimes oily tissue that requires processing to access.",
      behaviour: "Large spherical or ovoid compound fruits hang at the crown. Keys detach individually at ripeness and fall or are carried by water. Fibrous structure resists casual exploitation.",
      ecology: "A major food resource in coastal and swamp environments, adapted to water dispersal as a primary vector. Its dense structure and sequential key ripening extends the fruiting resource window.",
      gameplayInsight: "Processing requires time \u2014 separate individual keys and target the base tissue rather than the fibrous exterior. High starch return once accessed.",
      scienceNote: "Pandanaceae are known from Eocene fossil pollen and leaf records across the Indo-Pacific. Pandanus-type leaf structure is recognisable in Eocene deposits from coastal paleo-environments. The genus has changed little morphologically since the Eocene."
    }
  },

  magnoliaFlowers: {
    kind: "forage", name: "magnolia flowers", icon: "🌼", className: "food",
    canInvestigate: true, portions: 2, energy: 5, hydration: 3,
    poison: null,
    seen: "Large fleshy magnolia-like petals lie open among glossy leaves.",
    investigationDetails: [
      "The petals are thick and clean, with a mild spicy scent rather than rot or bitterness.",
      "They are not rich like fruit, but the soft tissues hold a little moisture and energy.",
      "Flowers like this are scattered rewards: useful when better food is scarce."
    ],
    investigated: "The fleshy petals smell mild and edible. This is safe, low-value forage.",
    naturalHistory: {
      title: "Magnolia flowers",
      fieldNote: "Magnolia is among the oldest flowering plant genera \u2014 its flowers lack the specialised structures of more derived angiosperms and are thought to represent the ancestral angiosperm flower condition.",
      behaviour: "Large, white or cream petals open in the upper and mid-canopy for a brief period. Strong floral scent carries far in still morning air. Petals are thick and semi-rigid.",
      ecology: "A generalist pollinator resource that evolved before bees and relies on beetles and flies as primary pollinators. Its ancient pollination syndrome is maintained by a different visitor community than most modern flowers.",
      gameplayInsight: "Nectar is present at the flower base. The strong scent makes these trees detectable from significant distance \u2014 use it as a navigation landmark.",
      scienceNote: "Magnoliaceae have one of the best Eocene fossil records of any flowering plant family. Fossil magnolia leaves, pollen, and flowers are known from Eocene deposits in North America, Europe, and Asia, with some specimens nearly indistinguishable from living species."
    }
  },
  hibiscusFlowers: {
    kind: "forage", name: "hibiscus-type flowers", icon: "🌺", className: "food",
    canInvestigate: true, portions: 2, energy: 6, hydration: 5,
    poison: null,
    seen: "Bright soft flowers hang open, their centres wet with nectar.",
    investigationDetails: [
      "The petals are delicate and the nectar is easy to reach.",
      "This is quick, safe forage: more moisture and sweetness than real substance.",
      "The colour also makes the patch visible to insects and birds."
    ],
    investigated: "Soft petals and accessible nectar make this a safe quick mouthful.",
    naturalHistory: {
      title: "Hibiscus-type flowers",
      fieldNote: "Malvaceae flowers produce accessible nectar in shallow nectaries with large, visually conspicuous petals \u2014 a generalist pollination strategy that attracts diverse visitors rather than locking to specialist pollinators.",
      behaviour: "Individual flowers open for a single day and close. The plant produces flowers sequentially over an extended period, maintaining attractant availability across weeks.",
      ecology: "A generalist pollinator resource supporting diverse bee, butterfly, and nectar-feeding bird communities. Large petal surface area also provides basking platforms for thermoregulating insects.",
      gameplayInsight: "Daily flower cycle means fresh nectar is reliably present at dawn before insect activity depletes it. Return to known plants in early morning for best yield.",
      scienceNote: "Malvaceae pollen and leaf fossils are known from Eocene deposits globally, including the London Clay flora. The family had diversified widely by the mid-Eocene and includes ancestors of cotton, cacao, and durian \u2014 all with distinct flower architecture strategies."
    }
  },
  roseFamilyBlossoms: {
    kind: "forage", name: "rose-family blossoms", icon: "🌸", className: "food",
    canInvestigate: true, portions: 1, energy: 3, hydration: 2,
    poison: null,
    seen: "Small pale blossoms are scattered through the low vegetation.",
    investigationDetails: [
      "The blossoms are small and common, more background forage than a meal.",
      "They smell faintly sweet and show no obvious warning signs.",
      "A few petals can fill a gap, but fruit would matter far more."
    ],
    investigated: "Small safe blossoms: low value, but easy to take while moving.",
    naturalHistory: {
      title: "Rose-family blossoms",
      fieldNote: "Rosaceae flowers are the template for pollinator-attracting floral design \u2014 five-petalled, symmetrical, nectary-bearing structures that pollinators can learn to exploit efficiently across thousands of species with the same basic architecture.",
      behaviour: "White or pale pink flowers in dense clusters on shrubs and small trees. Short-lived individual flowers but extended bloom period across the plant. Strong honey-like scent in warm conditions.",
      ecology: "A generalist pollinator resource for bees, flies, beetles, and small nectar-feeding birds. The standardised flower form allows pollinators to transfer between rose-family species without learning new search images.",
      gameplayInsight: "Reliable nectar source across the Eocene. Dense flower clusters mean significant nectar yield per visit. Bloom timing follows temperature cues \u2014 seek out after warm, settled weather.",
      scienceNote: "Rosaceae appear in the Eocene fossil record with leaves and pollen from European and North American sites. The family has diversified extensively since the Eocene to include apple, cherry, strawberry, and rose \u2014 all retaining the ancestral five-petalled flower architecture."
    }
  },
  citrusBlossoms: {
    kind: "forage", name: "citrus-type blossoms", icon: "🌼", className: "food",
    canInvestigate: true, portions: 1, energy: 4, hydration: 3,
    poison: null,
    seen: "Strongly scented pale blossoms stand out in the warm air.",
    investigationDetails: [
      "The scent is sharp and sweet, carrying further than the petals themselves.",
      "There is a little nectar here, but the smell may also draw insects.",
      "This is safe forage, with a small risk of attracting attention."
    ],
    investigated: "The scented blossoms hold a little nectar and no obvious toxin.",
    naturalHistory: {
      title: "Citrus-type blossoms",
      fieldNote: "Rutaceae flowers produce nectar within deep, cup-shaped nectaries \u2014 a resource with a high sugar concentration that rewards pollinators with refined mouthpart access over generalists.",
      behaviour: "Dense clusters of white flowers produce strong aromatic compounds that carry significant distances in warm forest air, advertising the resource to distant foragers.",
      ecology: "A pollinator resource attracting bees, butterflies, and nectar-feeding birds. The strong scent signal concentrates pollinators in one location, increasing cross-pollination efficiency.",
      gameplayInsight: "High-concentration nectar accessible from the flower base. Detectable by scent at distance \u2014 follow aromatic signals in warm morning hours when volatiles are most active.",
      scienceNote: "Rutaceae are known from Eocene fossil sites. Citrus-relative pollen is documented in Eocene deposits in Asia and southern Europe. The family had already diversified widely by the mid-Eocene, with multiple genera producing aromatic flower structures."
    }
  },
  bananaTypeFlowers: {
    kind: "forage", name: "banana-type flowers", icon: "🌷", className: "food",
    canInvestigate: true, portions: 2, energy: 9, hydration: 3,
    poison: null,
    seen: "Large layered fibrous flowers hang from broad-leaved vegetation.",
    investigationDetails: [
      "The flower is substantial for a flower: fibrous layers rather than thin petals.",
      "It takes more handling than soft blossoms, but gives a better mouthful.",
      "This is still not fruit, but it is more than decoration."
    ],
    investigated: "Fibrous but edible. It takes time, yet gives moderate energy.",
    naturalHistory: {
      title: "Banana-type flowers",
      fieldNote: "Musaceae-type inflorescences present large, structured nectar sources in low-canopy and forest edge settings \u2014 a reliable high-volume nectar reward that few arboreal foragers miss.",
      behaviour: "Large bracts protect individual flowers that open sequentially. Nectar accumulates in the flower base and is accessible to animals with appropriate bill or muzzle length.",
      ecology: "A pollinator-attracting structure that rewards birds, bats, and large insects differentially depending on flower depth. The sequential opening extends the nectar availability window across multiple days.",
      gameplayInsight: "Reliable nectar source in a fixed location. Check the flower base rather than the bract surface \u2014 nectar pools there in quantity.",
      scienceNote: "Musaceae and related Zingiberales families have an Eocene fossil record. Pollen and leaf fossils from Eocene deposits in Asia and Africa confirm the family was widespread and producing large inflorescences by this period."
    }
  },
  palmFlowers: {
    kind: "forage", name: "palm flowers", icon: "🌴", className: "food",
    canInvestigate: true, portions: 2, energy: 4, hydration: 2,
    poison: null,
    seen: "Dense palm flower clusters shed pollen and attract tiny insects.",
    investigationDetails: [
      "The flowers themselves are low-value, but insects move through the cluster.",
      "A careful mouthful may bring a little bonus protein with the petals.",
      "This is useful opportunistic forage, especially when larger fruit is absent."
    ],
    investigated: "Safe low-value flowers, with a chance of extra insects in the cluster.",
    naturalHistory: {
      title: "Palm flowers",
      fieldNote: "Palm inflorescences are among the most productive nectar sources in tropical forests \u2014 large compound structures producing nectar continuously over extended periods in quantities accessible to mammals, not just insects.",
      behaviour: "Emerge from sheaths at the crown base in large compound structures with hundreds of individual flowers. Pollen release in male phases coats any visiting animal thoroughly.",
      ecology: "A generalist pollinator resource supporting bees, beetles, flies, and vertebrate visitors simultaneously. Wind also plays a role in pollen transfer in many palm species.",
      gameplayInsight: "Accessible pollen and nectar in large quantities. The crown position requires climbing to the upper trunk \u2014 exposure to aerial predators is elevated at this height.",
      scienceNote: "Arecaceae (palms) are one of the most diverse plant families in Eocene fossil floras. Arecaceous pollen is abundant in Eocene pollen spectra globally. Multiple palm genera including Sabalites and Phoenicites are identified from Eocene leaf and pollen fossils."
    }
  },
  canopyFruit: {
    kind: "forage", name: "canopy fruit", icon: "🍏", className: "food",
    canInvestigate: true, portions: 2, energy: 20,
    poison: null,
    seen: "Small fruits hang overhead, bright against the wet leaves.",
    investigated: "The fruit smells sweet and several have been opened by birds or other climbers.",
    naturalHistory: {
      title: "Canopy fruit",
      fieldNote: "Fruits produced in the highest canopy layer are inaccessible to ground-dwelling frugivores \u2014 a spatial filter that rewards exclusively arboreal foragers with lower competition for a concentrated resource.",
      behaviour: "Hangs from terminal branches in the upper canopy, ripening in colour stages visible from a distance. Clusters rather than scattered distribution makes it detectable before approach.",
      ecology: "A seed dispersal mechanism adapted to large-bodied arboreal frugivores and birds. High position reduces ground-level competition and restricts dispersal to animals capable of reaching canopy height.",
      gameplayInsight: "Requires reaching high canopy positions \u2014 higher risk from aerial predators but significantly lower competition than ground-level fruit resources.",
      scienceNote: "Canopy fruit syndromes \u2014 size, colour, nutrient composition, and position adapted to specific dispersers \u2014 are well-documented across Eocene plant families. Upper canopy fruiting is associated with large-seeded plants requiring mobile animal dispersers in the Eocene fossil botanical record."
    }
  },
  paleMushroom: {
    kind: "forage", name: "pale mushrooms", icon: "🍄", className: "food",
    canInvestigate: true, portions: 2, energy: 8,
    poison: {severity: "severe", rank: 4, toxinType: "fungal", lethal: true, criticalTimer: 7, turns: 7, damage: 7, warning: "Severely poisonous fungus"},
    seen: "Pale mushrooms push from rotting wood, clean and untouched.",
    investigated: "Nothing seems to have eaten them. The clean caps and sharp smell are ominous.",
    naturalHistory: {
      title: "Pale mushrooms",
      fieldNote: "Pale, white, or cream mushrooms in forest settings include the most dangerous species known \u2014 Amanita phalloides and relatives cause irreversible liver failure days after consumption, after initial symptoms subside.",
      behaviour: "Stationary resource. Growth from soil or dead wood, often in clusters or rings. No behavioural component \u2014 the danger is entirely chemical and not signalled by the organism.",
      ecology: "Many pale mushrooms are mycorrhizal partners of forest trees \u2014 the visible fruiting body is the reproductive structure of an organism whose main mass supports tree root networks.",
      gameplayInsight: "Pale mushrooms on soil require maximum caution. When in doubt, do not consume \u2014 the cost of a missed opportunity is recoverable; the cost of misidentification is not.",
      scienceNote: "Amanita and related amatoxin-producing genera have a fossil record extending to the Eocene in Baltic amber. The amatoxin biosynthesis pathway is ancient within the genus. Amatoxins cause delayed onset liver failure specifically because they block RNA polymerase II \u2014 a mechanism that has no antidote."
    }
  },
  brownMushroom: {
    kind: "forage", name: "brown mushrooms", icon: "🍄", className: "food",
    canInvestigate: true, portions: 2, energy: 10,
    poison: null,
    seen: "Brown mushrooms grow from a damp fallen branch.",
    investigated: "Gnaw marks and insect feeding suggest these are probably safe.",
    naturalHistory: {
      title: "Brown mushrooms",
      fieldNote: "The visible mushroom is the reproductive structure of a fungal organism whose main body \u2014 the mycelium \u2014 may extend for metres or kilometres through the substrate, cycling nutrients on a scale invisible to any surface observer.",
      behaviour: "Stationary resource. Spore release occurs in atmospheric conditions that carry spores away from the parent \u2014 visible as a puff from the cap when physically disturbed.",
      ecology: "A decomposer organism breaking down dead wood and leaf litter and making nutrients available to plants through mycorrhizal networks. Fungal fruiting is a nutrient cycling event.",
      gameplayInsight: "Brown-capped mushrooms on dead wood are often edible, but colour and substrate type alone do not guarantee safety. Consume a small amount and wait before relying on as a food source.",
      scienceNote: "Basidiomycete fungi are known from the Cretaceous. Eocene amber from Baltic deposits preserves mushroom fruiting bodies with cap and stipe morphology, confirming that above-ground sporocarp production in modern form was established by this period."
    }
  },

  cycadSeeds: {
    kind: "forage", name: "cycad seeds", icon: "🔶", className: "food",
    canInvestigate: true, portions: 2, energy: 16,
    poison: {severity: "severe", rank: 3, toxinType: "cycasin", lethal: false, turns: 6, damage: 6, warning: "Cycasin attacks liver tissue — deep cramping and nausea spread rapidly."},
    seen: "Bright orange seeds lie scattered around a squat, palm-like plant with a central cone structure.",
    investigationDetails: [
      "The plant is not a true palm — its leaves are stiffer, the trunk thicker and more fibrous.",
      "The seeds are vivid orange and oily-looking, but nothing nearby has touched them.",
      "A cycad. The seeds are energy-rich but packed with cycasin — a potent liver toxin with no safe dose."
    ],
    investigated: "Cycad seeds. Visually rich and attractive. Severely toxic raw — no safe quantity exists for a small-bodied primate.",
    naturalHistory: {
      title: "Cycad seeds (Cycadaceae)",
      fieldNote: "Cycad seeds contain cycasin, a glycoside that hydrolyses to methylazoxymethanol in the gut — a compound causing irreversible liver and kidney damage at low doses in most vertebrates.",
      behaviour: "Seeds ripen slowly within a central cone structure. Bright orange colouration develops over weeks as oil-rich seed tissue matures. Seeds scatter after cone disintegration rather than by explosive mechanism.",
      ecology: "Cycads rely on large beetles and, in some lineages, vertebrates with cycasin tolerance for seed dispersal. Most frugivores are excluded — the toxin selectively filters which animals interact with the seeds.",
      gameplayInsight: "Do not eat. The vivid colour is a warning, not an invitation. No safe dose exists for raw cycad seed in a small primate body.",
      scienceNote: "Cycadaceae have one of the longest fossil records of any living plant family. Direct cycad ancestors are confirmed from the Triassic, with Eocene cycad pollen and megasporophylls recorded from North America, Europe, and Asia. The cycasin biosynthesis pathway is conserved across all extant cycad genera and is presumed ancient."
    }
  },

  spurgeCapsules: {
    kind: "forage", name: "spurge capsules", icon: "🟤", className: "food",
    canInvestigate: true, portions: 2, energy: 10,
    poison: {severity: "severe", rank: 3, toxinType: "latex", lethal: false, turns: 5, damage: 5, warning: "Euphorbia latex causes severe mucosal irritation and systemic toxicity."},
    seen: "Small three-lobed capsules hang from a shrub with milky sap beading at every stem break.",
    investigationDetails: [
      "The stem oozes white latex when a leaf is bent — sticky and immediately unpleasant on the fingers.",
      "Capsules split explosively in heat, scattering seeds coated in the same sap.",
      "A spurge-family plant. The latex is a systemic deterrent toxic to most herbivores — seeds and flesh alike."
    ],
    investigated: "Euphorbiaceae capsules. Latex in both flesh and seed coat is toxic. The explosive dispersal mechanism means seeds carry the sap wherever they land.",
    naturalHistory: {
      title: "Spurge capsules (Euphorbiaceae)",
      fieldNote: "Euphorbiaceae produce diterpenoid esters and latex compounds causing severe mucosal damage, systemic inflammation, and at high doses liver and kidney failure. The latex functions as both a herbivore deterrent and a wound-sealing agent.",
      behaviour: "Mature capsules are three-sectioned and split explosively in dry heat, projecting seeds several metres. Latex production is highest in young tissue and at wound sites. The entire plant is chemically defended.",
      ecology: "A dominant family in Eocene tropical forests, Euphorbiaceae fill roles from pioneer shrubs to canopy trees. The latex-based defence is a convergent strategy found across multiple unrelated plant families.",
      gameplayInsight: "Avoid handling broken stems — latex contact is an irritant before consumption is attempted. Seeds carry the sap coating after explosive dispersal.",
      scienceNote: "Euphorbiaceae are among the most frequently identified families in the London Clay flora. Seed and fruit morphology resembling Eocene Euphorbiaceae genera is recovered from multiple Eocene Lagerstätten. The diterpenoid ester pathway responsible for latex toxicity is conserved across the family and presumed ancient."
    }
  },

  hollyBerries: {
    kind: "forage", name: "holly-like berries", icon: "🔴", className: "food",
    canInvestigate: true, portions: 2, energy: 8,
    poison: {severity: "moderate", rank: 2, toxinType: "ilicin", lethal: false, turns: 4, damage: 3, warning: "Ilicin and saponins cause vomiting and cramping."},
    seen: "Clusters of vivid red berries line a spiny-leaved shrub, each berry glossy and perfectly formed.",
    investigationDetails: [
      "The leaves are stiff with sharp teeth along the margin — the shrub actively deters browsing.",
      "The red berries are small and bright but smell of nothing useful.",
      "A holly-type shrub. The berries contain ilicin and saponins — attractive-looking but toxic to small mammals."
    ],
    investigated: "Holly-like berries. The vivid colour draws attention, but these are moderately toxic to small primates.",
    naturalHistory: {
      title: "Holly-like berries (Aquifoliaceae)",
      fieldNote: "Ilex species contain ilicin, theobromine, and saponins in the berry flesh. These compounds cause vomiting, diarrhoea, and lethargy at doses toxic to most mammals, while remaining tolerated by the thrush-sized birds that disperse the seeds.",
      behaviour: "Berries ripen to bright red, yellow, or black. They persist on the shrub into dry season as bird food when other resources are exhausted. Spiny leaves discourage large herbivore browsing of foliage.",
      ecology: "A dispersal strategy targeting specific bird species and tolerant mammals. Toxicity level filters seed dispersers from seed predators — birds pass the seeds intact, most mammals cannot safely consume the flesh.",
      gameplayInsight: "Bright red and present when other food is absent, but the attractiveness is the trap. Follow bird foraging activity on this shrub only when nothing safer is available.",
      scienceNote: "Aquifoliaceae, including Ilex, are well-documented in Eocene fossil floras. Ilex pollen and leaf impressions from Eocene deposits in Europe and North America confirm the genus was widespread and diverse by this period. Theobromine — also found in cacao — is present in Ilex species and is toxic to most mammals at low doses."
    }
  },

  milkweedFruit: {
    kind: "forage", name: "milkweed-family fruit", icon: "🫛", className: "food",
    canInvestigate: true, portions: 2, energy: 12,
    poison: {severity: "moderate", rank: 2, toxinType: "cardiac_glycoside", lethal: false, turns: 5, damage: 4, warning: "Cardiac glycosides disrupt heart rhythm and cause weakness and nausea."},
    seen: "A smooth, elongated pod hangs from a climbing plant, pale green and faintly waxy.",
    investigationDetails: [
      "The pod is long and tapered — more seed vessel than edible fruit.",
      "Broken open, the interior holds dense rows of seeds attached to silky white fibres.",
      "An Apocynaceae-type plant. The entire structure carries cardiac glycosides — genuinely dangerous, not just unpleasant."
    ],
    investigated: "Milkweed-family pod. Cardiac glycosides throughout the structure make this a real danger rather than a mild deterrent.",
    naturalHistory: {
      title: "Milkweed-family fruit (Apocynaceae)",
      fieldNote: "Apocynaceae produce cardiac glycosides that inhibit the sodium-potassium pump in heart muscle cells, causing bradycardia and arrhythmia. These are among the most pharmacologically potent natural compounds produced by plants.",
      behaviour: "Pods develop from insect-pollinated flowers with characteristic corona structures. Mature pods split along one seam, releasing seeds with long white fibres for wind dispersal. The entire plant from root to seed coat is chemically defended.",
      ecology: "The cardiac glycoside defence discourages vertebrate seed predation while allowing some insect tolerance. Certain insects sequester the glycosides for their own chemical defence — a relationship likely established well before the Eocene.",
      gameplayInsight: "Avoid. The seed fibres are not nutritious and the seed coat is toxic. The elongated pale-green pod shape becomes distinctive once recognised.",
      scienceNote: "Apocynaceae are confirmed in Eocene fossil floras at both Messel and London Clay sites. The family is currently one of the most species-rich in tropical forests — its Eocene diversity was likely comparable. Cardiac glycoside-producing lineages are among the most ancient within the family based on molecular phylogenetics."
    }
  },

  aroidShoots: {
    kind: "forage", name: "aroid shoots", icon: "🌿", className: "food",
    canInvestigate: true, portions: 2, energy: 6,
    poison: {severity: "mild", rank: 1, toxinType: "oxalate", lethal: false, turns: 3, damage: 2, warning: "Calcium oxalate crystals cause immediate burning pain in the mouth and throat."},
    seen: "Broad-leaved aroid plants crowd the shaded floor, fresh shoots tightly wound and pale.",
    investigationDetails: [
      "The leaves are large and waxy, forming natural funnels that pool moisture.",
      "The shoots smell green and vegetable-like — potentially palatable, but aroids vary widely.",
      "Raw aroid tissue contains raphide crystals. Eating untested means accepting mouth and throat burning."
    ],
    investigated: "Aroid shoots. Mild oxalate toxicity in raw tissue — unpleasant rather than dangerous in small amounts.",
    naturalHistory: {
      title: "Aroid shoots (Araceae)",
      fieldNote: "Araceae produce calcium oxalate raphides — needle-shaped crystals that physically penetrate oral mucosa on contact, causing immediate burning pain and swelling. The mechanism deters consumption before significant tissue is ingested.",
      behaviour: "Aroids produce a single emergent shoot that unfolds into a large leaf. The fresh shoot is the most palatable stage before lignification. Dense clonal patches form in moist, shaded understorey conditions.",
      ecology: "Among the dominant understorey plants in Eocene tropical forests, Araceae occupy the deep-shade niche inaccessible to most fruiting angiosperms. Rhizomes store carbohydrate reserves and allow the plant to persist through seasonal variation.",
      gameplayInsight: "Small amounts cause mouth burning but are survivable. Deeper rhizomes below ground have lower oxalate concentrations and higher starch, but require excavation. Do not eat in bulk.",
      scienceNote: "Araceae have an extensive Eocene fossil record. Aroid pollen and leaf impressions are abundant in Eocene tropical and subtropical deposits globally. Calcium oxalate raphide production is found in virtually all genera and is ancient within the family."
    }
  },

  gingerRhizomes: {
    kind: "forage", name: "ginger rhizomes", icon: "🌱", className: "food",
    canInvestigate: true, portions: 2, energy: 14, hydration: 2,
    poison: null,
    seen: "Thick aromatic rhizomes push through the soil surface near a stand of broad-leaved herbs.",
    investigationDetails: [
      "The scent when the rhizome is exposed is sharp and spicy — unmistakable ginger-family chemistry.",
      "The tissue is dense and starchy with fibrous sheaths. It takes effort but gives solid nutrition.",
      "Recent excavation marks in the soil suggest this is a known food source to local animals."
    ],
    investigated: "Ginger-family rhizomes. Nutritious starchy tissue, no toxicity. Requires ground-level excavation.",
    naturalHistory: {
      title: "Ginger rhizomes (Zingiberaceae)",
      fieldNote: "Zingiberaceae rhizomes are carbohydrate-dense storage organs. Gingerol and related phenolic compounds produce the characteristic pungency and carry mild antimicrobial properties that reduce gut pathogen load.",
      behaviour: "Rhizomes grow horizontally through the top layer of forest soil and are detectable by the spicy scent released when surrounding leaf litter is disturbed. Aerial shoots indicate rhizome presence below.",
      ecology: "A major component of Eocene tropical understorey vegetation, Zingiberaceae provide ground-level food resources accessible to small mammals through excavation. The rhizome's carbohydrate stores are reliable and independent of fruiting cycles.",
      gameplayInsight: "Accessible at the ground layer in shaded areas. Excavation requires time but the nutritional return is reliable. The spicy scent briefly masks your own odour while you feed.",
      scienceNote: "Zingiberaceae have an Eocene fossil record confirmed from pollen and rhizome remains in Asian and African deposits. Molecular clock estimates place the family's origin in the Cretaceous, with major diversification in the Eocene as tropical forests expanded. Gingerol-related phenolics are biosynthetically ancient within the order Zingiberales."
    }
  },

  treeFernFiddleheads: {
    kind: "forage", name: "tree fern fiddleheads", icon: "🌾", className: "food",
    canInvestigate: true, portions: 2, energy: 8, hydration: 1,
    poison: null,
    seen: "Tightly coiled frond tips emerge from the crown of a tree fern, pale and densely wound.",
    investigationDetails: [
      "The fiddleheads are compact and firm — the most energy-rich part of the fern at this stage.",
      "They uncurl quickly once detached, revealing soft inner tissue beneath light scales.",
      "Insects probe the base of the tightly wound fronds — a reliable indicator of palatability."
    ],
    investigated: "Tree fern fiddleheads. Edible at the young coiled stage before full frond expansion.",
    naturalHistory: {
      title: "Tree fern fiddleheads (Cyatheaceae)",
      fieldNote: "The crozier or fiddlehead is the emerging frond of a fern, tightly coiled to protect the growing tissue inside. At this stage the tissue is high in carbohydrates and relatively soft compared to the mature frond, which becomes heavily lignified.",
      behaviour: "Fiddleheads emerge from the crown in cohorts after sufficient rainfall. Each fiddlehead unfurls within two to four days — the edible window is narrow. The crown position on tree ferns requires climbing to reach.",
      ecology: "Tree ferns were a dominant feature of Eocene forest understorey and margins. As non-flowering plants, they represent a nutritional resource completely outside the angiosperm fruiting system — available even when fruit is absent.",
      gameplayInsight: "Available in a narrow window before full frond expansion. The crown position requires vertical access. Insects concentrated at the crown are a secondary food bonus when fiddleheads are present.",
      scienceNote: "Cyatheaceae are confirmed from Eocene fossil deposits across multiple continents. Tree fern trunks are found in Eocene coal and lignite deposits. The family was more globally widespread in the Eocene warm climate than today. Cyatheaceous spores are abundant in Eocene palynological assemblages."
    }
  },

  waterLilySeedPods: {
    kind: "forage", name: "water lily seed pods", icon: "🪷", className: "food",
    canInvestigate: true, portions: 3, energy: 8, hydration: 8,
    poison: {severity: "mild", rank: 1, toxinType: "alkaloid", lethal: false, turns: 3, damage: 2, warning: "Nymphaea alkaloids cause mild nausea if consumed in excess."},
    seen: "Round green seed pods bob at the edge of still water among broad floating leaves.",
    investigationDetails: [
      "The pods are accessible from the bank edge without entering the water.",
      "Inside: dense rows of small seeds in a spongy matrix — starchy and mildly sweet.",
      "Safe in moderate portions. Overconsumption brings on uncomfortable nausea from trace alkaloids."
    ],
    investigated: "Water lily seed pods. Nutritious and hydrating in moderate amounts — overconsumption causes nausea.",
    naturalHistory: {
      title: "Water lily seed pods (Nymphaeaceae)",
      fieldNote: "Nymphaea seeds are enclosed in a spongy aril that keeps them buoyant for water dispersal. The seed matrix is starchy and mildly nutritious. Trace alkaloids in the seed coat are present across Nymphaeaceae and become mildly toxic at high doses.",
      behaviour: "Pods form from the floating flower after beetle or fly pollination and ripen over several weeks, eventually releasing seeds that drift to new colonisation sites. Green pods at the bank edge are the most accessible stage.",
      ecology: "Nymphaeaceae are among the most basal flowering plant lineages. In Eocene lake and slow-river environments, water lily beds were important structural features supporting invertebrates, fish, and amphibians.",
      gameplayInsight: "Accessible from the bank without full water entry. The hydration return is significant — a useful resource at the water margin. Collect in moderation; overconsumption is unpleasant rather than dangerous.",
      scienceNote: "Nymphaeaceae have among the richest Eocene fossil records of any aquatic plant family. Nymphaea-type pollen is abundant in Eocene lake sediments globally, and fossil Nymphaea leaves and seeds are known from Eocene deposits in Europe, North America, and Asia. The family's early divergence from other angiosperms is confirmed by molecular phylogenetics, placing the split in the Cretaceous."
    }
  },

  // small water sources
  rainPuddle: {
    kind: "forage", name: "small rain puddle", icon: "💧", className: "food",
    canInvestigate: true, portions: 1, energy: 0, hydration: 30,
    poison: null,
    seen: "A shallow rain puddle has collected in a leaf-lined hollow.",
    investigated: "It is only a small amount of water, but it looks reachable without entering open water.",
    naturalHistory: {
      title: "Small rain puddle",
      fieldNote: "A temporary puddle in the forest floor concentrates surface runoff along micro-topographic gradients, accumulating leaf tannins, soil bacteria, and invertebrate activity in a chemically complex standing water body.",
      behaviour: "Stationary, temporary water resource. Surface film develops within hours of formation \u2014 invertebrates colonise quickly and the water quality changes as organic load increases.",
      ecology: "A temporary breeding habitat for mosquitoes and other standing-water invertebrates. Its chemical content reflects the surface materials it has drained from \u2014 variable and locally specific.",
      gameplayInsight: "Hydration value is real but contamination risk is non-trivial. Consume only when no clean water alternative exists, and in small amounts.",
      scienceNote: "Phytotelmata (small water bodies in plant structures) and ground puddles are important microhabitats in tropical forest ecology. Mosquito Eocene fossil records from Baltic amber confirm standing-water breeding behaviour was established in this period."
    }
  },

  freshwaterMussels: {
    kind: "forage", name: "freshwater mussels", icon: "🦪", className: "food",
    canInvestigate: true, portions: 1, energy: 10, hydration: 2,
    poison: null,
    seen: "Small freshwater mussels sit half-buried in the shallows near the muddy bank.",
    investigationDetails: [
      "The shells are fixed in soft sediment where the water is shallow enough to reach.",
      "They will not flee, but taking them means lingering at the water edge.",
      "This is modest food, not a feast — a useful reward for risking the shallows."
    ],
    investigated: "The shells are reachable from the bank. Slow food, but real food.",
    naturalHistory: {
      title: "Freshwater mussels",
      fieldNote: "Freshwater mussels are among the most endangered animal groups today \u2014 a measure of how specialised their dispersal mechanisms are, relying on specific fish hosts for larval stage parasitism.",
      behaviour: "Stationary filter feeders partially buried in stream substrate, siphoning particulates from passing water. Visible as dark shells partially exposed at the water margin.",
      ecology: "Filter feeders that clarify stream water and concentrate nutrients from the water column into accessible bivalve tissue. Their beds stabilise stream margins and provide complex habitat structure.",
      gameplayInsight: "Sessile and predictable \u2014 return to the same location across multiple visits. Require water margin access with associated predator exposure risk.",
      scienceNote: "Unionidae (freshwater mussels) have an extensive Eocene fossil record. Their larval glochidium stage \u2014 a specialised fish-parasitising juvenile \u2014 was already established by the Eocene, and fish-mussel host specificity is inferred from co-occurrence patterns in fossil assemblages."
    }
  },

  freshwaterCrayfish: {
    kind: "animal", name: "freshwater crayfish", icon: "🦞", className: "food",
    dangerProfile: "minor", temperament: "defensive", canInvestigate: true,
    fitness: 30, size: 1.5, speed: 25, agility: 35, aggression: 30, food: 12,
    poison: null,
    seen: "A small crayfish backs through the river shallows, claws raised over the stones.",
    investigationDetails: [
      "It is visible only because the water is shallow and close to the bank.",
      "The claws are a nuisance rather than a mortal threat, but it can vanish under stones.",
      "Worth catching if you can do it quickly before deeper water becomes the problem."
    ],
    investigated: "Edible, defensive, and likely to retreat under stones if handled badly.",
    naturalHistory: {
      title: "Freshwater crayfish",
      fieldNote: "Freshwater crayfish are both predators and detritivores \u2014 ecosystem engineers that excavate burrows, turn substrate, and process organic material at a scale that shapes stream and bank microhabitats.",
      behaviour: "Moves in shallow water and along water margins, scavenging and hunting with chelae. Retreats backwards rapidly into cover when threatened, moving fast in reverse.",
      ecology: "An omnivore bridging aquatic and terrestrial food webs at stream margins. Its burrowing creates microhabitats used by other invertebrates and small vertebrates.",
      gameplayInsight: "Catchable in shallow water with speed. High protein return justifies brief water margin exposure \u2014 but always check for crocodilian stillness at the surface before approaching.",
      scienceNote: "Freshwater crayfish (Astacidea) have a Mesozoic fossil record and were widespread by the Eocene. Eocene specimens from multiple continents show the full modern body plan. Some fossil burrow structures attributed to crayfish are preserved in Eocene sediments."
    }
  },

  // nests and carcasses
  clayDeposit: {
    kind: "remedy", name: "clay bank", icon: "🟫", className: "food",
    canInvestigate: true, portions: 3, energy: 0,
    remedy: {type: "clay", cures: ["plant", "fungal", "alkaloid", "irritant"]},
    poison: null,
    seen: "A patch of exposed clay sits at the damp bank, cool and mineral-rich.",
    investigated: "The clay is not food, but it may bind some toxins and settle a poisoned gut.",
    naturalHistory: {
      title: "Clay bank",
      fieldNote: "Geophagy \u2014 deliberate consumption of mineral clay \u2014 is documented across dozens of primate species and provides adsorption capacity for dietary alkaloids and tannins, functioning as a natural detoxification aid.",
      behaviour: "Stationary resource. Clay deposits on cut banks, stream margins, or exposed geological features. Visible use by other animals \u2014 fresh scrape marks and tracks \u2014 indicates an active mineral lick.",
      ecology: "A mineral resource hub attracting multiple species that share exposure to the same dietary toxins. Mineral lick sites become predictable congregation points, creating both social encounters and predation vulnerability.",
      gameplayInsight: "Consume after eating chemically defended or uncertain plant material. Clay adsorbs alkaloids in the gut before absorption. Fresh animal tracks indicate current safety and high mineral quality.",
      scienceNote: "Geophagy in primates is extensively documented and the detoxification function has been confirmed by measuring reduced bioavailability of plant alkaloids in the presence of clay minerals. Eocene primate geophagy is inferred from the presence of kaolin clay deposits co-located with primate fossil sites, though direct fossil evidence is limited."
    }
  },

  mantis: {
    kind: "animal", name: "large mantis", icon: "🪲", className: "food",
    dangerProfile: "minor", temperament: "defensive", canInvestigate: true,
    fitness: 35, size: 1.5, speed: 35, agility: 65, aggression: 45, food: 8,
    poison: null,
    seen: "A mantis waits motionless on a stem, forelegs folded like a trap.",
    investigated: "Its danger is speed and grasping limbs, not poison.",
    naturalHistory: {
      title: "Large mantis",
      fieldNote: "The mantis raptorial foreleg strike is one of the fastest movements in the animal kingdom \u2014 completion in under 30 milliseconds, faster than most nervous system response times of prey.",
      behaviour: "Sits motionless in a cryptic posture among vegetation, head tracking prey movement with independent eye rotation. Strikes without any perceptible preparation phase.",
      ecology: "An ambush predator of arthropods and small vertebrates in the mid-canopy and shrub layer. It sits at the top of the invertebrate predator hierarchy within its microhabitat.",
      gameplayInsight: "Large mantids can strike at small vertebrates \u2014 at minimal size the player is within range. Treat it as a minor threat rather than a food opportunity.",
      scienceNote: "Mantodea appear in the Cretaceous. Eocene mantids are known from Baltic amber and Messel, preserving the full raptorial foreleg structure. The independent binocular vision system for depth-perception prey targeting was already present in Eocene specimens."
    }
  },

  dragonfly: {
    kind: "animal", name: "large dragonfly", icon: "🪽", className: "food",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 30, size: 1.5, speed: 80, agility: 80, aggression: 5, food: 7,
    poison: null,
    seen: "A dragonfly darts through damp light, vanishing and returning in sudden angles.",
    investigated: "Fast, alert, and hard to catch. A reward for timing rather than strength.",
    naturalHistory: {
      title: "Large dragonfly",
      fieldNote: "Dragonflies are the most efficient aerial predators measured by interception success rate \u2014 studies of modern species show capture rates above 95%, rivalling any animal on Earth.",
      behaviour: "Patrols fixed aerial territories over water and forest edge, hovering briefly before launching interceptions. Returns to the same perch point between hunts.",
      ecology: "An apex predator of flying insects, controlling mosquito, midge, and small butterfly populations near water. Its presence indicates healthy aquatic insect emergence nearby.",
      gameplayInsight: "Harmless to the player. Its flight activity near water indicates insect abundance \u2014 and therefore insectivore predator activity \u2014 in the same area.",
      scienceNote: "Odonata are among the oldest winged insects, with a body plan largely unchanged since the Carboniferous. Eocene dragonflies from Messel and Green River deposits are fully modern in wing venation and compound eye structure."
    }
  },

  eagle: {
    kind: "animal", name: "large eagle", icon: "🦅", className: "predator",
    dangerProfile: "predator", temperament: "hunter", pursuitType: "air", canInvestigate: true,
    fitness: 95, size: 28, speed: 85, agility: 70, aggression: 75, food: 80,
    poison: null,
    seen: "A broad-winged raptor turns on warm air, searching for the smallest mistake below.",
    investigated: "An aerial hunter using height and sun position. Dense overhead cover is your only defence. Open canopy gaps are targeting windows — cross them fast or avoid them.",
    naturalHistory: {
      title: "Large eagle",
      fieldNote: "A large aerial raptor operating above the canopy sees the forest surface as a mosaic of movement \u2014 any gap in cover is a targeting window.",
      behaviour: "Soars on thermals high above the canopy, banking slowly. Stoops with folded wings at high speed when a target is acquired. Attack approaches from the direction of the sun.",
      ecology: "An apex predator of the upper canopy and forest edge, targeting medium-sized arboreal mammals and large birds. Its presence shapes movement behaviour across multiple prey species.",
      gameplayInsight: "Dense cover overhead is your primary defence. Open canopy gaps expose you to strike \u2014 cross them quickly or avoid them entirely.",
      scienceNote: "Large diurnal raptors (Accipitridae) were present in the Eocene, though eagle diversity and size increased through the Oligocene and Miocene. Eocene raptors from Messel include Messelastur and Tynskya, representing early accipitrid and pandionid relatives."
    }
  },

  owl: {
    kind: "animal", name: "forest owl", icon: "🦉", className: "predator",
    dangerProfile: "predator", temperament: "hunter", pursuitType: "air", canInvestigate: true,
    fitness: 80, size: 18, speed: 65, agility: 80, aggression: 65, food: 55,
    poison: null,
    seen: "Pressed against the trunk, an owl holds perfectly still. Only the eyes move, measuring the gaps between leaves.",
    investigated: "A nocturnal ambush hunter holding a daytime roost. It will not pursue far in daylight. At dusk and in darkness, it reads canopy gaps with precision you cannot match.",
    naturalHistory: {
      title: "Forest owl",
      fieldNote: "An owl's facial disc functions as a parabolic sound reflector, channelling sound to asymmetrically positioned ears and enabling three-dimensional sound localisation precise enough to strike in complete darkness.",
      behaviour: "Perches motionless in concealed roost positions during daylight. At night, hunts in near-silence \u2014 flight feathers modified to eliminate aerodynamic noise. Attack arrives without auditory warning.",
      ecology: "A nocturnal apex predator of small mammals, arboreal rodents, and birds. Its activity suppresses nocturnal small mammal behaviour across the area it patrols.",
      gameplayInsight: "Night movement through open canopy is high-risk when owls are active. Sound-masking behaviour \u2014 moving with ambient noise like wind \u2014 reduces detection probability.",
      scienceNote: "Strigiformes (owls) appear in the Paleocene-Eocene boundary. Eocene owls including Palaeoglaux from the Messel show the asymmetric ear placement and wide facial disc of modern species, confirming acoustic hunting was already the owls' primary strategy."
    }
  },

  pakicetus: {
    kind: "animal", name: "Pakicetus-like water hunter", icon: "🐺", className: "predator",
    dangerProfile: "predator", temperament: "hunter", pursuitType: "wateredge", canInvestigate: true,
    fitness: 100, size: 35, speed: 55, agility: 40, aggression: 70, food: 100,
    poison: null,
    seen: "A long-bodied mammal moves along the water edge, more dangerous near the bank than in the branches.",
    investigationDetails: [
      "It watches the bank more than the trees. It is built for the moment when thirsty animals lower their heads.",
      "Its body is not fast in the branches, but at the margin it owns the angle of attack.",
      "The safest answer is distance from the waterline, not a contest beside it."
    ],
    investigated: "A water-edge hunter. It is less dangerous away from the bank, but deadly if you enter its line.",
    knowledgeTierText: [
      "You observe the Pakicetus-like hunter moving along the waterline.",
      "You notice it watches the bank, not the forest — it is waiting for the moment an animal drinks.",
      "You understand its territory is the margin. Distance from water is distance from danger.",
      "You have watched it enough to predict when it will hold position and when it will move.",
      "Full knowledge: the Pakicetus-like water hunter."
    ],
    naturalHistory: {
      title: "Pakicetus-like water hunter",
      fieldNote: "This animal holds an extraordinary place in evolutionary history: it is close to the transition between fully terrestrial mammals and what would eventually become whales. At this stage it is still a land predator, but one with special competence at the water margin.",
      behaviour: "Ambushes at the waterline. It waits for animals drinking or crossing the bank and attacks when their attention is divided. Away from the water's edge it is slower and less threatening.",
      ecology: "A semiaquatic ambush predator. Its ecological role is to control access to water sources, forcing terrestrial animals to approach carefully and briefly. Other predators may compete for its kills.",
      gameplayInsight: "The waterline is the danger zone. Drinking quickly, from a position of cover, with awareness of the bank is the only way to manage this threat. The further from the bank, the safer you are.",
      scienceNote: "Pakicetus was a terrestrial mammal of the early-to-middle Eocene, closely related to early cetacean ancestors. It was not yet aquatic but had features linking it to the whale lineage. Its discovery helped confirm that whales evolved from land-dwelling even-toed ungulates rather than from a separate lineage."
    }
  },

  frog: {
    kind: "animal", name: "small frog", icon: "🐸", className: "food",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 30, size: 1.2, speed: 40, agility: 60, aggression: 1, food: 8,
    poison: null,
    seen: "A small frog sits on a wet leaf, throat pulsing in the humid air.",
    investigated: "It looks like quick, soft-bodied food, without obvious warning colour.",
    naturalHistory: {
      title: "Small frog",
      fieldNote: "Frogs are one of the oldest tetrapod lineages still living, and by the Eocene, ranid and hylid frogs are already present in forms nearly indistinguishable from modern species.",
      behaviour: "Sits motionless near water or moisture, relying on cryptic coloration. Leaps explosively when approached and rarely surfaces in the same location twice.",
      ecology: "A predator of small invertebrates and prey item for snakes, birds, and small mammals. It bridges aquatic and terrestrial food webs as both predator and prey.",
      gameplayInsight: "Fast at close range but catchable with a direct lunge. Worth the effort near water sources where densities are higher.",
      scienceNote: "Modern frog families including Ranidae and Hylidae have Eocene representatives known from fossil sites in Europe and North America. Frog body plan has been essentially stable since the Triassic."
    }
  },

  poisonDartFrog: {
    kind: "animal", name: "bright poison frog", icon: "🐸", className: "threat",
    dangerProfile: "toxic_food", temperament: "skittish", canInvestigate: true,
    fitness: 35, size: 1.2, speed: 35, agility: 55, aggression: 1, food: 8,
    poison: {severity: "deadly", rank: 5, toxinType: "alkaloid", lethal: true, criticalTimer: 5, turns: 6, damage: 10, warning: "Bright warning colour / deadly skin toxin"},
    seen: "A small bright frog sits openly on a leaf, too visible to be careless.",
    investigated: "The colour is the warning. This could be deadly food.",
    naturalHistory: {
      title: "Bright poison frog",
      fieldNote: "Aposematic colouration in poison frogs is an honest signal \u2014 the brightness of the pattern correlates directly with toxin load, and predators that learn from one encounter avoid the entire colour class.",
      behaviour: "Moves slowly and conspicuously through the leaf litter and low vegetation, making no attempt at concealment. The display of toxicity is the defence.",
      ecology: "A predator of small invertebrates, particularly mites and small arthropods that contribute alkaloids to its skin chemistry. Removing poison frogs disrupts toxin cycling in the ecosystem.",
      gameplayInsight: "Do not eat. Skin contact during an attack may transfer toxins. The conspicuous colouration is the warning \u2014 treat it as one.",
      scienceNote: "Dendrobatidae (poison dart frogs) acquire their alkaloid toxins from dietary arthropods, not synthesis. The exact Eocene distribution of the family is uncertain, but aposematic colouration as a defensive strategy in amphibians is documented across deep time in multiple lineages."
    }
  },

  toad: {
    kind: "animal", name: "small toad", icon: "🐸", className: "food",
    dangerProfile: "toxic_food", temperament: "defensive", canInvestigate: true,
    fitness: 40, size: 2, speed: 20, agility: 25, aggression: 5, food: 10,
    poison: {severity: "moderate", rank: 2, toxinType: "irritant", lethal: false, turns: 4, damage: 3, warning: "Bitter skin secretion"},
    seen: "A squat toad sits half-buried in damp leaf litter.",
    investigated: "Slow and tempting, but the skin smell suggests chemical defence.",
    naturalHistory: {
      title: "Small toad",
      fieldNote: "Toad skin secretions are a chemical library \u2014 parotoid glands behind the head produce bufadienolides and other compounds toxic to vertebrates that cause cardiac disruption even at low doses.",
      behaviour: "Moves slowly and deliberately across the ground, making no attempt at concealment or flight. Presses the parotoid glands toward a threat rather than retreating.",
      ecology: "A predator of invertebrates and small prey items in terrestrial and semi-aquatic habitats. Its toxicity removes it from most predator diets, releasing it from the anti-predator behaviours that constrain other similarly-sized animals.",
      gameplayInsight: "Do not eat \u2014 even partial consumption transfers toxin. Recognise the slow, unhurried movement as a toxicity signal and avoid contact.",
      scienceNote: "Bufonidae (true toads) appear in the Eocene fossil record. Parotoid gland structure is preserved in some fossil specimens. Bufadienolide compounds are convergently produced by plants (squill) and toads \u2014 one of the most studied examples of convergent secondary metabolite evolution."
    }
  },

  leptictidium: {
    kind: "animal", name: "Leptictidium-like hopper", icon: "🐭", className: "prey",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 55, size: 4, speed: 75, agility: 70, aggression: 5, food: 20,
    poison: null,
    seen: "A long-legged small mammal bounds through the undergrowth in quick, nervous hops.",
    investigationDetails: [
      "The long hind legs are the key feature. It moves in sudden bounding bursts rather than smooth running.",
      "It pauses between hops to sample the air. Its sensory organs are the real survival tool.",
      "This is bipedal locomotion in a mammal that predates most familiar bipeds by tens of millions of years."
    ],
    investigated: "A bipedal hopper: fast, small, and built for sudden directional changes.",
    knowledgeTierText: [
      "You watch the Leptictidium-like hopper with growing interest.",
      "You notice its pause pattern — a second of stillness between bursts tells you when to move.",
      "You understand that pursuit is nearly useless. It reacts faster than a chase can adapt.",
      "You have studied the hopper's routes and know which cover it uses most.",
      "Full knowledge: the Leptictidium-like hopper."
    ],
    naturalHistory: {
      title: "Leptictidium-like hopper",
      fieldNote: "This small mammal runs on two legs. In the Eocene, that is not a primate behaviour — it is an entirely separate evolutionary experiment in bipedality. The long hind limbs give it a burst speed in the undergrowth that makes most pursuit futile.",
      behaviour: "A nervous, highly mobile forager that samples the air frequently and changes direction unpredictably. It does not fight. It survives by being harder to catch than it looks.",
      ecology: "A ground-level insectivore and small animal predator. It lives in the same habitat zones as many of your other encounters but occupies a fast-moving niche that few predators can exploit efficiently.",
      gameplayInsight: "Difficult to catch even when healthy. Better to wait for it to return to a known feeding spot than to pursue it directly. Good food if you can manage the ambush.",
      scienceNote: "Leptictidium was an Eocene leptictidan found in the Messel fossil beds of Germany. It was genuinely bipedal, with long hind limbs and a long balancing tail. Its ecological role and diet remain partly debated — it may have been omnivorous, eating insects, lizards, and plant matter."
    }
  },

  gastornis: {
    kind: "animal", name: "Gastornis", icon: "🐦", className: "threat",
    dangerProfile: "fatal", temperament: "dominant", pursuitType: "ground", canInvestigate: true,
    fitness: 100, size: 55, speed: 45, agility: 25, aggression: 55, food: 160,
    poison: null,
    seen: "A huge flightless bird steps between the trees, heavy beak lowering toward the forest floor.",
    cardDetail: "Each step is heavy and deliberate. On open ground, hesitation is what this bird is waiting for.",
    investigationDetails: [
      "It is not stalking delicately; it does not need to. On the ground, its reach and mass make the rules simple.",
      "The beak turns side to side as it searches the leaf litter. Small animals survive this by not being on the floor when it arrives.",
      "The huge bird is not unbeatable in the abstract. For you, here, now, it is the wrong scale of problem."
    ],
    investigated: "Too large to fight and too dangerous to test on the ground. Climb, hide, or leave.",
    knowledgeTierText: [
      "You watch Gastornis from the branches with careful attention.",
      "You recognise how it searches: beak sweeping the litter, not looking up.",
      "You understand its weakness — it cannot climb, and open forest floor is where it wins.",
      "You have observed Gastornis enough to time its movements and judge its attention.",
      "Full knowledge: Gastornis."
    ],
    naturalHistory: {
      title: "Gastornis",
      fieldNote: "Gastornis is not hunting the way a mammal carnivore hunts. It is a dominant, territorial ground animal that controls space by mass and presence. On the forest floor, smaller animals reorganise their behaviour around it.",
      behaviour: "Territorial and ground-dominant. It does not pursue vertically. Its threat is the floor itself: the animal reshapes which routes smaller animals will risk.",
      ecology: "A megafaunal bird of the Eocene forests, found across Europe and North America. It may have been primarily herbivorous, using its beak to crack hard seeds and nuts rather than to catch prey, though its size and presence alone made it dangerous.",
      gameplayInsight: "Stay off the ground when it is present. It cannot follow you into the branches. The danger window is crossing open ground or descending while it is nearby.",
      scienceNote: "Gastornis (formerly often called Diatryma) was a large flightless bird standing nearly two metres tall. Long thought to be a carnivore, recent isotope analysis suggests it was likely herbivorous, feeding on tough vegetation and seeds. It was one of the dominant large animals of the early Eocene before placental mammals expanded into its ecological role."
    }
  },

  nuts: {
    kind: "forage", name: "fallen nuts", icon: "🌰", className: "food",
    canInvestigate: true, portions: 3, energy: 12,
    poison: null,
    seen: "Hard fallen nuts lie among the leaf litter.",
    investigated: "Dense, safe-looking food, if you can crack and handle it.",
    naturalHistory: {
      title: "Fallen nuts",
      fieldNote: "Hard-shelled seeds represent a plant investment in endosperm that exceeds most fleshy fruits \u2014 the nutritional density is correspondingly high, and the shell creates a time-cost barrier that filters which animals can exploit it.",
      behaviour: "Stationary resource on the ground. Nuts accumulate under parent trees in seasonal synchrony. Squirrel-analogue mammals cache them in predictable scatter-hoarding patterns.",
      ecology: "A calorie-dense seed type driving the evolution of specialised hard-food processing dentition in rodents, primates, and corvids. Nut crops structure the activity of the entire small mammal community.",
      gameplayInsight: "High caloric return but shell cracking requires appropriate substrate. Carry to a hard bark surface or rock and use impact rather than bite force to process.",
      scienceNote: "Hard-shelled nuts appear in Eocene fossil floras across multiple families including Juglandaceae (walnut relatives) and Fagaceae (oak relatives). London Clay flora preserves nuts of both families. The evolution of hardened shells is considered a co-evolutionary response to rodent and primate dental processing."
    }
  },

  waspNest: {
    kind: "nest", name: "wasp nest", icon: "🐝", className: "threat",
    canInvestigate: true, eggs: 3, energy: 14,
    poison: {severity: "moderate", rank: 2, toxinType: "venom", lethal: false, turns: 4, damage: 4, warning: "Defensive stings"},
    seen: "A papery wasp nest hangs beneath a sheltered branch, alive with movement.",
    investigated: "Rich larvae may be inside, but disturbing it invites stings.",
    naturalHistory: {
      title: "Wasp nest",
      fieldNote: "Social wasp paper nests are engineered structures \u2014 workers chew wood fibres, process them with saliva, and apply them in precise layers to create a structure with thermal insulation and mechanical strength properties.",
      behaviour: "Guard wasps patrol aggressively near the nest entrance. Vibration anywhere on the nest structure mobilises defenders. Alarm pheromone release by the first defending wasp accelerates recruitment dramatically.",
      ecology: "A predator colony targeting caterpillars and soft-bodied arthropods to provision larvae. Wasp colonies are effective pest-control agents from the plant's perspective, removing folivores from a wide territorial radius.",
      gameplayInsight: "Larval chambers contain high-fat larvae before wax capping. Night approach reduces guard activity significantly \u2014 wasp temperature sensitivity means night raids face fewer defenders.",
      scienceNote: "Social wasp nest structure is preserved in Eocene amber inclusions. Paper nest material \u2014 wood-fibre-based \u2014 rarely fossilises, but wasp worker and soldier specimens from Baltic amber preserve the mandibular structure used for wood processing. Colony size estimates from worker-to-queen ratios in amber suggest Eocene colonies were similar in scale to modern temperate species."
    }
  },

  beehive: {
    kind: "nest", name: "beehive", icon: "🐝", className: "food",
    canInvestigate: true, eggs: 4, energy: 16,
    poison: {severity: "mild", rank: 1, toxinType: "venom", lethal: false, turns: 3, damage: 2, warning: "Sting risk"},
    seen: "A small wild beehive hums in a hollow, sweet smell leaking from wax.",
    investigated: "High reward, but each disturbance risks a defensive swarm.",
    naturalHistory: {
      title: "Beehive",
      fieldNote: "A honeybee hive at maximum summer colony size contains over 60,000 individuals capable of collective defensive action \u2014 the stored honey inside represents months of foraging effort converted into winter energy reserve.",
      behaviour: "Guard bees patrol the hive entrance and respond to vibration, carbon dioxide from breath, and dark moving shapes near the entrance. Alarm pheromone mobilises additional defenders within seconds.",
      ecology: "A pollinator colony with a foraging radius of several kilometres, connecting flowering plants across a wide landscape through a single resource hub. Honey is consumed by bears, primates, and other large mammals willing to accept stings.",
      gameplayInsight: "Smoke disrupts alarm pheromone communication \u2014 fire-adjacent beehive access is viable if fire is available. Without disruption, rapid extraction and immediate retreat is the only viable strategy.",
      scienceNote: "Apis (honeybees) appear in the Eocene fossil record. Eocene bee specimens from Baltic amber include workers with pollen loads on their corbiculae \u2014 confirming foraging behaviour and hive provisioning was established. Honey storage as winter energy reserve is inferred from hive architecture preserved in trace fossils."
    }
  },

  crocodile: {
    kind: "animal", name: "crocodile", icon: "🐊", className: "predator",
    dangerProfile: "fatal", temperament: "ambush", pursuitType: "wateredge", canInvestigate: true,
    fitness: 100, size: 60, speed: 45, agility: 25, aggression: 85, food: 180,
    poison: null,
    seen: "Only eyes and ridged back break the waterline. The bank itself feels dangerous.",
    investigated: "Everything dangerous about it is within a body-length of the bank. The strike begins before you can react. Distance from the water is the only reliable defence — drink quickly, from cover, and leave.",
    naturalHistory: {
      title: "Crocodile",
      fieldNote: "Eocene crocodilians are already highly derived ambush predators, and the water's edge is their domain \u2014 an invisible kill zone extending several body lengths from the bank.",
      behaviour: "Floats motionless at the surface, indistinguishable from a log. Eyes and nostrils barely break the water line. Explosion of movement has almost no warning phase.",
      ecology: "An apex predator of freshwater margins, controlling the access point between forest and water. Carcasses it abandons feed scavengers across the food web.",
      gameplayInsight: "Never approach water margin at ground level without scanning for stillness at the surface. Speed is irrelevant once the ambush begins.",
      scienceNote: "Multiple crocodilian lineages coexisted in the Eocene, including dyrosaurids, tomistomines, and alligatoroids. Messel preserves Asiatosuchus and Diplocynodon, both fully modern in body plan. Eocene crocodilians occupied salt and freshwater environments."
    }
  },

  turtle: {
    kind: "animal", name: "small turtle", icon: "🐢", className: "food",
    dangerProfile: "minor", temperament: "defensive", canInvestigate: true,
    fitness: 80, size: 8, speed: 10, agility: 10, aggression: 5, food: 22,
    poison: null,
    seen: "A small turtle rests near damp ground, withdrawing behind a hard shell.",
    investigated: "Slow, armoured, and hard to open. Not dangerous, but not easy food.",
    naturalHistory: {
      title: "Small turtle",
      fieldNote: "The turtle shell is a modified ribcage and shoulder girdle \u2014 an evolutionary restructuring of the thorax so profound that turtle development involves moving the shoulder blades inside the ribcage, unique among all vertebrates.",
      behaviour: "Moves slowly through leaf litter and along water margins, foraging for plant material and invertebrates. Withdraws completely into its shell when threatened and waits motionless.",
      ecology: "An omnivore of forest floor and water margin habitats. Shell-withdrawn turtles are effectively invulnerable to all predators except large crushing specialists.",
      gameplayInsight: "Catchable when moving \u2014 the shell withdrawal eliminates attack options. Carry and relocate if you cannot process it immediately.",
      scienceNote: "Testudines (turtles) appear in the Triassic. Messel preserves several turtle species including Allaeochelys, with soft tissue outlines preserved. Some Messel turtles show evidence of death during mating \u2014 a famously documented case of preservation coinciding with reproductive behaviour."
    }
  },

  eurotamandua: {
    kind: "animal", name: "Eurotamandua-like anteater", icon: "🦥", className: "prey",
    dangerProfile: "claw", temperament: "defensive", canInvestigate: true,
    fitness: 80, size: 20, speed: 30, agility: 25, aggression: 30, food: 65,
    poison: null,
    seen: "A strange long-snouted climber tears at rotting wood, searching for insects.",
    investigated: "Occupied with its own work. The foreclaws are defensive, not aggressive — it will only commit if cornered. Give it space and move on.",
    naturalHistory: {
      title: "Eurotamandua-like anteater",
      fieldNote: "Eurotamandua is the unexpected anteater of the European Eocene \u2014 a fully specialised myrmecophage whose presence raises unresolved biogeographic questions about continental connections and dispersal.",
      behaviour: "Excavates rotting wood and soft earth with strong foreclaws, inserting its long, sticky tongue into galleries. Ignores most disturbances while feeding.",
      ecology: "A specialist predator of ants and termites, consuming enormous numbers of individuals per feeding bout. Its excavation work exposes interior colony resources.",
      gameplayInsight: "Its feeding activity opens ant and termite resources \u2014 approach after it moves on to exploit the opened nests.",
      scienceNote: "Eurotamandua joresi is known from the Messel Pit and was long debated as a xenarthran (related to South American anteaters). Current consensus places it closer to pangolins or in an uncertain position \u2014 its precise phylogenetic placement remains contested."
    }
  },

  woodGrub: {
    kind: "forage", name: "wood grub", icon: "🪱", className: "food",
    canInvestigate: true, portions: 1, energy: 12,
    poison: null,
    seen: "A pale wood grub curls in a torn pocket of rotten bark.",
    investigated: "Soft, rich, and vulnerable. Good food if the wood can be opened.",
    naturalHistory: {
      title: "Wood grub",
      fieldNote: "Wood-boring beetle larvae are one of the highest-fat invertebrate food sources available in the forest \u2014 their lipid content exceeds most surface insects because fat is the primary energy reserve for a sessile organism in cold, energy-poor substrate.",
      behaviour: "Stationary in excavated galleries within dead wood. Detectable from the exterior by frass accumulation at gallery entrances and distinct hollow tapping resonance when wood is struck.",
      ecology: "A primary decomposer of dead wood, breaking cellulose and lignin with assistance from gut microbiota. Grub galleries initiate the decomposition sequence that eventually returns woody biomass to the soil.",
      gameplayInsight: "Located by tapping dead wood and listening for hollow resonance. High fat yield per grub makes excavation time worthwhile. Dead wood at advanced decay stages yields higher grub density.",
      scienceNote: "Wood-boring beetle larvae (Cerambycidae, Buprestidae, and others) are known from Eocene amber and compression fossils. Larval feeding galleries are preserved in Eocene fossil wood. The cellulose-digesting gut microbiome of wood-boring larvae is now studied for biofuel enzyme research."
    }
  },

  monitorLizard: {
    kind: "animal", name: "monitor lizard", icon: "🦎", className: "threat",
    dangerProfile: "predator", temperament: "hunter", pursuitType: "climber", canInvestigate: true,
    fitness: 90, size: 22, speed: 55, agility: 55, aggression: 65, food: 70,
    poison: null,
    seen: "A monitor lizard moves with slow confidence, its tongue testing the damp air ahead of it.",
    investigated: "An active forager that follows scent and pursues. It can climb. Elevation reduces but does not remove the threat — reach the upper canopy before it commits to a pursuit.",
    naturalHistory: {
      title: "Monitor lizard",
      fieldNote: "Monitor lizards are the most cognitively complex lizards \u2014 demonstrated to count, solve multi-step problems, and coordinate group behaviours \u2014 and their large size makes them dangerous generalist predators.",
      behaviour: "Patrols actively with a head-raised, forked-tongue-tasting posture. Investigates every scent trail thoroughly. Will pursue prey for sustained distances rather than relying on ambush.",
      ecology: "A top predator of the forest floor and lower canopy, consuming eggs, carcasses, invertebrates, and vertebrates up to substantial size. Active pursuit rather than ambush makes it unpredictable.",
      gameplayInsight: "It can climb low branches \u2014 elevation alone is insufficient. Reach high canopy before it commits to a pursuit.",
      scienceNote: "Varanidae appear in the Cretaceous with a centre of origin in Asia. Eocene monitors are known from European fossil sites, including forms related to the giant Megalania lineage. Modern monitors retain a largely unchanged Eocene body plan."
    }
  },

  iguana: {
    kind: "animal", name: "large iguana", icon: "🦎", className: "prey",
    dangerProfile: "tail", temperament: "defensive", canInvestigate: true,
    fitness: 70, size: 12, speed: 35, agility: 35, aggression: 15, food: 40,
    poison: null,
    seen: "A broad-bodied lizard grips the branch, watching you with a sideways eye.",
    investigated: "Large, edible, and not helpless. It could thrash or bite if mishandled.",
    naturalHistory: {
      title: "Large iguana",
      fieldNote: "Large iguanid lizards are among the few primarily herbivorous lizards, a dietary specialisation that requires a long, fermentative gut and careful plant species selection to avoid toxins.",
      behaviour: "Basking on exposed branches for long periods, moving only when temperature regulation demands or when directly threatened. Defensive tail-whip is fast and forceful.",
      ecology: "A herbivore of the upper canopy and sun-exposed edges, consuming leaves, flowers, and fruit. Its size and defensive capability reduce predation pressure to large raptors and carnivorans.",
      gameplayInsight: "The tail-whip has real range \u2014 do not approach from the side without accounting for it. Approach from directly above or below.",
      scienceNote: "Iguanidae have a complex Eocene biogeographic history, with representatives on both sides of the Atlantic during the early Eocene when continental positions allowed dispersal. Fossil iguanids are known from European Eocene deposits, raising unresolved dispersal questions."
    }
  },

  fruitBat: {
    kind: "animal", name: "fruit bat", icon: "🦇", className: "prey",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 45, size: 4, speed: 60, agility: 75, aggression: 5, food: 18,
    poison: null,
    seen: "A fruit bat shifts under a branch, wings wrapping and unwrapping around its body.",
    investigated: "Roosts in daytime, feeds on fruit at night. Follow its activity at dusk to locate productive fruiting trees. Too fast and fragile to be worth pursuing.",
    naturalHistory: {
      title: "Fruit bat",
      fieldNote: "Fruit bats are keystone dispersers \u2014 they move seeds across distances no terrestrial animal matches, and their night-time foraging reveals which fruiting trees are currently productive.",
      behaviour: "Emerges at dusk, flying direct routes between known fruiting trees. Hangs inverted to feed, producing audible chewing and dropping half-eaten fruit to the ground below.",
      ecology: "A nocturnal frugivore and pollinator linking isolated tree patches through seed dispersal. Its activity concentrates fallen fruit resources below roost trees at night.",
      gameplayInsight: "Follow active bat feeding noise to locate fruiting trees in low-light conditions \u2014 fallen fruit accumulates directly below roosting points.",
      scienceNote: "Chiroptera (bats) appear in the fossil record by the early Eocene, with Onychonycteris and Icaronycteris from the Green River Formation already showing fully developed wings. Fruit-eating bats (Pteropodidae) appear later, but Eocene bats were already ecologically diverse."
    }
  },

  masillaraptor: {
    kind: "animal", name: "Masillaraptor-like raptor", icon: "🦅", className: "predator",
    dangerProfile: "predator", temperament: "hunter", pursuitType: "air", canInvestigate: true,
    fitness: 85, size: 14, speed: 75, agility: 80, aggression: 70, food: 45,
    poison: null,
    seen: "A small raptor threads between trees, fast enough to make open branches feel unsafe.",
    investigated: "A canopy pursuit hunter working the same vertical space you occupy. It closes gaps by threading through foliage, not stooping from height. Dense cover disrupts its angle — move into the thickest available screen.",
    naturalHistory: {
      title: "Masillaraptor-like raptor",
      fieldNote: "A raptor of the closed canopy hunts very differently from an open-sky eagle \u2014 short wings, long tail, and fast horizontal acceleration through branches rather than power-dive from height.",
      behaviour: "Moves through canopy at speed with rapid direction changes, hunting by visual tracking through foliage gaps. Strikes from a lateral approach rather than a stoop.",
      ecology: "An apex predator of the mid-to-upper canopy targeting arboreal mammals and birds. Its presence restricts small arboreal mammal movement to denser cover.",
      gameplayInsight: "Dense foliage disrupts its hunting approach \u2014 move into the thickest available cover rather than attempting to outrun it in open canopy.",
      scienceNote: "Masillaraptor parvunguis is known from the Messel Pit and represents an early accipitrid or close relative. Its proportions suggest a woodland-adapted pursuit predator rather than an open-country soarer \u2014 convergent with modern goshawks."
    }
  },

  eomanis: {
    kind: "animal", name: "Eomanis-like pangolin", icon: "🦔", className: "prey",
    dangerProfile: "minor", temperament: "defensive", canInvestigate: true,
    fitness: 80, size: 10, speed: 20, agility: 15, aggression: 5, food: 28,
    poison: null,
    seen: "A scaly insect-eater noses through rotten wood, armour overlapping like leaves.",
    investigated: "Armoured and slow. It is not an easy meal, but it is not hunting you.",
    naturalHistory: {
      title: "Eomanis-like pangolin",
      fieldNote: "The pangolin body plan \u2014 an anteater wrapped in overlapping keratin scales \u2014 evolved independently from all other armoured mammals, making Eomanis one of the earliest experiments in this unique defence.",
      behaviour: "Excavates ant and termite mounds with powerful foreclaws, sweeping its long tongue through galleries. Rolls into a tight, scale-armoured ball when threatened.",
      ecology: "A specialised insectivore controlling ant and termite colonies. Its digging opens mounds for secondary exploitation by other insectivores.",
      gameplayInsight: "Follow Eomanis to locate ant and termite nest resources \u2014 its excavation work makes interior protein accessible without triggering the full defensive response.",
      scienceNote: "Eomanis waldi is known from the Messel Pit, Germany \u2014 one of the earliest definitive pangolins. Its scales were preserved as a distinct pattern in the Messel oil shale, confirming the full pangolin body plan was established by the mid-Eocene."
    }
  },

  ramphastos: {
    kind: "animal", name: "large toucan-like bird", icon: "🐦", className: "prey",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 55, size: 6, speed: 55, agility: 60, aggression: 10, food: 22,
    poison: null,
    seen: "A large-billed fruit bird hops between branches, bright beak cutting through the green.",
    investigated: "A frugivore that marks productive canopy fruit trees by its presence and calls. Not easy to catch, but a reliable signal to follow.",
    naturalHistory: {
      title: "Large toucan-like bird",
      fieldNote: "The toucan's large beak is structurally a thermoregulation device as much as a feeding tool \u2014 a network of blood vessels in the beak surface allows rapid heat exchange, cooling the bird in tropical forest heat.",
      behaviour: "Moves through the upper canopy in small groups, plucking fruit with the tip of its beak and tossing it back to swallow. Vocal and conspicuous \u2014 not a subtle forager.",
      ecology: "A frugivore and seed disperser of large-seeded fruits that few other birds can process. Its beak width allows consumption of fruits too large for other avian frugivores.",
      gameplayInsight: "Its conspicuous presence marks fruiting trees reliably \u2014 locate it by its calls and follow to the food source before it strips the available fruit.",
      scienceNote: "Ramphastidae are a neotropical family with uncertain Eocene representation outside the Americas. Large-billed frugivorous birds in Old World Eocene contexts are likely stem-group forms convergent in ecology. The thermoregulation function of the toucan beak was confirmed by infrared imaging in living specimens."
    }
  },

  orbWeaver: {
    kind: "animal", name: "orb-weaver spider", icon: "🕷️", className: "food",
    dangerProfile: "minor", temperament: "defensive", canInvestigate: true,
    fitness: 25, size: 1, speed: 20, agility: 45, aggression: 25, food: 6,
    poison: {severity: "mild", rank: 1, toxinType: "venom", lethal: false, turns: 3, damage: 2, warning: "Minor venom / bite risk"},
    seen: "An orb-weaver hangs in a wet web stretched between leaves.",
    investigated: "Small, edible if handled well, but the bite may still punish carelessness.",
    naturalHistory: {
      title: "Orb-weaver spider",
      fieldNote: "The orb web is an engineering solution to aerial prey capture that has been reinvented multiple times independently \u2014 its geometric precision encodes both the spider's neurology and millions of years of selection on silk properties.",
      behaviour: "Sits at web centre or in a retreat at the web edge, detecting vibration through a signal thread. Wraps prey immediately on contact, biting before struggling prey can damage the web.",
      ecology: "An aerial predator of flying insects, positioned at canopy openings where insect flight paths concentrate. Its web removal has immediate measurable effects on local insect populations.",
      gameplayInsight: "Web contact causes temporary entanglement \u2014 navigate around web structures rather than through them, especially in narrow branch corridors.",
      scienceNote: "Araneae (spiders) appear in the Carboniferous. Orb-weaving families including Araneidae are known from Eocene Baltic amber. Silk properties preserved in amber specimens confirm modern-grade silk chemistry was established by this period."
    }
  },

  shieldBug: {
    kind: "animal", name: "shield bug", icon: "🪲", className: "food",
    dangerProfile: "toxic_food", temperament: "defensive", canInvestigate: true,
    fitness: 25, size: 1, speed: 25, agility: 25, aggression: 5, food: 5,
    poison: {severity: "mild", rank: 1, toxinType: "irritant", lethal: false, turns: 3, damage: 2, warning: "Bitter chemical defence"},
    seen: "A shield bug sits exposed on a leaf, angular body bright against the green.",
    investigated: "It looks slow, but the smell suggests chemical defence.",
    naturalHistory: {
      title: "Shield bug",
      fieldNote: "Shield bugs (pentatomids) produce noxious secretions from thoracic glands \u2014 a chemical defence effective against both vertebrate and invertebrate predators that makes them widely avoided despite their abundance.",
      behaviour: "Moves slowly on plant surfaces, feeding on seeds and plant tissue. When threatened, holds position and releases chemical secretion rather than fleeing.",
      ecology: "A sap and seed feeder that can cause significant damage to individual plants. Its chemical defence makes it largely predator-free at the invertebrate scale.",
      gameplayInsight: "Edible after drying \u2014 the secretion dissipates and the protein content is real. Not worth pursuing if other food is available, but viable in scarcity.",
      scienceNote: "Pentatomidae are known from Eocene deposits in amber and compression fossils. Their thoracic gland defence chemistry is complex and species-specific. Interestingly, some predators including certain birds learn to avoid the glands while consuming the body tissue."
    }
  },

  plantHopper: {
    kind: "animal", name: "plant hopper", icon: "🦗", className: "food",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 20, size: 0.8, speed: 50, agility: 65, aggression: 0, food: 5,
    poison: null,
    seen: "A plant hopper shifts along a stem, ready to spring away.",
    investigated: "Tiny, quick food. Catching it is the hard part.",
    naturalHistory: {
      title: "Plant hopper",
      fieldNote: "Planthoppers use a gear mechanism in their hindlegs \u2014 interlocking cog-like structures that synchronise leg movement to prevent spinning \u2014 making them among the first animals known to use a mechanical gear system.",
      behaviour: "Sits on stems and leaf veins feeding on sap, jumping explosively when disturbed with a spinning, erratic trajectory that confuses visual tracking.",
      ecology: "A phloem sap-feeder weakening individual plants. In high densities, planthopper aggregations can cause visible plant stress and attract honeydew-seeking ants.",
      gameplayInsight: "Too small to be worth individual pursuit. Ignore unless no other food source is available \u2014 their jump trajectory makes catching them inefficient.",
      scienceNote: "Fulgoromorpha (planthoppers) are known from Triassic deposits. Eocene planthoppers from Baltic amber are extremely diverse, with many species preserving the full wing venation and hindleg gear mechanism in amber specimens."
    }
  },

  moth: {
    kind: "animal", name: "soft moth", icon: "🦋", className: "food",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 20, size: 1, speed: 45, agility: 55, aggression: 0, food: 6,
    poison: null,
    seen: "A soft moth rests against bark. It looks edible, but wing insects can carry plant toxins.",
    investigationDetails: ["Soft wings and weak body suggest easy food, but colour and powder matter.", "You check wing dust, smell, and feeding marks. It is probably food, not guaranteed food.", "You are learning the difference between plain moths, bitter mimics, and toxic wing insects."],
    investigated: "Soft and edible-looking, but not certain until tested or recognised.",
    naturalHistory: {
      title: "Soft moth",
      fieldNote: "Moth wing scales \u2014 modified setae arranged in overlapping arrays \u2014 serve as both thermal regulation and acoustic absorber, reducing sonar return from echolocating bats.",
      behaviour: "Rests motionless on bark or leaf undersides during the day, cryptic against substrate. Flies erratically at night toward light and heat sources.",
      ecology: "A nocturnal pollinator and herbivore whose caterpillar stage drives significant leaf consumption. Adults serve as a high-fat prey item for nocturnal insectivores and bats.",
      gameplayInsight: "Easily caught at rest during daylight. The high fat content makes moths a useful caloric supplement even when other protein is available.",
      scienceNote: "Lepidoptera (moths and butterflies) are known from the Jurassic. Eocene moths are abundant in Baltic amber, including members of Noctuidae and Tortricidae. The bat-scale acoustic absorber function has been confirmed in living species and is considered an evolved anti-predator response."
    }
  },

  butterfly: {
    kind: "animal", name: "bright butterfly", icon: "🦋", className: "poison",
    dangerProfile: "toxic_food", temperament: "skittish", canInvestigate: true,
    fitness: 20, size: 1, speed: 50, agility: 60, aggression: 0, food: 5,
    poison: null,
    seen: "A bright butterfly opens and closes its wings. Bright colour may be warning, mimicry, or nothing useful.",
    investigationDetails: [
      "It is not a fighter. The bright wings are a warning, not a threat display.",
      "A powdery trace comes from the wings and body. Handling it carelessly could dose you with stored plant toxins.",
      "The butterfly may be harmless mimicry, mild chemical defence, or stored plant toxin. Only stronger evidence makes it certain."
    ],
    investigated: "It is not a fighter, but the colour pattern makes eating it uncertain.",
    naturalHistory: {
      title: "Bright butterfly",
      fieldNote: "The butterfly's wing patterns serve as a live advertisement \u2014 warning coloration, mimicry of toxic species, or mate-recognition signals compressed into visible geometry.",
      behaviour: "Drifts between flowering plants with irregular, unpredictable flight. Pauses on sun-warmed surfaces with wings spread flat, absorbing heat.",
      ecology: "A pollinator in flower-rich canopy and edge habitats. Its presence indicates open sunlight and flowering resources nearby.",
      gameplayInsight: "Butterflies congregate near reliable nectar sources \u2014 their flight direction can guide you toward flowering food resources.",
      scienceNote: "Papilionoid butterflies are known from Eocene amber and compression fossils, including specimens from the Messel pit. By the mid-Eocene, the major butterfly families were already differentiated."
    }
  },

  titanomyrma: {
    kind: "animal", name: "giant ant", icon: "🐜", className: "food",
    dangerProfile: "minor", temperament: "defensive", canInvestigate: true,
    fitness: 35, size: 2, speed: 35, agility: 35, aggression: 35, food: 8,
    poison: {severity: "mild", rank: 1, toxinType: "irritant", lethal: false, turns: 3, damage: 2, warning: "Bite/acid risk"},
    seen: "A giant ant moves through the litter with deliberate purpose.",
    investigated: "Useful food, but mandibles and acid make it a poor careless meal.",
    naturalHistory: {
      title: "Giant ant",
      fieldNote: "Titanomyrma lubei queens are the largest ants ever recorded \u2014 comparable in size to modern hummingbirds \u2014 a scale that places them beyond any insect that contemporary humans encounter as a threat.",
      behaviour: "A solitary forager (when encountered outside the colony) moving with direct, purposeful routes. Mandible force at this size is substantial, and it does not retreat from confrontation.",
      ecology: "A predatory and scavenging ant species at the top of the invertebrate predator scale. Colony foraging parties can dominate food resources in their territory.",
      gameplayInsight: "A single giant ant can be evaded. The real threat is proximity to the colony \u2014 a single disturbed individual will recruit rapidly.",
      scienceNote: "Titanomyrma lubei is known from Eocene deposits of Wyoming, USA. Queens reached over 5 cm body length. Their presence in North America during a warm Eocene interval suggests they dispersed from Africa or Europe via high-latitude corridors during thermal maxima."
    }
  },

  titanomyrmaSwarm: {
    kind: "animal", name: "giant ant swarm", icon: "🐜", className: "threat",
    dangerProfile: "predator", temperament: "swarm", canInvestigate: true,
    fitness: 95, size: 12, speed: 35, agility: 45, aggression: 92, food: 30,
    poison: {severity: "moderate", rank: 2, toxinType: "irritant", lethal: false, turns: 4, damage: 4, warning: "Swarming bites and acid"},
    seen: "A moving patch of giant ants cuts across the forest floor like living water.",
    investigated: "This is a giant ant swarm, not a single giant ant and not an ordinary ant trail. You may snatch individuals, but staying near it is extremely dangerous.",
    naturalHistory: {
      title: "Giant ant swarm",
      fieldNote: "A colony of giant ants in swarm is categorically different from a single individual \u2014 the coordinated recruitment chemistry converts a manageable encounter into a sustained, directed assault.",
      behaviour: "Moves as a directed mass following pheromone trails, expanding coverage by recruiting from the colony in real time. The swarm does not disengage once recruitment is underway.",
      ecology: "A dominance-scale predation event that clears invertebrates and drives off vertebrates across the entire territory. Swarm foraging resupplies the colony at a rate that shapes local prey populations.",
      gameplayInsight: "Vertical escape is your only effective response \u2014 leave the ground and reach height before recruitment completes. Pheromone trails can be avoided by bypassing marked paths entirely.",
      scienceNote: "Army ant-like swarm raiding behaviour is inferred in some Eocene giant ant species from colony size estimates and worker-to-soldier ratios in amber deposits. Modern army ant swarm behaviour is among the most studied examples of emergent collective behaviour in animal biology."
    }
  },

  katydid: {
    kind: "animal", name: "katydid", icon: "🦗", className: "food",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 25, size: 1.5, speed: 40, agility: 60, aggression: 5, food: 7,
    poison: null,
    seen: "A katydid blends into the leaf edge, legs folded for a sudden jump.",
    investigated: "Good insect food if you can tell leaf from animal quickly enough.",
    naturalHistory: {
      title: "Katydid",
      fieldNote: "Katydid camouflage is among the most precise in the insect world \u2014 species-specific mimicry of leaf shape, venation, fungal spots, and even bite damage patterns are documented in living forms.",
      behaviour: "Rests motionless on leaf surfaces during the day, calling with a rasping song at night from the same perch. Moves reluctantly and only when directly touched.",
      ecology: "A herbivore and occasional predator of soft-bodied invertebrates. Its camouflage makes it effectively invisible to visual predators, concentrating predation pressure on its acoustic signal.",
      gameplayInsight: "Locate by night call, approach by sound in darkness \u2014 daylight detection requires close inspection of leaf surfaces rather than scanning by movement.",
      scienceNote: "Tettigoniidae (katydids) are known from Cretaceous deposits with leaf-mimicry wing venation. Eocene examples from Baltic amber preserve detailed wing patterning consistent with modern leaf-mimics, suggesting this extreme camouflage strategy is at least Eocene in age."
    }
  },

  grasshopper: {
    kind: "animal", name: "grasshopper", icon: "🦗", className: "food",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 25, size: 1.5, speed: 45, agility: 60, aggression: 5, food: 7,
    poison: null,
    seen: "A grasshopper clings to a stem, hind legs loaded like springs.",
    investigated: "Simple food, fast escape.",
    naturalHistory: {
      title: "Grasshopper",
      fieldNote: "The grasshopper's hind leg jump \u2014 powered by a stored elastic energy mechanism in the femoral muscle \u2014 is one of the most energy-efficient escape launches in the insect world.",
      behaviour: "Rests on sun-exposed vegetation, launching into flight when approached. Males produce stridulation bursts from prominent perches during warmer periods.",
      ecology: "A herbivore consuming significant leaf and stem material. In high densities, grasshopper activity can visibly defoliate vegetation and concentrate predator activity.",
      gameplayInsight: "Jump direction is predictable \u2014 they launch away from the side of disturbance. Approach from two directions to limit escape angles.",
      scienceNote: "Acrididae (locusts and grasshoppers) are known from Eocene deposits in Europe and North America. Wing venation in compression fossils confirms modern body plan was established by this period."
    }
  },

  cricket: {
    kind: "animal", name: "cricket", icon: "🦗", className: "food",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 22, size: 1.1, speed: 40, agility: 65, aggression: 0, food: 6,
    poison: null,
    seen: "A cricket twitches through the leaf litter, pausing in short nervous bursts.",
    investigated: "Small, clean insect food. It is more likely to vanish into cover than fight.",
    naturalHistory: {
      title: "Cricket",
      fieldNote: "Cricket stridulation \u2014 sound produced by wing-to-wing friction \u2014 carries environmental information for any animal that learns to read it: species, sex, and ambient temperature.",
      behaviour: "Forages nocturnally on plant debris and fungi, pausing to call from sheltered positions. Hides quickly under bark or into leaf litter when disturbed.",
      ecology: "An omnivorous detritivore and seed-eater in the forest floor layer. Crickets are a dietary staple for nocturnal insectivores, small reptiles, and ground-foraging birds.",
      gameplayInsight: "Abundant at night near rotting wood and leaf litter. A reliable, low-risk food source in poor foraging conditions.",
      scienceNote: "Gryllidae (true crickets) are known from Triassic deposits and persist largely unchanged. Eocene compression fossils from sites including the Messel preserve wing venation consistent with modern stridulating species."
    }
  },

  cicada: {
    kind: "animal", name: "cicada", icon: "🪰", className: "food",
    dangerProfile: "minor", temperament: "still", canInvestigate: true,
    fitness: 28, size: 1.8, speed: 25, agility: 35, aggression: 0, food: 9,
    poison: null,
    seen: "A stout cicada clings to bark, wings held roof-like over its body.",
    investigated: "Bulky insect food. It is not dangerous, but it may buzz away if disturbed badly.",
    naturalHistory: {
      title: "Cicada",
      fieldNote: "The cicada's song is one of the loudest sounds in the Eocene forest \u2014 a sustained acoustic signal that can mask other environmental noise and saturate hearing at close range.",
      behaviour: "Sits motionless on bark between sound bursts, nearly invisible against wood texture. Flies explosively when touched, producing a sharp alarm click.",
      ecology: "Sap-feeders on living wood, weakening stressed trees over time. Their mass emergences concentrate protein for every aerial and arboreal predator in the vicinity.",
      gameplayInsight: "Edible and protein-rich when caught. The alarm click on disturbance can alert other animals \u2014 factor this into stealth decisions.",
      scienceNote: "Cicadidae are known from Eocene deposits including the Messel. Their nymphal stage \u2014 underground, feeding on root sap \u2014 was already established in this period, suggesting the synchronized adult emergence strategy has deep origins."
    }
  },

  leafInsect: {
    kind: "animal", name: "leaf insect", icon: "🍃", className: "food",
    dangerProfile: "minor", temperament: "still", canInvestigate: true,
    fitness: 20, size: 1, speed: 20, agility: 45, aggression: 0, food: 6,
    poison: null,
    seen: "A leaf shape has legs. Its stillness is its defence.",
    investigated: "Camouflage, not strength, protects it.",
    naturalHistory: {
      title: "Leaf insect",
      fieldNote: "Leaf insect camouflage extends to vein replication, colour gradients matching actual leaf ageing, and edge irregularities mimicking herbivore damage \u2014 a level of mimicry that took tens of millions of years of selection to produce.",
      behaviour: "Rests completely motionless among foliage. When the wind moves leaves, it sways in synchrony. Only moves during darkness, and only slowly.",
      ecology: "A herbivore of broadleaf canopy. Its camouflage effectively removes it from the visual predator prey pool, making acoustic and chemical cues the only detection methods.",
      gameplayInsight: "Detection requires searching leaf surfaces at close range rather than scanning for movement. Pick dense leaf clusters to find them, not open spaces.",
      scienceNote: "Phasmatodea (stick and leaf insects) are known from the Eocene. True leaf insects (Phylliidae) have a confirmed fossil record from Eocene deposits in Germany and France, with preserved wing patterning showing the leaf venation mimicry already fully developed."
    }
  },

  stickInsect: {
    kind: "animal", name: "stick insect", icon: "🌿", className: "food",
    dangerProfile: "minor", temperament: "still", canInvestigate: true,
    fitness: 25, size: 2, speed: 15, agility: 35, aggression: 0, food: 7,
    poison: null,
    seen: "A twig shifts slightly against the branch.",
    investigated: "A slow, camouflaged insect. Easy to miss, easier to eat once seen.",
    naturalHistory: {
      title: "Stick insect",
      fieldNote: "Stick insect camouflage operates at multiple levels \u2014 shape, colour, texture, and a slow swaying motion that mimics wind-moved vegetation, combining static and dynamic mimicry.",
      behaviour: "Rests aligned with thin branches, sways slowly when any movement is detected nearby. Only active at night, moving extremely slowly along vegetation while feeding.",
      ecology: "A folivore consuming significant leaf material in the canopy. Its camouflage removes it almost entirely from visual predator detection, concentrating predation pressure on chemosensory hunters.",
      gameplayInsight: "Detection requires handling each branch section individually at close range. The caloric return relative to search time is low \u2014 prioritise this only in extreme scarcity.",
      scienceNote: "Phasmatodea (stick and leaf insects) are known from the Triassic. Eocene stick insects from Baltic amber and Messel compression fossils preserve the full body proportions of modern forms. Swaying behaviour as active camouflage enhancement is inferred from morphological comparison with modern species."
    }
  },

  gecko: {
    kind: "animal", name: "small gecko", icon: "🦎", className: "food",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 35, size: 2, speed: 55, agility: 75, aggression: 5, food: 10,
    poison: null,
    seen: "A small gecko clings to bark, feet gripping the damp surface with ease.",
    investigated: "Fast, clean prey. The challenge is catching it.",
    naturalHistory: {
      title: "Small gecko",
      fieldNote: "Gecko adhesion relies on van der Waals forces at the nanoscale \u2014 setae on the toe pads interact with surface molecules, allowing attachment to nearly any substrate without moisture or chemical adhesive.",
      behaviour: "Moves in short bursts across vertical bark and undersides of branches. Freezes in place when threatened, relying on camouflage before choosing flight.",
      ecology: "A nocturnal insectivore of bark and crevice microhabitats, controlling bark-dwelling arthropod populations. It occupies surfaces most other lizards cannot access.",
      gameplayInsight: "Catchable at rest during daylight hours when thermoregulation has slowed it. A reliable small protein source in bark-rich environments.",
      scienceNote: "Gekkota have a fossil record extending to the mid-Jurassic, with Eocene geckos known from Baltic amber and compression fossils. Adhesive toe pad morphology appears in some Eocene specimens, confirming the mechanism is ancient within the clade."
    }
  },

  eurheloderma: {
    kind: "animal", name: "Eurheloderma-like venomous lizard", icon: "🦎", className: "threat",
    dangerProfile: "venomous_ambush", temperament: "defensive", canInvestigate: true,
    fitness: 75, size: 12, speed: 30, agility: 30, aggression: 55, food: 35,
    poison: {severity: "high", rank: 4, toxinType: "venom", lethal: true, criticalTimer: 6, turns: 6, damage: 8, warning: "Venomous bite"},
    seen: "A heavy-bodied lizard holds its ground, jaw muscles swelling beneath patterned skin.",
    investigated: "This is not quick prey. The bite could be much worse than the meat is worth.",
    naturalHistory: {
      title: "Eurheloderma-like venomous lizard",
      fieldNote: "Helodermatid lizards are among the only genuinely venomous lizards known \u2014 an unusual evolutionary solution that functions not through fang injection but through venom delivered via chewed contact.",
      behaviour: "Moves slowly and deliberately through leaf litter, pausing to taste the air with a forked tongue. Rarely displays before biting \u2014 the attack is brief, firm, and sustained.",
      ecology: "An ambush predator of eggs, small mammals, and invertebrates on the forest floor. Its venom persistence makes it a low-risk forager \u2014 few animals learn to attack it twice.",
      gameplayInsight: "Venom causes slow, escalating damage after the bite \u2014 disengage immediately and allow the effect to run its course before resuming activity.",
      scienceNote: "Eurheloderma is an Eocene helodermatid lizard known from European fossil sites. Its presence confirms that venomous lizard lineages had dispersed widely by the mid-Eocene. Modern Heloderma (Gila monster, beaded lizard) are its living relatives."
    }
  },

  bergisuchus: {
    kind: "animal", name: "Bergisuchus-like sebecid", icon: "🐊", className: "predator",
    dangerProfile: "fatal", temperament: "hunter", pursuitType: "ground",
    canInvestigate: true, fitness: 100, size: 40, speed: 55, agility: 35, aggression: 85, food: 120,
    poison: null,
    seen: "A terrestrial crocodile-like predator moves between roots, high-legged and purposeful.",
    investigated: "High-legged and fast across the ground. Unlike a water crocodilian, it is not tied to the bank — it pursues. It can follow into low branches. Reach the mid-storey before it closes.",
    naturalHistory: {
      title: "Bergisuchus-like sebecid",
      fieldNote: "Unlike the water-margin ambush strategy of modern crocodilians, sebecid relatives like Bergisuchus were fully terrestrial hunters \u2014 fast-moving, long-legged, and capable of sustained pursuit.",
      behaviour: "Patrols forest floor with a surprisingly upright gait for a crocodilian. Investigates disturbance with the deliberate, unhurried confidence of an apex predator.",
      ecology: "A terrestrial carnivore filling a large predator niche on land, competing with early mammalian carnivores. Its ziphodont teeth \u2014 blade-like, serrated \u2014 are adapted for flesh-cutting, not bone-crushing.",
      gameplayInsight: "It cannot follow you into the canopy. Any tree access point is an exit \u2014 reach it fast.",
      scienceNote: "Bergisuchus dietrichbergi is known from Eocene deposits of Germany. Sebecids are a clade of notosuchian crocodylomorphs with high, laterally compressed, serrated teeth convergent with theropod dinosaurs \u2014 a body plan for cursorial predation, not aquatic ambush."
    }
  },

  messelornis: {
    kind: "animal", name: "Messelornis-like bird", icon: "🐦", className: "prey",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 45, size: 4, speed: 55, agility: 50, aggression: 5, food: 18,
    poison: null,
    seen: "A small ground bird picks through the litter, then freezes at the sound of movement.",
    investigated: "A ground forager that prefers to walk away through cover rather than flush. Catchable in confined spaces. Its disturbing of litter sometimes exposes invertebrates.",
    naturalHistory: {
      title: "Messelornis-like bird",
      fieldNote: "Messelornis represents the gruiform radiation of the Eocene \u2014 rail-like ground birds that diversified into multiple ecological roles before being largely replaced by modern gruiform and galliform birds.",
      behaviour: "Walks deliberately through dense ground vegetation and leaf litter, probing with its bill. Reluctant to fly and prefers to move away through cover on foot.",
      ecology: "An omnivore of the forest floor, consuming seeds, invertebrates, and small vertebrates. Its ground-foraging disturbs leaf litter and exposes prey for secondary foragers.",
      gameplayInsight: "Slow enough to catch in confined ground-level spaces. The floor-level foraging location makes it a ground encounter \u2014 be aware of other ground predators in the same area.",
      scienceNote: "Messelornis cristata is one of the best-preserved Eocene birds from the Messel Pit, with soft tissue outlines preserved. It was a gruiform (crane-relative) with a crest and rail-like proportions, abundant in Messel assemblages."
    }
  },

  cariamiform: {
    kind: "animal", name: "small cariamiform hunter", icon: "🐦", className: "threat",
    dangerProfile: "predator", temperament: "hunter", pursuitType: "ground",
    canInvestigate: true, fitness: 80, size: 18, speed: 65, agility: 45, aggression: 70, food: 55,
    poison: null,
    seen: "A long-legged predatory bird darts between trunks, head low and eyes sharp.",
    investigated: "Fast across the ground in committed short bursts. Does not follow into the canopy. Elevation ends the threat.",
    naturalHistory: {
      title: "Small cariamiform hunter",
      fieldNote: "Cariamiform birds were the dominant small cursorial predators of the Eocene, occupying the ecological role that mongooses, genets, and small cats would later claim.",
      behaviour: "Hunts with quick, darting runs across open ground and through undergrowth, using its sharp beak to pin and kill invertebrates and small vertebrates.",
      ecology: "A ground predator of insects, small reptiles, and mammals. It competes with early carnivorans and creates a persistent predation pressure at ground level.",
      gameplayInsight: "Primarily a ground threat. Climbing removes you from its effective range, though it will wait below if it has detected you.",
      scienceNote: "Cariamiformes were globally diverse in the Eocene, with European forms like Elaphrocnemus known from the Messel and other sites. Modern seriemas in South America are their closest living relatives."
    }
  },

  heterohyus: {
    kind: "animal", name: "Heterohyus-like glider", icon: "🐿️", className: "prey",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 55, size: 4, speed: 45, agility: 85, aggression: 5, food: 20,
    poison: null,
    seen: "A small gliding mammal clings to bark, membrane folded along its side.",
    investigated: "An arboreal bark specialist. Not aggressive. Its inter-tree gliding reveals navigable distances between branches.",
    naturalHistory: {
      title: "Heterohyus-like glider",
      fieldNote: "Heterohyus belongs to the apatemyids \u2014 an extinct order of small mammals convergent with gliders and bark specialists, using elongated fingers to extract insects from crevices.",
      behaviour: "Moves between trees using a gliding membrane stretched between limbs, covering distances of several metres per launch. Probes bark crevices with elongated digits.",
      ecology: "A bark insectivore and occasional glider occupying the vertical trunk niche. Its gliding reduces the energy cost of inter-tree movement in fragmented canopy.",
      gameplayInsight: "Its gliding behaviour reveals inter-tree distances that are navigable \u2014 watch its launch and landing points to identify safe canopy crossing routes.",
      scienceNote: "Heterohyus is an apatemyid from the Messel Pit. Apatemyids are an enigmatic extinct order with no clear modern relatives. Their elongated third and fourth digits are convergent with the aye-aye's bark-probing finger, suggesting similar ecology."
    }
  },

  kopidodon: {
    kind: "animal", name: "Kopidodon-like arboreal mammal", icon: "🐿️", className: "prey",
    dangerProfile: "minor", temperament: "defensive", canInvestigate: true,
    fitness: 65, size: 8, speed: 40, agility: 60, aggression: 20, food: 32,
    poison: null,
    seen: "A shaggy arboreal mammal moves along a branch, larger than most small prey.",
    investigated: "A large arboreal frugivore that will defend a food patch. Territorial rather than predatory. Avoid feeding simultaneously at the same resource.",
    naturalHistory: {
      title: "Kopidodon-like arboreal mammal",
      fieldNote: "Kopidodon belongs to the cimolestans \u2014 a broad group of early mammals that occupied diverse niches before placental orders fully diversified, including a fully committed arboreal frugivore niche.",
      behaviour: "Moves through the mid-canopy with a slow, deliberate, grip-based locomotion. Feeds on fruit and soft plant material, caching food in branch forks.",
      ecology: "An arboreal frugivore competing directly with early primates for canopy fruit resources. Its large body relative to other arboreal mammals gives it competitive priority at food patches.",
      gameplayInsight: "Territorial around productive fruit sources \u2014 avoid or displace it rather than trying to feed simultaneously at the same patch.",
      scienceNote: "Kopidodon macrognathus is known from the Messel Pit. It was a large, squirrel-like cimolestan with strong curved claws for arboreal locomotion and high-crowned teeth for processing hard fruit. It represents a convergent evolution of the arboreal frugivore body plan."
    }
  },

  amphiperatherium: {
    kind: "animal", name: "Amphiperatherium-like marsupial", icon: "🐭", className: "prey",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 45, size: 3, speed: 45, agility: 55, aggression: 5, food: 16,
    poison: null,
    seen: "A small opossum-like mammal noses through wet vegetation.",
    investigated: "A small generalist opportunist. Slow enough to catch in confined spaces, but it will bite when cornered. Modest food value.",
    naturalHistory: {
      title: "Amphiperatherium-like marsupial",
      fieldNote: "One of the last European marsupials, Amphiperatherium persists into the Eocene as a small, nocturnal opportunist occupying niches that placental mammals have not yet fully claimed.",
      behaviour: "Moves cautiously through leaf litter and low branches, pausing frequently to sniff. Freezes when it detects movement, then bolts for cover.",
      ecology: "An omnivorous generalist eating insects, fruit, and small vertebrates. It competes directly with early primates for many of the same food resources.",
      gameplayInsight: "Slow enough to catch in confined spaces but rarely worth the effort \u2014 its caloric value is modest and it will bite when cornered.",
      scienceNote: "Amphiperatherium is a genus of didelphid-like marsupials known from Eocene and Oligocene European fossil sites. European marsupial diversity collapsed during the Grande Coupure faunal turnover at the Eocene-Oligocene boundary."
    }
  },

  lesmesodon: {
    kind: "animal", name: "Lesmesodon-like creodont", icon: "🐾", className: "predator",
    dangerProfile: "predator", temperament: "hunter", pursuitType: "ground",
    canInvestigate: true, fitness: 80, size: 16, speed: 60, agility: 50, aggression: 70, food: 50,
    poison: null,
    seen: "A small carnivorous mammal slips through the undergrowth with its nose low.",
    investigationDetails: [
      "It moves with its nose low and its head swinging. It is tracking, not patrolling.",
      "Smaller than a large predator, but fast enough to close ground quickly once it commits.",
      "It stops and tests the air when it senses something. It uses smell more than sight."
    ],
    investigated: "A small cursorial predator. Quick, committed once it locks on, and less effective in branches.",
    knowledgeTierText: [
      "You observe the Lesmesodon-like creodont moving through the undergrowth.",
      "You notice it navigates by smell more than sight — it will locate you from downwind.",
      "You understand its main weakness: it cannot follow you into the upper canopy.",
      "You have watched it enough to know its patrol patterns in this part of the forest.",
      "Full knowledge: the Lesmesodon-like creodont."
    ],
    naturalHistory: {
      title: "Lesmesodon-like creodont",
      fieldNote: "Creodonts were the dominant carnivorous mammals of the Eocene before modern carnivores displaced them. This small example is fast and committed once it has a scent trail. On the ground, it is a serious threat; in the branches, it loses its advantage.",
      behaviour: "A nose-led pursuit predator. It identifies targets by smell and commits to pursuit quickly. It does not give up easily once it has a track.",
      ecology: "A mid-level ground predator competing with other carnivorans and creodonts of similar size. It fills a role between apex predators and opportunistic feeders — fast enough to take prey but not dominant enough to displace larger animals from kills.",
      gameplayInsight: "Smell is your liability near this animal. Moving downwind, staying in the branches, and not lingering on the ground are your primary defences.",
      scienceNote: "Creodonts were an order of carnivorous placental mammals that were dominant predators through much of the Palaeogene. Once thought to be direct ancestors of modern Carnivora, they are now considered an independent lineage that went extinct by the late Miocene, outcompeted by modern carnivore families."
    }
  },

  darwinius: {
    kind: "animal", name: "Darwinius-like primate", icon: "🐒", className: "prey",
    dangerProfile: "rival", temperament: "defensive", canInvestigate: true,
    fitness: 70, size: 7, speed: 45, agility: 75, aggression: 25, food: 30,
    poison: null,
    seen: "Another primate-like climber moves through the branches, watching you as much as the forest.",
    cardDetail: "It keeps to cover and tests your reactions before deciding whether to close distance or vanish.",
    investigationDetails: [
      "It reads your posture before you get close. Its attention is on your movements, not on foraging.",
      "You notice forward-facing eyes and a grasping grip like yours. This is a relative, distantly.",
      "It has a resting route through the branches that it returns to. You are beginning to predict it."
    ],
    investigated: "A primate relative. Aware, cautious, and capable in the branches.",
    knowledgeTierText: [
      "You observe the Darwinius-like primate with careful attention.",
      "You notice it tests your posture before committing to any movement near you.",
      "You understand that its caution is ecological intelligence — it does not waste energy on unnecessary risk.",
      "You have watched it enough to know its preferred routes and resting spots.",
      "Full knowledge: the Darwinius-like primate."
    ],
    naturalHistory: {
      title: "Darwinius-like primate",
      fieldNote: "This is an animal recognisably like you in body plan: forward-facing eyes, grasping hands, arboreal agility. It occupies similar ecological space and treats you with the same calculation you apply to it.",
      behaviour: "Cautious and intelligent. It does not react to encounters with automatic flee or fight — it reads the situation and adjusts. Observing it is observing something that is also observing you.",
      ecology: "A small arboreal primate of the Eocene, feeding on fruit, insects, and small animals. It shares habitat with you and competes for some of the same food sources.",
      gameplayInsight: "Not a direct threat unless provoked. It can become a rival for food in the same patch and may attract predators with its own movement and calls.",
      scienceNote: "Darwinius masillae, known as 'Ida', is one of the most complete Eocene primate fossils, found at the Messel Pit in Germany. It was briefly and controversially claimed as a direct human ancestor; the scientific consensus places it in the strepsirrhine lineage (lemur relatives) rather than the haplorhine lineage that leads to monkeys, apes, and humans."
    }
  },

  europolemur: {
    kind: "animal", name: "Europolemur-like primate", icon: "🐒", className: "prey",
    dangerProfile: "rival", temperament: "defensive", canInvestigate: true,
    fitness: 75, size: 9, speed: 45, agility: 70, aggression: 30, food: 36,
    poison: null,
    seen: "A larger primate relative grips the branch, weighing threat against retreat.",
    investigated: "Bigger than it looks and aware of you. Social animals — there may be more nearby. Competition for fruit patches is real.",
    naturalHistory: {
      title: "Europolemur-like primate",
      fieldNote: "Europolemur represents the Eocene adaptive radiation of primates across Europe \u2014 a social, fruit-eating arboreal mammal occupying the same niche you do and defending it actively.",
      behaviour: "Moves through the canopy in loose groups, vocalising frequently. Threatens rivals with branch-shaking, alarm calls, and direct approach rather than immediate contact.",
      ecology: "A frugivore and insectivore of the mid-to-upper canopy. Social structure provides predator vigilance \u2014 one alarm call mobilises the group.",
      gameplayInsight: "Competition for fruit patches is real \u2014 approach their feeding trees quietly or wait for the group to move on before foraging.",
      scienceNote: "Europolemur is an adapiform primate from the Messel Pit, related to the lineage that includes modern lemurs. European Eocene adapiforms were diverse and filled ecological roles similar to small monkeys today."
    }
  },

  godinotia: {
    kind: "animal", name: "Godinotia-like primate", icon: "🐒", className: "prey",
    dangerProfile: "rival", temperament: "defensive", canInvestigate: true,
    fitness: 65, size: 6, speed: 45, agility: 75, aggression: 22, food: 28,
    poison: null,
    seen: "A small agile primate relative pauses in the foliage, tense and alert.",
    investigationDetails: [
      "Small, quick, and watching. It does not stay in one place long enough to be studied easily.",
      "You notice it favours fruit-bearing branches and avoids open exposure even more than you do.",
      "It is watching what you watch. When you look toward danger, it follows your attention."
    ],
    investigated: "Small, quick primate relative. Nervous and food-competitive.",
    knowledgeTierText: [
      "You watch the Godinotia-like primate from a careful distance.",
      "You notice it shadows your movement slightly, using you as an early warning system.",
      "You understand it treats your presence as information — your reactions tell it where to be.",
      "You have watched it enough to predict which branches it prefers when resting.",
      "Full knowledge: the Godinotia-like primate."
    ],
    naturalHistory: {
      title: "Godinotia-like primate",
      fieldNote: "A small arboreal primate navigating the same canopy as you, competing for overlapping food, and using your alertness as part of its own threat-detection system. It is neither ally nor predator — it is a neighbour with shared interests.",
      behaviour: "Fast, cautious, and aware of other animals' reactions. It moves frequently and rarely settles. Its presence in a food patch signals the area is viable and not immediately threatened.",
      ecology: "An Eocene primate related to the adapid group. Feeds primarily on fruit and insects. Its foraging range overlaps with yours and with other primate relatives.",
      gameplayInsight: "Not aggressive unless cornered. Its presence near fruit is a useful signal that the food is safe. Its sudden departure from an area is worth noticing.",
      scienceNote: "Godinotia is an Eocene adapid primate from the Messel deposits. Adapids were a diverse group of early primates that have sometimes been considered lemur ancestors, though their exact phylogenetic position is still discussed. They were ecologically important herbivores and insectivores of the European Eocene."
    }
  },

  woodpeckerBird: {
    kind: "animal", name: "woodpecker-like bird", icon: "🐦", className: "prey",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 55, size: 3, speed: 55, agility: 65, aggression: 8, food: 16,
    poison: null,
    seen: "A stiff-tailed bird hitches up the trunk and taps at dead wood, pausing between bursts to listen.",
    investigationDetails: [
      "The tapping is not alarm. It is opening bark and listening for hidden grubs.",
      "Its stiff tail braces against the trunk. It will flee upward before it fights.",
      "Where it has been drilling, soft larvae or loosened bark may be nearby."
    ],
    investigated: "A trunk-clinging insect hunter. Edible if caught, but more useful as a clue to hidden grubs.",
    naturalHistory: {
      title: "Woodpecker-like bird",
      fieldNote: "Woodpecker skull anatomy solves a formidable engineering problem \u2014 decelerations of over 1000g during bark strikes, managed through a spongy hyoid bone structure acting as a biological shock absorber.",
      behaviour: "Excavates bark and dead wood with rapid, rhythmic strikes, pausing to extract insects with a long, barbed tongue. Announces territory with resonant drumming bursts.",
      ecology: "A primary cavity excavator \u2014 its nest holes, once abandoned, become critical habitat for secondary cavity nesters including other birds and small mammals.",
      gameplayInsight: "Drumming activity marks dead wood with active insect larvae beneath \u2014 these locations are secondary foraging opportunities after the bird moves on.",
      scienceNote: "Piciformes (woodpeckers) appear in the Eocene fossil record. Zygodactyl feet (two toes forward, two back) for vertical trunk clinging are preserved in Eocene specimens. The specific hyoid shock-absorber anatomy is confirmed in modern species by high-speed X-ray imaging."
    }
  },

  hummingbird: {
    kind: "animal", name: "needle-billed nectar bird", icon: "🐦", className: "prey",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 25, size: 1, speed: 90, agility: 95, aggression: 2, food: 5,
    poison: null,
    seen: "A tiny needle-billed bird hangs in the air beside a flower, wings a blur.",
    investigationDetails: [
      "It is almost all speed and wingbeat. Catching it would cost more than it gives.",
      "The flowers it visits may hold nectar, but the bird itself is barely a mouthful.",
      "Its sudden darts can also reveal nearby flowering vines."
    ],
    investigated: "Tiny, fast, and poor food. More signal than meal.",
    naturalHistory: {
      title: "Needle-billed nectar bird",
      fieldNote: "A specialist nectar feeder with a bill length matched to specific flower tube depths is a product of coevolution \u2014 the plant and the bird have shaped each other over millions of generations.",
      behaviour: "Hovers with rapid wingbeats at flowering structures, inserting its bill precisely and extracting nectar within seconds. Territorial around high-value flower patches.",
      ecology: "A pollinator linking flowering plants across the canopy. Its presence indicates active nectar production and reliably marks high-quality flower resources.",
      gameplayInsight: "Track its foraging route to identify multiple flowering food sources \u2014 it covers a territory efficiently and visits resources in rotation.",
      scienceNote: "True hummingbirds (Trochilidae) are a New World family. Eocene needle-billed nectar-feeders in Old World contexts are likely stem-group forms such as Eurotrochilus, known from Oligocene Germany, or unnamed Eocene relatives. Coevolved bill-flower morphology appears early in the fossil record."
    }
  },

  orchidBee: {
    kind: "animal", name: "metallic orchid bee", icon: "🐝", className: "threat",
    dangerProfile: "sting", temperament: "defensive", canInvestigate: true,
    fitness: 25, size: 1, speed: 65, agility: 75, aggression: 35, food: 3,
    poison: {severity: "mild", rank: 1, toxinType: "venom", lethal: false, turns: 2, damage: 2, warning: "Small sting / sharp pain"},
    seen: "A metallic bee flashes green-blue as it circles a wet flower.",
    investigationDetails: [
      "The colour is bright but not the main danger. The sting is small, sharp, and not worth provoking.",
      "It keeps returning to the same flower, which suggests nectar nearby.",
      "As food it is poor. As information, it marks flowers and possible sweetness."
    ],
    investigated: "Poor food, useful clue, mild sting risk.",
    naturalHistory: {
      title: "Metallic orchid bee",
      fieldNote: "Orchid bees carry perfume compounds collected from specific floral sources to use in mate attraction \u2014 a pollination system that locks orchid species to specific bee species with remarkable precision.",
      behaviour: "Flies direct, purposeful routes between orchid flowers and collection sites. Males hover briefly at flowers and scrape aromatic compounds with specialised forelegs before departing.",
      ecology: "A specialist pollinator in coevolved relationships with specific orchid species. Its foraging routes connect isolated orchid patches that cannot self-pollinate.",
      gameplayInsight: "Sting is minor \u2014 manageable if disturbed briefly. Their routes reliably mark orchid flower locations, which are nectar sources.",
      scienceNote: "Eulaema and related orchid bee genera (Euglossini) are a neotropical bee tribe. Eocene orchid pollen is known from Baltic amber attached to bee specimens, confirming the orchid-bee pollination relationship existed by this period, though geographic range interpretation is complex."
    }
  },

  stranglerFigFruit: {
    kind: "forage", name: "strangler fig fruit", icon: "🟢", className: "food",
    canInvestigate: true, portions: 3, energy: 14,
    poison: null,
    seen: "Small fig fruits cluster from a vine-wrapped trunk, with droppings and peck marks below.",
    investigationDetails: [
      "The ground below is messy with skins and droppings. Many animals feed here.",
      "The fruits are small but numerous. Good group food, though not very filling alone.",
      "Heavy feeding signs mean safety from poison, not safety from attention."
    ],
    investigated: "Common, shared rainforest food. Safe-looking, but it attracts company.",
    naturalHistory: {
      title: "Strangler fig fruit",
      fieldNote: "Ficus is a keystone genus \u2014 its synchronised asynchronous fruiting across individual trees provides year-round fruit supply to frugivores in tropical forests, making it a resource that holds entire animal communities together.",
      behaviour: "Fruits ripen asynchronously across the tree's surface, providing a continuous fruiting display rather than a single crop. Ripening figs attract hundreds of individuals of dozens of species simultaneously.",
      ecology: "A community resource attracting primates, birds, bats, and frugivorous mammals simultaneously. Fig-fruiting events are among the most intense concentrated feeding observations in tropical ecology.",
      gameplayInsight: "The most reliable high-density food resource in the canopy. Competition is intense and territorial \u2014 assess the dominance hierarchy at the tree before committing to feeding position.",
      scienceNote: "Ficus (Moraceae) is known from Eocene fossil deposits. Fig-wasp coevolution \u2014 the obligate pollination mutualism between fig wasps and Ficus \u2014 has been dated to the Cretaceous. Eocene amber preserves fig wasp specimens confirming the mutualism was established before the Eocene."
    }
  },

  bromeliadPool: {
    kind: "forage", name: "bromeliad pool", icon: "💧", className: "food",
    canInvestigate: true, portions: 2, energy: 4, hydration: 35,
    poison: null,
    seen: "A cup-shaped plant holds rainwater and small wriggling life between its leaves.",
    investigationDetails: [
      "The water is held above the ground in a leaf cup. It is a tiny refuge and feeding spot.",
      "Small larvae move inside. It is not rich food, but it is valuable water held above the forest floor.",
      "Anything drinking here may also be watched by frogs, insects, or small hunters."
    ],
    investigated: "A small canopy water pocket with larvae. Modest food, but excellent for hydration.",
    naturalHistory: {
      title: "Bromeliad pool",
      fieldNote: "A bromeliad tank \u2014 the water-holding leaf rosette of tank bromeliads \u2014 is a self-contained ecosystem supporting specialist frogs, insects, and invertebrates within a single plant.",
      behaviour: "Stationary resource. The water held in the rosette accumulates organic material and supports a layered invertebrate community at different depths.",
      ecology: "A freshwater microhabitat in the arboreal zone. Tank bromeliads are keystone structures for canopy-dependent amphibians and insects that require standing water for reproduction.",
      gameplayInsight: "Reliable water source in the canopy without descending to ground level \u2014 a significant safety advantage when ground predators are active.",
      scienceNote: "Bromeliaceae are a New World family with no confirmed Eocene fossil record outside the Americas. Old World equivalents in arboreal water-holding capacity are found in other plant families. This encounter type represents the ecological function \u2014 water in canopy cavities \u2014 which is globally distributed."
    }
  },

  treeCrab: {
    kind: "animal", name: "small tree crab", icon: "🦀", className: "prey",
    dangerProfile: "pinch", temperament: "defensive", canInvestigate: true,
    fitness: 45, size: 2, speed: 25, agility: 35, aggression: 25, food: 12,
    poison: null,
    seen: "A small crab grips wet bark near a water-filled plant, claws lifted in warning.",
    investigationDetails: [
      "It is far from open water but not lost; the plant cups nearby keep this branch wet.",
      "The claws can pinch, but this is defence rather than predation.",
      "Armour makes it awkward food. The risk is minor, the reward modest."
    ],
    investigated: "Defensive, armoured branch prey. Edible, but not effortless.",
    naturalHistory: {
      title: "Small tree crab",
      fieldNote: "Arboreal crabs represent a transition from aquatic to fully terrestrial life that has occurred multiple times independently in different crab lineages \u2014 each solution to gill desiccation involving different anatomical modifications.",
      behaviour: "Climbs bark and enters tree cavities using modified damp chamber gill structures. Scavenges plant material, fungi, and invertebrates in bark microhabitats.",
      ecology: "A scavenger and herbivore in tree cavity and bark microhabitats, contributing to nutrient recycling in dead wood. It bridges aquatic and arboreal trophic pathways.",
      gameplayInsight: "Edible and catchable in tree cavities. The claws cause minor damage if handled carelessly but the protein return is reliable.",
      scienceNote: "Terrestrial and semi-arboreal crabs appear in the Eocene with the diversification of Brachyura. Freshwater and terrestrial crab transitions are documented across multiple crab clades, each involving independent modifications to gill chamber humidity regulation."
    }
  },

  birdNest: {
    kind: "nest", name: "bird nest", icon: "🥚", className: "food",
    canInvestigate: true, eggs: 2,
    seen: "A small nest rests in the fork of a branch. Pale eggs show through the weave of leaves and twigs.",
    investigated: "The eggs are easy to reach, but feeding here carries smell and noise farther than you want.",
    naturalHistory: {
      title: "Bird nest",
      fieldNote: "Bird nest construction materials encode the builder's microhabitat \u2014 local vegetation, spider silk for elasticity, and feather lining for insulation all reflect what the parent bird found available within its territory.",
      behaviour: "Attending parent \u2014 if present \u2014 responds to intrusion with alarm calling, distraction displays, or direct strikes depending on species. Nest eggs are warmed and monitored closely during incubation.",
      ecology: "A resource concentration point at the intersection of adult foraging range and protected nesting site. Successful nest sites are often reused across seasons \u2014 locations with previous evidence of nesting are productive search targets.",
      gameplayInsight: "Eggs represent concentrated protein and lipid. Assess whether a parent is present and attending before approaching \u2014 unattended nests are significantly safer to exploit.",
      scienceNote: "Avian nest construction leaving physical traces in the fossil record is rare. Nesting behaviour is inferred from bone assemblages and egg fragments at Eocene sites. Eocene bird eggshell from multiple sites shows modern-grade crystalline structure, confirming hard-shelled eggs were established across all major bird lineages."
    }
  },

  largeGroundNest: {
    kind: "nest", name: "large ground nest", icon: "🥚", className: "food",
    canInvestigate: true, eggs: 3, energy: 24,
    guardianKey: "gastornis", guardianChance: 42,
    seen: "A large nest of trampled leaves and mud sits on the forest floor. The eggs are rich food, but the open ground around it is too clear.",
    investigationDetails: [
      "The nest is not abandoned in any comforting way. Fresh scratches and pressed leaves suggest something large still uses it.",
      "The eggs would be a strong meal, but the exposed floor gives you almost nowhere to vanish if the owner returns.",
      "Heavy bird-footprints mark the mud nearby. This is doable, not safe."
    ],
    investigated: "Large eggs, fresh tracks, and a dangerous amount of open ground. Feeding here could draw Gastornis.",
    naturalHistory: {
      title: "Large ground nest",
      fieldNote: "Ground-nesting megafauna invest heavily in nest defence \u2014 a large reptile or ground bird sitting on eggs will commit to that position and defend it with full adult-scale force rather than retreating.",
      behaviour: "The nesting animal remains within striking distance of the clutch continuously. Approach triggers immediate threat posturing and escalates to attack without the graduated warning sequence used by less invested defenders.",
      ecology: "A concentrated energy resource \u2014 large eggs represent significant investment by the parent and equivalent caloric value for a successful raider. Ground nest locations reflect species-specific habitat requirements.",
      gameplayInsight: "The defender will not be displaced by threat displays. A successful raid requires speed \u2014 reach an egg and retreat before physical contact, not after.",
      scienceNote: "Large Eocene ground-nesting animals include crocodilians and large flightless birds such as Gastornis. Crocodilian nest structure and temperature-based sex determination is considered ancient within the lineage. Gastornis egg fragments are known from European Eocene deposits."
    }
  },
  termiteMound: {
    kind: "nest", name: "termite mound", icon: "🟤", className: "food",
    canInvestigate: true, eggs: 4, energy: 9,
    guardianKey: "termiteSwarm", guardianChance: 32,
    poison: null,
    seen: "A packed clay termite mound rises from roots and damp leaf litter. Small pale bodies move where the wall has cracked.",
    investigationDetails: [
      "The mound is food, but not passive food. The outer wall vibrates with living movement.",
      "The cracked edge is easiest to raid. Breaking deeper into it will make more of the colony respond.",
      "It is a useful emergency food source, especially on the ground, but the noise and scent may draw other hunters."
    ],
    investigated: "Soft-bodied termites are accessible through a crack. Worth eating, but disturbing the mound can trigger a defensive swarm or attract attention.",
    naturalHistory: {
      title: "Termite mound",
      fieldNote: "A termite mound is a climate-controlled structure \u2014 internal temperature and CO2 levels are maintained within narrow ranges through a network of ventilation shafts adjusted by the colony's collective behaviour.",
      behaviour: "The exterior appears dormant until breached. Internal breach triggers soldier mobilisation within seconds and worker evacuation of the reproductive chamber. The entire colony reorganises around the breach point.",
      ecology: "A decomposition hub processing dead wood and plant material at a scale that makes termites among the most significant contributors to soil carbon cycling in tropical forests. Mounds persist for decades and their locations become fixed landscape features.",
      gameplayInsight: "Workers and soldiers are both edible \u2014 worker density is highest in upper galleries, soldiers concentrate near breach points. Plan extraction speed around soldier mobilisation time.",
      scienceNote: "Termite (Isoptera) mound-building appears in the fossil record in the Eocene. Fossil termite mound structures with preserved ventilation shaft architecture are known from Eocene deposits in Africa. Baltic amber preserves termite workers and soldiers with intact mandibular structure."
    }
  },


  termiteSwarm: {
    kind: "animal", name: "termite soldier swarm", icon: "🟤", className: "threat",
    dangerProfile: "bite", temperament: "swarm", canInvestigate: true,
    fitness: 70, size: 7, speed: 18, agility: 25, aggression: 80, food: 16,
    poison: null,
    seen: "Pale soldier termites boil from the broken mound, heads raised and jaws working.",
    investigated: "This is not an ant raid. The termite colony is defending itself with numbers and biting soldiers.",
    naturalHistory: {
      title: "Termite soldier swarm",
      fieldNote: "Termite soldiers deploy a combination of mandible force and chemical secretions \u2014 some species use a fontanellar gun to spray sticky, toxic compounds that immobilise attacking invertebrates instantly.",
      behaviour: "Emerges rapidly from nest breach points in a coordinated defensive surge. Soldiers orient toward vibration sources and attack regardless of prey size \u2014 the defence is colony-wide, not individual.",
      ecology: "The soldier caste exists purely to protect the colony. The colony itself is a major ecosystem engineer, decomposing wood and cycling nutrients at a scale that shapes forest structure.",
      gameplayInsight: "Soldier response time after nest disturbance is near-instant. If raiding a termite mound, have an extraction route planned before making first contact.",
      scienceNote: "Termite soldiers with fontanellar spray glands are known from Eocene amber, including specimens from Baltic and Burmese deposits that preserve the gland structure. Termites (Blattodea: Isoptera) have complex soldier caste morphology established well before the Eocene."
    }
  },

  smallCarcass: {
    kind: "carcass", name: "small carcass", icon: "☠️", className: "food",
    canInvestigate: true, portions: 2, energy: 16, attraction: 20, rotRisk: 8,
    poison: null,
    seen: "A small dead animal lies partly hidden under leaves. It may still be useful, but the smell is already spreading.",
    investigated: "Check freshness before feeding. Carcasses can sour quickly and attract scavengers or predators.",
    naturalHistory: {
      title: "Small carcass",
      fieldNote: "A small dead animal represents moderate caloric return with a short exploitation window \u2014 invertebrate decomposers begin working within minutes, and the resource degrades quickly in warm, humid forest conditions.",
      behaviour: "Stationary resource. Blow flies locate by olfaction and begin ovipositing within minutes. Ants and beetles follow. The exploitation timeline is measured in hours, not days.",
      ecology: "A minor but frequent nutrient pulse recycling small vertebrate biomass back to the soil. Collectively, small carcasses in the forest sustain a significant component of the detritivore community.",
      gameplayInsight: "Time-sensitive \u2014 exploit quickly before invertebrate activity degrades the nutritional quality. A fresh small carcass is worth a brief ground-level exposure.",
      scienceNote: "Forensic entomology studies of carcass decomposition sequences in tropical forest conditions show blow fly (Calliphoridae) colonisation beginning within 10 minutes of death. Calliphorid fossils are known from Eocene amber, confirming this rapid decomposition pathway was operational."
    }
  },
  largeCarcass: {
    kind: "carcass", name: "large carcass", icon: "☠️", className: "food",
    canInvestigate: true, portions: 5, energy: 24, attraction: 38, rotRisk: 12,
    poison: null,
    seen: "A large carcass lies open in the leaf litter. It is too much food for one small animal to finish quickly, and too much scent to hide.",
    investigated: "This is a feast, and therefore a danger. Rot, scavengers, and predators may already be on the way.",
    naturalHistory: {
      title: "Large carcass",
      fieldNote: "A large carcass in the Eocene forest is a concentrated resource node that restructures local animal behaviour \u2014 scavengers converge, predators monitor, and the entire food web reorganises around it temporarily.",
      behaviour: "The carcass itself is static, but the activity around it is dynamic \u2014 scavengers feed in shifts determined by dominance, and the site cycles through predator, scavenger, and insect exploitation phases.",
      ecology: "A temporary but massive nutrient pulse feeding carrion beetles, blow flies, vulture-analogue birds, and opportunistic carnivores simultaneously. It accelerates nutrient cycling back to the soil.",
      gameplayInsight: "High caloric return but the predator monitoring the site is a serious risk. Assess the surroundings before approaching and plan an exit route before starting to feed.",
      scienceNote: "Carrion ecology \u2014 the succession of scavenger species through predictable phases \u2014 is well-studied in modern systems. Eocene carrion beetles (Silphidae) are known from Baltic amber, confirming the beetle-mediated decomposition pipeline was already operating in this period."
    }
  },

  // extra rainforest life
  anoleLizard: {
    kind: "animal", name: "anole lizard", icon: "🦎", className: "prey",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 45, size: 2, speed: 60, agility: 75, aggression: 8, food: 12,
    poison: null,
    seen: "A small anole-like lizard clings head-down to the bark, throat pulsing as it watches for insects.",
    investigated: "It is quick, light, and alert. Edible, but difficult to catch.",
    naturalHistory: {
      title: "Anole lizard",
      fieldNote: "The anole's dewlap \u2014 a retractable throat fan \u2014 functions as both territorial signal and species-recognition badge, readable at a distance by any primate paying attention.",
      behaviour: "Perches prominently on sun-warmed bark, performing rapid push-up displays and extending its dewlap in bursts. Retreats into crevices when approached.",
      ecology: "An insectivore of the mid-canopy, controlling small arthropod populations. Its dewlap display makes it conspicuous to aerial and arboreal predators.",
      gameplayInsight: "The display cycle makes it predictable \u2014 approach from below or behind during the extension phase when its attention is outward.",
      scienceNote: "Crown-group anoles have a fossil record extending into the Eocene. Their dewlap musculature and display behaviour are considered ancient within the lineage, suggesting sexual selection by colour signalling predates the Eocene."
    }
  },
  cockroach: {
    kind: "animal", name: "large cockroach", icon: "🪳", className: "food",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 30, size: 1, speed: 50, agility: 45, aggression: 2, food: 8,
    poison: null,
    seen: "A large cockroach pushes through wet leaf litter, antennae testing the air.",
    investigated: "Fast and unpleasant, but not obviously dangerous.",
    naturalHistory: {
      title: "Large cockroach",
      fieldNote: "Cockroaches have survived largely unchanged since the Carboniferous, not through armour or speed, but through metabolic flexibility and willingness to eat almost anything.",
      behaviour: "Forages along bark and leaf litter at night or in deep shade, pausing to consume organic material. Disperses rapidly into crevices when light hits them.",
      ecology: "A decomposer and scavenger cycling nutrients through dead wood and leaf litter. It serves as a calorie-dense prey item for almost every insectivore in the forest.",
      gameplayInsight: "Easy to catch in enclosed spaces and reliably edible \u2014 a low-effort protein source when nothing better is available.",
      scienceNote: "True cockroaches (Blattodea) appear in the Carboniferous and their morphology has remained conserved. Eocene amber from the Baltic and Burmese deposits preserves cockroach specimens essentially identical to modern forest species."
    }
  },
  treeFrog: {
    kind: "animal", name: "tree frog", icon: "🐸", className: "food",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 35, size: 1.5, speed: 45, agility: 60, aggression: 1, food: 10,
    poison: {severity: "mild", rank: 1, toxinType: "irritant", lethal: false, turns: 3, damage: 2, warning: "Possible skin toxin"},
    seen: "A tree frog sits bright and still on a wet leaf, its body shining with moisture.",
    investigated: "The skin looks slick and chemically defended. It may be food, but not safe food.",
    naturalHistory: {
      title: "Tree frog",
      fieldNote: "Tree frog toe pads use capillary adhesion \u2014 a thin fluid layer between the pad and substrate creates surface tension that scales with body weight, allowing adhesion on wet and vertical surfaces.",
      behaviour: "Rests on leaf surfaces and bark in a spread-limb posture during the day. Calls noisily at night from fixed positions near water. Leaps accurately between branches when disturbed.",
      ecology: "A nocturnal insectivore controlling flying and resting insect populations in the mid-canopy. Its calling position exposes it to owl predation \u2014 a cost balanced against reproductive necessity.",
      gameplayInsight: "Locate by night call during calling season. Catchable at rest during the day on leaf undersides \u2014 detection requires close search of leaf surfaces.",
      scienceNote: "Hylidae (tree frogs) have an Eocene fossil record in North America and Europe. The adhesive toe pad morphology is preserved in some Eocene specimens from European fossil sites. Capillary adhesion mechanics have been studied extensively in living hylids."
    }
  },
  slug: {
    kind: "forage", name: "large slug", icon: "🐌", className: "food",
    canInvestigate: true, portions: 1, energy: 8,
    poison: null,
    seen: "A large slug moves across a rotten branch, slow and soft-bodied. Slugs are easy food until one is not.",
    investigationDetails: [
      "The body is soft and slow, but mucus, colour, and feeding substrate matter more than speed.",
      "You check the slime trail, smell, and whether anything else has fed nearby. The clues suggest risk, not certainty.",
      "This slug type is becoming familiar. Some are harmless, some are mildly foul, and a few carry serious chemical defence."
    ],
    investigated: "Soft and easy to catch, but the mucus and colour make safety uncertain.",
    naturalHistory: {
      title: "Large slug",
      fieldNote: "Slug mucus is a composite material with properties ranging from elastic to viscous depending on stress applied \u2014 a shear-thinning hydrogel that enables locomotion and simultaneously deters predators through its persistence and chemistry.",
      behaviour: "Moves along moisture gradients across bark, rock, and leaf surfaces, grazing on fungi, algae, and plant material. Activity peaks at night and after rain.",
      ecology: "A decomposer and herbivore recycling plant and fungal material. Its mucus trail marks movement paths detectable by chemosensory predators \u2014 ground beetles and some vertebrates track it actively.",
      gameplayInsight: "Edible but the mucus is difficult to remove \u2014 rolling in leaf material before consumption reduces handling difficulty. High water content reduces caloric density but hydration value is secondary.",
      scienceNote: "Pulmonata (slugs and snails) are known from Carboniferous deposits. Eocene slugs and snails are preserved in Baltic amber and compression fossils. Slug mucus chemistry \u2014 the polymerised glycoprotein structure \u2014 is studied for biomedical applications given its unique mechanical properties."
    }
  },
  pitviper: {
    kind: "animal", name: "pitviper", icon: "🐍", className: "threat",
    dangerProfile: "venomous_ambush", temperament: "ambush", canInvestigate: true,
    fitness: 75, size: 7, speed: 45, agility: 55, aggression: 70, food: 20,
    poison: {severity: "deadly", rank: 5, toxinType: "venom", lethal: true, criticalTimer: 5, turns: 5, damage: 12, warning: "Deadly venomous bite"},
    seen: "A triangular head rests above a coil of patterned body. The stillness is deliberate.",
    investigated: "The head shape and patient stillness are enough. This is a lethal ambush predator.",
    naturalHistory: {
      title: "Pitviper",
      fieldNote: "The pit organ of viperid pit vipers detects infrared radiation with sufficient resolution to strike accurately in complete darkness \u2014 a targeting system that functions independently of vision.",
      behaviour: "Coils motionless in ambush position along animal trails and near water sources. Strike is explosive and withdraws immediately \u2014 it waits for venom to act rather than maintaining contact.",
      ecology: "An ambush predator of small mammals and birds at the forest floor and low vegetation. Its presence along travel corridors creates a persistent, invisible threat at commonly used routes.",
      gameplayInsight: "Strike comes from a coiled, stationary animal you may not see. Scan the full ground surface before committing to a descent or landing.",
      scienceNote: "Crotalinae (pit vipers) appear in the fossil record in the Oligocene, but viperid snakes are known from the Eocene. The heat-sensing pit organ is an evolutionary novelty within the viperid lineage, allowing exploitation of warm-blooded prey in low-light conditions."
    }
  },
  smallSnake: {
    kind: "animal", name: "small snake", icon: "🐍", className: "prey",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 34, size: 1.4, speed: 62, agility: 65, aggression: 6, food: 8,
    poison: null,
    seen: "A small slender snake slips across the branch, more interested in escape than a fight.",
    investigationDetails: [
      "It is small enough to be possible prey, but speed and teeth still matter.",
      "The body is narrow rather than heavy. It keeps looking for a way out.",
      "No bold warning colours or heavy coils stand out, but that does not make a careless bite safe."
    ],
    investigated: "Small, quick, and probably prey if you can catch it. Not a major threat, but not harmless in the mouth.",
    naturalHistory: {
      title: "Small snake",
      fieldNote: "Small colubrid-grade snakes occupy the ecological junction between invertebrate and small vertebrate prey \u2014 slender enough to pursue prey into crevices no other vertebrate predator can access.",
      behaviour: "Moves through dense ground cover and across bark in slow, continuous gliding motion. Investigates every crevice and burrow entrance with tongue-flick chemical sampling.",
      ecology: "A predator of frogs, small lizards, and large invertebrates. Its slender body allows access to microhabitat prey refugia, creating predation pressure in spaces most predators cannot enter.",
      gameplayInsight: "Edible and catchable. Grasp behind the head and the threat is minimal \u2014 the bite is negligible and it is a reliable protein source.",
      scienceNote: "Colubroid snakes diversified rapidly through the Eocene. Small colubrid-grade snakes in Eocene fossil assemblages show the full range of head shape specialisations associated with different prey types \u2014 egg-eaters, frog-specialists, and invertebrate hunters are all represented."
    }
  },
  defensiveSnake: {
    kind: "animal", name: "defensive small snake", icon: "🐍", className: "minor",
    dangerProfile: "bite", temperament: "defensive", canInvestigate: true,
    fitness: 42, size: 1.8, speed: 48, agility: 55, aggression: 28, food: 10,
    poison: null,
    seen: "A small snake holds its ground with its head raised slightly. It is not large, but it is ready to bite.",
    investigationDetails: [
      "This is not a large predator. The danger is the last short distance, not pursuit.",
      "Its body is slender, but the posture is defensive rather than fleeing.",
      "It might be edible, but grabbing it badly could cost more than the meal is worth."
    ],
    investigated: "Small enough to be prey, dangerous enough to punish a clumsy attack.",
    naturalHistory: {
      title: "Defensive small snake",
      fieldNote: "A non-venomous snake defending itself relies on behavioural mimicry \u2014 flattening the head to appear viper-like, hissing, and striking with a force disproportionate to its size.",
      behaviour: "Coils and elevates its head when approached, producing a defensive strike without envenomation. Breaks contact and retreats into cover at first opportunity.",
      ecology: "A predator of insects, small frogs, and lizards in the leaf litter and low shrub layer. Its defensive display deters predators that rely on visual threat assessment.",
      gameplayInsight: "The strike causes minimal damage \u2014 don't disengage purely from the visual threat. It can be killed or bypassed safely with brief exposure.",
      scienceNote: "Colubroid snakes diversified rapidly through the Eocene and Oligocene. Non-venomous defensive mimicry of venomous species is considered ancient within some lineages, though the specific evolutionary timing is difficult to establish from fossil evidence."
    }
  },
  smallConstrictor: {
    kind: "animal", name: "small constrictor", icon: "🐍", className: "minor",
    dangerProfile: "bite", temperament: "ambush", canInvestigate: true,
    fitness: 52, size: 3, speed: 34, agility: 48, aggression: 34, food: 16,
    poison: null,
    seen: "A small but thick-bodied snake lies still against the wood. It does not hurry away.",
    investigationDetails: [
      "It is not the huge constrictor that could overpower you outright, but the body is still all muscle.",
      "The thicker coils matter. This is prey only if you control the head and avoid the body wrapping around you.",
      "It lingers like a branch until movement gives it away."
    ],
    investigated: "A small constrictor: possible food, real struggle risk, and more likely to hold position than flee.",
    naturalHistory: {
      title: "Small constrictor",
      fieldNote: "Constriction as a prey-killing method is energetically costly but highly reliable \u2014 it exploits the prey animal's own breath cycle, tightening with each exhalation until circulation fails.",
      behaviour: "Hunts by slow active search and ambush from coiled rest positions in branches and ground cover. Constricts and swallows small mammals, lizards, and birds whole.",
      ecology: "A mid-level predator of small vertebrates in both arboreal and ground-level habitats. Its climbing ability makes it a threat across vertical ranges occupied by small mammals.",
      gameplayInsight: "Constriction requires contact \u2014 it cannot threaten at range. Keep distance and it cannot engage. Small enough to fight off if caught early.",
      scienceNote: "Booid constrictors were widespread in the Eocene, with giant forms like Titanoboa known from the Paleocene and smaller booid relatives abundant in Eocene tropical assemblages. Messel preserves several snake species including early boids with preserved body outline."
    }
  },
  hyracotherium: {
    kind: "animal", name: "Hyracotherium-like browser", icon: "🐴", className: "prey",
    dangerProfile: "kick", temperament: "skittish", canInvestigate: true,
    fitness: 90, size: 18, speed: 65, agility: 45, aggression: 12, food: 70,
    poison: null,
    seen: "A small Hyracotherium-like browser moves through the undergrowth, cropping leaves and pausing at every sound.",
    investigated: "It is much larger than you, nervous rather than predatory. Possible food later, but at this size a kick or panic rush could badly hurt you.",
    naturalHistory: {
      title: "Hyracotherium-like browser",
      fieldNote: "Hyracotherium is the starting point of one of the most documented evolutionary sequences in palaeontology \u2014 a dog-sized, multi-toed, forest browser that will eventually become the horse.",
      behaviour: "Browses soft leaves and fruit in dense understorey, moving cautiously with frequent head-raises to scan for predators. Bolts at speed when alarmed, threading through vegetation.",
      ecology: "A browser and frugivore of closed forest understorey. Its multi-toed feet and low-crowned teeth place it firmly in soft vegetation, not open grassland.",
      gameplayInsight: "Fast in a straight line but poor at tight turns through canopy. If you need to cross ground it occupies, move slowly \u2014 sudden movement triggers the flight response.",
      scienceNote: "Hyracotherium is an early equid from the Early Eocene of North America and Europe. It had four toes on the forefoot and three on the hind, low-crowned teeth, and inhabited dense forests \u2014 very different from modern open-country horses."
    }
  },


  coryphodon: {
    kind: "animal", name: "Coryphodon", icon: "🦛", className: "threat",
    dangerProfile: "kick", temperament: "defensive", pursuitType: "ground", canInvestigate: true,
    fitness: 100, size: 42, speed: 28, agility: 12, aggression: 42, food: 135,
    poison: null,
    seen: "A heavy Coryphodon browses near the wet margin, low head tearing at soft vegetation.",
    investigationDetails: [
      "It is not a predator, but it is far too massive to treat as safe. One careless approach could break you.",
      "Its feet sink into the mud. It belongs around wet banks, soft ground, and dense water-edge growth.",
      "The food value is enormous in theory. In practice, it is a wall of muscle, weight, and defensive panic."
    ],
    investigated: "Large, slow, and herbivorous — but not harmless. Avoid crowding it, especially on the ground or near water.",
    naturalHistory: {
      title: "Coryphodon",
      fieldNote: "Coryphodon is the largest Eocene mammal by mass in many assemblages \u2014 a hippo-analogue that controls water access by sheer presence before aquatic specialists have evolved.",
      behaviour: "Moves between feeding areas and water with slow, purposeful steps. Highly alert to disturbance near water. Will charge if cornered or approached with young present.",
      ecology: "A megaherbivore of swamp margins and lowland forest, consuming aquatic vegetation and terrestrial browse. Its wallowing behaviour modifies water margins and creates habitat for other species.",
      gameplayInsight: "Give it wide clearance near water. It charges without warning and does not abandon a threat response quickly.",
      scienceNote: "Coryphodon is the most geographically widespread Eocene mammal, found across North America, Europe, and Asia. It was a pantodont \u2014 a group with no living descendants. Brain-to-body ratio estimates suggest it had one of the smallest relative brain sizes of any known mammal."
    }
  },

  // vertebrate animals


  hedgehogLikeInsectivore: {
    kind: "animal", name: "spiny insectivore", icon: "🦔", className: "prey",
    dangerProfile: "spines", temperament: "defensive", canInvestigate: true,
    fitness: 55, size: 4, speed: 22, agility: 25, aggression: 12, food: 18,
    poison: null,
    seen: "A small spiny insect-eater noses through wet leaves, then curls tight when it notices you.",
    investigationDetails: [
      "It is not hunting you. Its defence is patience, spines, and making itself awkward to bite.",
      "The pointed coat makes a careless grab painful. It may be edible, but only if handled slowly and from the right angle.",
      "Its snuffling path through the leaf litter can reveal beetles, grubs, and disturbed rotten wood nearby."
    ],
    investigated: "A defensive spiny insectivore. Poor target for a desperate lunge, but useful as a clue to insect-rich ground.",
    naturalHistory: {
      title: "Spiny insectivore",
      fieldNote: "Convergent spiny defence appears independently in hedgehogs, tenrecs, and echidnas \u2014 any Eocene spiny insectivore represents an early experiment in the same mechanical solution to the same predation problem.",
      behaviour: "Forages noisily through leaf litter, snuffling for invertebrates. Rolls into a ball of spines instantly when startled, remaining motionless until threat passes.",
      ecology: "An insectivore and small animal predator of the forest floor. Its spines make it largely immune to small predators, limiting its main threat to large carnivores.",
      gameplayInsight: "Rolled form is invulnerable. Wait for it to unroll before attempting predation \u2014 or ignore it entirely as the cost-benefit is poor.",
      scienceNote: "Erinaceidae (hedgehogs and gymnures) have a fossil record extending to the Paleocene. Eocene erinaceid relatives are known from European fossil sites, including spiny forms from the Messel. Modern hedgehog spine morphology is largely unchanged from early Eocene representatives."
    }
  },
  smallMammal: {
    kind: "animal", name: "small multituberculate", icon: "🐀", className: "prey",
    dangerProfile: "bite", temperament: "skittish", canInvestigate: true,
    fitness: 60, size: 3, speed: 55, agility: 50, aggression: 10, food: 22,
    seen: "A small mammal darts between leaves. Its body is small, but its teeth are not harmless.",
    investigated: "Quick and capable of a painful bite, but poor value in a fight. Worth pursuing only when other food is scarce.",
    naturalHistory: {
      title: "Small multituberculate",
      fieldNote: "Multituberculates are the longest-lived mammal order in the fossil record \u2014 over 120 million years from Late Jurassic to Oligocene \u2014 a success story built on specialised dentition for seed and nut processing.",
      behaviour: "Forages in leaf litter and low vegetation with rapid, jerky movements. Caches food in hidden locations and returns to cached sites predictably.",
      ecology: "A seed, nut, and plant material specialist in the forest floor and low understorey. Despite their eventual extinction, multituberculates competed successfully with early placental rodents for tens of millions of years.",
      gameplayInsight: "Cache return behaviour makes it predictable \u2014 identify a cached food site and wait for the animal to return rather than pursuing it actively.",
      scienceNote: "Multituberculates (Multituberculata) persisted into the Eocene but declined rapidly following rodent diversification. Their multi-cusped teeth were highly efficient for processing hard plant material \u2014 a specialisation that nonetheless became evolutionarily outcompeted."
    }
  },
  smallBird: {
    kind: "animal", name: "small bird", icon: "🐦", className: "prey",
    dangerProfile: "minor", temperament: "skittish", canInvestigate: true,
    fitness: 50, size: 2, speed: 70, agility: 80, aggression: 5, food: 18,
    seen: "A small bird shifts on a branch, alert to every movement.",
    investigated: "Too fast to catch by direct approach. Wait near a known feeding perch and intercept rather than pursue.",
    naturalHistory: {
      title: "Small bird",
      fieldNote: "Small passerine-grade birds represent the success of the neornithine radiation \u2014 small, fast, metabolically intense, and able to exploit food resources in milliseconds of decision time.",
      behaviour: "Flits between branch tips with nervous speed, feeding on insects and small fruit. Reacts to any fast movement with immediate flush to nearby dense cover.",
      ecology: "An insectivore and occasional frugivore creating significant predation pressure on canopy invertebrates. Its density and mobility distribute seed dispersal across wide areas.",
      gameplayInsight: "Fast flush reaction makes direct approach ineffective. Wait at cover near a known feeding perch and intercept rather than pursue.",
      scienceNote: "Passeriform birds radiated explosively in the Eocene-Oligocene. Messel preserves numerous small bird species including early relatives of rollers, kingfishers, and parrots, though true passerines appear to diversify later. Small bird faunas were highly diverse by the mid-Eocene."
    }
  },
  rivalPrimate: {
    kind: "animal", name: "rival tree-climber", icon: "🐒", className: "primate",
    dangerProfile: "fight", temperament: "territorial", canInvestigate: true,
    fitness: 85, size: 5, speed: 45, agility: 70, aggression: 45, food: 30,
    seen: "Another small tree-climber freezes among the branches. For a moment, both of you judge the distance.",
    investigated: "Another tree-climber: competitive, aware, and capable of real injury in a fight. This is a territorial dispute, not a predation encounter. Signal clearly before it escalates.",
    naturalHistory: {
      title: "Rival tree-climber",
      fieldNote: "A conspecific or closely related competitor understands your resources, your movement patterns, and your vulnerabilities better than any other predator \u2014 primate rivalry is cognitively sophisticated.",
      behaviour: "Patrols a defined canopy territory with frequent visual and vocal assertion. Responds to intrusion with escalating signals \u2014 branch-shaking, calls, direct approach \u2014 before physical contact.",
      ecology: "An arboreal frugivore and insectivore directly competing for identical resources. Its territory excludes you from its best food patches unless you can displace it.",
      gameplayInsight: "Displacement is possible through direct confrontation, but injury risk is real. Stealth entry into its territory during its absence is safer for resource access.",
      scienceNote: "Primate territoriality and resource competition are among the most studied aspects of primate ecology. Eocene adapiforms and omomyiforms both show evidence of social grouping and intraspecific competition from dental wear patterns and body size sexual dimorphism in fossil specimens."
    }
  },
  constrictor: {
    kind: "animal", name: "large constrictor", icon: "🐍", className: "threat",
    dangerProfile: "grapple", temperament: "ambush", canInvestigate: true,
    fitness: 80, size: 11, speed: 35, agility: 50, aggression: 65, food: 35,
    seen: "A heavy-bodied constrictor lies across the wood, so still it could be mistaken for vine.",
    investigationDetails: [
      "The branch-shape has muscle under it. The stillness is hunting, not rest.",
      "Its head is already angled towards you. If you close badly, it can seize and coil before you can pull free.",
      "It is food only in theory. The practical lesson is distance, height, and not giving it another turn beside you."
    ],
    investigated: "At this size it is not prey; it is a trap with muscle. In branches, one bad approach can become a coil you cannot escape.",
    knowledgeTierText: [
      "You watch the large constrictor carefully, learning to distinguish it from vine.",
      "You notice that the head turns slowly, tracking without committing.",
      "You understand its hunting method: stillness, patience, then a single decisive movement.",
      "You have watched the large constrictor enough to know exactly how close is too close.",
      "Full knowledge: the large constrictor."
    ],
    naturalHistory: {
      title: "Large constrictor",
      fieldNote: "The constrictor does not need to be faster than you. It needs to be close enough once, and patient enough to wait for that moment. In branches, the closing distance is much shorter than on the ground.",
      behaviour: "An ambush predator that relies on stillness and disguise. It does not pursue over long distances. Its threat is the space between you and it, which it reduces incrementally.",
      ecology: "A top arboreal ambush predator. Large enough to take significant prey. Its presence drives smaller animals to change feeding routes and resting choices within its territory.",
      gameplayInsight: "Distance and route choice are your defences. The constrictor cannot sprint, but it does not need to. Multiple investigations of the same individual dramatically increase reaction risk.",
      scienceNote: "Large non-venomous constrictors have existed since the Cretaceous. Eocene giant snakes included relatives of modern boas and pythons. Titanoboa, the largest snake ever recorded, lived in the Palaeocene of South America — a world with different constraints than the Eocene Messel forests."
    }
  },
  groundCarnivore: {
    kind: "animal", name: "mesonychid-like ground predator", icon: "🐺", className: "predator",
    dangerProfile: "fatal", temperament: "hunter", canInvestigate: true,
    pursuitType: "ground", fitness: 100, size: 55, speed: 82, agility: 35, aggression: 94, food: 150,
    seen: "A long-jawed ground predator moves between the trees below. On the ground, and even in low scrub, you are not built to survive it.",
    investigated: "Built for ground speed. The mid-storey limits its reach, but do not test the transition. Climb and do not come down while it is present.",
    knowledgeTierText: [
      "You observe the mesonychid-like predator from a safe distance.",
      "You note its stride — long, covering ground faster than its bulk suggests.",
      "You understand that it owns the forest floor. Its weakness is vertical space.",
      "You have watched it long enough to know it rarely looks up unless forced to.",
      "Full knowledge: the mesonychid-like ground predator."
    ],
    naturalHistory: {
      title: "Mesonychid-like ground predator",
      fieldNote: "This is the animal that made the Eocene forest floor dangerous for anything that could not climb. It is built for distance and force rather than precision, which means open ground is its domain and the canopy is your advantage.",
      behaviour: "A pursuit hunter. It does not ambush — it identifies prey and closes the distance with sustained speed. On uneven ground it is slower; on open paths it is overwhelming.",
      ecology: "A dominant carnivore of the Eocene forest floor. It competes with other large predators and will displace smaller hunters from kills. Its presence on the ground reshapes where other animals feed and move.",
      gameplayInsight: "There is no winning in direct encounter. Your survival depends entirely on being where it cannot follow: branches, canopy, vertical distance. If it has already closed, options are gone.",
      scienceNote: "Mesonychids were hoofed, wolf-sized carnivores that were apex predators of the Eocene. They were once thought to be ancestors of whales; molecular evidence has since clarified the lineage. Their teeth were adapted for crushing bone and flesh, unlike any modern carnivore."
    }
  },
  climbingHunter: {
    kind: "animal", name: "miacid-like climbing hunter", icon: "🐈", className: "predator",
    dangerProfile: "predator", temperament: "hunter", canInvestigate: true,
    pursuitType: "climber", fitness: 95, size: 24, speed: 72, agility: 86, aggression: 86, food: 95,
    seen: "A miacid-like hunter moves with sudden precision. Low branches will not save you, and even canopy routes only buy distance.",
    investigated: "A canopy predator that hunts by angle and patience. It cannot be outrun once it commits. Your window is before it reads the gap.",
    investigationDetails: [
      "You study the way it distributes weight before committing to a branch. There is no wasted movement.",
      "You notice a pause before it repositions — a brief recalculation, not hesitation. It is reading the gaps in the canopy.",
      "You understand now that it does not need to be faster than you on every branch. It only needs the right angle once."
    ],
    knowledgeTierText: [
      "You notice the miacid-like hunter with sharper eyes than before.",
      "You recognise the stiff pause before it springs — the moment its weight shifts forward.",
      "You understand that low branches only slow it; they do not stop it.",
      "You have watched this hunter long enough to know where its patience ends.",
      "Full knowledge: the miacid-like climbing hunter."
    ],
    naturalHistory: {
      title: "Miacid-like climbing hunter",
      fieldNote: "The miacid-like climbing hunter fills the same uneasy space later occupied by small carnivorans: a tree-capable predator, fast enough to punish hesitation and patient enough to follow. It does not need to be the fastest animal in the canopy. It only needs to be faster than its quarry at the moment that matters.",
      behaviour: "It hunts by repositioning rather than charging. It reads branch structure and uses angles of attack that cut off retreat. Repeated investigation will reveal a characteristic pre-spring pause as it locks its footing.",
      ecology: "An apex predator of the mid-canopy. It can move through all arboreal layers and will follow prey from undergrowth to emergent canopy. Ground pursuit is slower, but it does not easily abandon a chase.",
      gameplayInsight: "Distance and vertical movement buy time, not safety. Moving to higher layers gives more options, but this animal can follow. Your best survival window is the moment before it commits.",
      scienceNote: "Miacids were small carnivoraforms of the Eocene, among the earliest mammals with the body plan that would lead to modern carnivores. Whether they were primarily arboreal is debated, but their retractile-adjacent claws and flexible limbs suggest significant climbing ability."
    }
  }
};

// NOTE: A previous build kept an unused extraInverts object here.
// Those species now live directly in encounters{} above, so spawn-table
// validation has a single source of truth.



/* ===== data-spawn.js ===== */
// [DATA-SPAWN] SPAWN TABLES
// ---------------------------------------------------------------------------
// Layer-specific spawn tables. Each entry is [encounterKey, chance].
// Keys must exist in encounters{}.
// Actual probability is also affected by distance, weather, and water checks.
const encounterTables = {
  "Ground": [
    ["largeInsect", 0.045], ["cockroach", 0.045], ["woodGrub", 0.035],
    ["shieldBug", 0.025], ["plantHopper", 0.025], ["grasshopper", 0.025], ["cricket", 0.024], ["cicada", 0.012],
    ["titanomyrma", 0.025], ["antSwarm", 0.006], ["titanomyrmaSwarm", 0.004], ["wasp", 0.02],
    ["scorpion", 0.022], ["snail", 0.032], ["slug", 0.032],
    ["centipede", 0.028], ["millipede", 0.032], ["frog", 0.03],
    ["toad", 0.024], ["turtle", 0.014], ["messelornis", 0.018],
    ["redBerries", 0.030], ["purpleBerries", 0.028], ["bitterLeaves", 0.030], ["fallenFruit", 0.030], ["laurelDrupe", 0.018], ["palmFruit", 0.016], ["nypaFruit", 0.010], ["vitisBerries", 0.014], ["menispermBerry", 0.010], ["resinousFruit", 0.010], ["podFruit", 0.010], ["rainPuddle", 0.030],
    ["magnoliaFlowers", 0.018], ["hibiscusFlowers", 0.016], ["roseFamilyBlossoms", 0.024], ["citrusBlossoms", 0.012], ["bananaTypeFlowers", 0.010], ["palmFlowers", 0.014],
    ["largeGroundNest", 0.018], ["termiteMound", 0.028], ["nuts", 0.035], ["paleMushroom", 0.028], ["brownMushroom", 0.03],
    ["cycadSeeds", 0.012], ["spurgeCapsules", 0.010], ["aroidShoots", 0.018], ["gingerRhizomes", 0.016], ["treeFernFiddleheads", 0.014], ["waterLilySeedPods", 0.008],
    ["smallCarcass", 0.02], ["largeCarcass", 0.01], ["smallMammal", 0.035], ["hedgehogLikeInsectivore", 0.018],
    ["leptictidium", 0.023], ["amphiperatherium", 0.018], ["hyracotherium", 0.012], ["coryphodon", 0.007],
    ["eomanis", 0.012], ["smallSnake", 0.018], ["defensiveSnake", 0.010], ["smallConstrictor", 0.008], ["constrictor", 0.016], ["pitviper", 0.014],
    ["eurheloderma", 0.006], ["cariamiform", 0.007], ["bergisuchus", 0.004],
    ["lesmesodon", 0.008], ["crocodile", 0.005], ["pakicetus", 0.004],
    ["gastornis", 0.014], ["groundCarnivore", 0.008]
  ],
  "Undergrowth": [
    ["largeInsect", 0.055], ["mantis", 0.032], ["cockroach", 0.04],
    ["orbWeaver", 0.025], ["shieldBug", 0.03], ["plantHopper", 0.035],
    ["katydid", 0.03], ["grasshopper", 0.028], ["cricket", 0.026], ["cicada", 0.016], ["leafInsect", 0.025],
    ["stickInsect", 0.025], ["titanomyrma", 0.022], ["titanomyrmaSwarm", 0.006],
    ["woodGrub", 0.04], ["termiteMound", 0.018], ["woodpeckerBird", 0.012], ["orchidBee", 0.018], ["wasp", 0.028], ["waspNest", 0.012],
    ["beehive", 0.01], ["tarantula", 0.02], ["caterpillar", 0.04],
    ["snail", 0.035], ["slug", 0.04], ["centipede", 0.032],
    ["millipede", 0.038], ["frog", 0.035], ["toad", 0.03],
    ["treeFrog", 0.032], ["poisonDartFrog", 0.008], ["bromeliadPool", 0.014], ["treeCrab", 0.008], ["gecko", 0.025],
    ["anoleLizard", 0.032], ["iguana", 0.012], ["bitterLeaves", 0.04], ["redBerries", 0.04],
    ["purpleBerries", 0.030], ["stranglerFigFruit", 0.024], ["fallenFruit", 0.026], ["laurelDrupe", 0.020], ["vitisBerries", 0.018], ["menispermBerry", 0.012], ["resinousFruit", 0.012], ["soapberryFruit", 0.010], ["podFruit", 0.010], ["pandanusFruit", 0.010], ["rainPuddle", 0.026], ["nuts", 0.03],
    ["magnoliaFlowers", 0.020], ["hibiscusFlowers", 0.020], ["roseFamilyBlossoms", 0.030], ["citrusBlossoms", 0.016], ["bananaTypeFlowers", 0.014], ["palmFlowers", 0.018],
    ["paleMushroom", 0.025], ["brownMushroom", 0.035],
    ["spurgeCapsules", 0.012], ["hollyBerries", 0.014], ["aroidShoots", 0.022], ["treeFernFiddleheads", 0.018],
    ["smallMammal", 0.045], ["hedgehogLikeInsectivore", 0.014], ["leptictidium", 0.022], ["amphiperatherium", 0.02], ["coryphodon", 0.004],
    ["smallMammal", 0.025], ["godinotia", 0.012], ["eomanis", 0.01],
    ["eurotamandua", 0.012], ["monitorLizard", 0.01], ["eurheloderma", 0.006],
    ["smallSnake", 0.020], ["defensiveSnake", 0.014], ["smallConstrictor", 0.012], ["constrictor", 0.020], ["pitviper", 0.018], ["cariamiform", 0.008],
    ["bergisuchus", 0.006], ["lesmesodon", 0.012], ["gastornis", 0.010],
    ["climbingHunter", 0.008]
  ],
  "Mid-storey": [
    ["largeInsect", 0.045], ["mantis", 0.032], ["dragonfly", 0.035],
    ["moth", 0.03], ["butterfly", 0.028], ["hummingbird", 0.018], ["orchidBee", 0.02], ["orbWeaver", 0.028],
    ["shieldBug", 0.025], ["plantHopper", 0.035], ["katydid", 0.035], ["cicada", 0.018],
    ["leafInsect", 0.035], ["stickInsect", 0.028], ["wasp", 0.032],
    ["waspNest", 0.014], ["beehive", 0.012], ["tarantula", 0.018],
    ["caterpillar", 0.04], ["woodGrub", 0.022], ["woodpeckerBird", 0.018], ["bromeliadPool", 0.018], ["treeCrab", 0.01], ["gecko", 0.03],
    ["anoleLizard", 0.04], ["iguana", 0.018], ["cockroach", 0.018],
    ["treeFrog", 0.038], ["frog", 0.018], ["poisonDartFrog", 0.006],
    ["redBerries", 0.026], ["purpleBerries", 0.032], ["stranglerFigFruit", 0.030], ["laurelDrupe", 0.024], ["palmFruit", 0.022], ["vitisBerries", 0.022], ["arilFruit", 0.014], ["custardAppleFruit", 0.014], ["resinousFruit", 0.012], ["soapberryFruit", 0.010], ["rainPuddle", 0.014], ["canopyFruit", 0.032],
    ["magnoliaFlowers", 0.024], ["hibiscusFlowers", 0.024], ["roseFamilyBlossoms", 0.026], ["citrusBlossoms", 0.020], ["bananaTypeFlowers", 0.018], ["palmFlowers", 0.022],
    ["hollyBerries", 0.010], ["milkweedFruit", 0.014],
    ["nuts", 0.025], ["birdNest", 0.035], ["smallBird", 0.04], ["woodpeckerBird", 0.022], ["hummingbird", 0.018],
    ["messelornis", 0.012], ["ramphastos", 0.02], ["fruitBat", 0.018],
    ["heterohyus", 0.018], ["kopidodon", 0.014], ["darwinius", 0.012],
    ["europolemur", 0.01], ["godinotia", 0.012], ["smallMammal", 0.03],
    ["godinotia", 0.04], ["eurotamandua", 0.012], ["monitorLizard", 0.012],
    ["smallSnake", 0.018], ["defensiveSnake", 0.012], ["smallConstrictor", 0.012], ["constrictor", 0.014], ["pitviper", 0.012], ["owl", 0.008],
    ["masillaraptor", 0.008], ["climbingHunter", 0.01]
  ],
  "Canopy": [
    ["largeInsect", 0.04], ["mantis", 0.028], ["dragonfly", 0.038],
    ["moth", 0.035], ["butterfly", 0.035], ["hummingbird", 0.025], ["orchidBee", 0.018], ["orbWeaver", 0.03],
    ["shieldBug", 0.022], ["plantHopper", 0.035], ["katydid", 0.035], ["cicada", 0.02],
    ["leafInsect", 0.04], ["stickInsect", 0.035], ["wasp", 0.032],
    ["waspNest", 0.014], ["beehive", 0.012], ["caterpillar", 0.038],
    ["gecko", 0.032], ["woodpeckerBird", 0.026], ["bromeliadPool", 0.02], ["treeCrab", 0.01], ["anoleLizard", 0.038], ["iguana", 0.02],
    ["treeFrog", 0.032], ["poisonDartFrog", 0.004], ["purpleBerries", 0.032],
    ["stranglerFigFruit", 0.034], ["canopyFruit", 0.036], ["laurelDrupe", 0.026], ["palmFruit", 0.026], ["vitisBerries", 0.024], ["arilFruit", 0.016], ["custardAppleFruit", 0.018], ["resinousFruit", 0.012], ["soapberryFruit", 0.010], ["pandanusFruit", 0.012], ["nuts", 0.02], ["birdNest", 0.042],
    ["magnoliaFlowers", 0.026], ["hibiscusFlowers", 0.026], ["roseFamilyBlossoms", 0.020], ["citrusBlossoms", 0.022], ["bananaTypeFlowers", 0.020], ["palmFlowers", 0.026],
    ["milkweedFruit", 0.010],
    ["smallBird", 0.055], ["woodpeckerBird", 0.026], ["hummingbird", 0.024], ["ramphastos", 0.025], ["fruitBat", 0.025],
    ["heterohyus", 0.022], ["kopidodon", 0.016], ["darwinius", 0.014],
    ["europolemur", 0.012], ["godinotia", 0.014], ["godinotia", 0.04],
    ["eomanis", 0.006], ["eurotamandua", 0.012], ["owl", 0.008],
    ["eagle", 0.004], ["masillaraptor", 0.01], ["smallSnake", 0.012], ["smallConstrictor", 0.008], ["pitviper", 0.006],
    ["monitorLizard", 0.006], ["climbingHunter", 0.001]
  ]
};

// << SPLIT: hiddenSubtypePools >>
const hiddenSubtypePools = {
  redBerries: [
    {label: "mildly poisonous red berries", weight: 55, poison: {severity: "mild", rank: 1, toxinType: "plant", lethal: false, turns: 4, damage: 2, warning: "Mildly poisonous berries"}, energy: 14},
    {label: "edible red berries", weight: 25, poison: null, energy: 14},
    {label: "inedible red berries", weight: 15, poison: {severity: "mild", rank: 1, toxinType: "plant", lethal: false, turns: 2, damage: 1, warning: "Stomach upset"}, energy: 8},
    {label: "dangerous red berries", weight: 5, poison: {severity: "moderate", rank: 2, toxinType: "plant", lethal: false, turns: 5, damage: 4, warning: "Strongly poisonous berries"}, energy: 14}
  ],
  purpleBerries: [
    {label: "edible purple berries", weight: 65, poison: null, energy: 16},
    {label: "mildly poisonous purple berries", weight: 20, poison: {severity: "mild", rank: 1, toxinType: "plant", lethal: false, turns: 4, damage: 2, warning: "Mildly poisonous berries"}, energy: 16},
    {label: "inedible purple berries", weight: 10, poison: {severity: "mild", rank: 1, toxinType: "plant", lethal: false, turns: 2, damage: 1, warning: "Stomach upset"}, energy: 8},
    {label: "dangerous purple berries", weight: 5, poison: {severity: "moderate", rank: 2, toxinType: "plant", lethal: false, turns: 5, damage: 4, warning: "Strongly poisonous berries"}, energy: 16}
  ],
  fallenFruit: [
    {label: "fresh fallen fruit", weight: 70, poison: null, energy: 18, alcohol: null},
    {label: "slightly fermented fallen fruit", weight: 22, poison: null, energy: 20, alcohol: {rank: 1, turns: 4, label: "mild intoxication"}},
    {label: "strongly fermented fallen fruit", weight: 8, poison: null, energy: 22, alcohol: {rank: 2, turns: 5, label: "strong intoxication"}}
  ],
  paleMushroom: [
    {label: "severely poisonous pale mushrooms", weight: 55, poison: {severity: "severe", rank: 4, toxinType: "fungal", lethal: true, criticalTimer: 7, turns: 7, damage: 7, warning: "Severely poisonous fungus"}, energy: 8},
    {label: "inedible pale mushrooms", weight: 25, poison: {severity: "moderate", rank: 2, toxinType: "fungal", lethal: false, turns: 4, damage: 3, warning: "Sickening fungus"}, energy: 6},
    {label: "edible pale mushrooms", weight: 15, poison: null, energy: 8},
    {label: "deadly pale mushrooms", weight: 5, poison: {severity: "deadly", rank: 5, toxinType: "fungal", lethal: true, criticalTimer: 5, turns: 6, damage: 10, warning: "Deadly fungus"}, energy: 8}
  ],
  brownMushroom: [
    {label: "edible brown mushrooms", weight: 65, poison: null, energy: 10},
    {label: "inedible brown mushrooms", weight: 20, poison: {severity: "mild", rank: 1, toxinType: "fungal", lethal: false, turns: 3, damage: 2, warning: "Sickening fungus"}, energy: 7},
    {label: "poisonous brown mushrooms", weight: 12, poison: {severity: "moderate", rank: 2, toxinType: "fungal", lethal: false, turns: 5, damage: 4, warning: "Poisonous fungus"}, energy: 8},
    {label: "deadly brown mushrooms", weight: 3, poison: {severity: "deadly", rank: 5, toxinType: "fungal", lethal: true, criticalTimer: 5, turns: 6, damage: 10, warning: "Deadly fungus"}, energy: 8}
  ],
  caterpillar: [
    {label: "irritating hairy caterpillar", weight: 50, poison: {severity: "mild", rank: 1, toxinType: "irritant", lethal: false, turns: 3, damage: 2, warning: "Irritating hairs / possible toxin"}},
    {label: "edible hairy caterpillar", weight: 20, poison: null},
    {label: "toxic hairy caterpillar", weight: 25, poison: {severity: "moderate", rank: 2, toxinType: "irritant", lethal: false, turns: 4, damage: 4, warning: "Toxic hairs"}},
    {label: "dangerous hairy caterpillar", weight: 5, poison: {severity: "severe", rank: 4, toxinType: "irritant", lethal: true, criticalTimer: 7, turns: 7, damage: 7, warning: "Severe caterpillar toxin"}}
  ],
  millipede: [
    {label: "chemically defended millipede", weight: 45, poison: {severity: "moderate", rank: 2, toxinType: "irritant", lethal: false, turns: 4, damage: 3, warning: "Chemical defence"}, energy: 6},
    {label: "harmless millipede mimic", weight: 25, poison: null, energy: 6},
    {label: "mildly irritating millipede", weight: 20, poison: {severity: "mild", rank: 1, toxinType: "irritant", lethal: false, turns: 3, damage: 2, warning: "Bitter defensive fluid"}, energy: 6},
    {label: "dangerously toxic millipede", weight: 10, poison: {severity: "severe", rank: 4, toxinType: "irritant", lethal: true, criticalTimer: 7, turns: 6, damage: 7, warning: "Strong chemical toxin"}, energy: 6}
  ],
  slug: [
    {label: "edible large slug", weight: 45, poison: null, energy: 8},
    {label: "foul-tasting slug", weight: 25, poison: {severity: "mild", rank: 1, toxinType: "irritant", lethal: false, turns: 3, damage: 2, warning: "Irritating mucus"}, energy: 6},
    {label: "poisonous slug", weight: 22, poison: {severity: "moderate", rank: 2, toxinType: "irritant", lethal: false, turns: 5, damage: 4, warning: "Poisonous slug mucus"}, energy: 6},
    {label: "dangerously poisonous slug", weight: 8, poison: {severity: "severe", rank: 4, toxinType: "irritant", lethal: true, criticalTimer: 7, turns: 6, damage: 7, warning: "Severe slug toxin"}, energy: 6}
  ],
  largeInsect: [
    {label: "edible hard-shelled beetle", weight: 45, poison: null, energy: 10},
    {label: "bitter chemical beetle", weight: 25, poison: {severity: "mild", rank: 1, toxinType: "irritant", lethal: false, turns: 3, damage: 2, warning: "Bitter chemical defence"}, energy: 8},
    {label: "biting ground beetle", weight: 20, poison: null, energy: 9, aggression: 35, dangerProfile: "bite"},
    {label: "toxic beetle mimic", weight: 10, poison: {severity: "moderate", rank: 2, toxinType: "irritant", lethal: false, turns: 4, damage: 4, warning: "Caustic beetle chemicals"}, energy: 8}
  ],
  butterfly: [
    {label: "harmless bright butterfly", weight: 30, poison: null, energy: 5},
    {label: "mildly toxic butterfly", weight: 35, poison: {severity: "mild", rank: 1, toxinType: "plant", lethal: false, turns: 3, damage: 2, warning: "Toxic wing scales / stored plant toxin"}, energy: 5},
    {label: "strongly toxic butterfly", weight: 20, poison: {severity: "moderate", rank: 2, toxinType: "plant", lethal: false, turns: 5, damage: 4, warning: "Stored plant toxin"}, energy: 5},
    {label: "warning-colour mimic butterfly", weight: 15, poison: null, energy: 5}
  ],
  moth: [
    {label: "edible soft moth", weight: 55, poison: null, energy: 6},
    {label: "bitter moth", weight: 20, poison: {severity: "mild", rank: 1, toxinType: "plant", lethal: false, turns: 3, damage: 2, warning: "Bitter wing scales"}, energy: 6},
    {label: "toxic moth", weight: 15, poison: {severity: "moderate", rank: 2, toxinType: "plant", lethal: false, turns: 4, damage: 4, warning: "Stored plant toxin"}, energy: 6},
    {label: "plain-looking toxic moth", weight: 10, poison: {severity: "moderate", rank: 2, toxinType: "plant", lethal: false, turns: 5, damage: 4, warning: "Hidden plant toxin"}, energy: 6}
  ],
  hollyBerries: [
    {label: "edible holly-like berries", weight: 20, poison: null, energy: 8},
    {label: "mildly toxic holly-like berries", weight: 55, poison: {severity: "mild", rank: 1, toxinType: "ilicin", lethal: false, turns: 3, damage: 2, warning: "Mild ilicin — dry mouth and nausea."}, energy: 8},
    {label: "toxic holly-like berries", weight: 25, poison: {severity: "moderate", rank: 2, toxinType: "ilicin", lethal: false, turns: 4, damage: 3, warning: "Ilicin and saponins — vomiting and cramping."}, energy: 8}
  ],
  aroidShoots: [
    {label: "edible aroid shoots", weight: 30, poison: null, energy: 7},
    {label: "mildly irritant aroid shoots", weight: 50, poison: {severity: "mild", rank: 1, toxinType: "oxalate", lethal: false, turns: 3, damage: 2, warning: "Raphide crystals — burning in mouth and throat."}, energy: 6},
    {label: "severely irritant aroid shoots", weight: 20, poison: {severity: "moderate", rank: 2, toxinType: "oxalate", lethal: false, turns: 5, damage: 4, warning: "Dense raphide load — severe mucosal inflammation."}, energy: 5}
  ]
};
