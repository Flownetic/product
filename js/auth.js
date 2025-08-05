// Authentication Module
const Auth = {
    // Admin credentials (in production, this would be handled server-side)
    adminCredentials: {
        username: "flownetic_admin",
        password: "Flown3t!c@2023" // Strong password for demo
    },

    // Check if user is logged in
    isAuthenticated: function() {
        return localStorage.getItem('flowneticAuth') === 'true';
    },

    // Login function
    login: function(username, password) {
        if (username === this.adminCredentials.username && 
            password === this.adminCredentials.password) {
            localStorage.setItem('flowneticAuth', 'true');
            localStorage.setItem('flowneticUsername', username);
            return true;
        }
        return false;
    },

    // Logout function
    logout: function() {
        localStorage.removeItem('flowneticAuth');
        localStorage.removeItem('flowneticUsername');
    },

    // Get current user
    getCurrentUser: function() {
        return localStorage.getItem('flowneticUsername');
    },

    // Protect admin routes
    protectRoute: function() {
        if (!this.isAuthenticated() && window.location.pathname.includes('admin.html')) {
            window.location.href = 'index.html';
        }
    }
};

// Initialize auth protection on page load
document.addEventListener('DOMContentLoaded', function() {
    Auth.protectRoute();
    
    // If on admin page, show admin content if authenticated
    if (window.location.pathname.includes('admin.html') {
        if (Auth.isAuthenticated()) {
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('adminDashboard').style.display = 'grid';
            document.getElementById('adminGreeting').textContent = 
                `Welcome, ${Auth.getCurrentUser()}`;
        }
    }
});

// Login Form Submission
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (Auth.login(username, password)) {
            window.location.href = 'admin.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
}

// Logout Button
if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').addEventListener('click', function() {
        Auth.logout();
        window.location.href = 'index.html';
    });
}
