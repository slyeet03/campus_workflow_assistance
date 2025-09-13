// login.js

// Simple login function
function handleLogin() {
    const teacherId = document.getElementById("teacherId").value.trim();
    const password = document.getElementById("password").value.trim();

    // Dummy credentials
    const validId = "teacher123";
    const validPassword = "password123";

    if (teacherId === validId && password === validPassword) {
        // Store teacher name in localStorage
        try {
            localStorage.setItem("teacherName", teacherId);
            localStorage.setItem("isAuthenticated", "true");
            
            // Redirect to dashboard
            window.location.href = "index.html";
        } catch (error) {
            console.error('localStorage error:', error);
            alert('Login error. Please try again.');
        }
    } else {
        alert("Invalid credentials. Please try again.");
    }
}


// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to submit button
    const submitButton = document.getElementById('loginBtn');
    if (submitButton) {
        submitButton.addEventListener('click', function(event) {
            event.preventDefault();
            handleLogin();
        });
    }
    
    // Also add form submit event as backup
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            handleLogin();
        });
    }
});