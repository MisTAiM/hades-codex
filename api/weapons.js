// /api/weapons.js — Vercel Serverless Function
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-maxage=3600');

  res.json({
    version: '1.2.0',
    weapons: [
      { id: 'blade', name: 'Stygian Blade', topAspect: 'Nemesis', tier: 'S', primaryGod: 'Artemis', duoTarget: 'Crystal Clarity' },
      { id: 'spear', name: 'Eternal Spear', topAspect: 'Achilles', tier: 'S', primaryGod: 'Ares', duoTarget: 'Hunting Blades' },
      { id: 'shield', name: 'Shield of Chaos', topAspect: 'Zeus', tier: 'S', primaryGod: 'Zeus', duoTarget: 'Sea Storm' },
      { id: 'bow', name: 'Heart-Seeking Bow', topAspect: 'Hera', tier: 'S', primaryGod: 'Artemis', duoTarget: 'Lightning Rod' },
      { id: 'rail', name: 'Adamant Rail', topAspect: 'Eris', tier: 'S', primaryGod: 'Aphrodite', duoTarget: 'Smoldering Air' },
      { id: 'fists', name: 'Twin Fists of Malphon', topAspect: 'Talos', tier: 'S', primaryGod: 'Dionysus', duoTarget: 'Ice Wine' }
    ]
  });
};
