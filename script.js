// PHOTO PREVIEW
  function previewPhoto(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.getElementById('profile-photo');
        img.src = e.target.result;
        img.style.display = 'block';
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // EDIT MODE TOGGLE
  let editMode = false;
  function toggleEdit() {
    editMode = !editMode;
    const btn = document.getElementById('toggle-edit');
    const bar = document.getElementById('edit-bar');
    const editables = document.querySelectorAll('[contenteditable]');

    if (editMode) {
      document.body.classList.add('edit-mode');
      editables.forEach(el => el.setAttribute('contenteditable', 'true'));
      btn.textContent = '✕';
      btn.classList.add('on');
      btn.title = 'Exit Edit Mode';
      bar.classList.add('visible');
    } else {
      document.body.classList.remove('edit-mode');
      editables.forEach(el => el.setAttribute('contenteditable', 'false'));
      btn.textContent = '✏️';
      btn.classList.remove('on');
      btn.title = 'Edit Content';
      bar.classList.remove('visible');
    }
  }

  // SCROLL REVEAL
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ===== QUIZ LOGIC ===== */
  const quizData = [
    // ── TOPIC A: Environmental Health ───────────────────────────────
    {
      q: "🌍 PHENOMENON CHECK: Only 11% of Indonesians have clean water available at all times, yet Indonesia is an archipelago surrounded by water. What is the MOST likely reason for this gap?",
      opts: [
        "Indonesia has too little rainfall to collect water",
        "Poor water distribution systems and contamination of water sources",
        "Indonesians prefer buying bottled water over tap water",
        "All Indonesian rivers are too polluted to treat"
      ],
      ans: 1,
      exp: "The gap is primarily due to poor water distribution infrastructure and widespread contamination — not a lack of water itself. 40% of groundwater is contaminated with E. coli, and many areas lack piped water systems."
    },
    {
      q: "A water source is considered safe if it is at least how many meters away from any waste or sewage site?",
      opts: ["5 meters","10 meters","15 meters","20 meters"],
      ans: 1,
      exp: "A water source is considered safe if it is at least 10 meters away from any waste or sewage to prevent contamination."
    },
    {
      q: "In the context of fashion, what does 'upcycling' mean?",
      opts: [
        "Buying new expensive branded clothes",
        "Donating old clothes to charity",
        "Transforming old clothes into new, valuable items",
        "Washing clothes with eco-friendly detergent"
      ],
      ans: 2,
      exp: "Upcycling means creatively transforming old or discarded clothing into new, valuable items — reducing textile waste and extending the life of materials."
    },
    // ── TOPIC B: Climate Change ──────────────────────────────────────
    {
      q: "🔬 INQUIRY THINKING: A student claims that 'using the internet has no environmental impact.' Based on what you've learned, how would you respond?",
      opts: [
        "They are correct — digital activity produces no physical emissions",
        "They are wrong — the IT sector generates 3–4% of global carbon emissions through server energy use",
        "They are partially right — only video streaming produces emissions",
        "They are wrong — but only social media apps are the problem"
      ],
      ans: 1,
      exp: "The IT sector generates 3–4% of global carbon emissions (IEA, 2023). Every stream, scroll, and online game uses server energy — this is known as a digital carbon footprint. The student's claim is incorrect."
    },
    {
      q: "What percentage of global greenhouse gas emissions is attributed to livestock farming?",
      opts: ["7%","10%","14.5%","20%"],
      ans: 2,
      exp: "Livestock farming — especially cattle — accounts for 14.5% of global greenhouse gas emissions, making dietary choices an important factor in climate action."
    },
    {
      q: "By how much can cycling instead of driving reduce personal carbon emissions?",
      opts: ["Up to 30%","Up to 50%","Up to 67%","Up to 80%"],
      ans: 2,
      exp: "Cycling instead of driving can reduce personal carbon emissions by up to 67% — making it one of the most impactful individual lifestyle changes for the climate."
    },
    // ── TOPIC C: Energy Crisis ───────────────────────────────────────
    {
      q: "🔬 INQUIRY THINKING: Indonesia has vast geothermal reserves, yet still relies heavily on fossil fuels. If you were analyzing this as a research problem, what would be the most logical hypothesis for why this is the case?",
      opts: [
        "Indonesia has not yet discovered its geothermal potential",
        "Geothermal energy produces more emissions than coal",
        "High upfront infrastructure costs and existing fossil fuel dependency create barriers to transition",
        "The Indonesian government prefers nuclear energy over geothermal"
      ],
      ans: 2,
      exp: "The most logical hypothesis is that high infrastructure investment costs and existing fossil fuel dependency create economic and political barriers to rapid transition — a classic challenge in energy policy, not a lack of resources."
    },
    {
      q: "Which alternative energy source uses steam from the Earth's core to drive turbines?",
      opts: ["Biogas","Bioethanol","Geothermal","Waste-to-Energy"],
      ans: 2,
      exp: "Geothermal energy (PLTPB) harnesses steam from the Earth's core to drive turbines. Indonesia sits on one of the world's largest geothermal reserves."
    },
    // ── TOPIC D: Food Availability ───────────────────────────────────
    {
      q: "🌍 PHENOMENON CHECK: Indonesia wastes 23–48 million tons of food per year, yet has a 'moderate' hunger score. What does this paradox BEST illustrate?",
      opts: [
        "Indonesia produces too little food to feed its population",
        "Food security is not just about production — it is also about fair distribution and reducing waste",
        "The Global Hunger Index is an inaccurate measure for Indonesia",
        "Indonesian people are not educated about nutrition"
      ],
      ans: 1,
      exp: "This paradox illustrates that food security depends not just on how much food is produced, but on how fairly it is distributed and how little is wasted. Singapore, with little farmland, shows that distribution matters enormously."
    },
    {
      q: "How much food is wasted globally every year according to the FAO?",
      opts: ["500 million tons","1.3 billion tons","2.5 billion tons","3.8 billion tons"],
      ans: 1,
      exp: "According to the FAO, 1.3 billion tons of food is wasted globally every year — worsening both food insecurity and climate change through methane emissions from decomposing food."
    },
    // ── SDG 13: Climate Action ───────────────────────────────────────
    {
      q: "🌱 SDG CONNECTION: SDG 13 calls for urgent action on climate change. Which of the following student actions DIRECTLY contributes to SDG 13 Target 13.3 (improving climate education and awareness)?",
      opts: [
        "Buying a new electric car",
        "Sharing knowledge about climate change with peers and family",
        "Investing in renewable energy companies",
        "Moving to a country with better environmental policies"
      ],
      ans: 1,
      exp: "SDG 13 Target 13.3 focuses on improving education and awareness about climate change. Sharing knowledge with peers and family is a direct, accessible action that every student can take — and it multiplies impact across communities."
    },
    {
      q: "🌱 SDG CONNECTION: The water filtration experiment you conducted connects most directly to which SDG?",
      opts: [
        "SDG 4 — Quality Education",
        "SDG 6 — Clean Water and Sanitation",
        "SDG 11 — Sustainable Cities",
        "SDG 17 — Partnerships for the Goals"
      ],
      ans: 1,
      exp: "SDG 6 — Clean Water and Sanitation — directly aligns with the water filtration experiment. Access to clean water is a global challenge, and understanding filtration technology is a practical step toward achieving SDG 6, especially in underserved communities in Indonesia."
    }
  ];

  let currentQ = 0, score = 0, answered = false;
  let userAnswers = new Array(quizData.length).fill(null);

  function renderQuiz() {
    const q = quizData[currentQ];
    document.getElementById('quiz-progress-text').textContent = `Question ${currentQ + 1} of ${quizData.length}`;
    document.getElementById('quiz-progress-bar').style.width = ((currentQ + 1) / quizData.length * 100) + '%';
    document.getElementById('quiz-question').textContent = q.q;

    const optsEl = document.getElementById('quiz-options');
    optsEl.innerHTML = '';
    q.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt';
      btn.innerHTML = `<span class="opt-letter">${String.fromCharCode(65+i)}</span><span>${opt}</span>`;
      if (userAnswers[currentQ] !== null) {
        if (i === q.ans) btn.classList.add('correct');
        else if (i === userAnswers[currentQ]) btn.classList.add('wrong');
        btn.disabled = true;
      }
      btn.addEventListener('click', () => selectAnswer(i));
      optsEl.appendChild(btn);
    });

    const expEl = document.getElementById('quiz-explanation');
    if (userAnswers[currentQ] !== null) {
      expEl.style.display = 'block';
      expEl.innerHTML = `<span class="exp-icon">${userAnswers[currentQ] === q.ans ? '✅' : '❌'}</span><span>${q.exp}</span>`;
    } else {
      expEl.style.display = 'none';
    }

    document.getElementById('quiz-prev').disabled = currentQ === 0;
    document.getElementById('quiz-next').style.display = currentQ < quizData.length - 1 ? 'inline-flex' : 'none';
    document.getElementById('quiz-submit').style.display = currentQ === quizData.length - 1 && userAnswers[currentQ] !== null ? 'inline-flex' : 'none';
  }

  function selectAnswer(i) {
    if (userAnswers[currentQ] !== null) return;
    userAnswers[currentQ] = i;
    if (i === quizData[currentQ].ans) score++;
    renderQuiz();
    if (currentQ === quizData.length - 1) {
      document.getElementById('quiz-submit').style.display = 'inline-flex';
    }
  }

  function showResults() {
    const pct = Math.round(score / quizData.length * 100);
    let grade, msg, color;
    if (pct >= 90) { grade = 'Excellent! 🏆'; msg = 'Outstanding! You have a deep understanding of environmental issues.'; color = '#52b788'; }
    else if (pct >= 70) { grade = 'Good Job! 🌟'; msg = 'Well done! Review a few areas and you\'ll master this topic.'; color = '#48cae4'; }
    else if (pct >= 50) { grade = 'Keep Going! 📚'; msg = 'You\'re getting there! Re-read the material and try again.'; color = '#c9a84c'; }
    else { grade = 'Try Again! 💪'; msg = 'Don\'t give up! Go back through the content carefully and retry.'; color = '#e76f51'; }

    document.getElementById('quiz-main').style.display = 'none';
    const res = document.getElementById('quiz-results');
    res.style.display = 'block';
    res.innerHTML = `
      <div class="result-circle" style="border-color:${color}">
        <div class="result-num" style="color:${color}">${pct}<span>%</span></div>
        <div class="result-raw">${score} / ${quizData.length}</div>
      </div>
      <h3 class="result-grade" style="color:${color}">${grade}</h3>
      <p class="result-msg">${msg}</p>
      <div class="result-breakdown">
        ${quizData.map((q,i) => `
          <div class="rb-item ${userAnswers[i] === q.ans ? 'rb-correct' : 'rb-wrong'}">
            <span class="rb-icon">${userAnswers[i] === q.ans ? '✓' : '✗'}</span>
            <span class="rb-q">Q${i+1}: ${q.q.substring(0,55)}...</span>
          </div>
        `).join('')}
      </div>
      <button class="quiz-nav-btn" onclick="restartQuiz()">🔄 Try Again</button>
    `;
  }

  function restartQuiz() {
    currentQ = 0; score = 0;
    userAnswers = new Array(quizData.length).fill(null);
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-main').style.display = 'block';
    renderQuiz();
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderQuiz();
    document.getElementById('quiz-prev').addEventListener('click', () => { if(currentQ > 0){ currentQ--; renderQuiz(); } });
    document.getElementById('quiz-next').addEventListener('click', () => { if(currentQ < quizData.length-1){ currentQ++; renderQuiz(); } });
    document.getElementById('quiz-submit').addEventListener('click', showResults);
  });