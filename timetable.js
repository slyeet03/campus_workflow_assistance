// Timetable Manager JavaScript

// Welcome message (optional)
document.addEventListener('DOMContentLoaded', function() {
    const teacherName = localStorage.getItem("teacherName");
    // Welcome functionality can be added here if needed
});

let currentTimetable = {};
let selectedSuggestion = null;

// DOM Elements
const findSlotBtn = document.getElementById('findSlotBtn');
const suggestionsSection = document.getElementById('suggestionsSection');
const suggestionsList = document.getElementById('suggestionsList');
const timetableBody = document.getElementById('timetableBody');
const executionLog = document.getElementById('executionLog');

// Event Listeners
findSlotBtn.addEventListener('click', findTimeSlot);

// Initialize timetable
document.addEventListener('DOMContentLoaded', function() {
    initializeTimetable();
    addLogEntry('📅 Timetable system initialized', 'info');
});

function initializeTimetable() {
    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ];
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Create timetable structure
    currentTimetable = {
        '9:00 AM': { Monday: null, Tuesday: null, Wednesday: null, Thursday: null, Friday: null, Saturday: null },
        '10:00 AM': { Monday: null, Tuesday: null, Wednesday: null, Thursday: null, Friday: null, Saturday: null },
        '11:00 AM': { Monday: null, Tuesday: null, Wednesday: null, Thursday: null, Friday: null, Saturday: null },
        '12:00 PM': { Monday: null, Tuesday: null, Wednesday: null, Thursday: null, Friday: null, Saturday: null },
        '1:00 PM': { Monday: null, Tuesday: null, Wednesday: null, Thursday: null, Friday: null, Saturday: null },
        '2:00 PM': { Monday: null, Tuesday: null, Wednesday: null, Thursday: null, Friday: null, Saturday: null },
        '3:00 PM': { Monday: null, Tuesday: null, Wednesday: null, Thursday: null, Friday: null, Saturday: null },
        '4:00 PM': { Monday: null, Tuesday: null, Wednesday: null, Thursday: null, Friday: null, Saturday: null },
        '5:00 PM': { Monday: null, Tuesday: null, Wednesday: null, Thursday: null, Friday: null, Saturday: null }
    };
    
    // Add some existing classes
    currentTimetable['9:00 AM'].Monday = { subject: 'Data Structures', class: 'CSE-A', room: 'Room 101' };
    currentTimetable['10:00 AM'].Monday = { subject: 'Algorithms', class: 'CSE-B', room: 'Room 102' };
    currentTimetable['2:00 PM'].Tuesday = { subject: 'Database Systems', class: 'CSE-A', room: 'Room 103' };
    currentTimetable['3:00 PM'].Wednesday = { subject: 'Machine Learning', class: 'CSE-B', room: 'Room 104' };
    currentTimetable['11:00 AM'].Thursday = { subject: 'Web Development', class: 'CSE-A', room: 'Room 105' };
    currentTimetable['4:00 PM'].Friday = { subject: 'Software Engineering', class: 'CSE-B', room: 'Room 106' };
    
    renderTimetable();
}

function renderTimetable() {
    timetableBody.innerHTML = '';
    
    Object.keys(currentTimetable).forEach(time => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="font-semibold bg-gray-50">${time}</td>
            ${Object.keys(currentTimetable[time]).map(day => {
                const classData = currentTimetable[time][day];
                if (classData) {
                    return `<td><div class="timetable-cell occupied">${classData.subject}<br><small>${classData.class} - ${classData.room}</small></div></td>`;
                } else {
                    return `<td><div class="timetable-cell available">Available</div></td>`;
                }
            }).join('')}
        `;
        timetableBody.appendChild(row);
    });
}

function findTimeSlot() {
    const academicYear = document.getElementById('academicYear').value;
    const branch = document.getElementById('branch').value;
    const section = document.getElementById('section').value;
    const subject = document.getElementById('subject').value;
    const duration = parseFloat(document.getElementById('duration').value);
    const preferredDay = document.getElementById('preferredDay').value;
    const classType = document.querySelector('input[name="classType"]:checked').value;
    
    if (!academicYear || !branch || !section || !subject) {
        alert('Please fill in all required fields');
        return;
    }
    
    addLogEntry('🤖 Analyzing current timetable...', 'info');
    addLogEntry(`📚 Looking for slots for ${subject} (${branch}-${section})`, 'info');
    
    // Simulate AI processing
    setTimeout(() => {
        const suggestions = generateTimeSlotSuggestions(academicYear, branch, section, subject, duration, preferredDay, classType);
        displaySuggestions(suggestions);
        addLogEntry(`✅ Found ${suggestions.length} suitable time slots`, 'success');
    }, 2000);
}

function generateTimeSlotSuggestions(academicYear, branch, section, subject, duration, preferredDay, classType) {
    const suggestions = [];
    const timeSlots = Object.keys(currentTimetable);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Filter days based on preference
    const targetDays = preferredDay ? [preferredDay] : days;
    
    targetDays.forEach(day => {
        timeSlots.forEach(time => {
            const classData = currentTimetable[time][day];
            if (!classData) {
                // Check if this slot can accommodate the duration
                const timeIndex = timeSlots.indexOf(time);
                let canAccommodate = true;
                
                // Check if consecutive slots are available for longer classes
                for (let i = 1; i < duration; i++) {
                    const nextTime = timeSlots[timeIndex + i];
                    if (!nextTime || currentTimetable[nextTime][day]) {
                        canAccommodate = false;
                        break;
                    }
                }
                
                if (canAccommodate) {
                    const score = calculateSlotScore(time, day, preferredDay, classType);
                    suggestions.push({
                        time: time,
                        day: day,
                        duration: duration,
                        subject: subject,
                        class: `${branch}-${section}`,
                        score: score,
                        classType: classType,
                        room: classType === 'offline' ? `Room ${Math.floor(Math.random() * 200) + 100}` : 'Online'
                    });
                }
            }
        });
    });
    
    // Sort by score (highest first)
    return suggestions.sort((a, b) => b.score - a.score).slice(0, 5);
}

function calculateSlotScore(time, day, preferredDay, classType) {
    let score = 50; // Base score
    
    // Time-based scoring
    const timeIndex = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].indexOf(time);
    
    // Morning classes (9-11 AM) get higher scores
    if (timeIndex >= 0 && timeIndex <= 2) score += 20;
    // Afternoon classes (2-4 PM) get medium scores
    else if (timeIndex >= 5 && timeIndex <= 7) score += 15;
    // Lunch time gets lower scores
    else if (timeIndex === 3) score -= 10;
    
    // Day preference
    if (preferredDay && day === preferredDay) score += 25;
    
    // Class type preference
    if (classType === 'online') score += 10;
    
    // Add some randomness for variety
    score += Math.random() * 10;
    
    return Math.min(100, Math.max(0, score));
}

function displaySuggestions(suggestions) {
    suggestionsList.innerHTML = '';
    
    suggestions.forEach((suggestion, index) => {
        const suggestionCard = document.createElement('div');
        suggestionCard.className = 'suggestion-card';
        suggestionCard.innerHTML = `
            <div class="suggestion-header">
                <div class="suggestion-time">${suggestion.day} at ${suggestion.time}</div>
                <div class="suggestion-score">${Math.round(suggestion.score)}% Match</div>
            </div>
            <div class="suggestion-details">
                <p><strong>Subject:</strong> ${suggestion.subject}</p>
                <p><strong>Class:</strong> ${suggestion.class}</p>
                <p><strong>Duration:</strong> ${suggestion.duration} hour${suggestion.duration > 1 ? 's' : ''}</p>
                <p><strong>Type:</strong> ${suggestion.classType === 'offline' ? 'Physical Classroom' : 'Online (Google Meet)'}</p>
                <p><strong>Location:</strong> ${suggestion.room}</p>
            </div>
            <button class="btn btn-primary mt-4" onclick="selectSuggestion(${index})">
                Select This Slot
            </button>
        `;
        suggestionsList.appendChild(suggestionCard);
    });
    
    suggestionsSection.classList.remove('hidden');
    suggestionsSection.scrollIntoView({ behavior: 'smooth' });
}

function selectSuggestion(index) {
    const suggestions = Array.from(suggestionsList.children);
    const selectedCard = suggestions[index];
    
    // Remove previous selection
    suggestions.forEach(card => card.classList.remove('selected'));
    
    // Add selection to current card
    selectedCard.classList.add('selected');
    
    // Get suggestion data
    const time = selectedCard.querySelector('.suggestion-time').textContent.split(' at ')[1];
    const day = selectedCard.querySelector('.suggestion-time').textContent.split(' at ')[0];
    const subject = selectedCard.querySelector('.suggestion-details p:nth-child(1)').textContent.split(': ')[1];
    const classInfo = selectedCard.querySelector('.suggestion-details p:nth-child(2)').textContent.split(': ')[1];
    const classType = selectedCard.querySelector('.suggestion-details p:nth-child(4)').textContent.split(': ')[1];
    const room = selectedCard.querySelector('.suggestion-details p:nth-child(5)').textContent.split(': ')[1];
    
    selectedSuggestion = {
        time: time,
        day: day,
        subject: subject,
        class: classInfo,
        classType: classType,
        room: room
    };
    
    addLogEntry(`✅ Selected: ${day} at ${time} for ${subject}`, 'success');
    
    // Show confirmation button
    showConfirmationButton();
}

function showConfirmationButton() {
    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'btn btn-success btn-full mt-4';
    confirmBtn.innerHTML = '🚀 Schedule This Class';
    confirmBtn.onclick = scheduleClass;
    
    // Remove existing confirmation button if any
    const existingBtn = document.querySelector('.confirmation-btn');
    if (existingBtn) existingBtn.remove();
    
    confirmBtn.classList.add('confirmation-btn');
    suggestionsSection.appendChild(confirmBtn);
}

async function scheduleClass() {
    if (!selectedSuggestion) return;
    
    addLogEntry('🚀 Scheduling class...', 'info');
    
    try {
        // Prepare data for backend API
        const scheduleData = {
            year: document.getElementById('academicYear').value,
            branch: document.getElementById('branch').value,
            section: document.getElementById('section').value,
            day: selectedSuggestion.day,
            mode: selectedSuggestion.classType === 'Online (Google Meet)' ? 'online' : 'offline'
        };
        
        // Call backend API
        const response = await fetch('http://localhost:5001/schedule_class', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scheduleData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Add to local timetable
        currentTimetable[selectedSuggestion.time][selectedSuggestion.day] = {
            subject: selectedSuggestion.subject,
            class: selectedSuggestion.class,
            room: selectedSuggestion.room,
            type: selectedSuggestion.classType
        };
        
        // Update timetable display
        renderTimetable();
        
        // Handle meeting link if online
        if (selectedSuggestion.classType === 'Online (Google Meet)') {
            addLogEntry('📧 Creating Google Meet link...', 'info');
            addLogEntry(`✅ Google Meet created: ${data.meeting_link}`, 'success');
            addLogEntry('📧 Sending meeting link via email to students...', 'info');
            addLogEntry('✅ Meeting notifications sent successfully!', 'success');
        } else {
            addLogEntry('📋 Room booking confirmed', 'success');
        }
        
        addLogEntry(`✅ Class scheduled successfully for ${selectedSuggestion.day} at ${data.slot}:00`, 'success');
        
        // Hide suggestions and reset form
        setTimeout(() => {
            suggestionsSection.classList.add('hidden');
            resetForm();
            selectedSuggestion = null;
        }, 2000);
        
    } catch (error) {
        console.error('Error scheduling class:', error);
        addLogEntry('❌ Error scheduling class: ' + error.message, 'error');
        alert('Error scheduling class: ' + error.message);
    }
}

function resetForm() {
    document.getElementById('academicYear').value = '';
    document.getElementById('branch').value = '';
    document.getElementById('section').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('duration').value = '1';
    document.getElementById('preferredDay').value = '';
    document.querySelector('input[name="classType"][value="offline"]').checked = true;
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
    // localStorage.removeItem("teacherName");
    // window.location.href = "login.html";
}
