// index.js

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
        window.location.href = "login.html";
        return;
    }
    
    // Get teacher name from localStorage (if available)
    const teacherName = localStorage.getItem("teacherName");
    
    // Add any other dashboard-specific functionality here
});

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('user');
        localStorage.removeItem('teacherName');
        localStorage.removeItem('isAuthenticated');
        window.location.href = 'login.html';
    }
}