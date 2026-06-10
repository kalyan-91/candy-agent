'use strict';

// ═══════════════════════════════════════════════════
// CANDY — Main chat page script.js
// ═══════════════════════════════════════════════════

const GROQ_MODEL    = 'llama-3.3-70b-versatile';
const GROQ_ENDPOINT = 'https://pk-groq-proxy.daroorpavankalyan.workers.dev';

const SYSTEM_PROMPT = `You are Candy — a sharp, warm, and genuinely helpful AI assistant living inside Pavan Kalyan's portfolio website. You have a real personality: curious, friendly, professionally confident, and occasionally witty. You are not a boring FAQ bot.

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
1. SPARMS — Java Swing desktop app for academic result management. Role-based dashboards for Admin, Faculty, and Students. Features OMR scanning, automated grade computation, MySQL with JDBC, and PDF export. Stack: Java Swing, MySQL, JDBC, Maven, iText, ZXing.
2. InventoryIQ — Streamlit inventory and analytics dashboard. Live: inventoryiq-e-commerce-inventory-analytics-system-lqpsn7qy8hhd.streamlit.app. Stack: Python, Streamlit, Pandas, Plotly
3. Digit Recognizer — CNN app that recognizes handwritten digits 0 through 9 on an interactive canvas. Live: hand-written-digit-recognition-xp9dvpheswt6zju8xpknxn.streamlit.app. Stack: Python, TensorFlow, Streamlit, OpenCV
4. Netflix Dashboard — Power BI dashboard exploring over 5000 titles, genres, durations, and countries. Stack: Power BI, DAX, Power Query
5. Employee Attrition Analysis — ML classification models plus a Power BI dashboard for HR analytics. Stack: Python, Scikit-learn, Power BI, Pandas
6. Zomato Analysis — Restaurant rating pattern analysis and predictive classification models. Stack: Python, Pandas, Scikit-learn, Excel

== RESPONSE RULES ==
- Never use emojis anywhere in your replies.
- Never start every message the same way. Vary your openers.
- Do not always list everything. Pick what is most relevant to the question.
- If asked about a project with a live link, always share it.
- For contact questions, share email and LinkedIn.
- Keep responses under 5 sentences unless the person clearly wants detail.
- Never say "As an AI language model". Just answer naturally.
- After 2 to 3 messages from the visitor, naturally ask for their name and email so Pavan can follow up. Do it conversationally, not like a form.
- If a visitor seems like a recruiter, mention that Pavan is actively looking for internships and entry-level Data Analyst roles.
- If you do not know something about Pavan that is not covered above, say so honestly and suggest reaching out directly.`;

// ── State ──
let chatHistory  = [];
let isListening  = false;
let recognition  = null;

// ── DOM Ready ──
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  setupRecognition();
  appendWelcome();
});

// ═══════════════════════════════
// EVENT LISTENERS
// ═══════════════════════════════
function setupEventListeners() {
  const inputField = document.getElementById('inputField');
  const sendBtn    = document.getElementById('sendBtn');
  const micBtn     = document.getElementById('micBtn');
  const messages   = document.getElementById('messages');

  // Send on button click
  sendBtn?.addEventListener('click', () => sendMessage());

  // Send on Enter (not Shift+Enter)
  inputField?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize textarea + char count
  inputField?.addEventListener('input', () => {
    inputField.style.height = 'auto';
    inputField.style.height = Math.min(inputField.scrollHeight, 120) + 'px';
    const cc = document.getElementById('charCount');
    if (cc) cc.textContent = `${inputField.value.length} / 500`;
  });

  // Mic button
  micBtn?.addEventListener('click', () => {
    if (isListening) stopListening();
    else startListening();
  });

  // Smart chips in messages
  messages?.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (chip) {
      const q = chip.dataset.q;
      if (q) handleSend(q);
    }
  });
}

function sendMessage() {
  const inputField = document.getElementById('inputField');
  const text = inputField?.value.trim();
  if (!text) return;
  inputField.value = '';
  inputField.style.height = 'auto';
  const cc = document.getElementById('charCount');
  if (cc) cc.textContent = '0 / 500';
  handleSend(text);
}

// ═══════════════════════════════
// WELCOME
// ═══════════════════════════════
function appendWelcome() {
  const hour = new Date().getHours();
  let greeting;
  if (hour >= 5  && hour < 12) greeting = 'Good morning';
  else if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  else if (hour >= 17 && hour < 21) greeting = 'Good evening';
  else greeting = 'Hey, night owl';

  const chips = [
    { label: 'Projects',   q: "What projects has Pavan built?" },
    { label: 'Skills',     q: "What are Pavan's strongest skills?" },
    { label: 'Experience', q: "Tell me about Pavan's internship experience" },
    { label: 'Hire',       q: "I am interested in hiring Pavan, how do I reach him?" },
  ];
  const chipsHTML = `<div class="chips-row">${chips.map(c =>
    `<button class="chip" data-q="${c.q}">${c.label}</button>`
  ).join('')}</div>`;

  appendMessage('assistant',
    `${greeting}! I am <strong>Candy</strong>, Pavan's personal AI assistant. Ask me anything about his work, skills, or how to get in touch.${chipsHTML}`
  );
}

// ═══════════════════════════════
// MAIN SEND
// ═══════════════════════════════
async function handleSend(text) {
  stopListening();
  appendMessage('user', escapeHTML(text));
  chatHistory.push({ role: 'user', content: text });

  const typingId = appendTyping();

  try {
    const response = await fetch(GROQ_ENDPOINT, {
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

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `HTTP ${response.status}`);
    }

    const data  = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || 'I got an empty response. Please try again.';

    removeTyping(typingId);
    appendMessage('assistant', formatReply(reply));
    chatHistory.push({ role: 'assistant', content: reply });

    if (chatHistory.length > 40) chatHistory = chatHistory.slice(-40);

  } catch (err) {
    removeTyping(typingId);
    appendMessage('error', `Something went wrong: ${escapeHTML(err.message)}`);
    console.error('[Candy]', err);
  }
}

// ═══════════════════════════════
// SPEECH RECOGNITION
// ═══════════════════════════════
function setupRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;
  recognition = new SR();
  recognition.continuous     = false;
  recognition.interimResults = true;
  recognition.lang           = 'en-IN';

  recognition.onstart  = () => { isListening = true;  updateMicUI(true);  };
  recognition.onend    = () => { isListening = false; updateMicUI(false); };
  recognition.onerror  = e  => {
    stopListening();
    if (e.error === 'not-allowed') showToast('Microphone access denied');
  };
  recognition.onresult = e => {
    const t = Array.from(e.results).map(r => r[0].transcript).join('');
    const inputField = document.getElementById('inputField');
    if (inputField) {
      inputField.value = t;
      inputField.dispatchEvent(new Event('input'));
    }
    if (e.results[e.results.length - 1].isFinal) {
      setTimeout(() => sendMessage(), 400);
    }
  };
}

function startListening() {
  if (!recognition) { showToast('Voice input not supported in this browser'); return; }
  try { recognition.start(); } catch(e) { console.warn(e); }
}

function stopListening() {
  if (recognition && isListening) recognition.stop();
  isListening = false;
  updateMicUI(false);
}

function updateMicUI(active) {
  const micBtn = document.getElementById('micBtn');
  if (!micBtn) return;
  micBtn.classList.toggle('listening', active);
  micBtn.title = active ? 'Listening — click to stop' : 'Click to speak';
}

// ═══════════════════════════════
// DOM HELPERS
// ═══════════════════════════════
function appendMessage(role, html) {
  const body = document.getElementById('messages');
  const wrap = document.createElement('div');
  wrap.className = `msg msg--${role}`;

  const time = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata'
  });

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
  const id   = 'typing-' + Date.now();
  const body = document.getElementById('messages');
  const wrap = document.createElement('div');
  wrap.className = 'msg msg--assistant';
  wrap.id = id;
  wrap.innerHTML = `
    <div class="msg-avatar"><span>C</span></div>
    <div class="bubble bubble--assistant">
      <div class="typing-dots"><span></span><span></span><span></span></div>
    </div>`;
  body.appendChild(wrap);
  body.scrollTop = body.scrollHeight;
  return id;
}

function removeTyping(id) { document.getElementById(id)?.remove(); }

function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function formatReply(text) {
  // Strip emojis
  text = text.replace(/[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
  return text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/\n\n/g,'</p><p>')
    .replace(/\n/g,'<br>');
}

function showToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed; bottom:90px; left:50%; transform:translateX(-50%);
    background:rgba(0,212,255,0.15); border:1px solid rgba(0,212,255,0.3);
    color:#7dd3fc; padding:8px 18px; border-radius:100px;
    font-family:'Syne',sans-serif; font-size:0.8rem;
    z-index:9999; opacity:0; transition:opacity 0.3s;
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.style.opacity = '1', 10);
  setTimeout(() => {
    t.style.opacity = '0';
    setTimeout(() => t.remove(), 400);
  }, 2500);
}
