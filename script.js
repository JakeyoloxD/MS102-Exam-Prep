css

/* styles.css */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f5f7fa;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header */
header {
    background: linear-gradient(135deg, #0078d4 0%, #005a9e 100%);
    color: white;
    padding: 40px 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.subtitle {
    font-size: 1.2rem;
    opacity: 0.95;
    margin-bottom: 20px;
}

/* Progress Bar */
.progress-container {
    margin-top: 20px;
}

.progress-bar {
    background: rgba(255,255,255,0.2);
    border-radius: 25px;
    height: 40px;
    position: relative;
    overflow: hidden;
}

.progress-bar::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: var(--progress, 0%);
    background: linear-gradient(90deg, #10b981 0%, #059669 100%);
    transition: width 0.5s ease;
}

#progressText {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-weight: 600;
    font-size: 1rem;
}

/* Navigation */
.main-nav {
    background: white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

.main-nav .container {
    display: flex;
    gap: 10px;
    padding: 15px 20px;
    overflow-x: auto;
}

.nav-btn {
    background: white;
    border: 2px solid #e5e7eb;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.2s;
}

.nav-btn:hover {
    border-color: #0078d4;
    color: #0078d4;
}

.nav-btn.active {
    background: #0078d4;
    color: white;
    border-color: #0078d4;
}

/* Main Content */
main {
    padding: 40px 20px;
    min-height: calc(100vh - 300px);
}

.content-section {
    display: none;
}

.content-section.active {
    display: block;
    animation: fadeIn 0.3s;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Cards */
.card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    margin-bottom: 20px;
}

.info-card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 30px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.info-card.highlight {
    background: linear-gradient(135deg, #0078d4 0%, #005a9e 100%);
    color: white;
}

.info-card.highlight h3 {
    margin-bottom: 5px;
}

/* Grids */
.grid-3 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.resource-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
}

/* Lists */
ul {
    margin-left: 20px;
    margin-top: 10px;
}

li {
    margin-bottom: 8px;
}

.resource-list {
    list-style: none;
    margin-left: 0;
}

.resource-list li {
    padding: 8px 0;
    border-bottom: 1px solid #e5e7eb;
}

.resource-list li:last-child {
    border-bottom: none;
}

.resource-list a {
    color: #0078d4;
    text-decoration: none;
    transition: color 0.2s;
}

.resource-list a:hover {
    color: #005a9e;
    text-decoration: underline;
}

/* Topic Sections */
.topic-section {
    margin-bottom: 30px;
}

.topic-title {
    background: #f3f4f6;
    padding: 15px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.3rem;
    margin-bottom: 15px;
    transition: background 0.2s;
    user-select: none;
}

.topic-title:hover {
    background: #e5e7eb;
}

.toggle-icon {
    display: inline-block;
    transition: transform 0.3s;
    margin-right: 10px;
}

.topic-title.collapsed .toggle-icon {
    transform: rotate(-90deg);
}

.topic-content {
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.topic-content.collapsed {
    max-height: 0;
}

/* Exam Breakdown */
.exam-breakdown {
    background: white;
    padding: 30px;
    border-radius: 12px;
    margin-top: 30px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.weight-item {
    margin-bottom: 20px;
}

.weight-label {
    margin-bottom: 8px;
    font-weight: 500;
}

.weight-bar {
    background: #e5e7eb;
    height: 30px;
    border-radius: 15px;
    overflow: hidden;
}

.weight-fill {
    background: linear-gradient(90deg, #0078d4 0%, #005a9e 100%);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    transition: width 0.5s ease;
}

/* Code Blocks */
.code-block {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
    margin-top: 15px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
}

/* Notes */
.note {
    background: #fef3c7;
    border-left: 4px solid #f59e0b;
    padding: 15px;
    margin-top: 15px;
    border-radius: 4px;
}

/* Buttons */
.mark-complete-btn,
.btn-primary,
.btn-secondary {
    padding: 12px 30px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 20px;
}

.mark-complete-btn,
.btn-primary {
    background: #10b981;
    color: white;
}

.mark-complete-btn:hover,
.btn-primary:hover {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16,185,129,0.3);
}

.btn-secondary {
    background: #6b7280;
    color: white;
}

.btn-secondary:hover {
    background: #4b5563;
}

/* Quiz */
.quiz-container {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    margin-bottom: 30px;
}

#quizArea {
    text-align: center;
}

.question-container {
    margin-bottom: 30px;
}

.question-text {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 20px;
}

.answers {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.answer-btn {
    background: white;
    border: 2px solid #e5e7eb;
    padding: 15px 20px;
    border-radius: 8px;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s;
}

.answer-btn:hover {
    border-color: #0078d4;
    background: #f0f9ff;
}

.answer-btn.selected {
    border-color: #0078d4;
    background: #dbeafe;
}

.answer-btn.correct {
    border-color: #10b981;
    background: #d1fae5;
}

.answer-btn.incorrect {
    border-color: #ef4444;
    background: #fee2e2;
}

.quiz-nav {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 30px;
}

#quizResults {
    text-align: center;
}

#scoreDisplay {
    font-size: 2rem;
    font-weight: 700;
    margin: 30px 0;
    color: #0078d4;
}

/* Flashcards */
.flashcard-section {
    margin-top: 40px;
}

.flashcard-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 30px 0;
}

.flashcard {
    height: 250px;
    perspective: 1000px;
    cursor: pointer;
}

.flashcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
}

.flashcard.flipped .flashcard-inner {
    transform: rotateY(180deg);
}

.flashcard-front,
.flashcard-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    text-align: center;
}

.flashcard-front {
    background: linear-gradient(135deg, #0078d4 0%, #005a9e 100%);
    color: white;
    font-size: 1.1rem;
    font-weight: 500;
}

.flashcard-back {
    background: white;
    color: #333;
    transform: rotateY(180deg);
    border: 2px solid #0078d4;
    font-size: 1rem;
}

/* Study Plan */
.study-plan,
.exam-tips {
    margin-top: 40px;
}

.study-plan h4 {
    color: #0078d4;
    margin-top: 20px;
    margin-bottom: 10px;
}

/* Footer */
footer {
    background: #1f2937;
    color: white;
    padding: 30px 0;
    text-align: center;
    margin-top: 60px;
}

footer a {
    color: #60a5fa;
    text-decoration: none;
}

footer .small {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 10px;
}

/* Scroll to Top Button */
#scrollTopBtn {
    display: none;
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #0078d4;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    transition: all 0.3s;
    z-index: 1000;
}

#scrollTopBtn:hover {
    background: #005a9e;
    transform: translateY(-3px);
}

/* Responsive */
@media (max-width: 768px) {
    header h1 {
        font-size: 2rem;
    }
    
    .grid-3,
    .resource-grid {
        grid-template-columns: 1fr;
    }
    
    .main-nav .container {
        overflow-x: auto;
    }
    
    .flashcard-container {
        grid-template-columns: 1fr;
    }
}

javascript

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
