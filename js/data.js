const HADES = {
  weapons: [
    {
      id: 'blade',
      name: 'Stygian Blade',
      subtitle: 'Sword of the Underworld',
      color: '#c0a060',
      icon: 'M12 2 L14 20 L12 22 L10 20 Z M8 10 L16 10 M11 20 L13 20',
      aspects: [
        { name: 'Nemesis', tier: 'S', summary: '+15% crit after Special, 3s window. Stack Artemis endlessly.' },
        { name: 'Arthur', tier: 'A', summary: 'Sacred aura +50HP buffer. Sea Storm duo = AoE obliteration.' },
        { name: 'Poseidon', tier: 'A', summary: 'Attack dislodges Casts. Exit Wounds = 100 dmg per shard.' },
        { name: 'Zagreus', tier: 'B', summary: 'Dash-strike buff. Solid for beginners.' },
        { name: 'Guan Yu', tier: 'B', summary: 'Unlocked later, spin-heal mechanic.' }
      ],
      topBuild: {
        primary: 'Artemis',
        secondary: 'Aphrodite',
        duo: 'Crystal Clarity',
        daedalus: 'Cursed Slash',
        playstyle: 'Crit Burst',
        difficulty: 'Beginner'
      },
      description: 'The first weapon Zagreus wields. Fast, reliable, with devastating Aspects that can melt any boss.',
      statDamage: 85,
      statSpeed: 75,
      statRange: 50,
      statDef: 40
    },
    {
      id: 'spear',
      name: 'Eternal Spear',
      subtitle: "Hades' Own Weapon",
      color: '#a0c0ff',
      icon: 'M12 2 L13.5 6 L12 7 L10.5 6 Z M12 7 L12 22 M10 14 L14 14',
      aspects: [
        { name: 'Achilles', tier: 'S', summary: 'Special lines deal Doom. Stack Ares — fastest boss clear.' },
        { name: 'Hades', tier: 'A', summary: "Hidden aspect. Mimics Lord Hades' true power." },
        { name: 'Zagreus', tier: 'B', summary: 'Spin-dash combo. Fun but outclassed.' },
        { name: 'Guan Yu', tier: 'A', summary: 'Frost Fair Blade spin heals. Demeter sustain = immortal.' },
        { name: 'Hera', tier: 'B', summary: 'Cast-loaded shots. Niche but effective.' }
      ],
      topBuild: {
        primary: 'Ares',
        secondary: 'Athena',
        duo: 'Hunting Blades',
        daedalus: 'Flurry Jab',
        playstyle: 'DoT Nuke',
        difficulty: 'Intermediate'
      },
      description: 'Range and area control. The Achilles aspect turns your Special into a Doom machine that melts rooms.',
      statDamage: 80,
      statSpeed: 60,
      statRange: 85,
      statDef: 45
    },
    {
      id: 'shield',
      name: 'Shield of Chaos',
      subtitle: 'Aegis, First of Weapons',
      color: '#ff8844',
      icon: 'M12 3 L20 7 L20 15 L12 21 L4 15 L4 7 Z',
      aspects: [
        { name: 'Zeus', tier: 'S', summary: 'Bouncing shield + chain lightning. Sea Storm duo = auto-clear.' },
        { name: 'Beowulf', tier: 'A', summary: 'Dragon Rush cast-loaded charge. Boss destruction.' },
        { name: 'Chaos', tier: 'A', summary: 'Charged Shot instead of Bull Rush. Sniper playstyle.' },
        { name: 'Zagreus', tier: 'B', summary: 'Dash-strike bonus. Defensive but safe.' },
        { name: 'Achilles', tier: 'B', summary: 'Special pierces — Doom + Ares is decent.' }
      ],
      topBuild: {
        primary: 'Zeus',
        secondary: 'Poseidon',
        duo: 'Sea Storm',
        daedalus: 'Explosive Return',
        playstyle: 'Passive AoE',
        difficulty: 'Beginner'
      },
      description: 'The safest weapon. Aspect of Zeus makes rooms die while you watch. Holding attack blocks frontal damage.',
      statDamage: 70,
      statSpeed: 55,
      statRange: 65,
      statDef: 95
    },
    {
      id: 'bow',
      name: 'Heart-Seeking Bow',
      subtitle: 'Coronacht, Swift Death',
      color: '#c090ff',
      icon: 'M6 4 Q12 12 6 20 M6 4 L18 12 L6 20 M18 12 L4 12',
      aspects: [
        { name: 'Hera', tier: 'S', summary: 'Cast-loaded arrows. Exit Wounds + Quick Reload = highest single-target DPS.' },
        { name: 'Rama', tier: 'A', summary: 'Holy Excalibur bolts AoE. Dionysus Special poison = room delete.' },
        { name: 'Chiron', tier: 'A', summary: 'Special seeks last target. Multi-target Doom perfection.' },
        { name: 'Zagreus', tier: 'B', summary: 'Homing arrows. Reliable and easy.' },
        { name: 'Artemis', tier: 'B', summary: 'Cast on crit. Solid but needs investment.' }
      ],
      topBuild: {
        primary: 'Artemis',
        secondary: 'Hermes',
        duo: 'Lightning Rod',
        daedalus: 'Relentless Volley',
        playstyle: 'Cast Sniper',
        difficulty: 'Intermediate'
      },
      description: 'High damage floor but slow. Rewards planning your build before picking up the bow.',
      statDamage: 90,
      statSpeed: 45,
      statRange: 95,
      statDef: 30
    },
    {
      id: 'rail',
      name: 'Adamant Rail',
      subtitle: 'Exagryph, the Godkiller',
      color: '#ff4466',
      icon: 'M4 10 L16 10 L18 8 L20 9 L18 11 L16 12 L4 12 Z M4 11 L2 11',
      aspects: [
        { name: 'Eris', tier: 'S', summary: 'After 3k dmg, +60% bonus. Aphrodite gets you there immediately.' },
        { name: 'Hestia', tier: 'A', summary: 'Every 4th shot: fire slug, ignores armor. Slow weapons love Aphrodite %.' },
        { name: 'Lucifer', tier: 'A', summary: 'Hidden. Continuous beam replaces shots. Unique annihilation playstyle.' },
        { name: 'Zagreus', tier: 'B', summary: 'Boost on Boost — ammo regen. Solid workhorse.' },
        { name: 'Hera', tier: 'B', summary: 'Piercing shot variant. Niche corridor utility.' }
      ],
      topBuild: {
        primary: 'Aphrodite',
        secondary: 'Artemis',
        duo: 'Smoldering Air',
        daedalus: 'Concentrated Fire',
        playstyle: 'Ramp & Melt',
        difficulty: 'Intermediate'
      },
      description: 'Machine gun + grenade launcher. Eris aspect is one of the most broken builds when properly set up.',
      statDamage: 88,
      statSpeed: 90,
      statRange: 80,
      statDef: 25
    },
    {
      id: 'fists',
      name: 'Twin Fists of Malphon',
      subtitle: 'Raw Chaos Unleashed',
      color: '#44ffaa',
      icon: 'M8 6 Q6 8 6 12 Q6 16 8 18 L10 18 L10 6 Z M14 6 Q16 8 16 12 Q16 16 14 18 L12 18 L12 6 Z',
      aspects: [
        { name: 'Talos', tier: 'S', summary: 'Magnetic Special pulls enemies. Dionysus = instant 5-stack Hangover per combo.' },
        { name: 'Demeter', tier: 'A', summary: 'Chain hits spread. Ares Doom on all = room-wide explosion.' },
        { name: 'Gilgamesh', tier: 'A', summary: 'Hidden. Maim debuff + charged uppercut. High skill ceiling.' },
        { name: 'Zagreus', tier: 'B', summary: 'Dash-through enemies. Chaos god boons thrive here.' },
        { name: 'Achilles', tier: 'B', summary: 'Parry mechanic — strong with practice.' }
      ],
      topBuild: {
        primary: 'Dionysus',
        secondary: 'Demeter',
        duo: 'Ice Wine',
        daedalus: 'Draining Cutter',
        playstyle: 'On-Hit Storm',
        difficulty: 'Advanced'
      },
      description: 'Fastest attack speed in the game. Every on-hit effect procs multiple times per second. True chaos.',
      statDamage: 75,
      statSpeed: 100,
      statRange: 35,
      statDef: 50
    }
  ],

  gods: [
    {
      id: 'athena',
      name: 'Athena',
      role: 'Goddess of Wisdom',
      tier: 'S',
      color: '#d4af37',
      accent: '#fff5cc',
      status: 'Deflect',
      description: 'Every run benefits from Athena. Divine Dash is the single best defensive boon in the game — projectile deflection changes everything. Her Call scales with your total DPS.',
      signature: 'Divine Dash — deflect all projectiles during dash',
      call: 'Brief invulnerability + scales with your damage output',
      topBoons: ['Divine Dash', 'Divine Strike', 'Holy Shield', 'Brilliant Riposte'],
      duos: ['Crystal Clarity (Artemis)', 'Smoldering Air (Zeus)', 'Curse of Longing (Ares)'],
      rating: 97
    },
    {
      id: 'artemis',
      name: 'Artemis',
      role: 'Goddess of the Hunt',
      tier: 'S',
      color: '#9370db',
      accent: '#e8d5ff',
      status: 'Critical',
      description: 'Critical hits have the highest damage ceiling in the game. Pressure Points gives global crit chance. Essential for Cast builds via Exit Wounds.',
      signature: 'Pressure Points — all hits have crit chance',
      call: 'Homing arrows target every enemy on screen',
      topBoons: ['Deadly Strike', 'Pressure Points', 'Exit Wounds', 'Clean Kill'],
      duos: ['Hunting Blades (Ares)', 'Lightning Rod (Zeus)', 'Crystal Clarity (Athena)'],
      rating: 95
    },
    {
      id: 'demeter',
      name: 'Demeter',
      role: 'Goddess of Harvest',
      tier: 'A',
      color: '#5ba4cf',
      accent: '#d0eeff',
      status: 'Chill',
      description: 'Best percentage damage boosts of any god. Chill slows enemies to a crawl at 10 stacks. Her Duos are all top tier. Unlocked mid-story.',
      signature: 'Frost Strike — attack applies Chill stacks',
      call: 'Massive AoE blizzard around Zagreus',
      topBoons: ['Frost Strike', 'Crystal Beam', 'Winter Harvest', 'Rare Crop'],
      duos: ['Cold Fusion (Zeus)', 'Ice Wine (Dionysus)', 'Blizzard Shot (Poseidon)'],
      rating: 90
    },
    {
      id: 'dionysus',
      name: 'Dionysus',
      role: 'God of Revelry',
      tier: 'A',
      color: '#7b3f9e',
      accent: '#e8d0ff',
      status: 'Hangover',
      description: 'Hangover stacks extremely fast on fast weapons. Trippy Shot is one of the best room-clearing casts. Exclusive Access duo guarantees Epic+ boons.',
      signature: 'Drunken Strike — attack applies Hangover (DoT)',
      call: 'Massive Festive Fog AoE with stun',
      topBoons: ['Drunken Strike', 'Trippy Shot', 'Premium Vintage', 'Numbing Sensation'],
      duos: ['Exclusive Access (Poseidon)', 'Scintillating Feast (Zeus)', 'Ice Wine (Demeter)'],
      rating: 88
    },
    {
      id: 'ares',
      name: 'Ares',
      role: 'God of War',
      tier: 'A',
      color: '#cc2200',
      accent: '#ffd0cc',
      status: 'Doom',
      description: 'Doom is the highest single-instance damage effect. Achilles Spear + Ares is one of the fastest boss builds. Blade Rifts + Artemis duo = auto-win.',
      signature: 'Curse of Pain — special applies Doom',
      call: 'Invulnerability window + blade rift explosion',
      topBoons: ['Curse of Pain', 'Urge to Kill', 'Impending Doom', 'Blade Dash'],
      duos: ['Hunting Blades (Artemis)', 'Curse of Longing (Aphrodite)', 'Engulfing Vortex'],
      rating: 85
    },
    {
      id: 'aphrodite',
      name: 'Aphrodite',
      role: 'Goddess of Love',
      tier: 'A',
      color: '#ff6b9d',
      accent: '#ffe0ee',
      status: 'Weak',
      description: 'Largest flat percentage damage boosts. Weak cuts enemy damage — offensive AND defensive. Unhealthy Fixation Legendary can Charm 1-in-6 enemies.',
      signature: 'Heartbreak Strike — huge % attack damage + Weak status',
      call: 'Massive single blast — strongest damage Call in game',
      topBoons: ['Heartbreak Strike', 'Heartbreak Flourish', 'Dying Lament', 'Sweet Surrender'],
      duos: ['Smoldering Air (Zeus)', 'Curse of Longing (Ares)', 'Lovesick Lilt (Dionysus)'],
      rating: 83
    },
    {
      id: 'zeus',
      name: 'Zeus',
      role: 'King of Olympus',
      tier: 'B',
      color: '#f0c040',
      accent: '#fff8cc',
      status: 'Jolt',
      description: 'Best on fast weapons (Rail, Fists) and Zeus Shield. On-hit lightning is a separate damage source. His Duos are exceptional. Call hits for 3,750+ damage.',
      signature: 'Lightning Strike — attack triggers chain lightning',
      call: '3,750 damage lightning bolt. Strongest raw Call damage.',
      topBoons: ['Lightning Strike', 'Double Strike', 'Splitting Bolt', 'Static Discharge'],
      duos: ['Sea Storm (Poseidon)', 'Scintillating Feast (Dionysus)', 'Cold Fusion (Demeter)'],
      rating: 78
    },
    {
      id: 'hermes',
      name: 'Hermes',
      role: 'Messenger of Gods',
      tier: 'B',
      color: '#40c0a0',
      accent: '#ccfff0',
      status: 'Speed',
      description: 'No keepsake, no Duos, but appears any time. Attack/Cast speed boons multiply fast weapons enormously. Best as a support layer amplifying your primary god.',
      signature: 'Greater Haste — permanent attack speed bonus',
      call: 'Not available — Hermes has no Call boon',
      topBoons: ['Greater Haste', 'Quick Reload', 'Rush Delivery', 'Lambent Plume'],
      duos: ['None — Hermes has no duo boons'],
      rating: 72
    },
    {
      id: 'poseidon',
      name: 'Poseidon',
      role: 'God of the Sea',
      tier: 'B',
      color: '#0088cc',
      accent: '#ccecff',
      status: 'Knockback',
      description: 'S-tier on Shield of Chaos specifically. Knockback useless on bosses generally. Sea Storm duo salvages many situations. Sunken Treasure for bonus Obols.',
      signature: 'Tidal Dash — dash knocks back + bonus damage',
      call: 'Tidal wave that pushes all enemies to edges',
      topBoons: ['Tidal Dash', 'Typhoon Fury', 'Razor Shoals', 'Breaking Wave'],
      duos: ['Sea Storm (Zeus)', 'Exclusive Access (Dionysus)', 'Blizzard Shot (Demeter)'],
      rating: 68
    },
    {
      id: 'chaos',
      name: 'Chaos',
      role: 'Primordial Void',
      tier: 'C',
      color: '#6644aa',
      accent: '#ddd0ff',
      status: 'Curse/Boon',
      description: 'Unique risk/reward system. Boons debuff you for several encounters then grant powerful permanent buffs. High-risk — skip if HP-starved. Broken if you can afford the cost.',
      signature: 'Varied — each boon has unique cost + payoff',
      call: 'Not available — Chaos has no Call boon',
      topBoons: ['Cosmic Egg', 'Dark Foresight', 'Void Stone', 'Shattered Shackle'],
      duos: ['None — Chaos has no duo boons'],
      rating: 60
    }
  ],

  duoBoons: [
    { name: 'Sea Storm', gods: ['Zeus', 'Poseidon'], tier: 'S', effect: 'Knockback effects also fire 40-dmg lightning. Works on ALL knockback sources.' },
    { name: 'Scintillating Feast', gods: ['Zeus', 'Dionysus'], tier: 'S', effect: 'Trippy Shot also fires chain lightning. Poison + lightning = room obliteration.' },
    { name: 'Exclusive Access', gods: ['Dionysus', 'Poseidon'], tier: 'S', effect: 'All future boons are Epic rarity minimum. Get early for full run snowball.' },
    { name: 'Hunting Blades', gods: ['Ares', 'Artemis'], tier: 'S', effect: 'Blade Rifts seek enemies and can crit. Crit damage boons = practically auto-win.' },
    { name: 'Crystal Clarity', gods: ['Athena', 'Artemis'], tier: 'A', effect: 'Deflecting gives +20% crit chance for 2s. Applies to all damage types.' },
    { name: 'Lightning Rod', gods: ['Artemis', 'Zeus'], tier: 'A', effect: 'Dislodged bloodstones strike nearby foes with lightning. Stand-still room-clear.' },
    { name: 'Ice Wine', gods: ['Dionysus', 'Demeter'], tier: 'A', effect: 'Trippy Shot also applies Chill. Poison + slow simultaneously.' },
    { name: 'Cold Fusion', gods: ['Zeus', 'Demeter'], tier: 'A', effect: 'Jolt persists 10s on enemies. Constant chip from Chilled foes that attack.' },
    { name: 'Smoldering Air', gods: ['Zeus', 'Aphrodite'], tier: 'A', effect: 'Call gauge refills immediately. Spammable Calls — devastating with Aphrodite Aid.' },
    { name: 'Mirage Shot', gods: ['Artemis', 'Poseidon'], tier: 'B', effect: 'Cast fires a second projectile. Doubles cast output on single-target.' },
    { name: 'Curse of Longing', gods: ['Ares', 'Aphrodite'], tier: 'B', effect: 'Doom also applies Weak. Enemies deal less damage AND take delayed burst.' },
    { name: 'Blizzard Shot', gods: ['Poseidon', 'Demeter'], tier: 'B', effect: "Poseidon's cast becomes a mobile turret firing Chill bolts." }
  ],

  heatOptions: [
    { id: 'forced_overtime', name: 'Forced Overtime', category: 'Enemy', maxLevel: 5, perLevel: 'Enemies 20% faster per rank', heatPerLevel: 1 },
    { id: 'hard_labor', name: 'Hard Labor', category: 'Enemy', maxLevel: 5, perLevel: 'Enemies deal 10% more damage per rank', heatPerLevel: 1 },
    { id: 'lasting_consequences', name: 'Lasting Consequences', category: 'Player', maxLevel: 5, perLevel: 'Healing 30% less effective per rank', heatPerLevel: 1 },
    { id: 'convenience_fee', name: 'Convenience Fee', category: 'Resources', maxLevel: 3, perLevel: 'Charon charges 20% more per rank', heatPerLevel: 1 },
    { id: 'damage_control', name: 'Damage Control', category: 'Player', maxLevel: 4, perLevel: 'Lose 1 Death Defiance per rank', heatPerLevel: 2 },
    { id: 'middle_management', name: 'Middle Management', category: 'Enemies', maxLevel: 2, perLevel: 'Enemies gain armor per rank', heatPerLevel: 2 },
    { id: 'underworld_customs', name: 'Underworld Customs', category: 'Resources', maxLevel: 4, perLevel: 'Fewer boons offered per rank', heatPerLevel: 2 },
    { id: 'tight_deadline', name: 'Tight Deadline', category: 'Challenge', maxLevel: 3, perLevel: 'Timer imposed — failure on expiry', heatPerLevel: 3 },
    { id: 'extreme_measures', name: 'Extreme Measures', category: 'Bosses', maxLevel: 4, perLevel: 'Bosses gain extra phases per rank', heatPerLevel: 4 }
  ],

  mirrorUpgrades: [
    { name: 'Death Defiance', priority: 1, note: 'Non-negotiable. 3 revives. Unlock first.' },
    { name: 'Infernal Soul', priority: 2, note: 'Start with bloodstone — enables all Cast builds from room 1.' },
    { name: 'Greater Reflex', priority: 3, note: 'Extra dash. Changes your survivability completely.' },
    { name: "Stygian Soul", priority: 4, note: "Bloodstones return automatically after landing. Better for advanced players." },
    { name: "Dark Thirst", priority: 5, note: "+2 darkness per darkness pickup. Core economy upgrade." },
    { name: "Gods' Legacy", priority: 6, note: 'Increases Duo Boon chance. Unlock after first few clears.' },
    { name: 'High Confidence', priority: 7, note: '+20% damage with no Death Defiances. Late-game snowball.' },
    { name: 'Ruthless Reflex', priority: 8, note: 'Dash invuln on perfect timing. Very high skill ceiling.' }
  ]
};
