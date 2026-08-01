document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar nav a');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.getElementById('hamburger');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const themeIcon = darkModeToggle ? darkModeToggle.querySelector('.theme-icon') : null;
    const html = document.documentElement;
    const body = document.body;
    const courseCards = document.querySelectorAll('.course-card');
    const courseModal = document.getElementById('courseModal');
    const courseModalClose = courseModal ? courseModal.querySelector('.modal-close') : null;
    const courseModalOverlay = courseModal ? courseModal.querySelector('.modal-overlay') : null;
    const classSelect = document.getElementById('classSelect');
    const classGoBtn = document.getElementById('classGoBtn');
    const classResult = document.getElementById('classResult');
    const healthPills = document.querySelectorAll('.health-pill');
    const healthCards = document.querySelectorAll('.health-card');
    const healthSaveBtn = document.getElementById('healthSaveBtn');
    const aiHealthBtn = document.getElementById('aiHealthBtn');
    const aiHealthModal = document.getElementById('aiHealthModal');
    const aiHealthModalClose = aiHealthModal ? aiHealthModal.querySelector('.modal-close') : null;
    const aiHealthModalOverlay = aiHealthModal ? aiHealthModal.querySelector('.modal-overlay') : null;
    const analyzeBtn = document.getElementById('analyzeBtn');
    const healthInput = document.getElementById('healthInput');
    const roadmapPills = document.querySelectorAll('.roadmap-pill');
    const roadmapPanels = document.querySelectorAll('.roadmap-panel');
    const startTimerBtn = document.getElementById('startTimer');
    const pauseTimerBtn = document.getElementById('pauseTimer');
    const resetTimerBtn = document.getElementById('resetTimer');
    const timerDisplay = document.getElementById('timerDisplay');
    const timerLabel = document.getElementById('timerLabel');
    const goalInput = document.getElementById('goalInput');
    const addGoalBtn = document.getElementById('addGoalBtn');
    const goalsList = document.getElementById('goalsList');
    const goalsProgress = document.getElementById('goalsProgress');
    const quizStartBtn = document.getElementById('quizStartBtn');
    const quizContainer = document.getElementById('quizContainer');
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const loginModalClose = loginModal ? loginModal.querySelector('.modal-close') : null;
    const loginModalOverlay = loginModal ? loginModal.querySelector('.modal-overlay') : null;
    const loginForm = document.getElementById('loginForm');
    const downloadBtns = document.querySelectorAll('.download-btn');
    const scrollToTop = document.getElementById('scrollToTop');
    const navLinks = document.querySelectorAll('.nav-link');

    let timerInterval = null;
    let timerSeconds = 1500;
    let isWorkSession = true;
    let goals = JSON.parse(localStorage.getItem('amanshuGoals')) || [];
    let healthData = JSON.parse(localStorage.getItem('amanshuHealth')) || [];
    let radarChart = null;

    const courseData = {
        cbse: { name:'CBSE', price:'₹25,000/year', duration:'1 Year', level:'Class 1-10', teachers:[
            {name:'Mr. Aman',subject:'Mathematics & Science',type:'Expert'},
            {name:'Mrs. Priya Sharma',subject:'Science'},
            {name:'Mr. Amit Singh',subject:'English'},
            {name:'Mrs. Neha Gupta',subject:'Hindi'},
            {name:'Mr. Suresh Patel',subject:'Social Science'}
        ]},
        bpsc: { name:'BPSC', price:'₹35,000/year', duration:'8 Months', level:'Graduate', teachers:[
            {name:'Mr. Aman',subject:'General Studies',type:'Expert'},
            {name:'Dr. Alok Verma',subject:'General Studies'},
            {name:'Mr. Vikram Singh',subject:'History'},
            {name:'Mrs. Kavita Reddy',subject:'Geography'},
            {name:'Mr. Manish Kumar',subject:'Polity'}
        ]},
        ssc: { name:'SSC', price:'₹30,000/year', duration:'6 Months', level:'Graduate', teachers:[
            {name:'Mr. Aman',subject:'Quantitative Aptitude',type:'Expert'},
            {name:'Mrs. Pooja Verma',subject:'Reasoning'},
            {name:'Mr. Deepak Yadav',subject:'English'}
        ]},
        railways: { name:'Railways', price:'₹28,000/year', duration:'5 Months', level:'12th Pass', teachers:[
            {name:'Mr. Aman',subject:'Mathematics',type:'Expert'},
            {name:'Mrs. Rekha Singh',subject:'General Science'},
            {name:'Mr. Rajesh Yadav',subject:'Reasoning'}
        ]},
        school: { name:'School Courses', price:'₹15,000/year', duration:'1 Year', level:'Class 1-10', teachers:[
            {name:'Mr. Aman',subject:'All Subjects',type:'Expert'},
            {name:'Mrs. Sunita Devi',subject:'Primary Section'},
            {name:'Mr. Rakesh Kumar',subject:'Middle School'}
        ]}
    };

    const classData = {
        1:{name:'Class 1',subjects:['English','Hindi','Mathematics','EVS','Art & Craft','Physical Education'],timing:'8:00 AM - 12:00 PM',fees:'₹5,000/year'},
        2:{name:'Class 2',subjects:['English','Hindi','Mathematics','EVS','Art & Craft','Physical Education'],timing:'8:00 AM - 12:00 PM',fees:'₹5,000/year'},
        3:{name:'Class 3',subjects:['English','Hindi','Mathematics','Science','Social Science','Computer'],timing:'8:00 AM - 1:00 PM',fees:'₹8,000/year'},
        4:{name:'Class 4',subjects:['English','Hindi','Mathematics','Science','Social Science','Computer'],timing:'8:00 AM - 1:00 PM',fees:'₹8,000/year'},
        5:{name:'Class 5',subjects:['English','Hindi','Mathematics','Science','Social Science','Computer','General Knowledge'],timing:'8:00 AM - 2:00 PM',fees:'₹10,000/year'},
        6:{name:'Class 6',subjects:['English','Hindi','Mathematics','Science','Social Science','Computer','Sanskrit'],timing:'7:30 AM - 2:00 PM',fees:'₹12,000/year'},
        7:{name:'Class 7',subjects:['English','Hindi','Mathematics','Science','Social Science','Computer','Sanskrit'],timing:'7:30 AM - 2:00 PM',fees:'₹12,000/year'},
        8:{name:'Class 8',subjects:['English','Hindi','Mathematics','Science','Social Science','Computer','Sanskrit'],timing:'7:30 AM - 2:30 PM',fees:'₹15,000/year'},
        9:{name:'Class 9',subjects:['English','Hindi','Mathematics','Science','Social Science','Computer','Sanskrit'],timing:'7:30 AM - 2:30 PM',fees:'₹18,000/year'},
        10:{name:'Class 10',subjects:['English','Hindi','Mathematics','Science','Social Science','Computer','Sanskrit'],timing:'7:00 AM - 3:00 PM',fees:'₹20,000/year'}
    };

    const quizData = [
        {q:'What is the capital of India?', options:['Mumbai','New Delhi','Kolkata','Chennai'], answer:1},
        {q:'Which planet is known as Red Planet?', options:['Venus','Mars','Jupiter','Saturn'], answer:1},
        {q:'What is 15 × 15?', options:['200','225','250','275'], answer:1},
        {q:'Who invented the telephone?', options:['Edison','Newton','Bell','Tesla'], answer:2},
        {q:'Largest ocean in the world?', options:['Atlantic','Indian','Pacific','Arctic'], answer:2}
    ];

    function hideAllSections() {
        sections.forEach(function(s) { s.classList.remove('active'); });
    }

    function showSection(id) {
        var target = document.getElementById(id);
        if (target) {
            target.classList.add('active');
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function handleNavClick(e) {
        e.preventDefault();
        var link = e.currentTarget;
        var targetId = link.getAttribute('data-section') || link.getAttribute('href').substring(1);
        navLinks.forEach(function(l) { l.classList.remove('active'); });
        link.classList.add('active');
        hideAllSections();
        showSection(targetId);
        if (sidebar) sidebar.classList.remove('mobile-open');
    }

    navLinks.forEach(function(link) {
        link.addEventListener('click', handleNavClick);
    });

    if (sidebarLinks) {
        sidebarLinks.forEach(function(link) {
            link.addEventListener('click', handleNavClick);
        });
    }

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
        });
        document.addEventListener('click', function(e) {
            if (sidebar && sidebar.classList.contains('mobile-open') && !sidebar.contains(e.target) && e.target !== hamburger && !hamburger.contains(e.target)) {
                sidebar.classList.remove('mobile-open');
            }
        });
    }

    function initDarkMode() {
        var saved = localStorage.getItem('amanshuTheme');
        if (saved === 'dark') {
            html.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            html.removeAttribute('data-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            var isDark = html.getAttribute('data-theme') === 'dark';
            if (isDark) {
                html.removeAttribute('data-theme');
                localStorage.setItem('amanshuTheme', 'light');
                if (themeIcon) themeIcon.textContent = '🌙';
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('amanshuTheme', 'dark');
                if (themeIcon) themeIcon.textContent = '☀️';
            }
        });
    }

    initDarkMode();

    function animateCounters() {
        var counters = document.querySelectorAll('.stat-number');
        counters.forEach(function(counter) {
            var target = parseInt(counter.getAttribute('data-target')) || 0;
            var current = 0;
            var increment = target / 60;
            var timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 30);
        });
    }

    var statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    var statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    var quickActions = document.querySelectorAll('.quick-action-card');
    quickActions.forEach(function(card) {
        card.addEventListener('click', function() {
            var targetId = card.getAttribute('data-section');
            if (targetId) {
                hideAllSections();
                showSection(targetId);
                navLinks.forEach(function(l) {
                    l.classList.remove('active');
                    if (l.getAttribute('data-section') === targetId) l.classList.add('active');
                });
            }
        });
    });

    courseCards.forEach(function(card) {
        card.addEventListener('click', function() {
            var courseKey = card.getAttribute('data-course');
            var course = courseData[courseKey];
            if (!course || !courseModal) return;
            var modalBody = courseModal.querySelector('.modal-body');
            if (!modalBody) return;
            var teachersHtml = course.teachers.map(function(t) {
                return '<div class="teacher-item"><strong>' + t.name + '</strong><span>' + t.subject + '</span>' + (t.type ? '<span class="teacher-badge">' + t.type + '</span>' : '') + '</div>';
            }).join('');
            modalBody.innerHTML =
                '<h2>' + course.name + ' Course</h2>' +
                '<div class="course-details-modal">' +
                '<div class="detail-row"><span>Price:</span><strong>' + course.price + '</strong></div>' +
                '<div class="detail-row"><span>Duration:</span><strong>' + course.duration + '</strong></div>' +
                '<div class="detail-row"><span>Level:</span><strong>' + course.level + '</strong></div>' +
                '</div>' +
                '<h3>Our Teachers</h3>' +
                '<div class="teachers-list">' + teachersHtml + '</div>' +
                '<button class="btn btn-primary enroll-btn">Enroll Now</button>';
            courseModal.classList.add('active');
            var enrollBtn = modalBody.querySelector('.enroll-btn');
            if (enrollBtn) {
                enrollBtn.addEventListener('click', function() {
                    alert('Thank you for your interest in ' + course.name + '! Our team will contact you soon.');
                });
            }
        });
    });

    function closeCourseModal() {
        if (courseModal) courseModal.classList.remove('active');
    }

    if (courseModalClose) courseModalClose.addEventListener('click', closeCourseModal);
    if (courseModalOverlay) courseModalOverlay.addEventListener('click', closeCourseModal);

    if (classGoBtn && classSelect && classResult) {
        classGoBtn.addEventListener('click', function() {
            var classId = classSelect.value;
            if (!classId) {
                classResult.innerHTML = '<p>Please select a class first.</p>';
                return;
            }
            var cls = classData[classId];
            if (!cls) return;
            var subjectsHtml = cls.subjects.map(function(s) {
                return '<span class="subject-tag">' + s + '</span>';
            }).join('');
            classResult.innerHTML =
                '<h3>' + cls.name + '</h3>' +
                '<div class="class-info">' +
                '<div class="info-item"><strong>Timing:</strong> ' + cls.timing + '</div>' +
                '<div class="info-item"><strong>Fees:</strong> ' + cls.fees + '</div>' +
                '</div>' +
                '<h4>Subjects</h4>' +
                '<div class="subjects-grid">' + subjectsHtml + '</div>';
            classResult.classList.add('active');
        });
    }

    healthPills.forEach(function(pill) {
        pill.addEventListener('click', function() {
            healthPills.forEach(function(p) { p.classList.remove('active'); });
            pill.classList.add('active');
            var category = pill.getAttribute('data-category');
            healthCards.forEach(function(card) {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    if (healthSaveBtn) {
        healthSaveBtn.addEventListener('click', function() {
            var activeCards = document.querySelectorAll('.health-card[style="display: block"], .health-card:not([style])');
            var data = [];
            activeCards.forEach(function(card) {
                var title = card.querySelector('h4') || card.querySelector('h3');
                if (title) data.push(title.textContent);
            });
            healthData.push({ date: new Date().toISOString(), items: data });
            localStorage.setItem('amanshuHealth', JSON.stringify(healthData));
            alert('Health data saved successfully!');
        });
    }

    function openAiHealthModal() {
        if (aiHealthModal) aiHealthModal.classList.add('active');
    }

    function closeAiHealthModal() {
        if (aiHealthModal) aiHealthModal.classList.remove('active');
    }

    if (aiHealthBtn) aiHealthBtn.addEventListener('click', openAiHealthModal);
    if (aiHealthModalClose) aiHealthModalClose.addEventListener('click', closeAiHealthModal);
    if (aiHealthModalOverlay) aiHealthModalOverlay.addEventListener('click', closeAiHealthModal);

    function parseHealthInput(text) {
        var lower = text.toLowerCase();
        var scores = { energy: 50, focus: 50, hydration: 50, sleep: 50, exercise: 50, mental: 50 };

        if (lower.includes('sleep') || lower.includes('insomnia') || lower.includes('rest')) {
            scores.sleep = lower.includes('good sleep') || lower.includes('well rested') ? 80 : 35;
        }
        if (lower.includes('tired') || lower.includes('fatigue') || lower.includes('exhausted')) {
            scores.energy = 25;
            scores.exercise = lower.includes('exercise') ? 60 : 30;
        }
        if (lower.includes('water') || lower.includes('hydrat') || lower.includes('thirsty')) {
            scores.hydration = lower.includes('drink water') || lower.includes('hydrated') ? 75 : 35;
        }
        if (lower.includes('exercise') || lower.includes('workout') || lower.includes('gym') || lower.includes('run')) {
            scores.exercise = 75;
            scores.energy = Math.min(scores.energy + 20, 95);
        }
        if (lower.includes('stress') || lower.includes('anxious') || lower.includes('worried') || lower.includes('depress')) {
            scores.mental = 30;
            scores.focus = 35;
        }
        if (lower.includes('focus') || lower.includes('concentrat') || lower.includes('attention')) {
            scores.focus = lower.includes('good focus') || lower.includes('focused') ? 80 : 45;
        }
        if (lower.includes('headache') || lower.includes('migraine')) {
            scores.energy = Math.max(scores.energy - 20, 10);
            scores.mental = Math.max(scores.mental - 15, 10);
        }
        if (lower.includes('eye') || lower.includes('eyes') || lower.includes('strain')) {
            scores.focus = Math.max(scores.focus - 15, 15);
        }
        if (lower.includes('healthy') || lower.includes('good') || lower.includes('great') || lower.includes('fine')) {
            scores.energy = Math.max(scores.energy, 70);
            scores.mental = Math.max(scores.mental, 65);
        }
        if (lower.includes('meditat') || lower.includes('yoga') || lower.includes('peaceful') || lower.includes('calm')) {
            scores.mental = 80;
            scores.focus = Math.min(scores.focus + 15, 95);
        }
        return scores;
    }

    function drawRadarChart(scores) {
        var canvas = document.getElementById('radarChart');
        if (!canvas || typeof Chart === 'undefined') {
            var fallback = document.getElementById('radarFallback');
            if (fallback) fallback.style.display = 'block';
            return;
        }
        var ctx = canvas.getContext('2d');
        if (radarChart) radarChart.destroy();
        radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Energy','Focus','Hydration','Sleep','Exercise','Mental Health'],
                datasets: [{
                    label: 'Your Health',
                    data: [scores.energy, scores.focus, scores.hydration, scores.sleep, scores.exercise, scores.mental],
                    backgroundColor: 'rgba(37,99,235,0.2)',
                    borderColor: '#2563eb',
                    borderWidth: 2,
                    pointBackgroundColor: '#2563eb'
                }]
            },
            options: {
                scales: { r: { beginAtZero: true, max: 100 } },
                plugins: { legend: { display: false } }
            }
        });
    }

    function updateProgressRings(scores) {
        var ringIds = ['energyRing','focusRing','hydrationRing','sleepRing'];
        var scoreKeys = ['energy','focus','hydration','sleep'];
        ringIds.forEach(function(id, i) {
            var ring = document.getElementById(id);
            if (ring) {
                var circumference = 2 * Math.PI * 45;
                var offset = circumference - (scores[scoreKeys[i]] / 100) * circumference;
                ring.style.strokeDasharray = circumference;
                ring.style.strokeDashoffset = offset;
                var label = document.getElementById(id + 'Label');
                if (label) label.textContent = scores[scoreKeys[i]];
            }
        });
    }

    function updateBodySvg(scores) {
        var bodyParts = {
            head: scores.focus,
            brain: scores.mental,
            heart: scores.energy,
            stomach: scores.hydration,
            legs: scores.exercise
        };
        Object.keys(bodyParts).forEach(function(part) {
            var el = document.querySelector('[data-body-part="' + part + '"]');
            if (el) {
                if (bodyParts[part] < 40) {
                    el.classList.add('glow-warning');
                    el.classList.remove('glow-good');
                } else if (bodyParts[part] > 70) {
                    el.classList.add('glow-good');
                    el.classList.remove('glow-warning');
                } else {
                    el.classList.remove('glow-warning', 'glow-good');
                }
            }
        });
    }

    function generateAiTips(scores) {
        var tips = [];
        if (scores.energy < 40) tips.push({ type:'warning', text:'Your energy levels are low. Try getting more sleep and eating nutritious meals.' });
        else if (scores.energy > 70) tips.push({ type:'good', text:'Great energy levels! Keep maintaining your routine.' });
        else tips.push({ type:'suggestion', text:'Your energy is moderate. A short walk or healthy snack can boost it.' });

        if (scores.hydration < 40) tips.push({ type:'warning', text:'You need more water! Aim for 8-10 glasses daily.' });
        else if (scores.hydration > 70) tips.push({ type:'good', text:'Good hydration habits! Keep it up.' });
        else tips.push({ type:'suggestion', text:'Try drinking water more frequently throughout the day.' });

        if (scores.mental < 40) tips.push({ type:'warning', text:'High stress detected. Practice deep breathing or meditation for 10 minutes.' });
        else if (scores.mental > 70) tips.push({ type:'good', text:'Mental health looks great! Keep practicing mindfulness.' });
        else tips.push({ type:'suggestion', text:'Consider taking short breaks to reduce stress levels.' });

        if (scores.exercise < 40) tips.push({ type:'warning', text:'You need more physical activity. Start with 20 minutes of walking daily.' });
        else if (scores.exercise > 70) tips.push({ type:'good', text:'Excellent exercise routine! Your body thanks you.' });
        else tips.push({ type:'suggestion', text:'Try adding 15 more minutes of exercise to your routine.' });

        return tips.slice(0, 4);
    }

    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            var text = healthInput ? healthInput.value.trim() : '';
            if (!text) {
                alert('Please describe your health condition first.');
                return;
            }
            var scores = parseHealthInput(text);
            drawRadarChart(scores);
            updateProgressRings(scores);
            updateBodySvg(scores);
            var tipsContainer = document.getElementById('aiTips');
            if (tipsContainer) {
                var tips = generateAiTips(scores);
                tipsContainer.innerHTML = tips.map(function(tip) {
                    var icon = tip.type === 'warning' ? '⚠️' : tip.type === 'good' ? '✅' : '💡';
                    return '<div class="ai-tip ' + tip.type + '">' + icon + ' ' + tip.text + '</div>';
                }).join('');
            }
            var resultsDiv = document.getElementById('aiResults');
            if (resultsDiv) resultsDiv.style.display = 'block';
        });
    }

    roadmapPills.forEach(function(pill) {
        pill.addEventListener('click', function() {
            roadmapPills.forEach(function(p) { p.classList.remove('active'); });
            pill.classList.add('active');
            var roadmapId = pill.getAttribute('data-roadmap');
            roadmapPanels.forEach(function(panel) {
                panel.classList.remove('active');
                if (panel.id === roadmapId) panel.classList.add('active');
            });
        });
    });

    function formatTime(seconds) {
        var m = Math.floor(seconds / 60);
        var s = seconds % 60;
        return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }

    function playBeep() {
        try {
            var ctx = new (window.AudioContext || window.webkitAudioContext)();
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 800;
            osc.type = 'sine';
            gain.gain.value = 0.3;
            osc.start();
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
            osc.stop(ctx.currentTime + 0.5);
        } catch(e) {}
    }

    function updateTimerDisplay() {
        if (timerDisplay) timerDisplay.textContent = formatTime(timerSeconds);
        if (timerLabel) timerLabel.textContent = isWorkSession ? 'Focus Time' : 'Break Time';
    }

    function startTimer() {
        if (timerInterval) return;
        timerInterval = setInterval(function() {
            timerSeconds--;
            updateTimerDisplay();
            if (timerSeconds <= 0) {
                playBeep();
                clearInterval(timerInterval);
                timerInterval = null;
                isWorkSession = !isWorkSession;
                timerSeconds = isWorkSession ? 1500 : 300;
                updateTimerDisplay();
                alert(isWorkSession ? 'Break over! Time to focus.' : 'Great work! Take a break.');
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    function resetTimer() {
        pauseTimer();
        isWorkSession = true;
        timerSeconds = 1500;
        updateTimerDisplay();
    }

    if (startTimerBtn) startTimerBtn.addEventListener('click', startTimer);
    if (pauseTimerBtn) pauseTimerBtn.addEventListener('click', pauseTimer);
    if (resetTimerBtn) resetTimerBtn.addEventListener('click', resetTimer);
    updateTimerDisplay();

    function renderGoals() {
        if (!goalsList) return;
        goalsList.innerHTML = '';
        goals.forEach(function(goal, index) {
            var li = document.createElement('li');
            li.className = 'goal-item' + (goal.done ? ' completed' : '');
            li.innerHTML =
                '<input type="checkbox" class="goal-checkbox" ' + (goal.done ? 'checked' : '') + ' data-index="' + index + '">' +
                '<span class="goal-text">' + goal.text + '</span>' +
                '<button class="goal-delete" data-index="' + index + '">✕</button>';
            goalsList.appendChild(li);
        });
        updateGoalsProgress();
        localStorage.setItem('amanshuGoals', JSON.stringify(goals));
    }

    function updateGoalsProgress() {
        if (!goalsProgress || goals.length === 0) {
            if (goalsProgress) goalsProgress.style.strokeDashoffset = 283;
            return;
        }
        var completed = goals.filter(function(g) { return g.done; }).length;
        var pct = completed / goals.length;
        var circumference = 2 * Math.PI * 45;
        var offset = circumference - pct * circumference;
        if (goalsProgress) goalsProgress.style.strokeDashoffset = offset;
        var pctLabel = document.getElementById('goalsPercent');
        if (pctLabel) pctLabel.textContent = Math.round(pct * 100) + '%';
    }

    function addGoal(text) {
        if (!text.trim()) return;
        goals.push({ text: text.trim(), done: false });
        renderGoals();
    }

    if (addGoalBtn) {
        addGoalBtn.addEventListener('click', function() {
            addGoal(goalInput.value);
            goalInput.value = '';
        });
    }

    if (goalInput) {
        goalInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addGoal(goalInput.value);
                goalInput.value = '';
            }
        });
    }

    if (goalsList) {
        goalsList.addEventListener('click', function(e) {
            var idx;
            if (e.target.classList.contains('goal-checkbox')) {
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

    var currentQuizIndex = 0;
    var quizScore = 0;

    function renderQuizQuestion() {
        if (!quizContainer || currentQuizIndex >= quizData.length) {
            showQuizResult();
            return;
        }
        var q = quizData[currentQuizIndex];
        var optionsHtml = q.options.map(function(opt, i) {
            return '<button class="quiz-option" data-index="' + i + '">' + opt + '</button>';
        }).join('');
        quizContainer.innerHTML =
            '<div class="quiz-progress">Question ' + (currentQuizIndex + 1) + ' of ' + quizData.length + '</div>' +
            '<div class="quiz-question">' + q.q + '</div>' +
            '<div class="quiz-options">' + optionsHtml + '</div>';
        var optionBtns = quizContainer.querySelectorAll('.quiz-option');
        optionBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var selected = parseInt(btn.getAttribute('data-index'));
                var correct = q.answer;
                optionBtns.forEach(function(b, i) {
                    b.disabled = true;
                    if (i === correct) b.classList.add('correct');
                    if (i === selected && i !== correct) b.classList.add('wrong');
                });
                if (selected === correct) quizScore++;
                setTimeout(function() {
                    currentQuizIndex++;
                    renderQuizQuestion();
                }, 1000);
            });
        });
    }

    function showQuizResult() {
        if (!quizContainer) return;
        var pct = Math.round((quizScore / quizData.length) * 100);
        var msg = pct >= 80 ? 'Excellent! You are a genius!' : pct >= 60 ? 'Good job! Keep learning!' : pct >= 40 ? 'Not bad! Try again to improve.' : 'Keep trying! Practice makes perfect.';
        quizContainer.innerHTML =
            '<div class="quiz-result">' +
            '<h3>Quiz Complete!</h3>' +
            '<div class="quiz-score">' + quizScore + ' / ' + quizData.length + '</div>' +
            '<div class="quiz-percentage">' + pct + '%</div>' +
            '<p class="quiz-message">' + msg + '</p>' +
            '<button class="btn btn-primary quiz-restart">Try Again</button>' +
            '</div>';
        var restartBtn = quizContainer.querySelector('.quiz-restart');
        if (restartBtn) {
            restartBtn.addEventListener('click', function() {
                currentQuizIndex = 0;
                quizScore = 0;
                renderQuizQuestion();
            });
        }
    }

    if (quizStartBtn) {
        quizStartBtn.addEventListener('click', function() {
            currentQuizIndex = 0;
            quizScore = 0;
            quizStartBtn.style.display = 'none';
            quizContainer.style.display = 'block';
            renderQuizQuestion();
        });
    }

    function openLoginModal() {
        if (loginModal) loginModal.classList.add('active');
    }

    function closeLoginModal() {
        if (loginModal) loginModal.classList.remove('active');
    }

    if (loginBtn) loginBtn.addEventListener('click', openLoginModal);
    if (loginModalClose) loginModalClose.addEventListener('click', closeLoginModal);
    if (loginModalOverlay) loginModalOverlay.addEventListener('click', closeLoginModal);

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var phone = document.getElementById('loginPhone');
            var email = document.getElementById('loginEmail');
            var phoneVal = phone ? phone.value.trim() : '';
            var emailVal = email ? email.value.trim() : '';
            var phoneRegex = /^\d{10}$/;
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!phoneRegex.test(phoneVal)) {
                alert('Please enter a valid 10-digit phone number.');
                return;
            }
            if (!emailRegex.test(emailVal)) {
                alert('Please enter a valid email address.');
                return;
            }
            alert('Login successful! Welcome to Amanshu Classes.');
            closeLoginModal();
            loginForm.reset();
        });
    }

    downloadBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            alert('Download will start soon!');
        });
    });

    if (scrollToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTop.classList.add('visible');
            } else {
                scrollToTop.classList.remove('visible');
            }
        });
        scrollToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    var firstSection = document.querySelector('.section');
    if (firstSection) {
        firstSection.classList.add('active');
    }
});
