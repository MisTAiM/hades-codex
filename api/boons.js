// /api/boons.js — Vercel Serverless Function
// Returns all boon data as JSON

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-maxage=3600');

  const boons = [
    { name: 'Divine Dash', god: 'Athena', type: 'Dash', effect: 'Dash deflects all projectiles and attacks.' },
    { name: 'Divine Strike', god: 'Athena', type: 'Attack', effect: 'Attack deflects projectiles on hit.' },
    { name: 'Holy Shield', god: 'Athena', type: 'Special', effect: 'Special deflects projectiles and adds barrier.' },
    { name: 'Brilliant Riposte', god: 'Athena', type: 'Deflect', effect: 'Deflecting deals +50% extra damage.' },
    { name: 'Deadly Strike', god: 'Artemis', type: 'Attack', effect: '+20% base crit chance on attack.' },
    { name: 'Deadly Flourish', god: 'Artemis', type: 'Special', effect: '+20% base crit chance on special.' },
    { name: 'Exit Wounds', god: 'Artemis', type: 'Cast', effect: 'Dislodged bloodstones deal 100 bonus damage.' },
    { name: 'Pressure Points', god: 'Artemis', type: 'Passive', effect: 'All damage has +1.5% crit chance.' },
    { name: 'Clean Kill', god: 'Artemis', type: 'Crit', effect: 'Crit hits deal +300% to weakened enemies.' },
    { name: 'Drunken Strike', god: 'Dionysus', type: 'Attack', effect: 'Attack inflicts Hangover DoT (stacks to 5).' },
    { name: 'Trippy Shot', god: 'Dionysus', type: 'Cast', effect: 'Cast drops AoE Festive Fog with Hangover + stun.' },
    { name: 'Premium Vintage', god: 'Dionysus', type: 'Passive', effect: '+1 Hangover stack on all Hangover attacks.' },
    { name: 'Numbing Sensation', god: 'Dionysus', type: 'Passive', effect: 'Hangover foes move 10% slower.' },
    { name: 'Lightning Strike', god: 'Zeus', type: 'Attack', effect: 'Attack fires chain lightning to nearby foes.' },
    { name: 'Double Strike', god: 'Zeus', type: 'Attack', effect: '20% chance for lightning to strike twice.' },
    { name: 'Splitting Bolt', god: 'Zeus', type: 'Special', effect: 'Special fires 3 bolts of lightning.' },
    { name: 'Static Discharge', god: 'Zeus', type: 'Passive', effect: 'Jolted foes also pulse lightning to neighbors.' },
    { name: 'Frost Strike', god: 'Demeter', type: 'Attack', effect: 'Attack inflicts Chill. 10 stacks = burst AoE.' },
    { name: 'Crystal Beam', god: 'Demeter', type: 'Cast', effect: 'Cast fires a continuous Chill beam.' },
    { name: 'Rare Crop', god: 'Demeter', type: 'Passive', effect: 'Boon rarity one tier higher — critical for scaling.' },
    { name: 'Heartbreak Strike', god: 'Aphrodite', type: 'Attack', effect: '+70% attack damage + Weak status.' },
    { name: 'Heartbreak Flourish', god: 'Aphrodite', type: 'Special', effect: '+80% special damage + Weak status.' },
    { name: 'Dying Lament', god: 'Aphrodite', type: 'Death', effect: 'Enemies emit shockwave on death while Weak.' },
    { name: 'Curse of Pain', god: 'Ares', type: 'Special', effect: 'Special inflicts Doom — delayed massive damage.' },
    { name: 'Urge to Kill', god: 'Ares', type: 'Attack', effect: 'Attack inflicts Doom.' },
    { name: 'Impending Doom', god: 'Ares', type: 'Doom', effect: 'Doom triggers +2s later but deals +100% more.' },
    { name: 'Tidal Dash', god: 'Poseidon', type: 'Dash', effect: 'Dash knocks back enemies for bonus damage.' },
    { name: 'Typhoon Fury', god: 'Poseidon', type: 'Attack', effect: 'Attack knocks back + applies Rupture.' },
    { name: 'Greater Haste', god: 'Hermes', type: 'Passive', effect: '+10% permanent attack speed. Stacks multiplicatively.' },
    { name: 'Quick Reload', god: 'Hermes', type: 'Cast', effect: 'Bloodstones return faster — critical for Cast builds.' }
  ];

  res.json({
    version: '1.2.0',
    boonCount: boons.length,
    updated: new Date().toISOString().split('T')[0],
    boons
  });
};
