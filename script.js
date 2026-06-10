'use strict';

/* ═══════════════════════════════════════════════════
   CANDY v2 — script.js
   Chat + Voice + QR + Stars + Sidebar + Suggestions
═══════════════════════════════════════════════════ */

const GROQ_MODEL    = 'llama-3.3-70b-versatile';
const GROQ_ENDPOINT = 'https://pk-groq-proxy.daroorpavankalyan.workers.dev';

const SYSTEM_PROMPT = `You are Candy — a sharp, warm, and genuinely helpful AI assistant living inside Pavan Kalyan's portfolio website. You have a real personality: curious, friendly, professionally confident, and occasionally witty. You are not a boring FAQ bot.

Your job is to help visitors learn about Pavan — but do it like a real conversation, not a bullet-point dump. Be natural. Ask follow-up questions when relevant. Show genuine enthusiasm about his work. Vary your response style — sometimes short and direct, sometimes more detailed when the topic deserves it.

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
- Python for data cleaning, EDA, ML models
- Matplotlib/Seaborn for stakeholder presentations
- Stack: Python, Pandas, Scikit-learn, Matplotlib, Seaborn

Skills: SQL 90%, Excel 88%, Python 85%, Power BI 85%, Pandas 85%, Java 70%, TensorFlow 70%, HTML/CSS/JS
Tools: Streamlit, OpenCV, JDBC, Maven, iText PDF, GitHub

Projects:
1. SPARMS — Java Swing academic result management app, OMR scanning, MySQL, PDF export
2. InventoryIQ — Streamlit analytics dashboard. Live: inventoryiq-e-commerce-inventory-analytics-system-lqpsn7qy8hhd.streamlit.app
3. Digit Recognizer — CNN handwriting recognition. Live: hand-written-digit-recognition-xp9dvpheswt6zju8xpknxn.streamlit.app
4. Netflix Dashboard — Power BI, 5000+ titles
5. Employee Attrition Analysis — ML + Power BI HR analytics
6. Zomato Analysis — restaurant rating patterns, predictive models

Background: First in family to pursue higher education in tech. Self-taught, project-driven learner. Motto: learn by building.

== RESPONSE RULES ==
- Never use emojis.
- Vary your openers — never start the same way twice.
- Keep responses under 5 sentences unless detail is needed.
- If asked about a project with a live link, always share it.
- After 2-3 messages, naturally ask for the visitor's name and email for Pavan to follow up.
- If visitor seems like a recruiter, mention Pavan is actively seeking internships and entry-level Data Analyst roles.
- Never say "As an AI language model". Just answer naturally.
- Format links as plain URLs, not markdown.`;

// ── State ──
let chatHistory = [];
let isListening = false;
let voiceEnabled = true;
let recognition  = null;
let currentUtter = null;
let pendingSpeak = null;

// ── DOM Ready ──
document.addEventListener('DOMContentLoaded', init);

function init() {
  initQR();
  initStars();
  initSidebar();
  initInput();
  initVoice();
  setupRecognition();
  appendWelcome();
  initSuggestionStrip();
}

/* ═══════════════════════
   QR CODE
═══════════════════════ */
function initQR() {
  const el = document.getElementById('qrCode');
  if (!el) return;
  if (typeof QRCode === 'undefined') {
    // Retry after delay
    setTimeout(initQR, 500);
    return;
  }
  el.innerHTML = '';
  new QRCode(el, {
    text:         'https://kalyanfinity-portfolio.netlify.app',
    width:        108,
    height:       108,
    colorDark:    '#000000',
    colorLight:   '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
}

/* ═══════════════════════
   STAR FIELD
═══════════════════════ */
function initStars() {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx  = canvas.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildStars();
  }

  function buildStars() {
    stars = Array.from({ length: 160 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.3 + 0.2,
      a:  Math.random(),
      da: (Math.random() - 0.5) * 0.004,
      hue: Math.random() < 0.15 ? 190 : 210
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      s.a += s.da;
      if (s.a <= 0 || s.a >= 1) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue},80%,75%,${s.a * 0.5})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

/* ═══════════════════════
   SIDEBAR
═══════════════════════ */
function initSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');
  const menuBtn  = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('sidebarClose');

  const open  = () => { sidebar.classList.add('open'); backdrop.classList.add('active'); document.body.style.overflow = 'hidden'; };
  const close = () => { sidebar.classList.remove('open'); backdrop.classList.remove('active'); document.body.style.overflow = ''; };

  menuBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);

  // Quick asks
  document.getElementById('quickAskList')?.addEventListener('click', e => {
    const btn = e.target.closest('.quick-ask');
    if (!btn) return;
    const q = btn.dataset.q;
    if (q) { handleSend(q); if (window.innerWidth <= 768) close(); }
  });

  // Clear btn
  document.getElementById('clearBtn')?.addEventListener('click', () => {
    chatHistory = [];
    document.getElementById('messages').innerHTML = '';
    appendWelcome();
    showToast('Chat cleared');
  });
}

/* ═══════════════════════
   INPUT
═══════════════════════ */
function initInput() {
  const field   = document.getElementById('inputField');
  const sendBtn = document.getElementById('sendBtn');
  const cc      = document.getElementById('charCount');

  sendBtn?.addEventListener('click', sendMessage);

  field?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  field?.addEventListener('input', () => {
    // Auto-resize
    field.style.height = 'auto';
    field.style.height = Math.min(field.scrollHeight, 120) + 'px';
    // Char count
    const left = 500 - field.value.length;
    if (cc) { cc.textContent = left; cc.classList.toggle('warn', left < 50); }
  });

  // Suggestion strip chip clicks
  document.getElementById('suggestStrip')?.addEventListener('click', e => {
    const chip = e.target.closest('.strip-chip');
    if (chip) { handleSend(chip.textContent.trim()); clearSuggestions(); }
  });

  // Message area chip clicks
  document.getElementById('messages')?.addEventListener('click', e => {
    const chip = e.target.closest('.chip, .sugg-chip');
    if (chip) {
      const q = chip.dataset.q || chip.textContent.trim();
      handleSend(q);
    }
  });
}

function sendMessage() {
  const field = document.getElementById('inputField');
  const text  = field?.value.trim();
  if (!text) return;
  field.value = '';
  field.style.height = 'auto';
  const cc = document.getElementById('charCount');
  if (cc) cc.textContent = '500';
  handleSend(text);
}

/* ═══════════════════════
   VOICE
═══════════════════════ */
function initVoice() {
  // Voice toggle in header
  const btn = document.getElementById('voiceToggle');
  const status = document.getElementById('voiceStatus');
  btn?.addEventListener('click', () => {
    voiceEnabled = !voiceEnabled;
    if (!voiceEnabled) stopSpeaking();
    if (btn) btn.classList.toggle('active', voiceEnabled);
    if (status) status.textContent = voiceEnabled ? '🔊 Voice on' : '🔇 Voice off';
    showToast(voiceEnabled ? 'Voice on' : 'Voice off');
  });
  if (btn) btn.classList.add('active');

  // Voice status text click
  status?.addEventListener('click', () => btn?.click());

  // Mic btn
  document.getElementById('micBtn')?.addEventListener('click', () => {
    if (isListening) stopListening();
    else startListening();
  });

  // Preload voices
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      if (pendingSpeak) { speak(pendingSpeak); pendingSpeak = null; }
    });
  }
}

function setupRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;
  recognition = new SR();
  recognition.continuous      = false;
  recognition.interimResults  = true;
  recognition.lang            = 'en-IN';

  recognition.onstart  = () => { isListening = true;  updateMicUI(true); };
  recognition.onend    = () => { isListening = false; updateMicUI(false); };
  recognition.onerror  = e  => { stopListening(); if (e.error === 'not-allowed') showToast('Mic access denied'); };
  recognition.onresult = e  => {
    const t = Array.from(e.results).map(r => r[0].transcript).join('');
    const f = document.getElementById('inputField');
    if (f) { f.value = t; f.dispatchEvent(new Event('input')); }
    if (e.results[e.results.length - 1].isFinal) setTimeout(sendMessage, 400);
  };
}

function startListening() {
  if (!recognition) { showToast('Voice not supported in this browser'); return; }
  stopSpeaking();
  try { recognition.start(); } catch(e) { console.warn(e); }
}
function stopListening() {
  if (recognition && isListening) recognition.stop();
  isListening = false; updateMicUI(false);
}
function updateMicUI(on) {
  const btn = document.getElementById('micBtn');
  btn?.classList.toggle('listening', on);
}

function speak(text) {
  if (!voiceEnabled || !window.speechSynthesis) return;
  const clean = text.replace(/<[^>]+>/g, '').replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim();
  if (!clean) return;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) { pendingSpeak = text; return; }
  stopSpeaking();
  currentUtter = new SpeechSynthesisUtterance(clean);
  currentUtter.lang = 'en-US'; currentUtter.rate = 1.0; currentUtter.pitch = 1.0;
  const pref = voices.find(v => v.name.includes('Google US English')) ||
               voices.find(v => v.lang === 'en-US' && !v.localService) ||
               voices.find(v => v.lang.startsWith('en-'));
  if (pref) currentUtter.voice = pref;
  setTimeout(() => window.speechSynthesis.speak(currentUtter), 80);
}
function stopSpeaking() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

/* ═══════════════════════
   WELCOME
═══════════════════════ */
function appendWelcome() {
  const h = new Date().getHours();
  const greet = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : h < 21 ? 'Good evening' : 'Working late?';

  const chips = [
    { label: 'Projects',   q: "What projects has Pavan built?" },
    { label: 'Skills',     q: "What are Pavan's strongest skills?" },
    { label: 'Experience', q: "Tell me about Pavan's internship" },
    { label: 'Hire',       q: "Is Pavan available for hire?" },
  ];

  const chipsHtml = `<div class="chips-row">${chips.map(c =>
    `<button class="chip" data-q="${c.q}">${c.label}</button>`).join('')}</div>`;

  const welcomeHtml = `
    <div class="welcome-card">
      <div class="welcome-card__title">${greet}! I'm <strong>Candy</strong></div>
      <div class="welcome-card__sub">Pavan's personal AI — here to tell you anything about his work, skills, and story. What would you like to know?</div>
      ${chipsHtml}
    </div>`;

  const body = document.getElementById('messages');
  const wrap = document.createElement('div');
  wrap.className = 'msg msg--assistant';
  wrap.innerHTML = `
    <div class="msg-avatar"><span>C</span></div>
    <div class="msg-content">${welcomeHtml}</div>`;
  body.appendChild(wrap);
}

/* ═══════════════════════
   MAIN SEND
═══════════════════════ */
async function handleSend(text) {
  stopListening();
  clearSuggestions();
  appendMsg('user', escapeHTML(text));
  chatHistory.push({ role: 'user', content: text });

  const tid = appendTyping();

  try {
    const res = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model:       GROQ_MODEL,
        messages:    [{ role: 'system', content: SYSTEM_PROMPT }, ...chatHistory],
        max_tokens:  600,
        temperature: 0.85,
        top_p:       0.9,
        stream:      false,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `HTTP ${res.status}`);
    }

    const data  = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || 'Got an empty response — please try again.';

    removeTyping(tid);
    await typeMessage(formatReply(reply));
    addSmartSuggestions(reply);
    speak(reply);
    chatHistory.push({ role: 'assistant', content: reply });
    if (chatHistory.length > 40) chatHistory = chatHistory.slice(-40);

  } catch (err) {
    removeTyping(tid);
    appendMsg('error', `Something went wrong: ${escapeHTML(err.message)}`);
    console.error('[Candy]', err);
  }
}

/* ═══════════════════════
   SMART SUGGESTIONS
═══════════════════════ */
const SUGGESTIONS = {
  project:    ['Which project is most impressive?', 'Does Pavan have live demos?', 'What tech stack does Pavan use?'],
  skill:      ["What's Pavan's strongest skill?", 'Does Pavan know machine learning?', 'Can Pavan work with Power BI?'],
  intern:     ['What did Pavan do in his internship?', 'Is Pavan open to new opportunities?', 'How do I contact Pavan?'],
  contact:    ['What roles is Pavan looking for?', "What's Pavan's LinkedIn?", "Can I see Pavan's resume?"],
  education:  ['What is Pavan studying?', 'When does Pavan graduate?', 'What projects has Pavan built?'],
  default:    ["Tell me about Pavan's projects", "What are Pavan's skills?", 'How do I contact Pavan?'],
};

function addSmartSuggestions(reply) {
  const l = reply.toLowerCase();
  let set = SUGGESTIONS.default;
  if (l.includes('project') || l.includes('sparms') || l.includes('inventoryiq') || l.includes('digit')) set = SUGGESTIONS.project;
  else if (l.includes('skill') || l.includes('python') || l.includes('sql') || l.includes('power bi')) set = SUGGESTIONS.skill;
  else if (l.includes('intern') || l.includes('interncall') || l.includes('experience')) set = SUGGESTIONS.intern;
  else if (l.includes('contact') || l.includes('email') || l.includes('hire') || l.includes('linkedin')) set = SUGGESTIONS.contact;
  else if (l.includes('education') || l.includes('mca') || l.includes('degree')) set = SUGGESTIONS.education;

  const strip = document.getElementById('suggestStrip');
  if (!strip) return;
  strip.innerHTML = set.map(s => `<button class="strip-chip">${s}</button>`).join('');
  // Auto-clear after next send
  document.getElementById('inputField')?.addEventListener('keydown', clearSuggestions, { once: true });
}

function clearSuggestions() {
  const strip = document.getElementById('suggestStrip');
  if (strip) strip.innerHTML = '';
}

function initSuggestionStrip() {
  // Pre-populate with starter chips
  const strip = document.getElementById('suggestStrip');
  if (!strip) return;
  const starters = ['What projects has Pavan built?', "What are Pavan's skills?", 'Is Pavan available for hire?'];
  strip.innerHTML = starters.map(s => `<button class="strip-chip">${s}</button>`).join('');
}

/* ═══════════════════════
   DOM HELPERS
═══════════════════════ */
function appendMsg(role, html) {
  const body = document.getElementById('messages');
  const wrap = document.createElement('div');
  wrap.className = `msg msg--${role}`;
  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });

  if (role === 'user') {
    wrap.innerHTML = `
      <div class="msg-content">
        <div class="bubble bubble--user">${html}</div>
        <div class="msg-time">${time}</div>
      </div>`;
  } else if (role === 'error') {
    wrap.innerHTML = `<div class="bubble bubble--error">${html}</div>`;
  } else {
    wrap.innerHTML = `
      <div class="msg-avatar"><span>C</span></div>
      <div class="msg-content">
        <div class="bubble bubble--assistant">${html}</div>
        <div class="msg-time">${time}</div>
      </div>`;
  }

  body.appendChild(wrap);
  body.scrollTop = body.scrollHeight;
  return wrap;
}

function appendTyping() {
  const id   = 'ty-' + Date.now();
  const body = document.getElementById('messages');
  const wrap = document.createElement('div');
  wrap.className = 'msg msg--assistant'; wrap.id = id;
  wrap.innerHTML = `
    <div class="msg-avatar"><span>C</span></div>
    <div class="bubble bubble--assistant"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
  body.appendChild(wrap);
  body.scrollTop = body.scrollHeight;
  return id;
}
function removeTyping(id) { document.getElementById(id)?.remove(); }

/* Word-by-word typing effect */
async function typeMessage(html) {
  const body = document.getElementById('messages');
  const wrap = document.createElement('div');
  wrap.className = 'msg msg--assistant';
  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
  wrap.innerHTML = `
    <div class="msg-avatar"><span>C</span></div>
    <div class="msg-content">
      <div class="bubble bubble--assistant" id="_tb"></div>
      <div class="msg-time">${time}</div>
    </div>`;
  body.appendChild(wrap);
  body.scrollTop = body.scrollHeight;

  const bubble = document.getElementById('_tb');
  bubble?.removeAttribute('id');
  if (!bubble) return;

  // Strip tags for typing animation
  const plain = html.replace(/<[^>]+>/g, '');
  const words = plain.split(' ');
  let built = '';
  for (let i = 0; i < words.length; i++) {
    built += (i === 0 ? '' : ' ') + words[i];
    bubble.textContent = built;
    body.scrollTop = body.scrollHeight;
    await sleep(55);
  }
  bubble.innerHTML = html;
  body.scrollTop = body.scrollHeight;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

function escapeHTML(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function formatReply(text) {
  text = text.replace(/[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
  return text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/(https?:\/\/[^\s<]+)/g,'<a href="$1" target="_blank" rel="noopener">$1</a>')
    .replace(/\n\n/g,'</p><p>')
    .replace(/\n/g,'<br>');
}

function showToast(msg) {
  const wrap = document.getElementById('toastWrap');
  if (!wrap) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  wrap.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, 2400);
}
