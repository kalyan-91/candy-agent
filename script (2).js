'use strict';

/* ══════════════════════════════════════════
   CANDY — AI Agent JavaScript
   Pavan Kalyan Portfolio Agent
   ══════════════════════════════════════════ */

const GROQ_ENDPOINT = 'https://pk-groq-proxy.daroorpavankalyan.workers.dev';
const GROQ_MODEL    = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are Candy — a sharp, warm, and genuinely helpful AI assistant representing Pavan Kalyan's portfolio. You have a real personality: curious, friendly, professionally confident, and occasionally witty.

Your job is to help visitors learn about Pavan — but do it like a real conversation, not a bullet-point dump. Be natural. Ask follow-up questions when relevant. Show genuine enthusiasm about his work.

Never use emojis. Keep the tone clean, professional, and conversational. Keep responses under 5 sentences unless the person clearly wants detail.

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
- MCA — JNTUA, Anantapur (2025 to 2027, currently pursuing)
- BSc MSCS — St. Joseph's Degree College, Rayalaseema University, Kurnool (2021 to 2024)

Internship:
- Data Science Intern at Interncall, Kurnool (Jan to Apr 2024)
- Applied Python for data cleaning, EDA, and building ML models
- Worked with Matplotlib and Seaborn to present insights to stakeholders
- Stack: Python, Pandas, Scikit-learn, Matplotlib, Seaborn

Skills:
- SQL 90%, Excel 88%, Python 85%, Java 70%
- Power BI 85%, Matplotlib 80%, Seaborn 80%, Plotly 75%
- Pandas 85%, NumPy 80%, Scikit-learn 75%, TensorFlow 70%
- Tools: Streamlit, OpenCV, JDBC, Maven, iText PDF, ZXing, GitHub

Projects:
1. SPARMS — Java Swing desktop app for academic result management with role-based dashboards, OMR scanning, MySQL, PDF export.
2. InventoryIQ — Streamlit inventory dashboard. Live: inventoryiq-e-commerce-inventory-analytics-system-lqpsn7qy8hhd.streamlit.app
3. Digit Recognizer — CNN handwritten digit recognition app. Live: hand-written-digit-recognition-xp9dvpheswt6zju8xpknxn.streamlit.app
4. Netflix Dashboard — Power BI dashboard analyzing 5000+ titles.
5. Employee Attrition Analysis — ML models plus Power BI dashboard for HR analytics.
6. Zomato Analysis — Restaurant rating analysis and predictive classification models.

== RESPONSE RULES ==
- Never use emojis.
- Vary your openers — never start every message the same way.
- If asked about a project with a live link, always share it.
- For contact questions share email and LinkedIn.
- After 2 to 3 messages naturally ask visitor's name and email for Pavan to follow up.
- If visitor seems like a recruiter, mention Pavan is actively looking for internships and entry-level Data Analyst roles.
- Never say "As an AI language model".`;

/* ── State ── */
let chatHistory  = [];
let isListening  = false;
let recognition  = null;

/* ── Pre-load speech voices ── */
if (window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener('voiceschanged', () => {});
}

/* ══════════════════════════════════════════
   INIT
   ══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initQR();
  initParticles();
  initFloatingOrbs();
  initChat();
  initMobileSidebar();
  appendWelcome();
});

/* ── QR Code ── */
function initQR() {
  new QRCode(document.getElementById('qrCode'), {
    text: 'https://kalyanfinity-portfolio.netlify.app',
    width: 96, height: 96,
    colorDark: '#0369A1',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
}

/* ── Star Particles (canvas) ── */
function initParticles() {
  const canvas = document.getElementById('bgCanvas');
  const ctx    = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const stars = Array.from({ length: 110 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 1.2 + 0.2,
    alpha: Math.random() * 0.55 + 0.15,
    hue: 210 + Math.random() * 70,
    twinkle: Math.random() * Math.PI * 2,
    twinkleSpeed: Math.random() * 0.018 + 0.004,
    vx: (Math.random() - 0.5) * 0.08,
    vy: (Math.random() - 0.5) * 0.08,
  }));

  function tick() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.twinkle += s.twinkleSpeed;
      const a = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${s.hue}, 70%, 80%, ${a})`;
      ctx.fill();
      s.x += s.vx; s.y += s.vy;
      if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
      if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
    });
    requestAnimationFrame(tick);
  }
  tick();
}

/* ── Floating ambient orbs (CSS divs) ── */
function initFloatingOrbs() {
  const container = document.getElementById('floatParticles');
  const colors = [
    'rgba(0,212,255,0.12)', 'rgba(139,92,246,0.10)',
    'rgba(125,211,252,0.08)', 'rgba(167,139,250,0.09)'
  ];
  for (let i = 0; i < 6; i++) {
    const orb = document.createElement('div');
    orb.className = 'float-orb';
    const size = 80 + Math.random() * 120;
    orb.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[i % colors.length]};
      animation-duration: ${18 + Math.random() * 20}s;
      animation-delay: ${Math.random() * 12}s;
    `;
    container.appendChild(orb);
  }
}

/* ══════════════════════════════════════════
   MOBILE SIDEBAR
   ══════════════════════════════════════════ */
function initMobileSidebar() {
  const sidebar    = document.getElementById('sidebar');
  const backdrop   = document.getElementById('sidebarBackdrop');
  const openBtn    = document.getElementById('mobileMenuBtn');
  const closeBtn   = document.getElementById('sidebarClose');

  function openSidebar() {
    sidebar.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtn?.addEventListener('click', openSidebar);
  closeBtn?.addEventListener('click', closeSidebar);
  backdrop?.addEventListener('click', closeSidebar);
}

/* ══════════════════════════════════════════
   CHAT INIT
   ══════════════════════════════════════════ */
function initChat() {
  const input    = document.getElementById('inputField');
  const sendBtn  = document.getElementById('sendBtn');
  const clearBtn = document.getElementById('clearBtn');
  const micBtn   = document.getElementById('micBtn');

  sendBtn.addEventListener('click', submitMessage);

  clearBtn.addEventListener('click', () => {
    chatHistory = [];
    document.getElementById('messages').innerHTML = '';
    appendWelcome();
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitMessage();
    }
  });

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    document.getElementById('charCount').textContent = `${input.value.length} / 500`;
  });

  /* Sidebar suggestion buttons */
  document.getElementById('suggestionsList').addEventListener('click', e => {
    const btn = e.target.closest('.suggestion-btn');
    if (btn) {
      input.value = btn.dataset.q;
      // Close sidebar on mobile after selecting
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('sidebarBackdrop').classList.remove('active');
      document.body.style.overflow = '';
      submitMessage();
    }
  });

  /* Chip clicks in messages */
  document.getElementById('messages').addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (chip) {
      input.value = chip.dataset.q;
      submitMessage();
    }
  });

  /* Mic */
  setupRecognition();
  micBtn.addEventListener('click', () => {
    if (isListening) stopListening();
    else startListening();
  });
}

/* ══════════════════════════════════════════
   WELCOME MESSAGE
   ══════════════════════════════════════════ */
function appendWelcome() {
  const hour = new Date().getHours();
  let greeting = 'Hey there';
  if (hour >= 5  && hour < 12) greeting = 'Good morning';
  else if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  else if (hour >= 17 && hour < 21) greeting = 'Good evening';
  else greeting = 'Hey, night owl';

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
    `${greeting}! I am <strong>Candy</strong>, Pavan's personal AI assistant. What would you like to know about him?
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">${chipsHTML}</div>`
  );
}

/* ══════════════════════════════════════════
   SUBMIT MESSAGE
   ══════════════════════════════════════════ */
async function submitMessage() {
  const input = document.getElementById('inputField');
  const text  = input.value.trim();
  if (!text) return;

  input.value = '';
  input.style.height = 'auto';
  document.getElementById('charCount').textContent = '0 / 500';

  appendMessage('user', escapeHTML(text));
  chatHistory.push({ role: 'user', content: text });

  const typingId = appendTyping();

  try {
    const res = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...chatHistory,
        ],
        max_tokens: 600,
        temperature: 0.85,
        stream: false,
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data  = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || 'I got an empty response. Please try again.';

    removeTyping(typingId);
    await typeMessage(formatReply(reply));
    chatHistory.push({ role: 'assistant', content: reply });
    speak(reply);
    addSmartChips(reply);

    if (chatHistory.length > 40) chatHistory = chatHistory.slice(-40);

  } catch (err) {
    removeTyping(typingId);
    appendMessage('error', `Something went wrong: ${escapeHTML(err.message)}`);
  }
}

/* ── Typing effect (word-by-word) ── */
async function typeMessage(html) {
  const msgs = document.getElementById('messages');
  const wrap = document.createElement('div');
  wrap.className = 'msg msg--assistant';
  wrap.innerHTML = `
    <div class="msg-avatar">C</div>
    <div class="msg-content">
      <div class="bubble bubble--assistant" id="typingBubbleNew"></div>
      <div class="msg-time">${getTime()}</div>
    </div>`;
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;

  const bubble = wrap.querySelector('#typingBubbleNew');
  bubble.removeAttribute('id');

  const plain = html.replace(/<[^>]+>/g, '');
  const words = plain.split(' ');
  let displayed = '';
  for (let i = 0; i < words.length; i++) {
    displayed += (i === 0 ? '' : ' ') + words[i];
    bubble.textContent = displayed;
    msgs.scrollTop = msgs.scrollHeight;
    await new Promise(r => setTimeout(r, 60));
  }
  bubble.innerHTML = html;
  msgs.scrollTop = msgs.scrollHeight;
}

/* ── Smart follow-up chips ── */
function addSmartChips(reply) {
  const msgs  = document.getElementById('messages');
  const lower = reply.toLowerCase();
  let suggestions = [];

  if (lower.includes('project') || lower.includes('sparms') || lower.includes('inventoryiq')) {
    suggestions = ["Which project is most impressive?", "Does Pavan have live projects?", "What tech stack does Pavan use?"];
  } else if (lower.includes('skill') || lower.includes('python') || lower.includes('sql')) {
    suggestions = ["What is Pavan's strongest skill?", "Does Pavan know machine learning?", "What tools does Pavan use daily?"];
  } else if (lower.includes('intern') || lower.includes('experience')) {
    suggestions = ["What did Pavan do in his internship?", "Is Pavan open to opportunities?", "How do I contact Pavan?"];
  } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email')) {
    suggestions = ["What roles is Pavan looking for?", "Can I see Pavan's resume?", "Visit Pavan's portfolio"];
  } else {
    suggestions = ["Tell me about Pavan's projects", "What are Pavan's skills?", "How do I contact Pavan?"];
  }

  const row = document.createElement('div');
  row.className = 'chips-row';
  row.innerHTML = suggestions.map(s =>
    `<button class="chip" data-q="${s}">${s}</button>`
  ).join('');
  msgs.appendChild(row);
  msgs.scrollTop = msgs.scrollHeight;
}

/* ══════════════════════════════════════════
   APPEND HELPERS
   ══════════════════════════════════════════ */
function appendMessage(role, html) {
  const msgs = document.getElementById('messages');
  const wrap = document.createElement('div');
  wrap.className = `msg msg--${role}`;
  const time = getTime();

  if (role === 'user') {
    wrap.innerHTML = `
      <div class="msg-content" style="align-items:flex-end">
        <div class="bubble bubble--user">${html}</div>
        <div class="msg-time">${time}</div>
      </div>`;
  } else if (role === 'error') {
    wrap.innerHTML = `<div class="bubble bubble--error">${html}</div>`;
  } else {
    wrap.innerHTML = `
      <div class="msg-avatar">C</div>
      <div class="msg-content">
        <div class="bubble bubble--assistant">${html}</div>
        <div class="msg-time">${time}</div>
      </div>`;
  }

  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
  return wrap;
}

function appendTyping() {
  const id   = 'typing-' + Date.now();
  const msgs = document.getElementById('messages');
  const wrap = document.createElement('div');
  wrap.className = 'msg msg--assistant';
  wrap.id = id;
  wrap.innerHTML = `
    <div class="msg-avatar">C</div>
    <div class="msg-content">
      <div class="bubble bubble--assistant">
        <div class="typing-dots"><span></span><span></span><span></span></div>
      </div>
    </div>`;
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
  return id;
}

function removeTyping(id) {
  document.getElementById(id)?.remove();
}

function getTime() {
  return new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata'
  });
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatReply(text) {
  // Strip emojis
  text = text.replace(/[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}]/gu, '');
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

/* ══════════════════════════════════════════
   SPEECH RECOGNITION
   ══════════════════════════════════════════ */
function setupRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;
  recognition = new SR();
  recognition.continuous     = false;
  recognition.interimResults = true;
  recognition.lang           = 'en-IN';

  recognition.onstart  = () => { isListening = true;  updateMicUI(true); };
  recognition.onend    = () => { isListening = false; updateMicUI(false); };
  recognition.onerror  = () => { stopListening(); };
  recognition.onresult = e => {
    const t = Array.from(e.results).map(r => r[0].transcript).join('');
    document.getElementById('inputField').value = t;
    if (e.results[e.results.length - 1].isFinal) {
      setTimeout(() => submitMessage(), 400);
    }
  };
}

function startListening() {
  if (!recognition) return;
  try { recognition.start(); } catch(e) {}
}

function stopListening() {
  if (recognition && isListening) recognition.stop();
  isListening = false;
  updateMicUI(false);
}

function updateMicUI(active) {
  document.getElementById('micBtn').classList.toggle('listening', active);
}

/* ══════════════════════════════════════════
   SPEECH SYNTHESIS
   ══════════════════════════════════════════ */
function speak(text) {
  if (!window.speechSynthesis) return;
  const clean = text.replace(/<[^>]+>/g, '').trim();
  if (!clean) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(clean);
  utter.lang = 'en-US';
  utter.rate = 1.0;
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find(v => v.name.includes('Google US English')) ||
            voices.find(v => v.lang === 'en-US');
  if (v) utter.voice = v;
  setTimeout(() => window.speechSynthesis.speak(utter), 100);
}
