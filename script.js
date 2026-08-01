document.addEventListener('DOMContentLoaded', function() {
    var sidebar = document.querySelector('.sidebar');
    var navLinks = document.querySelectorAll('.nav-link');
    var sections = document.querySelectorAll('.section');
    var menuToggle = document.getElementById('menuToggle');
    var pageTitle = document.getElementById('pageTitle');
    var darkModeToggle = document.getElementById('darkModeToggle');
    var html = document.documentElement;

    var sectionTitles = {
        'sec-home': 'Home',
        'sec-courses': 'Courses',
        'sec-class': 'Class',
        'sec-live': 'Live Class',
        'sec-pdf': 'PDF Notes',
        'sec-recorded': 'Recorded Batch',
        'sec-health': 'Health & Wellness',
        'sec-career': 'Career Roadmap',
        'sec-ai': 'AI Learning Hub',
        'sec-planner': 'Study Planner',
        'sec-quiz': 'Quiz',
        'sec-links': 'Important Links',
        'sec-notifications': 'Notifications'
    };

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
    }

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToSection(link.getAttribute('data-section'));
        });
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
        });
    }

    document.addEventListener('click', function(e) {
        if (sidebar && sidebar.classList.contains('mobile-open') && !sidebar.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('mobile-open');
        }
    });

    var themeIcon = darkModeToggle ? darkModeToggle.querySelector('span:first-child') : null;

    function initDarkMode() {
        var saved = localStorage.getItem('amanshuTheme');
        if (saved === 'dark') {
            html.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.textContent = '\u2600\uFE0F';
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            var isDark = html.getAttribute('data-theme') === 'dark';
            if (isDark) {
                html.removeAttribute('data-theme');
                localStorage.setItem('amanshuTheme', 'light');
                if (themeIcon) themeIcon.textContent = '\uD83C\uDF19';
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('amanshuTheme', 'dark');
                if (themeIcon) themeIcon.textContent = '\u2600\uFE0F';
            }
        });
    }

    initDarkMode();

    var quickActions = document.querySelectorAll('.quick-action-card');
    var actionToSection = {
        'admission': 'sec-courses',
        'courses': 'sec-courses',
        'live': 'sec-live',
        'health': 'sec-health'
    };

    quickActions.forEach(function(card) {
        card.addEventListener('click', function() {
            var action = card.getAttribute('data-action');
            var targetId = actionToSection[action];
            if (targetId) navigateToSection(targetId);
        });
    });

    var courseData = {
        cbse: { name: 'CBSE Board', price: '\u20B95,999', duration: '1 Year', level: 'Class 9-12', teachers: [
            { name: 'Mr. Aman', subject: 'Mathematics & Science', type: 'Expert' },
            { name: 'Mrs. Priya Sharma', subject: 'Science' },
            { name: 'Mr. Amit Singh', subject: 'English' },
            { name: 'Mrs. Neha Gupta', subject: 'Hindi' }
        ]},
        bpsc: { name: 'BPSC', price: '\u20B98,999', duration: '8 Months', level: 'Graduate', teachers: [
            { name: 'Mr. Aman', subject: 'General Studies', type: 'Expert' },
            { name: 'Dr. Alok Verma', subject: 'History' },
            { name: 'Mrs. Kavita Reddy', subject: 'Geography' }
        ]},
        ssc: { name: 'SSC Exams', price: '\u20B97,499', duration: '6 Months', level: 'Graduate', teachers: [
            { name: 'Mr. Aman', subject: 'Quantitative Aptitude', type: 'Expert' },
            { name: 'Mrs. Pooja Verma', subject: 'Reasoning' },
            { name: 'Mr. Deepak Yadav', subject: 'English' }
        ]},
        railways: { name: 'Railways', price: '\u20B96,999', duration: '5 Months', level: '12th Pass', teachers: [
            { name: 'Mr. Aman', subject: 'Mathematics', type: 'Expert' },
            { name: 'Mrs. Rekha Singh', subject: 'General Science' }
        ]},
        school: { name: 'School Courses', price: '\u20B93,999', duration: '1 Year', level: 'Class 1-10', teachers: [
            { name: 'Mr. Aman', subject: 'All Subjects', type: 'Expert' },
            { name: 'Mrs. Sunita Devi', subject: 'Primary' },
            { name: 'Mr. Rakesh Kumar', subject: 'Middle School' }
        ]}
    };

    var courseModal = document.getElementById('courseModal');

    function openCourseModal(courseKey) {
        var course = courseData[courseKey];
        if (!course || !courseModal) return;
        var body = courseModal.querySelector('.modal-body');
        if (!body) return;
        var teachersHtml = course.teachers.map(function(t) {
            return '<div class="teacher-item"><strong>' + t.name + '</strong> <span>' + t.subject + '</span>' + (t.type ? ' <span class="teacher-badge">' + t.type + '</span>' : '') + '</div>';
        }).join('');
        body.innerHTML = '<h2>' + course.name + '</h2>' +
            '<div class="course-details-modal">' +
            '<div class="detail-row"><span>Price:</span><strong>' + course.price + '</strong></div>' +
            '<div class="detail-row"><span>Duration:</span><strong>' + course.duration + '</strong></div>' +
            '<div class="detail-row"><span>Level:</span><strong>' + course.level + '</strong></div>' +
            '</div>' +
            '<h3>Our Teachers</h3>' +
            '<div class="teachers-list">' + teachersHtml + '</div>';
        courseModal.classList.add('active');
    }

    function closeModal(modal) {
        if (modal) modal.classList.remove('active');
    }

    var courseDetailBtns = document.querySelectorAll('.course-details-btn');
    courseDetailBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            openCourseModal(btn.getAttribute('data-course'));
        });
    });

    document.querySelectorAll('.modal-close[data-close]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var modalId = btn.getAttribute('data-close');
            closeModal(document.getElementById(modalId));
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) overlay.classList.remove('active');
        });
    });

    var classData = {
        1: { name: 'Class 1', subjects: ['English', 'Hindi', 'Mathematics', 'EVS', 'Art & Craft', 'Physical Education'], timing: '8:00 AM - 12:00 PM', fees: '\u20B95,000/year' },
        2: { name: 'Class 2', subjects: ['English', 'Hindi', 'Mathematics', 'EVS', 'Art & Craft', 'Physical Education'], timing: '8:00 AM - 12:00 PM', fees: '\u20B95,000/year' },
        3: { name: 'Class 3', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer'], timing: '8:00 AM - 1:00 PM', fees: '\u20B98,000/year' },
        4: { name: 'Class 4', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer'], timing: '8:00 AM - 1:00 PM', fees: '\u20B98,000/year' },
        5: { name: 'Class 5', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer', 'General Knowledge'], timing: '8:00 AM - 2:00 PM', fees: '\u20B910,000/year' },
        6: { name: 'Class 6', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer', 'Sanskrit'], timing: '7:30 AM - 2:00 PM', fees: '\u20B912,000/year' },
        7: { name: 'Class 7', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer', 'Sanskrit'], timing: '7:30 AM - 2:00 PM', fees: '\u20B912,000/year' },
        8: { name: 'Class 8', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer', 'Sanskrit'], timing: '7:30 AM - 2:30 PM', fees: '\u20B915,000/year' },
        9: { name: 'Class 9', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer', 'Sanskrit'], timing: '7:30 AM - 2:30 PM', fees: '\u20B918,000/year' },
        10: { name: 'Class 10', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer', 'Sanskrit'], timing: '7:00 AM - 3:00 PM', fees: '\u20B920,000/year' }
    };

    var classSelect = document.getElementById('classSelect');
    var goClassBtn = document.getElementById('goClassBtn');
    var classResult = document.getElementById('classResult');
    var classResultTitle = document.getElementById('classResultTitle');
    var subjectsGrid = document.getElementById('subjectsGrid');

    if (goClassBtn) {
        goClassBtn.addEventListener('click', function() {
            var val = classSelect ? classSelect.value : '';
            if (!val || !classData[val]) {
                if (classResult) classResult.style.display = 'none';
                return;
            }
            var cls = classData[val];
            if (classResultTitle) classResultTitle.textContent = cls.name;
            if (subjectsGrid) {
                subjectsGrid.innerHTML = cls.subjects.map(function(s) {
                    return '<span class="subject-tag">' + s + '</span>';
                }).join('');
            }
            var timingEl = classResult ? classResult.querySelector('.class-timing') : null;
            var feesEl = classResult ? classResult.querySelector('.class-fees') : null;
            if (timingEl) timingEl.innerHTML = '<strong>Timing:</strong> ' + cls.timing;
            if (feesEl) feesEl.innerHTML = '<strong>Fees:</strong> ' + cls.fees;
            if (classResult) classResult.style.display = 'block';
        });
    }

    var healthPills = document.querySelectorAll('.health-pill');
    var healthTopicCards = document.querySelectorAll('.health-topic-card');
    var saveTrackerBtn = document.getElementById('saveTrackerBtn');

    healthPills.forEach(function(pill) {
        pill.addEventListener('click', function() {
            healthPills.forEach(function(p) { p.classList.remove('active'); });
            pill.classList.add('active');
            var cat = pill.getAttribute('data-health-cat');
            healthTopicCards.forEach(function(card) {
                if (cat === 'all' || card.getAttribute('data-cat') === cat) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    if (saveTrackerBtn) {
        saveTrackerBtn.addEventListener('click', function() {
            var weight = document.getElementById('trackWeight');
            var running = document.getElementById('trackRunning');
            var exercise = document.getElementById('trackExercise');
            var sunbath = document.getElementById('trackSunbath');
            var playing = document.getElementById('trackPlaying');
            var data = {
                date: new Date().toISOString(),
                weight: weight ? weight.value : '',
                running: running ? running.value : '',
                exercise: exercise ? exercise.value : '',
                sunbath: sunbath ? sunbath.value : '',
                playing: playing ? playing.value : ''
            };
            var saved = JSON.parse(localStorage.getItem('amanshuHealth') || '[]');
            saved.push(data);
            localStorage.setItem('amanshuHealth', JSON.stringify(saved));
            alert('Health data saved successfully!');
        });
    }

    var openAiHealthBtn = document.getElementById('openAiHealthBtn');
    var aiHealthModal = document.getElementById('aiHealthModal');
    var analyzeBtn = document.getElementById('analyzeBtn');
    var healthInput = document.getElementById('healthInput');
    var radarChartInstance = null;

    function openAiHealthModal() {
        if (aiHealthModal) aiHealthModal.classList.add('active');
    }

    if (openAiHealthBtn) {
        openAiHealthBtn.addEventListener('click', openAiHealthModal);
    }

    function parseHealthInput(text) {
        var lower = text.toLowerCase();
        var scores = { energy: 50, focus: 50, hydration: 50, sleep: 50, exercise: 50, mental: 50 };

        if (lower.indexOf('sleep') !== -1 || lower.indexOf('slept') !== -1) {
            scores.sleep = (lower.indexOf('good sleep') !== -1 || lower.indexOf('well rested') !== -1 || lower.indexOf('8 hours') !== -1 || lower.indexOf('7 hours') !== -1) ? 85 : 30;
        }
        if (lower.indexOf('tired') !== -1 || lower.indexOf('fatigue') !== -1 || lower.indexOf('exhausted') !== -1 || lower.indexOf('low energy') !== -1) {
            scores.energy = 25;
        }
        if (lower.indexOf('water') !== -1 || lower.indexOf('drunk') !== -1 || lower.indexOf('hydrat') !== -1) {
            scores.hydration = (lower.indexOf('lots of water') !== -1 || lower.indexOf('3 liters') !== -1 || lower.indexOf('4 liters') !== -1 || lower.indexOf('well hydrated') !== -1) ? 85 : 35;
        }
        if (lower.indexOf('exercise') !== -1 || lower.indexOf('ran') !== -1 || lower.indexOf('workout') !== -1 || lower.indexOf('gym') !== -1 || lower.indexOf('running') !== -1) {
            scores.exercise = 80;
            scores.energy = Math.min(scores.energy + 20, 95);
        }
        if (lower.indexOf('stress') !== -1 || lower.indexOf('stressed') !== -1 || lower.indexOf('anxious') !== -1 || lower.indexOf('worried') !== -1) {
            scores.mental = 25;
            scores.focus = 30;
        }
        if (lower.indexOf('focus') !== -1 || lower.indexOf('concentrat') !== -1 || lower.indexOf('productive') !== -1) {
            scores.focus = (lower.indexOf('good focus') !== -1 || lower.indexOf('very focused') !== -1) ? 85 : 45;
        }
        if (lower.indexOf('head') !== -1 || lower.indexOf('headache') !== -1) {
            scores.mental = Math.max(scores.mental - 20, 10);
            scores.energy = Math.max(scores.energy - 15, 10);
        }
        if (lower.indexOf('eye') !== -1 || lower.indexOf('eyes') !== -1 || lower.indexOf('eye strain') !== -1) {
            scores.focus = Math.max(scores.focus - 20, 10);
        }
        if (lower.indexOf('healthy') !== -1 || lower.indexOf('great') !== -1 || lower.indexOf('good') !== -1) {
            scores.energy = Math.max(scores.energy, 70);
            scores.mental = Math.max(scores.mental, 65);
        }

        var hasKeyword = (lower.indexOf('sleep') !== -1 || lower.indexOf('slept') !== -1 || lower.indexOf('tired') !== -1 ||
            lower.indexOf('water') !== -1 || lower.indexOf('drunk') !== -1 || lower.indexOf('hydrat') !== -1 ||
            lower.indexOf('exercise') !== -1 || lower.indexOf('ran') !== -1 || lower.indexOf('workout') !== -1 ||
            lower.indexOf('stress') !== -1 || lower.indexOf('stressed') !== -1 || lower.indexOf('anxious') !== -1 ||
            lower.indexOf('focus') !== -1 || lower.indexOf('concentrat') !== -1 ||
            lower.indexOf('head') !== -1 || lower.indexOf('headache') !== -1 ||
            lower.indexOf('eye') !== -1 || lower.indexOf('eyes') !== -1 ||
            lower.indexOf('healthy') !== -1 || lower.indexOf('good') !== -1 || lower.indexOf('great') !== -1);

        if (!hasKeyword) {
            scores.energy = 40 + Math.floor(Math.random() * 41);
            scores.focus = 40 + Math.floor(Math.random() * 41);
            scores.hydration = 40 + Math.floor(Math.random() * 41);
            scores.sleep = 40 + Math.floor(Math.random() * 41);
            scores.exercise = 40 + Math.floor(Math.random() * 41);
            scores.mental = 40 + Math.floor(Math.random() * 41);
        }

        return scores;
    }

    function drawRadarChart(scores) {
        var canvas = document.getElementById('radarChart');
        if (!canvas || typeof Chart === 'undefined') return;
        var ctx = canvas.getContext('2d');
        if (window.radarChartInstance) window.radarChartInstance.destroy();
        window.radarChartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Energy', 'Focus', 'Hydration', 'Sleep', 'Exercise', 'Mental Health'],
                datasets: [{
                    label: 'Your Health Score',
                    data: [scores.energy, scores.focus, scores.hydration, scores.sleep, scores.exercise, scores.mental],
                    backgroundColor: 'rgba(37,99,235,0.2)',
                    borderColor: '#2563eb',
                    borderWidth: 2,
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } } },
                plugins: { legend: { display: false } }
            }
        });
    }

    function updateProgressRings(scores) {
        var ringData = [
            { id: 'energyRing', valId: 'energyVal', score: scores.energy },
            { id: 'focusRing', valId: 'focusVal', score: scores.focus },
            { id: 'hydrationRing', valId: 'hydrationVal', score: scores.hydration },
            { id: 'sleepRing', valId: 'sleepVal', score: scores.sleep }
        ];
        var circumference = 2 * Math.PI * 40;
        ringData.forEach(function(r) {
            var ring = document.getElementById(r.id);
            var valEl = document.getElementById(r.valId);
            if (ring) {
                ring.style.strokeDasharray = circumference;
                ring.style.strokeDashoffset = circumference;
                (function(ringEl, score, circumferenceVal, valElem) {
                    setTimeout(function() {
                        ringEl.style.transition = 'stroke-dashoffset 1s ease';
                        ringEl.style.strokeDashoffset = circumferenceVal - (score / 100) * circumferenceVal;
                        if (valElem) valElem.textContent = score + '%';
                    }, 300);
                })(ring, r.score, circumference, valEl);
            }
        });
    }

    function updateBodySvg(scores) {
        var bodyHead = document.getElementById('bodyBrain');
        var bodyTorso = document.querySelector('.body-torso');
        var bodyArms = document.querySelectorAll('.body-arm');
        var bodyLegs = document.querySelectorAll('.body-leg');
        var bodyEyeL = document.getElementById('bodyEye');
        var bodyEyeR = document.getElementById('bodyEye2');

        if (bodyHead) {
            bodyHead.classList.remove('glow');
            if (scores.sleep < 40 || scores.mental < 35) bodyHead.classList.add('glow');
        }
        bodyArms.forEach(function(el) {
            el.classList.remove('glow');
            if (scores.exercise < 40) el.classList.add('glow');
        });
        bodyLegs.forEach(function(el) {
            el.classList.remove('glow');
            if (scores.exercise < 40) el.classList.add('glow');
        });
        if (bodyTorso) {
            bodyTorso.classList.remove('glow');
            if (scores.hydration < 40 || scores.mental < 35) bodyTorso.classList.add('glow');
        }
        if (bodyEyeL) {
            bodyEyeL.classList.remove('glow');
            if (scores.focus < 35) bodyEyeL.classList.add('glow');
        }
        if (bodyEyeR) {
            bodyEyeR.classList.remove('glow');
            if (scores.focus < 35) bodyEyeR.classList.add('glow');
        }
    }

    function generateActionItems(scores) {
        var items = [];
        var allScores = [
            { key: 'sleep', name: 'Sleep', val: scores.sleep },
            { key: 'energy', name: 'Energy', val: scores.energy },
            { key: 'hydration', name: 'Hydration', val: scores.hydration },
            { key: 'exercise', name: 'Exercise', val: scores.exercise },
            { key: 'mental', name: 'Mental Health', val: scores.mental },
            { key: 'focus', name: 'Focus', val: scores.focus }
        ];
        allScores.sort(function(a, b) { return a.val - b.val; });
        allScores.slice(0, 4).forEach(function(s) {
            var icon, text;
            if (s.val < 40) {
                icon = '\u26A0\uFE0F';
                if (s.key === 'sleep') text = 'Warning: Your sleep is critically low. Try to get 7-8 hours tonight.';
                else if (s.key === 'energy') text = 'Warning: Energy levels are very low. Eat a nutritious meal and rest.';
                else if (s.key === 'hydration') text = 'Warning: You are dehydrated. Drink at least 8 glasses of water today.';
                else if (s.key === 'exercise') text = 'Warning: Very low physical activity. Start with a 20-minute walk.';
                else if (s.key === 'mental') text = 'Warning: High stress detected. Practice deep breathing for 10 minutes.';
                else text = 'Warning: Low focus levels. Take a break and try meditation.';
                items.push({ icon: icon, text: text, type: 'warning' });
            } else if (s.val <= 70) {
                icon = '\uD83D\uDCA1';
                if (s.key === 'sleep') text = 'Suggestion: Try to sleep 30 minutes earlier tonight.';
                else if (s.key === 'energy') text = 'Suggestion: A short walk or healthy snack can boost your energy.';
                else if (s.key === 'hydration') text = 'Suggestion: Keep a water bottle nearby and sip regularly.';
                else if (s.key === 'exercise') text = 'Suggestion: Add 15 more minutes of exercise to your routine.';
                else if (s.key === 'mental') text = 'Suggestion: Take short breaks between study sessions.';
                else text = 'Suggestion: Try the Pomodoro technique to improve concentration.';
                items.push({ icon: icon, text: text, type: 'suggestion' });
            } else {
                icon = '\u2705';
                if (s.key === 'sleep') text = 'Good: Great sleep habits! Keep maintaining your sleep schedule.';
                else if (s.key === 'energy') text = 'Good: Excellent energy levels! Keep up your routine.';
                else if (s.key === 'hydration') text = 'Good: Well hydrated! Keep drinking water throughout the day.';
                else if (s.key === 'exercise') text = 'Good: Great exercise routine! Your body thanks you.';
                else if (s.key === 'mental') text = 'Good: Mental health looks great! Keep practicing mindfulness.';
                else text = 'Good: Excellent focus! You are performing well.';
                items.push({ icon: icon, text: text, type: 'good' });
            }
        });
        return items;
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
            var actionItems = generateActionItems(scores);
            var container = document.getElementById('actionItems');
            if (container) {
                container.innerHTML = actionItems.map(function(item) {
                    return '<div class="action-item ' + item.type + '">' + item.icon + ' ' + item.text + '</div>';
                }).join('');
            }
            var output = document.getElementById('analysisOutput');
            if (output) output.style.display = 'block';
        });
    }

    var careerPills = document.querySelectorAll('.career-pill');
    var careerCards = document.querySelectorAll('.career-card');

    careerPills.forEach(function(pill) {
        pill.addEventListener('click', function() {
            careerPills.forEach(function(p) { p.classList.remove('active'); });
            pill.classList.add('active');
            var career = pill.getAttribute('data-career');
            careerCards.forEach(function(card) {
                if (card.getAttribute('data-career') === career) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    var timerStart = document.getElementById('timerStart');
    var timerPause = document.getElementById('timerPause');
    var timerReset = document.getElementById('timerReset');
    var timerText = document.getElementById('timerText');
    var timerProgress = document.getElementById('timerProgress');
    var timerInterval = null;
    var timerSeconds = 1500;
    var isWorkSession = true;
    var timerCircumference = 2 * Math.PI * 90;

    if (timerProgress) {
        timerProgress.style.strokeDasharray = timerCircumference;
        timerProgress.style.strokeDashoffset = 0;
    }

    function formatTime(sec) {
        var m = Math.floor(sec / 60);
        var s = sec % 60;
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
        } catch (e) {}
    }

    function updateTimerDisplay() {
        if (timerText) timerText.textContent = formatTime(timerSeconds);
        if (timerProgress) {
            var total = isWorkSession ? 1500 : 300;
            var progress = timerSeconds / total;
            timerProgress.style.strokeDashoffset = timerCircumference * (1 - progress);
        }
    }

    function startTimer() {
        if (timerInterval) return;
        timerInterval = setInterval(function() {
            timerSeconds--;
            updateTimerDisplay();
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                playBeep();
                isWorkSession = !isWorkSession;
                timerSeconds = isWorkSession ? 1500 : 300;
                updateTimerDisplay();
                alert(isWorkSession ? 'Break is over! Time to focus.' : 'Great work! Take a 5 min break.');
            }
        }, 1000);
    }

    function pauseTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function resetTimer() {
        pauseTimer();
        isWorkSession = true;
        timerSeconds = 1500;
        updateTimerDisplay();
    }

    if (timerStart) timerStart.addEventListener('click', startTimer);
    if (timerPause) timerPause.addEventListener('click', pauseTimer);
    if (timerReset) timerReset.addEventListener('click', resetTimer);
    updateTimerDisplay();

    var goalInput = document.getElementById('goalInput');
    var addGoalBtn = document.getElementById('addGoalBtn');
    var goalsList = document.getElementById('goalsList');
    var goalProgress = document.getElementById('goalProgress');
    var goalPercent = document.getElementById('goalPercent');
    var goals = JSON.parse(localStorage.getItem('amanshuGoals') || '[]');
    var goalCircumference = 2 * Math.PI * 50;

    if (goalProgress) {
        goalProgress.style.strokeDasharray = goalCircumference;
        goalProgress.style.strokeDashoffset = goalCircumference;
    }

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
            if (goalProgress) goalProgress.style.strokeDashoffset = goalCircumference;
            if (goalPercent) goalPercent.textContent = '0%';
            return;
        }
        var completed = goals.filter(function(g) { return g.done; }).length;
        var pct = completed / goals.length;
        goalProgress.style.transition = 'stroke-dashoffset 0.5s ease';
        goalProgress.style.strokeDashoffset = goalCircumference - pct * goalCircumference;
        if (goalPercent) goalPercent.textContent = Math.round(pct * 100) + '%';
    }

    function addGoal(text) {
        if (!text || !text.trim()) return;
        goals.push({ text: text.trim(), done: false });
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
            if (e.key === 'Enter') {
                addGoal(goalInput.value);
                goalInput.value = '';
            }
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

    var quizData = [
        { q: 'Capital of India?', options: ['Mumbai', 'New Delhi', 'Kolkata', 'Chennai'], answer: 1 },
        { q: 'Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], answer: 1 },
        { q: '15 \u00D7 15?', options: ['200', '225', '250', '275'], answer: 1 },
        { q: 'Telephone inventor?', options: ['Edison', 'Newton', 'Bell', 'Tesla'], answer: 2 },
        { q: 'Largest ocean?', options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], answer: 2 }
    ];

    var startQuizBtn = document.getElementById('startQuizBtn');
    var quizActive = document.getElementById('quizActive');
    var quizQuestion = document.getElementById('quizQuestion');
    var quizOptions = document.getElementById('quizOptions');
    var quizProgress = document.getElementById('quizProgress');
    var quizScoreEl = document.getElementById('quizScore');
    var quizResult = document.getElementById('quizResult');
    var quizResultText = document.getElementById('quizResultText');
    var quizFinalScore = document.getElementById('quizFinalScore');
    var restartQuizBtn = document.getElementById('restartQuizBtn');
    var currentQuizIndex = 0;
    var quizScore = 0;

    function renderQuizQuestion() {
        if (currentQuizIndex >= quizData.length) {
            showQuizResult();
            return;
        }
        var q = quizData[currentQuizIndex];
        if (quizProgress) quizProgress.textContent = 'Question ' + (currentQuizIndex + 1) + '/' + quizData.length;
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
                    setTimeout(function() {
                        currentQuizIndex++;
                        renderQuizQuestion();
                    }, 1000);
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
        currentQuizIndex = 0;
        quizScore = 0;
        if (startQuizBtn) startQuizBtn.style.display = 'none';
        if (quizActive) quizActive.style.display = 'block';
        if (quizResult) quizResult.style.display = 'none';
        renderQuizQuestion();
    }

    if (startQuizBtn) startQuizBtn.addEventListener('click', startQuiz);
    if (restartQuizBtn) restartQuizBtn.addEventListener('click', startQuiz);

    var loginBtn = document.getElementById('loginBtn');
    var loginModal = document.getElementById('loginModal');

    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            if (loginModal) loginModal.classList.add('active');
        });
    }

    if (loginModal) {
        var submitBtn = loginModal.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                var inputs = loginModal.querySelectorAll('input');
                var phoneVal = inputs[0] ? inputs[0].value.trim() : '';
                var emailVal = inputs[1] ? inputs[1].value.trim() : '';
                if (!/^\d{10}$/.test(phoneVal)) {
                    alert('Please enter a valid 10-digit phone number.');
                    return;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                alert('Login successful! Welcome to Amanshu Classes.');
                loginModal.classList.remove('active');
                if (inputs[0]) inputs[0].value = '';
                if (inputs[1]) inputs[1].value = '';
            });
        }
    }

    var scrollToTop = document.getElementById('scrollToTop');

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

    document.querySelectorAll('.play-btn, .join-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            alert('Coming soon!');
        });
    });
});
