/* ═══════════════════════════════════════════════════════════════
   CANDY AI — CINEMATIC MODE ENGINE
   Intercepts project queries and launches a space mission briefing
   ═══════════════════════════════════════════════════════════════ */
(function CinematicMode() {
  'use strict';

  /* ──────────────────────────────────────────────────────────────
     MISSION DATABASE — each project maps to classified intel
  ────────────────────────────────────────────────────────────── */
  const MISSIONS = {
    sparms: {
      name: 'SPARMS',
      type: 'db',
      typeName: '🗄 DATABASE SYSTEM DETECTED',
      status: 'complete',
      statusLabel: 'MISSION COMPLETE',
      missionType: 'Desktop Application System',
      tech: ['Java Swing', 'MySQL', 'JDBC', 'Maven', 'OpenCV'],
      objective: 'Develop a full-featured academic result management system with role-based access, automated OMR scanning, and institutional PDF reporting — replacing manual paper-based workflows entirely.',
      features: [
        'Role-based dashboards for students, faculty, and administrators',
        'Automated OMR sheet scanning via OpenCV integration',
        'Dynamic result generation with performance analytics',
        'PDF export for marksheets and institutional reports',
        'Secure MySQL backend with JDBC connectivity',
      ],
      challenge: 'Integrating OpenCV for real-time OMR scanning within a Java Swing desktop environment without a web server, requiring direct native library bridging.',
      result: 'Delivered a fully functional standalone desktop system capable of managing entire academic cycles — from exam paper scanning to final result publication.',
      currentStatus: 'Completed & demonstrated. Available on GitHub.',
      live: null,
      missionId: 'MSN-001-DB',
      askQ: 'Tell me about the SPARMS project in complete detail',
    },
    inventoryiq: {
      name: 'InventoryIQ',
      type: 'data',
      typeName: '📊 ANALYTICS MISSION DETECTED',
      status: 'online',
      statusLabel: 'LIVE — ONLINE',
      missionType: 'Streamlit Data Analytics Dashboard',
      tech: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'CSV'],
      objective: 'Build an intelligent e-commerce inventory analytics dashboard that gives business owners real-time insight into stock health, sales velocity, and warehouse efficiency.',
      features: [
        'Live inventory status monitoring with low-stock alerts',
        'Sales velocity trends and demand forecasting visuals',
        'Category-level and SKU-level performance breakdowns',
        'Audit log tracking with timestamped change history',
        'CSV import/export for seamless data integration',
      ],
      challenge: 'Designing an intuitive UX that serves both technical analysts and non-technical business owners without overwhelming either audience with data density.',
      result: 'Successfully deployed on Streamlit Cloud. Actively usable by any e-commerce business as a plug-and-play analytics layer.',
      currentStatus: 'Live on Streamlit Cloud — publicly accessible.',
      live: 'https://inventoryiq-e-commerce-inventory-analytics-system-lqpsn7qy8hhd.streamlit.app',
      missionId: 'MSN-002-DA',
      askQ: 'Tell me everything about the InventoryIQ project',
    },
    digitrecognizer: {
      name: 'Digit Recognizer',
      type: 'ai',
      typeName: '🤖 AI EXPERIMENT DETECTED',
      status: 'online',
      statusLabel: 'LIVE — ONLINE',
      missionType: 'Deep Learning CNN Model',
      tech: ['Python', 'TensorFlow', 'Keras', 'CNN', 'Streamlit', 'NumPy'],
      objective: 'Train a Convolutional Neural Network to recognise handwritten digits 0–9 in real time via an interactive canvas demo, achieving high accuracy on the MNIST benchmark.',
      features: [
        'CNN architecture with convolutional and pooling layers',
        'Trained on MNIST — 60,000 training samples',
        'Live canvas interface for real-time digit drawing',
        'Confidence score display per predicted class',
        'Streamlit-powered web deployment — no setup required',
      ],
      challenge: 'Achieving reliable recognition of varied human handwriting styles, particularly digits 4, 7, and 9 which share structural similarities at lower stroke weights.',
      result: 'Model achieved strong validation accuracy. Deployed as a fully interactive web app where visitors draw digits and see instant AI predictions.',
      currentStatus: 'Live on Streamlit Cloud — try it now.',
      live: 'https://hand-written-digit-recognition-xp9dvpheswt6zju8xpknxn.streamlit.app',
      missionId: 'MSN-003-AI',
      askQ: 'Tell me about the Digit Recognizer project and how it works',
    },
    netflix: {
      name: 'Netflix Dashboard',
      type: 'data',
      typeName: '📊 ANALYTICS MISSION DETECTED',
      status: 'complete',
      statusLabel: 'MISSION COMPLETE',
      missionType: 'Power BI Business Intelligence',
      tech: ['Power BI', 'DAX', 'Power Query', 'Excel', 'Data Modeling'],
      objective: 'Transform a raw 5000+ title Netflix dataset into a fully interactive BI dashboard revealing content strategy, genre distributions, country outputs, and release trends.',
      features: [
        'Interactive slicers for genre, year, country, and content type',
        'Top-10 director and cast frequency analyses',
        'Content type ratio (Movies vs TV Shows) over time',
        'Geographic heatmap of production origins by country',
        'DAX measures for aggregated ratings and duration analytics',
      ],
      challenge: 'Cleaning and normalising multi-value columns (genres, cast, country) in Power Query before building a star-schema model that DAX could query efficiently.',
      result: 'Delivered a polished executive-level BI report that turns a flat CSV into a navigable content intelligence tool.',
      currentStatus: 'Completed. Available as part of Pavan\'s data analytics portfolio.',
      live: null,
      missionId: 'MSN-004-BI',
      askQ: 'Tell me about the Netflix Dashboard Power BI project',
    },
    attrition: {
      name: 'Employee Attrition Analysis',
      type: 'ai',
      typeName: '🤖 AI EXPERIMENT DETECTED',
      status: 'complete',
      statusLabel: 'MISSION COMPLETE',
      missionType: 'ML Classification + BI Dashboard',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'Power BI', 'Seaborn', 'Matplotlib'],
      objective: 'Predict employee attrition risk using supervised ML classification and surface actionable HR insights through a Power BI dashboard built on model outputs.',
      features: [
        'Exploratory data analysis across 35+ HR features',
        'Multiple classifier comparison: Logistic Regression, Random Forest, XGBoost',
        'Feature importance analysis identifying top attrition drivers',
        'Power BI HR dashboard with model predictions integrated',
        'Precision, recall, F1 score evaluation for each model',
      ],
      challenge: 'Handling class imbalance (far more retained employees than churned) required SMOTE oversampling to prevent the model from defaulting to majority-class predictions.',
      result: 'Identified key attrition drivers (overtime, job satisfaction, years at company) and built a decision-support dashboard for HR leadership.',
      currentStatus: 'Completed. Showcased as a data science portfolio project.',
      live: null,
      missionId: 'MSN-005-ML',
      askQ: 'Tell me about the Employee Attrition ML project in detail',
    },
    zomato: {
      name: 'Zomato Analysis',
      type: 'data',
      typeName: '📊 ANALYTICS MISSION DETECTED',
      status: 'complete',
      statusLabel: 'MISSION COMPLETE',
      missionType: 'Data Analysis & Predictive Modeling',
      tech: ['Python', 'Pandas', 'Seaborn', 'Matplotlib', 'Scikit-learn', 'NumPy'],
      objective: 'Analyse Zomato restaurant data to uncover rating patterns, cuisine popularity, price-to-rating correlations, and build a predictive model for restaurant success.',
      features: [
        'City-level restaurant density and cuisine diversity analysis',
        'Price band vs average rating correlation study',
        'Online delivery vs dine-in rating comparison',
        'Cuisine category popularity index across regions',
        'Regression model predicting aggregate restaurant ratings',
      ],
      challenge: 'The dataset contained significant noise from fake reviews and inconsistent formatting across restaurant name and location fields, requiring extensive NLP-based cleaning.',
      result: 'Produced a comprehensive analytical report revealing that mid-priced restaurants with online delivery consistently outperform premium dine-in establishments in aggregate rating.',
      currentStatus: 'Completed. Part of Pavan\'s analytics project portfolio.',
      live: null,
      missionId: 'MSN-006-DA',
      askQ: 'Tell me about the Zomato Analysis project and findings',
    },
  };

  /* ──────────────────────────────────────────────────────────────
     KEYWORD MAP — detect which project is being asked about
  ────────────────────────────────────────────────────────────── */
  const KEYWORD_MAP = [
    { key: 'sparms',         words: ['sparms', 'academic result', 'omr', 'java swing', 'result management'] },
    { key: 'inventoryiq',   words: ['inventoryiq', 'inventory', 'stock', 'warehouse analytics'] },
    { key: 'digitrecognizer', words: ['digit', 'recognizer', 'handwritten', 'cnn', 'mnist', 'digit recogni'] },
    { key: 'netflix',        words: ['netflix', 'power bi', 'bi dashboard', 'content dashboard'] },
    { key: 'attrition',      words: ['attrition', 'employee', 'hr', 'churn', 'workforce'] },
    { key: 'zomato',         words: ['zomato', 'restaurant', 'food rating'] },
  ];

  const BOOT_STEPS = [
    'Scanning Knowledge Database...',
    'Loading Mission Data...',
    'Preparing Holographic Interface...',
    'Decrypting Classified Records...',
  ];

  /* ──────────────────────────────────────────────────────────────
     DOM INJECTION — build the full overlay once on load
  ────────────────────────────────────────────────────────────── */
  function buildDOM() {
    const el = document.createElement('div');
    el.id = 'cmOverlay';
    el.className = 'cm-overlay';
    el.innerHTML = `
      <canvas id="cmParticleCanvas"></canvas>

      <div class="cm-panel" id="cmPanel" role="dialog" aria-modal="true" aria-label="Mission Briefing">
        <!-- Hologram corners -->
        <div class="cm-corner cm-corner-tl"></div>
        <div class="cm-corner cm-corner-tr"></div>
        <div class="cm-corner cm-corner-bl"></div>
        <div class="cm-corner cm-corner-br"></div>
        <div class="cm-complete-flash" id="cmFlash"></div>

        <!-- STEP 1: Boot screen -->
        <div class="cm-boot" id="cmBoot">
          <div class="cm-alert-badge">
            <div class="cm-alert-dot"></div>
            🚨 PROJECT DETECTED
          </div>
          <div class="cm-boot-title">Initializing<br><span>Cinematic Briefing</span></div>
          <div class="cm-boot-sub">CANDY AI — MISSION CONTROL ACTIVATED</div>
          <div class="cm-checklist" id="cmChecklist"></div>
          <div class="cm-progress-wrap">
            <div class="cm-progress-fill" id="cmProgress"></div>
          </div>
        </div>

        <!-- STEP 2: Mission briefing -->
        <div class="cm-briefing" id="cmBriefing">
          <div class="cm-briefing-header">
            <div class="cm-header-left">
              <div class="cm-mission-type-badge" id="cmTypeBadge">
                <div class="cm-type-dot"></div>
                <span id="cmTypeName"></span>
              </div>
              <div class="cm-project-title" id="cmProjectTitle"></div>
            </div>
            <div class="cm-header-right">
              <div class="cm-status-pill" id="cmStatusPill">
                <div class="cm-status-dot"></div>
                <span id="cmStatusLabel"></span>
              </div>
              <div class="cm-mission-id" id="cmMissionId"></div>
            </div>
          </div>

          <div class="cm-scan-beam"></div>

          <div class="cm-body">
            <div class="cm-body-left" id="cmBodyLeft"></div>
            <div class="cm-body-right" id="cmBodyRight"></div>
          </div>

          <div class="cm-footer">
            <div class="cm-footer-info" id="cmFooterInfo"></div>
            <div class="cm-footer-actions">
              <button class="cm-btn cm-btn-ask" id="cmAskBtn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Ask Candy More
              </button>
              <button class="cm-btn cm-btn-close" id="cmCloseBtn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(el);

    // Wire close / ask buttons
    document.getElementById('cmCloseBtn').addEventListener('click', close);
    document.getElementById('cmAskBtn').addEventListener('click', () => {
      close();
      if (_currentMission) {
        const q = _currentMission.askQ;
        setTimeout(() => {
          // Works with candy.html's input + go() pair
          const inputEl = document.getElementById('inp') || document.getElementById('chatInput');
          if (inputEl) inputEl.value = q;
          if (typeof go === 'function') go();
          else if (typeof handleSend === 'function') handleSend(q);
          else if (typeof handleSubmit === 'function') handleSubmit();
        }, 260);
      }
    });
    // Click backdrop to close
    el.addEventListener('click', e => { if (e.target === el) close(); });
    // ESC key
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* ──────────────────────────────────────────────────────────────
     PARTICLE CANVAS
  ────────────────────────────────────────────────────────────── */
  let _particleRAF = null;
  function startParticles() {
    const canvas = document.getElementById('cmParticleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['rgba(0,212,255,', 'rgba(167,139,250,', 'rgba(251,191,36,', 'rgba(52,211,153,'];
    const particles = Array.from({length: 55}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.5 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: 0.2 + Math.random() * 0.6,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + p.a + ')';
        ctx.fill();
      }
      _particleRAF = requestAnimationFrame(loop);
    }
    loop();
  }
  function stopParticles() {
    if (_particleRAF) { cancelAnimationFrame(_particleRAF); _particleRAF = null; }
  }

  /* ──────────────────────────────────────────────────────────────
     SPEECH — narrate the mission title on reveal
  ────────────────────────────────────────────────────────────── */
  function speakMissionTitle(name) {
    if (!window.speechSynthesis) return;
    // Respect Candy's voice toggle — current script.js uses `voiceOn`,
    // older versions used `voiceEnabled`. Check whichever exists.
    if (typeof voiceOn !== 'undefined' && !voiceOn) return;
    if (typeof voiceEnabled !== 'undefined' && !voiceEnabled) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(
      `Mission briefing initiated. Project: ${name}. All systems nominal.`
    );
    u.lang = 'en-US'; u.rate = 0.95; u.pitch = 0.88;
    const voices = window.speechSynthesis.getVoices();
    const v = voices.find(v => v.name.includes('Google US English'))
           || voices.find(v => v.lang === 'en-US' && !v.localService)
           || voices.find(v => v.lang.startsWith('en'));
    if (v) u.voice = v;
    setTimeout(() => window.speechSynthesis.speak(u), 100);
  }

  /* ──────────────────────────────────────────────────────────────
     OPEN / CLOSE
  ────────────────────────────────────────────────────────────── */
  let _currentMission = null;
  let _timeouts = [];

  function t(fn, ms) { const id = setTimeout(fn, ms); _timeouts.push(id); return id; }
  function clearAll() { _timeouts.forEach(clearTimeout); _timeouts = []; }

  function open(missionKey) {
    const mission = MISSIONS[missionKey];
    if (!mission) return;
    _currentMission = mission;
    clearAll();

    const overlay   = document.getElementById('cmOverlay');
    const boot      = document.getElementById('cmBoot');
    const briefing  = document.getElementById('cmBriefing');
    const checklist = document.getElementById('cmChecklist');
    const progress  = document.getElementById('cmProgress');

    // Reset state
    boot.style.display     = 'flex';
    briefing.classList.remove('cm-show');
    checklist.innerHTML    = '';
    progress.style.width   = '0%';

    // Show overlay
    overlay.classList.add('cm-active');
    startParticles();

    // Build checklist items
    BOOT_STEPS.forEach((label, i) => {
      const item = document.createElement('div');
      item.className = 'cm-check-item';
      item.innerHTML = `<div class="cm-check-icon" id="ci${i}"></div><span>${label}</span>`;
      checklist.appendChild(item);
    });

    // Animate checklist step by step
    BOOT_STEPS.forEach((_, i) => {
      t(() => {
        const item = checklist.children[i];
        item.classList.add('cm-visible', 'cm-loading');
      }, 200 + i * 420);

      t(() => {
        const item = checklist.children[i];
        item.classList.remove('cm-loading');
        item.classList.add('cm-done');
        const icon = item.querySelector('.cm-check-icon');
        if (icon) icon.innerHTML = '✓';
        progress.style.width = ((i + 1) / BOOT_STEPS.length * 100) + '%';
      }, 550 + i * 420);
    });

    // Transition to briefing
    const bootDuration = 200 + BOOT_STEPS.length * 420 + 500;
    t(() => {
      boot.style.display = 'none';
      buildBriefing(mission);
      briefing.classList.add('cm-show');
      speakMissionTitle(mission.name);
      // Flash
      t(() => {
        const flash = document.getElementById('cmFlash');
        if (flash) flash.classList.add('cm-flash');
        t(() => flash && flash.classList.remove('cm-flash'), 900);
      }, 100);
    }, bootDuration);
  }

  function close() {
    clearAll();
    stopParticles();
    const overlay = document.getElementById('cmOverlay');
    if (overlay) overlay.classList.remove('cm-active');
  }

  /* ──────────────────────────────────────────────────────────────
     BUILD BRIEFING FIELDS
  ────────────────────────────────────────────────────────────── */
  function buildBriefing(m) {
    // Header
    const typeBadge = document.getElementById('cmTypeBadge');
    typeBadge.className = `cm-mission-type-badge ${m.type}`;

    document.getElementById('cmTypeName').textContent  = m.typeName;
    document.getElementById('cmProjectTitle').textContent = m.name;
    document.getElementById('cmMissionId').textContent = `MISSION ID: ${m.missionId}`;

    const statusPill = document.getElementById('cmStatusPill');
    statusPill.className = `cm-status-pill ${m.status}`;
    document.getElementById('cmStatusLabel').textContent = m.statusLabel;

    document.getElementById('cmFooterInfo').textContent =
      `CANDY AI COMMAND CENTER  ·  CLASSIFIED MISSION FILE  ·  ${new Date().toLocaleDateString('en-IN')}`;

    // Body left
    const left  = document.getElementById('cmBodyLeft');
    const right = document.getElementById('cmBodyRight');
    left.innerHTML  = '';
    right.innerHTML = '';

    const leftFields = [
      { label: 'MISSION TYPE',      html: `<div class="cm-field-value">${m.missionType}</div>` },
      { label: 'TECH STACK',        html: `<div class="cm-tech-row">${m.tech.map(t=>`<span class="cm-tech-tag">${t}</span>`).join('')}</div>` },
      { label: 'MISSION OBJECTIVE', html: `<div class="cm-field-value">${m.objective}</div>` },
      { label: 'KEY FEATURES',      html: `<div class="cm-feature-list">${m.features.map(f=>`<div class="cm-feature-item"><div class="cm-feature-bullet"></div><span>${f}</span></div>`).join('')}</div>` },
    ];

    const rightFields = [
      { label: 'CHALLENGE FACED',   html: `<div class="cm-callout">${m.challenge}</div>` },
      { label: 'MISSION RESULT',    html: `<div class="cm-callout result-callout">${m.result}</div>` },
      { label: 'CURRENT STATUS',    html: `<div class="cm-field-value">${m.currentStatus}</div>` },
    ];

    if (m.live) {
      rightFields.push({
        label: 'LIVE DEPLOYMENT',
        html: `<a class="cm-live-link" href="${m.live}" target="_blank" rel="noopener">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          Launch Mission →
        </a>`
      });
    }

    leftFields.forEach((f, i)  => left.appendChild(makeField(f.label, f.html, i)));
    rightFields.forEach((f, i) => right.appendChild(makeField(f.label, f.html, i + leftFields.length)));
  }

  function makeField(label, html, revealIndex) {
    const wrap = document.createElement('div');
    wrap.className = 'cm-field';
    wrap.innerHTML = `<div class="cm-field-label">${label}</div>${html}`;
    // Stagger reveal
    setTimeout(() => wrap.classList.add('cm-revealed'), 120 + revealIndex * 120);
    return wrap;
  }

  /* ──────────────────────────────────────────────────────────────
     INTERCEPT — detect project queries before sending to Groq
  ────────────────────────────────────────────────────────────── */
  function detectMission(text) {
    const q = text.toLowerCase();
    // Only trigger on genuine project inquiry
    const projectTriggers = ['tell me about', 'what is', 'explain', 'how', 'show', 'describe', 'detail', 'project', 'built', 'made', 'demo', 'live', 'work'];
    const hasProjectIntent = projectTriggers.some(t => q.includes(t));
    if (!hasProjectIntent) return null;

    for (const entry of KEYWORD_MAP) {
      if (entry.words.some(w => q.includes(w))) return entry.key;
    }
    return null;
  }

  /* ──────────────────────────────────────────────────────────────
     PUBLIC API — exported to window
  ────────────────────────────────────────────────────────────── */
  window.CinematicMode = {
    /**
     * Call this from handleSubmit() BEFORE sending to Groq.
     * Returns true if cinematic mode was launched (so you can still
     * send the message to Groq in parallel for the text reply).
     */
    tryIntercept(text) {
      const key = detectMission(text);
      if (!key) return false;
      open(key);
      return true;
    },
    open,
    close,
    MISSIONS,
  };

  /* ──────────────────────────────────────────────────────────────
     INIT — build DOM once page is ready
  ────────────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildDOM);
  } else {
    buildDOM();
  }

})();

// Expose functions globally so script.js can use them
window.detectProjectFromText = detectProjectFromText;
window.launchCinematic = launchCinematic;
