document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    const classSelect = document.getElementById('classSelect');
    const btnSubmit = document.querySelector('.btn-submit');
    const classDetails = document.getElementById('classDetails');
    const courseCards = document.querySelectorAll('.course-card');
    const courseDetails = document.getElementById('courseDetails');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalSubmit = document.getElementById('modalSubmit');
    const saveHealth = document.getElementById('saveHealth');
    const healthMessage = document.getElementById('healthMessage');
    const enrollBtn = document.querySelector('.enroll-btn');

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Modal functions
    function openModal() {
        modalOverlay.classList.add('active');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });

    modalSubmit.addEventListener('click', function() {
        const phone = document.getElementById('phoneInput').value;
        const email = document.getElementById('emailInput').value;
        
        if (phone && email) {
            alert('Thank you! We will contact you soon.');
            closeModal();
            document.getElementById('phoneInput').value = '';
            document.getElementById('emailInput').value = '';
        } else {
            alert('Please fill all fields');
        }
    });

    // Enroll button
    enrollBtn.addEventListener('click', openModal);

    // Class data
    const classData = {
        '1': { name: 'Class 1', subjects: ['English', 'Hindi', 'Mathematics', 'EVS', 'Art & Craft', 'Physical Education'], timing: '8:00 AM - 12:00 PM', fees: '₹5,000/year' },
        '2': { name: 'Class 2', subjects: ['English', 'Hindi', 'Mathematics', 'EVS', 'Art & Craft', 'Physical Education'], timing: '8:00 AM - 12:00 PM', fees: '₹5,000/year' },
        '3': { name: 'Class 3', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer'], timing: '8:00 AM - 1:00 PM', fees: '₹8,000/year' },
        '4': { name: 'Class 4', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer'], timing: '8:00 AM - 1:00 PM', fees: '₹8,000/year' },
        '5': { name: 'Class 5', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer', 'General Knowledge'], timing: '8:00 AM - 2:00 PM', fees: '₹10,000/year' },
        '6': { name: 'Class 6', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer', 'Sanskrit'], timing: '7:30 AM - 2:00 PM', fees: '₹12,000/year' },
        '7': { name: 'Class 7', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer', 'Sanskrit'], timing: '7:30 AM - 2:00 PM', fees: '₹12,000/year' },
        '8': { name: 'Class 8', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer', 'Sanskrit'], timing: '7:30 AM - 2:30 PM', fees: '₹15,000/year' },
        '9': { name: 'Class 9', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer', 'Sanskrit'], timing: '7:30 AM - 2:30 PM', fees: '₹18,000/year' },
        '10': { name: 'Class 10', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Computer', 'Sanskrit'], timing: '7:00 AM - 3:00 PM', fees: '₹20,000/year' }
    };

    // Course data with AMAN as expert teacher
    const courseData = {
        'cbse': {
            name: 'CBSE Course',
            price: '₹25,000/year',
            teachers: [
                { name: 'Mr. Aman (Expert)', subject: 'Mathematics & Science' },
                { name: 'Mr. Rajesh Kumar', subject: 'Mathematics' },
                { name: 'Mrs. Priya Sharma', subject: 'Science' },
                { name: 'Mr. Amit Singh', subject: 'English' },
                { name: 'Mrs. Neha Gupta', subject: 'Hindi' },
                { name: 'Mr. Suresh Patel', subject: 'Social Science' }
            ]
        },
        'bpsc': {
            name: 'BPSC Course',
            price: '₹35,000/year',
            teachers: [
                { name: 'Mr. Aman (Expert)', subject: 'General Studies' },
                { name: 'Dr. Alok Verma', subject: 'General Studies' },
                { name: 'Mr. Vikram Singh', subject: 'History' },
                { name: 'Mrs. Kavita Reddy', subject: 'Geography' },
                { name: 'Mr. Manish Kumar', subject: 'Polity' },
                { name: 'Dr. Sanjay Mishra', subject: 'Economics' }
            ]
        },
        'ssc': {
            name: 'SSC Course',
            price: '₹30,000/year',
            teachers: [
                { name: 'Mr. Aman (Expert)', subject: 'Quantitative Aptitude' },
                { name: 'Mr. Ravi Shankar', subject: 'Quantitative Aptitude' },
                { name: 'Mrs. Pooja Verma', subject: 'Reasoning' },
                { name: 'Mr. Deepak Yadav', subject: 'English' },
                { name: 'Mr. Anil Kumar', subject: 'General Awareness' }
            ]
        },
        'railways': {
            name: 'Railways Course',
            price: '₹28,000/year',
            teachers: [
                { name: 'Mr. Aman (Expert)', subject: 'Mathematics' },
                { name: 'Mr. Suresh Prasad', subject: 'Mathematics' },
                { name: 'Mrs. Rekha Singh', subject: 'General Science' },
                { name: 'Mr. Rajesh Yadav', subject: 'Reasoning' },
                { name: 'Mr. Prakash Kumar', subject: 'General Awareness' }
            ]
        },
        'school': {
            name: 'School Courses',
            price: '₹15,000/year',
            teachers: [
                { name: 'Mr. Aman (Expert)', subject: 'All Subjects' },
                { name: 'Mrs. Sunita Devi', subject: 'Primary Section' },
                { name: 'Mr. Rakesh Kumar', subject: 'Middle School' },
                { name: 'Mrs. Anita Sharma', subject: 'High School' }
            ]
        }
    };

    // Class Go button
    btnSubmit.addEventListener('click', function() {
        const selected = classSelect.value;
        if (selected && classData[selected]) {
            const data = classData[selected];
            let subjectsHTML = '<div class="subjects-grid">';
            data.subjects.forEach(subject => {
                subjectsHTML += `<div class="subject-item">${subject}</div>`;
            });
            subjectsHTML += '</div>';
            
            classDetails.innerHTML = `
                <h3>${data.name}</h3>
                <p><strong>Timing:</strong> ${data.timing}</p>
                <p><strong>Annual Fees:</strong> ${data.fees}</p>
                <p><strong>Subjects:</strong></p>
                ${subjectsHTML}
            `;
        } else {
            classDetails.innerHTML = '<p>Please select a class</p>';
        }
    });

    // Course cards click
    courseCards.forEach(card => {
        card.addEventListener('click', function() {
            const course = this.getAttribute('data-course');
            if (courseData[course]) {
                const data = courseData[course];
                let teachersHTML = '<div class="course-info">';
                data.teachers.forEach(teacher => {
                    teachersHTML += `
                        <div class="teacher-card">
                            <div class="teacher-name">${teacher.name}</div>
                            <div class="teacher-subject">${teacher.subject}</div>
                        </div>
                    `;
                });
                teachersHTML += '</div>';
                
                courseDetails.innerHTML = `
                    <h3>${data.name}</h3>
                    <div class="price-tag">
                        <div class="price-amount">${data.price}</div>
                    </div>
                    <p style="margin-top: 1rem;"><strong>Our Teachers:</strong></p>
                    ${teachersHTML}
                `;
            }
        });
    });

    // Admission cards - open modal
    document.querySelectorAll('.admission-card').forEach(card => {
        card.addEventListener('click', openModal);
    });

    // PDF cards - open modal
    document.querySelectorAll('.pdf-card').forEach(card => {
        card.addEventListener('click', openModal);
    });

    // Batch cards - open modal
    document.querySelectorAll('.batch-card').forEach(card => {
        card.addEventListener('click', openModal);
    });

    // Health form save
    saveHealth.addEventListener('click', function() {
        const weight = document.getElementById('weight').value;
        const running = document.getElementById('running').value;
        const exercise = document.getElementById('exercise').value;
        const sunbath = document.getElementById('sunbath').value;
        const playing = document.getElementById('playing').value;

        if (weight && running && exercise && sunbath && playing) {
            const healthData = {
                weight, running, exercise, sunbath, playing,
                date: new Date().toLocaleDateString()
            };
            
            // Save to localStorage
            let savedData = JSON.parse(localStorage.getItem('healthData') || '[]');
            savedData.push(healthData);
            localStorage.setItem('healthData', JSON.stringify(savedData));

            healthMessage.className = 'health-message success';
            healthMessage.textContent = 'Health data saved successfully!';
            
            // Clear form
            document.getElementById('weight').value = '';
            document.getElementById('running').value = '';
            document.getElementById('exercise').value = '';
            document.getElementById('sunbath').value = '';
            document.getElementById('playing').value = '';
        } else {
            alert('Please fill all fields');
        }
    });
});
