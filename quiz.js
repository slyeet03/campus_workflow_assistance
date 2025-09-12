// Quiz Generator JavaScript

// Welcome message (optional)
document.addEventListener('DOMContentLoaded', function() {
    const teacherName = localStorage.getItem("teacherName");
    if (teacherName) {
        console.log('Welcome, ' + teacherName);
    } else {
        console.log('Welcome to Quiz Generator');
    }
});

let currentStep = 1;
let uploadedFile = null;
let generatedQuiz = null;

// DOM Elements
const uploadInput = document.getElementById('pptUpload');
const uploadStatus = document.getElementById('uploadStatus');
const fileName = document.getElementById('fileName');
const configSection = document.getElementById('configSection');
const quizPreviewSection = document.getElementById('quizPreviewSection');
const successSection = document.getElementById('successSection');
const executionLog = document.getElementById('executionLog');

// Step elements
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const step4 = document.getElementById('step4');

// Event Listeners
uploadInput.addEventListener('change', handleFileUpload);
document.getElementById('generateQuizBtn').addEventListener('click', generateQuiz);
document.getElementById('makeChanges').addEventListener('change', toggleChangeOptions);
document.getElementById('updateQuestionBtn').addEventListener('click', updateQuestion);
document.getElementById('publishQuizBtn').addEventListener('click', publishQuiz);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        uploadedFile = file;
        fileName.textContent = file.name;
        uploadStatus.classList.remove('hidden');
        
        // Update progress
        updateStep(2);
        configSection.classList.remove('hidden');
        
        // Add to execution log
        addLogEntry('📄 File uploaded: ' + file.name, 'success');
        addLogEntry('🤖 Ready to generate quiz configuration...', 'info');
    }
}

function generateQuiz() {
    const numQuestions = parseInt(document.getElementById('numQuestions').value);
    const timeLimit = parseInt(document.getElementById('timeLimit').value);
    const totalMarks = parseInt(document.getElementById('totalMarks').value);
    const marksPerQuestion = parseInt(document.getElementById('marksPerQuestion').value);
    
    addLogEntry('🤖 Starting AI analysis of uploaded content...', 'info');
    addLogEntry('📊 Extracting key concepts and topics...', 'info');
    
    // Simulate AI processing
    setTimeout(() => {
        addLogEntry('✅ Content analysis complete!', 'success');
        addLogEntry('🧠 Generating quiz questions using AI...', 'info');
        
        // Generate mock quiz
        generatedQuiz = generateMockQuiz(numQuestions, marksPerQuestion);
        
        setTimeout(() => {
            addLogEntry('✅ Quiz generated successfully!', 'success');
            displayQuizPreview();
            updateStep(3);
            quizPreviewSection.classList.remove('hidden');
        }, 2000);
    }, 3000);
}

function generateMockQuiz(numQuestions, marksPerQuestion) {
    const topics = [
        'Machine Learning Fundamentals',
        'Data Structures and Algorithms',
        'Database Management Systems',
        'Software Engineering Principles',
        'Computer Networks',
        'Operating Systems',
        'Web Development',
        'Artificial Intelligence'
    ];
    
    const questionTypes = ['Multiple Choice', 'True/False', 'Short Answer', 'Problem Solving'];
    
    const quiz = [];
    for (let i = 1; i <= numQuestions; i++) {
        const topic = topics[Math.floor(Math.random() * topics.length)];
        const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        
        quiz.push({
            id: i,
            question: `Question ${i}: Explain the concept of ${topic} and provide a real-world example.`,
            type: type,
            marks: marksPerQuestion,
            options: type === 'Multiple Choice' ? [
                'Option A: Correct answer',
                'Option B: Incorrect answer',
                'Option C: Another incorrect answer',
                'Option D: Also incorrect'
            ] : null
        });
    }
    
    return quiz;
}

function displayQuizPreview() {
    const quizContent = document.getElementById('quizContent');
    quizContent.innerHTML = '';
    
    generatedQuiz.forEach(q => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML = `
            <div class="question-header">
                <h4 class="question-title">Question ${q.id}</h4>
                <span class="question-marks">${q.marks} marks</span>
            </div>
            <p class="question-text">${q.question}</p>
            <p class="question-type">Type: ${q.type}</p>
            ${q.options ? `
                <div class="question-options">
                    <h5>Options:</h5>
                    <ul>
                        ${q.options.map(option => `<li>${option}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        `;
        quizContent.appendChild(questionDiv);
    });
}

function toggleChangeOptions() {
    const makeChanges = document.getElementById('makeChanges');
    const changeOptions = document.getElementById('changeOptions');
    
    if (makeChanges.checked) {
        changeOptions.classList.remove('hidden');
    } else {
        changeOptions.classList.add('hidden');
    }
}

function updateQuestion() {
    const questionNum = parseInt(document.getElementById('questionToChange').value);
    const newText = document.getElementById('newQuestionText').value;
    
    if (questionNum && newText && questionNum <= generatedQuiz.length) {
        generatedQuiz[questionNum - 1].question = newText;
        displayQuizPreview();
        addLogEntry(`✏️ Updated question ${questionNum}`, 'info');
        
        // Clear form
        document.getElementById('questionToChange').value = '';
        document.getElementById('newQuestionText').value = '';
        document.getElementById('makeChanges').checked = false;
        toggleChangeOptions();
    } else {
        alert('Please enter a valid question number and new text');
    }
}

function publishQuiz() {
    addLogEntry('🚀 Publishing quiz to Canvas...', 'info');
    addLogEntry('📧 Sending notifications to students...', 'info');
    
    setTimeout(() => {
        addLogEntry('✅ Quiz published successfully!', 'success');
        addLogEntry('📱 Students notified via email and app', 'success');
        updateStep(4);
        quizPreviewSection.classList.add('hidden');
        successSection.classList.remove('hidden');
    }, 2000);
}

function updateStep(step) {
    // Reset all steps
    [step1, step2, step3, step4].forEach((el, index) => {
        if (index + 1 <= step) {
            el.classList.remove('bg-gray-300');
            el.classList.add('bg-blue-500');
        } else {
            el.classList.remove('bg-blue-500');
            el.classList.add('bg-gray-300');
        }
    });
    currentStep = step;
}

function addLogEntry(message, type = 'info') {
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    let dotClass = 'log-dot info';
    if (type === 'success') dotClass = 'log-dot success';
    else if (type === 'error') dotClass = 'log-dot error';
    else if (type === 'warning') dotClass = 'log-dot warning';
    
    const timestamp = new Date().toLocaleTimeString();
    logEntry.innerHTML = `
        <div class="${dotClass}"></div>
        <div class="log-content">${message}</div>
        <div class="log-timestamp">${timestamp}</div>
    `;
    
    executionLog.appendChild(logEntry);
    executionLog.scrollTop = executionLog.scrollHeight;
}

// Global logout function
function logout() {
    console.log('Logout function called (disabled for direct access)');
    // localStorage.removeItem("teacherName");
    // window.location.href = "login.html";
}
