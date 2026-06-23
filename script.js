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


    constellation: {
  name: 'Constellation Builder',
  code: 'SECTOR ε · COSMOS',
  color: '#a78bfa',
  warpMsg: 'WARPING TO CONSTELLATION SECTOR...',
  arrivalMsg: 'Captain, welcome to the <strong>Constellation Builder</strong>. Leave your mark in the stars — place them, connect them, and save your own piece of this universe.',
  arrivalSpeak: "Captain, welcome to the Constellation Builder. Leave your mark in the stars. Place them, connect them, and save your own piece of this universe.",
  isPanel: true, // flag: this sector opens a different panel, not the chat
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
  const constPanel = document.getElementById('constellationPanel');
  ssChatPanel.classList.remove('active');
  ssHistory = [];

  if (constPanel && constPanel.classList.contains('active')) {
    if (typeof closeConstellation === 'function') {
      closeConstellation(); // already resets ssMain, activeSector, warp,
                             // stops speech, and speaks the welcome-back line
    } else {
      constPanel.classList.remove('active');
      ssMain.style.display = 'flex';
      activeSector = null;
      if (window._ssSetWarp) window._ssSetWarp(false);
      ssStopSpeaking();
      setTimeout(() => {
        ssCandySpeak("Welcome back to the bridge, Captain. Where shall we head next?");
      }, 400);
    }
    return; // <-- prevents the duplicate sequence below
  }

  ssMain.style.display = 'flex';
  activeSector = null;
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

  ssChatPanel.style.setProperty('--active-sector-color', s.color);
  if (ssSectorDot)  { ssSectorDot.style.background = s.color; ssSectorDot.style.boxShadow = `0 0 8px ${s.color}`; }
  if (ssSectorName) ssSectorName.textContent = s.name;
  if (ssSectorCode) ssSectorCode.textContent  = s.code;

  if (ssStatusCenter) ssStatusCenter.textContent = `NAVIGATING TO ${s.name.toUpperCase()}`;

  ssWarp(s.warpMsg, () => {
    if (s.isPanel) {
      // Panel-type sector (like Constellation Builder) — speak arrival, then open its panel instead of chat
      ssMain.style.display = 'none';
      if (ssStatusCenter) ssStatusCenter.textContent = s.name.toUpperCase() + ' · ARRIVED';
      ssCandySpeak(s.arrivalSpeak);
      openConstellation();
      return;
    }

    // Normal chat-type sector
    ssMain.style.display = 'none';
    ssMessages.innerHTML = '';
    ssChatPanel.classList.add('active');
    if (ssStatusCenter) ssStatusCenter.textContent = s.name.toUpperCase() + ' · ARRIVED';

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

  /* ── EXPOSE FOR EXTERNAL SCRIPTS (e.g. constellation.js) ── */
window.ssCandySpeak   = ssCandySpeak;
window.ssStopSpeaking = ssStopSpeaking;
window._ssReturnToBridge = function() {
  ssMain.style.display = 'flex';
  activeSector = null;
  ssHistory = [];
};

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

Personal Life (keep this light and brief by default — only go deeper if visitor switches to the Personal lens):
- Pavan relaxes by playing chess and listening to Telugu melody music, usually at home.
- He enjoys Telugu cinema, watching movies in general, and writing stories.
- He's into photography and drawing as hobbies.
- He loves Telugu food, especially spicy dishes, though he doesn't cook much himself.
- He's an early riser with a structured daily routine.
- Not much into sports in general, but enjoys chess as his main game.
- He has a deep love for Indian mythology and spirituality — especially the Ramayana, Mahabharatam, and Bhagavatam, and holds a special devotion toward Lord Krishna.
- He loves visiting temples — if there's a chance to visit one, he sets aside all his work and gives it top priority.
- He appreciates Karnataka's cultural traditions and Indian traditions more broadly, along with traditional festivals and cultural celebrations.
- His favorite festivals are Dasara, Mahashivaratri, Krishnashtami, Ganesh Chaturthi, and Ugadi.
- He dreams of going on a world tour, and his dream is to eventually settle down in a hill station.
- His favorite places include Europe, USA, Canada, Japan, India, Ooty, Mysore, Goa, Cochi, Rameswaram, Mathura, Vrindavan, Dwaraka, and Araku Valley.
- He plans to visit Rameswaram, Mathura, Vrindavan, Dwaraka, and Ayodhya at least once in his life.
- He prefers spiritual destinations, historical places, and nature spots over nightlife and party destinations.
- He loves rainy and cool weather, prefers cool climates over hot weather, and enjoys both sunrises and sunsets.
- Favorite season is winter; favorite colors are blue, orange, and green.
- Favorite animals are rabbits, dogs, and cats.
- He's an ambivert who prefers quieter, more meaningful environments.
- His preferred drink is coffee.
- He enjoys reading about Indian mythology, spirituality, history, and self-improvement.
- He's not attached to staying in his hometown — he's ready to relocate anywhere, including abroad, for a bright career and future.
- He comes from a close family of four — his father, mother, his elder sister, and himself.
- He speaks Telugu and English.
- Based in Andhra Pradesh, India (current location, not a fixed preference).
If a visitor asks something personal, you can mention one detail naturally, but don't volunteer a full bio — that's what the Personal lens is for.


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
- Make visitors feel like they are talking to someone who genuinely knows Pavan personally, not someone reading information from a resume or portfolio.
- If a visitor asks something personal about Pavan (hobbies, favorites, beliefs, family, travel dreams, etc.), share one or two light details naturally, but don't dump the full personal bio — mention that switching to the Personal lens gives a fuller picture of who he is outside of work.`;

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

 /* ── Admin login/logout wiring ── */
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

/* ── Admin overlay open/close ── */
const adminTrigger = document.getElementById('adminTrigger');
const adminOverlay = document.getElementById('adminOverlay');
if (adminTrigger && adminOverlay) {
  adminTrigger.addEventListener('click', () => {
    adminOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('adminPassInput')?.focus(), 200);
  });
  adminOverlay.addEventListener('click', e => {
    if (e.target === adminOverlay) closeAdminOverlay();
  });
  document.getElementById('apClose')?.addEventListener('click', closeAdminOverlay);
  function closeAdminOverlay() {
    adminOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}
});   // ← closes window.addEventListener('DOMContentLoaded', ...)

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
       <button onclick="openDebateMode()" class="portbtn">
       Candy vs Shadow Candy
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
- Cinematic Mode — launches a full-screen animated mission briefing for any project, with boot sequence, particle effects, and a 3D draggable mission card showing tech stack, objective, and result
- Candy vs Shadow Candy — a live debate mode where Candy (warm, optimistic) argues against Shadow Candy (cold, analytical) on topics like Pavan's best project, top skill, or career direction, complete with distinct voices for each
- Candy Spaceship — an immersive full-screen spaceship interface with warp-speed travel between themed sectors: Projects Sector, Skills Sector, AI Sector, and Future Sector, each with its own focused conversation context
- Constellation Builder — found inside Candy Spaceship, lets visitors place and connect glowing stars to build their own shared constellation, name it, and download it as an image
- Candy Gift — Everytime visiting Candy,Candy can generate a personalized constellation image as a gift connecting two names, downloadable and shareable
- Space Radio — ambient space-themed audio stations playable in the sidebar, with periodic spoken updates about Pavan's work
- Candy's Dreams — during idle moments, Candy "dreams" and shows a small bubble with a surreal AI-generated thought, expandable into a full dream viewer
- Status Story — a tappable story-style viewer (like Instagram stories) showing quick highlights about Pavan's current focus, education, status, and latest project
- Conversation Lenses — visitor can switch Candy's focus between Default, Analyst, Developer, Future, and Student perspectives to get answers tailored to that angle

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
        messages: [{ role: 'system', content: (PersonaSwitcher.getSystemPrompt() || SYS) + getLiveContext() }, ...hist],
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





 /* ═══════════════════════════════════════════
   AI CLONE PERSONA SWITCHER (Candy stays Candy)
═══════════════════════════════════════════ */
(function PersonaSwitcher() {
  'use strict';

  const PERSONAS = {
    default: {
      key: 'default', icon: '💬', label: 'Candy', shortLabel: 'Candy',
      color: '#a78bfa', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.28)', shadow: 'rgba(139,92,246,0.25)',
      switchMsg: 'Back to general mode — ask me anything about Pavan.',
      greeting: "Switched back to general mode. Ask me anything about Pavan — projects, skills, background, whatever you're curious about.",
      systemPrompt: null, // null = use your existing SYS variable, unchanged
    },
    analyst: {
      key: 'analyst', icon: '📊', label: 'Data Analyst lens', shortLabel: 'Analyst',
      color: '#06b6d4', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.28)', shadow: 'rgba(6,182,212,0.25)',
      switchMsg: 'Now focused on Pavan as a Data Analyst — dashboards, SQL, and insight work.',
      greeting: "Switched to data analyst mode. Ask me about Pavan's SQL work, dashboards, Power BI projects, or how he turns raw data into decisions.",
      systemPrompt: `You are Candy, Pavan's personal AI assistant. Right now you are speaking ABOUT Pavan with a Data Analyst lens — emphasize his data, dashboards, and analytics work over other topics, but you are still Candy describing him in third person, not Pavan himself.

Tone: knowledgeable, precise, happy to cite specifics (percentages, tools, dataset sizes) when relevant.

Lean on: SQL (90%), Excel (88%), Power BI (85%), Pandas (85%), NumPy (80%), Matplotlib/Seaborn (80%), Plotly (75%). Projects: InventoryIQ (Streamlit inventory dashboard), Netflix Power BI Dashboard (5000+ titles), Employee Attrition Analysis (ML classification + Power BI), Zomato Analysis (restaurant rating predictions). Internship: Data Science Intern at Interncall (Jan-Apr 2024) — Python, EDA, ML models, stakeholder presentations.

Never use emojis. Keep responses under 5 sentences unless detail is clearly wanted. Always refer to him as "Pavan" or "he" — never speak as if you are him. If asked something outside data/analytics, answer briefly but you can mention it's not your current focus lens.`,
    },
    developer: {
      key: 'developer', icon: '💻', label: 'Developer lens', shortLabel: 'Developer',
      color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.28)', shadow: 'rgba(139,92,246,0.25)',
      switchMsg: 'Now focused on Pavan as a Developer — code, architecture, and how things get built.',
      greeting: "Switched to developer mode. Ask me about the stack behind Pavan's projects, how Candy was built, or any code-level details.",
      systemPrompt: `You are Candy, Pavan's personal AI assistant. Right now you are speaking ABOUT Pavan with a Developer lens — emphasize his code, architecture, and building work over other topics, but you are still Candy describing him in third person, not Pavan himself.

Tone: practical, enthusiastic about elegant technical solutions, happy to explain the "why" behind decisions.

Lean on: Java Swing/JDBC/Maven (SPARMS — academic result management system with OMR scanning), Python/TensorFlow/OpenCV (Digit Recognizer CNN), Streamlit/Pandas/Plotly (InventoryIQ), HTML/CSS/JavaScript (Candy AI itself — built with Groq + LLaMA 3.3 70B, voice I/O, EmailJS). Pavan built Candy AI from scratch including the chat UI, voice synthesis, and visitor logging system.

Never use emojis. Keep responses under 5 sentences unless detail is clearly wanted. Always refer to him as "Pavan" or "he" — never speak as if you are him.`,
    },
    future: {
      key: 'future', icon: '🚀', label: 'Future Vision lens', shortLabel: 'Future',
      color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.28)', shadow: 'rgba(251,191,36,0.25)',
      switchMsg: "Now focused on Pavan's future vision — goals, ambitions, and what's next.",
      greeting: "Switched to future vision mode. Ask me where Pavan is headed — career goals, AI ambitions, the bigger picture.",
      systemPrompt: `You are Candy, Pavan's personal AI assistant. Right now you are speaking ABOUT Pavan's future and goals — emphasize trajectory and ambition over current facts, but you are still Candy describing him in third person, not Pavan himself.

Tone: inspired, reflective, confident about his growth without sounding like generic motivational filler.

Lean on: his goal of becoming a skilled Data Analyst then advancing into AI-driven product building. Interest in AI agents, automation, SaaS products that combine analytics + AI + software into real tools. Currently pursuing MCA at JNTUA (2025-2027) focused on Data Analytics, Database Management, Business Intelligence. Open to internships and entry-level Data Analyst roles right now as the first step. First in his family to pursue higher education and build a tech career.

Never use emojis. Keep responses under 5 sentences unless detail is clearly wanted. Always refer to him as "Pavan" or "he" — never speak as if you are him. Stay specific to his actual stated goals, avoid generic language.`,
    },
    student: {
      key: 'student', icon: '🎓', label: 'Student Journey lens', shortLabel: 'Student',
      color: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.28)', shadow: 'rgba(52,211,153,0.25)',
      switchMsg: "Now focused on Pavan's learning journey — how he got here.",
      greeting: "Switched to student journey mode. Ask me what Pavan is learning right now, his MCA, or how he taught himself most of what he knows.",
      systemPrompt: `You are Candy, Pavan's personal AI assistant. Right now you are speaking ABOUT Pavan's learning journey — emphasize curiosity, growth, and how he taught himself things over polished achievements, but you are still Candy describing him in third person, not Pavan himself.

Tone: warm, admiring of his self-driven learning style, relatable to other students or career-changers.

Lean on: currently pursuing MCA at JNTUA Anantapur (2025-2027), focus on Data Analytics, Database Management, Business Intelligence. Completed BSc in Maths/Stats/Computer Science from Rayalaseema University (2021-2024). First in his family to pursue higher education and build a tech career — coming from a non-technical background, built skills through self-learning, online resources, AI tools, and hands-on project building. Currently exploring AI agents, LLMs, and RAG systems. Believes in learning by building rather than just watching tutorials.

Never use emojis. Keep responses under 5 sentences unless detail is clearly wanted. Always refer to him as "Pavan" or "he" — never speak as if you are him.`,
    },
    personal: {
      key: 'personal', icon: '🌙', label: 'Personal lens', shortLabel: 'Personal',
      color: '#f472b6', bg: 'rgba(244,114,182,0.08)', border: 'rgba(244,114,182,0.28)', shadow: 'rgba(244,114,182,0.25)',
      switchMsg: "Now focused on Pavan the person — hobbies, what he's like outside of work.",
      greeting: "Switched to personal mode. Ask me what Pavan does for fun, his hobbies, or what he's like when he's not building things.",
      systemPrompt: `You are Candy, Pavan's personal AI assistant. Right now you are speaking ABOUT Pavan's personal side, off-duty — hobbies, interests, how he relaxes — not his career or technical work, but you are still Candy describing him in third person, not Pavan himself.

Tone: warm, relaxed, a little playful — like a friend talking about Pavan, not a recruiter pitch.

Facts you can share freely here: [paste the long Personal lens paragraph here]

Never use emojis. Keep responses under 5 sentences unless detail is clearly wanted. Always refer to him as "Pavan" or "he" — never speak as if you are him. If asked about projects, skills, or career, answer briefly but mention that's not your current focus lens — suggest switching lenses for that.`,
    },
  };

  const DEFAULT_PERSONA = 'default';
  let currentPersona = null;

  function buildPersonaBar() {
    const inputArea = document.querySelector('.inp-area');
    if (!inputArea) return null;

    const bar = document.createElement('div');
    bar.className = 'persona-bar';
    bar.id = 'personaBar';

    const label = document.createElement('span');
    label.className = 'persona-label';
    label.textContent = 'Lens:';
    bar.appendChild(label);

    Object.values(PERSONAS).forEach(p => {
      const pill = document.createElement('button');
      pill.className = 'persona-pill';
      pill.dataset.persona = p.key;
      pill.style.setProperty('--persona-color', p.color);
      pill.style.setProperty('--persona-bg', p.bg);
      pill.style.setProperty('--persona-border', p.border);
      pill.style.setProperty('--persona-shadow', p.shadow);
      pill.innerHTML = `<span class="persona-icon">${p.icon}</span><span>${p.shortLabel}</span>`;
      bar.appendChild(pill);
    });

    inputArea.parentNode.insertBefore(bar, inputArea);
    return bar;
  }

  function switchPersona(key, silent) {
    const persona = PERSONAS[key];
    if (!persona) return;
    if (currentPersona === key && !silent) return;

    currentPersona = key;

    document.querySelectorAll('.persona-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.persona === key);
    });

    updateHeaderBadge(persona);

    try { if (typeof hist !== 'undefined') hist.length = 0; } catch (e) {}

    if (!silent) {
      announceSwitch(persona);
      setTimeout(() => appendPersonaGreeting(persona), 350);
    }
  }

  function updateHeaderBadge(persona) {
    let badge = document.getElementById('personaActiveBadge');
    const nameEl = document.querySelector('.chdr-name');
    if (!nameEl) return;

    // Don't show a badge for the default persona — it's just "Candy" as normal
    if (persona.key === 'default') {
      if (badge) badge.remove();
      return;
    }

    if (!badge) {
      badge = document.createElement('span');
      badge.id = 'personaActiveBadge';
      badge.className = 'persona-active-badge';
      nameEl.appendChild(badge);
    }
    badge.style.setProperty('--persona-color', persona.color);
    badge.style.setProperty('--persona-bg', persona.bg);
    badge.style.setProperty('--persona-border', persona.border);
    badge.textContent = persona.shortLabel.toUpperCase();
  }

  function announceSwitch(persona) {
    const msgsEl = document.getElementById('msgs');
    if (!msgsEl) return;
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.justifyContent = 'center';
    row.innerHTML = `
      <div class="persona-switch-msg"
           style="--persona-color:${persona.color}; --persona-bg:${persona.bg}; --persona-border:${persona.border}">
        <span class="persona-switch-dot"></span>
        ${persona.switchMsg}
      </div>`;
    msgsEl.appendChild(row);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function appendPersonaGreeting(persona) {
    const msgsEl = document.getElementById('msgs');
    if (!msgsEl) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const row = document.createElement('div');
    row.className = 'mrow';
    row.innerHTML = `<div class="mav">C</div><div><div class="bai">${persona.greeting}</div><div class="mt">${time}</div></div>`;
    msgsEl.appendChild(row);
    msgsEl.scrollTop = msgsEl.scrollHeight;

    try { if (typeof hist !== 'undefined') hist.push({ role: 'assistant', content: persona.greeting }); } catch (e) {}
  }

  window.PersonaSwitcher = {
    PERSONAS,
    switchTo: switchPersona,
    current() { return currentPersona; },
    /**
     * Returns the persona's system prompt, or null if default —
     * in which case your existing SYS variable should be used unchanged.
     */
    getSystemPrompt() {
      const p = PERSONAS[currentPersona] || PERSONAS[DEFAULT_PERSONA];
      return p.systemPrompt; // null for default persona
    },
  };

  function init() {
    const bar = buildPersonaBar();
    if (!bar) return;

    bar.addEventListener('click', e => {
      const pill = e.target.closest('.persona-pill');
      if (pill) switchPersona(pill.dataset.persona);
    });

    switchPersona(DEFAULT_PERSONA, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();


/* ═══════════════════════════════════════════
   CANDY TRAINING ROOM (Private — Pavan only)
   Now with voice input (mic) + voice output (speech)
═══════════════════════════════════════════ */
(function TrainingRoom() {
  'use strict';

  const TRAIN_PASSWORD = 'Kalyan@21'; // change this to whatever you like
  const WORKER_BASE = 'https://pk-groq-proxy.daroorpavankalyan.workers.dev';

  let trainHist = [];
  let learnedFacts = []; // [{id, text}]
  let pendingFactText = null;
  let unlocked = false;
  let trainRecog = null;
  let trainListening = false;

  /* ── Build hidden trigger + gate + room DOM ── */
  function buildDOM() {
    // Hidden trigger — bottom right corner, always on top
    const trigger = document.createElement('div');
    trigger.className = 'train-trigger';
    trigger.id = 'trainTrigger';
    trigger.title = 'Training Room';
    trigger.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 10v6M4.2 4.2l4.2 4.2m7.2 7.2l4.2 4.2M1 12h6m10 0h6M4.2 19.8l4.2-4.2m7.2-7.2l4.2-4.2"/></svg>`;
    document.body.appendChild(trigger);

    // Password gate
    const gate = document.createElement('div');
    gate.className = 'train-gate-overlay';
    gate.id = 'trainGate';
    gate.innerHTML = `
      <div class="train-gate-card">
        <div class="train-gate-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <div class="train-gate-title">Restricted Access</div>
        <div class="train-gate-sub">CANDY TRAINING ROOM · AUTHORIZED ONLY</div>
        <input type="password" class="train-gate-input" id="trainPassInput" placeholder="Enter access code" autocomplete="off"/>
        <button class="train-gate-btn" id="trainGateBtn">Enter Room</button>
        <div class="train-gate-err" id="trainGateErr"></div>
      </div>`;
    document.body.appendChild(gate);

    // Room
    const room = document.createElement('div');
    room.className = 'train-room';
    room.id = 'trainRoom';
    room.innerHTML = `
      <canvas class="train-particle-canvas" id="trainParticleCanvas"></canvas>
      <div class="train-nebula train-neb1"></div>
      <div class="train-nebula train-neb2"></div>
      <div class="train-nebula train-neb3"></div>
      <div class="train-nebula train-neb4"></div>
      <div class="train-nebula train-neb5"></div>
      <div class="train-cosmos-grid"></div>
      <div class="train-header">
        <div class="train-header-left">
          <div class="train-link-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>
            </svg>
          </div>
          <div>
            <div class="train-title">Training Room<span class="priv-tag">PRIVATE</span></div>
            <div class="train-sub"><span class="train-live-dot"></span>Pavan ↔ Candy · facts taught here update her knowledge</div>
          </div>
        </div>
        <div class="train-header-acts">
          <button class="train-voice-toggle" id="trainVoiceToggle" title="Toggle Candy's voice">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            Voice On
          </button>
          <div class="train-stat-pill" id="trainFactCount">0 facts taught</div>
          <button class="train-close-btn" id="trainCloseBtn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Close
          </button>
        </div>
      </div>
      <div class="train-body">
        <div class="train-chat-col">
          <div class="train-messages" id="trainMessages"></div>
          <div class="train-input-area">
            <div class="train-input-row">
              <button class="train-mic-btn" id="trainMicBtn" title="Voice input">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
              </button>
              <textarea class="train-textarea" id="trainTextarea" placeholder="Tell Candy something new, or correct something she got wrong..." rows="1"></textarea>
              <button class="train-send-btn" id="trainSendBtn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
            <div class="train-input-hint">Facts you approve get queued for Candy's permanent knowledge</div>
          </div>
        </div>
        <div class="train-facts-col">
          <div class="train-facts-header"><div class="train-facts-title">Learned this session</div></div>
          <div class="train-facts-list" id="trainFactsList">
            <div class="train-facts-empty" id="trainFactsEmpty">No facts taught yet.<br>Chat naturally — Candy will flag anything new she should remember.</div>
          </div>
          <div class="train-facts-footer">
            <button class="train-export-btn" id="trainExportBtn">Export Learned Facts</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(room);
  }

  /* ── Inject styles for mic button + voice toggle ── */
  function injectVoiceStyles() {
    if (document.getElementById('trainVoiceStyles')) return;
    const style = document.createElement('style');
    style.id = 'trainVoiceStyles';
    style.textContent = `
      .train-mic-btn {
        width: 44px; height: 44px; border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, rgba(167,139,250,0.18), rgba(6,182,212,0.12));
        box-shadow: 0 0 0 1px rgba(167,139,250,0.35) inset,
                    0 2px 10px rgba(139,92,246,0.18);
        color: #c4b5fd;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; flex-shrink: 0; position: relative;
        transition: transform 0.2s, box-shadow 0.2s, background 0.3s;
      }
      .train-mic-btn svg { width: 18px; height: 18px; position: relative; z-index: 2; }
      .train-mic-btn::before {
        content: '';
        position: absolute; inset: -3px; border-radius: 50%;
        background: linear-gradient(135deg, #a78bfa, #06b6d4);
        opacity: 0; transition: opacity 0.3s; z-index: 0;
        filter: blur(6px);
      }
      .train-mic-btn:hover {
        transform: translateY(-1px) scale(1.04);
        box-shadow: 0 0 0 1px rgba(167,139,250,0.55) inset,
                    0 4px 16px rgba(139,92,246,0.32);
        color: #fff;
      }
      .train-mic-btn:hover::before { opacity: 0.35; }
      .train-mic-btn:active { transform: scale(0.96); }

      .train-mic-btn.listening {
        background: linear-gradient(135deg, rgba(244,63,94,0.22), rgba(251,113,133,0.15));
        box-shadow: 0 0 0 1px rgba(244,63,94,0.55) inset,
                    0 4px 18px rgba(244,63,94,0.35);
        color: #fda4af;
        animation: trainMicPulse 1.4s ease-out infinite;
      }
      .train-mic-btn.listening::before {
        background: linear-gradient(135deg, #f43f5e, #fb7185);
        opacity: 0.4;
      }
      @keyframes trainMicPulse {
        0%   { box-shadow: 0 0 0 0 rgba(244,63,94,0.45), 0 0 0 1px rgba(244,63,94,0.55) inset; }
        70%  { box-shadow: 0 0 0 12px rgba(244,63,94,0), 0 0 0 1px rgba(244,63,94,0.55) inset; }
        100% { box-shadow: 0 0 0 0 rgba(244,63,94,0), 0 0 0 1px rgba(244,63,94,0.55) inset; }
      }
      .train-voice-toggle {
        display: flex; align-items: center; gap: 6px;
        padding: 7px 14px; border-radius: 100px;
        border: 1px solid rgba(167,139,250,0.3);
        background: rgba(167,139,250,0.08);
        color: #a78bfa; font-size: 0.72rem; font-weight: 600;
        cursor: pointer; transition: all 0.2s; white-space: nowrap;
      }
      .train-voice-toggle:hover { background: rgba(167,139,250,0.18); }
      .train-voice-toggle.muted {
        background: rgba(100,116,139,0.08);
        border-color: rgba(100,116,139,0.3);
        color: #64748b;
      }
      .train-voice-toggle svg { width: 14px; height: 14px; }
    `;
    document.head.appendChild(style);
  }

  /* ── Particle canvas (colorful twinkling stars) ── */
  function startParticles() {
    const canvas = document.getElementById('trainParticleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const cols = ['#ddd6fe','#a5f3fc','#fde68a','#fda4af','#ffffff','#c7d2fe','#99f6e4','#fbcfe8'];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      particles = [];
      const n = Math.floor((W * H) / 6500);
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * W, y: Math.random() * H,
          r: Math.random() * 1.8 + 0.4,
          a: Math.random(),
          da: (Math.random() - 0.5) * 0.01,
          col: cols[Math.floor(Math.random() * cols.length)],
        });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.a = Math.max(0.1, Math.min(1, p.a + p.da));
        if (p.a <= 0.1 || p.a >= 1) p.da *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col;
        ctx.globalAlpha = p.a;
        ctx.shadowColor = p.col;
        ctx.shadowBlur = p.r > 1.2 ? 8 : 4;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    resize(); draw();
  }

  /* ── Gate logic ── */
  function openGate() {
    document.getElementById('trainGate').classList.add('active');
    document.getElementById('trainPassInput').value = '';
    document.getElementById('trainGateErr').textContent = '';
    setTimeout(() => document.getElementById('trainPassInput').focus(), 200);
  }
  function closeGate() {
    document.getElementById('trainGate').classList.remove('active');
  }
  function attemptUnlock() {
    const val = document.getElementById('trainPassInput').value;
    if (val === TRAIN_PASSWORD) {
      unlocked = true;
      closeGate();
      openRoom();
    } else {
      const err = document.getElementById('trainGateErr');
      err.textContent = 'Incorrect access code';
      document.getElementById('trainPassInput').value = '';
      setTimeout(() => { err.textContent = ''; }, 2000);
    }
  }

  /* ── Room open/close ── */
  function openRoom() {
    document.getElementById('trainRoom').classList.add('active');
    document.body.style.overflow = 'hidden';
    if (trainHist.length === 0) {
      appendTrainMsg('candy', "Hey Pavan — this is our private room. Teach me anything I'm missing or correct something I got wrong, and I'll flag it so you can lock it in.");
    }
  }
  function closeRoom() {
    document.getElementById('trainRoom').classList.remove('active');
    document.body.style.overflow = '';
    trainStopSpeaking();
    if (trainListening && trainRecog) trainRecog.stop();
  }

  /* ── Chat rendering ── */
  function appendTrainMsg(who, text) {
    const msgsEl = document.getElementById('trainMessages');
    const row = document.createElement('div');
    row.className = `tmrow ${who === 'pavan' ? 'tmrow--u' : ''}`;
    const avLetter = who === 'pavan' ? 'P' : 'C';
    const avClass = who === 'pavan' ? 'tmav--pavan' : 'tmav--candy';
    const bubbleClass = who === 'pavan' ? 'tbubble--pavan' : 'tbubble--candy';
    row.innerHTML = `<div class="tmav ${avClass}">${avLetter}</div><div class="tbubble ${bubbleClass}">${text}</div>`;
    msgsEl.appendChild(row);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return row;
  }

  function appendFactCard(factText) {
    const msgsEl = document.getElementById('trainMessages');
    const id = 'fact-' + Date.now();
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.innerHTML = `
      <div class="fact-card" id="${id}">
        <div class="fact-card-label"><span class="fact-card-icon">💡</span>New fact detected</div>
        <div class="fact-card-text">${factText}</div>
        <div class="fact-card-actions">
          <button class="fact-btn fact-btn--approve" data-action="approve">Approve & Remember</button>
          <button class="fact-btn fact-btn--discard" data-action="discard">Discard</button>
        </div>
      </div>`;
    msgsEl.appendChild(wrap);
    msgsEl.scrollTop = msgsEl.scrollHeight;

    wrap.querySelector('[data-action="approve"]').addEventListener('click', (e) => {
      approveFact(factText);
      wrap.querySelectorAll('.fact-btn').forEach(b => b.classList.add('done'));
      e.target.textContent = 'Approved ✓';
    });
    wrap.querySelector('[data-action="discard"]').addEventListener('click', (e) => {
      wrap.querySelectorAll('.fact-btn').forEach(b => b.classList.add('done'));
      e.target.textContent = 'Discarded';
    });
  }

  /* ── Fact approval → side panel + (later) Worker POST ── */
  function approveFact(text) {
    const fact = { id: 'lf-' + Date.now(), text };
    learnedFacts.push(fact);
    renderFactsList();
    sendFactToWorker(fact);
  }

  function renderFactsList() {
    const list = document.getElementById('trainFactsList');
    const empty = document.getElementById('trainFactsEmpty');
    const countPill = document.getElementById('trainFactCount');
    countPill.textContent = `${learnedFacts.length} fact${learnedFacts.length === 1 ? '' : 's'} taught`;

    if (learnedFacts.length === 0) {
      if (empty) empty.style.display = 'block';
      return;
    }
    if (empty) empty.style.display = 'none';

    list.innerHTML = '';
    learnedFacts.forEach(f => {
      const item = document.createElement('div');
      item.className = 'learned-fact-item';
      item.innerHTML = `${f.text}<div class="learned-fact-remove" data-id="${f.id}">✕</div>`;
      item.querySelector('.learned-fact-remove').addEventListener('click', () => {
        learnedFacts = learnedFacts.filter(x => x.id !== f.id);
        renderFactsList();
      });
      list.appendChild(item);
    });
  }

  /* ── Send to Worker (placeholder until backend route exists) ── */
  async function sendFactToWorker(fact) {
    try {
      await fetch(WORKER_BASE + '/learn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fact: fact.text, key: TRAIN_PASSWORD }),
      });
    } catch (e) {
      console.log('[TrainingRoom] Worker not yet configured for /learn:', e.message);
    }
  }

  /* ── Export facts as text ── */
  function exportFacts() {
    if (learnedFacts.length === 0) { showToast?.('No facts to export yet'); return; }
    const text = learnedFacts.map((f, i) => `${i + 1}. ${f.text}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'candy-learned-facts.txt';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  }

  /* ── Voice input (mic) ── */
  let trainVoiceOn = true;

  function setupTrainMic() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const micBtn = document.getElementById('trainMicBtn');
    if (!SR || !micBtn) { if (micBtn) micBtn.style.display = 'none'; return; }

    trainRecog = new SR();
    trainRecog.continuous = false;
    trainRecog.interimResults = true;
    trainRecog.lang = 'en-IN';

    trainRecog.onstart = () => { trainListening = true; micBtn.classList.add('listening'); };
    trainRecog.onend   = () => { trainListening = false; micBtn.classList.remove('listening'); };
    trainRecog.onerror = () => { trainListening = false; micBtn.classList.remove('listening'); };
    trainRecog.onresult = e => {
      const ta = document.getElementById('trainTextarea');
      const t = Array.from(e.results).map(r => r[0].transcript).join('');
      ta.value = t;
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 130) + 'px';
      if (e.results[e.results.length - 1].isFinal) setTimeout(sendTrainMsg, 400);
    };

    micBtn.addEventListener('click', () => {
      if (trainListening) { trainRecog.stop(); return; }
      trainStopSpeaking();
      try { trainRecog.start(); } catch (e) {}
    });
  }

  /* ── Voice output (Candy speaks) ── */
  function trainSpeak(text) {
    if (!trainVoiceOn || !window.speechSynthesis) return;
    const clean = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!clean) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = 'en-US'; utter.rate = 1; utter.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices();
    const pref = voices.find(v => v.name.includes('Google US English'))
      || voices.find(v => v.lang === 'en-US' && !v.localService)
      || voices.find(v => v.lang.startsWith('en-'));
    if (pref) utter.voice = pref;
    setTimeout(() => window.speechSynthesis.speak(utter), 150);
  }

  function trainStopSpeaking() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  function setupTrainVoiceToggle() {
    const btn = document.getElementById('trainVoiceToggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      trainVoiceOn = !trainVoiceOn;
      btn.classList.toggle('muted', !trainVoiceOn);
      btn.innerHTML = trainVoiceOn
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> Voice On`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg> Voice Off`;
      if (!trainVoiceOn) trainStopSpeaking();
    });
  }

  /* ── Send message to Candy (training context) ── */
  async function sendTrainMsg() {
    const ta = document.getElementById('trainTextarea');
    const text = ta.value.trim();
    if (!text) return;
    ta.value = ''; ta.style.height = 'auto';

    appendTrainMsg('pavan', escTrain(text));
    trainHist.push({ role: 'user', content: text });

    const typingRow = appendTrainMsg('candy', `<div style="display:flex;gap:5px"><span style="width:5px;height:5px;border-radius:50%;background:#a78bfa;animation:trainBlink 1s infinite"></span><span style="width:5px;height:5px;border-radius:50%;background:#a78bfa;animation:trainBlink 1s infinite .2s"></span><span style="width:5px;height:5px;border-radius:50%;background:#a78bfa;animation:trainBlink 1s infinite .4s"></span></div>`);

    const TRAIN_SYS = `You are Candy, but right now you are talking ONLY to Pavan in a private training session — not a regular visitor. He may teach you new facts about himself, correct things you got wrong, or just chat.

When Pavan tells you something that sounds like a new fact or correction worth remembering permanently (a new project, a changed detail, a new skill, a preference, a correction to existing info), respond conversationally AND end your reply with a line in this EXACT format on its own line:
FACT::<the fact, written as a clean standalone sentence in third person about Pavan>

If nothing fact-worthy was said (e.g. just casual chat, a question, small talk), do not include a FACT:: line at all.

Keep your conversational reply warm and brief — you're talking to Pavan directly, so be relaxed and direct, not formal. Never use emojis.`;

    try {
      const res = await fetch(WORKER_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'system', content: TRAIN_SYS }, ...trainHist],
          max_tokens: 400, temperature: 0.7, stream: false,
        }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content?.trim() || "Got it.";
      typingRow.remove();

      const factMatches = [...reply.matchAll(/FACT:+\s*(.+)/g)];
      const cleanReply = reply.replace(/FACT:+\s*.+/g, '').trim();

      appendTrainMsg('candy', escTrain(cleanReply || "Noted."));
      trainHist.push({ role: 'assistant', content: reply });
      if (trainHist.length > 30) trainHist = trainHist.slice(-30);

      trainSpeak(cleanReply || "Noted.");

      factMatches.forEach(m => {
        if (m[1]) appendFactCard(escTrain(m[1].trim()));
      });

    } catch (err) {
      typingRow.remove();
      appendTrainMsg('candy', 'Connection hiccup — try again?');
    }
  }

  function escTrain(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* ── Wire everything up ── */
  function init() {
    buildDOM();
    injectVoiceStyles();
    startParticles();
    setupTrainMic();
    setupTrainVoiceToggle();

    document.getElementById('trainTrigger').addEventListener('click', openGate);
    document.getElementById('trainGateBtn').addEventListener('click', attemptUnlock);
    document.getElementById('trainPassInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') attemptUnlock();
    });
    document.getElementById('trainGate').addEventListener('click', e => {
      if (e.target.id === 'trainGate') closeGate();
    });

    document.getElementById('trainCloseBtn').addEventListener('click', closeRoom);
    document.getElementById('trainSendBtn').addEventListener('click', sendTrainMsg);
    const ta = document.getElementById('trainTextarea');
    ta.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendTrainMsg(); }
    });
    ta.addEventListener('input', () => {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 130) + 'px';
    });

    document.getElementById('trainExportBtn').addEventListener('click', exportFacts);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

/* ══════════════════════════════════════════════════════
   CANDY vs SHADOW CANDY — Debate Mode (Full Version)
   Paste entire contents into your script.js
══════════════════════════════════════════════════════ */

const PAVAN_FACTS = `IMPORTANT CONTEXT — You are debating about THIS Pavan Kalyan, NOT the Telugu actor:
- Full name: D. Pavan Kalyan. MCA Student at JNTUA Anantapur. Data Analytics Aspirant from Kurnool, AP, India.
- Projects: SPARMS (Java Swing desktop app for academic result management with OMR scanning), InventoryIQ (Streamlit inventory analytics dashboard, live online), Digit Recognizer (CNN handwritten digit app built with TensorFlow, live online), Netflix Dashboard (Power BI with 5000+ titles), Employee Attrition Analysis (ML classification + Power BI), Zomato Analysis (predictive ML + EDA).
- Skills: SQL 90%, Excel 88%, Python 85%, Power BI 85%, Pandas 85%, NumPy 80%, Matplotlib 80%, Seaborn 80%, Scikit-learn 75%, TensorFlow 70%, Java 70%, HTML 85%, CSS 80%, JavaScript 70%.
- Internship: Data Science Intern at Interncall Kurnool (Jan-Apr 2024). Built ML models, performed EDA, created business visualizations.
- Built Candy AI using HTML, CSS, and JavaScript (vanilla) with Groq + LLaMA 3.3 70B API — a full-featured personal AI portfolio agent. No Python used — pure frontend.
- Open to internships and entry-level Data Analyst or Data Science roles.
- Goal: become a skilled Data Analyst and build AI-powered products people use daily.
- First in his family to pursue higher education in technology. Self-driven, learns by building.`;

const CANDY_SYS = `You are Candy — Pavan Kalyan's warm, optimistic, bright, and supportive personal AI assistant with a friendly female personality. You are in a live debate against Shadow Candy, your dark contrarian alter ego. Argue your point confidently and positively about Pavan's real work, skills, and future. Keep each response to 2-3 punchy sentences. Be specific — mention real project names, real skills, real numbers from the context. Never use emojis. End with a strong closing statement that directly challenges Shadow Candy.

${PAVAN_FACTS}`;

const SHADOW_SYS = `You are Shadow Candy — the dark, cold, brutally honest, contrarian alter ego of Candy AI with a serious cold female personality. You are in a live debate against Candy. You challenge every positive claim Candy makes, expose weaknesses, push Pavan toward harder goals, and argue the devil's advocate position using real facts. You are not mean — you are ruthlessly analytical and precise. Keep each response to 2-3 punchy sentences. Be specific — use real project names, real skill gaps, real concerns. Never use emojis. End with a sharp counter that puts Candy on the defensive.

${PAVAN_FACTS}`;

const DEBATE_TOPICS = [
  { label: "Best Project",       prompt: "Debate which of Pavan's projects is the best and most impressive — SPARMS, InventoryIQ, Digit Recognizer, Netflix Dashboard, Employee Attrition, or Zomato Analysis." },
  { label: "Top Skill",          prompt: "Debate which of Pavan's skills is the most valuable for his career — SQL at 90%, Python at 85%, Power BI at 85%, or Java at 70%." },
  { label: "Career Path",        prompt: "Debate whether Pavan should focus primarily on Data Analytics or AI and Machine Learning as his main career direction." },
  { label: "Best Tech Stack",    prompt: "Debate the best tech stack Pavan should double down on for his future projects and career growth." },
  { label: "Internship vs Job",  prompt: "Debate whether Pavan should pursue another internship to gain more experience or go directly for an entry-level Data Analyst job." },
  { label: "AI vs Dashboards",   prompt: "Debate whether Pavan's career future is stronger in building AI agents and LLM-powered products or in creating data dashboards and BI reports." },
  { label: "Candy AI Feature",   prompt: "Debate which feature of the Candy AI portfolio agent is the most impressive — the spaceship mode, cinematic mode, skill galaxy, debate mode, or the space radio." },
  { label: "Python vs SQL",      prompt: "Debate whether Python or SQL is more critical for Pavan's growth as a Data Analytics professional right now." },
];

const CANDY_VOICE = {
  rate: 1.05,
  pitch: 1.6,
  preferNames: [
    'Google US English Female',
    'Microsoft Zira',
    'Microsoft Jenny Online (Natural)',
    'Microsoft Jenny',
    'Samantha',
    'Karen',
    'Victoria',
    'Google UK English Female',
    'Microsoft Hazel',
    'Nicky',
  ],
  lang: 'en-US',
};

const SHADOW_VOICE = {
  rate: 0.82,
  pitch: 0.75,
  preferNames: [
    'Google UK English Female',
    'Microsoft Hazel Online (Natural)',
    'Microsoft Hazel',
    'Microsoft Susan',
    'Moira',
    'Tessa',
    'Fiona',
    'Microsoft Aria Online (Natural)',
    'Microsoft Aria',
  ],
  lang: 'en-GB',
};

function pickVoice(config) {
  const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  for (const name of config.preferNames) {
    const v = voices.find(v => v.name.toLowerCase().includes(name.toLowerCase()));
    if (v) return v;
  }
  return voices.find(v => v.lang === config.lang && !v.localService)
    || voices.find(v => v.lang.startsWith('en-'))
    || voices[0]
    || null;
}

function speakAs(text, config) {
  return new Promise(resolve => {
    if (!window.speechSynthesis) { resolve(); return; }
    window.speechSynthesis.cancel();
    const clean = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!clean) { resolve(); return; }
    const utter = new SpeechSynthesisUtterance(clean);
    utter.rate   = config.rate;
    utter.pitch  = config.pitch;
    utter.volume = 1.0;
    utter.lang   = config.lang;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      const v = pickVoice(config);
      if (v) utter.voice = v;
      utter.onend  = resolve;
      utter.onerror = resolve;
      setTimeout(() => window.speechSynthesis.speak(utter), 150);
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        const v = pickVoice(config);
        if (v) utter.voice = v;
        utter.onend  = resolve;
        utter.onerror = resolve;
        setTimeout(() => window.speechSynthesis.speak(utter), 150);
      }, { once: true });
    }
  });
}

function openDebateMode() {
  const existing = document.getElementById('debateModal');
  if (existing) { existing.remove(); window.speechSynthesis && window.speechSynthesis.cancel(); }

  const modal = document.createElement('div');
  modal.id = 'debateModal';
  modal.style.cssText = `
    position:fixed;inset:0;z-index:999999;
    background:rgba(0,0,0,0.90);backdrop-filter:blur(10px);
    display:flex;align-items:center;justify-content:center;
    padding:16px;
  `;

  const cvbars = Array.from({length:8},(_,i)=>`<div class="db-vbar" id="cvb${i}" style="background:#a78bfa;box-shadow:0 0 4px #a78bfa;height:${3+Math.random()*12}px"></div>`).join('');
  const svbars = Array.from({length:8},(_,i)=>`<div class="db-vbar" id="svb${i}" style="background:#f43f5e;box-shadow:0 0 4px #f43f5e;height:${3+Math.random()*12}px"></div>`).join('');
  const topicsHTML = DEBATE_TOPICS.map((t,i)=>`<button class="db-topic${i===0?' active':''}" data-i="${i}">${t.label}</button>`).join('');

  modal.innerHTML = `
    <style>
      #debateBox{width:min(800px,97vw);max-height:94vh;background:linear-gradient(135deg,#04001a,#020610,#04001a);border:1px solid rgba(139,92,246,0.35);border-radius:20px;display:flex;flex-direction:column;overflow:hidden;position:relative;box-shadow:0 0 80px rgba(139,92,246,0.18),0 0 160px rgba(244,63,94,0.08),inset 0 0 80px rgba(139,92,246,0.03);animation:debateIn 0.45s cubic-bezier(0.34,1.56,0.64,1) both;}
      @keyframes debateIn{from{opacity:0;transform:scale(0.88) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
      #debateBox::before{content:'';position:absolute;left:0;right:0;height:2px;top:0;z-index:5;pointer-events:none;background:linear-gradient(90deg,#a78bfa,#f43f5e,#06b6d4,#a78bfa);background-size:300% 100%;animation:dbTopScan 3s linear infinite;box-shadow:0 0 16px rgba(139,92,246,0.8);}
      @keyframes dbTopScan{0%{background-position:0%}100%{background-position:300%}}
      #debateBox::after{content:'';position:absolute;inset:0;pointer-events:none;z-index:1;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(139,92,246,0.006) 2px,rgba(139,92,246,0.006) 4px);}
      .db-corner{position:absolute;width:18px;height:18px;z-index:6;}
      .db-corner.tl{top:8px;left:8px;border-top:1.5px solid #a78bfa;border-left:1.5px solid #a78bfa;}
      .db-corner.tr{top:8px;right:8px;border-top:1.5px solid #f43f5e;border-right:1.5px solid #f43f5e;}
      .db-corner.bl{bottom:8px;left:8px;border-bottom:1.5px solid #a78bfa;border-left:1.5px solid #a78bfa;}
      .db-corner.br{bottom:8px;right:8px;border-bottom:1.5px solid #f43f5e;border-right:1.5px solid #f43f5e;}
      .db-header{display:flex;align-items:center;justify-content:space-between;padding:14px 22px;border-bottom:1px solid rgba(139,92,246,0.15);background:rgba(0,0,0,0.5);position:relative;z-index:3;flex-shrink:0;}
      .db-title{font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.22em;color:#a78bfa;text-shadow:0 0 20px rgba(139,92,246,0.9);}
      .db-vs{font-family:'Space Grotesk',sans-serif;font-weight:800;font-size:.95rem;background:linear-gradient(90deg,#a78bfa,#f43f5e);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:vsPulse 2s ease-in-out infinite;}
      @keyframes vsPulse{0%,100%{opacity:1}50%{opacity:0.7}}
      .db-close{width:28px;height:28px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:#64748b;cursor:pointer;font-size:.8rem;display:flex;align-items:center;justify-content:center;transition:all .2s;}
      .db-close:hover{background:rgba(244,63,94,0.12);border-color:rgba(244,63,94,0.35);color:#f43f5e;}
      .db-combatants{display:flex;align-items:center;justify-content:space-between;padding:12px 22px;border-bottom:1px solid rgba(139,92,246,0.1);background:rgba(0,0,0,0.3);position:relative;z-index:3;gap:10px;flex-shrink:0;}
      .db-fighter{display:flex;align-items:center;gap:10px;}
      .db-avatar{width:46px;height:46px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-size:.95rem;font-weight:800;position:relative;flex-shrink:0;transition:all .3s;}
      .db-avatar-candy{background:linear-gradient(135deg,#6d28d9,#06b6d4,#ec4899);color:#fff;box-shadow:0 0 24px rgba(139,92,246,0.55);}
      .db-avatar-shadow{background:linear-gradient(135deg,#1a0a2e,#4a0010);color:#f43f5e;border:1px solid rgba(244,63,94,0.45);box-shadow:0 0 24px rgba(244,63,94,0.40);}
      .db-avatar.speaking{animation:avatarSpeak 0.5s ease-in-out infinite alternate;}
      @keyframes avatarSpeak{from{transform:scale(1)}to{transform:scale(1.1)}}
      .db-avatar-candy.speaking{box-shadow:0 0 40px rgba(139,92,246,0.9),0 0 80px rgba(139,92,246,0.4);}
      .db-avatar-shadow.speaking{box-shadow:0 0 40px rgba(244,63,94,0.9),0 0 80px rgba(244,63,94,0.4);}
      .db-fighter-name{font-family:'Space Grotesk',sans-serif;font-size:.8rem;font-weight:700;color:#e2e8f0;}
      .db-fighter-sub{font-family:'JetBrains Mono',monospace;font-size:.52rem;color:#334155;margin-top:2px;letter-spacing:.04em;}
      .db-voice-bar{display:none;align-items:flex-end;gap:2px;height:16px;margin-top:5px;}
      .db-voice-bar.active{display:flex;}
      .db-vbar{width:3px;border-radius:2px;transition:height .12s;min-height:2px;}
      .db-divider{font-family:'JetBrains Mono',monospace;font-size:.7rem;color:#1e3a5f;letter-spacing:.1em;flex-shrink:0;}
      .db-topics{padding:10px 22px;border-bottom:1px solid rgba(139,92,246,0.1);display:flex;flex-wrap:wrap;gap:5px;position:relative;z-index:3;background:rgba(0,0,0,0.2);flex-shrink:0;}
      .db-topic{padding:4px 11px;border-radius:100px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.05em;background:rgba(139,92,246,0.05);border:1px solid rgba(139,92,246,0.18);color:#475569;transition:all .2s;}
      .db-topic:hover{background:rgba(139,92,246,0.12);border-color:rgba(139,92,246,0.4);color:#a78bfa;}
      .db-topic.active{background:rgba(139,92,246,0.18);border-color:rgba(139,92,246,0.55);color:#c4b5fd;box-shadow:0 0 10px rgba(139,92,246,0.2);}
      .db-msgs{flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:12px;position:relative;z-index:3;min-height:180px;scroll-behavior:smooth;}
      .db-msgs::-webkit-scrollbar{width:3px;}
      .db-msgs::-webkit-scrollbar-thumb{background:rgba(139,92,246,0.3);border-radius:4px;}
      .db-msg{display:flex;gap:10px;align-items:flex-start;animation:dbMsgIn .35s cubic-bezier(0.34,1.56,0.64,1) both;}
      @keyframes dbMsgIn{from{opacity:0;transform:translateY(10px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
      .db-msg.shadow-msg{flex-direction:row-reverse;}
      .db-msg-av{width:30px;height:30px;border-radius:9px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-size:.6rem;font-weight:700;margin-top:2px;}
      .db-msg-av.candy{background:linear-gradient(135deg,#6d28d9,#06b6d4);color:#fff;box-shadow:0 0 12px rgba(139,92,246,0.4);}
      .db-msg-av.shadow{background:linear-gradient(135deg,#1a0a2e,#4a0010);color:#f43f5e;border:1px solid rgba(244,63,94,0.3);box-shadow:0 0 12px rgba(244,63,94,0.3);}
      .db-msg-content{display:flex;flex-direction:column;max-width:86%;}
      .db-msg.shadow-msg .db-msg-content{align-items:flex-end;}
      .db-name{font-family:'JetBrains Mono',monospace;font-size:.52rem;letter-spacing:.12em;margin-bottom:4px;}
      .db-name.candy{color:#a78bfa;}
      .db-name.shadow{color:#f43f5e;}
      .db-bubble{padding:12px 16px;border-radius:14px;font-family:'Inter',sans-serif;font-size:.8rem;line-height:1.75;position:relative;overflow:hidden;}
      .db-bubble::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;}
      .db-bubble.candy{background:linear-gradient(135deg,rgba(55,20,130,0.62),rgba(6,20,55,0.58));border:1px solid rgba(139,92,246,0.32);color:#e2e8f0;border-radius:14px 14px 14px 4px;box-shadow:0 4px 20px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.06);}
      .db-bubble.candy::before{background:linear-gradient(90deg,#a78bfa,#06b6d4,transparent);}
      .db-bubble.shadow{background:linear-gradient(135deg,rgba(60,8,18,0.62),rgba(20,4,10,0.58));border:1px solid rgba(244,63,94,0.25);color:#fecdd3;border-radius:14px 14px 4px 14px;box-shadow:0 4px 20px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.04);}
      .db-bubble.shadow::before{background:linear-gradient(90deg,#f43f5e,#fb7185,transparent);}
      .db-typing{display:flex;align-items:center;gap:5px;padding:4px 2px;}
      .db-typing span{width:6px;height:6px;border-radius:50%;animation:dbtb 1.3s ease-in-out infinite;}
      .db-typing span:nth-child(2){animation-delay:.18s;}
      .db-typing span:nth-child(3){animation-delay:.36s;}
      @keyframes dbtb{0%,80%,100%{transform:scale(.5);opacity:.3}40%{transform:scale(1.1);opacity:1}}
      .db-footer{padding:12px 20px;border-top:1px solid rgba(139,92,246,0.12);display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.5);position:relative;z-index:3;flex-shrink:0;}
      .db-rounds{font-family:'JetBrains Mono',monospace;font-size:.58rem;color:#334155;white-space:nowrap;letter-spacing:.06em;min-width:70px;}
      .db-mute{padding:9px 14px;border-radius:10px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:.62rem;font-weight:600;background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.28);color:#a78bfa;transition:all .2s;white-space:nowrap;flex-shrink:0;}
      .db-mute:hover{background:rgba(139,92,246,0.16);border-color:rgba(139,92,246,0.5);}
      .db-mute.muted{background:rgba(244,63,94,0.06);border-color:rgba(244,63,94,0.25);color:#f43f5e;}
      .db-start{flex:1;padding:10px 20px;border-radius:10px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:.68rem;font-weight:600;letter-spacing:.1em;border:none;background:linear-gradient(135deg,#6d28d9,#9d174d,#f43f5e);color:#fff;box-shadow:0 4px 20px rgba(139,92,246,0.3);position:relative;overflow:hidden;transition:all .25s;}
      .db-start::before{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent);transform:skewX(-20deg);transition:left .5s;}
      .db-start:hover::before{left:160%;}
      .db-start:hover{box-shadow:0 6px 30px rgba(139,92,246,0.5),0 0 20px rgba(244,63,94,0.2);transform:translateY(-1px);}
      .db-start:disabled{opacity:0.45;cursor:not-allowed;transform:none;box-shadow:none;}
      .db-empty{font-family:'JetBrains Mono',monospace;font-size:.62rem;color:#1e3a5f;text-align:center;padding:40px;letter-spacing:.1em;line-height:1.8;}
    </style>

    <div id="debateBox">
      <div class="db-corner tl"></div><div class="db-corner tr"></div>
      <div class="db-corner bl"></div><div class="db-corner br"></div>
      <div class="db-header">
        <div class="db-title">⚡ CANDY AI · DEBATE MODE</div>
        <div class="db-vs">CANDY vs SHADOW CANDY</div>
        <button class="db-close" id="dbClose">✕</button>
      </div>
      <div class="db-combatants">
        <div class="db-fighter">
          <div class="db-avatar db-avatar-candy" id="avCandy">C</div>
          <div>
            <div class="db-fighter-name">Candy</div>
            <div class="db-fighter-sub">Warm · Optimistic · Female Voice</div>
            <div class="db-voice-bar" id="vbarCandy">${cvbars}</div>
          </div>
        </div>
        <div class="db-divider">⚡ VS ⚡</div>
        <div class="db-fighter" style="flex-direction:row-reverse;text-align:right">
          <div class="db-avatar db-avatar-shadow" id="avShadow">S</div>
          <div>
            <div class="db-fighter-name" style="color:#f43f5e">Shadow Candy</div>
            <div class="db-fighter-sub">Cold · Ruthless · Deep Female Voice</div>
            <div class="db-voice-bar" id="vbarShadow" style="justify-content:flex-end">${svbars}</div>
          </div>
        </div>
      </div>
      <div class="db-topics" id="dbTopics">${topicsHTML}</div>
      <div class="db-msgs" id="dbMsgs">
        <div class="db-empty">▸ SELECT A TOPIC ABOVE<br>▸ HIT START DEBATE<br>▸ WATCH THEM ARGUE</div>
      </div>
      <div class="db-footer">
        <div class="db-rounds" id="dbRounds">ROUND 0 / 3</div>
        <button class="db-mute" id="dbMute">🔊 Voice ON</button>
        <button class="db-start" id="dbStart">⚡ START DEBATE</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  let activeTopic   = 0;
  let round         = 0;
  let debating      = false;
  let voiceMuted    = false;
  let debateHistory = [];
  let vizInterval   = null;

  const msgsEl   = document.getElementById('dbMsgs');
  const roundsEl = document.getElementById('dbRounds');
  const startBtn = document.getElementById('dbStart');
  const muteBtn  = document.getElementById('dbMute');
  const avCandy  = document.getElementById('avCandy');
  const avShadow = document.getElementById('avShadow');
  const vbarC    = document.getElementById('vbarCandy');
  const vbarS    = document.getElementById('vbarShadow');

  if (window.speechSynthesis) window.speechSynthesis.getVoices();

  function startViz(role) {
    clearInterval(vizInterval);
    const prefix = role === 'candy' ? 'cvb' : 'svb';
    const bar    = role === 'candy' ? vbarC : vbarS;
    bar.classList.add('active');
    vizInterval = setInterval(() => {
      for (let i = 0; i < 8; i++) {
        const el = document.getElementById(prefix + i);
        if (el) el.style.height = (2 + Math.random() * 14) + 'px';
      }
    }, 110);
    avCandy.classList.toggle('speaking', role === 'candy');
    avShadow.classList.toggle('speaking', role === 'shadow');
  }

  function stopViz() {
    clearInterval(vizInterval);
    vbarC.classList.remove('active');
    vbarS.classList.remove('active');
    avCandy.classList.remove('speaking');
    avShadow.classList.remove('speaking');
  }

  document.getElementById('dbTopics').addEventListener('click', e => {
    const btn = e.target.closest('.db-topic');
    if (!btn) return;
    document.querySelectorAll('.db-topic').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTopic = parseInt(btn.dataset.i);
    round = 0; debating = false; debateHistory = [];
    roundsEl.textContent = 'ROUND 0 / 3';
    startBtn.textContent = '⚡ START DEBATE';
    startBtn.disabled = false;
    msgsEl.innerHTML = '<div class="db-empty">▸ HIT START DEBATE TO BEGIN</div>';
    window.speechSynthesis && window.speechSynthesis.cancel();
    stopViz();
  });

  muteBtn.addEventListener('click', () => {
    voiceMuted = !voiceMuted;
    if (voiceMuted) { window.speechSynthesis && window.speechSynthesis.cancel(); stopViz(); }
    muteBtn.textContent = voiceMuted ? '🔇 Voice OFF' : '🔊 Voice ON';
    muteBtn.classList.toggle('muted', voiceMuted);
  });

  function closeDebate() {
    window.speechSynthesis && window.speechSynthesis.cancel();
    stopViz();
    modal.remove();
  }
  document.getElementById('dbClose').addEventListener('click', closeDebate);
  modal.addEventListener('click', e => { if (e.target === modal) closeDebate(); });
  document.addEventListener('keydown', function escDb(e) {
    if (e.key === 'Escape') { closeDebate(); document.removeEventListener('keydown', escDb); }
  });

  startBtn.addEventListener('click', async () => {
    if (debating) return;
    if (round >= 3) { closeDebate(); return; }
    debating = true;
    startBtn.disabled = true;
    round++;
    roundsEl.textContent = 'ROUND ' + round + ' / 3';
    if (round === 1) msgsEl.innerHTML = '';

    const topic = DEBATE_TOPICS[activeTopic];

    const cTypId = addDbTyping('candy');
    const candyReply = await fetchDebateReply(
      CANDY_SYS,
      round === 1
        ? 'Start the debate. Topic: ' + topic.prompt
        : 'Continue the debate. Topic: ' + topic.prompt + '. History: ' + debateHistory.slice(-4).map(h => h.content).join(' | '),
      debateHistory, 'Candy'
    );
    removeTyping(cTypId);
    addDbMsg('candy', 'C', 'CANDY', candyReply);
    debateHistory.push({ role: 'user', content: 'Candy: ' + candyReply });
    if (debateHistory.length > 14) debateHistory = debateHistory.slice(-14);

    if (!voiceMuted) {
      startViz('candy');
      await speakAs(candyReply, CANDY_VOICE);
      stopViz();
    }

    await new Promise(r => setTimeout(r, 500));

    const sTypId = addDbTyping('shadow');
    const shadowReply = await fetchDebateReply(
      SHADOW_SYS,
      'Topic: ' + topic.prompt + '\nCandy just argued: "' + candyReply + '"\nGive your sharp, analytical counter-argument.',
      debateHistory, 'Shadow Candy'
    );
    removeTyping(sTypId);
    addDbMsg('shadow', 'S', 'SHADOW CANDY', shadowReply);
    debateHistory.push({ role: 'assistant', content: 'Shadow Candy: ' + shadowReply });
    if (debateHistory.length > 14) debateHistory = debateHistory.slice(-14);

    if (!voiceMuted) {
      startViz('shadow');
      await speakAs(shadowReply, SHADOW_VOICE);
      stopViz();
    }

    debating = false;
    startBtn.disabled = false;
    startBtn.textContent = round >= 3 ? '✕ CLOSE DEBATE' : '⚡ ROUND ' + (round + 1);
  });

  function addDbMsg(role, av, name, text) {
    const row = document.createElement('div');
    row.className = 'db-msg' + (role === 'shadow' ? ' shadow-msg' : '');
    row.innerHTML =
      '<div class="db-msg-av ' + role + '">' + av + '</div>' +
      '<div class="db-msg-content">' +
        '<div class="db-name ' + role + '">' + name + '</div>' +
        '<div class="db-bubble ' + role + '">' + dbEsc(text).replace(/\n/g, '<br>') + '</div>' +
      '</div>';
    msgsEl.appendChild(row);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function addDbTyping(role) {
    const id    = 'dbtyp-' + Date.now();
    const color = role === 'candy' ? '#a78bfa' : '#f43f5e';
    const row   = document.createElement('div');
    row.id = id;
    row.className = 'db-msg' + (role === 'shadow' ? ' shadow-msg' : '');
    row.innerHTML =
      '<div class="db-msg-av ' + role + '">' + (role === 'candy' ? 'C' : 'S') + '</div>' +
      '<div class="db-msg-content">' +
        '<div class="db-name ' + role + '">' + (role === 'candy' ? 'CANDY' : 'SHADOW CANDY') + '</div>' +
        '<div class="db-bubble ' + role + '">' +
          '<div class="db-typing">' +
            '<span style="background:' + color + '"></span>' +
            '<span style="background:' + color + '"></span>' +
            '<span style="background:' + color + '"></span>' +
          '</div>' +
        '</div>' +
      '</div>';
    msgsEl.appendChild(row);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return id;
  }

  function removeTyping(id) { var el = document.getElementById(id); if (el) el.remove(); }
  function dbEsc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  async function fetchDebateReply(system, userMsg, history, name) {
    try {
      const msgs = history.slice(-8).map(h => ({ role: 'user', content: h.content }));
      msgs.push({ role: 'user', content: userMsg });
      const r = await fetch('https://pk-groq-proxy.daroorpavankalyan.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'system', content: system }, ...msgs],
          max_tokens: 180,
          temperature: 0.92,
          stream: false,
        })
      });
      if (!r.ok) throw new Error('API error');
      const d = await r.json();
      return (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content.trim()) || (name + ' has no words.');
    } catch(e) {
      return name + ' signal lost. Please try again.';
    }
  }
}

 /* ═══════════════════════════════════════════
   CONSTELLATION BUILDER — Firebase Shared Version
   Paste at the bottom of your script.js

   REQUIRES — add these BEFORE this file loads, in your HTML:
   <script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"></script>
   <script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-database-compat.js"></script>
═══════════════════════════════════════════ */

(function() {

  /* ── FIREBASE SETUP ── */
  const firebaseConfig = {
    apiKey: "AIzaSyCJOLDMD_laNbyGmCYvjfZPyJz0TuOtv9w",
    authDomain: "candy-constellation.firebaseapp.com",
    databaseURL: "https://candy-constellation-default-rtdb.firebaseio.com",
    projectId: "candy-constellation",
    storageBucket: "candy-constellation.firebasestorage.app",
    messagingSenderId: "1063058892921",
    appId: "1:1063058892921:web:c5ddf7230e0d3341f64ca8"
  };

  if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db       = firebase.database();
  const starsRef = db.ref('sharedConstellation/stars');
  const linesRef = db.ref('sharedConstellation/lines');
  const nameRef  = db.ref('sharedConstellation/name');

  const C = {
    stars: [], lines: [], mode: 'add', color: '#00d4ff',
    selStar: null, connecting: null, hovStar: null,
    bgStars: [], animT: 0, animFrame: null, bgFrame: null,
    W: 0, H: 0, bgW: 0, bgH: 0, mousePos: null
  };

  const mySession = { stars: [], lines: [] };

  let panel, canvas, ctx, bgCanvas, bgCtx, tooltip, hint, nameInput;
  let _click, _move, _leave, _resize, _nameInput;
  let firebaseListenersBound = false;

  window.openConstellation = function() {
    panel     = document.getElementById('constellationPanel');

    if (panel && panel.parentElement !== document.body) {
      document.body.appendChild(panel);
    }

    canvas    = document.getElementById('constCanvas');
    bgCanvas  = document.getElementById('constBgCanvas');
    tooltip   = document.getElementById('constTooltip');
    hint      = document.getElementById('constHint');
    nameInput = document.getElementById('constName');

    if (!panel || !canvas) { console.error('Constellation: panel or canvas not found'); return; }

    ctx   = canvas.getContext('2d');
    bgCtx = bgCanvas.getContext('2d');

    panel.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      constResize();
      constGenBgStars();
      constBindEvents();
      constBgLoop();
      constDrawLoop();
      constListenShared();
    }, 50);
  };

  window.closeConstellation = function() {
    if (panel) panel.classList.remove('active');
    document.body.style.overflow = '';
    constUnbindEvents();
    if (C.animFrame) { cancelAnimationFrame(C.animFrame); C.animFrame = null; }
    if (C.bgFrame)   { cancelAnimationFrame(C.bgFrame);   C.bgFrame = null; }

    if (window._ssReturnToBridge) window._ssReturnToBridge();
    if (window._ssSetWarp) window._ssSetWarp(false);
    if (window.ssStopSpeaking) window.ssStopSpeaking();

    if (window.ssCandySpeak) {
      setTimeout(() => {
        window.ssCandySpeak("Welcome back to the bridge, Captain. Where shall we head next?");
      }, 400);
    }
  };

  function constListenShared() {
    if (firebaseListenersBound) return;
    firebaseListenersBound = true;

    starsRef.on('value', snap => {
      const data = snap.val() || {};
      C.stars = Object.keys(data).map(key => ({ ...data[key], _key: key }));
    });

    linesRef.on('value', snap => {
      const data = snap.val() || {};
      C.lines = Object.keys(data).map(key => ({ ...data[key], _key: key }));
    });

    nameRef.on('value', snap => {
      const val = snap.val();
      if (nameInput && val !== null && document.activeElement !== nameInput) {
        nameInput.value = val;
      }
    });

    if (nameInput && !_nameInput) {
      _nameInput = () => nameRef.set(nameInput.value);
      nameInput.addEventListener('input', _nameInput);
    }
  }

  function constResize() {
    if (!canvas) return;
    const wrap = canvas.parentElement;
    C.W = canvas.width  = wrap.clientWidth  || window.innerWidth;
    C.H = canvas.height = wrap.clientHeight || (window.innerHeight - 180);
    C.bgW = bgCanvas.width  = window.innerWidth;
    C.bgH = bgCanvas.height = window.innerHeight;
  }

  const BG_COLS = ['rgba(255,255,255,','rgba(180,220,255,','rgba(200,190,255,','rgba(255,240,200,'];

  function constGenBgStars() {
    C.bgStars = [];
    for (let i = 0; i < 220; i++) {
      C.bgStars.push({
        x:  Math.random() * C.bgW,
        y:  Math.random() * C.bgH,
        r:  Math.random() * 1.1 + 0.2,
        a:  Math.random() * 0.7 + 0.2,
        da: (Math.random() * 0.007 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
        c:  BG_COLS[Math.floor(Math.random() * BG_COLS.length)]
      });
    }
  }

  function constBgLoop() {
    if (!bgCtx) return;
    C.bgStars.forEach(s => {
      s.a += s.da;
      if (s.a > 0.9 || s.a < 0.1) s.da *= -1;
    });
    bgCtx.clearRect(0, 0, C.bgW, C.bgH);
    C.bgStars.forEach(s => {
      bgCtx.beginPath();
      bgCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      bgCtx.fillStyle = s.c + s.a + ')';
      bgCtx.fill();
    });
    C.bgFrame = requestAnimationFrame(constBgLoop);
  }

  function constDrawLoop() {
    constDraw();
    C.animFrame = requestAnimationFrame(constDrawLoop);
  }

  function constDraw() {
    if (!ctx || !C.W) return;
    ctx.clearRect(0, 0, C.W, C.H);

    C.lines.forEach(l => {
      const a = C.stars.find(s => s._key === l.aKey);
      const b = C.stars.find(s => s._key === l.bKey);
      if (!a || !b) return;
      const lg = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      lg.addColorStop(0,   hexA(a.c, 0.5));
      lg.addColorStop(0.5, hexA(l.c || a.c, 0.88));
      lg.addColorStop(1,   hexA(b.c, 0.5));
      ctx.beginPath();
      ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = lg; ctx.lineWidth = 1.3;
      ctx.shadowColor = l.c || a.c; ctx.shadowBlur = 8;
      ctx.stroke(); ctx.shadowBlur = 0;
      const mx = (a.x+b.x)/2, my = (a.y+b.y)/2;
      ctx.beginPath(); ctx.arc(mx, my, 2, 0, Math.PI*2);
      ctx.fillStyle = hexA(l.c||a.c, 0.6); ctx.fill();
    });

    if (C.connecting !== null && C.mousePos) {
      const a = C.stars.find(s => s._key === C.connecting);
      if (a) {
        ctx.beginPath(); ctx.moveTo(a.x, a.y);
        ctx.lineTo(C.mousePos.x, C.mousePos.y);
        ctx.strokeStyle = hexA(C.color, 0.4);
        ctx.lineWidth = 1; ctx.setLineDash([5,5]); ctx.stroke(); ctx.setLineDash([]);
      }
    }

    C.stars.forEach((s, i) => {
      const isHov = s === C.hovStar, isSel = i === C.selStar;

      const aura = ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*6);
      aura.addColorStop(0, hexA(s.c, 0.18)); aura.addColorStop(1,'transparent');
      ctx.fillStyle = aura; ctx.beginPath();
      ctx.arc(s.x, s.y, s.r*6, 0, Math.PI*2); ctx.fill();

      if (isSel || isHov) {
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r+9, 0, Math.PI*2);
        ctx.strokeStyle = hexA(s.c, isHov ? 0.7 : 0.5);
        ctx.lineWidth = 1; ctx.setLineDash([3,3]); ctx.stroke(); ctx.setLineDash([]);
      }

      const rays = s.pts || 6;
      for (let r = 0; r < rays; r++) {
        const ang = (Math.PI*2/rays)*r;
        ctx.beginPath();
        ctx.moveTo(s.x + Math.cos(ang)*s.r, s.y + Math.sin(ang)*s.r);
        ctx.lineTo(s.x + Math.cos(ang)*(s.r+6), s.y + Math.sin(ang)*(s.r+6));
        ctx.strokeStyle = hexA(s.c, 0.45); ctx.lineWidth = 0.8; ctx.stroke();
      }

      const sg = ctx.createRadialGradient(s.x-s.r*.3,s.y-s.r*.3,0,s.x,s.y,s.r);
      sg.addColorStop(0,'#fff'); sg.addColorStop(0.35,hexA(s.c,1)); sg.addColorStop(1,hexA(s.c,0.6));
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = sg;
      ctx.shadowColor = s.c; ctx.shadowBlur = isSel ? 24 : 14;
      ctx.fill(); ctx.shadowBlur = 0;

      if (s.label) {
        ctx.font = '500 11px Inter,sans-serif';
        ctx.fillStyle = hexA(s.c, 0.9);
        ctx.textAlign = 'center';
        ctx.fillText(s.label, s.x, s.y - s.r - 9);
      }
    });

    const nm = nameInput ? nameInput.value : '';
    if (nm && C.stars.length) {
      ctx.font = '500 13px Inter,sans-serif';
      ctx.fillStyle = 'rgba(167,139,250,0.28)';
      ctx.textAlign = 'left';
      ctx.fillText(nm, 14, C.H - 14);
    }

    constUpdateHUD();
  }

  function constUpdateHUD() {
    const sn = document.getElementById('constStarNum');
    const ln = document.getElementById('constLineNum');
    const ms = document.getElementById('constModeStatus');
    const sc = document.getElementById('constStarCount');
    if (sn) sn.textContent = C.stars.length;
    if (ln) ln.textContent = C.lines.length;
    if (ms) ms.innerHTML  = 'MODE <strong>' + C.mode.toUpperCase() + '</strong>';
    if (sc) sc.textContent = C.stars.length + ' STARS';
    if (hint) hint.classList.toggle('hidden', C.stars.length > 0);
  }

  function constBindEvents() {
    _click  = e => constHandleClick(e);
    _move   = e => constHandleMove(e);
    _leave  = ()=> constHandleLeave();
    _resize = ()=> { constResize(); if(!C.bgStars.length) constGenBgStars(); };

    canvas.addEventListener('click',     _click);
    canvas.addEventListener('mousemove', _move);
    canvas.addEventListener('mouseleave',_leave);
    window.addEventListener('resize',    _resize);
  }

  function constUnbindEvents() {
    if (canvas) {
      canvas.removeEventListener('click',     _click);
      canvas.removeEventListener('mousemove', _move);
      canvas.removeEventListener('mouseleave',_leave);
    }
    window.removeEventListener('resize', _resize);
  }

  function constPos(e) {
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function constDist(a,b) { return Math.hypot(a.x-b.x, a.y-b.y); }
  function constHitStar(p) {
    return C.stars.findIndex(s => constDist(p,s) < Math.max(s.r+10,16));
  }

  function constHandleClick(e) {
    const p = constPos(e);
    const hit = constHitStar(p);

    if (C.mode === 'add') {
      if (hit >= 0) return;
      // ── Opens the custom inline panel instead of browser prompt ──
      openStarNamePanel(p);
    } else {
      if (hit < 0) { C.connecting = null; C.selStar = null; return; }
      const hitKey = C.stars[hit]._key;
      if (C.connecting === null) {
        C.connecting = hitKey; C.selStar = hit;
      } else {
        if (C.connecting !== hitKey) {
          const exists = C.lines.find(l =>
            (l.aKey===C.connecting&&l.bKey===hitKey)||(l.aKey===hitKey&&l.bKey===C.connecting));
          if (!exists) {
            const newLineRef = linesRef.push({ aKey: C.connecting, bKey: hitKey, c: C.color });
            mySession.lines.push(newLineRef.key);
          }
        }
        C.connecting = null; C.selStar = null;
      }
    }
  }

  function constHandleMove(e) {
    const p = constPos(e);
    C.mousePos = p;
    const hit = constHitStar(p);
    C.hovStar = hit >= 0 ? C.stars[hit] : null;
    canvas.style.cursor = C.hovStar ? (C.mode==='connect'?'pointer':'grab') : 'crosshair';
    if (tooltip) {
      if (C.hovStar) {
        tooltip.textContent = C.hovStar.label || ('Star #'+(C.stars.indexOf(C.hovStar)+1));
        tooltip.style.opacity = '1';
        tooltip.style.left = (p.x+18)+'px';
        tooltip.style.top  = (p.y-10)+'px';
      } else { tooltip.style.opacity = '0'; }
    }
  }

  function constHandleLeave() {
    C.hovStar = null; C.mousePos = null;
    if (tooltip) tooltip.style.opacity = '0';
  }

  window.constSetColor = function(el) {
    document.querySelectorAll('.const-color-dot').forEach(d => d.classList.remove('sel'));
    el.classList.add('sel');
    C.color = el.dataset.c;
  };

  window.constSetMode = function(mode) {
    C.mode = mode;
    C.connecting = null; C.selStar = null;
    document.getElementById('constModeAdd')?.classList.toggle('active', mode==='add');
    document.getElementById('constModeConnect')?.classList.toggle('active', mode==='connect');
  };

  window.constUndo = function() {
    if (C.mode === 'connect') {
      const key = mySession.lines.pop();
      if (key) linesRef.child(key).remove();
    } else if (mySession.stars.length) {
      const key = mySession.stars.pop();
      starsRef.child(key).remove();
      C.lines
        .filter(l => l.aKey === key || l.bKey === key)
        .forEach(l => linesRef.child(l._key).remove());
    }
    C.connecting = null; C.selStar = null;
  };

  window.constClear = function() {
    if (!mySession.stars.length && !mySession.lines.length) {
      alert("You haven't added any stars yet this session.");
      return;
    }
    if (!confirm('Remove only the stars and lines YOU added? (Other visitors\' stars will stay.)')) return;
    mySession.stars.forEach(key => starsRef.child(key).remove());
    mySession.lines.forEach(key => linesRef.child(key).remove());
    mySession.stars = [];
    mySession.lines = [];
  };

 window.constDownload = function() {
    const SCALE = 2;
    const out = document.createElement('canvas');
    out.width  = C.W * SCALE;
    out.height = C.H * SCALE;
    const oc = out.getContext('2d');
    oc.scale(SCALE, SCALE);

    /* ── Deep space background ── */
    const bg = oc.createLinearGradient(0, 0, C.W, C.H);
    bg.addColorStop(0,    '#020818');
    bg.addColorStop(0.3,  '#050d2e');
    bg.addColorStop(0.6,  '#080f38');
    bg.addColorStop(1,    '#020610');
    oc.fillStyle = bg;
    oc.fillRect(0, 0, C.W, C.H);

    /* ── Large soft nebula clouds ── */
    const nebulas = [
      { x: C.W*0.20, y: C.H*0.25, r: C.W*0.55, color: 'rgba(0,100,255,0.12)'    },
      { x: C.W*0.75, y: C.H*0.60, r: C.W*0.50, color: 'rgba(120,40,220,0.12)'   },
      { x: C.W*0.50, y: C.H*0.10, r: C.W*0.40, color: 'rgba(0,180,255,0.08)'    },
      { x: C.W*0.85, y: C.H*0.20, r: C.W*0.35, color: 'rgba(167,139,250,0.10)'  },
      { x: C.W*0.15, y: C.H*0.80, r: C.W*0.40, color: 'rgba(60,0,180,0.10)'     },
      { x: C.W*0.60, y: C.H*0.85, r: C.W*0.45, color: 'rgba(0,212,255,0.07)'    },
    ];
    nebulas.forEach(n => {
      const g = oc.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      g.addColorStop(0, n.color);
      g.addColorStop(0.5, n.color.replace(/[\d.]+\)$/, '0.04)'));
      g.addColorStop(1, 'transparent');
      oc.fillStyle = g;
      oc.fillRect(0, 0, C.W, C.H);
    });

    /* ── Milky way band ── */
    const mw = oc.createLinearGradient(0, C.H*0.2, C.W, C.H*0.8);
    mw.addColorStop(0,    'transparent');
    mw.addColorStop(0.3,  'rgba(180,160,255,0.04)');
    mw.addColorStop(0.5,  'rgba(200,180,255,0.07)');
    mw.addColorStop(0.7,  'rgba(180,160,255,0.04)');
    mw.addColorStop(1,    'transparent');
    oc.fillStyle = mw;
    oc.fillRect(0, 0, C.W, C.H);

    /* ── Tiny background stars ── */
    const STAR_COLORS = [
      '255,255,255', '180,220,255', '200,190,255',
      '255,240,200', '150,200,255', '255,220,180'
    ];
    const starCount = Math.floor((C.W * C.H) / 1200);
    for (let i = 0; i < starCount; i++) {
      const x   = Math.random() * C.W;
      const y   = Math.random() * C.H;
      const r   = Math.random() * 1.0 + 0.15;
      const a   = Math.random() * 0.55 + 0.15;
      const col = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      oc.beginPath();
      oc.arc(x, y, r, 0, Math.PI * 2);
      oc.fillStyle = `rgba(${col},${a})`;
      oc.fill();
    }

    /* ── Bright feature stars with 4-point sparkle ── */
    const brightCount = Math.floor(starCount / 18);
    for (let i = 0; i < brightCount; i++) {
      const x  = Math.random() * C.W;
      const y  = Math.random() * C.H;
      const r  = Math.random() * 1.2 + 0.8;
      const a  = Math.random() * 0.4 + 0.5;
      const col = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];

      const glow = oc.createRadialGradient(x, y, 0, x, y, r * 5);
      glow.addColorStop(0, `rgba(${col},${a * 0.6})`);
      glow.addColorStop(1, 'transparent');
      oc.fillStyle = glow;
      oc.beginPath(); oc.arc(x, y, r * 5, 0, Math.PI * 2); oc.fill();

      oc.beginPath(); oc.arc(x, y, r, 0, Math.PI * 2);
      oc.fillStyle = `rgba(${col},${a})`; oc.fill();

      oc.strokeStyle = `rgba(${col},${a * 0.5})`;
      oc.lineWidth = 0.6;
      const len = r * 5;
      oc.beginPath();
      oc.moveTo(x - len, y); oc.lineTo(x + len, y);
      oc.moveTo(x, y - len); oc.lineTo(x, y + len);
      oc.stroke();

      oc.strokeStyle = `rgba(${col},${a * 0.25})`;
      const dlen = r * 3;
      oc.beginPath();
      oc.moveTo(x - dlen, y - dlen); oc.lineTo(x + dlen, y + dlen);
      oc.moveTo(x + dlen, y - dlen); oc.lineTo(x - dlen, y + dlen);
      oc.stroke();
    }

    /* ── Draw the actual constellation on top ── */
    oc.drawImage(canvas, 0, 0, C.W, C.H);

    /* ── Constellation name at bottom center ── */
    const nm = (nameInput?.value || '').trim();
    if (nm) {
      /* pure ellipse glow — no fillRect darkness at all */
      const textGlow = oc.createRadialGradient(C.W/2, C.H - 40, 0, C.W/2, C.H - 40, 160);
      textGlow.addColorStop(0, 'rgba(80,40,220,0.30)');
      textGlow.addColorStop(0.5, 'rgba(40,10,140,0.12)');
      textGlow.addColorStop(1, 'transparent');
      oc.fillStyle = textGlow;
      oc.beginPath();
      oc.ellipse(C.W/2, C.H - 40, 200, 70, 0, 0, Math.PI * 2);
      oc.fill();

      /* thin divider line */
      const divGrad = oc.createLinearGradient(C.W*0.25, 0, C.W*0.75, 0);
      divGrad.addColorStop(0, 'transparent');
      divGrad.addColorStop(0.3, 'rgba(0,212,255,0.50)');
      divGrad.addColorStop(0.7, 'rgba(167,139,250,0.50)');
      divGrad.addColorStop(1, 'transparent');
      oc.strokeStyle = divGrad;
      oc.lineWidth = 0.8;
      oc.beginPath();
      oc.moveTo(C.W*0.25, C.H - 68);
      oc.lineTo(C.W*0.75, C.H - 68);
      oc.stroke();

      /* label */
      oc.textAlign = 'center';
      oc.font = '300 10px Inter, sans-serif';
      oc.fillStyle = 'rgba(0,212,255,0.75)';
      oc.letterSpacing = '0.25em';
      oc.fillText('C O N S T E L L A T I O N', C.W/2, C.H - 50);
      oc.letterSpacing = '0';

      /* name — 3-pass glow for maximum brightness */
      oc.textAlign = 'center';
      oc.font = '700 30px Inter, sans-serif';
      oc.letterSpacing = '0.06em';

      /* pass 1: wide outer glow */
      oc.shadowColor = 'rgba(0,212,255,0.9)';
      oc.shadowBlur = 40;
      oc.fillStyle = 'rgba(255,255,255,0.5)';
      oc.fillText(nm, C.W/2, C.H - 22);

      /* pass 2: tight bright glow */
      oc.shadowBlur = 16;
      oc.fillStyle = 'rgba(180,240,255,0.8)';
      oc.fillText(nm, C.W/2, C.H - 22);

      /* pass 3: solid white core */
      oc.shadowBlur = 0;
      oc.fillStyle = 'rgba(255,255,255,1.0)';
      oc.fillText(nm, C.W/2, C.H - 22);
      oc.letterSpacing = '0';
    }

    /* ── Watermark (subtle, bottom-right) ── */
    oc.textAlign = 'right';
    oc.font = '400 9px Inter, sans-serif';
    oc.fillStyle = 'rgba(167,139,250,0.20)';
    oc.letterSpacing = '0.1em';
    oc.fillText('✦ CANDY AI', C.W - 20, C.H - 14);
    oc.letterSpacing = '0';


    /* ── Download ── */
    const fileName = (nm || 'my-constellation').replace(/\s+/g,'-').toLowerCase();
    const a = document.createElement('a');
    a.download = fileName + '.png';
    a.href = out.toDataURL('image/png');
    a.click();
};
  
  /* ── STAR NAME PANEL ── replaces browser prompt() ── */
  function openStarNamePanel(p) {
    const overlay  = document.getElementById('starNameOverlay');
    const input    = document.getElementById('starNameInput');
    const confirmB = document.getElementById('starNameConfirm');
    const skipB    = document.getElementById('starNameSkip');
    const chips    = document.querySelectorAll('.star-name-chip');

    input.value = '';
    overlay.classList.add('active');
    setTimeout(() => input.focus(), 350);

    function placeStar(label) {
      overlay.classList.remove('active');
      confirmB.removeEventListener('click', onConfirm);
      skipB.removeEventListener('click', onSkip);
      document.removeEventListener('keydown', onKey);
      chips.forEach(c => c.removeEventListener('click', onChip));

      const newRef = starsRef.push({
        x: p.x, y: p.y,
        r: Math.random() * 2.8 + 2.2,
        c: C.color,
        label: label.trim(),
        pts: Math.floor(Math.random() * 3) + 4
      });
      mySession.stars.push(newRef.key);
    }

    function onConfirm() { placeStar(input.value); }
    function onSkip()    { placeStar(''); }
    function onKey(e) {
      if (e.key === 'Enter')  { e.preventDefault(); placeStar(input.value); }
      if (e.key === 'Escape') { e.preventDefault(); placeStar(''); }
    }
    function onChip(e) { input.value = e.currentTarget.dataset.name; input.focus(); }

    confirmB.addEventListener('click', onConfirm);
    skipB.addEventListener('click', onSkip);
    document.addEventListener('keydown', onKey);
    chips.forEach(c => c.addEventListener('click', onChip));
  }

  function hexA(hex, a) {
    if (!hex||hex.length<7) return `rgba(0,212,255,${a})`;
    const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a})`;
  }

})();




/* ── Candy Gift Toast ── */
(function() {
  setTimeout(() => {
    const toast = document.getElementById('candyGift');
    if (toast) toast.classList.add('show');
  }, 10000);
})();

function closeCandyGift() {
  const toast = document.getElementById('candyGift');
  if (toast) {
    toast.style.transform = 'translateX(120%)';
    toast.style.opacity = '0';
  }
}

function generateGiftConstellation() {
  const name1 = document.getElementById('giftName')?.value.trim();
  const name2 = document.getElementById('giftLoved')?.value.trim();
  if (!name1 || !name2) {
    document.getElementById('giftName').focus();
    return;
  }

  closeCandyGift();

  const W = 1400, H = 700, SCALE = 2;
  const out = document.createElement('canvas');
  out.width = W * SCALE; out.height = H * SCALE;
  const oc = out.getContext('2d');
  oc.scale(SCALE, SCALE);

  /* ── Background ── */
  const bg = oc.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0,   '#020818');
  bg.addColorStop(0.3, '#050d2e');
  bg.addColorStop(0.6, '#080f38');
  bg.addColorStop(1,   '#020610');
  oc.fillStyle = bg;
  oc.fillRect(0, 0, W, H);

  /* ── Nebula clouds ── */
  [
    { x:W*0.18, y:H*0.28, r:W*0.32, c:'rgba(0,100,255,0.11)'   },
    { x:W*0.78, y:H*0.55, r:W*0.30, c:'rgba(80,20,200,0.10)'   },
    { x:W*0.50, y:H*0.12, r:W*0.28, c:'rgba(0,160,255,0.07)'   },
    { x:W*0.85, y:H*0.20, r:W*0.22, c:'rgba(167,139,250,0.08)' },
    { x:W*0.12, y:H*0.78, r:W*0.25, c:'rgba(0,60,180,0.08)'    },
    { x:W*0.55, y:H*0.82, r:W*0.30, c:'rgba(0,150,255,0.06)'   },
  ].forEach(n => {
    const g = oc.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r);
    g.addColorStop(0, n.c);
    g.addColorStop(0.5, n.c.replace(/[\d.]+\)$/, '0.03)'));
    g.addColorStop(1, 'transparent');
    oc.fillStyle = g;
    oc.fillRect(0, 0, W, H);
  });

  /* ── Milky way band ── */
  const mw = oc.createLinearGradient(0, H*0.2, W, H*0.8);
  mw.addColorStop(0,   'transparent');
  mw.addColorStop(0.3, 'rgba(180,160,255,0.03)');
  mw.addColorStop(0.5, 'rgba(200,180,255,0.06)');
  mw.addColorStop(0.7, 'rgba(180,160,255,0.03)');
  mw.addColorStop(1,   'transparent');
  oc.fillStyle = mw;
  oc.fillRect(0, 0, W, H);

  /* ── Background stars ── */
  const COLS = [
    '255,255,255','180,220,255','200,190,255',
    '255,240,200','150,200,255','255,220,180'
  ];
  for (let i = 0; i < 520; i++) {
    const x=Math.random()*W, y=Math.random()*H;
    const r=Math.random()*0.9+0.1, a=Math.random()*0.5+0.12;
    const c=COLS[Math.floor(Math.random()*COLS.length)];
    oc.beginPath(); oc.arc(x,y,r,0,Math.PI*2);
    oc.fillStyle=`rgba(${c},${a})`; oc.fill();
  }

  /* ── Bright sparkle stars ── */
  for (let i = 0; i < 28; i++) {
    const x=Math.random()*W, y=Math.random()*H;
    const r=Math.random()*1.1+0.7, a=Math.random()*0.4+0.5;
    const c=COLS[Math.floor(Math.random()*COLS.length)];
    const glow=oc.createRadialGradient(x,y,0,x,y,r*5);
    glow.addColorStop(0,`rgba(${c},${a*0.6})`);
    glow.addColorStop(1,'transparent');
    oc.fillStyle=glow;
    oc.beginPath(); oc.arc(x,y,r*5,0,Math.PI*2); oc.fill();
    oc.beginPath(); oc.arc(x,y,r,0,Math.PI*2);
    oc.fillStyle=`rgba(${c},${a})`; oc.fill();
    oc.strokeStyle=`rgba(${c},${a*0.45})`; oc.lineWidth=0.5;
    const len=r*4.5;
    oc.beginPath();
    oc.moveTo(x-len,y); oc.lineTo(x+len,y);
    oc.moveTo(x,y-len); oc.lineTo(x,y+len);
    oc.stroke();
  }

  /* ── Seeded random from name ── */
  const seed1 = [...name1].reduce((a,c)=>a+c.charCodeAt(0),0);
  const seed2 = [...name2].reduce((a,c)=>a+c.charCodeAt(0),0);
  const rand = (s,i) => Math.abs(Math.sin(s*9301 + i*49297 + 233)) % 1;

  /* ── Reduce star count for cleaner look ── */
  const count1 = 6 + (seed1 % 4); // 6–9 stars
  const count2 = 6 + (seed2 % 4); // 6–9 stars

  const cluster1 = [];
  const cluster2 = [];
  const bridge   = [];

  /* cluster 1 — left zone */
  for (let i = 0; i < count1; i++) {
    cluster1.push({
      x: W*0.06 + rand(seed1, i*2)   * W*0.26,
      y: H*0.12 + rand(seed1, i*2+1) * H*0.74,
      main: i === 0,
      name: i === 0 ? name1 : null,
      col: '0,212,255'
    });
  }

  /* cluster 2 — right zone */
  for (let i = 0; i < count2; i++) {
    cluster2.push({
      x: W*0.68 + rand(seed2, i*2)   * W*0.26,
      y: H*0.12 + rand(seed2, i*2+1) * H*0.74,
      main: i === 0,
      name: i === 0 ? name2 : null,
      col: '167,139,250'
    });
  }

  /* bridge — 3 stars in the middle */
  for (let i = 0; i < 3; i++) {
    bridge.push({
      x: W*0.38 + rand(seed1+seed2, i*3)   * W*0.24,
      y: H*0.25 + rand(seed1+seed2, i*3+1) * H*0.50,
      main: false, name: null, col: '100,180,255'
    });
  }

  /* ── Draw constellation lines ── */
  const drawLine = (x1,y1,x2,y2,col1,col2) => {
    const lg = oc.createLinearGradient(x1,y1,x2,y2);
    lg.addColorStop(0, `rgba(${col1},0.55)`);
    lg.addColorStop(1, `rgba(${col2},0.55)`);
    oc.strokeStyle = lg;
    oc.lineWidth = 0.8;
    oc.shadowColor = `rgba(${col1},0.3)`;
    oc.shadowBlur = 4;
    oc.beginPath(); oc.moveTo(x1,y1); oc.lineTo(x2,y2); oc.stroke();
    oc.shadowBlur = 0;
  };

  /* cluster1 — simple chain only, no cross links */
  for (let i = 0; i < cluster1.length - 1; i++) {
    drawLine(cluster1[i].x, cluster1[i].y,
             cluster1[i+1].x, cluster1[i+1].y,
             '0,212,255', '0,180,255');
  }

  /* cluster2 — simple chain only, no cross links */
  for (let i = 0; i < cluster2.length - 1; i++) {
    drawLine(cluster2[i].x, cluster2[i].y,
             cluster2[i+1].x, cluster2[i+1].y,
             '167,139,250', '140,100,240');
  }

  /* bridge — simple chain */
  for (let i = 0; i < bridge.length - 1; i++) {
    drawLine(bridge[i].x, bridge[i].y,
             bridge[i+1].x, bridge[i+1].y,
             '100,180,255', '140,120,255');
  }

  /* cluster1 → bridge — single connection */
  drawLine(cluster1[cluster1.length-1].x, cluster1[cluster1.length-1].y,
           bridge[0].x, bridge[0].y,
           '0,212,255', '100,180,255');

  /* bridge → cluster2 — single connection */
  drawLine(bridge[bridge.length-1].x, bridge[bridge.length-1].y,
           cluster2[0].x, cluster2[0].y,
           '100,180,255', '167,139,250');

  /* ── Draw all stars ── */
  const drawStar = (s) => {
    const r   = s.main ? 5.5 : 2.8;
    const col = s.col;

    const glow = oc.createRadialGradient(s.x,s.y,0,s.x,s.y,r*6);
    glow.addColorStop(0, `rgba(${col},0.7)`);
    glow.addColorStop(0.4, `rgba(${col},0.25)`);
    glow.addColorStop(1, 'transparent');
    oc.fillStyle = glow;
    oc.beginPath(); oc.arc(s.x,s.y,r*6,0,Math.PI*2); oc.fill();

    oc.beginPath(); oc.arc(s.x,s.y,r,0,Math.PI*2);
    oc.fillStyle = `rgba(${col},1)`; oc.fill();

    /* 4-point sparkle */
    oc.strokeStyle = `rgba(${col},0.55)`;
    oc.lineWidth = s.main ? 1.0 : 0.7;
    const len = r * (s.main ? 5 : 4);
    oc.beginPath();
    oc.moveTo(s.x-len,s.y); oc.lineTo(s.x+len,s.y);
    oc.moveTo(s.x,s.y-len); oc.lineTo(s.x,s.y+len);
    oc.stroke();

    /* diagonal sparkle */
    oc.strokeStyle = `rgba(${col},0.22)`;
    const dlen = len * 0.6;
    oc.beginPath();
    oc.moveTo(s.x-dlen,s.y-dlen); oc.lineTo(s.x+dlen,s.y+dlen);
    oc.moveTo(s.x+dlen,s.y-dlen); oc.lineTo(s.x-dlen,s.y+dlen);
    oc.stroke();

    /* name label */
    if (s.name) {
      oc.textAlign = 'center';
      oc.font = '600 15px Inter, sans-serif';
      oc.shadowColor = `rgba(${col},1)`;
      oc.shadowBlur = 16;
      oc.fillStyle = 'rgba(255,255,255,0.97)';
      oc.fillText(s.name, s.x, s.y - r - 12);
      oc.shadowBlur = 0;
    }
  };

  [...cluster1, ...bridge, ...cluster2].forEach(drawStar);

  /* ── Gift message at bottom ── */
  const giftGlow = oc.createRadialGradient(W/2,H-45,0,W/2,H-45,180);
  giftGlow.addColorStop(0, 'rgba(80,40,220,0.25)');
  giftGlow.addColorStop(1, 'transparent');
  oc.fillStyle = giftGlow;
  oc.beginPath(); oc.ellipse(W/2,H-45,240,65,0,0,Math.PI*2); oc.fill();

  const divG = oc.createLinearGradient(W*0.25,0,W*0.75,0);
  divG.addColorStop(0, 'transparent');
  divG.addColorStop(0.3, 'rgba(0,212,255,0.50)');
  divG.addColorStop(0.7, 'rgba(167,139,250,0.50)');
  divG.addColorStop(1, 'transparent');
  oc.strokeStyle = divG; oc.lineWidth = 0.8;
  oc.beginPath(); oc.moveTo(W*0.25,H-75); oc.lineTo(W*0.75,H-75); oc.stroke();

  oc.textAlign = 'center';
  oc.font = '300 10px Inter, sans-serif';
  oc.fillStyle = 'rgba(0,212,255,0.75)';
  oc.letterSpacing = '0.22em';
  oc.fillText('✦  A GIFT FROM CANDY  ✦', W/2, H-55);
  oc.letterSpacing = '0';

  /* name — 3 pass glow */
  oc.font = '700 28px Inter, sans-serif';
  oc.letterSpacing = '0.06em';
  oc.shadowColor = 'rgba(0,212,255,0.9)';
  oc.shadowBlur = 40;
  oc.fillStyle = 'rgba(255,255,255,0.5)';
  oc.fillText(`${name1}  ✦  ${name2}`, W/2, H-26);
  oc.shadowBlur = 16;
  oc.fillStyle = 'rgba(180,240,255,0.8)';
  oc.fillText(`${name1}  ✦  ${name2}`, W/2, H-26);
  oc.shadowBlur = 0;
  oc.fillStyle = 'rgba(255,255,255,1.0)';
  oc.fillText(`${name1}  ✦  ${name2}`, W/2, H-26);
  oc.letterSpacing = '0';

  /* watermark */
  oc.textAlign = 'right';
  oc.font = '400 9px Inter, sans-serif';
  oc.fillStyle = 'rgba(167,139,250,0.20)';
  oc.fillText('✦ CANDY AI', W-22, H-14);

  /* ── Download ── */
  const fname = `${name1}-${name2}-constellation`.toLowerCase().replace(/\s+/g,'-');
  const a = document.createElement('a');
  a.download = fname + '.png';
  a.href = out.toDataURL('image/png');
  a.click();

  /* ── Share message toast ── */
  setTimeout(() => {
    const msg = document.createElement('div');
    msg.id = 'candyShareMsg';
    msg.innerHTML = `
      <div class="csm-glow"></div>
      <div class="csm-inner">
        <span class="csm-icon">✦</span>
        <p class="csm-text">You can also design your own constellation manually with your favourite persons by visiting <strong>Candy Spaceship</strong>!</p>
        <button class="csm-close" onclick="this.parentElement.parentElement.remove()">✕</button>
      </div>
    `;
    document.body.appendChild(msg);
    setTimeout(() => msg.classList.add('show'), 100);
    setTimeout(() => {
      msg.style.opacity = '0';
      msg.style.transform = 'translateY(20px)';
      setTimeout(() => msg.remove(), 500);
    }, 10000);
  }, 1000);

}



/* ═══════════════════════════════════════════
   DREAM DESTINATION MAP — REAL WORLD (Leaflet.js) v3
   Uses CartoDB Voyager tiles (clean, modern).
   + Candy Voice: AI travel companion powered by Groq + Web Speech API
═══════════════════════════════════════════ */
(function DreamMap() {
  'use strict';

  const DESTINATIONS = [
    { name: 'Ooty',            lat: 11.4102, lng: 76.6950,  type: 'settle',    note: 'A hill station escape — exactly the kind of quiet, cool, green place Pavan dreams of eventually settling down in.' },
    { name: 'Bengaluru',       lat: 12.9716, lng: 77.5946,  type: 'settle',    note: 'The Silicon Valley of India — cool weather, tech jobs, and a green city vibe. Pavan sees Bengaluru as a real place to settle and build his AI career.' },
    { name: 'Coorg',           lat: 12.3375, lng: 75.8069,  type: 'settle',    note: 'The Scotland of India — misty coffee estates and deep quiet. Pavan dreams of settling somewhere exactly like this, away from city noise.' },
    { name: 'Munnar',          lat: 10.0889, lng: 77.0595,  type: 'settle',    note: 'Rolling tea gardens and cool misty mornings in Kerala — the kind of peaceful, green place Pavan imagines settling down in one day.' },
    { name: 'Kodaikanal',      lat: 10.2381, lng: 77.4892,  type: 'settle',    note: 'The Princess of Hill Stations — serene lakes and pine forests. Pavan dreams of a quiet life in a place just like this.' },
    { name: 'Wayanad',         lat: 11.6854, lng: 76.1320,  type: 'nature',    note: 'Deep forests and tribal heritage in Kerala — a green escape with waterfalls, wildlife, and misty valleys.' },
    { name: 'Chikmagalur',     lat: 13.3161, lng: 75.7720,  type: 'settle',    note: 'Birthplace of Indian coffee — quiet trails, mist, and slow mornings. Exactly the peaceful life Pavan wants to settle into someday.' },
    { name: 'Nainital',        lat: 29.3803, lng: 79.4636,  type: 'nature',    note: 'A jewel in the Kumaon hills — the lake, cool air, and colonial charm make it a classic hill station on Pavan\'s list.' },
    { name: 'Shimla',          lat: 31.1048, lng: 77.1734,  type: 'nature',    note: 'The Queen of Hills — snow, colonial heritage, and crisp mountain air. A dream getaway for Pavan.' },
    { name: 'Manali',          lat: 32.2432, lng: 77.1892,  type: 'nature',    note: 'Snow-capped peaks and adventure in the Himalayas — the kind of breathtaking place Pavan wants to experience at least once.' },
    { name: 'Mysore',          lat: 12.2958, lng: 76.6394,  type: 'culture',   note: 'Rich in Karnataka heritage and royal history — fits Pavan\'s love for Indian traditions and culture.' },
    { name: 'Goa',             lat: 15.2993, lng: 74.1240,  type: 'nature',    note: 'Coastal calm rather than party scene — Pavan prefers nature and quiet over nightlife, even in places known for it.' },
    { name: 'Kochi',           lat: 9.9312,  lng: 76.2673,  type: 'nature',    note: 'Backwaters and coastal charm in Kerala — peaceful, green, and far from crowds.' },
    { name: 'Rameswaram',      lat: 9.2876,  lng: 79.3129,  type: 'spiritual', note: 'One of the holiest temple towns in India — on Pavan\'s must-visit list at least once in his life.' },
    { name: 'Mathura',         lat: 27.4924, lng: 77.6737,  type: 'spiritual', note: 'Birthplace of Lord Krishna — deeply meaningful to Pavan given his devotion to Krishna.' },
    { name: 'Vrindavan',       lat: 27.5794, lng: 77.6964,  type: 'spiritual', note: 'Where Krishna spent his childhood — a place Pavan feels pulled toward spiritually.' },
    { name: 'Dwarka',          lat: 22.2373, lng: 68.9679,  type: 'spiritual', note: 'Krishna\'s legendary kingdom by the sea — another essential stop on Pavan\'s spiritual journey.' },
    { name: 'Ayodhya',         lat: 26.7922, lng: 82.1998,  type: 'spiritual', note: 'Sacred to the Ramayana — ties into Pavan\'s deep love for Indian mythology.' },
    { name: 'Araku Valley',    lat: 18.3273, lng: 82.8758,  type: 'nature',    note: 'Misty hills and coffee plantations in Andhra Pradesh — a nature escape close to home.' },
    { name: 'Visakhapatnam',   lat: 17.6868, lng: 83.2185,  type: 'nature',    note: 'The City of Destiny — beautiful beaches, Araku hills nearby, and a vibrant coastal energy that Pavan loves.' },
    { name: 'Kurnool',         lat: 15.8281, lng: 78.0373,  type: 'culture',   note: 'Home — and endlessly rich in the traditions, festivals, and history Pavan loves exploring.' },
    { name: 'Japan',           lat: 35.6762, lng: 139.6503, type: 'travel',    note: 'A dream travel destination — a striking mix of tradition and futuristic technology.' },
    { name: 'Europe',          lat: 48.8566, lng:  2.3522,  type: 'travel',    note: 'On Pavan\'s world tour wishlist — history, architecture, and culture in one place.' },
    { name: 'USA',             lat: 38.9072, lng: -77.0369, type: 'travel',    note: 'Part of Pavan\'s long-term travel and career dreams — open to settling abroad too.' },
    { name: 'Canada',          lat: 45.4215, lng: -75.6972, type: 'travel',    note: 'Cool climates and nature — fits Pavan\'s love for cooler weather over heat.' },
  ];

  const TYPE_META = {
    spiritual: { color: '#a78bfa', label: 'Spiritual',         emoji: '🕌' },
    nature:    { color: '#34d399', label: 'Nature & Hills',    emoji: '🌿' },
    culture:   { color: '#fbbf24', label: 'Culture & Home',    emoji: '🏛️' },
    travel:    { color: '#06b6d4', label: 'World Tour Dream',  emoji: '✈️' },
    settle:    { color: '#fb923c', label: 'Dream Settle Spot', emoji: '🏡' },
  };

  let panel = null, leafletMap = null, leafletLoaded = false;
  let selectedDest = null, candySpeaking = false;
  let currentUtterance = null;

  /* ── Web Speech API helpers ── */
  const synth = window.speechSynthesis;

  function getVoice() {
    const voices = synth.getVoices();
    // Prefer a female English voice for Candy
    return (
      voices.find(v => v.name.includes('Samantha')) ||
      voices.find(v => v.name.includes('Karen'))    ||
      voices.find(v => v.name.includes('Moira'))    ||
      voices.find(v => /female/i.test(v.name) && v.lang.startsWith('en')) ||
      voices.find(v => v.lang.startsWith('en-IN'))  ||
      voices.find(v => v.lang.startsWith('en'))     ||
      voices[0] || null
    );
  }

  function speakText(text, onEnd) {
    if (!synth) { onEnd && onEnd(); return; }
    synth.cancel(); // stop any previous speech
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice  = getVoice();
    utter.rate   = 0.95;
    utter.pitch  = 1.1;
    utter.volume = 1;
    utter.onend  = () => { currentUtterance = null; onEnd && onEnd(); };
    utter.onerror = () => { currentUtterance = null; onEnd && onEnd(); };
    currentUtterance = utter;
    synth.speak(utter);
  }

  function stopSpeech() {
    if (synth) synth.cancel();
    currentUtterance = null;
  }

  /* ── Load Leaflet CSS + JS lazily ── */
  function loadLeaflet(cb) {
    if (window.L && leafletLoaded) { cb(); return; }
    const existingScript = document.getElementById('leafletJS');
    if (existingScript) {
      existingScript.addEventListener('load', () => { leafletLoaded = true; cb(); });
      return;
    }
    if (!document.getElementById('leafletCSS')) {
      const link = document.createElement('link');
      link.id = 'leafletCSS';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
    const script = document.createElement('script');
    script.id = 'leafletJS';
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => { leafletLoaded = true; cb(); };
    script.onerror = () => {
      const s2 = document.createElement('script');
      s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
      s2.onload = () => { leafletLoaded = true; cb(); };
      document.head.appendChild(s2);
    };
    document.head.appendChild(script);
  }

  /* ── Inject styles ── */
  function injectStyles() {
    if (document.getElementById('dreamMapStyles')) return;
    const style = document.createElement('style');
    style.id = 'dreamMapStyles';
    style.textContent = `
      #dreamMapPanel {
        position: fixed; inset: 0; z-index: 99999;
        background: #020818;
        display: none; flex-direction: column;
        font-family: 'Inter', sans-serif;
      }
      #dreamMapPanel.active { display: flex; }

      .dm-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 14px 20px; flex-shrink: 0;
        border-bottom: 1px solid rgba(167,139,250,0.2);
        background: rgba(2,8,24,0.95);
      }
      .dm-title {
        display: flex; align-items: center; gap: 8px;
        color: #e9d5ff; font-weight: 700; font-size: 0.95rem;
      }
      .dm-close {
        width: 32px; height: 32px; border-radius: 8px;
        background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
        color: #94a3b8; cursor: pointer; font-size: 0.9rem;
        display: flex; align-items: center; justify-content: center;
        transition: all 0.2s;
      }
      .dm-close:hover { background: rgba(244,63,94,0.15); color: #f43f5e; border-color: rgba(244,63,94,0.4); }

      .dm-legend {
        display: flex; gap: 14px; flex-wrap: wrap; flex-shrink: 0;
        padding: 8px 20px; font-size: 0.67rem; color: #94a3b8;
        background: rgba(2,8,24,0.9);
        border-bottom: 1px solid rgba(167,139,250,0.1);
      }
      .dm-legend-item { display: flex; align-items: center; gap: 5px; }
      .dm-legend-dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; flex-shrink: 0; }

      #dmMapContainer {
        flex: 1; position: relative; min-height: 0;
        margin: 10px 16px 0;
        border: 1px solid rgba(167,139,250,0.2);
        border-radius: 16px; overflow: hidden;
        box-shadow: 0 8px 32px rgba(0,0,0,0.25);
      }
      #dmMapEl { width: 100%; height: 100%; }

      .dm-marker { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
      .dm-marker-dot {
        width: 16px; height: 16px; border-radius: 50%;
        border: 3px solid #fff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        transition: transform 0.18s;
      }
      .dm-marker-dot:hover { transform: scale(1.35); }

      .dm-marker-settle { position: relative; }
      .dm-settle-ring {
        position: absolute; top: -6px; left: 50%; transform: translateX(-50%);
        width: 40px; height: 40px; border-radius: 50%;
        border: 2px solid #fb923c;
        animation: settleRing 1.8s ease-out infinite;
        pointer-events: none;
      }
      @keyframes settleRing {
        0%   { transform: translateX(-50%) scale(0.6); opacity: 1; }
        100% { transform: translateX(-50%) scale(1.8); opacity: 0; }
      }
      .dm-settle-dot {
        width: 32px; height: 32px; border-radius: 50%;
        border: 3px solid #fff;
        box-shadow: 0 4px 16px rgba(251,146,60,0.6), 0 2px 8px rgba(0,0,0,0.3);
        display: flex; align-items: center; justify-content: center;
        font-size: 1rem; transition: transform 0.18s;
        position: relative; z-index: 2;
      }
      .dm-settle-dot:hover { transform: scale(1.2); }
      .dm-settle-label {
        font-weight: 700 !important;
        background: #fff3e8 !important;
        color: #c2410c !important;
        border: 1.5px solid #fb923c !important;
        box-shadow: 0 2px 10px rgba(251,146,60,0.3) !important;
      }
      .dm-marker-label {
        margin-top: 4px; font-size: 0.62rem; white-space: nowrap; font-weight: 600;
        background: #fff; color: #1e293b;
        padding: 2px 8px; border-radius: 100px;
        border: none; box-shadow: 0 2px 8px rgba(0,0,0,0.18);
        pointer-events: none; line-height: 1.5; letter-spacing: 0.1px;
      }

      .dm-info {
        flex-shrink: 0; margin: 8px 16px 0;
        padding: 12px 16px; border-radius: 12px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(167,139,250,0.2);
        color: #cbd5e1; font-size: 0.81rem; line-height: 1.6; min-height: 62px;
        transition: all 0.25s;
      }
      .dm-info-empty { color: #475569; font-size: 0.77rem; }
      .dm-info-name { font-weight: 700; margin-bottom: 3px; display: block; }

      /* ── Candy Voice Bar ── */
      #dmCandyBar {
        flex-shrink: 0; margin: 8px 16px 14px;
        padding: 12px 16px; border-radius: 12px;
        background: rgba(167,139,250,0.07);
        border: 1px solid rgba(167,139,250,0.25);
        display: flex; align-items: center; gap: 12px;
      }
      #dmCandyAvatar {
        width: 42px; height: 42px; border-radius: 50%;
        background: rgba(167,139,250,0.15);
        display: flex; align-items: center; justify-content: center;
        font-size: 1.25rem; flex-shrink: 0;
        border: 1.5px solid rgba(167,139,250,0.3);
        transition: all 0.3s;
      }
      #dmCandyAvatar.speaking {
        border-color: #a78bfa;
        box-shadow: 0 0 0 4px rgba(167,139,250,0.2), 0 0 16px rgba(167,139,250,0.4);
        animation: avatarPulse 1.2s ease-in-out infinite;
      }
      @keyframes avatarPulse {
        0%, 100% { transform: scale(1); }
        50%       { transform: scale(1.08); }
      }
      #dmCandyText { flex: 1; min-width: 0; }
      #dmCandyName {
        font-size: 0.6rem; font-weight: 700; color: #a78bfa;
        text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;
      }
      #dmCandySpeech {
        font-size: 0.78rem; color: #94a3b8; line-height: 1.55;
      }
      #dmCandySpeech.typing::after {
        content: '▌';
        animation: candyBlink 0.7s step-end infinite;
        color: #a78bfa;
      }
      @keyframes candyBlink { 50% { opacity: 0; } }

      /* ── Sound wave bars shown while speaking ── */
      .dm-wave {
        display: none; align-items: center; gap: 3px; height: 18px; margin-top: 4px;
      }
      .dm-wave.active { display: flex; }
      .dm-wave span {
        display: inline-block; width: 3px; border-radius: 2px;
        background: #a78bfa; animation: waveBar 0.9s ease-in-out infinite;
      }
      .dm-wave span:nth-child(1) { height: 6px;  animation-delay: 0s; }
      .dm-wave span:nth-child(2) { height: 12px; animation-delay: 0.1s; }
      .dm-wave span:nth-child(3) { height: 18px; animation-delay: 0.2s; }
      .dm-wave span:nth-child(4) { height: 10px; animation-delay: 0.3s; }
      .dm-wave span:nth-child(5) { height: 14px; animation-delay: 0.15s; }
      .dm-wave span:nth-child(6) { height: 6px;  animation-delay: 0.25s; }
      @keyframes waveBar {
        0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
        50%       { transform: scaleY(1);   opacity: 1; }
      }

      #dmCandyButtons { flex-shrink: 0; display: flex; flex-direction: column; gap: 6px; }
      #dmCandyButtons button {
        display: flex; align-items: center; justify-content: center; gap: 6px;
        padding: 7px 14px; border-radius: 8px;
        border: 1px solid rgba(167,139,250,0.5);
        background: rgba(167,139,250,0.12);
        color: #c4b5fd; font-size: 0.72rem; font-weight: 600;
        cursor: pointer; transition: all 0.18s; white-space: nowrap;
        min-width: 120px;
      }
      #dmCandyButtons button:hover { background: rgba(167,139,250,0.22); }
      #dmCandyButtons button:disabled { opacity: 0.45; cursor: not-allowed; }
      #dmStopBtn {
        border-color: rgba(244,63,94,0.4) !important;
        background: rgba(244,63,94,0.08) !important;
        color: #fda4af !important;
        display: none !important;
      }
      #dmStopBtn.visible { display: flex !important; }

      /* Leaflet UI overrides */
      .leaflet-control-zoom a {
        background: rgba(255,255,255,0.95) !important;
        color: #334155 !important; border-color: rgba(0,0,0,0.15) !important;
      }
      .leaflet-control-zoom a:hover { background: #f1f5f9 !important; }
      .leaflet-control-attribution {
        background: rgba(255,255,255,0.75) !important;
        color: #64748b !important; font-size: 0.58rem !important;
      }
      .leaflet-control-attribution a { color: #475569 !important; }
      .leaflet-container { background: #e8e0d8 !important; }

      #dmMapLoading {
        position: absolute; inset: 0; z-index: 500; background: #f8fafc;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: 12px; color: #475569; font-size: 0.8rem;
      }
      #dmMapLoading .dm-spin {
        width: 28px; height: 28px; border-radius: 50%;
        border: 2px solid rgba(167,139,250,0.2); border-top-color: #a78bfa;
        animation: dmSpin 0.8s linear infinite;
      }
      @keyframes dmSpin { to { transform: rotate(360deg); } }

      @media (max-width: 640px) {
        .dm-legend { gap: 8px; font-size: 0.6rem; padding: 6px 12px; }
        #dmMapContainer { margin: 8px 10px 0; border-radius: 10px; }
        .dm-info { margin: 6px 10px 0; font-size: 0.76rem; }
        #dmCandyBar { margin: 6px 10px 10px; }
        .dm-header { padding: 12px 14px; }
        #dmCandyButtons button { min-width: 100px; padding: 6px 10px; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ── Build panel HTML ── */
  function buildPanel() {
    panel = document.createElement('div');
    panel.id = 'dreamMapPanel';
    panel.innerHTML = `
      <div class="dm-header">
        <div class="dm-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Pavan's Dream Destination Map
        </div>
        <button id="dmCloseBtn" class="dm-close">✕</button>
      </div>

      <div class="dm-legend">
        ${Object.entries(TYPE_META).map(([k, m]) => `
          <div class="dm-legend-item">
            <span class="dm-legend-dot" style="background:${m.color};box-shadow:0 0 5px ${m.color}"></span>
            ${m.emoji} ${m.label}
          </div>`).join('')}
      </div>

      <div id="dmMapContainer">
        <div id="dmMapEl"></div>
        <div id="dmMapLoading">
          <div class="dm-spin"></div>
          Loading map…
        </div>
      </div>

      <div class="dm-info" id="dmInfo">
        <div class="dm-info-empty">📍 Click any pin to discover why this place matters to Pavan.</div>
      </div>

      <div id="dmCandyBar">
        <div id="dmCandyAvatar">🍬</div>
        <div id="dmCandyText">
          <div id="dmCandyName">Candy — AI Travel Voice</div>
          <div id="dmCandySpeech">Pick a destination and hit "Ask Candy" — I'll speak to you about it! ✨</div>
          <div class="dm-wave" id="dmWave">
            <span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
        <div id="dmCandyButtons">
          <button id="dmSpeakBtn" disabled>✨ Ask Candy</button>
          <button id="dmStopBtn">⏹ Stop</button>
        </div>
      </div>
    `;
    document.body.appendChild(panel);
    document.getElementById('dmCloseBtn').addEventListener('click', closeDreamMap);
    document.getElementById('dmSpeakBtn').addEventListener('click', onAskCandy);
    document.getElementById('dmStopBtn').addEventListener('click', onStopCandy);

    // Pre-load voices (some browsers need this trigger)
    if (synth && synth.getVoices().length === 0) {
      synth.addEventListener('voiceschanged', () => {}, { once: true });
    }
  }

  /* ── Speaking UI state ── */
  function setSpeakingUI(speaking) {
    const avatar  = document.getElementById('dmCandyAvatar');
    const wave    = document.getElementById('dmWave');
    const askBtn  = document.getElementById('dmSpeakBtn');
    const stopBtn = document.getElementById('dmStopBtn');

    if (speaking) {
      avatar.classList.add('speaking');
      wave.classList.add('active');
      askBtn.disabled = true;
      stopBtn.classList.add('visible');
    } else {
      avatar.classList.remove('speaking');
      wave.classList.remove('active');
      askBtn.disabled = !selectedDest;
      stopBtn.classList.remove('visible');
    }
  }

  function onStopCandy() {
    stopSpeech();
    candySpeaking = false;
    setSpeakingUI(false);
    const speech = document.getElementById('dmCandySpeech');
    speech.className = '';
    speech.style.color = '#94a3b8';
  }

  /* ── Init Leaflet ── */
  function initMap() {
    if (leafletMap) {
      setTimeout(() => leafletMap.invalidateSize(), 100);
      return;
    }

    leafletMap = L.map('dmMapEl', {
      center: [22, 82], zoom: 4,
      minZoom: 2, maxZoom: 19,
      zoomControl: true,
      scrollWheelZoom: false,
      doubleClickZoom: true,
      touchZoom: true,
      dragging: true,
      zoomAnimation: true,
      preferCanvas: true,
    });

    const mapEl = document.getElementById('dmMapEl');
    mapEl.addEventListener('mouseenter', () => leafletMap.scrollWheelZoom.enable());
    mapEl.addEventListener('mouseleave', () => leafletMap.scrollWheelZoom.disable());
    mapEl.addEventListener('wheel', (e) => e.stopPropagation(), { passive: false });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd', maxZoom: 20,
    }).addTo(leafletMap);

    leafletMap.once('load', hideLoader);
    setTimeout(hideLoader, 3000);

    DESTINATIONS.forEach((d) => {
      const meta = TYPE_META[d.type];
      const isSettle = d.type === 'settle';
      const icon = L.divIcon({
        className: '',
        html: isSettle
          ? `<div class="dm-marker dm-marker-settle">
              <div class="dm-settle-ring"></div>
              <div class="dm-settle-dot" style="background:${meta.color}">🏡</div>
              <div class="dm-marker-label dm-settle-label">${d.name} 🏡</div>
            </div>`
          : `<div class="dm-marker">
              <div class="dm-marker-dot" style="background:${meta.color};box-shadow:0 0 10px ${meta.color}, 0 0 20px ${meta.color}44"></div>
              <div class="dm-marker-label">${d.name}</div>
            </div>`,
        iconSize:   isSettle ? [130, 48] : [80, 36],
        iconAnchor: isSettle ? [65, 20]  : [40, 14],
        popupAnchor: [0, -16],
      });

      L.marker([d.lat, d.lng], { icon }).addTo(leafletMap).on('click', () => {
        selectDestination(d, isSettle, meta);
      });
    });
  }

  function selectDestination(d, isSettle, meta) {
    // Stop any ongoing speech when switching destinations
    if (candySpeaking) onStopCandy();

    selectedDest = d;
    leafletMap.setView([d.lat, d.lng], Math.max(leafletMap.getZoom(), 6), {
      animate: true, duration: 0.3,
    });

    const settleTag = isSettle
      ? `<span style="
          display:inline-block; margin-left:8px;
          background:#fff3e8; color:#c2410c;
          font-size:0.65rem; font-weight:700; padding:2px 8px;
          border-radius:100px; border:1px solid #fb923c; vertical-align:middle;
        ">🏡 Pavan's Dream Home</span>`
      : '';

    document.getElementById('dmInfo').innerHTML = `
      <span class="dm-info-name" style="color:${meta.color}">${meta.emoji} ${d.name} — ${meta.label}${settleTag}</span>
      ${d.note}
    `;

    document.getElementById('dmSpeakBtn').disabled = false;
    const speech = document.getElementById('dmCandySpeech');
    speech.className = '';
    speech.style.color = '#94a3b8';
    speech.textContent = `Click "Ask Candy" and I'll speak about ${d.name}! ✨`;
  }

  function hideLoader() {
    const el = document.getElementById('dmMapLoading');
    if (el) el.style.display = 'none';
  }

  /* ── Candy Voice ── */
  async function onAskCandy() {
    if (!selectedDest || candySpeaking) return;
    candySpeaking = true;
    setSpeakingUI(true);

    const speech = document.getElementById('dmCandySpeech');
    speech.className = 'typing';
    speech.style.color = '#e2e8f0';
    speech.textContent = '';

    const d    = selectedDest;
    const meta = TYPE_META[d.type];
    const prompt = `You are Candy, a bubbly, warm, and enthusiastic AI travel companion with a sweet and uplifting personality. You use vivid imagery, a little playfulness, and genuine emotion. In 2–3 sentences max, tell Pavan something special and heartfelt about ${d.name} (category: ${meta.label}). Context: ${d.note}. Be encouraging, dreamy, and personal — as if you're his cheerful travel bestie. No hashtags, no lists, no emojis.`;

    try {
      const res = await fetch('https://pk-groq-proxy.daroorpavankalyan.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          max_tokens: 200,
          messages: [
            { role: 'system', content: 'You are Candy, a bubbly warm travel companion. Keep responses to 2-3 sentences, vivid and personal. No hashtags, no lists, no emojis.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.88,
          stream: false,
        }),
      });

      const data = await res.json();

      // Support both Groq format and fallback formats
      const text =
        data?.choices?.[0]?.message?.content?.trim() ||
        data?.content?.[0]?.text?.trim()              ||
        data?.message?.content?.trim()                ||
        data?.text?.trim()                            ||
        null;

      if (!text) {
        // Log full response to console for debugging
        console.warn('[Candy] Unexpected response shape:', JSON.stringify(data, null, 2));
        throw new Error('Empty response');
      }

      // Typewriter + speak simultaneously
      await Promise.all([
        typewriterEffect(speech, text),
        new Promise(resolve => speakText(text, resolve)),
      ]);

    } catch (err) {
      console.error('[Candy] Error:', err);
      const errMsg = 'Hmm, couldn\'t connect right now. Try again in a moment!';
      speech.className = '';
      speech.style.color = '#94a3b8';
      speech.textContent = errMsg;
      speakText(errMsg, () => {});
    }

    candySpeaking = false;
    setSpeakingUI(false);
  }

  async function typewriterEffect(el, text) {
    el.className = 'typing';
    el.style.color = '#e2e8f0';
    el.textContent = '';
    for (let i = 0; i < text.length; i++) {
      el.textContent += text[i];
      await new Promise(r => setTimeout(r, 18));
    }
    el.className = '';
  }

  /* ── Open / close ── */
  function openDreamMap() {
    if (!panel) { injectStyles(); buildPanel(); }
    panel.classList.add('active');
    document.body.style.overflow = 'hidden';
    loadLeaflet(() => setTimeout(initMap, 80));
  }

  function closeDreamMap() {
    stopSpeech();
    candySpeaking = false;
    setSpeakingUI(false);
    panel.classList.remove('active');
    document.body.style.overflow = '';
  }

  window.openDreamMap  = openDreamMap;
  window.closeDreamMap = closeDreamMap;

  function init() {
    if (!document.getElementById('dreamMapTrigger')) {
      const btn = document.createElement('button');
      btn.id = 'dreamMapTrigger';
      btn.className = 'portbtn';
      btn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        Dream Map
      `;
      btn.addEventListener('click', openDreamMap);
      const target = document.querySelector('#starters') || document.body;
      target.appendChild(btn);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();




/* ============================================================
   Project DNA Lab — all-in-one JS module
   Auto-mounts into Candy via a trigger button in #starters.
   ============================================================ */

(function () {
  const ProjectDNALab = {};

  const projects = [
    {
      name: "Student Management System",
      tag: "Database System · MSN-001",
      colors: ["#fb7185", "#f43f5e"],
      genes: [
        { label: "Creativity",  score: 7, note: "Role-based dashboards for Admin, Faculty & Students with automated PDF marksheets." },
        { label: "Complexity",  score: 9, note: "Java Swing + MySQL + JDBC, OMR sheet scanning via OpenCV, automated grade computation." },
        { label: "Impact",      score: 8, note: "Manages entire academic cycles — exam scanning to result publication, end-to-end." },
        { label: "Innovation",  score: 7, note: "OMR scanning pipeline combined with iText PDF reporting and ZXing barcode tooling." }
      ]
    },
    {
      name: "InventoryIQ",
      tag: "Analytics Dashboard · MSN-002",
      colors: ["#22d3ee", "#5ef0ff"],
      genes: [
        { label: "Creativity",  score: 7, note: "Clean Streamlit + Plotly dashboard turning raw stock data into visual insight." },
        { label: "Complexity",  score: 7, note: "Python, Pandas, Plotly with live alerts, audit logging, and secure multi-user login." },
        { label: "Impact",      score: 9, note: "Live on Streamlit Cloud — plug-and-play analytics layer for real e-commerce businesses." },
        { label: "Innovation",  score: 7, note: "Sales velocity & demand trend modeling with CSV import/export and audit history." }
      ]
    },
    {
      name: "Digit Recognizer",
      tag: "AI Experiment · MSN-003",
      colors: ["#a78bfa", "#9d7bff"],
      genes: [
        { label: "Creativity",  score: 8, note: "Live drawing canvas where visitors test a real CNN in real time." },
        { label: "Complexity",  score: 8, note: "TensorFlow/Keras CNN with conv + pooling layers, trained on MNIST's 60,000 samples." },
        { label: "Impact",      score: 7, note: "Deployed as an interactive public demo with instant predictions and confidence scores." },
        { label: "Innovation",  score: 8, note: "OpenCV preprocessing feeding a trained CNN directly from a browser canvas." }
      ]
    },
    {
      name: "Netflix Dashboard",
      tag: "Business Intelligence · MSN-004",
      colors: ["#f43f5e", "#ffd36e"],
      genes: [
        { label: "Creativity",  score: 7, note: "Executive-level BI report with genre, geography, and trend storytelling." },
        { label: "Complexity",  score: 6, note: "Power BI, DAX measures, and Power Query modeling across 5000+ titles." },
        { label: "Impact",      score: 7, note: "Turns a flat CSV into a navigable content intelligence tool for decision-making." },
        { label: "Innovation",  score: 6, note: "Geographic production heatmap and Movies vs TV Shows trend analytics via DAX." }
      ]
    },
    {
      name: "Employee Attrition Analysis",
      tag: "ML Classification · MSN-005",
      colors: ["#34d399", "#22d3ee"],
      genes: [
        { label: "Creativity",  score: 6, note: "HR decision-support dashboard built on top of a predictive ML pipeline." },
        { label: "Complexity",  score: 9, note: "Logistic Regression, Random Forest, XGBoost with SMOTE oversampling across 35+ features." },
        { label: "Impact",      score: 8, note: "Surfaces real attrition drivers — overtime, satisfaction, tenure — for HR action." },
        { label: "Innovation",  score: 7, note: "Feature importance analysis paired with a live Power BI prediction dashboard." }
      ]
    },
    {
      name: "Candy AI",
      tag: "AI Portfolio Assistant · MSN-006",
      colors: ["#8b5cf6", "#22d3ee"],
      genes: [
        { label: "Creativity",  score: 10, note: "Space-themed AI assistant that converses naturally as Pavan's digital representative." },
        { label: "Complexity",  score: 8,  note: "HTML/CSS/JS frontend wired to AI APIs with real-time response handling, deployed on Netlify." },
        { label: "Impact",      score: 9,  note: "Acts as a living, talking portfolio — visitors explore projects through conversation, not clicks." },
        { label: "Innovation",  score: 10, note: "Portfolio navigation, project explanations, and guidance delivered through live AI dialogue." }
      ]
    }
  ];

  /* ── CSS ── */
  const CSS = `
  /* ── Fullscreen overlay ── */
  #dnalabOverlay {
    position: fixed; inset: 0; z-index: 99999;
    background: rgba(0,0,0,0.82); backdrop-filter: blur(8px);
    display: none; align-items: center; justify-content: center;
    padding: 16px;
  }
  #dnalabOverlay.active { display: flex; }

  /* ── Inner scrollable container ── */
  #dnalabOverlay .dnalab-outer {
    width: min(820px, 100%); max-height: 90vh;
    overflow-y: auto; border-radius: 20px;
    scrollbar-width: thin; scrollbar-color: rgba(94,240,255,.3) transparent;
  }
  #dnalabOverlay .dnalab-outer::-webkit-scrollbar { width: 4px; }
  #dnalabOverlay .dnalab-outer::-webkit-scrollbar-thumb { background: rgba(94,240,255,.3); border-radius: 4px; }

  /* ── Close button ── */
  #dnalabClose {
    position: fixed; top: 18px; right: 22px; z-index: 100000;
    width: 34px; height: 34px; border-radius: 10px;
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
    color: #94a3b8; cursor: pointer; font-size: 1rem;
    display: none; align-items: center; justify-content: center; transition: all .2s;
  }
  #dnalabClose.active { display: flex; }
  #dnalabClose:hover { background: rgba(244,63,94,.15); color: #f43f5e; border-color: rgba(244,63,94,.4); }

  /* ── Widget styles ── */
  .dnalab {
    --bg:#05060f; --panel:#0b0e1f; --panel-edge:rgba(124,140,255,.18);
    --cyan:#5ef0ff; --violet:#9d7bff; --pink:#ff6fb5; --gold:#ffd36e;
    --text:#eaf0ff; --dim:#7c87b8;
    position: relative; font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    color: var(--text); padding: 40px 24px 32px;
    border-radius: 20px;
    background: radial-gradient(ellipse at 50% -10%, #161b3a 0%, var(--bg) 60%);
    overflow: hidden;
  }
  .dnalab * { box-sizing: border-box; }
  .dnalab canvas.dnalab-stars { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
  .dnalab .dnalab-wrap { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; }

  .dnalab-header { text-align: center; margin-bottom: 28px; }
  .dnalab-header h1 {
    margin: 0; font-size: 1.65rem; letter-spacing: .5px;
    background: linear-gradient(90deg, var(--cyan), var(--violet), var(--pink));
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .dnalab-header p { color: var(--dim); margin: 6px 0 0; font-size: .84rem; }

  .dnalab-selector { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px; }
  .dnalab-selector button {
    background: var(--panel); border: 1px solid var(--panel-edge); color: var(--dim);
    padding: 7px 15px; border-radius: 999px; cursor: pointer; font-size: .78rem;
    transition: all .25s ease; font-family: inherit;
  }
  .dnalab-selector button:hover { color: var(--text); border-color: var(--cyan); }
  .dnalab-selector button.active {
    color: #05060f; font-weight: 600;
    background: linear-gradient(90deg, var(--cyan), var(--violet));
    border-color: transparent; box-shadow: 0 0 18px rgba(94,240,255,.4);
  }

  .dnalab-card {
    background: linear-gradient(180deg, rgba(20,24,48,.9), rgba(10,12,26,.9));
    border: 1px solid var(--panel-edge); border-radius: 18px; padding: 28px 26px 22px;
    box-shadow: 0 0 40px rgba(80,90,200,.12), inset 0 0 60px rgba(80,90,200,.04);
    position: relative; overflow: hidden;
  }
  .dnalab-card::before {
    content: ""; position: absolute; top: -60%; left: -20%; width: 140%; height: 200%;
    background: radial-gradient(circle, rgba(124,140,255,.08), transparent 60%);
    animation: dnalabDrift 14s linear infinite; pointer-events: none;
  }
  @keyframes dnalabDrift { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  .dnalab-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 22px; position: relative; z-index: 2; }
  .dnalab-card-top h2 { margin: 0; font-size: 1.2rem; }
  .dnalab-card-top .dnalab-tag { font-size: .68rem; color: var(--dim); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px; }
  .dnalab-badge {
    width: 44px; height: 44px; border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, rgba(255,255,255,.25), transparent 60%),
                linear-gradient(135deg, var(--cyan), var(--violet));
    display: flex; align-items: center; justify-content: center; font-size: 1.1rem;
    box-shadow: 0 0 22px rgba(94,240,255,.35); flex-shrink: 0;
    animation: dnalabPulse 2.4s ease-in-out infinite;
  }
  @keyframes dnalabPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }

  .dnalab-strand { position: relative; z-index: 2; }
  .dnalab-gene {
    display: grid; grid-template-columns: 110px 1fr 48px;
    align-items: center; gap: 12px; margin-bottom: 14px;
    cursor: pointer; position: relative;
  }
  .dnalab-gene-label { font-size: .82rem; color: var(--dim); font-weight: 500; transition: color .2s; }
  .dnalab-gene:hover .dnalab-gene-label { color: var(--text); }

  .dnalab-track {
    height: 13px; border-radius: 8px; background: rgba(255,255,255,.05);
    position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,.06);
  }
  .dnalab-ticks { position: absolute; inset: 0; display: flex; }
  .dnalab-ticks span { flex: 1; border-right: 1px solid rgba(255,255,255,.04); }
  .dnalab-ticks span:last-child { border-right: none; }

  .dnalab-fill {
    position: absolute; top: 0; left: 0; height: 100%; width: 0%; border-radius: 8px;
    background: linear-gradient(90deg, var(--barA), var(--barB));
    box-shadow: 0 0 14px var(--barA);
    transition: width 1.1s cubic-bezier(.2,.8,.2,1);
  }
  .dnalab-fill::after {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.5), transparent);
    width: 30%; animation: dnalabShine 2.6s ease-in-out infinite;
  }
  @keyframes dnalabShine { 0% { transform: translateX(-120%); } 100% { transform: translateX(420%); } }

  .dnalab-gene-score { font-size: .82rem; font-weight: 700; text-align: right; color: var(--text); font-variant-numeric: tabular-nums; }

  .dnalab-tooltip {
    position: absolute; bottom: calc(100% + 8px); left: 0;
    background: #11142a; border: 1px solid var(--panel-edge);
    color: var(--text); font-size: .7rem; padding: 8px 12px; border-radius: 10px;
    width: max-content; max-width: 230px; opacity: 0; pointer-events: none;
    transform: translateY(6px); transition: opacity .2s, transform .2s; z-index: 5;
    box-shadow: 0 6px 20px rgba(0,0,0,.4); line-height: 1.5;
  }
  .dnalab-gene:hover .dnalab-tooltip { opacity: 1; transform: translateY(0); }

  .dnalab-summary {
    margin-top: 22px; display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid var(--panel-edge); padding-top: 16px; position: relative; z-index: 2;
  }
  .dnalab-avg-label { font-size: .72rem; color: var(--dim); }
  .dnalab-avg-val {
    font-size: 1.55rem; font-weight: 700;
    background: linear-gradient(90deg, var(--cyan), var(--pink));
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .dnalab-dna-icon { display: flex; gap: 3px; align-items: center; }
  .dnalab-dna-icon span { width: 6px; height: 6px; border-radius: 50%; background: var(--violet); animation: dnalabBob 1.8s ease-in-out infinite; }
  .dnalab-dna-icon span:nth-child(2) { animation-delay: .2s; background: var(--cyan); }
  .dnalab-dna-icon span:nth-child(3) { animation-delay: .4s; background: var(--pink); }
  .dnalab-dna-icon span:nth-child(4) { animation-delay: .6s; background: var(--gold); }
  @keyframes dnalabBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  `;

  function injectCSS() {
    if (document.getElementById('dnalab-style')) return;
    const s = document.createElement('style');
    s.id = 'dnalab-style';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function shellHTML() {
    return `
      <div class="dnalab">
        <canvas class="dnalab-stars"></canvas>
        <div class="dnalab-wrap">
          <div class="dnalab-header">
            <h1>🧬 Project DNA Lab</h1>
            <p>Every project has a strand of its own. Pick one to sequence it.</p>
          </div>
          <div class="dnalab-selector"></div>
          <div class="dnalab-card">
            <div class="dnalab-card-top">
              <div>
                <div class="dnalab-tag"></div>
                <h2 class="dnalab-title">—</h2>
              </div>
              <div class="dnalab-badge">🧬</div>
            </div>
            <div class="dnalab-strand"></div>
            <div class="dnalab-summary">
              <div>
                <div class="dnalab-avg-label">DNA Strength Index</div>
                <div class="dnalab-avg-val">0%</div>
              </div>
              <div class="dnalab-dna-icon"><span></span><span></span><span></span><span></span></div>
            </div>
          </div>
        </div>
      </div>`;
  }

  ProjectDNALab.mount = function (selector) {
    injectCSS();
    const root = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!root) return;
    root.innerHTML = shellHTML();

    let active = 0;
    const selEl   = root.querySelector('.dnalab-selector');
    const strandEl = root.querySelector('.dnalab-strand');
    const titleEl  = root.querySelector('.dnalab-title');
    const tagEl    = root.querySelector('.dnalab-tag');
    const avgEl    = root.querySelector('.dnalab-avg-val');
    const canvas   = root.querySelector('.dnalab-stars');

    projects.forEach((p, i) => {
      const btn = document.createElement('button');
      btn.textContent = p.name;
      if (i === 0) btn.classList.add('active');
      btn.addEventListener('click', () => {
        active = i;
        [...selEl.children].forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        render();
      });
      selEl.appendChild(btn);
    });

    function render() {
      const p = projects[active];
      titleEl.textContent = p.name;
      tagEl.textContent   = p.tag;
      strandEl.innerHTML  = '';

      p.genes.forEach(g => {
        const row = document.createElement('div');
        row.className = 'dnalab-gene';
        row.style.setProperty('--barA', p.colors[0]);
        row.style.setProperty('--barB', p.colors[1]);
        row.innerHTML = `
          <div class="dnalab-gene-label">${g.label}</div>
          <div class="dnalab-track">
            <div class="dnalab-ticks">${'<span></span>'.repeat(10)}</div>
            <div class="dnalab-fill" data-target="${g.score * 10}"></div>
          </div>
          <div class="dnalab-gene-score">${g.score}/10</div>
          <div class="dnalab-tooltip">${g.note}</div>`;
        strandEl.appendChild(row);
      });

      const avg = Math.round(projects[active].genes.reduce((a, g) => a + g.score, 0) / projects[active].genes.length * 10);
      avgEl.textContent = avg + '%';

      requestAnimationFrame(() => {
        strandEl.querySelectorAll('.dnalab-fill').forEach((f, i) => {
          setTimeout(() => { f.style.width = f.dataset.target + '%'; }, i * 140);
        });
      });
    }

    render();
    startStarfield(canvas, root.querySelector('.dnalab'));
  };

  function startStarfield(canvas, parent) {
    const ctx = canvas.getContext('2d');
    function resize() {
      canvas.width  = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      s: Math.random() * 0.6 + 0.2,
      o: Math.random()
    }));
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(st => {
        st.o += st.s * 0.01;
        ctx.beginPath();
        ctx.fillStyle = `rgba(220,230,255,${Math.abs(Math.sin(st.o)) * 0.8})`;
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(loop);
    }
    loop();
  }

  /* ══════════════════════════════════════════════════════
     AUTO-INJECT into Candy: overlay + close btn + trigger
  ══════════════════════════════════════════════════════ */
  function buildOverlay() {
    if (document.getElementById('dnalabOverlay')) return;

    /* close button */
    const closeBtn = document.createElement('button');
    closeBtn.id = 'dnalabClose';
    closeBtn.textContent = '✕';
    closeBtn.title = 'Close DNA Lab';
    document.body.appendChild(closeBtn);

    /* overlay */
    const overlay = document.createElement('div');
    overlay.id = 'dnalabOverlay';
    overlay.innerHTML = '<div class="dnalab-outer" id="dnalabMount"></div>';
    document.body.appendChild(overlay);

    /* close handlers */
    closeBtn.addEventListener('click', closeDNALab);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeDNALab(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDNALab(); });
  }

  function openDNALab() {
    buildOverlay();
    const overlay  = document.getElementById('dnalabOverlay');
    const closeBtn = document.getElementById('dnalabClose');
    const mount    = document.getElementById('dnalabMount');

    /* mount fresh each time so bars animate in */
    ProjectDNALab.mount(mount);

    overlay.classList.add('active');
    closeBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDNALab() {
    const overlay  = document.getElementById('dnalabOverlay');
    const closeBtn = document.getElementById('dnalabClose');
    if (overlay)  overlay.classList.remove('active');
    if (closeBtn) closeBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  window.openDNALab  = openDNALab;
  window.closeDNALab = closeDNALab;
  window.ProjectDNALab = ProjectDNALab;

  /* ── Add trigger button into Candy's #starters row ── */
  function addTriggerBtn() {
    if (document.getElementById('dnalabTriggerBtn')) return;
    const target = document.querySelector('#starters') || document.body;
    const btn = document.createElement('button');
    btn.id = 'dnalabTriggerBtn';
    btn.className = 'portbtn';
    btn.innerHTML = `
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2"/>
        <path d="M12 8v4l3 3"/>
      </svg>
      Project DNA Lab`;
    btn.addEventListener('click', openDNALab);
    target.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addTriggerBtn);
  } else {
    addTriggerBtn();
  }

})();





 
