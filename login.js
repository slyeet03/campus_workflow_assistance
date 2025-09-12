// login.js

// Simple login function
function handleLogin() {
    console.log('Login function called');
    alert('Login function called!'); // Debug alert
    
    const teacherId = document.getElementById("teacherId").value.trim();
    const password = document.getElementById("password").value.trim();
    
    console.log('Teacher ID:', teacherId);
    console.log('Password:', password);

    // Dummy credentials
    const validId = "teacher123";
    const validPassword = "password123";

    if (teacherId === validId && password === validPassword) {
        console.log('Credentials valid, redirecting...');
        alert('Credentials valid! Redirecting...'); // Debug alert
        
        // Store teacher name in localStorage with a more reliable method
        try {
            localStorage.setItem("teacherName", teacherId);
            localStorage.setItem("isAuthenticated", "true");
            console.log('Stored teacher name in localStorage');
            
            // Verify localStorage was set
            const storedName = localStorage.getItem("teacherName");
            const isAuth = localStorage.getItem("isAuthenticated");
            console.log('Verification - stored name:', storedName);
            console.log('Verification - isAuthenticated:', isAuth);
            alert('Stored name: ' + storedName + ', Auth: ' + isAuth); // Debug alert

            // Wait a moment then redirect
            setTimeout(() => {
                console.log('Redirecting to index.html...');
                window.location.href = "index.html";
            }, 1000);
        } catch (error) {
            console.error('localStorage error:', error);
            alert('localStorage error: ' + error.message);
        }
    } else {
        console.log('Invalid credentials');
        alert("Invalid credentials. Please try again.");
    }
}

// Test function for debugging
function testLogin() {
    console.log('Test login function called');
    
    // Set test values
    document.getElementById("teacherId").value = "teacher123";
    document.getElementById("password").value = "password123";
    
    console.log('Test values set, calling handleLogin...');
    handleLogin();
}

// Bypass function for testing
function bypassLogin() {
    console.log('Bypass login function called');
    alert('Bypassing login...');
    
    // Set authentication directly
    localStorage.setItem("teacherName", "teacher123");
    localStorage.setItem("isAuthenticated", "true");
    
    // Verify
    const storedName = localStorage.getItem("teacherName");
    const isAuth = localStorage.getItem("isAuthenticated");
    console.log('Bypass - stored name:', storedName);
    console.log('Bypass - isAuthenticated:', isAuth);
    alert('Bypass - Stored name: ' + storedName + ', Auth: ' + isAuth);
    
    // Redirect immediately
    window.location.href = "index.html";
}

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Login page loaded');
    
    // Add click event to submit button
    const submitButton = document.getElementById('loginBtn');
    if (submitButton) {
        console.log('Submit button found, adding click event');
        submitButton.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Submit button clicked');
            handleLogin();
        });
    } else {
        console.error('Submit button not found!');
    }
    
    // Also add form submit event as backup
    const form = document.querySelector('form');
    if (form) {
        console.log('Form found, adding submit event');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Form submitted');
            handleLogin();
        });
    }
});