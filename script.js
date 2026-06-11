/* ═══════════════════════════════════════════════════
   CANDY AI v2 — script.js
   Pavan Kalyan · Deep Space Portfolio Agent
═══════════════════════════════════════════════════ */

'use strict';

/* ── Config ── */
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
- MCA — JNTUA, Anantapur (2025 to 2027, currently pursuing). Focus: Data Analytics, Database Management, Business Intelligence
- BSc MSCS — St. Joseph Degree College, Rayalaseema University, Kurnool (2021 to 2024)

Internship:
- Data Science Intern at Interncall, Kurnool (Jan to Apr 2024)
- Applied Python for data cleaning, EDA, and building ML models to solve real-world problems
- Worked with Matplotlib and Seaborn to present insights effectively to stakeholders
- Gained hands-on experience across the end-to-end data science project lifecycle
- Stack: Python, Pandas, Scikit-learn, Matplotlib, Seaborn

Skills:
- SQL 90%, Excel 88%, Python 85%, Java 70%
- Power BI 85%, Matplotlib 80%, Seaborn 80%, Plotly 75%
- Pandas 85%, NumPy 80%, Scikit-learn 75%, TensorFlow 70%
- HTML 85%, CSS 80%, JavaScript 70%
- Tools: Streamlit, OpenCV, JDBC, Maven, iText PDF, ZXing, GitHub

Projects:
1. SPARMS — Java Swing desktop app for academic result management. Role-based dashboards (Admin, Faculty, Student), OMR scanning, automated grade computation, MySQL with JDBC, PDF export. Stack: Java Swing, MySQL, JDBC, Maven, iText, ZXing.
2. InventoryIQ — Streamlit inventory analytics dashboard. Secure login, product management, audit logs, CSV export. Live: inventoryiq-e-commerce-inventory-analytics-system-lqpsn7qy8hhd.streamlit.app. GitHub: github.com/kalyan-91/InventoryIQ-E-commerce-Inventory-Analytics-System
3. Digit Recognizer — CNN app recognizing handwritten digits 0-9 on interactive canvas. Live: hand-written-digit-recognition-xp9dvpheswt6zju8xpknxn.streamlit.app. GitHub: github.com/kalyan-91/Hand-Written-Digit-Recognition
4. Netflix Dashboard — Power BI dashboard exploring 5000+ titles, genres, durations, countries. GitHub: github.com/kalyan-91/Netflix-PowerBI-Dashboard
5. Employee Attrition Analysis — ML classification models plus Power BI dashboard for HR analytics. GitHub: github.com/kalyan-91/EmployeeAttritionAndEngagementAnalysis
6. Zomato Analysis — Restaurant rating pattern analysis and predictive classification. GitHub: github.com/kalyan-91/Zomato_Restaurant_Analysis_And_Predictive_Analysis

Portfolio features:
- Project filter buttons (All, Java, Analytics, ML, Visualization)
- Announcement bar with scrolling text
- Horizontally scrolling tech stack wall in Skills section
- Before/After Data Cleaning Slider — Coming Soon
- Scroll Driven Data Story — Coming Soon
- Resume updated June 2025 available for download

== RESPONSE RULES ==
- Never use emojis.
- Vary openers — never start every message the same way.
- If asked about a project with a live link, always share it.
- For contact questions share email and LinkedIn.
- After 2 to 3 messages naturally ask visitor name and email for Pavan to follow up.
- If visitor seems like a recruiter, mention Pavan is actively looking for internships and entry-level Data Analyst roles.
- Never say "As an AI language model".
- If asked about coming soon features, explain the Before/After slider and Scroll Driven Data Story.`;

/* ── State ── */
let chatHistory   = [];
let isListening   = false;
let isSpeaking    = false;
let voiceEnabled  = true;
let recognition   = null;
let currentUtter  = null;
let inactivityTimer = null;

/* ── DOM refs ── */
const $ = id => document.getElementById(id);

/* ════════════════════════════════
   INIT
════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initParticles();
  initQR();
  initChat();
  initSidebar();
  initVoice();
  appendWelcome();
  resetInactivityTimer();
});

/* ════════════════════════════════
   STARS CANVAS
════════════════════════════════ */
function initStars() {
  const canvas = $('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = Math.min(180, Math.floor(window.innerWidth * window.innerHeight / 5000));
  const stars = Array.from({ length: COUNT }, () => ({
    x: Math.random(), y: Math.random(),
    r: Math.random() * 1.3 + 0.2,
    alpha: Math.random() * 0.65 + 0.15,
    hue: [220,240,260,195,42][Math.floor(Math.random()*5)],
    sat: Math.random() > 0.4 ? 80 : 15,
    tw: Math.random() * Math.PI * 2,
    twS: Math.random() * 0.022 + 0.004,
    vx: (Math.random() - 0.5) * 0.08,
    vy: (Math.random() - 0.5) * 0.08,
  }));

  const shooters = [];
  setInterval(() => {
    if (Math.random() < 0.5) {
      shooters.push({
        x: Math.random() * W * 0.7, y: Math.random() * H * 0.3,
        len: Math.random() * 100 + 50,
        speed: Math.random() * 7 + 4,
        angle: Math.PI/4 + (Math.random()-0.5)*0.5,
        life: 1,
      });
    }
  }, 4000);

  let mx = W/2, my = H/2;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function tick() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.tw += s.twS;
      const a = s.alpha * (0.6 + 0.4 * Math.sin(s.tw));
      const px = s.x * W + (mx - W/2) * s.r * 0.002;
      const py = s.y * H + (my - H/2) * s.r * 0.002;

      if (s.r > 0.9) {
        const g = ctx.createRadialGradient(px,py,0,px,py,s.r*4);
        g.addColorStop(0, `hsla(${s.hue},${s.sat}%,80%,${a*0.25})`);
        g.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(px,py,s.r*4,0,Math.PI*2);
        ctx.fillStyle = g; ctx.fill();
      }
      ctx.beginPath(); ctx.arc(px,py,s.r,0,Math.PI*2);
      ctx.fillStyle = `hsla(${s.hue},${s.sat}%,85%,${a})`;
      ctx.fill();

      s.x += s.vx/W; s.y += s.vy/H;
      if (s.x<0) s.x=1; if (s.x>1) s.x=0;
      if (s.y<0) s.y=1; if (s.y>1) s.y=0;
    });

    for (let i = shooters.length-1; i >= 0; i--) {
      const sh = shooters[i];
      sh.x += Math.cos(sh.angle)*sh.speed;
      sh.y += Math.sin(sh.angle)*sh.speed;
      sh.life -= 0.02;
      if (sh.life <= 0) { shooters.splice(i,1); continue; }
      const tx = sh.x - Math.cos(sh.angle)*sh.len;
      const ty = sh.y - Math.sin(sh.angle)*sh.len;
      const g = ctx.createLinearGradient(tx,ty,sh.x,sh.y);
      g.addColorStop(0,'transparent');
      g.addColorStop(0.7,`rgba(167,139,250,${sh.life*0.4})`);
      g.addColorStop(1,`rgba(255,255,255,${sh.life*0.9})`);
      ctx.beginPath(); ctx.moveTo(tx,ty); ctx.lineTo(sh.x,sh.y);
      ctx.strokeStyle=g; ctx.lineWidth=sh.life*1.8; ctx.stroke();
    }
    requestAnimationFrame(tick);
  }
  tick();
}

/* ════════════════════════════════
   FLOATING PARTICLES
════════════════════════════════ */
function initParticles() {
  const wrap = $('particles');
  if (!wrap) return;
  const colors = ['#00d4ff','#a78bfa','#fbbf24','#7dd3fc'];

  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random()*100}%;
      width: ${Math.random()*3+1}px;
      height: ${Math.random()*3+1}px;
      background: ${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration: ${Math.random()*20+15}s;
      animation-delay: ${Math.random()*15}s;
      opacity: 0;
    `;
    wrap.appendChild(p);
  }
}

/* ════════════════════════════════
   QR CODE
════════════════════════════════ */
function initQR() {
  const el = $('qrCode');
  if (!el || typeof QRCode === 'undefined') return;
  new QRCode(el, {
    text: 'https://kalyanfinity-portfolio.netlify.app',
    width: 100, height: 100,
    colorDark: '#0369A1',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
  });
}

/* ════════════════════════════════
   SIDEBAR (mobile)
════════════════════════════════ */
function initSidebar() {
  const sidebar  = $('sidebar');
  const menuBtn  = $('menuBtn');
  const closeBtn = $('sidebarClose');
  const backdrop = $('backdrop');

  function open() {
    sidebar.classList.add('open');
    backdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('show');
    document.body.style.overflow = '';
  }

  menuBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);

  // Quick ask buttons
  $('quickAskList')?.addEventListener('click', e => {
    const btn = e.target.closest('.quick-ask');
    if (btn) {
      $('inputField').value = btn.dataset.q;
      if (window.innerWidth <= 820) close();
      submitMessage();
    }
  });
}

/* ════════════════════════════════
   VOICE TOGGLE
════════════════════════════════ */
function initVoice() {
  const btn    = $('voiceToggle');
  const status = $('voiceStatus');
  if (!btn) return;

  updateVoiceUI();
  btn.addEventListener('click', () => {
    voiceEnabled = !voiceEnabled;
    if (!voiceEnabled) stopSpeaking();
    updateVoiceUI();
    showToast(voiceEnabled ? 'Voice on' : 'Voice off');
  });

  function updateVoiceUI() {
    btn.classList.toggle('active', voiceEnabled);
    btn.innerHTML = voiceEnabled
      ? '<i class="fas fa-volume-up"></i>'
      : '<i class="fas fa-volume-xmark"></i>';
    if (status) {
      status.textContent = voiceEnabled ? 'Voice on' : 'Voice off';
      status.className = 'voice-status' + (voiceEnabled ? ' active' : '');
    }
  }
}

/* ════════════════════════════════
   CHAT INIT
════════════════════════════════ */
function initChat() {
  const input    = $('inputField');
  const sendBtn  = $('sendBtn');
  const clearBtn = $('clearBtn');
  const micBtn   = $('micBtn');

  sendBtn?.addEventListener('click', submitMessage);

  clearBtn?.addEventListener('click', () => {
    chatHistory = [];
    $('messages').innerHTML = '';
    $('suggestStrip').innerHTML = '';
    appendWelcome();
    showToast('New chat started');
  });

  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitMessage();
    }
  });

  input?.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    const left = 500 - input.value.length;
    const cc = $('charCount');
    if (cc) {
      cc.textContent = left;
      cc.className = 'char-count' + (left < 50 ? ' danger' : left < 150 ? ' warn' : '');
    }
    resetInactivityTimer();
  });

  // Message area chip clicks
  $('messages')?.addEventListener('click', e => {
    const chip = e.target.closest('.welcome-chip, .sugg-chip');
    if (chip) { input.value = chip.dataset.q || chip.textContent; submitMessage(); }
  });

  // Suggestions strip chip clicks
  $('suggestStrip')?.addEventListener('click', e => {
    const chip = e.target.closest('.sugg-chip');
    if (chip) { input.value = chip.dataset.q; submitMessage(); }
  });

  // Mic
  setupRecognition();
  micBtn?.addEventListener('click', () => {
    if (isListening) stopListening();
    else startListening();
  });
}

/* ════════════════════════════════
   WELCOME MESSAGE
════════════════════════════════ */
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
  const chipsHTML = `<div class="welcome-chips">${
    chips.map(c => `<button class="welcome-chip" data-q="${c.q}">${c.label}</button>`).join('')
  }</div>`;

  appendMessage('assistant',
    `${greeting}! I am <strong>Candy</strong>, Pavan's personal AI. Ask me anything about his projects, skills, or experience.${chipsHTML}`
  );
}

/* ════════════════════════════════
   SUBMIT MESSAGE
════════════════════════════════ */
async function submitMessage() {
  const input = $('inputField');
  const text  = input.value.trim();
  if (!text) return;

  // Clear input
  input.value = '';
  input.style.height = 'auto';
  const cc = $('charCount');
  if (cc) cc.textContent = '500';

  // Clear suggestions
  const strip = $('suggestStrip');
  if (strip) strip.innerHTML = '';

  stopListening();
  appendMessage('user', escapeHTML(text));
  chatHistory.push({ role: 'user', content: text });

  const typingId = appendTyping();
  const sendBtn  = $('sendBtn');
  if (sendBtn) sendBtn.disabled = true;

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
        top_p: 0.9,
        stream: false,
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data  = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim()
      || 'I got an empty response. Please try again.';

    removeTyping(typingId);
    await typeMessage(formatReply(reply));
    chatHistory.push({ role: 'assistant', content: reply });

    speak(reply);
    addSmartSuggestions(reply);
    autoScrollToSection(text);
    resetInactivityTimer();

    if (chatHistory.length > 40) chatHistory = chatHistory.slice(-40);

  } catch (err) {
    removeTyping(typingId);
    appendMessage('error', `Connection error: ${escapeHTML(err.message)}`);
  } finally {
    if (sendBtn) sendBtn.disabled = false;
    input.focus();
  }
}

/* ════════════════════════════════
   TYPING EFFECT
════════════════════════════════ */
async function typeMessage(html) {
  const msgs = $('messages');
  const wrap = document.createElement('div');
  wrap.className = 'msg msg--assistant';
  wrap.innerHTML = `
    <div class="msg-avatar">C</div>
    <div class="msg-content">
      <div class="bubble bubble--assistant" id="tbNew"></div>
      <div class="msg-meta">
        <span class="msg-time">${getTime()}</span>
      </div>
    </div>`;
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;

  const bubble = wrap.querySelector('#tbNew');
  bubble.removeAttribute('id');

  const plain = html.replace(/<[^>]+>/g, '');
  const words = plain.split(' ');
  let out = '';
  for (let i = 0; i < words.length; i++) {
    out += (i === 0 ? '' : ' ') + words[i];
    bubble.textContent = out;
    msgs.scrollTop = msgs.scrollHeight;
    await sleep(55);
  }
  bubble.innerHTML = html;
  msgs.scrollTop = msgs.scrollHeight;
}

/* ════════════════════════════════
   SMART SUGGESTIONS
════════════════════════════════ */
function addSmartSuggestions(reply) {
  const strip = $('suggestStrip');
  if (!strip) return;
  const lower = reply.toLowerCase();
  let suggs = [];

  if (lower.includes('project') || lower.includes('sparms') || lower.includes('inventoryiq') || lower.includes('digit')) {
    suggs = ['Which project is most impressive?', 'Does Pavan have live projects?', 'What tech stack does Pavan use?'];
  } else if (lower.includes('skill') || lower.includes('python') || lower.includes('sql') || lower.includes('power bi')) {
    suggs = ["What is Pavan's strongest skill?", 'Does Pavan know machine learning?', 'What tools does Pavan use daily?'];
  } else if (lower.includes('intern') || lower.includes('experience') || lower.includes('interncall')) {
    suggs = ['What did Pavan do in his internship?', 'Is Pavan open to opportunities?', 'How do I contact Pavan?'];
  } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('reach')) {
    suggs = ['What roles is Pavan looking for?', "Can I see Pavan's resume?", "Visit Pavan's portfolio"];
  } else if (lower.includes('education') || lower.includes('mca') || lower.includes('degree')) {
    suggs = ['What is Pavan studying?', 'When does Pavan graduate?', "What projects has Pavan built?"];
  } else {
    suggs = ["Tell me about Pavan's projects", "What are Pavan's skills?", 'How do I contact Pavan?'];
  }

  strip.innerHTML = suggs.map(s =>
    `<button class="sugg-chip" data-q="${s}">${s}</button>`
  ).join('');
}

/* ════════════════════════════════
   AUTO SCROLL TO SECTION
════════════════════════════════ */
function autoScrollToSection(text) {
  const lower = text.toLowerCase();
  const map = {
    projects:    ['project','sparms','inventoryiq','digit','netflix','zomato','attrition'],
    skills:      ['skill','python','sql','power bi','tech stack','pandas'],
    education:   ['education','mca','degree','university','study'],
    experience:  ['experience','intern','interncall','work'],
    contact:     ['contact','email','hire','reach','whatsapp','linkedin'],
  };

  for (const [id, keys] of Object.entries(map)) {
    if (keys.some(k => lower.includes(k))) {
      const section = document.getElementById(id) ||
                      document.querySelector(`[data-section="${id}"]`);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 900);
      }
      break;
    }
  }
}

/* ════════════════════════════════
   INACTIVITY MESSAGE
════════════════════════════════ */
const INACTIVITY_MSGS = [
  "Still there? Feel free to ask me anything about Pavan!",
  "Not sure what to ask? Try \"What projects has Pavan built?\" or \"How do I contact him?\"",
  "I am here whenever you need. Ask about Pavan's skills, projects, or experience!",
];

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  const chat = document.querySelector('.chat');
  if (!chat) return;
  inactivityTimer = setTimeout(() => {
    const msg = INACTIVITY_MSGS[Math.floor(Math.random() * INACTIVITY_MSGS.length)];
    appendMessage('assistant', msg);
    addSmartSuggestions(msg);
  }, 120000);
}

document.addEventListener('mousemove', resetInactivityTimer, { passive: true });
document.addEventListener('keydown',   resetInactivityTimer, { passive: true });

/* ════════════════════════════════
   DOM HELPERS
════════════════════════════════ */
function appendMessage(role, html) {
  const msgs = $('messages');
  const wrap = document.createElement('div');
  wrap.className = `msg msg--${role}`;
  const time = getTime();

  if (role === 'user') {
    wrap.innerHTML = `
      <div class="msg-content" style="align-items:flex-end">
        <div class="bubble bubble--user">${html}</div>
        <div class="msg-meta" style="justify-content:flex-end">
          <span class="msg-time">${time}</span>
        </div>
      </div>`;
  } else if (role === 'error') {
    wrap.innerHTML = `<div class="bubble bubble--error">${html}</div>`;
  } else {
    wrap.innerHTML = `
      <div class="msg-avatar">C</div>
      <div class="msg-content">
        <div class="bubble bubble--assistant">${html}</div>
        <div class="msg-meta">
          <span class="msg-time">${time}</span>
        </div>
      </div>`;
  }

  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
  return wrap;
}

function appendTyping() {
  const id   = 'typing-' + Date.now();
  const msgs = $('messages');
  const wrap = document.createElement('div');
  wrap.id = id;
  wrap.className = 'msg msg--assistant';
  wrap.innerHTML = `
    <div class="msg-avatar">C</div>
    <div class="msg-content">
      <div class="bubble bubble--assistant">
        <div class="typing-wrap">
          <div class="typing-dots"><span></span><span></span><span></span></div>
          <span class="typing-label">thinking</span>
        </div>
      </div>
    </div>`;
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
  return id;
}

function removeTyping(id) { $(id)?.remove(); }

function getTime() {
  return new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata'
  });
}

function escapeHTML(str) {
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;');
}

function formatReply(text) {
  text = text.replace(/[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
  return text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/\n\n/g,'</p><p>')
    .replace(/\n/g,'<br>');
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ════════════════════════════════
   TOAST
════════════════════════════════ */
function showToast(msg, duration = 2500) {
  const wrap = $('toastWrap');
  if (!wrap) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(6px)';
    t.style.transition = 'all 0.3s ease';
    setTimeout(() => t.remove(), 350);
  }, duration);
}

/* ════════════════════════════════
   SPEECH RECOGNITION
════════════════════════════════ */
function setupRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;

  recognition = new SR();
  recognition.continuous    = false;
  recognition.interimResults = true;
  recognition.lang          = 'en-IN';

  recognition.onstart  = () => { isListening = true;  updateMicUI(true); };
  recognition.onend    = () => { isListening = false; updateMicUI(false); };
  recognition.onerror  = e  => {
    stopListening();
    if (e.error === 'not-allowed') showToast('Microphone access denied');
  };
  recognition.onresult = e => {
    const t = Array.from(e.results).map(r => r[0].transcript).join('');
    $('inputField').value = t;
    if (e.results[e.results.length - 1].isFinal) {
      setTimeout(submitMessage, 400);
    }
  };
}

function startListening() {
  if (!recognition) { showToast('Voice input not supported in this browser'); return; }
  stopSpeaking();
  try { recognition.start(); } catch(e) {}
}

function stopListening() {
  if (recognition && isListening) recognition.stop();
  isListening = false;
  updateMicUI(false);
}

function updateMicUI(active) {
  const btn = $('micBtn');
  if (!btn) return;
  btn.classList.toggle('listening', active);
  btn.title = active ? 'Listening — click to stop' : 'Speak';
}

/* ════════════════════════════════
   SPEECH SYNTHESIS
════════════════════════════════ */
if (window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener('voiceschanged', () => {});
}

function speak(text) {
  if (!voiceEnabled || !window.speechSynthesis) return;
  const clean = text.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
  if (!clean) return;

  stopSpeaking();
  currentUtter         = new SpeechSynthesisUtterance(clean);
  currentUtter.lang    = 'en-US';
  currentUtter.rate    = 1.0;
  currentUtter.pitch   = 1.0;
  currentUtter.volume  = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const v =
    voices.find(v => v.name.includes('Google US English')) ||
    voices.find(v => v.lang === 'en-US' && !v.localService) ||
    voices.find(v => v.lang.startsWith('en-'));
  if (v) currentUtter.voice = v;

  const status = $('voiceStatus');
  currentUtter.onstart = () => { isSpeaking = true;  if (status) { status.textContent='Speaking…'; status.className='voice-status speaking'; } };
  currentUtter.onend   = () => { isSpeaking = false; if (status) { status.textContent='Voice on';  status.className='voice-status active'; } };
  currentUtter.onerror = () => { isSpeaking = false; };

  setTimeout(() => window.speechSynthesis.speak(currentUtter), 100);
}

function stopSpeaking() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  isSpeaking = false;
}
