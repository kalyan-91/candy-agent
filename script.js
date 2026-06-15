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

/* ══════════ TYPING INDICATOR PULSE ══════════ */
(function(){
  const av = document.querySelector('.chdr-av');
  if (!av) return;
  let typingTimer = null;

  document.getElementById('inp')?.addEventListener('input', () => {
    av.classList.add('typing-aware');
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      av.classList.remove('typing-aware');
    }, 1500);
  });

  document.getElementById('inp')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      av.classList.remove('typing-aware');
      clearTimeout(typingTimer);
    }
  });
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
    <a href="https://kalyanfinity-portfolio.netlify.app" target="_blank" class="portbtn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
      View Portfolio
    </a>
    <button class="tour-start-btn" id="startTourBtn" onclick="startTour()">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      Take a Portfolio Tour
    </button>`
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

/* ══════════ SEND MESSAGE ══════════ */
async function go() {
  const txt = inpEl.value.trim(); if (!txt) return;
  inpEl.value = ''; resizeTA(inpEl); stopListen();
  addMsg('user', esc(txt));
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
