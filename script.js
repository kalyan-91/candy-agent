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
