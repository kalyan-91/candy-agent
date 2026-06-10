'use strict';

/* ═══════════════════════════════════════════════════
   CANDY v2 — script.js
   Chat + Voice + QR + Stars + Sidebar + Suggestions
═══════════════════════════════════════════════════ */

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


// ── State ──
 /* ─── SUGGESTION CHIPS ─── */
const SUGGESTIONS = [
  'What projects has Pavan built?',
  "What's Pavan's tech stack?",
  'Is Pavan open to work?',
  'Tell me about SPARMS',
  'How do I contact Pavan?',
  'What did Pavan do in his internship?',
];
 
const WELCOME_CHIPS = [
  'Projects 🚀',
  'Skills 🧠',
  'Experience 💼',
  'Contact 📬',
];
 
/* ─── STATE ─── */
let conversationHistory = [];
let voiceEnabled = true;
let isGenerating = false;
let recognition = null;
let synth = window.speechSynthesis;
let currentUtterance = null;
 
/* ─── DOM REFS ─── */
const $ = id => document.getElementById(id);
const messagesEl   = $('messages');
const inputField   = $('inputField');
const sendBtn      = $('sendBtn');
const micBtn       = $('micBtn');
const clearBtn     = $('clearBtn');
const voiceToggle  = $('voiceToggle');
const voiceStatus  = $('voiceStatus');
const charCount    = $('charCount');
const suggestStrip = $('suggestStrip');
const sidebar      = $('sidebar');
const backdrop     = $('backdrop');
const menuBtn      = $('menuBtn');
const sidebarClose = $('sidebarClose');
const toastWrap    = $('toastWrap');
const quickAskList = $('quickAskList');
 
/* ══════════════════════════════════════════════════
   STARS
   ══════════════════════════════════════════════════ */
function initStars() {
  const canvas = $('stars');
  const ctx    = canvas.getContext('2d');
  let W, H, stars = [];
 
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
 
  function createStars(n) {
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x:    Math.random() * W,
        y:    Math.random() * H,
        r:    Math.random() * 1.4 + 0.2,
        a:    Math.random(),
        speed: Math.random() * 0.004 + 0.001,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
  }
 
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;
    for (const s of stars) {
      const opacity = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(frame * s.speed + s.twinkleOffset));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,220,255,${opacity})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
 
  resize();
  createStars(200);
  draw();
  window.addEventListener('resize', () => { resize(); createStars(200); });
}
 
/* ══════════════════════════════════════════════════
   PARTICLES
   ══════════════════════════════════════════════════ */
function initParticles() {
  const container = $('particles');
  const COUNT = 18;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const hue = Math.random() > 0.5 ? '195' : '260';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 3 + 1.5}px;
      height: ${Math.random() * 3 + 1.5}px;
      background: hsl(${hue}, 100%, 70%);
      animation-duration: ${Math.random() * 20 + 15}s;
      animation-delay: ${Math.random() * 20}s;
      opacity: 0;
    `;
    container.appendChild(p);
  }
}
 
/* ══════════════════════════════════════════════════
   QR CODE
   ══════════════════════════════════════════════════ */
function initQR() {
  try {
    new QRCode($('qrCode'), {
      text: CONFIG.PORTFOLIO_URL,
      width: 110,
      height: 110,
      colorDark: '#03040f',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M,
    });
  } catch (e) {
    $('qrCode').style.display = 'none';
  }
}
 
/* ══════════════════════════════════════════════════
   TOAST
   ══════════════════════════════════════════════════ */
function showToast(msg, duration = 2600) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  toastWrap.appendChild(t);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => t.classList.add('show'));
  });
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, duration);
}
 
/* ══════════════════════════════════════════════════
   SIDEBAR
   ══════════════════════════════════════════════════ */
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
 
/* ─── Quick asks ─── */
quickAskList.addEventListener('click', e => {
  const btn = e.target.closest('.quick-ask');
  if (!btn) return;
  const q = btn.dataset.q;
  closeSidebar();
  setTimeout(() => sendMessage(q), 220);
});
 
/* ══════════════════════════════════════════════════
   VOICE SYNTHESIS
   ══════════════════════════════════════════════════ */
function speak(text) {
  if (!voiceEnabled || !synth) return;
  synth.cancel();
  const clean = text.replace(/[*_`#>\[\]()!]/g, '').replace(/\n+/g, ' ').trim();
  if (!clean) return;
  const utt = new SpeechSynthesisUtterance(clean);
  utt.rate  = 1.05;
  utt.pitch = 1.0;
  utt.volume = 0.9;
  const voices = synth.getVoices();
  const preferred = voices.find(v =>
    /Google|Natural|Enhanced/i.test(v.name) && /en/i.test(v.lang)
  ) || voices.find(v => /en/i.test(v.lang));
  if (preferred) utt.voice = preferred;
  currentUtterance = utt;
  synth.speak(utt);
}
 
function toggleVoice() {
  voiceEnabled = !voiceEnabled;
  voiceToggle.classList.toggle('active', voiceEnabled);
  voiceStatus.textContent = voiceEnabled ? '🔊 Voice on' : '🔇 Voice off';
  if (!voiceEnabled && synth) synth.cancel();
  showToast(voiceEnabled ? '🔊 Voice enabled' : '🔇 Voice disabled');
}
 
voiceToggle.addEventListener('click', toggleVoice);
voiceStatus.addEventListener('click', toggleVoice);
 
/* ══════════════════════════════════════════════════
   VOICE INPUT (Web Speech API)
   ══════════════════════════════════════════════════ */
function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    micBtn.style.display = 'none';
    return;
  }
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
 
  recognition.onstart = () => {
    micBtn.classList.add('listening');
    micBtn.innerHTML = '<i class="fas fa-stop"></i>';
    showToast('🎙 Listening…');
  };
  recognition.onresult = e => {
    let interim = '', final = '';
    for (const r of e.results) {
      if (r.isFinal) final += r[0].transcript;
      else interim += r[0].transcript;
    }
    inputField.value = final || interim;
    autoResize();
    updateCharCount();
  };
  recognition.onend = () => {
    micBtn.classList.remove('listening');
    micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    if (inputField.value.trim()) sendMessage();
  };
  recognition.onerror = e => {
    micBtn.classList.remove('listening');
    micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    if (e.error !== 'no-speech') showToast('⚠ Mic error: ' + e.error);
  };
}
 
micBtn.addEventListener('click', () => {
  if (!recognition) { showToast('⚠ Voice not supported in this browser'); return; }
  if (micBtn.classList.contains('listening')) {
    recognition.stop();
  } else {
    if (synth) synth.cancel();
    recognition.start();
  }
});
 
/* ══════════════════════════════════════════════════
   INPUT HANDLING
   ══════════════════════════════════════════════════ */
function autoResize() {
  inputField.style.height = 'auto';
  inputField.style.height = Math.min(inputField.scrollHeight, 120) + 'px';
}
function updateCharCount() {
  const rem = 500 - inputField.value.length;
  charCount.textContent = rem;
  charCount.classList.toggle('warn', rem < 60);
}
 
inputField.addEventListener('input', () => { autoResize(); updateCharCount(); });
inputField.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
sendBtn.addEventListener('click', () => sendMessage());
clearBtn.addEventListener('click', () => {
  if (isGenerating) return;
  clearChat();
  showToast('✨ New chat started');
});
 
/* ══════════════════════════════════════════════════
   SUGGESTIONS STRIP
   ══════════════════════════════════════════════════ */
function renderSuggestions(items) {
  suggestStrip.innerHTML = '';
  items.forEach((s, i) => {
    const c = document.createElement('button');
    c.className = 'strip-chip';
    c.textContent = s;
    c.style.animationDelay = `${i * 0.05}s`;
    c.addEventListener('click', () => {
      sendMessage(s);
      suggestStrip.innerHTML = '';
    });
    suggestStrip.appendChild(c);
  });
}
 
/* ══════════════════════════════════════════════════
   MESSAGE RENDERING
   ══════════════════════════════════════════════════ */
function getTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}
 
function formatMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br>');
}
 
function createMsgEl(role, content, chips = []) {
  const isUser = role === 'user';
  const isError = role === 'error';
 
  const wrap = document.createElement('div');
  wrap.className = `msg msg--${isUser ? 'user' : 'assistant'}`;
 
  if (!isUser) {
    const av = document.createElement('div');
    av.className = 'msg-avatar';
    av.innerHTML = '<i class="fas fa-robot"></i>';
    wrap.appendChild(av);
  }
 
  const contentWrap = document.createElement('div');
  contentWrap.className = 'msg-content';
 
  const bubble = document.createElement('div');
  bubble.className = `bubble bubble--${isError ? 'error' : isUser ? 'user' : 'assistant'}`;
 
  if (isUser) {
    bubble.textContent = content;
  } else {
    bubble.innerHTML = `<p>${formatMarkdown(content)}</p>`;
  }
  contentWrap.appendChild(bubble);
 
  if (chips.length) {
    const row = document.createElement('div');
    row.className = 'chips-row';
    chips.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'chip';
      btn.textContent = c;
      btn.addEventListener('click', () => {
        sendMessage(c);
        row.remove();
      });
      row.appendChild(btn);
    });
    contentWrap.appendChild(row);
  }
 
  const time = document.createElement('div');
  time.className = 'msg-time';
  time.textContent = getTime();
  contentWrap.appendChild(time);
 
  wrap.appendChild(contentWrap);
  return wrap;
}
 
function addMessage(role, content, chips = []) {
  const el = createMsgEl(role, content, chips);
  messagesEl.appendChild(el);
  scrollToBottom();
  return el;
}
 
function showTyping() {
  const wrap = document.createElement('div');
  wrap.className = 'msg msg--assistant';
  wrap.id = 'typingIndicator';
 
  const av = document.createElement('div');
  av.className = 'msg-avatar';
  av.innerHTML = '<i class="fas fa-robot"></i>';
  wrap.appendChild(av);
 
  const contentWrap = document.createElement('div');
  contentWrap.className = 'msg-content';
 
  const bubble = document.createElement('div');
  bubble.className = 'bubble bubble--assistant';
  bubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
  contentWrap.appendChild(bubble);
  wrap.appendChild(contentWrap);
 
  messagesEl.appendChild(wrap);
  scrollToBottom();
  return wrap;
}
 
function removeTyping() {
  const el = $('typingIndicator');
  if (el) el.remove();
}
 
function scrollToBottom(smooth = true) {
  messagesEl.scrollTo({ top: messagesEl.scrollHeight, behavior: smooth ? 'smooth' : 'instant' });
}
 
/* ══════════════════════════════════════════════════
   WELCOME SCREEN
   ══════════════════════════════════════════════════ */
function showWelcome() {
  const card = document.createElement('div');
  card.className = 'welcome-card';
  card.id = 'welcomeCard';
  card.innerHTML = `
    <div class="welcome-card__title">
      Hey there! 👋 I'm <strong>Candy</strong>
    </div>
    <div class="welcome-card__sub">
      Pavan Kalyan's personal AI assistant. Ask me anything about his projects, skills, experience, or how to get in touch!
    </div>
    <div class="chips-row" id="welcomeChips"></div>
  `;
 
  const chipsContainer = card.querySelector('#welcomeChips');
  WELCOME_CHIPS.forEach(label => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = label;
    const queryMap = {
      'Projects 🚀': 'What projects has Pavan built?',
      'Skills 🧠':   "What are Pavan's strongest skills?",
      'Experience 💼': 'Tell me about his internship experience',
      'Contact 📬':  'How do I contact Pavan?',
    };
    btn.addEventListener('click', () => {
      card.remove();
      sendMessage(queryMap[label] || label);
    });
    chipsContainer.appendChild(btn);
  });
 
  const msgWrap = document.createElement('div');
  msgWrap.className = 'msg msg--assistant';
  msgWrap.id = 'welcomeMsg';
 
  const av = document.createElement('div');
  av.className = 'msg-avatar';
  av.innerHTML = '<i class="fas fa-robot"></i>';
  msgWrap.appendChild(av);
 
  const content = document.createElement('div');
  content.className = 'msg-content';
  content.appendChild(card);
  msgWrap.appendChild(content);
 
  messagesEl.appendChild(msgWrap);
}
 
function clearChat() {
  conversationHistory = [];
  if (synth) synth.cancel();
  messagesEl.innerHTML = '';
  suggestStrip.innerHTML = '';
  showWelcome();
}
 
/* ══════════════════════════════════════════════════
   GROQ API
   ══════════════════════════════════════════════════ */
async function callGroq(messages) {
  const response = await fetch(CONFIG.GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CONFIG.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: CONFIG.MODEL,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: CONFIG.MAX_TOKENS,
      temperature: CONFIG.TEMPERATURE,
      stream: false,
    }),
  });
 
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }
 
  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || 'I had trouble responding. Please try again.';
}
 
/* ══════════════════════════════════════════════════
   SEND MESSAGE
   ══════════════════════════════════════════════════ */
async function sendMessage(text) {
  const msg = (text || inputField.value).trim();
  if (!msg || isGenerating) return;
 
  // Remove welcome card if present
  const welcomeMsg = $('welcomeMsg');
  if (welcomeMsg) welcomeMsg.remove();
 
  // Clear input
  inputField.value = '';
  autoResize();
  updateCharCount();
  suggestStrip.innerHTML = '';
 
  // Add user message
  addMessage('user', msg);
 
  // Add to history
  conversationHistory.push({ role: 'user', content: msg });
 
  // Show typing
  isGenerating = true;
  sendBtn.disabled = true;
  const typingEl = showTyping();
 
  try {
    const reply = await callGroq(conversationHistory);
 
    removeTyping();
    addMessage('assistant', reply);
 
    // Add to history (keep last 14 turns to stay within token limits)
    conversationHistory.push({ role: 'assistant', content: reply });
    if (conversationHistory.length > 14) conversationHistory.splice(0, 2);
 
    // Voice
    speak(reply);
 
    // Show follow-up suggestions
    const followUps = getFollowUps(msg);
    if (followUps.length) renderSuggestions(followUps);
 
  } catch (err) {
    removeTyping();
    console.error('Groq error:', err);
    addMessage('error', `⚠ ${err.message || 'Something went wrong. Check your API key or try again.'}`);
  } finally {
    isGenerating = false;
    sendBtn.disabled = false;
    inputField.focus();
  }
}
 
/* ══════════════════════════════════════════════════
   CONTEXTUAL FOLLOW-UP SUGGESTIONS
   ══════════════════════════════════════════════════ */
function getFollowUps(lastMsg) {
  const msg = lastMsg.toLowerCase();
  if (msg.includes('project') || msg.includes('build') || msg.includes('sparms'))
    return ['What tech did Pavan use?', "Tell me about LYRA AI", 'Is code available on GitHub?'];
  if (msg.includes('skill') || msg.includes('tech') || msg.includes('stack'))
    return ['Which ML tools does Pavan know?', 'Tell me about his Java projects', 'What is he learning now?'];
  if (msg.includes('intern') || msg.includes('experience') || msg.includes('work'))
    return ['What projects did Pavan build?', 'Is he available for hire?', 'How do I contact Pavan?'];
  if (msg.includes('contact') || msg.includes('hire') || msg.includes('email'))
    return ['View portfolio', 'What projects has Pavan built?', "What's his LinkedIn?"];
  if (msg.includes('educat') || msg.includes('study') || msg.includes('mca'))
    return ['What are his strongest skills?', 'What projects has he built?'];
  // default rotation
  const pool = [...SUGGESTIONS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 3);
}
 
/* ══════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initParticles();
  initQR();
  initSpeechRecognition();
 
  // Load voices async (Chrome loads them asynchronously)
  if (synth && synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = () => synth.getVoices();
  }
 
  // Show welcome
  showWelcome();
 
  // Initial suggestions strip
  renderSuggestions(SUGGESTIONS.slice(0, 4));
 
  // Focus input on desktop
  if (window.innerWidth > 768) {
    setTimeout(() => inputField.focus(), 400);
  }
 
  // Close sidebar on swipe left (mobile)
  let touchStartX = 0;
  document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', e => {
    const dx = touchStartX - e.changedTouches[0].clientX;
    if (dx > 60 && sidebar.classList.contains('open')) closeSidebar();
  }, { passive: true });
 
  // Swipe right from left edge to open sidebar
  document.addEventListener('touchstart', e => {
    if (e.touches[0].clientX < 24) touchStartX = e.touches[0].clientX;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 70 && touchStartX < 24 && !sidebar.classList.contains('open')) openSidebar();
  }, { passive: true });
});
 
