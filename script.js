document.addEventListener('DOMContentLoaded', function() {
  var sidebar = document.getElementById('sidebar');
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('.section');
  var menuToggle = document.getElementById('menuToggle');
  var pageTitle = document.getElementById('pageTitle');
  var darkModeToggle = document.getElementById('darkModeToggle');
  var contentScroll = document.getElementById('contentScroll');
  var scrollTopBtn = document.getElementById('scrollTop');
  var scrollProgress = document.getElementById('scrollProgress');
  var html = document.documentElement;

  var sectionTitles = {
    'sec-home': 'Home',
    'sec-courses': 'Courses',
    'sec-health': 'Student Health',
    'sec-career': 'Career Guidance',
    'sec-resources': 'Resources',
    'sec-about': 'About',
    'sec-contact': 'Contact'
  };

  // ===== NAVIGATION =====
  function hideAllSections() {
    sections.forEach(function(s) { s.classList.remove('active'); });
  }

  function showSection(id) {
    var el = document.getElementById(id);
    if (el) el.classList.add('active');
  }

  function setActiveNav(targetId) {
    navLinks.forEach(function(l) {
      l.classList.remove('active');
      if (l.getAttribute('data-section') === targetId) l.classList.add('active');
    });
  }

  function navigateToSection(targetId) {
    hideAllSections();
    showSection(targetId);
    setActiveNav(targetId);
    if (pageTitle) pageTitle.textContent = sectionTitles[targetId] || '';
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (contentScroll) contentScroll.scrollTop = 0;
    updateScrollProgress();
  }

  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      navigateToSection(link.getAttribute('data-section'));
    });
  });

  // Quick actions & hero buttons
  document.querySelectorAll('[data-target]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = btn.getAttribute('data-target');
      if (target) navigateToSection(target);
    });
  });

  // Mobile menu
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('mobile-open');
    });
  }

  document.addEventListener('click', function(e) {
    if (sidebar && sidebar.classList.contains('mobile-open') && !sidebar.contains(e.target) && e.target !== menuToggle) {
      sidebar.classList.remove('mobile-open');
    }
  });

  // ===== DARK MODE =====
  function initDarkMode() {
    var saved = localStorage.getItem('amanshuTheme');
    if (saved === 'dark') {
      html.setAttribute('data-theme', 'dark');
    }
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      var isDark = html.getAttribute('data-theme') === 'dark';
      if (isDark) {
        html.removeAttribute('data-theme');
        localStorage.setItem('amanshuTheme', 'light');
      } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('amanshuTheme', 'dark');
      }
    });
  }

  initDarkMode();

  // ===== SCROLL =====
  if (contentScroll) {
    contentScroll.addEventListener('scroll', function() {
      var st = contentScroll.scrollTop;
      if (scrollTopBtn) {
        if (st > 300) scrollTopBtn.classList.add('visible');
        else scrollTopBtn.classList.remove('visible');
      }
      updateScrollProgress();
    });
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      if (contentScroll) contentScroll.scrollTo({ top:0, behavior:'smooth' });
    });
  }

  function updateScrollProgress() {
    if (!contentScroll || !scrollProgress) return;
    var st = contentScroll.scrollTop;
    var sh = contentScroll.scrollHeight - contentScroll.clientHeight;
    var pct = sh > 0 ? (st / sh) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  }

  // ===== STAT COUNTER =====
  function animateCounters() {
    document.querySelectorAll('.stat-num[data-count]').forEach(function(el) {
      var target = parseInt(el.getAttribute('data-count'));
      var current = 0;
      var increment = Math.ceil(target / 60);
      var timer = setInterval(function() {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current.toLocaleString() + (target >= 100 && target < 10000 ? '+' : target === 98 ? '%' : '+');
      }, 30);
    });
  }

  // Run counter animation when home section is shown
  var homeObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.target.classList.contains('active')) {
        animateCounters();
      }
    });
  });
  var homeSection = document.getElementById('sec-home');
  if (homeSection) homeObserver.observe(homeSection, { attributes:true, attributeFilter:['class'] });

  // ===== HEALTH TABS =====
  var healthTabs = document.querySelectorAll('.health-tab');
  var healthTabContents = document.querySelectorAll('.health-tab-content');

  healthTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      healthTabs.forEach(function(t) { t.classList.remove('active'); });
      healthTabContents.forEach(function(c) { c.classList.remove('active'); });
      tab.classList.add('active');
      var target = document.getElementById('htab-' + tab.getAttribute('data-htab'));
      if (target) target.classList.add('active');
    });
  });

  // ===== ACCORDIONS =====
  document.querySelectorAll('.htc-header').forEach(function(header) {
    header.addEventListener('click', function() {
      var card = header.closest('.health-topic-card');
      if (card) card.classList.toggle('open');
    });
  });

  // ===== RESOURCE TABS =====
  var resourceTabs = document.querySelectorAll('.resource-tab');
  var resourceTabContents = document.querySelectorAll('.resource-tab-content');

  resourceTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      resourceTabs.forEach(function(t) { t.classList.remove('active'); });
      resourceTabContents.forEach(function(c) { c.classList.remove('active'); });
      tab.classList.add('active');
      var target = document.getElementById('rtab-' + tab.getAttribute('data-rtab'));
      if (target) target.classList.add('active');
    });
  });

  // ===== MODALS =====
  function openModal(id) {
    var modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
  }

  function closeModal(id) {
    var modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
  }

  document.querySelectorAll('[data-close]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      closeModal(btn.getAttribute('data-close'));
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  });

  // Login modal
  var loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', function() { openModal('loginModal'); });
  }

  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var phone = document.getElementById('loginPhone').value.trim();
      var email = document.getElementById('loginEmail').value.trim();
      if (!/^\d{10}$/.test(phone)) { alert('Please enter a valid 10-digit phone number.'); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email address.'); return; }
      alert('Login successful! Welcome to Amanshu Classes.');
      closeModal('loginModal');
      loginForm.reset();
    });
  }

  // ===== COURSE MODAL =====
  var courseData = {
    cbse: { name:'CBSE Board', price:'\u20B95,999', duration:'1 Year', level:'Class 9-12', subjects:['Mathematics','Science','English','Hindi','Social Science'], teachers:[
      {name:'Mr. Aman',subject:'Mathematics & Science',type:'Expert'},
      {name:'Mrs. Priya Sharma',subject:'Science'},
      {name:'Mr. Amit Singh',subject:'English'}
    ]},
    bpsc: { name:'BPSC', price:'\u20B98,999', duration:'8 Months', level:'Graduate', subjects:['General Studies','History','Geography','Polity','Economy'], teachers:[
      {name:'Mr. Aman',subject:'General Studies',type:'Expert'},
      {name:'Dr. Alok Verma',subject:'History'},
      {name:'Mrs. Kavita Reddy',subject:'Geography'}
    ]},
    ssc: { name:'SSC CGL/CHSL', price:'\u20B97,499', duration:'6 Months', level:'Graduate', subjects:['Quantitative Aptitude','Reasoning','English','General Awareness'], teachers:[
      {name:'Mr. Aman',subject:'Quantitative Aptitude',type:'Expert'},
      {name:'Mrs. Pooja Verma',subject:'Reasoning'},
      {name:'Mr. Deepak Yadav',subject:'English'}
    ]},
    railways: { name:'Railway Exams', price:'\u20B96,999', duration:'5 Months', level:'12th Pass', subjects:['Mathematics','General Science','Reasoning','General Awareness'], teachers:[
      {name:'Mr. Aman',subject:'Mathematics',type:'Expert'},
      {name:'Mrs. Rekha Singh',subject:'General Science'}
    ]},
    school: { name:'School Tuition', price:'\u20B93,999', duration:'1 Year', level:'Class 1-10', subjects:['English','Hindi','Mathematics','Science','Social Science'], teachers:[
      {name:'Mr. Aman',subject:'All Subjects',type:'Expert'},
      {name:'Mrs. Sunita Devi',subject:'Primary'},
      {name:'Mr. Rakesh Kumar',subject:'Middle School'}
    ]}
  };

  document.querySelectorAll('.course-details-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var key = btn.getAttribute('data-course');
      var course = courseData[key];
      if (!course) return;
      var body = document.getElementById('courseModalBody');
      if (!body) return;
      body.innerHTML = '<h2 style="font-size:20px;font-weight:700;margin-bottom:16px">' + course.name + '</h2>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">' +
        '<div style="padding:12px;background:var(--border-light);border-radius:var(--radius-sm)"><strong style="color:var(--primary);font-size:18px">' + course.price + '</strong><br><span style="font-size:12px;color:var(--text-muted)">Price</span></div>' +
        '<div style="padding:12px;background:var(--border-light);border-radius:var(--radius-sm)"><strong>' + course.duration + '</strong><br><span style="font-size:12px;color:var(--text-muted)">Duration</span></div>' +
        '<div style="padding:12px;background:var(--border-light);border-radius:var(--radius-sm)"><strong>' + course.level + '</strong><br><span style="font-size:12px;color:var(--text-muted)">Level</span></div>' +
        '<div style="padding:12px;background:var(--border-light);border-radius:var(--radius-sm)"><strong>' + course.subjects.length + ' Subjects</strong><br><span style="font-size:12px;color:var(--text-muted)">Included</span></div>' +
        '</div>' +
        '<h4 style="font-size:15px;font-weight:600;margin-bottom:10px">Subjects</h4>' +
        '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">' +
        course.subjects.map(function(s) { return '<span style="padding:5px 12px;background:var(--border-light);border-radius:20px;font-size:12px;font-weight:500">' + s + '</span>'; }).join('') +
        '</div>' +
        '<h4 style="font-size:15px;font-weight:600;margin-bottom:10px">Our Teachers</h4>' +
        course.teachers.map(function(t) {
          return '<div style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--border-light);border-radius:var(--radius-sm);margin-bottom:6px">' +
            '<div style="width:36px;height:36px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700">' + t.name.charAt(0) + '</div>' +
            '<div><strong style="font-size:13px">' + t.name + '</strong> <span style="font-size:12px;color:var(--text-muted)">' + t.subject + '</span>' +
            (t.type ? ' <span style="padding:2px 8px;background:var(--accent);color:#fff;border-radius:10px;font-size:10px;font-weight:700">' + t.type + '</span>' : '') +
            '</div></div>';
        }).join('');
      openModal('courseModal');
    });
  });

  // ===== HEALTH ANALYSIS =====
  var openHealthAnalysisBtns = document.querySelectorAll('#openHealthAnalysis, #openHealthAnalysis2');
  openHealthAnalysisBtns.forEach(function(btn) {
    btn.addEventListener('click', function() { openModal('healthAnalysisModal'); });
  });

  var healthRadarChartInstance = null;

  document.getElementById('analyzeHealthBtn').addEventListener('click', function() {
    var age = parseInt(document.getElementById('haAge').value) || 16;
    var sleep = parseFloat(document.getElementById('haSleep').value) || 7;
    var water = parseInt(document.getElementById('haWater').value) || 8;
    var studyHours = parseInt(document.getElementById('haStudyHours').value) || 6;
    var screenTime = parseInt(document.getElementById('haScreenTime').value) || 4;
    var exercise = parseInt(document.getElementById('haExercise').value) || 30;
    var mood = document.getElementById('haMood').value || 'good';
    var stress = parseInt(document.getElementById('haStress').value) || 5;
    var foodHabits = document.getElementById('haFoodHabits').value || 'moderate';
    var activity = document.getElementById('haActivity').value || 'moderate';
    var height = parseInt(document.getElementById('haHeight').value) || 165;
    var weight = parseInt(document.getElementById('haWeight').value) || 55;

    // Calculate scores
    var sleepScore = Math.min(100, Math.round((sleep / 9) * 100));
    var hydrationScore = Math.min(100, Math.round((water / 12) * 100));
    var fitnessScore = 0;
    if (activity === 'high') fitnessScore = 90;
    else if (activity === 'moderate') fitnessScore = 65;
    else if (activity === 'low') fitnessScore = 35;
    else fitnessScore = 15;
    fitnessScore = Math.min(100, fitnessScore + Math.round(exercise / 60 * 10));

    var stressScore = Math.max(10, Math.round(100 - (stress / 10) * 80));

    var focusScore = Math.round((sleepScore * 0.3 + stressScore * 0.3 + (100 - Math.min(100, screenTime * 10)) * 0.2 + hydrationScore * 0.2));

    var moodScores = { great:90, good:75, okay:55, low:35, stressed:25 };
    var brainScore = Math.round((moodScores[mood] || 50) * 0.3 + focusScore * 0.3 + sleepScore * 0.2 + fitnessScore * 0.2);

    var foodScores = { healthy:85, moderate:60, junk:30, skip:20 };
    var productivityScore = Math.round((studyHours / 10) * 40 + (foodScores[foodHabits] || 50) * 0.3 + focusScore * 0.3);
    productivityScore = Math.min(100, productivityScore);

    var overallScore = Math.round((sleepScore + hydrationScore + fitnessScore + stressScore + focusScore + brainScore + productivityScore) / 7);

    // BMI
    var heightM = height / 100;
    var bmi = weight / (heightM * heightM);

    // Update overall ring
    var overallRing = document.getElementById('overallRing');
    var overallScoreEl = document.getElementById('overallScore');
    if (overallRing) {
      setTimeout(function() {
        overallRing.style.transition = 'stroke-dasharray 1s ease';
        overallRing.setAttribute('stroke-dasharray', overallScore + ', 100');
      }, 200);
    }
    if (overallScoreEl) overallScoreEl.textContent = overallScore + '%';

    // Score cards
    var scores = [
      { label:'Brain Performance', score:brainScore, color:'#2563eb', bg:'rgba(37,99,235,0.1)' },
      { label:'Focus Score', score:focusScore, color:'#8b5cf6', bg:'rgba(139,92,246,0.1)' },
      { label:'Sleep Score', score:sleepScore, color:'#6366f1', bg:'rgba(99,102,241,0.1)' },
      { label:'Stress Score', score:stressScore, color:'#10b981', bg:'rgba(16,185,129,0.1)' },
      { label:'Fitness Score', score:fitnessScore, color:'#f59e0b', bg:'rgba(245,158,11,0.1)' },
      { label:'Hydration Score', score:hydrationScore, color:'#06b6d4', bg:'rgba(6,182,212,0.1)' },
      { label:'Productivity', score:productivityScore, color:'#ec4899', bg:'rgba(236,72,153,0.1)' },
      { label:'BMI', score:Math.round(Math.min(100, (bmi > 18.5 && bmi < 25) ? 85 : 50)), color:'#14b8a6', bg:'rgba(20,184,166,0.1)' }
    ];

    var cardsContainer = document.getElementById('analysisCards');
    if (cardsContainer) {
      cardsContainer.innerHTML = scores.map(function(s) {
        return '<div class="ad-card">' +
          '<div class="ad-card-icon" style="background:' + s.bg + '">' +
          '<span style="font-size:18px;font-weight:800;color:' + s.color + '">' + s.score + '</span>' +
          '</div>' +
          '<div class="ad-card-info">' +
          '<div class="ac-label">' + s.label + '</div>' +
          '<div class="ac-bar"><div class="ac-fill" style="width:' + s.score + '%;background:' + s.color + '"></div></div>' +
          '<div class="ac-val" style="color:' + s.color + '">' + s.score + '%</div>' +
          '</div></div>';
      }).join('');
    }

    // Radar chart
    var canvas = document.getElementById('healthRadarChart');
    if (canvas && typeof Chart !== 'undefined') {
      var ctx = canvas.getContext('2d');
      if (healthRadarChartInstance) healthRadarChartInstance.destroy();
      healthRadarChartInstance = new Chart(ctx, {
        type:'radar',
        data:{
          labels:['Brain','Focus','Sleep','Stress','Fitness','Hydration','Productivity'],
          datasets:[{
            label:'Your Score',
            data:[brainScore, focusScore, sleepScore, stressScore, fitnessScore, hydrationScore, productivityScore],
            backgroundColor:'rgba(37,99,235,0.15)',
            borderColor:'#2563eb',
            borderWidth:2,
            pointBackgroundColor:'#2563eb',
            pointBorderColor:'#fff',
            pointBorderWidth:2,
            pointRadius:4
          }]
        },
        options:{
          scales:{ r:{ beginAtZero:true, max:100, ticks:{ stepSize:20, font:{size:10} }, pointLabels:{font:{size:11}} } },
          plugins:{ legend:{ display:false } }
        }
      });
    }

    // Recommendations
    var recs = [];
    if (sleep < 7) recs.push({type:'danger', text:'Sleep is below recommended. Aim for 7-9 hours. Poor sleep affects memory, focus, and mood.'});
    else if (sleep >= 7 && sleep < 8) recs.push({type:'info', text:'Good sleep! Try to get 7.5-8 hours for optimal brain function.'});
    else recs.push({type:'good', text:'Excellent sleep duration! Keep maintaining your sleep schedule.'});

    if (water < 8) recs.push({type:'warning', text:'Water intake is low. Aim for 8-12 glasses daily. Dehydration reduces concentration by up to 25%.'});
    else recs.push({type:'good', text:'Great hydration! Keep drinking water throughout the day.'});

    if (stress > 7) recs.push({type:'danger', text:'High stress detected. Practice deep breathing, take breaks, and talk to someone you trust.'});
    else if (stress > 5) recs.push({type:'warning', text:'Moderate stress level. Try meditation or light exercise to manage stress.'});

    if (exercise < 30) recs.push({type:'warning', text:'Exercise is below recommended. Even 30 minutes of walking daily significantly improves brain health.'});
    else recs.push({type:'good', text:'Good exercise routine! Physical activity boosts memory and focus.'});

    if (screenTime > 6) recs.push({type:'warning', text:'Screen time is high. Use the 20-20-20 rule and limit recreational screen use.'});

    if (foodHabits === 'junk' || foodHabits === 'skip') recs.push({type:'danger', text:'Food habits need improvement. Eat balanced meals with brain foods like nuts, eggs, and fruits.'});
    else if (foodHabits === 'healthy') recs.push({type:'good', text:'Excellent food habits! A healthy diet directly improves brain performance.'});

    if (studyHours < 4) recs.push({type:'info', text:'Study hours are low. Try the Pomodoro technique to build consistent study habits.'});
    else if (studyHours > 10) recs.push({type:'warning', text:'Study hours are very high. Take regular breaks to avoid burnout. Quality matters more than quantity.'});

    recs.push({type:'info', text:'BMI: ' + bmi.toFixed(1) + ' — ' + (bmi < 18.5 ? 'Underweight. Eat more nutritious foods.' : bmi < 25 ? 'Healthy weight. Great!' : bmi < 30 ? 'Overweight. Increase physical activity.' : 'Obese. Consult a healthcare professional.')});

    var recContainer = document.getElementById('analysisRecommendations');
    if (recContainer) {
      recContainer.innerHTML = '<h4>Recommendations</h4>' +
        recs.map(function(r) { return '<div class="rec-item ' + r.type + '">' + r.text + '</div>'; }).join('');
    }

    document.getElementById('analysisOutput').style.display = 'block';
  });

  // ===== CAREER PATHS =====
  var careerData = {
    after10: {
      title:'After Class 10 — Stream Selection',
      content:'<h4>Choosing Your Stream</h4><p>The most important decision after Class 10. Your stream determines your career path.</p>' +
        '<ul><li><strong>Science (PCM):</strong> Engineering, Architecture, Research, IT</li>' +
        '<li><strong>Science (PCB):</strong> Medicine, Pharmacy, Biotechnology, Nursing</li>' +
        '<li><strong>Commerce:</strong> CA, CS, Banking, Business, Economics</li>' +
        '<li><strong>Arts/Humanities:</strong> UPSC, Law, Journalism, Design, Teaching</li></ul>' +
        '<h4>Important Entrance Exams</h4><ul><li>JEE Main/Advanced (Engineering)</li><li>NEET (Medical)</li><li>NDA (Defence)</li><li>NTSE (Scholarship)</li></ul>'
    },
    after12: {
      title:'After Class 12 — Career Paths',
      content:'<h4>Engineering</h4><ul><li>JEE Main → JEE Advanced → IIT/NIT</li><li>State Engineering Exams</li><li>Private Universities</li></ul>' +
        '<h4>Medical</h4><ul><li>NEET → MBBS/BDS/BAMS</li><li>AIIMS/JIPMER</li></ul>' +
        '<h4>Commerce</h4><ul><li>B.Com → CA/CS</li><li>BBA → MBA</li><li>Economics (Hons)</li></ul>' +
        '<h4>Arts</h4><ul><li>BA → UPSC/State PSC</li><li>Law (5-year integrated)</li><li>Journalism/Mass Communication</li></ul>'
    },
    government: {
      title:'Government Jobs Roadmap',
      content:'<h4>UPSC Civil Services</h4><ul><li>Graduation → Prelims → Mains → Interview</li><li>IAS/IPS/IFS and other services</li><li>Start preparation in college</li></ul>' +
        '<h4>BPSC (Bihar)</h4><ul><li>Graduation → Prelims → Mains → Interview</li><li>BPSC exams for Bihar government posts</li></ul>' +
        '<h4>SSC</h4><ul><li>CGL → Group B posts</li><li>CHSL → Group C posts</li><li>MTS → Multi-tasking staff</li></ul>' +
        '<h4>Railways</h4><ul><li>RRB NTPC → Group B/C</li><li>RRB Group D → Level 1 posts</li></ul>'
    },
    tech: {
      title:'Technology Careers',
      content:'<h4>BCA/B.Tech CS</h4><ul><li>4-year engineering degree or 3-year BCA</li><li>Focus on programming, algorithms, data structures</li></ul>' +
        '<h4>AI & Data Science</h4><ul><li>Machine Learning, Deep Learning</li><li>Data Analytics, Business Intelligence</li><li>Python, R, TensorFlow</li></ul>' +
        '<h4>Skills to Learn</h4><ul><li>Programming: Python, JavaScript, Java</li><li>Web Development: HTML, CSS, React</li><li>Data: SQL, Excel, Power BI</li><li>AI Tools: ChatGPT, Copilot, Gemini</li></ul>'
    },
    graduation: {
      title:'Graduation Options',
      content:'<h4>Bachelor of Arts (BA)</h4><ul><li>History, Political Science, Sociology, Economics</li><li>Path to UPSC, Teaching, Civil Services</li></ul>' +
        '<h4>Bachelor of Science (B.Sc)</h4><ul><li>Physics, Chemistry, Mathematics, Biology</li><li>Path to Research, MSc, B.Ed</li></ul>' +
        '<h4>Bachelor of Commerce (B.Com)</h4><ul><li>Accounting, Finance, Business</li><li>Path to CA, CS, MBA</li></ul>' +
        '<h4>Professional Courses</h4><ul><li>Law (LLB), Journalism, Design, Hotel Management</li></ul>'
    }
  };

  document.querySelectorAll('.career-path').forEach(function(path) {
    path.addEventListener('click', function() {
      var key = path.getAttribute('data-path');
      var data = careerData[key];
      if (!data) return;
      var details = document.getElementById('careerDetails');
      var title = document.getElementById('cdTitle');
      var body = document.getElementById('cdBody');
      if (title) title.textContent = data.title;
      if (body) body.innerHTML = data.content;
      if (details) { details.style.display = 'block'; details.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });

  var cdClose = document.getElementById('cdClose');
  if (cdClose) {
    cdClose.addEventListener('click', function() {
      var details = document.getElementById('careerDetails');
      if (details) details.style.display = 'none';
    });
  }

  // ===== POMODORO TIMER =====
  var pomoTime = document.getElementById('pomoTime');
  var pomoProgress = document.getElementById('pomoProgress');
  var pomoStart = document.getElementById('pomoStart');
  var pomoPause = document.getElementById('pomoPause');
  var pomoReset = document.getElementById('pomoReset');
  var pomoInterval = null;
  var pomoSeconds = 1500;
  var pomoTotal = 1500;
  var pomoCircumference = 2 * Math.PI * 15.9155;

  function formatTime(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function updatePomoDisplay() {
    if (pomoTime) pomoTime.textContent = formatTime(pomoSeconds);
    if (pomoProgress) {
      var pct = pomoTotal > 0 ? (pomoSeconds / pomoTotal) * 100 : 0;
      pomoProgress.setAttribute('stroke-dasharray', pct + ', 100');
    }
  }

  function pomoBeep() {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 800; osc.type = 'sine'; gain.gain.value = 0.3;
      osc.start(); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  }

  function startPomo() {
    if (pomoInterval) return;
    pomoInterval = setInterval(function() {
      pomoSeconds--;
      updatePomoDisplay();
      if (pomoSeconds <= 0) {
        clearInterval(pomoInterval); pomoInterval = null;
        pomoBeep();
        alert('Time is up! Take a break.');
        pomoSeconds = pomoTotal;
        updatePomoDisplay();
      }
    }, 1000);
    if (pomoStart) pomoStart.style.display = 'none';
    if (pomoPause) pomoPause.style.display = 'inline-flex';
  }

  function pausePomo() {
    if (pomoInterval) { clearInterval(pomoInterval); pomoInterval = null; }
    if (pomoStart) pomoStart.style.display = 'inline-flex';
    if (pomoPause) pomoPause.style.display = 'none';
  }

  function resetPomo() {
    pausePomo();
    pomoSeconds = pomoTotal;
    updatePomoDisplay();
  }

  if (pomoStart) pomoStart.addEventListener('click', startPomo);
  if (pomoPause) pomoPause.addEventListener('click', pausePomo);
  if (pomoReset) pomoReset.addEventListener('click', resetPomo);

  document.querySelectorAll('.pomo-mode').forEach(function(mode) {
    mode.addEventListener('click', function() {
      document.querySelectorAll('.pomo-mode').forEach(function(m) { m.classList.remove('active'); });
      mode.classList.add('active');
      var dur = parseInt(mode.getAttribute('data-duration'));
      pomoTotal = dur * 60;
      pomoSeconds = pomoTotal;
      pausePomo();
      updatePomoDisplay();
    });
  });

  updatePomoDisplay();

  // ===== GOALS =====
  var goalInput = document.getElementById('goalInput');
  var addGoalBtn = document.getElementById('addGoalBtn');
  var goalsList = document.getElementById('goalsList');
  var goalProgress = document.getElementById('goalProgress');
  var goalPercent = document.getElementById('goalPercent');
  var goals = JSON.parse(localStorage.getItem('amanshuGoals') || '[]');

  function renderGoals() {
    if (!goalsList) return;
    goalsList.innerHTML = '';
    goals.forEach(function(goal, i) {
      var li = document.createElement('li');
      li.className = 'goal-item' + (goal.done ? ' completed' : '');
      li.innerHTML = '<input type="checkbox" class="goal-check" ' + (goal.done ? 'checked' : '') + ' data-index="' + i + '">' +
        '<span class="goal-text">' + goal.text + '</span>' +
        '<button class="goal-delete" data-index="' + i + '">\u2715</button>';
      goalsList.appendChild(li);
    });
    updateGoalProgress();
    localStorage.setItem('amanshuGoals', JSON.stringify(goals));
  }

  function updateGoalProgress() {
    if (!goalProgress || goals.length === 0) {
      if (goalProgress) goalProgress.setAttribute('stroke-dasharray', '0, 100');
      if (goalPercent) goalPercent.textContent = '0%';
      return;
    }
    var completed = goals.filter(function(g) { return g.done; }).length;
    var pct = Math.round((completed / goals.length) * 100);
    if (goalProgress) goalProgress.setAttribute('stroke-dasharray', pct + ', 100');
    if (goalPercent) goalPercent.textContent = pct + '%';
  }

  function addGoal(text) {
    if (!text || !text.trim()) return;
    goals.push({ text:text.trim(), done:false });
    renderGoals();
  }

  if (addGoalBtn) {
    addGoalBtn.addEventListener('click', function() {
      addGoal(goalInput.value);
      if (goalInput) goalInput.value = '';
    });
  }

  if (goalInput) {
    goalInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') { addGoal(goalInput.value); goalInput.value = ''; }
    });
  }

  if (goalsList) {
    goalsList.addEventListener('click', function(e) {
      var idx;
      if (e.target.classList.contains('goal-check')) {
        idx = parseInt(e.target.getAttribute('data-index'));
        goals[idx].done = !goals[idx].done;
        renderGoals();
      } else if (e.target.classList.contains('goal-delete')) {
        idx = parseInt(e.target.getAttribute('data-index'));
        goals.splice(idx, 1);
        renderGoals();
      }
    });
  }

  renderGoals();

  // ===== QUIZ =====
  var quizData = [
    { q:'Capital of India?', options:['Mumbai','New Delhi','Kolkata','Chennai'], answer:1 },
    { q:'Red Planet?', options:['Venus','Mars','Jupiter','Saturn'], answer:1 },
    { q:'15 \u00D7 15?', options:['200','225','250','275'], answer:1 },
    { q:'Telephone inventor?', options:['Edison','Newton','Bell','Tesla'], answer:2 },
    { q:'Largest ocean?', options:['Atlantic','Indian','Pacific','Arctic'], answer:2 }
  ];

  var startQuizBtn = document.getElementById('startQuizBtn');
  var quizActive = document.getElementById('quizActive');
  var quizQuestion = document.getElementById('quizQuestion');
  var quizOptions = document.getElementById('quizOptions');
  var quizProgressEl = document.getElementById('quizProgress');
  var quizScoreEl = document.getElementById('quizScore');
  var quizResult = document.getElementById('quizResult');
  var quizResultText = document.getElementById('quizResultText');
  var quizFinalScore = document.getElementById('quizFinalScore');
  var restartQuizBtn = document.getElementById('restartQuizBtn');
  var currentQuizIndex = 0;
  var quizScore = 0;

  function renderQuizQuestion() {
    if (currentQuizIndex >= quizData.length) { showQuizResult(); return; }
    var q = quizData[currentQuizIndex];
    if (quizProgressEl) quizProgressEl.textContent = 'Question ' + (currentQuizIndex + 1) + '/' + quizData.length;
    if (quizScoreEl) quizScoreEl.textContent = 'Score: ' + quizScore;
    if (quizQuestion) quizQuestion.textContent = q.q;
    if (quizOptions) {
      quizOptions.innerHTML = '';
      q.options.forEach(function(opt, i) {
        var btn = document.createElement('button');
        btn.className = 'quiz-opt';
        btn.textContent = opt;
        btn.addEventListener('click', function() {
          var btns = quizOptions.querySelectorAll('.quiz-opt');
          btns.forEach(function(b, j) {
            b.disabled = true;
            if (j === q.answer) b.classList.add('correct');
            if (j === i && j !== q.answer) b.classList.add('wrong');
          });
          if (i === q.answer) quizScore++;
          if (quizScoreEl) quizScoreEl.textContent = 'Score: ' + quizScore;
          setTimeout(function() { currentQuizIndex++; renderQuizQuestion(); }, 1000);
        });
        quizOptions.appendChild(btn);
      });
    }
  }

  function showQuizResult() {
    if (quizActive) quizActive.style.display = 'none';
    if (quizResult) quizResult.style.display = 'block';
    var pct = Math.round((quizScore / quizData.length) * 100);
    var msg = pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good job!' : pct >= 40 ? 'Not bad, keep trying!' : 'Keep practicing!';
    if (quizResultText) quizResultText.textContent = msg;
    if (quizFinalScore) quizFinalScore.textContent = quizScore + ' / ' + quizData.length + ' (' + pct + '%)';
  }

  function startQuiz() {
    currentQuizIndex = 0; quizScore = 0;
    if (startQuizBtn) startQuizBtn.style.display = 'none';
    if (quizActive) quizActive.style.display = 'block';
    if (quizResult) quizResult.style.display = 'none';
    renderQuizQuestion();
  }

  if (startQuizBtn) startQuizBtn.addEventListener('click', startQuiz);
  if (restartQuizBtn) restartQuizBtn.addEventListener('click', startQuiz);

  // ===== CONTACT FORM =====
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }

  // Initial counter animation if home is active
  if (homeSection && homeSection.classList.contains('active')) {
    animateCounters();
  }
});
