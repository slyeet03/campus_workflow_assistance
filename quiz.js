// Quiz Generator JavaScript

// Welcome message (optional)
document.addEventListener('DOMContentLoaded', function() {
    const teacherName = localStorage.getItem("teacherName");
    // Welcome functionality can be added here if needed
    loadQuizManagement();
});

let currentStep = 1;
let uploadedFile = null;
let generatedQuiz = null;
let currentQuizId = null;

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

async function generateQuiz() {
    const numQuestions = parseInt(document.getElementById('numQuestions').value);
    const timeLimit = parseInt(document.getElementById('timeLimit').value);
    const totalMarks = parseInt(document.getElementById('totalMarks').value);
    const marksPerQuestion = parseInt(document.getElementById('marksPerQuestion').value);
    
    if (!uploadedFile) {
        alert('Please upload a PPT file first');
        return;
    }
    
    addLogEntry('🤖 Starting AI analysis of uploaded content...', 'info');
    addLogEntry('📊 Extracting key concepts and topics...', 'info');
    
    try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('ppt', uploadedFile);
        formData.append('n_questions', numQuestions);
        formData.append('marks', marksPerQuestion);
        
        addLogEntry('📤 Uploading file to backend...', 'info');
        
        // Call backend API
        const response = await fetch('http://localhost:5001/upload_ppt', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        addLogEntry('✅ Content analysis complete!', 'success');
        addLogEntry('🧠 Generating quiz questions using AI...', 'info');
        
        // Store quiz data from backend
        currentQuizId = data.quiz_id;
        generatedQuiz = data.quiz;
        
        addLogEntry('✅ Quiz generated successfully!', 'success');
        addLogEntry(`📋 Summary: ${data.summary.substring(0, 100)}...`, 'info');
        
        displayQuizPreview();
        updateStep(3);
        quizPreviewSection.classList.remove('hidden');
        
        // Refresh quiz management section
        loadQuizManagement();
        
    } catch (error) {
        console.error('Error generating quiz:', error);
        addLogEntry('❌ Error generating quiz: ' + error.message, 'error');
        alert('Error generating quiz. Please try again.');
    }
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
    
    generatedQuiz.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question border border-gray-200 rounded-lg p-4 mb-4';
        questionDiv.innerHTML = `
            <div class="question-header flex justify-between items-center mb-2">
                <h4 class="question-title text-lg font-semibold">Question ${index + 1}</h4>
                <span class="question-marks bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">${q.marks} marks</span>
            </div>
            <div class="flex items-start space-x-2 mb-2">
                <input type="checkbox" id="edit-${index}" class="mt-1" onchange="toggleEditMode(${index})">
                <label for="edit-${index}" class="text-sm text-gray-600">Edit this question?</label>
            </div>
            <div id="question-display-${index}">
                <p class="question-text text-gray-700 mb-2">${q.question}</p>
                <p class="question-type text-sm text-gray-500">Type: ${q.type}</p>
                ${q.options && q.options.length > 0 ? `
                    <div class="question-options mt-2">
                        <h5 class="font-medium text-gray-600">Options:</h5>
                        <ul class="list-disc list-inside text-sm text-gray-600">
                            ${q.options.map(option => `<li>${option}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
            <div id="question-edit-${index}" class="hidden">
                <textarea id="edit-text-${index}" class="w-full p-2 border border-gray-300 rounded mb-2" rows="3">${q.question}</textarea>
                <button onclick="saveQuestionEdit(${index})" class="btn btn-primary text-sm">Save Edit</button>
            </div>
        `;
        quizContent.appendChild(questionDiv);
    });
}

function toggleEditMode(questionIndex) {
    const checkbox = document.getElementById(`edit-${questionIndex}`);
    const displayDiv = document.getElementById(`question-display-${questionIndex}`);
    const editDiv = document.getElementById(`question-edit-${questionIndex}`);
    
    if (checkbox.checked) {
        displayDiv.classList.add('hidden');
        editDiv.classList.remove('hidden');
    } else {
        displayDiv.classList.remove('hidden');
        editDiv.classList.add('hidden');
    }
}

async function saveQuestionEdit(questionIndex) {
    const newText = document.getElementById(`edit-text-${questionIndex}`).value.trim();
    
    if (!newText) {
        alert('Please enter a question text');
        return;
    }
    
    // Update local quiz data
    generatedQuiz[questionIndex].question = newText;
    
    // Update display
    const questionText = document.querySelector(`#question-display-${questionIndex} .question-text`);
    questionText.textContent = newText;
    
    // Toggle back to display mode
    const checkbox = document.getElementById(`edit-${questionIndex}`);
    checkbox.checked = false;
    toggleEditMode(questionIndex);
    
    addLogEntry(`✏️ Updated question ${questionIndex + 1}`, 'info');
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

async function publishQuiz() {
    if (!currentQuizId) {
        alert('No quiz to publish. Please generate a quiz first.');
        return;
    }
    
    addLogEntry('🚀 Publishing quiz to Canvas...', 'info');
    addLogEntry('📧 Sending notifications to students...', 'info');
    
    try {
        // Call backend API to publish quiz
        const response = await fetch('http://localhost:5001/publish_quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quiz_id: currentQuizId
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        addLogEntry('✅ Quiz published successfully!', 'success');
        addLogEntry(`📋 ${data.message}`, 'success');
        addLogEntry('📱 Students notified via email and app', 'success');
        
        updateStep(4);
        quizPreviewSection.classList.add('hidden');
        successSection.classList.remove('hidden');
        
        // Refresh quiz management section
        loadQuizManagement();
        
    } catch (error) {
        console.error('Error publishing quiz:', error);
        addLogEntry('❌ Error publishing quiz: ' + error.message, 'error');
        alert('Error publishing quiz. Please try again.');
    }
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

// Quiz Management Functions
async function loadQuizManagement() {
    await loadPendingQuizzes();
    await loadPublishedQuizzes();
}

async function loadPendingQuizzes() {
    try {
        const response = await fetch('http://localhost:5001/pending_quizzes');
        if (response.ok) {
            const pendingQuizzes = await response.json();
            displayPendingQuizzes(pendingQuizzes);
        } else {
            document.getElementById('pendingQuizzes').innerHTML = '<p class="text-gray-500">No pending quizzes found</p>';
        }
    } catch (error) {
        console.error('Error loading pending quizzes:', error);
        document.getElementById('pendingQuizzes').innerHTML = '<p class="text-red-500">Error loading pending quizzes</p>';
    }
}

async function loadPublishedQuizzes() {
    try {
        const response = await fetch('http://localhost:5001/published_quizzes');
        if (response.ok) {
            const publishedQuizzes = await response.json();
            displayPublishedQuizzes(publishedQuizzes);
        } else {
            document.getElementById('publishedQuizzes').innerHTML = '<p class="text-gray-500">No published quizzes found</p>';
        }
    } catch (error) {
        console.error('Error loading published quizzes:', error);
        document.getElementById('publishedQuizzes').innerHTML = '<p class="text-red-500">Error loading published quizzes</p>';
    }
}

function displayPendingQuizzes(quizzes) {
    const container = document.getElementById('pendingQuizzes');
    
    if (Object.keys(quizzes).length === 0) {
        container.innerHTML = '<p class="text-gray-500">No pending quizzes</p>';
        return;
    }
    
    container.innerHTML = '';
    
    Object.entries(quizzes).forEach(([quizId, quiz]) => {
        const quizDiv = document.createElement('div');
        quizDiv.className = 'border border-yellow-200 rounded-lg p-3 bg-yellow-50';
        quizDiv.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h5 class="font-semibold text-gray-800">${quizId}</h5>
                    <p class="text-sm text-gray-600">${quiz.length} questions</p>
                </div>
                <button onclick="editPendingQuiz('${quizId}')" class="btn btn-sm btn-primary">Edit</button>
            </div>
        `;
        container.appendChild(quizDiv);
    });
}

function displayPublishedQuizzes(quizzes) {
    const container = document.getElementById('publishedQuizzes');
    
    if (Object.keys(quizzes).length === 0) {
        container.innerHTML = '<p class="text-gray-500">No published quizzes</p>';
        return;
    }
    
    container.innerHTML = '';
    
    Object.entries(quizzes).forEach(([quizId, quiz]) => {
        const quizDiv = document.createElement('div');
        quizDiv.className = 'border border-green-200 rounded-lg p-3 bg-green-50';
        quizDiv.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h5 class="font-semibold text-gray-800">${quizId}</h5>
                    <p class="text-sm text-gray-600">${quiz.length} questions</p>
                    <p class="text-xs text-green-600">Published</p>
                </div>
                <button onclick="viewPublishedQuiz('${quizId}')" class="btn btn-sm btn-success">View</button>
            </div>
        `;
        container.appendChild(quizDiv);
    });
}

function editPendingQuiz(quizId) {
    // This would load the quiz for editing
    addLogEntry(`📝 Loading quiz ${quizId} for editing...`, 'info');
    // You could implement a modal or redirect to edit mode
    alert(`Edit quiz: ${quizId}`);
}

function viewPublishedQuiz(quizId) {
    // This would show the published quiz details
    addLogEntry(`👁️ Viewing published quiz ${quizId}...`, 'info');
    // You could implement a modal or detailed view
    alert(`View published quiz: ${quizId}`);
}

// Global logout function
function logout() {
    // localStorage.removeItem("teacherName");
    // window.location.href = "login.html";
}
