// index.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('Index page loaded');
    
    // Get teacher name from localStorage (if available)
    const teacherName = localStorage.getItem("teacherName");
    console.log('Retrieved teacher name:', teacherName);

    // Add welcome message or any other functionality
    if (teacherName) {
        console.log('Welcome, ' + teacherName);
    } else {
        console.log('Welcome to CampusFlow Dashboard');
    }
    
    // Add any other dashboard-specific functionality here
});