// script.js

// Global state
let currentSection = 'overview';
let completedSections = new Set();
let currentQuizQuestion = 0;
let quizAnswers = [];
let quizScore = 0;

// Quiz questions
const quizQuestions = [
    {
        question: "What is the passing score for the MS-102 exam?",
        answers: ["600/1000", "650/1000", "700/1000", "750/1000"],
        correct: 2
    },
    {
        question: "Which tool is used to identify and fix directory synchronization errors before implementing Azure AD Connect?",
        answers: ["IdFix", "ADSync", "DirSync", "SyncTool"],
        correct: 0
    },
    {
        question: "Which Azure AD license is required for Privileged Identity Management (PIM)?",
        answers: ["Azure AD Free", "Azure AD Premium P1", "Azure AD Premium P2", "Microsoft 365 E3"],
        correct: 2
    },
    {
        question: "What is the default sync cycle interval for Azure AD Connect?",
        answers: ["15 minutes", "30 minutes", "1 hour", "2 hours"],
        correct: 1
    },
    {
        question: "Which authentication method is recommended by Microsoft for best security and user experience?",
        answers: ["Federation (AD FS)", "Pass-through Authentication", "Password Hash Sync + Seamless SSO", "Cloud-only accounts"],
        correct: 2
    },
    {
        question: "What is the maximum retention period for deleted users before permanent removal?",
        answers: ["7 days", "14 days", "30 days", "90 days"],
        correct: 2
    },
    {
        question: "Which Defender XDR feature automatically investigates and responds to threats?",
        answers: ["Threat Explorer", "Automated Investigation and Response (AIR)", "Advanced Hunting", "Threat Analytics"],
        correct: 1
    },
    {
        question: "What is the maximum size of a shared mailbox without requiring a license?",
        answers: ["10GB", "25GB", "50GB", "100GB"],
        correct: 2
    },
    {
        question: "Which feature provides risk-based conditional access policies?",
        answers: ["Microsoft Defender for Identity", "Azure AD Identity Protection", "Conditional Access", "Microsoft Sentinel"],
        correct: 1
    },
    {
        question: "What type of DLP policy location monitors activities like copying to USB drives?",
        answers: ["Exchange Online", "SharePoint Online", "Teams", "Devices (Endpoint DLP)"],
        correct: 3
    }
];

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const section = this.dataset.section;
        switchSection(section);
    });
});

function switchSection(section) {
    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    // Update active content section
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(section).classList.add('active');
    
    currentSection = section;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    updateProgress();
}

// Topic collapse/expand
function toggleTopic(element) {
    element.classList.toggle('collapsed');
    const content = element.nextElementSibling;
    content.classList.toggle('collapsed');
}

// Mark section complete
function markSectionComplete(section) {
    completedSections.add(section);
    updateProgress();
    
    // Visual feedback
    const btn = event.target;
    btn.textContent = 'Completed ✓';
    btn.style.background = '#059669';
    
    setTimeout(() => {
        btn.textContent = 'Mark Section as Complete ✓';
        btn.style.background = '';
    }, 2000);
}

// Update progress
function updateProgress() {
    const totalSections = 4; // tenant, identity, security, compliance
    const percentage = (completedSections.size / totalSections) * 100;
    
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    progressBar.style.setProperty('--progress', `${percentage}%`);
    progressText.textContent = `${Math.round(percentage)}% Complete`;
}

// Quiz functionality
function startQuiz() {
    currentQuizQuestion = 0;
    quizAnswers = [];
    quizScore = 0;
    
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizArea').style.display = 'block';
    
    showQuestion();
}

function showQuestion() {
    const quizArea = document.getElementById('quizArea');
    const question = quizQuestions[currentQuizQuestion];
    
    let html = `
        <div class="question-container">
            <p class="question-text">Question ${currentQuizQuestion + 1} of ${quizQuestions.length}</p>
            <h3>${question.question}</h3>
            <div class="answers">
    `;
    
    question.answers.forEach((answer, index) => {
        html += `
            <button class="answer-btn" onclick="selectAnswer(${index})">
                ${answer}
            </button>
        `;
    });
    
    html += `
            </div>
            <div class="quiz-nav">
                ${currentQuizQuestion > 0 ? '<button class="btn-secondary" onclick="previousQuestion()">Previous</button>' : ''}
                ${currentQuizQuestion < quizQuestions.length - 1 ? 
                    '<button class="btn-primary" onclick="nextQuestion()" id="nextBtn" disabled>Next</button>' : 
                    '<button class="btn-primary" onclick="finishQuiz()" id="finishBtn" disabled>Finish</button>'}
            </div>
        </div>
    `;
    
    quizArea.innerHTML = html;
    
    // Restore previous answer if exists
    if (quizAnswers[currentQuizQuestion] !== undefined) {
        const buttons = document.querySelectorAll('.answer-btn');
        buttons[quizAnswers[currentQuizQuestion]].classList.add('selected');
        enableNextButton();
    }
}

function selectAnswer(index) {
    // Remove previous selection
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selection to clicked button
    event.target.classList.add('selected');
    
    // Store answer
    quizAnswers[currentQuizQuestion] = index;
    
    enableNextButton();
}

function enableNextButton() {
    const nextBtn = document.getElementById('nextBtn');
    const finishBtn = document.getElementById('finishBtn');
    
    if (nextBtn) nextBtn.disabled = false;
    if (finishBtn) finishBtn.disabled = false;
}

function nextQuestion() {
    if (quizAnswers[currentQuizQuestion] === undefined) return;
    
    currentQuizQuestion++;
    showQuestion();
}

function previousQuestion() {
    currentQuizQuestion--;
    showQuestion();
}

function finishQuiz() {
    if (quizAnswers[currentQuizQuestion] === undefined) return;
    
    // Calculate score
    quizScore = 0;
    quizQuestions.forEach((question, index) => {
        if (quizAnswers[index] === question.correct) {
            quizScore++;
        }
    });
    
    // Show results
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    const passed = percentage >= 70;
    
    document.getElementById('quizArea').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    let resultHtml = `
        <div style="font-size: 3rem; margin: 20px 0;">
            ${passed ? '🎉' : '📚'}
        </div>
        <div id="scoreDisplay">
            ${quizScore} / ${quizQuestions.length} (${percentage}%)
        </div>
        <p style="font-size: 1.2rem; margin-bottom: 20px;">
            ${passed ? 
                'Great job! You passed the practice quiz!' : 
                'Keep studying! You need 70% to pass.'}
        </p>
    `;
    
    // Show detailed results
    resultHtml += '<div style="text-align: left; margin-top: 30px;">';
    quizQuestions.forEach((question, index) => {
        const userAnswer = quizAnswers[index];
        const correct = userAnswer === question.correct;
        
        resultHtml += `
            <div class="card" style="margin-bottom: 15px;">
                <p style="font-weight: 600; margin-bottom: 10px;">
                    ${index + 1}. ${question.question}
                </p>
                <p style="color: ${correct ? '#10b981' : '#ef4444'};">
                    Your answer: ${question.answers[userAnswer]} ${correct ? '✓' : '✗'}
                </p>
                ${!correct ? `<p style="color: #10b981;">Correct answer: ${question.answers[question.correct]}</p>` : ''}
            </div>
        `;
    });
    resultHtml += '</div>';
    
    document.getElementById('quizResults').innerHTML = resultHtml + 
        '<button class="btn-primary" onclick="startQuiz()">Retake Quiz</button>';
}

// Flashcard functionality
function flipCard(card) {
    card.classList.toggle('flipped');
}

function shuffleFlashcards() {
    const container = document.querySelector('.flashcard-container');
    const cards = Array.from(container.children);
    
    // Fisher-Yates shuffle
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    // Re-append in new order
    cards.forEach(card => {
        card.classList.remove('flipped');
        container.appendChild(card);
    });
}

// Scroll to top button
window.onscroll = function() {
    const btn = document.getElementById('scrollTopBtn');
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    
    // Collapse all topic sections by default except first
    const topicTitles = document.querySelectorAll('.topic-title');
    topicTitles.forEach((title, index) => {
        if (index > 0) {
            toggleTopic(title);
        }
    });
});
