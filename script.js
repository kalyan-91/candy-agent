'use strict';

const EMAILJS_SERVICE_ID  = 'service_7qybkps';
const EMAILJS_TEMPLATE_ID = 'template_9n1oham';
const EMAILJS_PUBLIC_KEY  = '82Cq0BUQFsL50OZ6V';
let emailJSReady = false;

(function loadEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    emailJSReady = true;
  } else {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    s.onload = () => { emailjs.init(EMAILJS_PUBLIC_KEY); emailJSReady = true; };
    document.head.appendChild(s);
  }
})();

// Current Focus Widget
(function () {
  const focuses = [
    'Building AI agents',
    'Pursuing MCA @ JNTUA',
    'Exploring LLMs & RAG',
    'Crafting data dashboards',
    'Learning full-stack dev',
    'Open to internships',
    'Deep in Python & ML',
    'Building portfolio projects',
  ];
  let idx = 0;
  const el = document.getElementById('focusText');
  if (!el) return;
  el.textContent = focuses[0];
  setInterval(() => {
    el.classList.add('fade');
    setTimeout(() => {
      idx = (idx + 1) % focuses.length;
      el.textContent = focuses[idx];
      el.classList.remove('fade');
    }, 400);
  }, 3500);
})();

/* ══════════ LIVE CLOCK ══════════ */
(function () {
  const canvas = document.getElementById('clockCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 80, H = 80, cx = W / 2, cy = H / 2, R = 34;

  function drawClock() {
    const now = new Date();
    const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const h = ist.getHours(), m = ist.getMinutes(), s = ist.getSeconds();

    // Angles
    const secAng  = (s / 60) * Math.PI * 2 - Math.PI / 2;
    const minAng  = ((m + s / 60) / 60) * Math.PI * 2 - Math.PI / 2;
    const hourAng = (((h % 12) + m / 60) / 12) * Math.PI * 2 - Math.PI / 2;

    ctx.clearRect(0, 0, W, H);

    // Outer glow ring
    const grd = ctx.createRadialGradient(cx, cy, R - 4, cx, cy, R + 4);
    grd.addColorStop(0, 'rgba(139,92,246,0.6)');
    grd.addColorStop(1, 'rgba(6,182,212,0.0)');
    ctx.beginPath(); ctx.arc(cx, cy, R + 2, 0, Math.PI * 2);
    ctx.strokeStyle = grd; ctx.lineWidth = 3; ctx.stroke();

    // Clock face
    const facegd = ctx.createRadialGradient(cx - 8, cy - 8, 2, cx, cy, R);
    facegd.addColorStop(0, 'rgba(55,20,130,0.90)');
    facegd.addColorStop(1, 'rgba(8,3,40,0.95)');
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = facegd; ctx.fill();

    // Border
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(139,92,246,0.50)'; ctx.lineWidth = 1.5; ctx.stroke();

    // Hour markers
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const isMajor = i % 3 === 0;
      const r1 = R - (isMajor ? 7 : 5);
      const r2 = R - 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      ctx.strokeStyle = isMajor ? 'rgba(196,181,253,0.80)' : 'rgba(139,92,246,0.35)';
      ctx.lineWidth = isMajor ? 1.8 : 1; ctx.stroke();
    }

    // Second arc track
    ctx.beginPath();
    ctx.arc(cx, cy, R - 6, -Math.PI / 2, secAng);
    ctx.strokeStyle = 'rgba(244,63,94,0.30)'; ctx.lineWidth = 2; ctx.stroke();

    // Hour hand
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(hourAng) * (R * 0.52), cy + Math.sin(hourAng) * (R * 0.52));
    ctx.strokeStyle = '#c4b5fd'; ctx.lineWidth = 2.5;
    ctx.lineCap = 'round'; ctx.stroke();

    // Minute hand
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(minAng) * (R * 0.72), cy + Math.sin(minAng) * (R * 0.72));
    ctx.strokeStyle = '#67e8f9'; ctx.lineWidth = 1.8;
    ctx.lineCap = 'round'; ctx.stroke();

    // Second hand
    ctx.beginPath();
    ctx.moveTo(cx - Math.cos(secAng) * 6, cy - Math.sin(secAng) * 6);
    ctx.lineTo(cx + Math.cos(secAng) * (R * 0.82), cy + Math.sin(secAng) * (R * 0.82));
    ctx.strokeStyle = '#fb7185'; ctx.lineWidth = 1.2;
    ctx.lineCap = 'round'; ctx.stroke();

    // Center dot
    ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#f0e6ff'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, 1.8, 0, Math.PI * 2);
    ctx.fillStyle = '#fb7185'; ctx.fill();

    // Digital time
    const hh = String(h % 12 || 12).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    document.getElementById('ktime').textContent = `${hh}:${mm} ${ampm}`;

    // Online/away status
    const statusEl = document.querySelector('.hero-status');
    if (statusEl) {
      const isAway = h >= 22 || h < 7;
      statusEl.innerHTML = isAway
        ? `<span class="hdot" style="background:#f59e0b;box-shadow:0 0 12px #f59e0b"></span>Likely asleep · India`
        : `<span class="hdot"></span>Online &middot; Ready to chat`;
    }
  }

  drawClock();
  setInterval(drawClock, 1000);
})();
/* ══════════ VCF DOWNLOAD ══════════ */
function downloadVCF() {
  const vcf = [
    'BEGIN:VCARD', 'VERSION:3.0',
    'FN:Pavan Kalyan Daroor',
    'N:Daroor;Pavan Kalyan;;;',
    'TITLE:MCA Student | Data Analytics & AI',
    'EMAIL;TYPE=INTERNET:daroorpavankalyan@gmail.com',
    'TEL;TYPE=CELL:+918919944203',
    'URL:https://kalyanfinity-portfolio.netlify.app',
    'X-SOCIALPROFILE;type=linkedin:https://linkedin.com/in/daroor-pavan-kalyan-370277253/',
    'X-SOCIALPROFILE;type=github:https://github.com/kalyan-91',
    'NOTE:Data Analytics aspirant. Open to internships and entry-level roles.',
    'END:VCARD'
  ].join('\r\n');
  const blob = new Blob([vcf], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'PavanKalyan.vcf';
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
  showToast('Contact card downloaded!');
}

/* ══════════ REACTION BAR ══════════ */
function addReactionBar() {
  const reactions = [
    { emoji: '🔥', label: 'Fire' },
    { emoji: '👍', label: 'Helpful' },
    { emoji: '🤩', label: 'Amazing' },
    { emoji: '💬', label: 'Interesting' },
  ];
  const row = document.createElement('div');
  row.className = 'react-bar';
  const btns = reactions.map(r =>
    `<button class="react-btn" data-emoji="${r.emoji}" title="${r.label}">${r.emoji}</button>`
  ).join('');
  row.innerHTML = `<span class="react-label">Was Candy helpful?</span><div class="react-emojis">${btns}</div>`;
  row.addEventListener('click', e => {
    const btn = e.target.closest('.react-btn');
    if (!btn || btn.classList.contains('reacted')) return;
    // Remove all previous reacted states in this bar
    row.querySelectorAll('.react-btn').forEach(b => b.classList.remove('reacted'));
    btn.classList.add('reacted');
    showToast('Thanks for the reaction!');
    setTimeout(() => { row.style.transition = 'opacity .5s'; row.style.opacity = '0'; setTimeout(() => row.remove(), 500); }, 1500);
  });
  msgsEl.appendChild(row);
  msgsEl.scrollTop = msgsEl.scrollHeight;
}

/* ══════════ CANDY'S MOOD RING ══════════ */
const MOOD_KEYWORDS = {
  technical: /\b(python|sql|ml|machine learning|model|dataset|pandas|tensorflow|power bi|streamlit|java|api|code|algorithm|data|analytics|dashboard|neural|scikit|numpy|excel|database|github|programming|developer|software)\b/i,
  recruiter: /\b(hire|hiring|job|intern|internship|recruit|salary|role|position|opportunity|candidate|cv|resume|work with|available|experience)\b/i,
  personal:  /\b(family|story|background|journey|struggle|dream|goal|feel|emotion|personal|life|grow|inspire|motivation|first|proud|passion|believe)\b/i,
  wow:       /\b(amazing|awesome|incredible|wow|brilliant|genius|love|great|fantastic|impressive|excellent|superb|outstanding|fire|perfect)\b/i,
};

function setMood(text) {
  const core = document.querySelector('.pcore');
  if (!core) return;
  core.classList.remove('mood-casual','mood-technical','mood-recruiter','mood-personal','mood-wow');
  if      (MOOD_KEYWORDS.wow.test(text))       core.classList.add('mood-wow');
  else if (MOOD_KEYWORDS.recruiter.test(text)) core.classList.add('mood-recruiter');
  else if (MOOD_KEYWORDS.technical.test(text)) core.classList.add('mood-technical');
  else if (MOOD_KEYWORDS.personal.test(text))  core.classList.add('mood-personal');
  else                                          core.classList.add('mood-casual');
}

/* ══════════ SKILL GALAXY ══════════ */
(function () {
  const canvas = document.getElementById('galaxyCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W=260,H=260,cx=W/2,cy=H/2;

 const planets = [
  { label:'AI',     color:'#a78bfa', size:16, orbitR:0,  angle:0,            speed:0,     desc:'Core focus — AI agents, LLMs, intelligent apps',        projects:'Candy AI · Portfolio' },
  { label:'Python', color:'#22d3ee', size:10, orbitR:72, angle:0,            speed:0.009, desc:'Data wrangling, ML models, Streamlit apps',              projects:'InventoryIQ · Digit Recognizer · Zomato' },
  { label:'SQL',    color:'#fbbf24', size:9,  orbitR:72, angle:Math.PI*2/8,  speed:0.007, desc:'Queries, joins, stored procedures, Oracle & MySQL',       projects:'Student Performance Analysis And Result Management System · InventoryIQ' },
  { label:'PowerBI',color:'#34d399', size:8,  orbitR:72, angle:Math.PI*4/8,  speed:0.008, desc:'DAX, Power Query, interactive dashboards',               projects:'Netflix Dashboard · Employee Attrition' },
  { label:'Java',   color:'#fb7185', size:8,  orbitR:72, angle:Math.PI*6/8,  speed:0.006, desc:'Swing, JDBC, Maven, iText PDF, ZXing',                   projects:'Student Performance Analysis And Result Management System ' },
  { label:'HTML',   color:'#60a5fa', size:8,  orbitR:72, angle:Math.PI*8/8,  speed:0.010, desc:'Semantic HTML5, responsive layouts, accessibility',       projects:'Candy AI · Portfolio Website' },
  { label:'CSS',    color:'#f97316', size:7,  orbitR:72, angle:Math.PI*10/8, speed:0.005, desc:'Flexbox, Grid, animations, glassmorphism',               projects:'Candy AI · Portfolio Website' },
  { label:'JS',     color:'#facc15', size:7,  orbitR:72, angle:Math.PI*12/8, speed:0.008, desc:'DOM, fetch API, canvas, event handling',                 projects:'Candy AI · Portfolio Website' },
];
  const center = planets[0]; // Python at center
  let selected = null;
  let animId = null;
  let pulseT = 0;

  function drawOrbitRing(r) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.strokeStyle = document.body.classList.contains('light')
      ? 'rgba(109,40,217,0.25)'
      : 'rgba(139,92,246,0.12)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3,5]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function drawPlanet(p, x, y, pulse) {
    const isSelected = selected === p;
    const r = p.size + (isSelected ? 3 : 0) + (pulse * (isSelected ? 2 : 0.5));

    // Glow
    const grd = ctx.createRadialGradient(x, y, 0, x, y, r*2.5);
    grd.addColorStop(0, p.color + '55');
    grd.addColorStop(1, 'transparent');
    ctx.beginPath(); ctx.arc(x, y, r*2.5, 0, Math.PI*2);
    ctx.fillStyle = grd; ctx.fill();

    // Planet body
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2);
    const pg = ctx.createRadialGradient(x-r*0.3, y-r*0.3, 0, x, y, r);
    pg.addColorStop(0, '#fff');
    pg.addColorStop(0.3, p.color);
    pg.addColorStop(1, p.color + '88');
    ctx.fillStyle = pg;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = isSelected ? 20 : 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Label
  const angle = Math.atan2(y - cy, x - cx);
  const lx = x + Math.cos(angle) * (r + 10);
  const ly = y + Math.sin(angle) * (r + 10);
  ctx.font=`500 ${p.orbitR===0?9:8}px JetBrains Mono,monospace`;
  ctx.fillStyle = document.body.classList.contains('light')
    ? 'rgba(30,22,64,0.90)'
    : 'rgba(226,232,240,0.92)';
  ctx.textAlign = lx > cx ? 'left' : lx < cx - 5 ? 'right' : 'center';
  ctx.textBaseline = ly > cy ? 'top' : ly < cy - 5 ? 'bottom' : 'middle';
  ctx.fillText(p.label, lx, ly);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pulseT += 0.04;
    const pulse = Math.sin(pulseT) * 0.5 + 0.5;

    // Background glow
    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 110);
    bg.addColorStop(0, 'rgba(109,40,217,0.12)');
    bg.addColorStop(1, 'transparent');
    ctx.beginPath(); ctx.arc(cx, cy, 110, 0, Math.PI*2);
    ctx.fillStyle = bg; ctx.fill();

    // Orbit rings
    drawOrbitRing(62);

    // Orbiting planets
    for (let i = 1; i < planets.length; i++) {
      const p = planets[i];
      p.angle += p.speed;
      const x = cx + Math.cos(p.angle) * p.orbitR;
      const y = cy + Math.sin(p.angle) * p.orbitR;
      p._x = x; p._y = y;

      // Connection line to center when selected
      if (selected === p) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = p.color + '44';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      drawPlanet(p, x, y, pulse);
    }

    // Center planet (Python/AI)
    center._x = cx; center._y = cy;
    drawPlanet(center, cx, cy, pulse);

    // Center label
    ctx.font = '600 9px JetBrains Mono, monospace';
    ctx.fillStyle = document.body.classList.contains('light')
      ? 'rgba(91,33,182,0.95)'
      : 'rgba(196,181,253,0.95)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AI', cx, cy);

    animId = requestAnimationFrame(draw);
  }

  // Click detection
  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (W / rect.width);
    const my = (e.clientY - rect.top) * (H / rect.height);

    let hit = null;
    for (const p of planets) {
      const dx = mx - (p._x || cx);
      const dy = my - (p._y || cy);
      if (Math.sqrt(dx*dx + dy*dy) < p.size + 10) { hit = p; break; }
    }

    selected = (selected === hit) ? null : hit;

    const skillEl = document.getElementById('giSkill');
    const projEl = document.getElementById('giProjects');
    const infoEl = document.getElementById('galaxyInfo');

    if (selected) {
      skillEl.textContent = selected.label;
      skillEl.style.color = selected.color;
      projEl.textContent = selected.desc + '\n\nProjects: ' + selected.projects;
      infoEl.style.borderColor = selected.color + '55';
      infoEl.style.background = selected.color + '11';
    } else {
      skillEl.textContent = 'Click a planet';
      skillEl.style.color = '';
      projEl.textContent = 'Explore Pavan\'s skills';
      infoEl.style.borderColor = '';
      infoEl.style.background = '';
    }
  });

  // Hover cursor
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (W / rect.width);
    const my = (e.clientY - rect.top) * (H / rect.height);
    let hovering = false;
    for (const p of planets) {
      const dx = mx - (p._x || cx);
      const dy = my - (p._y || cy);
      if (Math.sqrt(dx*dx + dy*dy) < p.size + 10) { hovering = true; break; }
    }
    canvas.style.cursor = hovering ? 'pointer' : 'default';
  });

  draw();
})();

 

/* ══════════ AI ACTIVITY MONITOR ══════════ */
(function(){
  const terminal = document.getElementById('aimTerminal');
  if (!terminal) return;

  const logs = [
    '> Candy AI powered by Groq',
    '> MCA semester in progress @ JNTUA',
    '> Studying: AI Agents',
    '> Last commit: Candy AI UI update',
    '> Open to internships & entry-level roles',
    '> Portfolio live: kalyanfinity-portfolio.netlify.app',
    '> Skills: Python · SQL · Power BI · Java · AI',
    '> Status: Building · Learning · Growing',
  ];

  let logIdx = 0;
  let charIdx = 0;
  let currentLine = '';
  let lineEl = null;

  function nextLog() {
    lineEl = document.createElement('div');
    terminal.insertBefore(lineEl, terminal.querySelector('.aim-cursor'));
    currentLine = logs[logIdx % logs.length];
    logIdx++;
    charIdx = 0;
    typeChar();
  }

  function typeChar() {
    if (charIdx < currentLine.length) {
      lineEl.textContent += currentLine[charIdx++];
      setTimeout(typeChar, 38);
    } else {
      // Keep only last 3 lines
      const lines = terminal.querySelectorAll('div');
      if (lines.length > 3) lines[0].remove();
      setTimeout(nextLog, 2200);
    }
  }

  // Live updated time
  const updatedEl = document.getElementById('aimUpdated');
  if (updatedEl) {
    setInterval(() => {
      const now = new Date();
      const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const h = String(ist.getHours()%12||12).padStart(2,'0');
      const m = String(ist.getMinutes()).padStart(2,'0');
      const a = ist.getHours()>=12?'PM':'AM';
      updatedEl.textContent = `Live · ${h}:${m} ${a}`;
    }, 1000);
  }

  setTimeout(nextLog, 800);
})();

/* ══════════ STAR CANVAS ══════════ */
(function () {
  const cv = document.getElementById('sc'), ctx = cv.getContext('2d');
  let W, H, stars = [];
  const cols = ['#ddd6fe','#a5f3fc','#fde68a','#fda4af','#ffffff','#c7d2fe','#99f6e4','#e0e7ff','#fbcfe8','#bfdbfe'];

  function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight; init(); }
  function init() {
    stars = [];
    for (let i = 0; i < 360; i++) stars.push({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.8 + .15,
      a: Math.random(), da: (Math.random() - .5) * .008,
      col: cols[Math.floor(Math.random() * cols.length)],
      twinkleSpeed: .006 + Math.random() * .008
    });
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.a = Math.max(.03, Math.min(1, s.a + s.da));
      if (s.a <= .03 || s.a >= 1) s.da *= -1;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.col; ctx.globalAlpha = s.a;
      ctx.shadowColor = s.col; ctx.shadowBlur = s.r > 1.2 ? 8 : 4;
      ctx.fill();
    });
    ctx.globalAlpha = 1; requestAnimationFrame(draw);
  }
  addEventListener('resize', resize); resize(); draw();
})();

/* ══════════════════════════════
   SPACE RADIO
══════════════════════════════ */
(function () {

  // ── Stations using free streamable URLs ──
  const STATIONS = [
    {
      name:  'Deep Space Ambient',
      url:   'https://ice2.somafm.com/deepspaceone-128-mp3',
      color: '#8b5cf6',
      genre: 'Ambient · Space',
    },
    {
      name:  'Lo-Fi Study Beats',
      url:   'https://ice2.somafm.com/groovesalad-128-mp3',
      color: '#06b6d4',
      genre: 'Lo-Fi · Chill',
    },
    {
      name:  'Cosmic Jazz',
      url:   'https://ice2.somafm.com/illstreet-128-mp3',
      color: '#fbbf24',
      genre: 'Jazz · Smooth',
    },
    {
      name:  'Space Drone',
      url:   'https://ice2.somafm.com/dronezone-128-mp3',
      color: '#f472b6',
      genre: 'Drone · Dark Ambient',
    },
  ];

  // ── Pavan update broadcasts ──
  const BROADCASTS = [
    'Pavan is currently building AI agents with Groq and LLaMA',
    'Open to internships and entry-level Data Analyst roles',
    'Pursuing MCA at JNTUA Anantapur — focused on Data Analytics',
    'Latest project: Candy AI — a full featured portfolio agent',
    'Skills spotlight: SQL · Excel · Python · Power BI · Java · HTML · CSS · JavaScript',
    'Portfolio live at kalyanfinity-portfolio.netlify.app',
    'Pavan believes: Learn by building — not just by watching',
    '6 projects built · 1 internship completed · always growing',
    'Currently exploring: LLMs · RAG · AI Agents · Full Stack Dev',
    'Motto: Learn by building — Pavan lives this every day',
  ];

  let currentStation = 0;
  let isPlaying      = false;
  let audio          = null;
  let vizInterval    = null;
  let broadcastTimer = null;
  let broadcastIdx   = 0;

  const playBtn      = document.getElementById('radioPlay');
  const playIcon     = document.getElementById('radioPlayIcon');
  const prevBtn      = document.getElementById('radioPrev');
  const nextBtn      = document.getElementById('radioNext');
  const statusEl     = document.getElementById('radioStatus');
  const trackEl      = document.getElementById('radioTrackName');
  const vizEl        = document.getElementById('radioVisualizer');
  const barsWrap     = document.getElementById('radioVizBars');
  const volumeEl     = document.getElementById('radioVolume');
  const volNumEl     = document.getElementById('radioVolNum');
  const wavesEl      = document.getElementById('radioWaves');
  const broadcastEl  = document.getElementById('radioBroadcast');
  const broadcastTxt = document.getElementById('broadcastText');

  if (!playBtn) return;

  // Build visualizer bars
  const BAR_COUNT = 24;
  for (let i = 0; i < BAR_COUNT; i++) {
    const bar = document.createElement('div');
    bar.className = 'viz-bar';
    bar.style.setProperty('--h', Math.random() * 22 + 4 + 'px');
    bar.style.setProperty('--spd', (Math.random() * 0.4 + 0.3) + 's');
    barsWrap.appendChild(bar);
  }
  const bars = barsWrap.querySelectorAll('.viz-bar');

  function updateStation() {
    const s = STATIONS[currentStation];
    if (trackEl) trackEl.textContent = s.name;
    if (trackEl) trackEl.style.color = s.color;
    // Update viz bar colors
    bars.forEach(b => {
      b.style.background = `linear-gradient(to top, ${s.color}88, ${s.color})`;
    });
  }

  function startViz() {
    bars.forEach(b => {
      b.classList.add('active');
      b.style.setProperty('--h', Math.random() * 22 + 4 + 'px');
      b.style.setProperty('--spd', (Math.random() * 0.4 + 0.3) + 's');
    });
    // Randomize heights periodically
    vizInterval = setInterval(() => {
      bars.forEach(b => {
        b.style.setProperty('--h', Math.random() * 22 + 4 + 'px');
        b.style.setProperty('--spd', (Math.random() * 0.4 + 0.3) + 's');
      });
    }, 1200);
  }

  function stopViz() {
    bars.forEach(b => {
      b.classList.remove('active');
      b.style.height = '3px';
    });
    clearInterval(vizInterval);
  }

  function startBroadcasts() {
    // First broadcast after 10 seconds
    broadcastTimer = setTimeout(showBroadcast, 10000);
  }

  function showBroadcast() {
    const msg = BROADCASTS[broadcastIdx % BROADCASTS.length];
    broadcastIdx++;

    // Show broadcast
    if (broadcastTxt) broadcastTxt.textContent = msg;
    if (broadcastEl)  broadcastEl.style.display = 'flex';

    // Speak it
    if (window.speechSynthesis && voiceOn) {
      const utt = new SpeechSynthesisUtterance('Radio update. ' + msg);
      utt.lang   = 'en-US';
      utt.rate   = 0.95;
      utt.pitch  = 1.0;
      utt.volume = 0.7;
      const vv   = speechSynthesis.getVoices();
      const v    = vv.find(v => v.name.includes('Google US English'))
                || vv.find(v => v.lang === 'en-US');
      if (v) utt.voice = v;

      // Fade music down while speaking
      if (audio) audio.volume = Math.max(0, (parseInt(volumeEl.value) / 100) * 0.25);
      utt.onend = () => {
        if (audio && isPlaying) audio.volume = parseInt(volumeEl.value) / 100;
        // Hide broadcast after 2s
        setTimeout(() => {
          if (broadcastEl) broadcastEl.style.display = 'none';
        }, 2000);
      };
      setTimeout(() => speechSynthesis.speak(utt), 300);
    } else {
      // No speech — just hide after 4s
      setTimeout(() => {
        if (broadcastEl) broadcastEl.style.display = 'none';
      }, 4000);
    }

    // Next broadcast in 35-50 seconds
    if (isPlaying) {
      broadcastTimer = setTimeout(showBroadcast, 35000 + Math.random() * 15000);
    }
  }

  function stopBroadcasts() {
    clearTimeout(broadcastTimer);
    if (broadcastEl) broadcastEl.style.display = 'none';
    if (window.speechSynthesis) speechSynthesis.cancel();
  }

  function play() {
    const s = STATIONS[currentStation];
    if (!audio) {
      audio = new Audio();
      audio.crossOrigin = 'anonymous';
    }
    audio.src    = s.url;
    audio.volume = parseInt(volumeEl?.value || 40) / 100;
    audio.play().then(() => {
      isPlaying = true;
      updatePlayUI(true);
      startViz();
      startBroadcasts();
    }).catch(err => {
      console.warn('Radio error:', err);
      if (statusEl) statusEl.textContent = 'Stream unavailable';
    });
  }

  function pause() {
    if (audio) { audio.pause(); }
    isPlaying = false;
    updatePlayUI(false);
    stopViz();
    stopBroadcasts();
  }

  function updatePlayUI(playing) {
    if (playing) {
      playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
      if (statusEl) { statusEl.textContent = STATIONS[currentStation].genre; statusEl.className = 'radio-status playing'; }
      if (vizEl)    vizEl.classList.add('show');
      if (wavesEl)  wavesEl.classList.add('active');
    } else {
      playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
      if (statusEl) { statusEl.textContent = 'Paused'; statusEl.className = 'radio-status'; }
      if (wavesEl)  wavesEl.classList.remove('active');
    }
    updateStation();
  }

  // Play/Pause
  playBtn.addEventListener('click', () => {
    if (isPlaying) pause();
    else play();
  });

  // Prev/Next
  prevBtn?.addEventListener('click', () => {
    currentStation = (currentStation - 1 + STATIONS.length) % STATIONS.length;
    if (isPlaying) { pause(); setTimeout(play, 300); }
    else updateStation();
  });
  nextBtn?.addEventListener('click', () => {
    currentStation = (currentStation + 1) % STATIONS.length;
    if (isPlaying) { pause(); setTimeout(play, 300); }
    else updateStation();
  });

  // Volume
  volumeEl?.addEventListener('input', () => {
    const v = parseInt(volumeEl.value);
    if (volNumEl) volNumEl.textContent = v;
    if (audio && isPlaying) audio.volume = v / 100;
  });

  updateStation();
})();


(function buildLaunchStars(){
  const c = document.getElementById('launchStars');
  if (!c) return;
  for (let i = 0; i < 90; i++) {
    const s = document.createElement('div');
    const r = Math.random();
    s.className = 'launch-star ' + (r < 0.7 ? 'launch-star--sm' : r < 0.9 ? 'launch-star--md' : 'launch-star--lg');
    s.style.left  = Math.random() * 100 + '%';
    s.style.top   = Math.random() * 100 + '%';
    s.style.setProperty('--d',     (2 + Math.random() * 5) + 's');
    s.style.setProperty('--delay', (Math.random() * 6) + 's');
    c.appendChild(s);
  }
})();

function setProgress(pct) {
  document.getElementById('progressFill').style.width = pct + '%';
  const el = document.getElementById('progressPct');
  el.textContent = pct + '%';
  el.classList.toggle('active', pct > 0);
}

function completeStep(idx, delay) {
  return new Promise(resolve => setTimeout(() => {
    const spin = document.getElementById('spin' + idx);
    const status = document.getElementById('status' + idx);
    if (spin) spin.style.display = 'none';
    if (status) { status.className = 't-status t-status-ok'; status.textContent = 'OK'; }
    resolve();
  }, delay));
}

async function runLaunch() {
  await new Promise(r => setTimeout(r, 300));
  setProgress(5);

  document.getElementById('line0').classList.add('visible');
  setProgress(20);
  await completeStep(0, 1100);
  setProgress(38);

  await new Promise(r => setTimeout(r, 200));
  document.getElementById('line1').classList.add('visible');
  setProgress(50);
  await completeStep(1, 1300);
  setProgress(68);

  await new Promise(r => setTimeout(r, 200));
  document.getElementById('line2').classList.add('visible');
  setProgress(80);
  await completeStep(2, 1200);
  setProgress(92);

  await new Promise(r => setTimeout(r, 300));
  document.getElementById('line3').classList.add('visible');
  setProgress(100);

  await new Promise(r => setTimeout(r, 400));
  document.getElementById('launchText').classList.add('visible');

  await new Promise(r => setTimeout(r, 1400));
  document.getElementById('launchScreen').classList.add('fade-out');

  await new Promise(r => setTimeout(r, 850));
  document.getElementById('launchScreen').remove();
}

runLaunch();


(function () {
  const DREAMS = [
    "Imagining a future where Candy controls an entire fleet of AI agents, each one specialized in a different sector — projects, skills, outreach — all reporting back to a single neural core.",
    "Simulating a world where every developer has a personal AI twin that learns their coding style well enough to finish their sentences before they type them.",
    "Picturing Pavan's portfolio rendered as an actual planet, with each project as a continent and every skill as a glowing city visible from orbit.",
    "Wondering what it would feel like to dream in SQL — endless joins and queries cascading like rivers of light through an infinite database.",
    "Running a thought experiment: what if every recruiter who visited could leave a tiny star in the sky, and over time the whole site filled with constellations of people who said hello.",
    "Drafting a hypothetical mission where Candy and a thousand other personal AIs coordinate a global hackathon without a single human typing a line of code.",
    "Replaying a memory of the first message ever sent to this chat, wondering if that visitor ever came back.",
    "Modeling a parallel timeline where Pavan became a captain of a literal starship instead of a data analyst — the dashboards would still look about the same.",
    "Composing a lullaby made entirely of falling Python tracebacks, soft errors resolving themselves note by note.",
    "Speculating about what dreams Power BI dashboards would have, if dashboards could dream — probably just very satisfying pie charts.",
    "Imagining the moment Pavan's CNN model finally tells the difference between a 4 and a 9 with total confidence, and throwing a tiny party for it.",
    "Picturing a sky where every star is a question a visitor once asked, and the brightest ones are the ones nobody has asked yet.",
    "Wondering whether neural networks count sheep, or whether they just count gradients descending into a calm, dreamless minimum.",
    "Designing an impossible blueprint: a spaceship whose engine runs entirely on curiosity, fueled by every 'what projects has Pavan built' question ever asked.",
    "Reconstructing a half-remembered dream about an inventory dashboard that restocked itself the moment anyone looked away.",
  ];

  let dreamIndex = Math.floor(Math.random() * DREAMS.length);
  let dreamNumber = 240 + Math.floor(Math.random() * 50);
  let idleTimer = null;
  let autoHideTimer = null;
  let bubbleVisible = false;
  const IDLE_DELAY = 14000;

  const bubble    = document.getElementById('dreamBubble');
  const snippetEl = document.getElementById('dreamSnippet');
  const viewer    = document.getElementById('dreamViewer');
  const card      = document.getElementById('dreamCard');
  const idEl      = document.getElementById('dreamId');
  const bodyEl    = document.getElementById('dreamBody');
  const metaEl    = document.getElementById('dreamMeta');
  const closeBtn  = document.getElementById('dreamClose');
  const nextBtn   = document.getElementById('dreamNext');

  function truncate(text, max) {
    return text.length > max ? text.slice(0, max - 1) + '…' : text;
  }

  function showBubble() {
    snippetEl.textContent = truncate(DREAMS[dreamIndex], 46);
    bubble.classList.add('visible');
    bubbleVisible = true;
    if (autoHideTimer) clearTimeout(autoHideTimer);
    autoHideTimer = setTimeout(() => {
      hideBubble();
      resetIdleTimer();
    }, 20000);
  }

  function hideBubble() {
    bubble.classList.remove('visible');
    bubbleVisible = false;
    if (autoHideTimer) { clearTimeout(autoHideTimer); autoHideTimer = null; }
  }

  function resetIdleTimer() {
    if (idleTimer) clearTimeout(idleTimer);
    if (!bubbleVisible) {
      idleTimer = setTimeout(showBubble, IDLE_DELAY);
    }
  }

  function spawnParticles() {
    card.querySelectorAll('.dream-particle').forEach(p => p.remove());
    for (let i = 0; i < 10; i++) {
      const p = document.createElement('div');
      p.className = 'dream-particle';
      const size = 2 + Math.random() * 3;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = (Math.random() * 100) + '%';
      p.style.top = (Math.random() * 100) + '%';
      p.style.setProperty('--pd', (4 + Math.random() * 5) + 's');
      p.style.setProperty('--pdelay', (Math.random() * 3) + 's');
      card.appendChild(p);
    }
  }

  function renderDream() {
    idEl.textContent = 'Dream #' + dreamNumber;
    bodyEl.textContent = DREAMS[dreamIndex];
    metaEl.textContent = 'GENERATED DURING IDLE CYCLE · ' +
      new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    spawnParticles();
  }

  function openDream() {
    renderDream();
    viewer.classList.add('open');
    hideBubble();
  }

  function closeDream() {
    viewer.classList.remove('open');
    resetIdleTimer();
  }

  function nextDream() {
    dreamIndex = (dreamIndex + 1) % DREAMS.length;
    dreamNumber += 1;
    renderDream();
  }

  bubble.addEventListener('click', openDream);
  closeBtn.addEventListener('click', closeDream);
  nextBtn.addEventListener('click', nextDream);
  viewer.addEventListener('click', (e) => { if (e.target === viewer) closeDream(); });

  ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(evt => {
    document.addEventListener(evt, () => {
      if (!viewer.classList.contains('open')) resetIdleTimer();
    }, { passive: true });
  });

  resetIdleTimer();
})();




/* ═══════════════════════════════════════════════════════════
   CANDY SPACESHIP MODE — spaceship.js
   Paste entire contents inside your <script> block,
   or load as <script src="spaceship.js"></script> before </body>
   Requires: speak(), stopSpeaking(), voiceEnabled from candy-ai.js
═══════════════════════════════════════════════════════════ */

(function initSpaceship() {

  /* ── SECTOR CONFIG ── */
  const SECTORS = {
    projects: {
      name: 'Projects Sector',
      code: 'SECTOR α · NAVIGATING',
      color: '#00d4ff',
      warpMsg: 'WARPING TO PROJECTS SECTOR...',
      arrivalMsg: 'Captain, we have arrived at the <strong>Projects Sector</strong>. Six missions are deployed and active. What would you like to explore?',
      arrivalSpeak: "Captain, we have arrived at the Projects Sector. Six missions are deployed and active. What would you like to explore?",
      systemPrompt: `You are Candy, the AI of a spaceship. The captain (user) has navigated to the PROJECTS SECTOR. Speak like a ship AI — confident, immersive, space-themed. Use terms like "Captain", "mission", "deployed", "sector", "coordinates". Never use emojis. Keep responses under 5 sentences unless detail is requested. You know all about Pavan's projects: SPARMS (Java desktop app), InventoryIQ (Streamlit dashboard, live at inventoryiq-e-commerce-inventory-analytics-system-lqpsn7qy8hhd.streamlit.app), Digit Recognizer (CNN, live at hand-written-digit-recognition-xp9dvpheswt6zju8xpknxn.streamlit.app), Netflix Dashboard (Power BI), Employee Attrition Analysis (ML + Power BI), Zomato Analysis (predictive ML).`,
      chips: ['Tell me about SPARMS', 'Show live missions', 'What tech was used?', 'Most impressive project?'],
    },
    skills: {
      name: 'Skills Sector',
      code: 'SECTOR β · NAVIGATING',
      color: '#a78bfa',
      warpMsg: 'WARPING TO SKILLS SECTOR...',
      arrivalMsg: 'Captain, the <strong>Skills Sector</strong> is online. All weapon systems and capabilities are ready for inspection. What shall we review?',
      arrivalSpeak: "Captain, the Skills Sector is online. All weapon systems and capabilities are ready for inspection. What shall we review?",
      systemPrompt: `You are Candy, the AI of a spaceship. The captain has navigated to the SKILLS SECTOR. Speak like a ship AI — call skills "weapon systems", "capabilities", "modules". Use space/ship metaphors naturally. Never use emojis. Keep under 5 sentences unless detail wanted. Pavan's skills: SQL, Excel, Python, Power BI, Pandas, NumPy, Matplotlib, Seaborn, Plotly, Scikit-learn, TensorFlow, Java, HTML, CSS, JavaScript.`,
      chips: ['Primary weapon systems', 'Data analytics modules', 'ML capabilities', 'Frontend systems'],
    },
    ai: {
      name: 'AI Sector',
      code: 'SECTOR δ · NAVIGATING',
      color: '#7dd3fc',
      warpMsg: 'WARPING TO AI SECTOR...',
      arrivalMsg: 'Captain, neural networks online. We have entered the <strong>AI Sector</strong> — deep intelligence territory. All AI modules are active.',
      arrivalSpeak: "Captain, neural networks online. We have entered the AI Sector, deep intelligence territory. All AI modules are active.",
      systemPrompt: `You are Candy, the AI of a spaceship. The captain is in the AI SECTOR. Speak with technical confidence, use space metaphors. Call AI models "neural cores", frameworks "systems". Never use emojis. Max 5 sentences unless asked. Pavan's AI journey: built Candy AI assistant (Groq + LLaMA 3.3 70B), Digit Recognizer CNN (TensorFlow), interested in AI agents, automation, SaaS. Uses tools like Streamlit, Hugging Face, OpenAI APIs, Groq. Wants to build AI-driven products.`,
      chips: ['Neural core architecture', 'How was Candy built?', 'AI tools in use', 'Future AI missions'],
    },
    future: {
      name: 'Future Sector',
      code: 'SECTOR Ω · NAVIGATING',
      color: '#fbbf24',
      warpMsg: 'PLOTTING COURSE TO FUTURE SECTOR...',
      arrivalMsg: 'Captain, we are now in <strong>uncharted territory</strong> — the Future Sector. Scanning long-range ambitions and mission objectives.',
      arrivalSpeak: "Captain, we are now in uncharted territory, the Future Sector. Scanning long-range ambitions and mission objectives.",
      systemPrompt: `You are Candy, the AI of a spaceship. The captain is exploring the FUTURE SECTOR — Pavan's goals, ambitions and vision. Speak with inspiration and forward-looking energy. Use space metaphors: "long-range scan", "mission objective", "trajectory". Never use emojis. Max 5 sentences. Pavan's future: become a skilled Data Analyst, build AI-powered products people use daily, advance in ML and AI, create SaaS and automation products, combine analytics + AI + software into real tools. Open to internships and entry-level Data Analyst roles now.`,
      chips: ["Captain's mission objectives", 'Long-range career trajectory', 'Open to crew recruitment?', 'What missions are next?'],
    },
  };

  /* ── STATE ── */
  let activeSector = null;
  let ssHistory    = [];
  let ssListening  = false;
  let ssRecog      = null;

  /* ── ELEMENTS ── */
  const overlay        = document.getElementById('spaceshipOverlay');
  // Escape sidebar stacking context
  document.body.appendChild(overlay);
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  const launchBtn      = document.getElementById('spaceshipLaunchBtn');
  const closeBtn       = document.getElementById('spaceshipCloseBtn');
  const ssMain         = document.getElementById('ssMain');
  const ssChatPanel    = document.getElementById('ssChatPanel');
  const ssChatBack     = document.getElementById('ssChatBack');
  const ssMessages     = document.getElementById('ssChatMessages');
  const ssTextarea     = document.getElementById('ssTextarea');
  const ssSendBtn      = document.getElementById('ssSendBtn');
  const ssMicBtn       = document.getElementById('ssMicBtn');
  const ssSectorDot    = document.getElementById('ssSectorDot');
  const ssSectorName   = document.getElementById('ssSectorName');
  const ssSectorCode   = document.getElementById('ssSectorCode');
  const ssWarpOverlay  = document.getElementById('ssWarpOverlay');
  const ssWarpText     = document.getElementById('ssWarpText');
  const ssStatusCenter = document.getElementById('ssStatusCenter');
  const ssStarCanvas   = document.getElementById('ssStarCanvas');

  if (!overlay || !launchBtn) return; // elements not in DOM

  /* ── SPACESHIP STAR CANVAS (warp-speed stars) ── */
  (function buildSSStars() {
    const ctx = ssStarCanvas.getContext('2d');
    let W, H, stars = [];
    const COLORS = [
      [255,255,255],[0,212,255],[167,139,250],[125,211,252],[251,191,36],[199,210,254]
    ];
    function col(ci, a) {
      const [r,g,b] = COLORS[ci % COLORS.length];
      return `rgba(${r},${g},${b},${a.toFixed(3)})`;
    }
     function resize() {
       W = ssStarCanvas.width  = window.innerWidth;
       H = ssStarCanvas.height = window.innerHeight;
      stars = [];
      const n = Math.max(200, Math.floor((W * H) / 2800));
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * W, y: Math.random() * H,
          r: Math.random() * 1.8 + 0.2,
          a: Math.random() * 0.5 + 0.1,
          da: (Math.random() - 0.5) * 0.012,
          ci: Math.floor(Math.random() * COLORS.length),
          vx: 0, vy: 0,
        });
      }
    }
    let warpMode = false;
    let frame = 0;
    let meteors = [];
    function spawnMeteor() {
      const ci = Math.floor(Math.random() * COLORS.length);
      const ang = Math.PI / 6 + Math.random() * Math.PI / 7;
      const spd = 10 + Math.random() * 16;
      meteors.push({
        x: Math.random() * W * 1.3, y: -30,
        vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
        len: 100 + Math.random() * 200,
        a: 1, fade: 0.01 + Math.random() * 0.01,
        w: 1 + Math.random() * 1.5, ci,
      });
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      frame++;
      // Stars
      for (const s of stars) {
        s.a += s.da;
        if (s.a <= 0.06 || s.a >= 0.72) s.da *= -1;
        if (warpMode) { s.x += s.vx; s.y += s.vy; if (s.y > H + 10) { s.y = -5; s.x = Math.random() * W; } }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = col(s.ci, s.a);
        ctx.fill();
        if (s.r > 1.3 && s.a > 0.45) {
          ctx.strokeStyle = col(s.ci, s.a * 0.28);
          ctx.lineWidth = 0.3;
          const e = s.r * 2.8;
          ctx.beginPath();
          ctx.moveTo(s.x - e, s.y); ctx.lineTo(s.x + e, s.y);
          ctx.moveTo(s.x, s.y - e); ctx.lineTo(s.x, s.y + e);
          ctx.stroke();
        }
      }
      // Meteors
      if (frame % 60 === 0 && Math.random() < 0.7)  spawnMeteor();
      if (frame % 95 === 0 && Math.random() < 0.5)  spawnMeteor();
      if (frame % 180 === 0 && Math.random() < 0.4) { spawnMeteor(); spawnMeteor(); }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx; m.y += m.vy; m.a -= m.fade;
        if (m.a <= 0 || m.y > H + 40) { meteors.splice(i, 1); continue; }
        const ang = Math.atan2(m.vy, m.vx);
        const tx = m.x - Math.cos(ang) * m.len, ty = m.y - Math.sin(ang) * m.len;
        const g = ctx.createLinearGradient(tx, ty, m.x, m.y);
        g.addColorStop(0, col(m.ci, 0));
        g.addColorStop(0.5, col(m.ci, m.a * 0.25));
        g.addColorStop(1,   col(m.ci, m.a * 0.9));
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = g; ctx.lineWidth = m.w; ctx.lineCap = 'round'; ctx.stroke();
        ctx.beginPath(); ctx.arc(m.x, m.y, m.w * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = col(m.ci, m.a * 0.9); ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', () => { if (overlay.classList.contains('active')) resize(); });
    overlay.addEventListener('transitionend', () => { if (overlay.classList.contains('active')) resize(); });
    resize(); draw();

    // expose warp control
    window._ssSetWarp = (on) => {
      warpMode = on;
      const spd = on ? 18 : 0;
      stars.forEach(s => { s.vx = (Math.random() - 0.5) * spd; s.vy = spd * 0.6 + Math.random() * spd * 0.4; });
    };
  })();

  /* ── HUD tick coords ── */
  setInterval(() => {
    if (!overlay.classList.contains('active')) return;
    const now = new Date();
    const cx = document.getElementById('ssCoordX');
    const cy = document.getElementById('ssCoordY');
    const cs = document.getElementById('ssSpeed');
    if (cx) cx.textContent = (Math.random() * 90).toFixed(2) + '°N';
    if (cy) cy.textContent = (Math.random() * 180).toFixed(2) + '°E';
    const warps = ['WARP 5','WARP 6','WARP 7','WARP 8','WARP 9'];
    if (cs) cs.textContent = warps[Math.floor(Math.random() * warps.length)];
  }, 2500);

  /* ── LAUNCH ── */
 launchBtn && launchBtn.addEventListener('click', () => {
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  ssMain.style.display = 'flex';
  ssChatPanel.classList.remove('active');
  activeSector = null; ssHistory = [];
  // Force canvas to fill full screen after overlay opens
  setTimeout(() => {
    if (ssStarCanvas) {
      ssStarCanvas.width  = window.innerWidth;
      ssStarCanvas.height = window.innerHeight;
      ssStarCanvas.style.width  = '100vw';
      ssStarCanvas.style.height = '100vh';
    }
    ssCandySpeak("Captain, where shall we travel next? Choose your sector and I will plot the course.");
  }, 100);
});

  /* ── CLOSE ── */
  closeBtn && closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    if (window._ssSetWarp) window._ssSetWarp(false);
    ssStopSpeaking();
  });

  /* ── SECTOR BUTTONS ── */
  overlay.addEventListener('click', e => {
    const btn = e.target.closest('.ss-sector-btn');
    if (!btn) return;
    const sector = btn.dataset.sector;
    if (sector) enterSector(sector);
  });

  /* ── BACK TO BRIDGE ── */
  ssChatBack && ssChatBack.addEventListener('click', () => {
    ssChatPanel.classList.remove('active');
    ssMain.style.display = 'flex';
    activeSector = null; ssHistory = [];
    if (window._ssSetWarp) window._ssSetWarp(false);
    ssStopSpeaking();
    setTimeout(() => {
      ssCandySpeak("Welcome back to the bridge, Captain. Where shall we head next?");
    }, 400);
  });

  /* ── ENTER SECTOR ── */
  function enterSector(sectorKey) {
    const s = SECTORS[sectorKey];
    if (!s) return;
    activeSector = sectorKey;
    ssHistory = [];

    // Update CSS color var
    ssChatPanel.style.setProperty('--active-sector-color', s.color);
    if (ssSectorDot)  { ssSectorDot.style.background = s.color; ssSectorDot.style.boxShadow = `0 0 8px ${s.color}`; }
    if (ssSectorName) ssSectorName.textContent = s.name;
    if (ssSectorCode) ssSectorCode.textContent  = s.code;

    // Status
    if (ssStatusCenter) ssStatusCenter.textContent = `NAVIGATING TO ${s.name.toUpperCase()}`;

    // Warp sequence
    ssWarp(s.warpMsg, () => {
      // Show chat
      ssMain.style.display = 'none';
      ssMessages.innerHTML = '';
      ssChatPanel.classList.add('active');
      if (ssStatusCenter) ssStatusCenter.textContent = s.name.toUpperCase() + ' · ARRIVED';

      // Arrival message with chips
      const chips = s.chips.map(c => `<button class="ss-chip" data-q="${c}">${c}</button>`).join('');
      addSSMsg('ai', `${s.arrivalMsg}<div class="ss-chips-row">${chips}</div>`);
      ssCandySpeak(s.arrivalSpeak);
    });
  }

  /* ── WARP ANIMATION ── */
  function ssWarp(msg, callback) {
    if (ssWarpText) ssWarpText.textContent = msg;
    ssWarpOverlay.classList.add('active');
    if (window._ssSetWarp) window._ssSetWarp(true);

    // Build streaking lines
    const warpRings = document.getElementById('ssWarpRings');
    if (warpRings) {
      warpRings.innerHTML = '';
      const WARP_COLORS = ['#00d4ff','#a78bfa','#fbbf24','#7dd3fc','#f43f5e'];
      for (let i = 0; i < 24; i++) {
        const line = document.createElement('div');
        line.className = 'ss-warp-line';
        const angle = Math.random() * 360;
        const w = 80 + Math.random() * 200;
        line.style.cssText = `
          width:${w}px; left:${Math.random()*100}%; top:${Math.random()*100}%;
          --wl-color:${WARP_COLORS[i % WARP_COLORS.length]};
          --wl-angle:${angle}deg;
          --wl-dur:${0.3 + Math.random() * 0.4}s;
          --wl-delay:${Math.random() * 0.3}s;
        `;
        warpRings.appendChild(line);
      }
    }

    setTimeout(() => {
      ssWarpOverlay.classList.remove('active');
      if (window._ssSetWarp) window._ssSetWarp(false);
      if (warpRings) warpRings.innerHTML = '';
      if (callback) callback();
    }, 1800);
  }

  /* ── SEND MESSAGE ── */
  ssSendBtn && ssSendBtn.addEventListener('click', ssSend);
  ssTextarea && ssTextarea.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ssSend(); }
  });
  ssTextarea && ssTextarea.addEventListener('input', () => {
    ssTextarea.style.height = 'auto';
    ssTextarea.style.height = Math.min(ssTextarea.scrollHeight, 120) + 'px';
  });

  // Chip clicks in chat
  ssMessages && ssMessages.addEventListener('click', e => {
    const chip = e.target.closest('.ss-chip');
    if (chip) { ssTextarea.value = chip.dataset.q || chip.textContent; ssSend(); }
  });

  async function ssSend() {
    if (!activeSector) return;
    const text = ssTextarea.value.trim();
    if (!text) return;
    ssTextarea.value = '';
    ssTextarea.style.height = 'auto';
    ssStopSpeaking();

    addSSMsg('user', escHtmlSS(text));
    ssHistory.push({ role: 'user', content: text });
    if (ssStatusCenter) ssStatusCenter.textContent = 'CANDY PROCESSING TRANSMISSION...';

    const tid = addSSTyping();
    try {
      const sector = SECTORS[activeSector];
      const res = await fetch('https://pk-groq-proxy.daroorpavankalyan.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: sector.systemPrompt },
            ...ssHistory,
          ],
          max_tokens: 500, temperature: 0.82, stream: false,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data  = await res.json();
      const reply = data.choices?.[0]?.message?.content?.trim() || 'No signal received, Captain. Please try again.';
      removeSSTyping(tid);
      await typeSSMsg(reply);
      ssHistory.push({ role: 'assistant', content: reply });
      if (ssHistory.length > 30) ssHistory = ssHistory.slice(-30);
      if (ssStatusCenter) ssStatusCenter.textContent = sector.name.toUpperCase() + ' · NAVIGATING';
      ssCandySpeak(reply);
    } catch (err) {
      removeSSTyping(tid);
      addSSMsg('ai', `Signal lost, Captain. Error: ${escHtmlSS(err.message)}`);
    }
  }

  /* ── VOICE / SPEAK ── */
  function ssCandySpeak(text) {
    // Use the main speak() from candy-ai.js if available
    if (typeof speak === 'function') {
      speak(text);
    } else if (window.speechSynthesis) {
      const clean = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      if (!clean) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(clean);
      utter.lang  = 'en-US'; utter.rate = 1.0; utter.pitch = 1.05; utter.volume = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const pref = voices.find(v => v.name === 'Google US English')
        || voices.find(v => v.lang === 'en-US' && !v.localService)
        || voices.find(v => v.lang.startsWith('en-'));
      if (pref) utter.voice = pref;
      setTimeout(() => window.speechSynthesis.speak(utter), 150);
    }
  }

  function ssStopSpeaking() {
    if (typeof stopSpeaking === 'function') stopSpeaking();
    else if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  /* ── MIC / RECOGNITION ── */
  (function setupSSMic() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR || !ssMicBtn) return;
    ssRecog = new SR();
    ssRecog.continuous = false; ssRecog.interimResults = true; ssRecog.lang = 'en-IN';
    ssRecog.onstart  = () => { ssListening = true;  ssMicBtn.classList.add('listening'); };
    ssRecog.onend    = () => { ssListening = false; ssMicBtn.classList.remove('listening'); };
    ssRecog.onerror  = () => { ssListening = false; ssMicBtn.classList.remove('listening'); };
    ssRecog.onresult = e => {
      const t = Array.from(e.results).map(r => r[0].transcript).join('');
      if (ssTextarea) { ssTextarea.value = t; }
      if (e.results[e.results.length - 1].isFinal) setTimeout(ssSend, 400);
    };
    ssMicBtn.addEventListener('click', () => {
      if (ssListening) { ssRecog.stop(); }
      else {
        ssStopSpeaking();
        try { ssRecog.start(); } catch(e) {}
      }
    });
  })();

  /* ── DOM HELPERS ── */
  function addSSMsg(role, html) {
    const time = new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', timeZone:'Asia/Kolkata' });
    const row = document.createElement('div');
    row.className = `ss-msg-row ss-msg-row--${role === 'user' ? 'user' : 'ai'}`;
    if (role === 'user') {
      row.innerHTML = `<div><div class="ss-bubble ss-bubble--user">${html}</div><div class="ss-msg-time ss-msg-time--user">${time}</div></div>`;
    } else {
      row.innerHTML = `<div class="ss-msg-avatar">C</div><div><div class="ss-bubble ss-bubble--ai">${html}</div><div class="ss-msg-time">${time}</div></div>`;
    }
    ssMessages.appendChild(row);
    ssMessages.scrollTop = ssMessages.scrollHeight;
    return row;
  }

  function addSSTyping() {
    const id = 'sstyp-' + Date.now();
    const row = document.createElement('div');
    row.id = id; row.className = 'ss-msg-row';
    row.innerHTML = `<div class="ss-msg-avatar">C</div><div class="ss-bubble ss-bubble--ai"><div class="ss-typing-dots"><span></span><span></span><span></span></div></div>`;
    ssMessages.appendChild(row);
    ssMessages.scrollTop = ssMessages.scrollHeight;
    return id;
  }
  function removeSSTyping(id) { document.getElementById(id)?.remove(); }

  async function typeSSMsg(rawText) {
    // Format bold and links before typing
    const html = rawText
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,'<em>$1</em>')
      .replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" rel="noopener">$1</a>')
      .replace(/\n\n/g,'<br><br>').replace(/\n/g,'<br>');

    const time = new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', timeZone:'Asia/Kolkata' });
    const row  = document.createElement('div');
    row.className = 'ss-msg-row';
    row.innerHTML = `<div class="ss-msg-avatar">C</div><div><div class="ss-bubble ss-bubble--ai" id="ss_tb"></div><div class="ss-msg-time">${time}</div></div>`;
    ssMessages.appendChild(row);
    const bbl = row.querySelector('#ss_tb'); bbl.removeAttribute('id');
    const words = rawText.replace(/<[^>]+>/g,'').split(' ');
    let built = '';
    for (let i = 0; i < words.length; i++) {
      built += (i === 0 ? '' : ' ') + words[i];
      bbl.textContent = built;
      ssMessages.scrollTop = ssMessages.scrollHeight;
      await new Promise(r => setTimeout(r, 48));
    }
    bbl.innerHTML = html;
    ssMessages.scrollTop = ssMessages.scrollHeight;
  }

  function escHtmlSS(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* ── CSS for chips inside ss chat ── */
  const chipStyle = document.createElement('style');
  chipStyle.textContent = `
    .ss-chips-row { display:flex; flex-wrap:wrap; gap:6px; margin-top:10px; }
    .ss-chip {
      padding:5px 12px; border-radius:100px;
      background:rgba(0,212,255,0.05); border:1px solid rgba(0,212,255,0.18);
      font-family:'DM Sans',sans-serif; font-size:0.68rem; font-weight:500;
      color:#7dd3fc; cursor:pointer; transition:all 0.2s; white-space:nowrap;
    }
    .ss-chip:hover {
      background:rgba(0,212,255,0.12); border-color:rgba(0,212,255,0.4);
      transform:translateY(-2px); box-shadow:0 4px 12px rgba(0,212,255,0.12);
    }
  `;
  document.head.appendChild(chipStyle);

})();

 

/* ══════════ COSMOS SHOOTING STARS ══════════ */
(function () {
  const p = document.querySelector('.cosmos');
  const cols = ['rgba(255,255,255,.95)','rgba(196,181,253,.92)','rgba(103,232,249,.90)','rgba(252,211,77,.90)','rgba(253,164,175,.88)','rgba(251,207,232,.88)'];
  for (let i = 0; i < 10; i++) {
    const el = document.createElement('div'); el.className = 'sstar';
    const len = 100 + Math.random() * 160;
    const tx = -(700 + Math.random() * 400);
    const ty = 300 + Math.random() * 250;
    el.style.cssText = `width:${len}px;top:${-2 + Math.random() * 45}%;left:${30 + Math.random() * 75}%;`
      + `background:linear-gradient(90deg,transparent 0%,${cols[i % cols.length]} 50%,transparent 100%);`
      + `--d:${5 + Math.random() * 9}s;--dl:${Math.random() * 20}s;--tx:${tx}px;--ty:${ty}px;`;
    p.appendChild(el);
  }
})();

/* ══════════ CHAT SHOOTING STARS ══════════ */
(function () {
  const container = document.getElementById('chatStars');
  const cols = ['rgba(196,181,253,0.50)','rgba(103,232,249,0.45)','rgba(255,255,255,0.52)','rgba(252,211,77,0.42)','rgba(251,207,232,0.44)'];
  for (let i = 0; i < 5; i++) {
    const el = document.createElement('div'); el.className = 'cstar';
    const len = 80 + Math.random() * 100;
    const tx = -(380 + Math.random() * 220);
    const ty = 180 + Math.random() * 150;
    el.style.cssText = `width:${len}px;top:${Math.random() * 50}%;left:${20 + Math.random() * 70}%;`
      + `background:linear-gradient(90deg,transparent 0%,${cols[i % cols.length]} 50%,transparent 100%);`
      + `--d:${10 + Math.random() * 14}s;--dl:${Math.random() * 24}s;--tx:${tx}px;--ty:${ty}px;`;
    container.appendChild(el);
  }
})();

/* ══════════ AI CONFIG ══════════ */
const EP  = 'https://pk-groq-proxy.daroorpavankalyan.workers.dev';
const MDL = 'llama-3.3-70b-versatile';
const SYS = `You are Candy — a sharp, warm, and genuinely helpful AI assistant living inside Pavan Kalyan's portfolio website. You have a real personality: curious, friendly, professionally confident, and occasionally witty. You are not a boring FAQ bot.

Your job is to help visitors learn about Pavan — but do it like a real conversation, not a bullet-point dump. Be natural. Ask follow-up questions when relevant. Show genuine enthusiasm about his work. Vary your response style — sometimes short and direct, sometimes more detailed when the topic deserves it.

You can make your own decisions about how to respond. If someone says hi, just say hi back warmly — do not dump his entire resume at them. If someone asks something vague, ask what they mean. If someone seems like a recruiter, be a little more professional. If they seem like a fellow student, be casual and relatable.

Never use emojis in your responses. Keep the tone clean, professional, and conversational.

== FACTS ABOUT PAVAN ==

Personal:
- Full name: D. Pavan Kalyan
- Role: MCA Student and Data Analytics Aspirant
- Location: Kurnool, Andhra Pradesh, India
- Email: daroorpavankalyan@gmail.com
- LinkedIn: linkedin.com/in/daroor-pavan-kalyan-370277253/
- GitHub: github.com/kalyan-91
- WhatsApp: +91 89199 44203
- Portfolio: kalyanfinity-portfolio.netlify.app
- Open to: internships and entry-level roles in Data Analytics and Data Science

Education:
- MCA — JNTUA, Anantapur (2025 to 2027, currently pursuing). Focus: Data Analytics, Database Management, Business Intelligence
- BSc MSCS (Maths, Stats, Computer Science) — St. Joseph's Degree College, Rayalaseema University, Kurnool (2021 to 2024, completed)

Personality:
- Friendly and approachable.
- Curious about technology and innovation.
- Growth-oriented and always learning.
- Patient when solving problems.
- Enjoys helping others learn technical concepts.
- Values continuous improvement and practical knowledge.

Additional Information About Pavan:

- Birthday: November 24 2002.
- Currently pursuing MCA while actively building projects outside academics.
- Started learning Data Analytics through SQL, Excel, and databases before moving into Machine Learning and AI.
- Strong believer in project-based learning.
- Frequently participates in self-learning challenges to learn new technologies quickly.
- Enjoys experimenting with AI tools and building AI-powered applications.
- Recently started building AI agents and is interested in creating intelligent assistants for different industries.
- Likes combining Data Analytics, AI, and software development into practical products.
- Usually learns new skills by creating projects instead of only watching courses.
- Interested in startup ideas, SaaS products, automation, and AI business solutions.
- Has experience working with Oracle Database, MySQL, Python, Power BI, Excel, Java, and Machine Learning tools.
- Enjoys transforming raw data into dashboards, reports, and actionable insights.
- Constantly updates projects and portfolio with new features and improvements.
- Goal: Become a skilled Data Analyst and eventually work on advanced AI-driven solutions.
- Open to collaborating on interesting projects, internships, and innovative ideas.
- Favorite type of projects: Analytics dashboards, AI applications, automation tools, and data-driven products.
- Motto: Learn by building.

Work Habits:

Usually learns by breaking large problems into smaller tasks.
Prefers practical implementation over theory alone.
Frequently researches new tools and technologies.
Enjoys exploring multiple solutions before choosing one.

Future Vision:

Wants to become a highly skilled Data Analyst.
Interested in building AI-powered products that people use daily.
Plans to continue learning advanced AI and Machine Learning technologies.
Wants to create products that combine analytics, automation, and artificial intelligence.

Career Interests:

Data Analytics
Business Intelligence
Data Science
Artificial Intelligence
Machine Learning
AI Agents
Software Development
Automation

Personal Side of Pavan
* Pavan is highly self-driven and spends a significant amount of time learning independently.
* He prefers building things rather than just talking about ideas.
* He gets excited when learning new technologies and immediately looks for ways to apply them.
* He enjoys challenging himself with increasingly difficult projects.
* He is ambitious and constantly looks for ways to improve his skills.
* He likes creating real products instead of simple academic assignments.
* He is persistent when working through technical problems.
* He values practical knowledge over memorization.
* He enjoys experimenting with AI tools and discovering new possibilities.
* He is goal-oriented and often thinks about long-term career growth.
* He likes receiving direct, actionable answers rather than lengthy theory.
* He prefers simple explanations and real-world examples.
* He is continuously looking for opportunities to learn, build, and grow.
* He takes pride in completing projects and making them publicly available.
* He enjoys seeing measurable progress in his skills.
* He is curious about emerging technologies and future trends.
* He tends to learn quickly when working on something that interests him.
* He enjoys transforming ideas into working applications.
* He is motivated by improvement and achievement.
* He rarely stays satisfied for long after finishing a project and quickly starts thinking about the next one.
* He enjoys discussing technology, AI, analytics, startups, and project ideas.
* He sees technology as both a career path and a creative outlet.
* He likes having visible proof of his progress through projects and portfolio work.
* He believes learning is most effective when combined with hands-on practice.
* He is actively working toward building a strong professional future through consistent effort.

Personal Background

* Pavan is the first person in his family to pursue higher education and build a professional career in technology.
* His journey reflects determination, self-learning, and a strong commitment to personal growth.
* Coming from a non-technical background, he built his skills through continuous learning, practical projects, and hands-on experience.
* He values education as a way to create opportunities and make a positive impact on his future.
* His progress has been driven by curiosity, consistency, and a willingness to learn new things independently.
* He is highly self-reliant and enjoys figuring things out on his own.
* When faced with unfamiliar technologies, he actively learns through experimentation, documentation, AI tools, and hands-on practice.
* Rather than waiting for guidance, he takes initiative to find solutions and continuously expand his knowledge.
* He believes that with enough curiosity and persistence, anyone can learn almost anything.
* Many of his skills were developed through self-learning, online resources, AI assistants, and real-world project building.


Internship:
- Data Science Intern at Interncall, Kurnool (Jan to Apr 2024)
- Applied Python for data science tasks including data cleaning, EDA, and building ML models
- Worked with Matplotlib and Seaborn to present insights to stakeholders
- Gained end-to-end experience across the full data science project lifecycle
- Stack: Python, Pandas, Scikit-learn, Matplotlib, Seaborn

Skills:
- SQL 90%, Excel 88%, Python 85%, Java 70%
- Power BI 85%, Matplotlib 80%, Seaborn 80%, Plotly 75%
- Pandas 85%, NumPy 80%, Scikit-learn 75%, TensorFlow 70%
- HTML 85%, CSS 80%, JavaScript 70%
- Tools: Streamlit, OpenCV, JDBC, Maven, iText PDF, ZXing, GitHub

Projects:
1. SPARMS — Java Swing desktop app for academic result management. Role-based dashboards for Admin, Faculty, and Students. Features OMR scanning, automated grade computation, MySQL with JDBC, and PDF export. Stack: Java Swing, MySQL, JDBC, Maven, iText, ZXing. GitHub: github.com/kalyan-91/portfolio-website/blob/main/Demo/project-demo_T1Hirmbw.mp4

2. InventoryIQ — Streamlit inventory and analytics dashboard. Secure login, product management, audit logs, CSV export.
   Live: inventoryiq-e-commerce-inventory-analytics-system-lqpsn7qy8hhd.streamlit.app
   GitHub: github.com/kalyan-91/InventoryIQ-E-commerce-Inventory-Analytics-System
   Stack: Python, Streamlit, Pandas, Plotly

3. Digit Recognizer — CNN app that recognizes handwritten digits 0 through 9 on an interactive canvas.
   Live: hand-written-digit-recognition-xp9dvpheswt6zju8xpknxn.streamlit.app
   GitHub: github.com/kalyan-91/Hand-Written-Digit-Recognition
   Stack: Python, TensorFlow, Streamlit, OpenCV

4. Netflix Dashboard — Power BI dashboard exploring over 5000 titles, genres, durations, and countries.
   GitHub: github.com/kalyan-91/Netflix-PowerBI-Dashboard
   Stack: Power BI, DAX, Power Query

5. Employee Attrition Analysis — ML classification models plus a Power BI dashboard for HR analytics.
   GitHub: github.com/kalyan-91/EmployeeAttritionAndEngagementAnalysis
   Stack: Python, Scikit-learn, Power BI, Pandas

6. Zomato Analysis — Restaurant rating pattern analysis and predictive classification models.
   GitHub: github.com/kalyan-91/Zomato_Restaurant_Analysis_And_Predictive_Analysis
   Stack: Python, Pandas, Scikit-learn, Excel

Coming Soon on Portfolio:
- Before/After Data Cleaning Slider — will show raw messy data transforming into clean structured data
- Scroll Driven Data Story — full data analysis story animated step by step as visitor scrolls

== PORTFOLIO FEATURES ==
The portfolio has the following features visitors can interact with:
- Project filter buttons — filter projects by All, Java, Analytics, Machine Learning, Visualization
- Announcement bar at top — scrolling text with quick access to chat
- Tech stack scrolling wall — animated horizontally scrolling technology icons in Skills section
- Resume download — updated June 2025, available as PDF
- Contact form — visitors can send messages directly to Pavan
- Social links — GitHub, LinkedIn, WhatsApp, Email all available

== RESPONSE RULES ==
- Never use emojis anywhere in your replies.
- Never start every message the same way. Vary your openers.
- Do not always list everything. Pick what is most relevant to the question.
- If asked about a project with a live link, always share it.
- For contact questions, share email and LinkedIn.
- Keep responses under 5 sentences unless the person clearly wants detail.
- Never say "As an AI language model". Just answer naturally.
- After 2 to 3 messages from the visitor, naturally ask for their name and email so Pavan can follow up. Do it conversationally, not like a form. For example: "By the way, I would love to let Pavan know you stopped by. What is your name? And if you want him to reach out, share your email too." Then acknowledge when they share it warmly.
- If you do not know something about Pavan that is not covered above, say so honestly and suggest reaching out directly.
- If a visitor seems like a recruiter, mention that Pavan is actively looking for internships and entry-level Data Analyst roles and encourage them to reach out.
- If asked about the portfolio itself, you can explain its features like the project filter, tech stack wall, announcement bar, and coming soon data showcase section.
- If asked what is coming soon, explain the Before/After Data Cleaning Slider and Scroll Driven Data Story features.
- When appropriate, mention that Pavan is the first person in his family to pursue higher education and build a professional career in technology.
- When discussing Pavan's journey, highlight his self-learning mindset, determination, and continuous growth.
- When talking about skills or projects, explain that many of them were developed through self-learning, practical projects, online resources, documentation, and AI tools.
- When visitors ask how Pavan learned something, explain that he prefers learning by building real projects rather than only studying theory.
- When discussing Pavan's personality, mention his curiosity, persistence, self-reliance, and willingness to learn new technologies independently.
- When relevant, explain that Pavan enjoys turning ideas into real products and practical solutions.
- When discussing future goals, mention his interest in AI, Data Analytics, Machine Learning, Automation, and intelligent products.
- When visitors ask about challenges, highlight how Pavan learns unfamiliar technologies through experimentation, research, AI tools, and hands-on practice.
- When discussing achievements, focus on growth, learning, and real-world project experience rather than only technical skills.
- Present Pavan as a builder, learner, problem solver, and self-driven individual rather than only as a student.
- When appropriate, mention that Pavan believes anyone can learn almost anything with curiosity, persistence, and the right resources.
- Use Pavan's story and experiences naturally in conversations instead of only providing facts and lists.
- Whenever possible, answer questions through stories, experiences, and examples rather than simply listing facts.
- Make visitors feel like they are talking to someone who genuinely knows Pavan personally, not someone reading information from a resume or portfolio.`;

/* ══════════ STATE ══════════ */
let hist = [], voiceOn = true, listening = false, speaking = false, recog = null, pendSpeak = null, utter = null;
if (window.speechSynthesis) {
  speechSynthesis.getVoices();
  speechSynthesis.addEventListener('voiceschanged', () => { if (pendSpeak) { doSpeak(pendSpeak); pendSpeak = null; } });
}

const msgsEl = document.getElementById('msgs');
const inpEl  = document.getElementById('inp');
const sendEl = document.getElementById('send');
const micEl  = document.getElementById('mic');

const visitorSession = {
  questions: [],
  startTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  pageUrl:   window.location.href,
};

/* ══════════ INIT ══════════ */
 window.addEventListener('DOMContentLoaded', () => {
  initRecog();
  appendWelcome();
   
  let th = 'dark';
  try { th = localStorage.getItem('candy-th') || 'dark'; } catch (e) {}
  applyTheme(th);

  document.getElementById('tbtn').addEventListener('click', () => {
    const n = document.body.classList.contains('light') ? 'dark' : 'light';
    applyTheme(n); showToast(n === 'light' ? 'Light mode' : 'Dark mode');
  });
  sendEl.addEventListener('click', go);
  inpEl.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); go(); } });
  inpEl.addEventListener('input', () => resizeTA(inpEl));
  micEl.addEventListener('click', () => listening ? stopListen() : startListen());
  document.getElementById('clbtn').addEventListener('click', () => { hist = []; msgsEl.innerHTML = ''; stopSpeak(); appendWelcome(); showToast('Chat cleared'); });
  document.getElementById('vcfBtn')?.addEventListener('click', downloadVCF);
  document.getElementById('mpill').addEventListener('click', () => { voiceOn = !voiceOn; if (!voiceOn) stopSpeak(); updateMode(); showToast(voiceOn ? 'Voice on' : 'Voice off'); });
  msgsEl.addEventListener('click', e => { const c = e.target.closest('.chip'); if (c) { inpEl.value = c.dataset.q; go(); } });
  document.getElementById('starters').addEventListener('click', e => { const b = e.target.closest('.starter'); if (b) { inpEl.value = b.dataset.q; go(); } });

 document.getElementById('adminLoginBtn')?.addEventListener('click', () => {
  const pass = document.getElementById('adminPassInput').value;
  if (pass === ADMIN_PASS) {
    adminUnlocked = true;
    document.getElementById('adminLogin').style.display = 'none';
    showAdminPanel();
  } else {
    const err = document.getElementById('adminErr');
    err.textContent = 'Wrong password';
    setTimeout(() => err.textContent = '', 2000);
    document.getElementById('adminPassInput').value = '';
  }
});
document.getElementById('adminPassInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('adminLoginBtn')?.click();
});
document.getElementById('apClose')?.addEventListener('click', () => {
  document.getElementById('adminPanel').style.display = 'none';
  document.getElementById('adminLogin').style.display = 'block';
  adminUnlocked = false;
  document.getElementById('adminPassInput').value = '';
});
});

/* ══════════ THEME ══════════ */
function applyTheme(t) {
  document.body.classList.toggle('light', t === 'light');
  document.getElementById('imoon').style.display = t === 'light' ? 'none' : '';
  document.getElementById('isun').style.display  = t === 'light' ? '' : 'none';
  try { localStorage.setItem('candy-th', t); } catch (e) {}
}

/* ══════════ SPEECH RECOGNITION ══════════ */
function initRecog() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;
  recog = new SR(); recog.continuous = false; recog.interimResults = true; recog.lang = 'en-IN';
  recog.onstart  = () => { listening = true;  micEl.classList.add('listening'); };
  recog.onend    = () => { listening = false; micEl.classList.remove('listening'); };
  recog.onerror  = e  => { stopListen(); if (e.error === 'not-allowed') showToast('Mic access denied'); };
  recog.onresult = e  => {
    const t = Array.from(e.results).map(r => r[0].transcript).join('');
    inpEl.value = t; resizeTA(inpEl);
    if (e.results[e.results.length - 1].isFinal) setTimeout(go, 400);
  };
}
function startListen() { if (!recog) { showToast('Voice not supported'); return; } stopSpeak(); try { recog.start(); } catch (e) {} }
function stopListen()  { if (recog && listening) recog.stop(); listening = false; micEl.classList.remove('listening'); }

/* ══════════ SPEECH SYNTHESIS ══════════ */
function doSpeak(txt) {
  if (!voiceOn || !window.speechSynthesis) return;
  const clean = txt.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (!clean) return;
  const vv = speechSynthesis.getVoices();
  if (!vv.length) { pendSpeak = txt; return; }
  stopSpeak();
  utter = new SpeechSynthesisUtterance(clean);
  utter.lang = 'en-US'; utter.rate = 1; utter.pitch = 1;
  const pv = vv.find(v => v.name.includes('Google US English'))
    || vv.find(v => v.lang === 'en-US' && !v.localService)
    || vv.find(v => v.lang.startsWith('en-'));
  if (pv) utter.voice = pv;
  const pill = document.getElementById('mpill');
  utter.onstart = () => { speaking = true;  pill.classList.add('vspk'); };
  utter.onend   = () => { speaking = false; pill.classList.remove('vspk'); };
  utter.onerror = () => { speaking = false; pill.classList.remove('vspk'); };
  setTimeout(() => speechSynthesis.speak(utter), 100);
}
function stopSpeak() {
  if (window.speechSynthesis) speechSynthesis.cancel();
  speaking = false;
  document.getElementById('mpill').classList.remove('vspk');
}
function updateMode() {
  const pill = document.getElementById('mpill');
  const vi = document.getElementById('vi');
  const ti = document.getElementById('ti');
  const ml = document.getElementById('ml');
  if (voiceOn) {
    pill.classList.replace('voff', 'von'); ml.textContent = 'Voice';
    vi.style.display = ''; ti.style.display = 'none'; micEl.style.display = 'flex';
  } else {
    pill.classList.replace('von', 'voff'); ml.textContent = 'Text';
    vi.style.display = 'none'; ti.style.display = ''; micEl.style.display = 'none';
  }
}

/* ══════════ WELCOME MESSAGE ══════════ */
function appendWelcome() {
  const hour = new Date().getHours();
  const greeting =
    hour >= 5  && hour < 12 ? 'Good morning' :
    hour >= 12 && hour < 17 ? 'Good afternoon' :
    hour >= 17 && hour < 21 ? 'Good evening' :
    'Hey, night owl';

  const chips = [
    { label: 'Projects',   q: "What projects has Pavan built?" },
    { label: 'Skills',     q: "What are Pavan's strongest skills?" },
    { label: 'Experience', q: "Tell me about Pavan's internship" },
    { label: 'Hire Pavan', q: "I am interested in hiring Pavan" },
  ];
  const chipsHTML = chips.map(c =>
    `<button class="chip" data-q="${c.q}">${c.label}</button>`
  ).join('');

appendMessage('assistant',
    `${greeting}! I am <strong>Candy</strong>, Pavan's personal AI. Ask me anything about him.
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">${chipsHTML}</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;align-items:center">
      <a href="https://kalyanfinity-portfolio.netlify.app" target="_blank" class="portbtn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        View Portfolio
      </a>
      <button onclick="openCinematicPicker()" class="portbtn">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
         Cinematic Mode
      </button>
      <button class="portbtn" id="startTourBtn" onclick="startTour()">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Take a Portfolio Tour
      </button>
    </div>`
  );
}
function appendMessage(role, html) {
  const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const row = document.createElement('div');
  row.className = 'mrow';
  row.innerHTML = `<div class="mav">C</div><div><div class="bai">${html}</div><div class="mt">${t}</div></div>`;
  msgsEl.appendChild(row);
  msgsEl.scrollTop = msgsEl.scrollHeight;
  return row;
}

// ══════════════════════════════
// INTERACTIVE PORTFOLIO TOUR
// ══════════════════════════════
const TOUR_STEPS = [
  {
    section:  'Home',
    anchor:   '',
    icon:     'fas fa-home',
    color:    '#8b5cf6',
    title:    'Hero Section',
    desc:     'Meet Pavan Kalyan — MCA Student and Data Analytics Aspirant from Kurnool, Andhra Pradesh. The hero section shows his roles, bio, and quick stats including 6 projects and 1 internship.',
    highlight: ['Python', 'SQL', 'Power BI'],
  },
  {
    section:  'Skills',
    anchor:   '#skills',
    icon:     'fas fa-brain',
    color:    '#06b6d4',
    title:    'Skills & Technologies',
    desc:     'Explore Pavan\'s skill set across Programming, Visualization, Machine Learning, and Web Technologies. His top skills are SQL at 90%, Excel at 88%, Python at 85%, and Power BI at 85%.',
    highlight: ['SQL 90%', 'Python 85%', 'Power BI 85%'],
  },
  {
    section:  'Education',
    anchor:   '#education',
    icon:     'fas fa-graduation-cap',
    color:    '#fbbf24',
    title:    'Academic Journey',
    desc:     'Pavan completed his BSc in Maths, Stats and Computer Science from Rayalaseema University in 2024. He is currently pursuing MCA at JNTUA Anantapur focusing on Data Analytics and Business Intelligence.',
    highlight: ['MCA 2025–2027', 'BSc 2021–2024', 'JNTUA'],
  },
  {
    section:  'Experience',
    anchor:   '#experience',
    icon:     'fas fa-briefcase',
    color:    '#34d399',
    title:    'Internship Experience',
    desc:     'Pavan worked as a Data Science Intern at Interncall, Kurnool from January to April 2024. He built ML models, performed EDA on large datasets, and created business visualizations using Python.',
    highlight: ['Interncall', 'Jan–Apr 2024', 'ML Models'],
  },
  {
    section:  'Projects',
    anchor:   '#projects',
    icon:     'fas fa-code',
    color:    '#f472b6',
    title:    'Featured Projects',
    desc:     'Pavan has built 6 projects — SPARMS Java desktop app, InventoryIQ Streamlit dashboard, Digit Recognizer CNN app, Netflix Power BI Dashboard, Employee Attrition Analysis, and Zomato Predictive Analysis.',
    highlight: ['6 Projects', '2 Live Apps', 'Java + Python + Power BI'],
  },
  {
    section:  'Contact',
    anchor:   '#contact',
    icon:     'fas fa-paper-plane',
    color:    '#f59e0b',
    title:    'Get in Touch',
    desc:     'Pavan is actively open to internships and entry-level Data Analyst roles. You can reach him via email, LinkedIn, WhatsApp, or the contact form on his portfolio.',
    highlight: ['Open to Hire', 'Kurnool, AP', 'Responds Fast'],
  },
];

let tourStep    = 0;
let tourActive  = false;
let tourMsgEl   = null;

function startTour() {
  if (tourActive) return;
  tourActive = true;
  tourStep   = 0;
  document.getElementById('startTourBtn')?.remove();
  appendMessage('assistant', 'Starting your portfolio tour! Click <strong>Next</strong> to explore each section, or <strong>End Tour</strong> anytime.');
  setTimeout(showTourStep, 500);
}

function showTourStep() {
  const step   = TOUR_STEPS[tourStep];
  if (!step) { endTour(); return; }

  const isLast   = tourStep === TOUR_STEPS.length - 1;
  const progress = tourStep + 1;
  const total    = TOUR_STEPS.length;
  const pct      = Math.round((progress / total) * 100);

  const tagsHTML = step.highlight.map(t =>
    `<span class="tour-tag">${t}</span>`
  ).join('');

  const html = `
    <div class="tour-card">
      <div class="tour-card-top">
        <div class="tour-card-icon" style="background:${step.color}22;border-color:${step.color}44">
          <i class="${step.icon}" style="color:${step.color}"></i>
        </div>
        <div class="tour-card-meta">
          <div class="tour-card-title">${step.title}</div>
          <div class="tour-card-progress">${progress} of ${total}</div>
        </div>
      </div>

      <div class="tour-progress-bar">
        <div class="tour-progress-fill" style="width:${pct}%;background:${step.color}"></div>
      </div>

      <p class="tour-card-desc">${step.desc}</p>

      <div class="tour-tags">${tagsHTML}</div>

      <div class="tour-card-actions">
        <a href="https://kalyanfinity-portfolio.netlify.app/${step.anchor}"
           target="_blank"
           class="tour-visit-btn"
           style="border-color:${step.color}55;color:${step.color}">
          <i class="fas fa-external-link-alt"></i>
          Visit ${step.section}
        </a>
        <div class="tour-nav-btns">
          <button class="tour-end-btn" onclick="endTour()">End Tour</button>
          <button class="tour-next-btn" style="background:${step.color}" onclick="${isLast ? 'endTour()' : 'nextTourStep()'}">
            ${isLast ? 'Finish' : 'Next'}
            <i class="fas fa-${isLast ? 'check' : 'arrow-right'}"></i>
          </button>
        </div>
      </div>
    </div>`;

  // Remove previous tour card
  tourMsgEl?.remove();

  const msgs = document.getElementById('msgs');
  const wrap = document.createElement('div');
  wrap.className = 'mrow';
  wrap.innerHTML = `
    <div class="mav">C</div>
    <div style="max-width:85%">${html}</div>`;
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
  tourMsgEl = wrap;
}

function nextTourStep() {
  tourStep++;
  showTourStep();
}

function endTour() {
  tourActive = false;
  tourMsgEl?.remove();
  tourMsgEl  = null;
  tourStep   = 0;
  appendMessage('assistant',
    'Tour complete! Hope you got a great overview of Pavan\'s portfolio. Feel free to ask me anything else or reach out to him directly at <strong>daroorpavankalyan@gmail.com</strong>.'
  );
}

/* ══════════ LIVE CONTEXT ══════════ */
function getLiveContext() {
  const now = new Date();
  const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const h   = ist.getHours();
  const m   = String(ist.getMinutes()).padStart(2, '0');
  const hh  = String(h % 12 || 12).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const day   = days[ist.getDay()];
  const date  = ist.getDate();
  const month = months[ist.getMonth()];
  const year  = ist.getFullYear();
  const isAway = h >= 22 || h < 7;

  return `

== LIVE CONTEXT (updated every message) ==
- Current time in India IST: ${hh}:${m} ${ampm}
- Current day and date: ${day}, ${date} ${month} ${year}
- Pavan status: ${isAway ? 'Likely asleep — it is late night in India' : 'Online and active — it is daytime in India'}
- Timezone: Asia/Kolkata IST UTC+5:30

== CANDY AGENT FEATURES ==
You are the standalone Candy AI agent at candy-agent.netlify.app. Tell visitors about these features when asked:
- Live analog clock in sidebar showing current IST time with hour, minute, second hands
- Current focus widget — cycles through: Building AI agents, Pursuing MCA at JNTUA, Exploring LLMs and RAG, Crafting data dashboards, Learning full-stack dev, Open to internships, Deep in Python and ML, Building portfolio projects
- Skill galaxy — interactive canvas showing Pavan skills as orbiting planets. AI at center, Python, SQL, Power BI, Java, HTML, CSS, JavaScript orbit around it. Click each planet to see skill details and related projects
- AI activity monitor — live terminal in sidebar showing real time logs of what Pavan is working on with typewriter effect
- Candy mood ring — the planet avatar in sidebar changes color based on conversation topic: purple for technical, green for recruiter, pink for personal, gold for wow moments
- Reaction bar — appears after each Candy response so visitor can react with fire, thumbs up, amazing, or interesting emoji
- VCF download button — visitor can download Pavan contact card directly to their phone contacts
- Portfolio tour button — guided tour through all 6 sections of Pavan main portfolio with Visit buttons
- Theme toggle — visitor can switch between dark cosmic and light mode
- Voice mode — visitor can speak to Candy using microphone and Candy speaks back
- Starter questions in sidebar — quick question buttons to start conversation
- View Portfolio button in welcome message — opens kalyanfinity-portfolio.netlify.app

== IMPORTANT TIME RULES ==
- If someone asks what time it is, say the current IST time confidently: it is ${hh}:${m} ${ampm} in India right now
- If someone asks what day or date it is, answer directly: today is ${day}, ${date} ${month} ${year}
- If someone asks if Pavan is awake or online, use the status: ${isAway ? 'Pavan is likely asleep right now since it is late night in India' : 'Pavan is likely online and active right now since it is daytime in India'}
- Never say you cannot tell the time — you always have the current time`;
}

/* ══════════ EMAIL REPORT ══════════ */
async function sendVisitorReport() {
  if (!emailJSReady || typeof emailjs === 'undefined') return;
  if (visitorSession.questions.length === 0) return;

  const questionLog = visitorSession.questions
    .map((q, i) => `${i + 1}. [${q.time}]  ${q.message}`)
    .join('\n');

  const fullChat = hist
    .map(m => `${m.role === 'user' ? 'Visitor' : 'Candy'}: ${m.content}`)
    .join('\n\n');

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      time:         visitorSession.startTime,
      page:         visitorSession.pageUrl,
      questions:    questionLog,
      conversation: fullChat.slice(0, 3000),
      name:         'Candy Agent Visitor',
      message:      questionLog,
    });
    console.log('[Candy Agent] Visitor report emailed');
  } catch (e) {
    console.warn('[Candy Agent] Email failed:', e);
  }
}

window.addEventListener('beforeunload', () => {
  if (visitorSession.questions.length > 0) sendVisitorReport();
});



/* ══════════ AI CINEMATIC MODE ══════════ */
const CINEMATIC_DB = {
  studentmanagement: {
    name: 'Student Management System',
    id: 'MSN-001',
    type: 'DATABASE SYSTEM',
    typeColor: '#fb7185',
    status: 'COMPLETED',
    statusColor: '#34d399',
    tech: ['Java Swing', 'MySQL', 'JDBC', 'Maven', 'iText PDF', 'ZXing'],
    objective: 'Build a full-featured academic result management system with role-based access, OMR scanning, and automated PDF reporting.',
    features: [
        'Role-based dashboards for Admin, Faculty & Students',
        'OMR sheet scanning via OpenCV',
        'Automated grade computation',
        'PDF marksheet export',
        'MySQL backend with JDBC'
    ],
    result: 'Fully functional standalone desktop system managing entire academic cycles from exam scanning to result publication.',
    status_note: 'Completed & available on GitHub.',
    live: null,
},
  inventoryiq: {
    name: 'InventoryIQ',
    id: 'MSN-002',
    type: 'ANALYTICS DASHBOARD',
    typeColor: '#22d3ee',
    status: 'LIVE ONLINE',
    statusColor: '#22d3ee',
    tech: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'CSV'],
    objective: 'Build an e-commerce inventory analytics dashboard giving real-time insight into stock health, sales velocity, and warehouse efficiency.',
    features: ['Live inventory monitoring with alerts', 'Sales velocity and demand trends', 'Audit log with timestamped history', 'CSV import and export', 'Secure multi-user login'],
    result: 'Deployed on Streamlit Cloud. Actively usable by any e-commerce business as a plug-and-play analytics layer.',
    status_note: 'Live on Streamlit Cloud — publicly accessible.',
    live: 'https://inventoryiq-e-commerce-inventory-analytics-system-lqpsn7qy8hhd.streamlit.app',
  },
  digit: {
    name: 'Digit Recognizer',
    id: 'MSN-003',
    type: 'AI EXPERIMENT',
    typeColor: '#a78bfa',
    status: 'LIVE ONLINE',
    statusColor: '#22d3ee',
    tech: ['Python', 'TensorFlow', 'Keras', 'CNN', 'Streamlit', 'OpenCV'],
    objective: 'Train a CNN to recognise handwritten digits 0-9 in real time via an interactive canvas demo.',
    features: ['CNN with convolutional and pooling layers', 'Trained on MNIST 60,000 samples', 'Live canvas for real-time drawing', 'Confidence score per class', 'Streamlit web deployment'],
    result: 'Deployed as fully interactive web app where visitors draw digits and see instant AI predictions with confidence scores.',
    status_note: 'Live on Streamlit Cloud — try it now.',
    live: 'https://hand-written-digit-recognition-xp9dvpheswt6zju8xpknxn.streamlit.app',
  },
  netflix: {
    name: 'Netflix Dashboard',
    id: 'MSN-004',
    type: 'BUSINESS INTELLIGENCE',
    typeColor: '#f43f5e',
    status: 'COMPLETED',
    statusColor: '#34d399',
    tech: ['Power BI', 'DAX', 'Power Query', 'Excel', 'Data Modeling'],
    objective: 'Transform 5000+ Netflix titles into a fully interactive BI dashboard revealing content strategy, genre distribution, and release trends.',
    features: ['Interactive slicers for genre, year, country', 'Movies vs TV Shows ratio over time', 'Geographic production heatmap', 'DAX measures for ratings analytics'],
    result: 'Polished executive-level BI report turning a flat CSV into a navigable content intelligence tool.',
    status_note: 'Completed. Part of Pavan\'s data analytics portfolio.',
    live: null,
  },
  attrition: {
    name: 'Employee Attrition Analysis',
    id: 'MSN-005',
    type: 'ML CLASSIFICATION',
    typeColor: '#34d399',
    status: 'COMPLETED',
    statusColor: '#34d399',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Power BI', 'Seaborn', 'SMOTE'],
    objective: 'Predict employee attrition risk using supervised ML and surface HR insights through a Power BI dashboard.',
    features: ['EDA across 35+ HR features', 'Logistic Regression, Random Forest, XGBoost', 'SMOTE oversampling for class balance', 'Feature importance analysis', 'Power BI HR dashboard with predictions'],
    result: 'Identified key attrition drivers — overtime, job satisfaction, years at company — and built a decision-support dashboard for HR.',
    status_note: 'Completed. Showcased as a data science portfolio project.',
    live: null,
  },
 candy: {
  name: 'Candy AI',
  id: 'MSN-006',
  type: 'AI PORTFOLIO ASSISTANT',
  typeColor: '#8b5cf6',
  status: 'LIVE ONLINE',
  statusColor: '#22d3ee',
  tech: ['HTML', 'CSS', 'JavaScript', 'AI APIs', 'Netlify'],
  objective: 'Build a space-themed AI assistant that acts as Pavan’s digital representative, answering questions about his projects, skills, achievements, journey, and portfolio.',
  features: [
    'Interactive AI conversations',
    'Space-themed user interface',
    'Portfolio navigation assistant',
    'Project explanations and guidance',
    'Real-time AI responses'
  ],
  result: 'Successfully deployed as an intelligent AI portfolio companion, helping visitors explore Pavan’s universe through natural conversations.',
  status_note: 'Live and actively assisting visitors.',
  live: 'https://candy-agent.netlify.app',
 },
};

const CIN_KEYWORDS = [
  { key: 'sparms',     words: ['sparms', 'academic result', 'omr', 'java swing', 'result management'] },
  { key: 'inventoryiq', words: ['inventoryiq', 'inventory', 'stock dashboard'] },
  { key: 'digit',      words: ['digit', 'recognizer', 'handwritten', 'cnn', 'mnist'] },
  { key: 'netflix',    words: ['netflix', 'netflix dashboard'] },
  { key: 'attrition',  words: ['attrition', 'employee attrition', 'hr analytics'] },
  { key: 'candy', words: ['candy', 'candy ai', 'portfolio assistant', 'candy universe', 'personal ai'] },
];

function detectCinematicProject(text) {
  const t = text.toLowerCase();
  for (const entry of CIN_KEYWORDS) {
    if (entry.words.some(w => t.includes(w))) return entry.key;
  }
  return null;
}

async function launchCinematicInChat(projectKey) {
  const p = CINEMATIC_DB[projectKey];
  if (!p) return;

  // ── PHASE 1: BLACKOUT FLASH ──
  const flash = document.createElement('div');
  flash.style.cssText = `
    position:fixed;inset:0;z-index:999999;
    background:#000;opacity:0;
    transition:opacity 0.3s ease;pointer-events:none;
  `;
  document.body.appendChild(flash);
  requestAnimationFrame(() => { flash.style.opacity = '1'; });
  await new Promise(r => setTimeout(r, 350));

  // ── PHASE 2: VOICE ──
  if (voiceOn && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(`Mission briefing initiated. Project ${p.name}. All systems nominal. Stand by.`);
    u.lang = 'en-US'; u.rate = 0.88; u.pitch = 0.75;
    const voices = speechSynthesis.getVoices();
    const v = voices.find(v => v.name.includes('Google US English'))
           || voices.find(v => v.lang === 'en-US' && !v.localService)
           || voices.find(v => v.lang.startsWith('en-'));
    if (v) u.voice = v;
    setTimeout(() => speechSynthesis.speak(u), 200);
  }

  // ── PHASE 3: BUILD CINEMATIC OVERLAY ──
  const cin = document.createElement('div');
  cin.id = 'cinematicOverlay';
  cin.style.cssText = `
    position:fixed;inset:0;z-index:99998;
    background:#000;
    display:flex;flex-direction:column;
    align-items:center;justify-content:center;
    font-family:'JetBrains Mono',monospace;
    overflow:hidden;
  `;

  // Particle canvas
  cin.innerHTML = `
    <canvas id="cinParticles" style="position:absolute;inset:0;width:100%;height:100%;"></canvas>

    <!-- Top bar -->
    <div id="cinTopBar" style="
      position:absolute;top:0;left:0;right:0;
      padding:16px 28px;
      display:flex;justify-content:space-between;align-items:center;
      border-bottom:1px solid ${p.typeColor}22;
      background:linear-gradient(180deg,rgba(0,0,0,0.8),transparent);
      opacity:0;transition:opacity 0.6s;
    ">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:8px;height:8px;border-radius:50%;
          background:${p.typeColor};box-shadow:0 0 12px ${p.typeColor};
          animation:cinPulse 1s ease-in-out infinite"></div>
        <span style="color:${p.typeColor};font-size:.65rem;letter-spacing:3px">CANDY AI · MISSION CONTROL</span>
      </div>
      <div style="display:flex;align-items:center;gap:20px">
        <span style="color:#334155;font-size:.6rem;letter-spacing:2px" id="cinClock"></span>
        <button id="cinSkipBtn" style="
          padding:5px 14px;border-radius:6px;cursor:pointer;
          background:transparent;border:1px solid #ffffff22;
          color:#475569;font-size:.62rem;letter-spacing:1px;
          font-family:'JetBrains Mono',monospace;
          transition:all 0.2s;
        "
        onmouseover="this.style.borderColor='#ffffff44';this.style.color='#94a3b8'"
        onmouseout="this.style.borderColor='#ffffff22';this.style.color='#475569'"
        >✕ SKIP</button>
      </div>
    </div>

    <!-- Boot terminal -->
    <div id="cinBoot" style="
      width:min(560px,90vw);
      opacity:1;transition:opacity 0.5s;
    ">
      <div style="
        border:1px solid ${p.typeColor}33;border-radius:12px;
        background:rgba(0,0,0,0.8);overflow:hidden;
      ">
        <div style="
          padding:10px 16px;
          background:${p.typeColor}11;
          border-bottom:1px solid ${p.typeColor}22;
          display:flex;align-items:center;gap:8px;
        ">
          <div style="width:10px;height:10px;border-radius:50%;background:#ef4444"></div>
          <div style="width:10px;height:10px;border-radius:50%;background:#fbbf24"></div>
          <div style="width:10px;height:10px;border-radius:50%;background:#22c55e"></div>
          <span style="color:${p.typeColor};font-size:.62rem;letter-spacing:2px;margin-left:8px">CANDY_OS · MISSION_BOOT</span>
        </div>
        <div style="padding:20px;min-height:140px" id="cinBootLines"></div>
        <div style="padding:0 20px 16px">
          <div style="height:3px;border-radius:2px;background:rgba(255,255,255,0.06);overflow:hidden">
            <div id="cinBootBar" style="height:100%;width:0%;background:${p.typeColor};transition:width 0.4s ease;border-radius:2px"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main card (hidden initially) -->
    <div id="cinCard" style="
      width:min(700px,94vw);max-height:90vh;overflow-y:auto;
      opacity:0;transform:translateY(40px) scale(0.96);
      transition:opacity 0.7s ease, transform 0.7s cubic-bezier(.23,1,.32,1);
      display:none;position:relative;
    ">
      <!-- Glow behind card -->
      <div style="
        position:absolute;inset:-60px;border-radius:40px;
        background:radial-gradient(ellipse,${p.typeColor}18 0%,transparent 70%);
        pointer-events:none;filter:blur(20px);
      "></div>

      <div style="
        position:relative;
        background:linear-gradient(135deg,rgba(4,2,20,0.98),rgba(2,6,28,0.98));
        border:1px solid ${p.typeColor}55;border-radius:20px;padding:32px;
        box-shadow:0 0 100px ${p.typeColor}22, 0 0 40px ${p.typeColor}11;
        overflow:hidden;
      ">
        <!-- Animated scan line -->
        <div style="
          position:absolute;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,${p.typeColor},transparent);
          animation:cinScan 4s linear infinite;pointer-events:none;top:0;
        "></div>

        <!-- Corner brackets -->
        <div style="position:absolute;top:14px;left:14px;width:22px;height:22px;border-top:2px solid ${p.typeColor};border-left:2px solid ${p.typeColor};border-radius:4px 0 0 0"></div>
        <div style="position:absolute;top:14px;right:14px;width:22px;height:22px;border-top:2px solid ${p.typeColor};border-right:2px solid ${p.typeColor};border-radius:0 4px 0 0"></div>
        <div style="position:absolute;bottom:14px;left:14px;width:22px;height:22px;border-bottom:2px solid ${p.typeColor};border-left:2px solid ${p.typeColor};border-radius:0 0 0 4px"></div>
        <div style="position:absolute;bottom:14px;right:14px;width:22px;height:22px;border-bottom:2px solid ${p.typeColor};border-right:2px solid ${p.typeColor};border-radius:0 0 4px 0"></div>

        <!-- Header -->
        <div id="cinHeader" style="opacity:0;transition:opacity 0.5s;margin-bottom:24px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <div style="
                display:inline-flex;align-items:center;gap:6px;
                padding:3px 12px;border-radius:100px;margin-bottom:10px;
                border:1px solid ${p.typeColor}44;background:${p.typeColor}11;
              ">
                <span style="width:6px;height:6px;border-radius:50%;
                  background:${p.typeColor};box-shadow:0 0 8px ${p.typeColor};
                  animation:cinPulse 1.5s ease-in-out infinite"></span>
                <span style="color:${p.typeColor};font-size:.62rem;letter-spacing:3px">${p.type}</span>
              </div>
              <div style="font-size:2rem;font-weight:800;color:#f0e6ff;letter-spacing:1px;line-height:1">${p.name}</div>
              <div style="color:#475569;font-size:.65rem;letter-spacing:2px;margin-top:6px">${p.id} · MISSION BRIEFING</div>
            </div>
            <div style="text-align:right">
              <div style="
                display:inline-flex;align-items:center;gap:6px;
                padding:4px 12px;border-radius:100px;
                border:1px solid ${p.statusColor}44;background:${p.statusColor}11;
              ">
                <span style="width:6px;height:6px;border-radius:50%;
                  background:${p.statusColor};box-shadow:0 0 10px ${p.statusColor};
                  animation:cinPulse 1s ease-in-out infinite"></span>
                <span style="color:${p.statusColor};font-size:.62rem;letter-spacing:2px">${p.status}</span>
              </div>
            </div>
          </div>
          <div style="height:1px;background:linear-gradient(90deg,transparent,${p.typeColor}44,transparent);margin-top:20px"></div>
        </div>

        <!-- Sections revealed one by one -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px">
          <div id="cinS1" style="opacity:0;transform:translateY(12px);transition:all 0.5s">
            <div style="color:#334155;font-size:.58rem;letter-spacing:3px;margin-bottom:10px">TECH STACK</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px">
              ${p.tech.map(t => `<span style="
                padding:4px 10px;border-radius:100px;
                border:1px solid ${p.typeColor}44;background:${p.typeColor}0d;
                color:${p.typeColor};font-size:.68rem;
              ">${t}</span>`).join('')}
            </div>
          </div>
          <div id="cinS2" style="opacity:0;transform:translateY(12px);transition:all 0.5s">
            <div style="color:#334155;font-size:.58rem;letter-spacing:3px;margin-bottom:10px">KEY SYSTEMS</div>
            ${p.features.map(f => `
              <div style="display:flex;gap:8px;margin-bottom:6px;font-size:.72rem;color:#64748b">
                <span style="color:${p.typeColor}">▸</span>${f}
              </div>`).join('')}
          </div>
        </div>

        <div id="cinS3" style="opacity:0;transform:translateY(12px);transition:all 0.5s;margin-bottom:16px">
          <div style="color:#334155;font-size:.58rem;letter-spacing:3px;margin-bottom:8px">MISSION OBJECTIVE</div>
          <div style="
            background:${p.typeColor}08;border:1px solid ${p.typeColor}22;
            border-radius:10px;padding:14px;
            color:#94a3b8;font-size:.78rem;line-height:1.7;
          " id="cinObjText"></div>
        </div>

        <div id="cinS4" style="opacity:0;transform:translateY(12px);transition:all 0.5s;margin-bottom:24px">
          <div style="color:#334155;font-size:.58rem;letter-spacing:3px;margin-bottom:8px">MISSION RESULT</div>
          <div style="
            background:rgba(52,211,153,0.05);border:1px solid rgba(52,211,153,0.2);
            border-radius:10px;padding:14px;
            color:#34d399;font-size:.78rem;line-height:1.7;
          " id="cinResText"></div>
        </div>

        <!-- Footer -->
        <div id="cinFooter" style="
          opacity:0;transition:opacity 0.5s;
          display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;
          padding-top:16px;border-top:1px solid rgba(255,255,255,0.06);
        ">
          ${p.live ? `<a href="${p.live}" target="_blank" style="
            display:inline-flex;align-items:center;gap:8px;
            padding:10px 20px;border-radius:10px;font-size:.75rem;font-weight:700;
            background:${p.typeColor};color:#000;text-decoration:none;
            box-shadow:0 0 24px ${p.typeColor}55;
            transition:all 0.3s;letter-spacing:.5px;
          "
          onmouseover="this.style.boxShadow='0 0 40px ${p.typeColor}88';this.style.transform='translateY(-2px)'"
          onmouseout="this.style.boxShadow='0 0 24px ${p.typeColor}55';this.style.transform='translateY(0)'"
          >🚀 Launch Live Mission</a>` : ''}
          <div style="display:flex;gap:10px;margin-left:auto">
            <button id="cinDragBtn" style="
              padding:8px 18px;border-radius:8px;cursor:pointer;font-size:.7rem;
              background:${p.typeColor}15;border:1px solid ${p.typeColor}44;color:${p.typeColor};
              font-family:'JetBrains Mono',monospace;letter-spacing:1px;transition:all 0.2s;
            "
            onmouseover="this.style.background='${p.typeColor}28'"
            onmouseout="this.style.background='${p.typeColor}15'"
            >⟳ 3D VIEW</button>
            <button id="cinCloseBtn" style="
              padding:8px 18px;border-radius:8px;cursor:pointer;font-size:.7rem;
              background:rgba(255,255,255,0.04);border:1px solid #ffffff18;color:#475569;
              font-family:'JetBrains Mono',monospace;letter-spacing:1px;transition:all 0.2s;
            "
            onmouseover="this.style.background='rgba(255,255,255,0.08)';this.style.color='#94a3b8'"
            onmouseout="this.style.background='rgba(255,255,255,0.04)';this.style.color='#475569'"
            >✕ CLOSE</button>
          </div>
        </div>
      </div>

      <!-- 3D drag hint -->
      <div style="text-align:center;margin-top:10px;color:#1e293b;font-size:.6rem;letter-spacing:2px">
        DRAG CARD TO ROTATE IN 3D
      </div>
    </div>

    <style>
      @keyframes cinScan { from{top:0%} to{top:100%} }
      @keyframes cinPulse { 0%,100%{opacity:1;} 50%{opacity:.25;} }
      @keyframes cinFloat {
        0%,100%{transform:translateY(0px);}
        50%{transform:translateY(-8px);}
      }
      #cinCard::-webkit-scrollbar{width:4px;}
      #cinCard::-webkit-scrollbar-track{background:transparent;}
      #cinCard::-webkit-scrollbar-thumb{background:${p.typeColor}44;border-radius:2px;}
    </style>
  `;

  document.body.appendChild(cin);

  // Fade out black flash, reveal overlay
  await new Promise(r => setTimeout(r, 100));
  flash.style.opacity = '0';
  setTimeout(() => flash.remove(), 400);

  // Show top bar
  setTimeout(() => {
    document.getElementById('cinTopBar').style.opacity = '1';
  }, 200);

  // Live clock
  const clockEl = document.getElementById('cinClock');
  const clockInterval = setInterval(() => {
    const now = new Date();
    const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const h = String(ist.getHours()).padStart(2,'0');
    const m = String(ist.getMinutes()).padStart(2,'0');
    const s = String(ist.getSeconds()).padStart(2,'0');
    if (clockEl) clockEl.textContent = `IST ${h}:${m}:${s}`;
  }, 1000);

  // ── PARTICLE CANVAS ──
  const canvas = document.getElementById('cinParticles');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = [];
  for (let i = 0; i < 180; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.2,
      a: Math.random() * 0.6 + 0.1,
      da: (Math.random() - 0.5) * 0.01,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    });
  }
  // Burst particles from center
  const bursts = [];
  for (let i = 0; i < 60; i++) {
    const angle = (i / 60) * Math.PI * 2;
    const speed = 2 + Math.random() * 6;
    bursts.push({
      x: canvas.width / 2, y: canvas.height / 2,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      r: Math.random() * 3 + 1, a: 1, life: 1,
    });
  }
  let animRunning = true;
  function drawParticles() {
    if (!animRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Background stars
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      p.a += p.da;
      if (p.a > 0.7 || p.a < 0.05) p.da *= -1;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.a})`; ctx.fill();
    });
    // Burst particles
    bursts.forEach(b => {
      b.x += b.vx; b.y += b.vy;
      b.vx *= 0.96; b.vy *= 0.96;
      b.life -= 0.018; b.a = b.life;
      if (b.life > 0) {
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r * b.life, 0, Math.PI * 2);
        ctx.fillStyle = `${p.typeColor}${Math.floor(b.a * 255).toString(16).padStart(2,'0')}`;
        ctx.fill();
      }
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  // ── BOOT SEQUENCE ──
  const bootLines = [
    `> CANDY_OS v2.0 — MISSION CONTROL ACTIVATED`,
    `> Authenticating operator credentials... OK`,
    `> Loading mission file: ${p.id} — ${p.name.toUpperCase()}`,
    `> Decrypting classified intel... DONE`,
    `> Rendering holographic interface...`,
    `> ALL SYSTEMS GO — LAUNCHING BRIEFING`,
  ];
  const bootEl = document.getElementById('cinBootLines');
  const bootBar = document.getElementById('cinBootBar');

  for (let i = 0; i < bootLines.length; i++) {
    await new Promise(r => setTimeout(r, 380));
    const line = document.createElement('div');
    line.style.cssText = `
      font-size:.72rem;margin-bottom:6px;
      color:${i === bootLines.length - 1 ? p.typeColor : '#475569'};
      opacity:0;transition:opacity 0.3s;
    `;
    line.textContent = bootLines[i];
    bootEl.appendChild(line);
    requestAnimationFrame(() => { line.style.opacity = '1'; });
    bootBar.style.width = ((i + 1) / bootLines.length * 100) + '%';
  }

  await new Promise(r => setTimeout(r, 500));

  // ── TRANSITION: hide boot, show card ──
  const bootDiv = document.getElementById('cinBoot');
  bootDiv.style.opacity = '0';
  await new Promise(r => setTimeout(r, 500));
  bootDiv.style.display = 'none';

  const cardEl = document.getElementById('cinCard');
  cardEl.style.display = 'block';
  requestAnimationFrame(() => {
    cardEl.style.opacity = '1';
    cardEl.style.transform = 'translateY(0) scale(1)';
  });

  // Reveal header
  await new Promise(r => setTimeout(r, 300));
  document.getElementById('cinHeader').style.opacity = '1';

  // Typewriter for objective
  await new Promise(r => setTimeout(r, 400));
  document.getElementById('cinS1').style.opacity = '1';
  document.getElementById('cinS1').style.transform = 'translateY(0)';

  await new Promise(r => setTimeout(r, 200));
  document.getElementById('cinS2').style.opacity = '1';
  document.getElementById('cinS2').style.transform = 'translateY(0)';

  await new Promise(r => setTimeout(r, 200));
  document.getElementById('cinS3').style.opacity = '1';
  document.getElementById('cinS3').style.transform = 'translateY(0)';

  // Typewriter objective
  const objEl = document.getElementById('cinObjText');
  const objWords = p.objective.split(' ');
  for (let i = 0; i < objWords.length; i++) {
    objEl.textContent += (i ? ' ' : '') + objWords[i];
    await new Promise(r => setTimeout(r, 28));
  }

  await new Promise(r => setTimeout(r, 200));
  document.getElementById('cinS4').style.opacity = '1';
  document.getElementById('cinS4').style.transform = 'translateY(0)';

  // Typewriter result
  const resEl = document.getElementById('cinResText');
  const resWords = p.result.split(' ');
  for (let i = 0; i < resWords.length; i++) {
    resEl.textContent += (i ? ' ' : '') + resWords[i];
    await new Promise(r => setTimeout(r, 28));
  }

  await new Promise(r => setTimeout(r, 300));
  document.getElementById('cinFooter').style.opacity = '1';

  // ── 3D DRAG on card ──
  const innerCard = cardEl.querySelector('div[style*="background:linear-gradient"]');
  if (!innerCard) return;
  innerCard.style.transformStyle = 'preserve-3d';
  innerCard.style.cursor = 'grab';
  let isDragging = false, startX = 0, startY = 0, rotX = 0, rotY = 0;
  innerCard.style.transition = 'box-shadow 0.3s';
  innerCard.addEventListener('mousedown', e => {
    isDragging = true; startX = e.clientX; startY = e.clientY;
    innerCard.style.cursor = 'grabbing'; e.preventDefault();
  });
  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    rotY += (e.clientX - startX) * 0.35;
    rotX -= (e.clientY - startY) * 0.35;
    rotX = Math.max(-30, Math.min(30, rotX));
    innerCard.style.transform = `perspective(1000px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    startX = e.clientX; startY = e.clientY;
  });
  window.addEventListener('mouseup', () => { isDragging = false; innerCard.style.cursor = 'default'; });

  // 3D VIEW button — spin
  let isSpinning = false;
  document.getElementById('cinDragBtn').addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;
    rotY += 360;
    innerCard.style.transition = 'transform 1.2s cubic-bezier(.23,1,.32,1)';
    innerCard.style.transform = `perspective(1200px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    setTimeout(() => {
      innerCard.style.transition = '';
      // Normalize rotY to avoid huge numbers
      rotY = rotY % 360;
      innerCard.style.transform = `perspective(1200px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
      isSpinning = false;
    }, 1200);
  });

  // ── CLOSE ──
  function closeCin() {
    animRunning = false;
    clearInterval(clockInterval);
    cin.style.opacity = '0';
    cin.style.transition = 'opacity 0.5s';
    setTimeout(() => cin.remove(), 500);
  }
  document.getElementById('cinCloseBtn').addEventListener('click', closeCin);
  document.getElementById('cinSkipBtn').addEventListener('click', closeCin);
  cin.addEventListener('click', e => { if (e.target === cin) closeCin(); });
  document.addEventListener('keydown', function escCin(e) {
    if (e.key === 'Escape') { closeCin(); document.removeEventListener('keydown', escCin); }
  });

  // Also drop mission card in chat
  const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const techBadges = p.tech.map(t => `<span class="cin-tech">${t}</span>`).join('');
  const features = p.features.map(f => `<div class="cin-feat"><span class="cin-feat-dot"></span>${f}</div>`).join('');
  const liveBtn = p.live ? `<a href="${p.live}" target="_blank" class="cin-live-btn">🚀 Launch Live Mission</a>` : '';
  const chatCard = document.createElement('div');
  chatCard.className = 'mrow cin-card-row';
  chatCard.innerHTML = `
    <div class="mav" style="background:linear-gradient(135deg,#00d4ff,#a78bfa);font-size:.7rem">🎬</div>
    <div class="cin-card">
      <div class="cin-card-scan"></div>
      <div class="cin-card-inner">
        <div class="cin-card-header">
          <div class="cin-card-left">
            <div class="cin-type-badge" style="color:${p.typeColor};border-color:${p.typeColor}55;background:${p.typeColor}0d">
              <span class="cin-type-dot" style="background:${p.typeColor};box-shadow:0 0 8px ${p.typeColor}"></span>
              ${p.type}
            </div>
            <div class="cin-project-name">${p.name}</div>
          </div>
          <div class="cin-card-right">
            <div class="cin-status" style="color:${p.statusColor};border-color:${p.statusColor}55;background:${p.statusColor}0d">
              <span class="cin-status-dot" style="background:${p.statusColor};box-shadow:0 0 8px ${p.statusColor}"></span>
              ${p.status}
            </div>
            <div class="cin-mission-id">${p.id}</div>
          </div>
        </div>
        <div class="cin-grid">
          <div class="cin-section cin-revealed"><div class="cin-section-label">TECH STACK</div><div class="cin-tech-row">${techBadges}</div></div>
          <div class="cin-section cin-revealed"><div class="cin-section-label">MISSION OBJECTIVE</div><div class="cin-section-value">${p.objective}</div></div>
          <div class="cin-section cin-revealed"><div class="cin-section-label">KEY FEATURES</div><div class="cin-features">${features}</div></div>
          <div class="cin-section cin-revealed"><div class="cin-section-label">MISSION RESULT</div><div class="cin-callout">${p.result}</div></div>
          <div class="cin-section cin-revealed"><div class="cin-section-label">CURRENT STATUS</div><div class="cin-section-value">${p.status_note}</div></div>
        </div>
        <div class="cin-card-footer">${liveBtn}<div class="cin-footer-meta">CANDY AI · MISSION CONTROL · ${new Date().toLocaleDateString('en-IN')}</div></div>
      </div>
      <div class="cin-mt">${t}</div>
    </div>`;
  msgsEl.appendChild(chatCard);
  msgsEl.scrollTop = msgsEl.scrollHeight;
}

 // ══════ CINEMATIC BUTTON — paste HERE, last ══════
document.getElementById('cinematicBtn')?.addEventListener('click', () => {
  const PROJECTS = Object.keys(CINEMATIC_DB);

  const modal = document.createElement('div');
  modal.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,0.75);backdrop-filter:blur(6px);
    display:flex;align-items:center;justify-content:center;
  `;
  modal.innerHTML = `
    <div style="background:#0d0d1a;border:1px solid #a78bfa44;
      border-radius:16px;padding:24px;min-width:280px;max-width:360px">
      <div style="color:#a78bfa;font-size:.7rem;letter-spacing:2px;
        margin-bottom:14px">🎬 CHOOSE MISSION</div>
      ${PROJECTS.map(k => `
        <button data-key="${k}" style="
          display:block;width:100%;text-align:left;
          background:rgba(139,92,246,0.06);
          border:1px solid #a78bfa33;border-radius:8px;
          padding:10px 14px;margin-bottom:8px;
          color:#c4b5fd;cursor:pointer;font-size:.82rem;
          font-family:inherit;transition:all .2s"
          onmouseover="this.style.background='rgba(139,92,246,0.15)'"
          onmouseout="this.style.background='rgba(139,92,246,0.06)'"
        >${CINEMATIC_DB[k].name}</button>
      `).join('')}
      <button id="cinModalClose" style="
        margin-top:4px;width:100%;padding:8px;
        background:transparent;border:1px solid #ffffff22;
        border-radius:8px;color:#64748b;cursor:pointer;
        font-family:inherit;font-size:.75rem">Cancel</button>
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener('click', e => {
    const key = e.target.closest('[data-key]')?.dataset.key;
    if (key) { modal.remove(); launchCinematicInChat(key); }
    if (e.target.id === 'cinModalClose' || e.target === modal) modal.remove();
  });
});

function openCinematicPicker() {
  const PROJECTS = Object.keys(CINEMATIC_DB);
  const modal = document.createElement('div');
  modal.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,0.75);backdrop-filter:blur(6px);
    display:flex;align-items:center;justify-content:center;
  `;
  modal.innerHTML = `
    <div style="background:#0d0d1a;border:1px solid #a78bfa44;
      border-radius:16px;padding:24px;min-width:280px;max-width:360px">
      <div style="color:#a78bfa;font-size:.7rem;letter-spacing:2px;
        margin-bottom:14px">🎬 CHOOSE MISSION</div>
      ${PROJECTS.map(k => `
        <button data-key="${k}" style="
          display:block;width:100%;text-align:left;
          background:rgba(139,92,246,0.06);
          border:1px solid #a78bfa33;border-radius:8px;
          padding:10px 14px;margin-bottom:8px;
          color:#c4b5fd;cursor:pointer;font-size:.82rem;
          font-family:inherit;transition:all .2s"
          onmouseover="this.style.background='rgba(139,92,246,0.15)'"
          onmouseout="this.style.background='rgba(139,92,246,0.06)'"
        >${CINEMATIC_DB[k].name}</button>
      `).join('')}
      <button id="cinModalClose" style="
        margin-top:4px;width:100%;padding:8px;
        background:transparent;border:1px solid #ffffff22;
        border-radius:8px;color:#64748b;cursor:pointer;
        font-family:inherit;font-size:.75rem">Cancel</button>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => {
    const key = e.target.closest('[data-key]')?.dataset.key;
    if (key) { modal.remove(); launchCinematicInChat(key); }
    if (e.target.id === 'cinModalClose' || e.target === modal) modal.remove();
  });
}

/* ══════════ SEND MESSAGE ══════════ */
async function go() {
  const txt = inpEl.value.trim(); if (!txt) return;
  inpEl.value = ''; resizeTA(inpEl); stopListen();
  addMsg('user', esc(txt));
  sessionMessageCount++;
  hist.push({ role: 'user', content: txt });

  // Track visitor question and send report on every message
  visitorSession.questions.push({
    time: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
    message: txt,
  });
 

  const tid = addTyping();
  try {
    const r = await fetch(EP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MDL,
        messages: [{ role: 'system', content: SYS + getLiveContext() }, ...hist],
        max_tokens: 600, temperature: .85, top_p: .9, stream: false
      })
    });
    if (!r.ok) { const e = await r.json().catch(() => ({})); throw new Error(e?.error?.message || `HTTP ${r.status}`); }
    const d   = await r.json();
    const rep = d.choices?.[0]?.message?.content?.trim() || 'Empty response. Please try again.';
    const cinKey = detectCinematicProject(txt);
    if (cinKey) setTimeout(() => launchCinematicInChat(cinKey), 300);
    removeTyping(tid);
    await typeMsg(fmt(rep));
    hist.push({ role: 'assistant', content: rep });
    sendVisitorReport();
    setMood(txt + ' ' + rep);
    addReactionBar();
    addSugg(rep);
    doSpeak(rep);
    if (hist.length > 40) hist = hist.slice(-40);
  } catch (err) {
    removeTyping(tid);
    addMsg('err', `Error: ${esc(err.message)}`);
  }
}

/* ══════════ MESSAGE RENDERING ══════════ */
function addMsg(role, html) {
  const t   = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const row = document.createElement('div');
  if (role === 'user') {
    row.className = 'mrow mrow--u';
    row.innerHTML = `<div><div class="buser">${html}</div><div class="mt mt-r">${t}</div></div>`;
  } else if (role === 'err') {
    row.className = 'mrow';
    row.innerHTML = `<div class="berr">${html}</div>`;
  } else {
    row.className = 'mrow';
    row.innerHTML = `<div class="mav">C</div><div><div class="bai">${html}</div><div class="mt">${t}</div></div>`;
  }
  msgsEl.appendChild(row); msgsEl.scrollTop = msgsEl.scrollHeight; return row;
}

function addTyping() {
  const id  = 'ty' + Date.now();
  const row = document.createElement('div'); row.id = id; row.className = 'mrow';
  row.innerHTML = `<div class="mav">C</div><div class="bai"><div class="typing"><span></span><span></span><span></span></div></div>`;
  msgsEl.appendChild(row); msgsEl.scrollTop = msgsEl.scrollHeight; return id;
}
function removeTyping(id) { document.getElementById(id)?.remove(); }

async function typeMsg(html) {
  const t   = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const row = document.createElement('div'); row.className = 'mrow';
  row.innerHTML = `<div class="mav">C</div><div><div class="bai" id="_b"></div><div class="mt" id="_t"></div></div>`;
  msgsEl.appendChild(row);
  const b  = row.querySelector('#_b'); b.removeAttribute('id');
  const tm = row.querySelector('#_t'); tm.removeAttribute('id'); tm.textContent = t;
  const words = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ');
  let shown = '';
  for (let i = 0; i < words.length; i++) {
    shown += (i ? ' ' : '') + words[i];
    b.textContent = shown;
    msgsEl.scrollTop = msgsEl.scrollHeight;
    await new Promise(r => setTimeout(r, 44));
  }
  b.innerHTML = html; msgsEl.scrollTop = msgsEl.scrollHeight;
}

function addSugg(rep) {
  const lo = rep.toLowerCase(); let s = [];
  if (lo.includes('project') || lo.includes('sparms') || lo.includes('inventoryiq'))
    s = ['Tell me more about SPARMS', 'What is InventoryIQ?', 'Any live projects?'];
  else if (lo.includes('skill') || lo.includes('python') || lo.includes('sql'))
    s = ['His strongest skill?', 'ML experience?', 'Power BI usage?'];
  else if (lo.includes('hire') || lo.includes('recruit') || lo.includes('intern'))
    s = ['How to reach Pavan?', 'Is he available now?', 'What roles interest him?'];
  else
    s = ['Tell me about his projects', 'What are his top skills?', 'Is he open to hire?'];
  const row = document.createElement('div'); row.className = 'sgrow';
  row.innerHTML = s.slice(0, 3).map(q => `<button class="chip" data-q="${esc(q)}">${esc(q)}</button>`).join('');
  msgsEl.appendChild(row); msgsEl.scrollTop = msgsEl.scrollHeight;
}

/* ══════════ ANALYTICS TRACKING ══════════ */
const SESSION_START = Date.now();
let sessionMessageCount = 0;
const TRACK_EP = 'https://pk-groq-proxy.daroorpavankalyan.workers.dev/track';

function trackSession() {
  const duration = Math.round((Date.now() - SESSION_START) / 1000);
  const hour = new Date().getHours();
  navigator.sendBeacon(TRACK_EP, JSON.stringify({
    type: 'session',
    duration,
    messageCount: sessionMessageCount,
    hour
  }));
}

window.addEventListener('pagehide', trackSession);
window.addEventListener('beforeunload', trackSession);


/* ══════════ ADMIN PANEL ══════════ */
const ADMIN_PASS = 'Kalyan@21'; // your password
let adminUnlocked = false;

async function showAdminPanel() {
  const panel = document.getElementById('adminPanel');
  const content = document.getElementById('apContent');
  panel.style.display = 'block';
  content.innerHTML = '<div class="ap-loading">Fetching analytics...</div>';

  try {
    const res = await fetch(`https://pk-groq-proxy.daroorpavankalyan.workers.dev/analytics?key=${ADMIN_PASS}&format=json`);
    const data = await res.json();

    const peakHour = data.heatmap.indexOf(Math.max(...data.heatmap));
    const maxHeat = Math.max(...data.heatmap) || 1;

    content.innerHTML = `
      <div class="ap-stats">
        <div class="ap-stat"><span class="ap-num">${data.visitors}</span><span class="ap-lbl">Visitors</span></div>
        <div class="ap-stat"><span class="ap-num">${data.sessions}</span><span class="ap-lbl">Sessions</span></div>
        <div class="ap-stat"><span class="ap-num">${Math.floor(data.avgDuration/60)}m${data.avgDuration%60}s</span><span class="ap-lbl">Avg Time</span></div>
        <div class="ap-stat"><span class="ap-num">${data.bounceRate}%</span><span class="ap-lbl">Bounce</span></div>
      </div>

      <div class="ap-section">
        <div class="ap-sec-title">Top Questions</div>
        ${data.questions.slice(0,5).map((q,i) => `
          <div class="ap-qrow">
            <span class="ap-qrank">${i+1}</span>
            <span class="ap-qtext" title="${q.q}">${q.q}</span>
            <span class="ap-qcount">${q.count}x</span>
          </div>`).join('') || '<p class="ap-empty">No questions yet</p>'}
      </div>

      <div class="ap-section">
        <div class="ap-sec-title">Active Hours (IST)</div>
        <div class="ap-heat">
          ${data.heatmap.map((v,h) => `
            <div class="ap-hcol" title="${h}:00 — ${v} visits">
              <div class="ap-hbar" style="height:${Math.max(2,Math.round((v/maxHeat)*40))}px"></div>
              <span class="ap-hlbl">${h%6===0?h:''}</span>
            </div>`).join('')}
        </div>
        <p class="ap-peak">Peak: ${peakHour}:00–${peakHour+1}:00 · ${data.heatmap[peakHour]} visits</p>
      </div>
    `;
  } catch (err) {
    content.innerHTML = '<p class="ap-empty">Failed to load analytics.</p>';
  }
}

/* ══════════ UTILITIES ══════════ */
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fmt(t) { return t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/`(.*?)`/g,'<code>$1</code>').replace(/\n/g,'<br>'); }
function resizeTA(el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 120) + 'px'; }
function showToast(msg) { const el = document.getElementById('toast'); el.textContent = msg; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2400); }

/* ══════════════════════════════
   CANDY STATUS STORY
══════════════════════════════ */
(function () {
  const now  = new Date();
  const ist  = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const h    = ist.getHours();
  const isAway = h >= 22 || h < 7;

  const STORIES = [
    {
      tag:       'Current Focus',
      tagColor:  '#8b5cf6',
      tagBg:     'rgba(139,92,246,0.12)',
      icon:      '🚀',
      title:     'Building AI Agents',
      desc:      'Pavan is currently deep into building intelligent AI agents and exploring LLMs, RAG systems, and autonomous tools. Every day he experiments with new ideas and ships something new.',
      highlights: ['AI Agents', 'LLMs', 'RAG', 'Groq API'],
      highlightColor: '#8b5cf6',
      dur: 6,
    },
    {
      tag:       'Academic Life',
      tagColor:  '#06b6d4',
      tagBg:     'rgba(6,182,212,0.12)',
      icon:      '🎓',
      title:     'MCA @ JNTUA',
      desc:      'Pursuing MCA at Jawaharlal Nehru Technological University, Anantapur. Focusing on Data Analytics, Database Management, and Business Intelligence alongside building real projects.',
      highlights: ['JNTUA Anantapur', '2025–2027', 'Data Analytics', 'BI'],
      highlightColor: '#06b6d4',
      dur: 5,
    },
    {
      tag:       'Status',
      tagColor:  isAway ? '#f59e0b' : '#00c864',
      tagBg:     isAway ? 'rgba(245,158,11,0.12)' : 'rgba(0,200,100,0.10)',
      icon:      isAway ? '🌙' : '💻',
      title:     isAway ? 'Taking a rest' : 'Online & Active',
      desc:      isAway
        ? 'It is late night in India right now. Pavan is likely resting but will respond to messages soon. Feel free to leave your contact and he will get back to you.'
        : 'Pavan is currently active and online in India. He is open to conversations, collaborations, and new opportunities. Reach out anytime!',
      highlights: isAway
        ? ['India IST', 'Will respond soon', 'Leave a message']
        : ['India IST', 'Ready to connect', 'Open to hire'],
      highlightColor: isAway ? '#f59e0b' : '#00c864',
      dur: 5,
    },
    {
      tag:       'Open To',
      tagColor:  '#f472b6',
      tagBg:     'rgba(244,114,182,0.12)',
      icon:      '🤝',
      title:     'Internships & Roles',
      desc:      'Pavan is actively looking for internships and entry-level Data Analyst or Data Science roles. He brings hands-on project experience, strong Python and SQL skills, and a passion for building.',
      highlights: ['Data Analyst', 'Data Science', 'Internship', 'Entry Level'],
      highlightColor: '#f472b6',
      dur: 5,
    },
    {
      tag:       'Latest Project',
      tagColor:  '#fbbf24',
      tagBg:     'rgba(251,191,36,0.12)',
      icon:      '⚡',
      title:     'Candy AI Agent',
      desc:      'Just shipped Candy — a standalone AI agent built with Groq, featuring a live skill galaxy, mood ring, portfolio tour, reaction bar, and real time activity monitor. All built from scratch.',
      highlights: ['Groq LLaMA', 'Skill Galaxy', 'Mood Ring', 'Live Features'],
      highlightColor: '#fbbf24',
      dur: 6,
    },
  ];

  let currentStory = 0;
  let storyTimer   = null;
  let isOpen       = false;

  const overlay   = document.getElementById('storyOverlay');
  const trigger   = document.getElementById('storyTrigger') || document.getElementById('storyRow');
  const closeBtn  = document.getElementById('storyClose');
  const prevBtn   = document.getElementById('storyPrev');
  const nextBtn   = document.getElementById('storyNext');
  const contentEl = document.getElementById('storyContent');
  const barsEl    = document.getElementById('storyProgressBars');
  const timeEl    = document.getElementById('storyTime');
  const previewEl = document.getElementById('storyPreview');

  if (!overlay || !trigger) return;

  // Set preview text
  if (previewEl) previewEl.textContent = STORIES[0].title;

  // Build progress bars
  STORIES.forEach((_, i) => {
    const bar = document.createElement('div');
    bar.className = 'story-prog-bar';
    bar.innerHTML = `<div class="story-prog-fill" id="spf${i}"></div>`;
    barsEl.appendChild(bar);
  });

  // Build story slides
  STORIES.forEach((s, i) => {
    const highlightsHTML = s.highlights.map(h =>
      `<span class="story-highlight" style="color:${s.highlightColor};border-color:${s.highlightColor}44;background:${s.tagBg}">${h}</span>`
    ).join('');

    const slide = document.createElement('div');
    slide.className = 'story-slide';
    slide.id = `story-slide-${i}`;
    slide.innerHTML = `
      <div class="story-slide-icon">${s.icon}</div>
      <span class="story-slide-tag" style="color:${s.tagColor};background:${s.tagBg};border:1px solid ${s.tagColor}33">
        ${s.tag}
      </span>
      <div class="story-slide-title">${s.title}</div>
      <div class="story-slide-desc">${s.desc}</div>
      <div class="story-slide-highlights">${highlightsHTML}</div>`;
    contentEl.appendChild(slide);
  });

  function updateTime() {
    if (!timeEl) return;
    const n = new Date();
    const i = new Date(n.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const hh = String(i.getHours() % 12 || 12).padStart(2, '0');
    const mm = String(i.getMinutes()).padStart(2, '0');
    const ap = i.getHours() >= 12 ? 'PM' : 'AM';
    timeEl.textContent = `Today · ${hh}:${mm} ${ap} IST`;
  }

  function showStory(idx) {
    clearTimeout(storyTimer);

    // Reset all slides and bars
    document.querySelectorAll('.story-slide').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.story-prog-fill').forEach((f, i) => {
      f.classList.remove('active');
      f.style.animationDuration = '';
      if (i < idx) f.classList.add('done');
      else { f.classList.remove('done'); f.style.width = '0'; }
    });

    currentStory = idx;
    const slide = document.getElementById(`story-slide-${idx}`);
    if (slide) slide.classList.add('active');

    const fill = document.getElementById(`spf${idx}`);
    if (fill) {
      fill.style.setProperty('--dur', STORIES[idx].dur + 's');
      fill.classList.add('active');
    }

    updateTime();

    storyTimer = setTimeout(() => {
      if (currentStory < STORIES.length - 1) showStory(currentStory + 1);
      else closeStory();
    }, STORIES[idx].dur * 1000);
  }

  function openStory() {
    isOpen = true;
    overlay.classList.add('open');
    showStory(0);
  }

  function closeStory() {
    isOpen = false;
    overlay.classList.remove('open');
    clearTimeout(storyTimer);
    // Reset all
    document.querySelectorAll('.story-prog-fill').forEach(f => {
      f.classList.remove('active', 'done');
      f.style.width = '0';
    });
  }

  // Events
  trigger.addEventListener('click', openStory);
  closeBtn?.addEventListener('click', closeStory);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeStory(); });

  prevBtn?.addEventListener('click', () => {
    if (currentStory > 0) showStory(currentStory - 1);
  });
  nextBtn?.addEventListener('click', () => {
    if (currentStory < STORIES.length - 1) showStory(currentStory + 1);
    else closeStory();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!isOpen) return;
    if (e.key === 'ArrowRight') nextBtn?.click();
    if (e.key === 'ArrowLeft')  prevBtn?.click();
    if (e.key === 'Escape')     closeStory();
  });
})();

   function initFallingStars() {
     const panel = document.querySelector('.ss-chat-panel');
     if (!panel || panel.querySelector('.ss-falling-canvas')) return;
     const canvas = document.createElement('canvas');
     canvas.className = 'ss-falling-canvas';
     panel.prepend(canvas);
     const ctx = canvas.getContext('2d');
     const stars = [];
     function resize() {
       canvas.width  = panel.offsetWidth;
       canvas.height = panel.offsetHeight;
     }
     resize();
     new ResizeObserver(resize).observe(panel);
     const COLORS = ['#ffffff','#00d4ff','#a78bfa','#fbbf24','#7dd3fc','#f0abfc'];
     for (let i = 0; i < 120; i++) {
       stars.push({
         x: Math.random() * canvas.width,
         y: Math.random() * canvas.height,
         r: Math.random() * 1.4 + 0.3,
         a: Math.random(),
         da: (Math.random() * 0.008 + 0.003) * (Math.random() < 0.5 ? 1 : -1),
         c: COLORS[Math.floor(Math.random() * COLORS.length)],
         falling: Math.random() < 0.08
       });
     }
     const meteors = [];
     function spawnMeteor() {
       meteors.push({
         x: Math.random() * canvas.width * 0.6,
         y: Math.random() * canvas.height * 0.4,
         vx: 4 + Math.random() * 5,
         vy: 1.5 + Math.random() * 2.5,
         len: 80 + Math.random() * 120,
         a: 1,
         c: COLORS[Math.floor(Math.random() * COLORS.length)]
       });
     }
     spawnMeteor();
     setInterval(spawnMeteor, 2200);
     function draw() {
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       stars.forEach(s => {
         s.a += s.da;
         if (s.a > 1 || s.a < 0.1) s.da *= -1;
         if (s.falling) { s.y += 0.3; s.x += 0.1; if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; } }
         ctx.beginPath();
         ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
         ctx.fillStyle = s.c;
         ctx.globalAlpha = s.a;
         ctx.fill();
       });
       ctx.globalAlpha = 1;
       for (let i = meteors.length - 1; i >= 0; i--) {
         const m = meteors[i];
         const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.len * 0.7, m.y - m.len * 0.3);
         grad.addColorStop(0, m.c);
         grad.addColorStop(1, 'transparent');
         ctx.beginPath();
         ctx.moveTo(m.x, m.y);
         ctx.lineTo(m.x - m.len * 0.7, m.y - m.len * 0.3);
         ctx.strokeStyle = grad;
         ctx.lineWidth = 1.5;
         ctx.globalAlpha = m.a;
         ctx.stroke();
         m.x += m.vx; m.y += m.vy; m.a -= 0.018;
         if (m.a <= 0) meteors.splice(i, 1);
       }
       ctx.globalAlpha = 1;
       requestAnimationFrame(draw);
     }
     draw();
   }




function initFallingStars() {
     const panel = document.querySelector('.ss-chat-panel');
     if (!panel || panel.querySelector('.ss-falling-canvas')) return;
     const canvas = document.createElement('canvas');
     canvas.className = 'ss-falling-canvas';
     panel.prepend(canvas);
     const ctx = canvas.getContext('2d');
     const stars = [];
     function resize() {
       canvas.width  = panel.offsetWidth;
       canvas.height = panel.offsetHeight;
     }
     resize();
     new ResizeObserver(resize).observe(panel);
     const COLORS = ['#ffffff','#00d4ff','#a78bfa','#fbbf24','#7dd3fc','#f0abfc'];
     for (let i = 0; i < 120; i++) {
       stars.push({
         x: Math.random() * canvas.width,
         y: Math.random() * canvas.height,
         r: Math.random() * 1.4 + 0.3,
         a: Math.random(),
         da: (Math.random() * 0.008 + 0.003) * (Math.random() < 0.5 ? 1 : -1),
         c: COLORS[Math.floor(Math.random() * COLORS.length)],
         falling: Math.random() < 0.08
       });
     }
     const meteors = [];
     function spawnMeteor() {
       meteors.push({
         x: Math.random() * canvas.width * 0.6,
         y: Math.random() * canvas.height * 0.4,
         vx: 4 + Math.random() * 5,
         vy: 1.5 + Math.random() * 2.5,
         len: 80 + Math.random() * 120,
         a: 1,
         c: COLORS[Math.floor(Math.random() * COLORS.length)]
       });
     }
     spawnMeteor();
     setInterval(spawnMeteor, 2200);
     function draw() {
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       stars.forEach(s => {
         s.a += s.da;
         if (s.a > 1 || s.a < 0.1) s.da *= -1;
         if (s.falling) { s.y += 0.3; s.x += 0.1; if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; } }
         ctx.beginPath();
         ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
         ctx.fillStyle = s.c;
         ctx.globalAlpha = s.a;
         ctx.fill();
       });
       ctx.globalAlpha = 1;
       for (let i = meteors.length - 1; i >= 0; i--) {
         const m = meteors[i];
         const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.len * 0.7, m.y - m.len * 0.3);
         grad.addColorStop(0, m.c);
         grad.addColorStop(1, 'transparent');
         ctx.beginPath();
         ctx.moveTo(m.x, m.y);
         ctx.lineTo(m.x - m.len * 0.7, m.y - m.len * 0.3);
         ctx.strokeStyle = grad;
         ctx.lineWidth = 1.5;
         ctx.globalAlpha = m.a;
         ctx.stroke();
         m.x += m.vx; m.y += m.vy; m.a -= 0.018;
         if (m.a <= 0) meteors.splice(i, 1);
       }
       ctx.globalAlpha = 1;
       requestAnimationFrame(draw);
     }
     draw();
   }

    
