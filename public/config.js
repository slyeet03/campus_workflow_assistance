// Configuration for API endpoints
const CONFIG = {
    // Use environment variable if available, otherwise fallback to localhost for development
    API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:5001' 
        : 'https://campus-workflow-assistance.onrender.com', // Your actual Render URL
    
    // Alternative: You can also set this manually
    // API_BASE_URL: 'https://campus-workflow-assistance.onrender.com'
};

// Export for use in other files
window.CONFIG = CONFIG;
