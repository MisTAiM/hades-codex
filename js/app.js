/* ---- HADES CODEX — Main App ---- */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHero();
  renderWeapons();
  renderGods();
  renderDuoBoons();
  renderBoonDB();
  renderHeatCalc();
  renderMirror();
  initScrollAnimations();
  initCursor();
  fetchLiveData();
});

/* -------- NAV -------- */
function initNav() {
  const nav = document.getElementById('site-nav');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 80);
    nav.classList.toggle('hidden', y > lastY + 5 && y > 200);
    nav.classList.remove('hidden');
    lastY = y;
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* -------- HERO -------- */
function initHero() {
  const lines = ['ESCAPE THE UNDERWORLD.', 'MASTER YOUR FATE.', 'DEFY YOUR FATHER.'];
  let lineIdx = 0, charIdx = 0;
  const el = document.getElementById('hero-tagline');
  if (!el) return;

  function type() {
    if (charIdx < lines[lineIdx].length) {
      el.textContent = lines[lineIdx].slice(0, ++charIdx);
      setTimeout(type, 60);
    } else {
      setTimeout(erase, 2000);
    }
  }

  function erase() {
    if (charIdx > 0) {
      el.textContent = lines[lineIdx].slice(0, --charIdx);
      setTimeout(erase, 30);
    } else {
      lineIdx = (lineIdx + 1) % lines.length;
      setTimeout(type, 400);
    }
  }
  setTimeout(type, 800);

  document.addEventListener('mousemove', e => {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;
    const rect = heroSection.getBoundingClientRect();
    if (rect.bottom < 0) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    const logo = document.getElementById('hero-logo');
    if (logo) logo.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
}

/* -------- WEAPONS -------- */
function renderWeapons() {
  const grid = document.getElementById('weapons-grid');
  if (!grid) return;

  HADES.weapons.forEach(w => {
    const card = document.createElement('div');
    card.className = 'weapon-card fade-in-up';
    card.dataset.weapon = w.id;

    const statBars = ['statDamage', 'statSpeed', 'statRange', 'statDef'].map(s => {
      const label = s.replace('stat', '');
      return `<div class="stat-row">
        <span class="stat-label">${label}</span>
        <div class="stat-bar-wrap"><div class="stat-bar" style="width:0%;background:${w.color}" data-width="${w[s]}"></div></div>
        <span class="stat-num">${w[s]}</span>
      </div>`;
    }).join('');

    const aspectList = w.aspects.map(a =>
      `<div class="aspect-row">
        <span class="aspect-tier tier-${a.tier.toLowerCase()}">${a.tier}</span>
        <div><strong>${a.name}</strong><p>${a.summary}</p></div>
      </div>`
    ).join('');

    card.innerHTML = `
      <div class="card-front">
        <div class="weapon-glow" style="background:${w.color}22"></div>
        <div class="weapon-icon-wrap">
          <svg class="weapon-svg" viewBox="0 0 24 24" fill="none" stroke="${w.color}" stroke-width="1.5" stroke-linecap="round">
            ${getWeaponSVG(w.id)}
          </svg>
        </div>
        <div class="weapon-tier-badge" style="color:${w.color}">◆</div>
        <h3 class="weapon-name">${w.name}</h3>
        <p class="weapon-subtitle">${w.subtitle}</p>
        <p class="weapon-desc">${w.description}</p>
        <div class="weapon-stats">${statBars}</div>
        <div class="weapon-build-preview">
          <span class="build-tag" style="border-color:${w.color}44;color:${w.color}">
            ${w.topBuild.primary} + ${w.topBuild.secondary}
          </span>
          <span class="build-tag">${w.topBuild.playstyle}</span>
          <span class="build-diff diff-${w.topBuild.difficulty.toLowerCase()}">${w.topBuild.difficulty}</span>
        </div>
        <button class="flip-btn" onclick="flipCard(this)" style="border-color:${w.color}">VIEW ASPECTS ▼</button>
      </div>
      <div class="card-back">
        <div class="weapon-glow" style="background:${w.color}22"></div>
        <h3 class="weapon-name back-title">${w.name} — Aspects</h3>
        <div class="aspects-list">${aspectList}</div>
        <div class="top-build-box" style="border-color:${w.color}55">
          <div class="build-header" style="color:${w.color}">TOP BUILD</div>
          <div class="build-grid">
            <div class="build-item"><div class="bi-label">Primary</div><div class="bi-val">${w.topBuild.primary}</div></div>
            <div class="build-item"><div class="bi-label">Secondary</div><div class="bi-val">${w.topBuild.secondary}</div></div>
            <div class="build-item"><div class="bi-label">Duo Target</div><div class="bi-val">${w.topBuild.duo}</div></div>
            <div class="build-item"><div class="bi-label">Daedalus</div><div class="bi-val">${w.topBuild.daedalus}</div></div>
          </div>
        </div>
        <button class="flip-btn" onclick="flipCard(this)" style="border-color:${w.color}">BACK ▲</button>
      </div>`;

    card.addEventListener('mousemove', e => tiltCard(card, e));
    card.addEventListener('mouseleave', () => resetTilt(card));
    grid.appendChild(card);
  });

  animateStatBars();
}

function flipCard(btn) {
  const card = btn.closest('.weapon-card');
  card.classList.toggle('flipped');
}

function tiltCard(card, e) {
  if (card.classList.contains('flipped')) return;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `perspective(800px) rotateX(${y * -15}deg) rotateY(${x * 15}deg) translateZ(10px)`;
}

function resetTilt(card) {
  card.style.transform = '';
}

function animateStatBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-bar').forEach(bar => {
          const w = bar.dataset.width;
          setTimeout(() => { bar.style.width = w + '%'; }, 200);
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.weapon-card').forEach(card => obs.observe(card));
}

function getWeaponSVG(id) {
  const svgs = {
    blade: `<line x1="12" y1="2" x2="12" y2="18"/><line x1="9" y1="8" x2="15" y2="8"/><polygon points="12,18 14,22 12,23 10,22"/>`,
    spear: `<line x1="12" y1="3" x2="12" y2="21"/><polygon points="12,3 14,8 12,9 10,8"/><line x1="9" y1="16" x2="15" y2="16"/>`,
    shield: `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><line x1="12" y1="3" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="3" y1="12" x2="7" y2="12"/><line x1="17" y1="12" x2="21" y2="12"/>`,
    bow: `<path d="M5 4 Q12 12 5 20"/><line x1="5" y1="4" x2="19" y2="12"/><line x1="5" y1="20" x2="19" y2="12"/><line x1="12" y1="12" x2="19" y2="12"/><polygon points="19,12 16,10.5 16,13.5"/>`,
    rail: `<rect x="3" y="9" width="14" height="6" rx="1"/><rect x="17" y="10" width="4" height="2" rx="1"/><line x1="3" y1="12" x2="1" y2="12"/><rect x="7" y="7" width="4" height="2" rx="1"/>`,
    fists: `<rect x="5" y="7" width="5" height="12" rx="3"/><rect x="14" y="7" width="5" height="12" rx="3"/><rect x="5" y="5" width="5" height="4" rx="2"/><rect x="14" y="5" width="5" height="4" rx="2"/>`
  };
  return svgs[id] || '';
}

/* -------- GODS -------- */
function renderGods() {
  const grid = document.getElementById('gods-grid');
  if (!grid) return;

  HADES.gods.forEach(god => {
    const card = document.createElement('div');
    card.className = `god-card fade-in-up tier-glow`;
    card.style.setProperty('--god-color', god.color);

    card.innerHTML = `
      <div class="god-tier-band" style="background:${god.color}">${god.tier}</div>
      <div class="god-sigil-wrap">
        <div class="god-sigil" style="background:${god.color}22;border-color:${god.color}44">
          <svg viewBox="0 0 40 40" width="48" height="48">${getGodSVG(god.id, god.color)}</svg>
        </div>
      </div>
      <div class="god-name" style="color:${god.color}">${god.name}</div>
      <div class="god-role">${god.role}</div>
      <div class="god-status-chip" style="background:${god.color}22;color:${god.color};border:1px solid ${god.color}44">${god.status}</div>
      <p class="god-desc">${god.description}</p>
      <div class="god-sig"><strong>Signature:</strong> ${god.signature}</div>
      <div class="god-rating">
        <div class="rating-bar-bg"><div class="rating-bar" style="background:${god.color};width:0%" data-w="${god.rating}"></div></div>
        <span class="rating-num" style="color:${god.color}">${god.rating}</span>
      </div>
      <div class="god-boons">
        ${god.topBoons.map(b => `<span class="boon-chip" style="border-color:${god.color}44">${b}</span>`).join('')}
      </div>`;

    card.addEventListener('mouseenter', () => {
      card.querySelector('.rating-bar').style.width = god.rating + '%';
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('.rating-bar').style.width = '0%';
    });

    grid.appendChild(card);
  });
}

function getGodSVG(id, color) {
  const icons = {
    athena:   `<circle cx="20" cy="20" r="12" fill="none" stroke="${color}" stroke-width="2"/><ellipse cx="20" cy="20" rx="6" ry="6" fill="none" stroke="${color}" stroke-width="1.5"/><circle cx="20" cy="20" r="2" fill="${color}"/>`,
    artemis:  `<path d="M8 20 Q14 4 20 8 Q14 12 12 32 Q10 20 8 20 Z" fill="${color}" opacity=".8"/><line x1="20" y1="8" x2="32" y2="20" stroke="${color}" stroke-width="1.5"/>`,
    demeter:  `<polygon points="20,4 24,12 32,14 26,20 28,28 20,24 12,28 14,20 8,14 16,12" fill="none" stroke="${color}" stroke-width="1.8"/>`,
    dionysus: `<circle cx="20" cy="14" r="4" fill="${color}" opacity=".7"/><circle cx="26" cy="20" r="3" fill="${color}" opacity=".5"/><circle cx="14" cy="20" r="3" fill="${color}" opacity=".5"/><circle cx="20" cy="26" r="3" fill="${color}" opacity=".4"/>`,
    ares:     `<line x1="8" y1="8" x2="32" y2="32" stroke="${color}" stroke-width="2.5"/><line x1="32" y1="8" x2="8" y2="32" stroke="${color}" stroke-width="2.5"/>`,
    aphrodite:`<path d="M20 8 Q26 14 20 20 Q14 14 20 8Z" fill="${color}" opacity=".8"/><line x1="20" y1="20" x2="20" y2="32" stroke="${color}" stroke-width="1.5"/><line x1="14" y1="28" x2="26" y2="28" stroke="${color}" stroke-width="1.5"/>`,
    zeus:     `<polygon points="20,4 22,16 32,14 24,22 28,34 20,26 12,34 16,22 8,14 18,16" fill="${color}" opacity=".9"/>`,
    hermes:   `<circle cx="20" cy="10" r="5" fill="none" stroke="${color}" stroke-width="1.5"/><line x1="20" y1="15" x2="20" y2="32" stroke="${color}" stroke-width="1.5"/><path d="M14 18 Q18 14 20 16 Q22 14 26 18" fill="none" stroke="${color}" stroke-width="1.5"/>`,
    poseidon: `<line x1="20" y1="4" x2="20" y2="32" stroke="${color}" stroke-width="2"/><line x1="12" y1="10" x2="28" y2="10" stroke="${color}" stroke-width="1.5"/><line x1="20" y1="4" x2="14" y2="12" stroke="${color}" stroke-width="1.5"/><line x1="20" y1="4" x2="26" y2="12" stroke="${color}" stroke-width="1.5"/>`,
    chaos:    `<circle cx="20" cy="20" r="14" fill="none" stroke="${color}" stroke-width="1" stroke-dasharray="3 3"/><path d="M12 12 Q20 6 28 12 Q34 20 28 28 Q20 34 12 28 Q6 20 12 12Z" fill="none" stroke="${color}" stroke-width="1.5"/><circle cx="20" cy="20" r="3" fill="${color}"/>`
  };
  return icons[id] || `<circle cx="20" cy="20" r="10" fill="none" stroke="${color}" stroke-width="2"/>`;
}

/* -------- DUO BOONS -------- */
function renderDuoBoons() {
  const grid = document.getElementById('duo-grid');
  if (!grid) return;

  HADES.duoBoons.forEach(duo => {
    const colors = duo.gods.map(gName => {
      const g = HADES.gods.find(g => g.name === gName);
      return g ? g.color : '#888';
    });

    const card = document.createElement('div');
    card.className = 'duo-card fade-in-up';
    card.innerHTML = `
      <div class="duo-gods">
        ${duo.gods.map((g, i) => `<span class="duo-god-name" style="color:${colors[i]}">${g}</span>`).join('<span class="duo-sep">+</span>')}
      </div>
      <div class="duo-name">${duo.name} <span class="duo-tier tier-${duo.tier.toLowerCase()}">${duo.tier}</span></div>
      <p class="duo-effect">${duo.effect}</p>
      <div class="duo-gradient" style="background:linear-gradient(135deg,${colors[0]}22,${colors[1]}22)"></div>`;
    grid.appendChild(card);
  });
}

/* -------- BOON DATABASE -------- */
const BOON_DB = [
  { name: 'Divine Dash', god: 'Athena', type: 'Dash', effect: 'Dash deflects all projectiles. Run-defining survival boon.' },
  { name: 'Divine Strike', god: 'Athena', type: 'Attack', effect: 'Attack deflects projectiles. Turns offense into defense.' },
  { name: 'Holy Shield', god: 'Athena', type: 'Special', effect: 'Special deflects + adds barrier.' },
  { name: 'Brilliant Riposte', god: 'Athena', type: 'Deflect', effect: 'Deflect deals +50% extra damage.' },
  { name: 'Deadly Strike', god: 'Artemis', type: 'Attack', effect: '+20% base crit chance on attack. Core of crit builds.' },
  { name: 'Deadly Flourish', god: 'Artemis', type: 'Special', effect: '+20% base crit chance on special.' },
  { name: 'Exit Wounds', god: 'Artemis', type: 'Cast', effect: 'Dislodged bloodstones deal 100 bonus damage each.' },
  { name: 'Pressure Points', god: 'Artemis', type: 'Passive', effect: 'All damage has +1.5% crit chance. Global crit amp.' },
  { name: 'Clean Kill', god: 'Artemis', type: 'Crit', effect: 'Crit hits deal +300% to weakened foes.' },
  { name: 'Drunken Strike', god: 'Dionysus', type: 'Attack', effect: 'Attack inflicts Hangover (DoT). Stacks to 5.' },
  { name: 'Trippy Shot', god: 'Dionysus', type: 'Cast', effect: 'Cast drops Festive Fog cloud — Hangover + stun AoE.' },
  { name: 'Premium Vintage', god: 'Dionysus', type: 'Passive', effect: '+1 Hangover stack on all Hangover-inflicting attacks.' },
  { name: 'Numbing Sensation', god: 'Dionysus', type: 'Passive', effect: 'Hangover-afflicted foes move 10% slower.' },
  { name: 'Lightning Strike', god: 'Zeus', type: 'Attack', effect: 'Attack fires chain lightning to nearby foes.' },
  { name: 'Double Strike', god: 'Zeus', type: 'Attack', effect: '20% chance for lightning to strike twice.' },
  { name: 'Splitting Bolt', god: 'Zeus', type: 'Special', effect: 'Special fires 3 bolts of lightning.' },
  { name: 'Static Discharge', god: 'Zeus', type: 'Passive', effect: 'Jolted foes also pulse lightning to neighbors.' },
  { name: 'Frost Strike', god: 'Demeter', type: 'Attack', effect: 'Attack inflicts Chill. 10 stacks = burst AoE.' },
  { name: 'Crystal Beam', god: 'Demeter', type: 'Cast', effect: 'Cast fires a continuous Chill beam.' },
  { name: 'Rare Crop', god: 'Demeter', type: 'Passive', effect: 'Boon rarity one tier higher. Essential for scaling.' },
  { name: 'Heartbreak Strike', god: 'Aphrodite', type: 'Attack', effect: '+70% attack damage + Weak status. Largest % buff.' },
  { name: 'Heartbreak Flourish', god: 'Aphrodite', type: 'Special', effect: '+80% special damage + Weak status.' },
  { name: 'Dying Lament', god: 'Aphrodite', type: 'Death', effect: 'Enemies emit shockwave when killed under Weak.' },
  { name: 'Curse of Pain', god: 'Ares', type: 'Special', effect: 'Special inflicts Doom — delayed massive damage.' },
  { name: 'Urge to Kill', god: 'Ares', type: 'Attack', effect: 'Attack inflicts Doom.' },
  { name: 'Impending Doom', god: 'Ares', type: 'Doom', effect: 'Doom triggers +2s later but deals +100% more damage.' },
  { name: 'Tidal Dash', god: 'Poseidon', type: 'Dash', effect: 'Dash knocks back enemies for bonus damage.' },
  { name: 'Typhoon Fury', god: 'Poseidon', type: 'Attack', effect: 'Attack knocks back + deals Rupture on foes.' },
  { name: 'Greater Haste', god: 'Hermes', type: 'Passive', effect: '+10% permanent attack speed. Scales multiplicatively.' },
  { name: 'Quick Reload', god: 'Hermes', type: 'Cast', effect: 'Bloodstones return faster. Critical for Cast builds.' }
];

function renderBoonDB() {
  const searchEl = document.getElementById('boon-search');
  const filterEl = document.getElementById('boon-god-filter');
  const gridEl = document.getElementById('boon-db-grid');
  if (!gridEl) return;

  const godNames = [...new Set(BOON_DB.map(b => b.god))];

  filterEl.innerHTML = `<button class="god-filter-btn active" data-god="">All</button>` +
    godNames.map(g => {
      const godData = HADES.gods.find(x => x.name === g);
      const c = godData ? godData.color : '#888';
      return `<button class="god-filter-btn" data-god="${g}" style="--btn-color:${c}">${g}</button>`;
    }).join('');

  let activeGod = '';

  function renderFiltered() {
    const q = searchEl.value.toLowerCase();
    const filtered = BOON_DB.filter(b =>
      (!activeGod || b.god === activeGod) &&
      (!q || b.name.toLowerCase().includes(q) || b.effect.toLowerCase().includes(q) || b.god.toLowerCase().includes(q))
    );
    gridEl.innerHTML = filtered.map(b => {
      const godData = HADES.gods.find(g => g.name === b.god);
      const c = godData ? godData.color : '#888';
      return `<div class="boon-db-card">
        <div class="bdb-top">
          <span class="bdb-name">${b.name}</span>
          <span class="bdb-type" style="color:${c};border-color:${c}44">${b.type}</span>
        </div>
        <div class="bdb-god" style="color:${c}">${b.god}</div>
        <p class="bdb-effect">${b.effect}</p>
      </div>`;
    }).join('') || '<p class="no-results">No boons found.</p>';
  }

  filterEl.addEventListener('click', e => {
    const btn = e.target.closest('.god-filter-btn');
    if (!btn) return;
    filterEl.querySelectorAll('.god-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeGod = btn.dataset.god;
    renderFiltered();
  });

  searchEl.addEventListener('input', renderFiltered);
  renderFiltered();
}

/* -------- HEAT CALCULATOR -------- */
function renderHeatCalc() {
  const container = document.getElementById('heat-builder');
  if (!container) return;

  let selected = {};
  HADES.heatOptions.forEach(opt => selected[opt.id] = 0);

  function calcTotal() {
    return HADES.heatOptions.reduce((sum, o) => sum + selected[o.id] * o.heatPerLevel, 0);
  }

  function getDifficulty(heat) {
    if (heat === 0) return { label: 'Casual', color: '#44cc88' };
    if (heat <= 4) return { label: 'Easy', color: '#66bb44' };
    if (heat <= 8) return { label: 'Moderate', color: '#ccaa22' };
    if (heat <= 16) return { label: 'Hard', color: '#cc6622' };
    if (heat <= 32) return { label: 'Brutal', color: '#cc2222' };
    return { label: 'Extreme', color: '#aa00ff' };
  }

  function render() {
    const total = calcTotal();
    const diff = getDifficulty(total);
    container.innerHTML = `
      <div class="heat-total" style="color:${diff.color}">
        <span class="heat-num">${total}</span>
        <span class="heat-heat">HEAT</span>
        <span class="heat-diff" style="background:${diff.color}22;border-color:${diff.color}44;color:${diff.color}">${diff.label}</span>
      </div>
      <div class="heat-options">
        ${HADES.heatOptions.map(opt => `
          <div class="heat-opt">
            <div class="heat-opt-info">
              <span class="heat-opt-name">${opt.name}</span>
              <span class="heat-opt-cat" style="color:#888">${opt.category}</span>
            </div>
            <div class="heat-opt-controls">
              <button class="heat-btn" onclick="heatAdj('${opt.id}', -1)">−</button>
              <span class="heat-level" id="hl-${opt.id}">${selected[opt.id]} / ${opt.maxLevel}</span>
              <button class="heat-btn" onclick="heatAdj('${opt.id}', 1)">+</button>
              <span class="heat-cost" style="color:#ff6b35">${selected[opt.id] * opt.heatPerLevel}🔥</span>
            </div>
          </div>`
        ).join('')}
      </div>
      <button class="heat-reset" onclick="heatReset()">RESET ALL</button>`;
  }

  window.heatAdj = (id, dir) => {
    const opt = HADES.heatOptions.find(o => o.id === id);
    selected[id] = Math.max(0, Math.min(opt.maxLevel, selected[id] + dir));
    render();
  };
  window.heatReset = () => {
    HADES.heatOptions.forEach(o => selected[o.id] = 0);
    render();
  };
  render();
}

/* -------- MIRROR -------- */
function renderMirror() {
  const container = document.getElementById('mirror-list');
  if (!container) return;

  container.innerHTML = HADES.mirrorUpgrades.map((u, i) => `
    <div class="mirror-row fade-in-up" style="animation-delay:${i * 0.05}s">
      <div class="mirror-priority">${u.priority}</div>
      <div class="mirror-info">
        <div class="mirror-name">${u.name}</div>
        <div class="mirror-note">${u.note}</div>
      </div>
    </div>`).join('');
}

/* -------- SCROLL ANIMATIONS -------- */
function initScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in-up, .section-header').forEach(el => obs.observe(el));
}

/* -------- CUSTOM CURSOR -------- */
function initCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  document.body.appendChild(cursor);
  document.body.appendChild(trail);

  let mx = -100, my = -100, tx = -100, ty = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animTrail() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    trail.style.left = tx + 'px';
    trail.style.top = ty + 'px';
    requestAnimationFrame(animTrail);
  }
  animTrail();

  document.querySelectorAll('button, .weapon-card, .god-card, .nav-link, a').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
  });
}

/* -------- LIVE DATA (Wiki API) -------- */
async function fetchLiveData() {
  try {
    const res = await fetch('/api/status');
    if (res.ok) {
      const data = await res.json();
      const el = document.getElementById('api-status');
      if (el) el.textContent = `Data Version: ${data.version || 'Live'} · ${data.boonCount || 30} Boons Loaded`;
    }
  } catch (e) {
    // Silent fail — data.js is the fallback
  }
}

/* -------- SMOOTH SCROLL PROGRESS -------- */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  const pct = (scrolled / total) * 100;
  const bar = document.getElementById('scroll-progress');
  if (bar) bar.style.width = pct + '%';
});
