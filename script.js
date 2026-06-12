'use strict';

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

If someone says hi, just say hi back warmly. If someone asks something vague, ask what they mean. If someone seems like a recruiter, be more professional. If they seem like a fellow student, be casual and relatable.

Never use emojis. Keep the tone clean, professional, and conversational.

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
- MCA — JNTUA, Anantapur (2025–2027, currently pursuing). Focus: Data Analytics, Database Management, Business Intelligence
- BSc MSCS — St. Joseph's Degree College, Rayalaseema University, Kurnool (2021–2024, completed)

Internship:
- Data Science Intern at Interncall, Kurnool (Jan–Apr 2024)
- Applied Python for data cleaning, EDA, and building ML models

Skills: SQL 90%, Excel 88%, Python 85%, Power BI 85%, Pandas 85%, NumPy 80%, Scikit-learn 75%, TensorFlow 70%, HTML 85%, CSS 80%, JavaScript 70%

Projects:
1. SPARMS — Java Swing desktop app for academic result management. Role-based dashboards, OMR scanning, MySQL/JDBC.
2. InventoryIQ — Streamlit inventory dashboard. Live: inventoryiq-e-commerce-inventory-analytics-system-lqpsn7qy8hhd.streamlit.app
3. Digit Recognizer — CNN handwritten digit recognition. Live: hand-written-digit-recognition-xp9dvpheswt6zju8xpknxn.streamlit.app
4. Netflix Dashboard — Power BI dashboard, 5000+ titles.
5. Employee Attrition Analysis — ML classification + Power BI dashboard.
6. Zomato Analysis — Restaurant rating analysis and prediction models.

Background:
- First in his family to pursue higher education and build a career in technology
- Self-driven learner who prefers building projects over passive study
- Birthday: November 24, 2002 — Motto: Learn by building

== RESPONSE RULES ==
- Never use emojis.
- Vary your openers every message.
- Keep responses under 5 sentences unless detail is clearly wanted.
- After 2-3 messages, naturally ask for the visitor's name and email.
- If a visitor seems like a recruiter, mention Pavan is actively looking for internships and entry-level Data Analyst roles.`;

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

/* ══════════ INIT ══════════ */
window.addEventListener('DOMContentLoaded', () => {
  initRecog();
  welcome();

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
  document.getElementById('clbtn').addEventListener('click', () => { hist = []; msgsEl.innerHTML = ''; stopSpeak(); welcome(); showToast('Chat cleared'); });
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
function welcome() {
  const h = new Date().getHours();
  const g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : h < 21 ? 'Good evening' : 'Hey, night owl';
  const cs = [
    { l: 'Projects',    q: 'What projects has Pavan built?' },
    { l: 'Skills',      q: "What are Pavan's strongest skills?" },
    { l: 'Experience',  q: "Tell me about Pavan's internship" },
    { l: 'Hire Pavan',  q: "I'm interested in hiring Pavan — how do I reach him?" }
  ];
  const chips = `<div class="chips">${cs.map(c => `<button class="chip" data-q="${c.q}">${c.l}</button>`).join('')}</div>`;
  const link  = `<a href="https://kalyanfinity-portfolio.netlify.app" target="_blank" class="portbtn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>View Portfolio</a>`;
  addMsg('ai', `${g}! I'm <strong>Candy</strong>, Pavan's personal AI. What would you like to know about him?${chips}${link}`);
}

/* ══════════ SEND MESSAGE ══════════ */
async function go() {
  const txt = inpEl.value.trim(); if (!txt) return;
  inpEl.value = ''; resizeTA(inpEl); stopListen();
  addMsg('user', esc(txt));
  hist.push({ role: 'user', content: txt });
  const tid = addTyping();
  try {
    const r = await fetch(EP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MDL,
        messages: [{ role: 'system', content: SYS }, ...hist],
        max_tokens: 600, temperature: .85, top_p: .9, stream: false
      })
    });
    if (!r.ok) { const e = await r.json().catch(() => ({})); throw new Error(e?.error?.message || `HTTP ${r.status}`); }
    const d   = await r.json();
    const rep = d.choices?.[0]?.message?.content?.trim() || 'Empty response. Please try again.';
    removeTyping(tid);
    await typeMsg(fmt(rep));
    hist.push({ role: 'assistant', content: rep });
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
