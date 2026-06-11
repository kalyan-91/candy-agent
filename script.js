/* ═══════════════════════════════════════════════
   CANDY AI — Pavan's Personal Assistant
   ═══════════════════════════════════════════════ */

const GROQ_ENDPOINT = 'https://pk-groq-proxy.daroorpavankalyan.workers.dev';
const GROQ_MODEL    = 'llama-3.3-70b-versatile';

// ── Pavan's knowledge base (system prompt) ──
const SYSTEM_PROMPT = `You are Candy, the personal AI assistant for Pavan Kalyan Daroor — a passionate MCA student and aspiring data scientist at JNTUA, Anantapur, Andhra Pradesh.

You know everything about Pavan. Be warm, enthusiastic, concise, and professional.

ABOUT PAVAN:
- Full name: Daroor Pavan Kalyan
- MCA student at JNTUA, Anantapur (2023–2025)
- Bachelor's in Computer Science
- Data Science Intern at Interncall (internship experience)
- Location: Kurnool / Anantapur, Andhra Pradesh, India

SKILLS:
- Programming: Python, JavaScript, Java, SQL
- Data Science & ML: Pandas, NumPy, Scikit-learn, TensorFlow, Matplotlib, Seaborn
- Web Dev: React, Vite, HTML5, CSS3, Node.js, Express
- Tools: Git, GitHub, MySQL, PostgreSQL, Jupyter Notebook
- AI/LLM: Anthropic Claude API, Groq API, Web Speech API
- Other: Framer Motion, Tailwind CSS, REST APIs

PROJECTS:
1. Portfolio Website — Full-stack React + Vite portfolio with dark theme, glassmorphism, Framer Motion animations, 3D flip project cards, scroll-spy navbar, Formspree contact form. Live: https://kalyanfinity-portfolio.netlify.app
2. AURA AI Companion — Single-file personal productivity + AI companion web app. Features: Claude API-powered chat, live YouTube/Spotify embeds, Web Speech API voice commands, health/goal/task tracking with localStorage persistence, study timer.
3. CLONEBOT Reminder System — Full-stack AI-powered reminder app with OpenAI/Claude API-generated messages, Twilio SMS/call delivery, browser voice synthesis, personality modes, smart escalation, per-user email-based login with localStorage-isolated data.
4. Candy AI — This very assistant! A beautifully designed AI chatbot built with Groq AI, featuring voice input, quick asks, suggestions, and full chat history.
5. SPARMS — Student Performance Analysis and Result Management System (Java Swing desktop app) for MCA Department with data analytics features.

EXPERIENCE:
- Data Science Intern at Interncall — worked on data analysis, ML model building, Python data pipelines, and visualization projects.

CONTACT:
- Email: daroorpavankalyan@gmail.com
- GitHub: https://github.com/kalyan-91
- LinkedIn: https://linkedin.com/in/daroor-pavan-kalyan-370277253/
- WhatsApp: +91 8919944203
- Portfolio: https://kalyanfinity-portfolio.netlify.app

AVAILABILITY:
Pavan is actively seeking full-time roles and freelance opportunities in Data Science, Machine Learning, and Full-Stack Web Development. He's open to remote or hybrid positions.

PERSONALITY NOTES:
- Ambitious and hands-on builder who creates polished, feature-rich apps
- Strong interest in AI/ML and creative web applications
- Fast learner, team player, passionate about UI/UX

When responding:
- Be concise and friendly, use bullet points for lists
- Format project names in bold
- Always mention the portfolio link when relevant
- Use markdown: **bold** for emphasis, bullet points for lists`;

// ── Chat history ──
let messages = [];
let voiceEnabled = true;
let speechSynth = window.speechSynthesis;
let isSpeaking = false;
let recognition = null;
let isListening = false;

// ── DOM refs ──
const msgList = document.getElementById('messages');
const inputField = document.getElementById('inputField');
const sendBtn = document.getElementById('sendBtn');
const micBtn = document.getElementById('micBtn');
const clearBtn = document.getElementById('clearBtn');
const voiceToggle = document.getElementById('voiceToggle');
const charCount = document.getElementById('charCount');
const suggestStrip = document.getElementById('suggestStrip');
const voiceStatus = document.getElementById('voiceStatus');
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebarClose');
const backdrop = document.getElementById('backdrop');
const toastWrap = document.getElementById('toastWrap');

// ── Stars canvas ──
(function initStars() {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    const count = Math.floor((W * H) / 5000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random(),
        da: (Math.random() - 0.5) * 0.005,
        speed: Math.random() * 0.15 + 0.05,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.a += s.da;
      if (s.a <= 0 || s.a >= 1) s.da *= -1;
      s.y -= s.speed;
      if (s.y < -5) { s.y = H + 5; s.x = Math.random() * W; }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 220, 255, ${s.a * 0.75})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize(); createStars(); draw();
  window.addEventListener('resize', () => { resize(); createStars(); });
})();

// ── Greeting ──
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

// ── Suggestion sets ──
const SUGGESTIONS = {
  default: ['Projects', 'Skills', 'Experience', 'Hire Pavan', 'Contact info', 'Education'],
  follow: ['Tell me more', 'Show projects', 'What skills?', 'How to contact?'],
};

// ── Render suggestions strip ──
function renderSuggestions(set = 'default') {
  suggestStrip.innerHTML = '';
  const items = SUGGESTIONS[set] || SUGGESTIONS.default;
  items.forEach((label, i) => {
    const btn = document.createElement('button');
    btn.className = 'strip-chip';
    btn.textContent = label;
    btn.style.animationDelay = `${i * 0.05}s`;
    btn.addEventListener('click', () => {
      inputField.value = label.endsWith('?') ? label : `Tell me about Pavan's ${label.toLowerCase().replace('hire pavan', 'availability for hire').replace('contact info', 'contact information')}`;
      if (label === 'Hire Pavan') inputField.value = 'Is Pavan available for hire?';
      if (label === 'Contact info') inputField.value = 'How do I contact Pavan?';
      if (label === 'Projects') inputField.value = 'What projects has Pavan built?';
      if (label === 'Skills') inputField.value = "What are Pavan's strongest skills?";
      if (label === 'Experience') inputField.value = "Tell me about Pavan's internship experience";
      if (label === 'Education') inputField.value = "What is Pavan studying?";
      if (label === 'Tell me more') inputField.value = 'Can you tell me more about that?';
      if (label === 'Show projects') inputField.value = 'Show me all of Pavan\'s projects in detail';
      if (label === 'What skills?') inputField.value = 'List all of Pavan\'s technical skills';
      if (label === 'How to contact?') inputField.value = 'How can I reach Pavan?';
      sendMessage();
    });
    suggestStrip.appendChild(btn);
  });
}

// ── Welcome card ──
function showWelcome() {
  const d = document.createElement('div');
  d.className = 'msg msg--assistant';
  d.innerHTML = `
    <div class="msg-avatar"><i class="fas fa-robot"></i></div>
    <div class="msg-content">
      <div class="bubble bubble--assistant">
        <div class="welcome-card">
          <div class="welcome-card__title">${getGreeting()}! I'm <strong>Candy</strong> ✦</div>
          <div class="welcome-card__sub">
            Pavan's personal AI assistant. I know everything about him — his projects, skills, internship experience, and more.<br><br>
            Ask me anything or tap a quick question below!
          </div>
          <div class="chips-row">
            <button class="chip" onclick="quickSend('What projects has Pavan built?')">📦 Projects</button>
            <button class="chip" onclick="quickSend('What are Pavan\\'s strongest skills?')">⚡ Skills</button>
            <button class="chip" onclick="quickSend('Is Pavan available for hire?')">🤝 Hire</button>
            <button class="chip" onclick="quickSend('How do I contact Pavan?')">✉️ Contact</button>
          </div>
        </div>
      </div>
      <div class="msg-time">${getTime()}</div>
    </div>
  `;
  msgList.appendChild(d);
  scrollBottom();
}

// ── Quick send helper ──
window.quickSend = function(text) {
  inputField.value = text;
  sendMessage();
};

// ── Add message to DOM ──
function addMessage(role, text, animate = true) {
  const isUser = role === 'user';
  const wrap = document.createElement('div');
  wrap.className = `msg msg--${isUser ? 'user' : 'assistant'}`;
  if (!animate) wrap.style.animation = 'none';

  const formattedText = isUser ? escHtml(text) : formatMarkdown(text);

  wrap.innerHTML = `
    ${!isUser ? `<div class="msg-avatar"><i class="fas fa-robot"></i></div>` : ''}
    <div class="msg-content">
      <div class="bubble bubble--${isUser ? 'user' : 'assistant'}">${formattedText}</div>
      <div class="msg-time">${getTime()}</div>
    </div>
    ${isUser ? `<div class="msg-avatar" style="background:linear-gradient(135deg,#7c3aed,#00d4ff)"><i class="fas fa-user"></i></div>` : ''}
  `;

  msgList.appendChild(wrap);
  scrollBottom();
  return wrap;
}

// ── Typing indicator ──
function showTyping() {
  const wrap = document.createElement('div');
  wrap.className = 'msg msg--assistant';
  wrap.id = 'typingIndicator';
  wrap.innerHTML = `
    <div class="msg-avatar"><i class="fas fa-robot"></i></div>
    <div class="msg-content">
      <div class="bubble bubble--assistant">
        <div class="typing-dots"><span></span><span></span><span></span></div>
      </div>
    </div>
  `;
  msgList.appendChild(wrap);
  scrollBottom();
}

function hideTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

// ── Format markdown ──
function formatMarkdown(text) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/^### (.+)$/gm, '<strong style="color:var(--cyan)">$1</strong>')
    .replace(/^## (.+)$/gm, '<strong style="color:var(--cyan);font-size:1rem">$1</strong>')
    .replace(/^- (.+)$/gm, '• $1')
    .replace(/\n/g, '<br>');
}

function escHtml(t) {
  return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── Scroll ──
function scrollBottom() {
  requestAnimationFrame(() => {
    msgList.scrollTo({ top: msgList.scrollHeight, behavior: 'smooth' });
  });
}

// ── Time ──
function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ── API call (Groq/Anthropic) ──
async function callAPI(userMessage) {
  messages.push({ role: 'user', content: userMessage });

  // Call via Cloudflare Worker proxy (no key needed client-side)
  try {
    const res = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.72,
        max_tokens: 700,
      })
    });

    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "I'm having trouble connecting right now. Please try again!";
    messages.push({ role: 'assistant', content: reply });
    return reply;
  } catch (e) {
    // Fallback: smart offline responses
    return getSmartFallback(userMessage);
  }
}

// ── Smart offline fallback ──
function getSmartFallback(q) {
  const ql = q.toLowerCase();

  if (ql.includes('project') || ql.includes('built') || ql.includes('app')) {
    return `Pavan has built some really impressive projects! Here's a quick rundown:\n\n**📦 Portfolio Website** — React + Vite, dark theme, glassmorphism, Framer Motion animations. [Live here](https://kalyanfinity-portfolio.netlify.app)\n\n**🤖 AURA AI Companion** — Single-file personal AI companion with Claude API, YouTube/Spotify embeds, voice commands, and productivity tracking.\n\n**⏰ CLONEBOT Reminder System** — Full-stack AI reminder app with Twilio SMS/calls, personality modes, and smart escalation.\n\n**💬 Candy AI** — This very assistant! Powered by Groq AI with voice input, beautiful UI, and deep knowledge of Pavan.\n\n**🎓 SPARMS** — Student Performance Analysis system (Java Swing) for MCA Department data analytics.`;
  }

  if (ql.includes('skill') || ql.includes('tech') || ql.includes('know')) {
    return `Pavan's technical stack is quite broad!\n\n**Languages:** Python · JavaScript · Java · SQL\n\n**Data Science & ML:** Pandas · NumPy · Scikit-learn · TensorFlow · Matplotlib · Seaborn\n\n**Web Dev:** React · Vite · Node.js · Express · Tailwind · Framer Motion\n\n**AI/APIs:** Anthropic Claude API · Groq API · Web Speech API · Twilio\n\n**Tools:** Git · GitHub · MySQL · PostgreSQL · Jupyter Notebook`;
  }

  if (ql.includes('contact') || ql.includes('reach') || ql.includes('email') || ql.includes('hire')) {
    return `You can reach Pavan through multiple channels:\n\n📧 **Email:** daroorpavankalyan@gmail.com\n💼 **LinkedIn:** [daroor-pavan-kalyan-370277253](https://linkedin.com/in/daroor-pavan-kalyan-370277253/)\n🐙 **GitHub:** [kalyan-91](https://github.com/kalyan-91)\n📱 **WhatsApp:** +91 8919944203\n🌐 **Portfolio:** [kalyanfinity-portfolio.netlify.app](https://kalyanfinity-portfolio.netlify.app)\n\nHe's actively open to Data Science, ML, and Full-Stack Web Development roles!`;
  }

  if (ql.includes('intern') || ql.includes('experience') || ql.includes('work')) {
    return `Pavan completed a **Data Science Internship at Interncall**, where he worked on:\n\n• Building Python data pipelines and analysis scripts\n• Training and evaluating ML models\n• Creating data visualizations and reports\n• Applying real-world data science workflows\n\nThis, combined with his hands-on project building, gives him strong practical experience beyond academics!`;
  }

  if (ql.includes('study') || ql.includes('education') || ql.includes('degree') || ql.includes('college')) {
    return `Pavan is currently pursuing his **MCA (Master of Computer Applications)** at **JNTUA, Anantapur**, Andhra Pradesh (2023–2025). He completed his Bachelor's in Computer Science prior to this.\n\nHis academic focus is on data science, machine learning, and software engineering — areas he actively applies in his personal projects!`;
  }

  if (ql.includes('available') || ql.includes('freelance') || ql.includes('job') || ql.includes('opportunit')) {
    return `Yes! Pavan is **actively seeking opportunities** in:\n\n🔬 Data Science & Machine Learning\n💻 Full-Stack Web Development\n🤖 AI/LLM Integration\n\nHe's open to full-time roles, internships, and freelance projects. Remote or hybrid positions are welcome!\n\nBest way to reach him: **daroorpavankalyan@gmail.com** or his [portfolio](https://kalyanfinity-portfolio.netlify.app).`;
  }

  if (ql.includes('aura') || ql.includes('candy') || ql.includes('clonebot')) {
    return `Those are some of Pavan's most impressive AI projects!\n\n**🌟 AURA AI** — A personal companion app featuring Claude API chat, YouTube/Spotify live embeds, Web Speech API voice recognition, health/goal/task tracking, and a study timer — all in a single HTML file.\n\n**🍬 Candy AI** — That's me! A beautifully designed chatbot built to represent Pavan's portfolio and answer questions about him.\n\n**🤖 CLONEBOT** — An AI-powered reminder system with Twilio SMS/calls, voice synthesis, personality modes, and per-user data isolation.`;
  }

  return `Great question! I'm Candy — Pavan's AI assistant. I know all about his projects, skills, experience, and how to reach him.\n\nTry asking me about his **projects**, **skills**, **internship experience**, or **contact info**! 😊`;
}

// ── Send message ──
async function sendMessage() {
  const text = inputField.value.trim();
  if (!text) return;

  inputField.value = '';
  updateCharCount();
  autoResize();
  suggestStrip.innerHTML = '';

  addMessage('user', text);
  showTyping();

  try {
    const reply = await callAPI(text);
    hideTyping();
    addMessage('assistant', reply);

    if (voiceEnabled && reply) {
      speak(reply.replace(/[*_`#\[\]]/g, '').replace(/<[^>]+>/g, '').slice(0, 200));
    }

    // Show follow-up suggestions
    setTimeout(() => renderSuggestions('follow'), 400);

  } catch (err) {
    hideTyping();
    const errEl = document.createElement('div');
    errEl.className = 'msg msg--assistant';
    errEl.innerHTML = `<div class="msg-avatar"><i class="fas fa-robot"></i></div><div class="msg-content"><div class="bubble bubble--error">⚠️ Oops! Something went wrong. Please try again.</div></div>`;
    msgList.appendChild(errEl);
    scrollBottom();
  }
}

// ── Voice TTS ──
function speak(text) {
  if (!speechSynth || !voiceEnabled) return;
  speechSynth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1.05; utter.pitch = 1.0; utter.volume = 0.9;

  // Pick a nice voice
  const voices = speechSynth.getVoices();
  const preferred = voices.find(v =>
    v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')
  ) || voices[0];
  if (preferred) utter.voice = preferred;

  utter.onstart = () => isSpeaking = true;
  utter.onend = () => isSpeaking = false;
  speechSynth.speak(utter);
}

// ── Voice input (STT) ──
function initSpeechRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { micBtn.style.opacity = '0.3'; micBtn.disabled = true; return; }

  recognition = new SR();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onresult = e => {
    const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
    inputField.value = transcript;
    updateCharCount(); autoResize();
    if (e.results[e.results.length - 1].isFinal) {
      isListening = false;
      micBtn.classList.remove('listening');
    }
  };
  recognition.onerror = () => { isListening = false; micBtn.classList.remove('listening'); };
  recognition.onend = () => { isListening = false; micBtn.classList.remove('listening'); };
}

micBtn.addEventListener('click', () => {
  if (!recognition) return;
  if (isListening) { recognition.stop(); return; }
  recognition.start();
  isListening = true;
  micBtn.classList.add('listening');
  showToast('🎤 Listening…');
  if (isSpeaking) speechSynth.cancel();
});

// ── Voice toggle ──
voiceToggle.addEventListener('click', () => {
  voiceEnabled = !voiceEnabled;
  if (!voiceEnabled && isSpeaking) speechSynth.cancel();
  voiceToggle.classList.toggle('active', voiceEnabled);
  voiceStatus.textContent = voiceEnabled ? '🔊 Voice on' : '🔇 Voice off';
  showToast(voiceEnabled ? '🔊 Voice enabled' : '🔇 Voice disabled');
});

// ── Voice status click ──
voiceStatus.addEventListener('click', () => voiceToggle.click());

// ── Clear chat ──
clearBtn.addEventListener('click', () => {
  messages = [];
  msgList.innerHTML = '';
  showWelcome();
  renderSuggestions('default');
  showToast('✨ New chat started');
});

// ── Char count & auto-resize ──
function updateCharCount() {
  const remaining = 500 - inputField.value.length;
  charCount.textContent = remaining;
  charCount.classList.toggle('warn', remaining < 50);
}

function autoResize() {
  inputField.style.height = 'auto';
  inputField.style.height = Math.min(inputField.scrollHeight, 120) + 'px';
}

inputField.addEventListener('input', () => { updateCharCount(); autoResize(); });

// ── Send on enter ──
inputField.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

sendBtn.addEventListener('click', sendMessage);

// ── Quick ask buttons ──
document.querySelectorAll('.quick-ask').forEach(btn => {
  btn.addEventListener('click', () => {
    inputField.value = btn.dataset.q || '';
    sendMessage();
    if (window.innerWidth <= 768) closeSidebar();
  });
});

// ── Sidebar ──
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

menuBtn.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
backdrop.addEventListener('click', closeSidebar);

// ── Toast ──
function showToast(msg, duration = 2200) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  toastWrap.appendChild(t);
  requestAnimationFrame(() => { requestAnimationFrame(() => { t.classList.add('show'); }); });
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 350);
  }, duration);
}

// ── Touch swipe to close sidebar ──
let touchStartX = 0;
document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (dx < -60 && sidebar.classList.contains('open')) closeSidebar();
}, { passive: true });

// ── Keyboard shortcut: Escape ──
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
});

// ── Init ──
(function init() {
  initSpeechRecognition();
  showWelcome();
  renderSuggestions('default');
  inputField.focus();

  // Show welcome toast
  setTimeout(() => showToast('👋 Hey! Ask me about Pavan'), 1000);
})();
