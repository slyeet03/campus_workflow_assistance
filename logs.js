// Logs Management JavaScript

// Welcome message (optional)
document.addEventListener('DOMContentLoaded', function() {
    const teacherName = localStorage.getItem("teacherName");
    if (teacherName) {
        console.log('Welcome, ' + teacherName);
    } else {
        console.log('Welcome to Execution Logs');
    }
});

let allLogs = [];
let filteredLogs = [];

// Mock log data
const mockLogs = [
    {
        id: 1,
        timestamp: new Date('2024-01-15T10:30:00'),
        workflow: 'quiz',
        action: 'PPT Upload',
        status: 'success',
        message: 'Lecture slides uploaded successfully',
        details: 'File: data_structures_lecture.pdf (2.3MB)'
    },
    {
        id: 2,
        timestamp: new Date('2024-01-15T10:31:00'),
        workflow: 'quiz',
        action: 'AI Analysis',
        status: 'info',
        message: 'Analyzing content and extracting key concepts',
        details: 'Processing 45 slides, estimated time: 2 minutes'
    },
    {
        id: 3,
        timestamp: new Date('2024-01-15T10:33:00'),
        workflow: 'quiz',
        action: 'Quiz Generation',
        status: 'success',
        message: 'Generated 10 quiz questions successfully',
        details: 'Questions cover: Arrays, Linked Lists, Stacks, Queues'
    },
    {
        id: 4,
        timestamp: new Date('2024-01-15T10:34:00'),
        workflow: 'quiz',
        action: 'Canvas Integration',
        status: 'success',
        message: 'Quiz published to Canvas LMS',
        details: 'Quiz ID: QUIZ-2024-001, Due: 7 days'
    },
    {
        id: 5,
        timestamp: new Date('2024-01-15T11:15:00'),
        workflow: 'timetable',
        action: 'Slot Analysis',
        status: 'info',
        message: 'Analyzing available time slots for CSE-A',
        details: 'Checking 6 days, 9 time slots per day'
    },
    {
        id: 6,
        timestamp: new Date('2024-01-15T11:16:00'),
        workflow: 'timetable',
        action: 'AI Recommendation',
        status: 'success',
        message: 'Found 3 optimal time slots',
        details: 'Best match: Tuesday 2:00 PM (Score: 95%)'
    },
    {
        id: 7,
        timestamp: new Date('2024-01-15T11:17:00'),
        workflow: 'timetable',
        action: 'Class Scheduling',
        status: 'success',
        message: 'Class scheduled successfully',
        details: 'Data Structures - CSE-A, Tuesday 2:00 PM, Room 101'
    },
    {
        id: 8,
        timestamp: new Date('2024-01-15T11:18:00'),
        workflow: 'timetable',
        action: 'Google Meet Creation',
        status: 'success',
        message: 'Google Meet link created and sent',
        details: 'Meeting: meet.google.com/abc-defg-hij'
    },
    {
        id: 9,
        timestamp: new Date('2024-01-15T14:20:00'),
        workflow: 'quiz',
        action: 'Student Notification',
        status: 'success',
        message: 'Quiz notifications sent to 45 students',
        details: 'Email + Canvas notification sent'
    },
    {
        id: 10,
        timestamp: new Date('2024-01-15T16:45:00'),
        workflow: 'timetable',
        action: 'Conflict Detection',
        status: 'warning',
        message: 'Potential scheduling conflict detected',
        details: 'Room 101 already booked for Tuesday 2:30 PM'
    }
];

// DOM Elements
const workflowFilter = document.getElementById('workflowFilter');
const statusFilter = document.getElementById('statusFilter');
const dateFilter = document.getElementById('dateFilter');
const searchFilter = document.getElementById('searchFilter');
const logsContainer = document.getElementById('logsContainer');

// Event Listeners
workflowFilter.addEventListener('change', filterLogs);
statusFilter.addEventListener('change', filterLogs);
dateFilter.addEventListener('change', filterLogs);
searchFilter.addEventListener('input', filterLogs);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    allLogs = [...mockLogs];
    filteredLogs = [...allLogs];
    renderLogs();
});

function filterLogs() {
    const workflow = workflowFilter.value;
    const status = statusFilter.value;
    const date = dateFilter.value;
    const search = searchFilter.value.toLowerCase();
    
    filteredLogs = allLogs.filter(log => {
        const matchesWorkflow = !workflow || log.workflow === workflow;
        const matchesStatus = !status || log.status === status;
        const matchesDate = !date || log.timestamp.toISOString().split('T')[0] === date;
        const matchesSearch = !search || 
            log.message.toLowerCase().includes(search) ||
            log.action.toLowerCase().includes(search) ||
            log.details.toLowerCase().includes(search);
        
        return matchesWorkflow && matchesStatus && matchesDate && matchesSearch;
    });
    
    renderLogs();
}

function renderLogs() {
    logsContainer.innerHTML = '';
    
    if (filteredLogs.length === 0) {
        logsContainer.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <div class="text-4xl mb-2">📝</div>
                <p>No logs found matching your criteria</p>
            </div>
        `;
        return;
    }
    
    // Group logs by date
    const groupedLogs = groupLogsByDate(filteredLogs);
    
    Object.keys(groupedLogs).forEach(date => {
        const dateHeader = document.createElement('div');
        dateHeader.className = 'mb-4';
        dateHeader.innerHTML = `
            <h4 class="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
                ${formatDate(new Date(date))}
            </h4>
        `;
        logsContainer.appendChild(dateHeader);
        
        groupedLogs[date].forEach(log => {
            const logEntry = createLogEntry(log);
            logsContainer.appendChild(logEntry);
        });
    });
}

function groupLogsByDate(logs) {
    return logs.reduce((groups, log) => {
        const date = log.timestamp.toISOString().split('T')[0];
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(log);
        return groups;
    }, {});
}

function createLogEntry(log) {
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry border border-gray-200 rounded-lg p-4 mb-3 hover:shadow-md transition-shadow';
    
    const statusColors = {
        success: 'text-green-600 bg-green-50 border-green-200',
        error: 'text-red-600 bg-red-50 border-red-200',
        warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
        info: 'text-blue-600 bg-blue-50 border-blue-200'
    };
    
    const workflowIcons = {
        quiz: '📄',
        timetable: '📅',
        approval: '✅',
        communication: '📧'
    };
    
    logEntry.innerHTML = `
        <div class="flex items-start justify-between">
            <div class="flex items-start space-x-3 flex-1">
                <div class="text-2xl">${workflowIcons[log.workflow] || '🤖'}</div>
                <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-1">
                        <span class="font-semibold text-gray-900">${log.action}</span>
                        <span class="px-2 py-1 text-xs rounded-full ${statusColors[log.status]}">
                            ${log.status.toUpperCase()}
                        </span>
                    </div>
                    <p class="text-gray-700 mb-1">${log.message}</p>
                    <p class="text-sm text-gray-500">${log.details}</p>
                </div>
            </div>
            <div class="text-sm text-gray-500 ml-4">
                ${formatTime(log.timestamp)}
            </div>
        </div>
    `;
    
    return logEntry;
}

function formatDate(date) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
}

function refreshLogs() {
    // Simulate adding new logs
    const newLog = {
        id: allLogs.length + 1,
        timestamp: new Date(),
        workflow: 'quiz',
        action: 'System Check',
        status: 'info',
        message: 'System health check completed',
        details: 'All services running normally'
    };
    
    allLogs.unshift(newLog);
    filterLogs();
    
    // Show refresh notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = 'Logs refreshed successfully!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export logs functionality
function exportLogs() {
    const csvContent = generateCSV(filteredLogs);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campusflow-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Global logout function
function logout() {
    console.log('Logout function called (disabled for direct access)');
    // localStorage.removeItem("teacherName");
    // window.location.href = "login.html";
}

function generateCSV(logs) {
    const headers = ['Timestamp', 'Workflow', 'Action', 'Status', 'Message', 'Details'];
    const csvRows = [headers.join(',')];
    
    logs.forEach(log => {
        const row = [
            log.timestamp.toISOString(),
            log.workflow,
            log.action,
            log.status,
            `"${log.message}"`,
            `"${log.details}"`
        ];
        csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
}
