// /api/status.js — Health check + metadata
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.json({
    status: 'operational',
    version: '1.2.0',
    boonCount: 30,
    weaponCount: 6,
    godCount: 10,
    duoCount: 12,
    updated: new Date().toISOString().split('T')[0],
    endpoints: ['/api/boons', '/api/weapons', '/api/status']
  });
};
