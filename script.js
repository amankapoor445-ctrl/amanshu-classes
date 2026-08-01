document.addEventListener('DOMContentLoaded', () => {
    const classData = {
        1: { name: 'Class 1', subjects: ['English', 'Hindi', 'Mathematics', 'EVS', 'Art & Craft', 'Physical Education'], timing: '8:00 AM - 12:00 PM', fees: '₹5,000/year' },
        2: { name: 'Class 2', subjects: ['English', 'Hindi', 'Mathematics', 'EVS', 'Art & Craft', 'Physical Education'], timing: '8:00 AM - 12:00 PM', fees: '₹5,000/year' },
        3: { name: 'Class 3', subjects: ['English', 'Hindi', 'Mathematics', 'EVS', 'Computer Science', 'Physical Education'], timing: '8:00 AM - 1:00 PM', fees: '₹6,000/year' },
        4: { name: 'Class 4', subjects: ['English', 'Hindi', 'Mathematics', 'EVS', 'Computer Science', 'Physical Education'], timing: '8:00 AM - 1:00 PM', fees: '₹6,000/year' },
        5: { name: 'Class 5', subjects: ['English', 'Hindi', 'Mathematics', 'EVS', 'Computer Science', 'Physical Education'], timing: '8:00 AM - 1:00 PM', fees: '₹7,000/year' },
        6: { name: 'Class 6', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer Science'], timing: '8:00 AM - 2:00 PM', fees: '₹8,000/year' },
        7: { name: 'Class 7', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer Science'], timing: '8:00 AM - 2:00 PM', fees: '₹8,000/year' },
        8: { name: 'Class 8', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer Science'], timing: '8:00 AM - 2:00 PM', fees: '₹9,000/year' },
        9: { name: 'Class 9', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer Science'], timing: '8:00 AM - 3:00 PM', fees: '₹10,000/year' },
        10: { name: 'Class 10', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer Science'], timing: '8:00 AM - 3:00 PM', fees: '₹12,000/year' }
    };

    const courseData = {
        cbse: { name: 'CBSE Board Course', price: '₹25,000/year', teachers: [{ name: 'Mr. Aman', subject: 'Mathematics & Science', role: 'Expert' }, { name: 'Mrs. Priya Singh', subject: 'English & Hindi' }, { name: 'Mr. Rajesh Kumar', subject: 'Social Science' }, { name: 'Mrs. Neha Gupta', subject: 'Computer Science' }] },
        bpsc: { name: 'BPSC Preparation', price: '₹35,000/year', teachers: [{ name: 'Mr. Aman', subject: 'General Studies', role: 'Expert' }, { name: 'Dr. Amit Verma', subject: 'Indian History' }, { name: 'Mr. Suresh Patel', subject: 'Geography & Economy' }, { name: 'Mrs. Kavita Sharma', subject: 'Current Affairs' }] },
        ssc: { name: 'SSC Preparation', price: '₹30,000/year', teachers: [{ name: 'Mr. Aman', subject: 'Quantitative Aptitude', role: 'Expert' }, { name: 'Mr. Vikash Ranjan', subject: 'Reasoning' }, { name: 'Mrs. Pooja Devi', subject: 'English Language' }, { name: 'Mr. Deepak Singh', subject: 'General Awareness' }] },
        railways: { name: 'Railways Exam Prep', price: '₹28,000/year', teachers: [{ name: 'Mr. Aman', subject: 'Mathematics', role: 'Expert' }, { name: 'Mr. Manoj Tiwari', subject: 'General Science' }, { name: 'Mrs. Sunita Verma', subject: 'Reasoning & Aptitude' }, { name: 'Mr. Ravi Shankar', subject: 'General Awareness' }] },
        school: { name: 'School Courses (1-10)', price: '₹5,000 - ₹12,000/year', teachers: [{ name: 'Mr. Aman', subject: 'Mathematics & Science', role: 'Expert' }, { name: 'Mrs. Anjali Kumari', subject: 'English' }, { name: 'Mr. Sunil Yadav', subject: 'Hindi' }, { name: 'Mrs. Rekha Devi', subject: 'Social Science' }, { name: 'Mr. Pankaj Mishra', subject: 'Computer Science' }] }
    };

    const quizData = [
        { question: 'What is the capital of India?', options: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'], answer: 1 },
        { question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Jupiter', 'Mars', 'Saturn'], answer: 2 },
        { question: 'What is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 3 },
        { question: 'Who wrote the Indian National Anthem?', options: ['Mahatma Gandhi', 'Rabindranath Tagore', 'Jawaharlal Nehru', 'Subhas Chandra Bose'], answer: 1 },
        { question: 'What is the chemical symbol for water?', options: ['O2', 'CO2', 'H2O', 'NaCl'], answer: 2 }
    ];

    let quizState = { current: 0, score: 0, answers: [] };

    const elements = {
        scrollProgress: document.getElementById('scrollProgress') || document.querySelector('.scroll-progress'),
        navbar: document.querySelector('.navbar') || document.querySelector('nav') || document.querySelector('header'),
        hamburger: document.getElementById('hamburger'),
        mobileMenu: document.getElementById('mobileMenu'),
        themeToggle: document.getElementById('themeToggle'),
        classSelect: document.getElementById('classSelect'),
        classGoBtn: document.getElementById('classGoBtn'),
        classResult: document.getElementById('classResult'),
        courseDetails: document.getElementById('courseDetails'),
        loginModal: document.getElementById('loginModal'),
        loginBtn: document.getElementById('loginBtn'),
        loginClose: document.querySelector('.modal-close'),
        loginOverlay: document.querySelector('.modal-overlay'),
        loginForm: document.getElementById('loginForm'),
        healthWeight: document.getElementById('healthWeight'),
        healthRunning: document.getElementById('healthRunning'),
        healthExercise: document.getElementById('healthExercise'),
        healthSunbath: document.getElementById('healthSunbath'),
        healthPlaying: document.getElementById('healthPlaying'),
        saveHealthBtn: document.getElementById('saveHealthBtn'),
        healthMessage: document.getElementById('healthMessage'),
        backToTop: document.getElementById('backToTop') || document.querySelector('.back-to-top'),
        whatsappBtn: document.getElementById('whatsappBtn') || document.querySelector('.whatsapp-btn'),
        newsletterForm: document.getElementById('newsletterForm'),
        contactForm: document.getElementById('contactForm'),
        pomodoroDisplay: document.getElementById('pomodoroDisplay') || document.querySelector('.pomodoro-display'),
        pomodoroStart: document.getElementById('pomodoroStart'),
        pomodoroPause: document.getElementById('pomodoroPause'),
        pomodoroReset: document.getElementById('pomodoroReset'),
        goalInput: document.getElementById('goalInput'),
        addGoalBtn: document.getElementById('addGoalBtn'),
        goalsList: document.getElementById('goalsList'),
        quizContainer: document.getElementById('quizContainer'),
        galleryLightbox: document.getElementById('galleryLightbox') || document.querySelector('.lightbox')
    };

    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    function getScrollPercent() {
        const h = document.documentElement;
        const b = document.body;
        return (h.scrollTop || b.scrollTop) / ((h.scrollHeight || b.scrollHeight) - h.clientHeight) * 100;
    }

    function updateScrollProgress() {
        if (elements.scrollProgress) {
            const percent = getScrollPercent();
            elements.scrollProgress.style.width = percent + '%';
        }
    }

    function updateNavbar() {
        if (elements.navbar) {
            if (window.scrollY > 50) {
                elements.navbar.classList.add('scrolled');
            } else {
                elements.navbar.classList.remove('scrolled');
            }
        }
    }

    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, nav a[href^="#"]');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const offset = elements.navbar ? elements.navbar.offsetHeight : 0;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
        }
    }

    window.addEventListener('scroll', throttle(() => {
        updateScrollProgress();
        updateNavbar();
        updateActiveNav();
        updateBackToTop();
    }, 16));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target !== '#') {
                smoothScroll(target);
            }
            if (elements.mobileMenu && !elements.mobileMenu.classList.contains('hidden')) {
                elements.mobileMenu.classList.add('hidden');
                if (elements.hamburger) elements.hamburger.classList.remove('active');
            }
        });
    });

    if (elements.hamburger && elements.mobileMenu) {
        elements.hamburger.addEventListener('click', () => {
            elements.mobileMenu.classList.toggle('hidden');
            elements.hamburger.classList.toggle('active');
        });
    }

    function initDarkMode() {
        const saved = localStorage.getItem('theme');
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
            updateThemeIcon(saved);
        }
    }

    function updateThemeIcon(theme) {
        if (elements.themeToggle) {
            elements.themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateThemeIcon(next);
        });
    }
    initDarkMode();

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target') || element.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('[data-target], [data-count]');
                counters.forEach(counter => animateCounter(counter));
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats, .hero-stats, .counter-section');
    if (statsSection) statsObserver.observe(statsSection);

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            const panel = document.getElementById('tab-' + tabName) || document.getElementById(tabName);
            if (panel) panel.classList.add('active');
        });
    });

    if (elements.classGoBtn) {
        elements.classGoBtn.addEventListener('click', () => {
            const classNum = elements.classSelect ? elements.classSelect.value : null;
            if (!classNum || !classData[classNum]) {
                alert('Please select a valid class');
                return;
            }
            const data = classData[classNum];
            let html = `<h3>${data.name}</h3>`;
            html += '<div class="subjects-grid">';
            data.subjects.forEach(subject => {
                html += `<div class="subject-item">${subject}</div>`;
            });
            html += '</div>';
            html += `<p><strong>Timing:</strong> ${data.timing}</p>`;
            html += `<p><strong>Fees:</strong> ${data.fees}</p>`;
            if (elements.classResult) {
                elements.classResult.innerHTML = html;
                elements.classResult.style.display = 'block';
            }
        });
    }

    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', function() {
            const courseKey = this.getAttribute('data-course');
            const course = courseData[courseKey];
            if (!course || !elements.courseDetails) return;

            let html = `<h3>${course.name}</h3>`;
            html += '<div class="teachers-list">';
            course.teachers.forEach(teacher => {
                html += `<div class="teacher-item"><span class="teacher-name">${teacher.name}</span> - ${teacher.subject}${teacher.role ? ' (' + teacher.role + ')' : ''}</div>`;
            });
            html += '</div>';
            html += `<p class="course-price"><strong>Price:</strong> ${course.price}</p>`;
            html += '<button class="btn course-enroll">Enroll Now</button>';
            elements.courseDetails.innerHTML = html;
            elements.courseDetails.style.display = 'block';

            elements.courseDetails.querySelector('.course-enroll')?.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal();
            });
        });
    });

    document.querySelectorAll('.admission-card').forEach(card => {
        card.addEventListener('click', () => openModal());
    });

    document.querySelectorAll('.download-btn, .btn-download').forEach(btn => {
        btn.addEventListener('click', () => openModal());
    });

    function openModal() {
        if (elements.loginModal) {
            elements.loginModal.classList.add('active');
            elements.loginModal.style.display = 'flex';
        }
    }

    function closeModal() {
        if (elements.loginModal) {
            elements.loginModal.classList.remove('active');
            elements.loginModal.style.display = 'none';
        }
    }

    if (elements.loginBtn) elements.loginBtn.addEventListener('click', openModal);
    if (elements.loginClose) elements.loginClose.addEventListener('click', closeModal);
    if (elements.loginOverlay) elements.loginOverlay.addEventListener('click', closeModal);

    if (elements.loginForm) {
        elements.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const phone = document.getElementById('phone')?.value;
            const email = document.getElementById('email')?.value;
            if (!phone || !email) {
                alert('Please fill in all fields');
                return;
            }
            if (!/^\d{10}$/.test(phone)) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            alert('Login successful! Welcome to AMANSHU CLASSES.');
            closeModal();
        });
    }

    if (elements.saveHealthBtn) {
        elements.saveHealthBtn.addEventListener('click', () => {
            const data = {
                date: new Date().toISOString(),
                weight: elements.healthWeight?.value,
                running: elements.healthRunning?.value,
                exercise: elements.healthExercise?.value,
                sunbath: elements.healthSunbath?.value,
                playing: elements.healthPlaying?.value
            };
            localStorage.setItem('healthData', JSON.stringify(data));
            if (elements.healthMessage) {
                elements.healthMessage.textContent = 'Health data saved successfully!';
                elements.healthMessage.style.display = 'block';
                setTimeout(() => { elements.healthMessage.style.display = 'none'; }, 3000);
            }
            if (elements.healthWeight) elements.healthWeight.value = '';
            if (elements.healthRunning) elements.healthRunning.value = '';
            if (elements.healthExercise) elements.healthExercise.value = '';
            if (elements.healthSunbath) elements.healthSunbath.value = '';
            if (elements.healthPlaying) elements.healthPlaying.value = '';
        });
    }

    document.querySelectorAll('.roadmap-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const roadmap = this.getAttribute('data-roadmap');
            document.querySelectorAll('.roadmap-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.roadmap-panel').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            const panel = document.getElementById(roadmap);
            if (panel) panel.classList.add('active');
        });
    });

    let pomodoroInterval = null;
    let pomodoroTime = 25 * 60;
    let pomodoroRunning = false;
    let isWorkSession = true;

    function updatePomodoroDisplay() {
        const minutes = Math.floor(pomodoroTime / 60);
        const seconds = pomodoroTime % 60;
        if (elements.pomodoroDisplay) {
            elements.pomodoroDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }

    function playBeep() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.3;
            oscillator.start();
            setTimeout(() => {
                oscillator.stop();
                audioContext.close();
            }, 200);
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    function pomodoroTick() {
        if (pomodoroTime <= 0) {
            playBeep();
            clearInterval(pomodoroInterval);
            pomodoroRunning = false;
            if (isWorkSession) {
                alert('Work session complete! Take a 5-minute break.');
                pomodoroTime = 5 * 60;
                isWorkSession = false;
            } else {
                alert('Break complete! Ready for next work session?');
                pomodoroTime = 25 * 60;
                isWorkSession = true;
            }
            updatePomodoroDisplay();
            return;
        }
        pomodoroTime--;
        updatePomodoroDisplay();
    }

    if (elements.pomodoroStart) {
        elements.pomodoroStart.addEventListener('click', () => {
            if (!pomodoroRunning) {
                pomodoroRunning = true;
                pomodoroInterval = setInterval(pomodoroTick, 1000);
            }
        });
    }

    if (elements.pomodoroPause) {
        elements.pomodoroPause.addEventListener('click', () => {
            clearInterval(pomodoroInterval);
            pomodoroRunning = false;
        });
    }

    if (elements.pomodoroReset) {
        elements.pomodoroReset.addEventListener('click', () => {
            clearInterval(pomodoroInterval);
            pomodoroRunning = false;
            pomodoroTime = 25 * 60;
            isWorkSession = true;
            updatePomodoroDisplay();
        });
    }
    updatePomodoroDisplay();

    function loadGoals() {
        const goals = JSON.parse(localStorage.getItem('dailyGoals') || '[]');
        if (elements.goalsList) {
            elements.goalsList.innerHTML = '';
            goals.forEach((goal, index) => {
                const li = document.createElement('li');
                li.className = 'goal-item' + (goal.completed ? ' completed' : '');
                li.innerHTML = `
                    <span class="goal-text">${goal.text}</span>
                    <button class="goal-delete" data-index="${index}">✕</button>
                `;
                li.querySelector('.goal-text').addEventListener('click', () => toggleGoal(index));
                li.querySelector('.goal-delete').addEventListener('click', () => deleteGoal(index));
                elements.goalsList.appendChild(li);
            });
        }
    }

    function saveGoals(goals) {
        localStorage.setItem('dailyGoals', JSON.stringify(goals));
    }

    function addGoal() {
        const text = elements.goalInput?.value.trim();
        if (!text) return;
        const goals = JSON.parse(localStorage.getItem('dailyGoals') || '[]');
        goals.push({ text, completed: false });
        saveGoals(goals);
        loadGoals();
        elements.goalInput.value = '';
    }

    function toggleGoal(index) {
        const goals = JSON.parse(localStorage.getItem('dailyGoals') || '[]');
        if (goals[index]) {
            goals[index].completed = !goals[index].completed;
            saveGoals(goals);
            loadGoals();
        }
    }

    function deleteGoal(index) {
        const goals = JSON.parse(localStorage.getItem('dailyGoals') || '[]');
        goals.splice(index, 1);
        saveGoals(goals);
        loadGoals();
    }

    if (elements.addGoalBtn) elements.addGoalBtn.addEventListener('click', addGoal);
    if (elements.goalInput) {
        elements.goalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addGoal();
        });
    }
    loadGoals();

    function updateBackToTop() {
        if (elements.backToTop) {
            if (window.scrollY > 300) {
                elements.backToTop.classList.add('visible');
            } else {
                elements.backToTop.classList.remove('visible');
            }
        }
    }

    if (elements.backToTop) {
        elements.backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (elements.whatsappBtn) {
        elements.whatsappBtn.addEventListener('click', () => {
            window.open('https://wa.me/919876543210', '_blank');
        });
    }

    if (elements.newsletterForm) {
        elements.newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            elements.newsletterForm.reset();
        });
    }

    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            elements.contactForm.reset();
        });
    }

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .animate-on-scroll, section, .card, .feature-card, .course-card, .faculty-card').forEach(el => {
        fadeObserver.observe(el);
    });

    document.querySelectorAll('.gallery-item, .gallery-img, [data-lightbox]').forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('src') || this.querySelector('img')?.getAttribute('src') || this.getAttribute('data-src');
            if (!imgSrc) return;
            const overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            overlay.innerHTML = `<div class="lightbox-content"><img src="${imgSrc}" alt="Gallery Image"><button class="lightbox-close">✕</button></div>`;
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay || e.target.classList.contains('lightbox-close')) {
                    overlay.remove();
                }
            });
            document.body.appendChild(overlay);
        });
    });

    function loadQuiz() {
        if (!elements.quizContainer) return;
        const q = quizData[quizState.current];
        if (!q) {
            elements.quizContainer.innerHTML = `
                <div class="quiz-result">
                    <h3>Quiz Complete!</h3>
                    <p>Your Score: ${quizState.score} / ${quizData.length}</p>
                    <p>Percentage: ${Math.round((quizState.score / quizData.length) * 100)}%</p>
                    <button class="btn quiz-restart">Restart Quiz</button>
                </div>`;
            elements.quizContainer.querySelector('.quiz-restart')?.addEventListener('click', () => {
                quizState = { current: 0, score: 0, answers: [] };
                loadQuiz();
            });
            return;
        }
        let html = `<div class="quiz-question"><h4>Question ${quizState.current + 1} of ${quizData.length}</h4>`;
        html += `<p class="question-text">${q.question}</p>`;
        html += '<div class="quiz-options">';
        q.options.forEach((option, index) => {
            html += `<button class="quiz-option" data-index="${index}">${option}</button>`;
        });
        html += '</div></div>';
        elements.quizContainer.innerHTML = html;

        elements.quizContainer.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', function() {
                const selected = parseInt(this.getAttribute('data-index'));
                if (selected === q.answer) {
                    quizState.score++;
                }
                quizState.current++;
                loadQuiz();
            });
        });
    }
    loadQuiz();
});