// Admin credentials (in a real app, these would be stored securely server-side)
const ADMIN_CREDENTIALS = {
    username: "flownetic_admin",
    password: "Flown3t!c@2023" // Strong password for demo
};

// DOM Elements
const loginContainer = document.getElementById('loginContainer');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const adminGreeting = document.getElementById('adminGreeting');

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('flowneticAdminLoggedIn') === 'true';
    
    if (isLoggedIn) {
        loginContainer.style.display = 'none';
        adminDashboard.style.display = 'grid';
        adminGreeting.textContent = `Welcome back, ${localStorage.getItem('flowneticAdminUsername') || 'Admin'}`;
    }
});

// Login Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Successful login
        localStorage.setItem('flowneticAdminLoggedIn', 'true');
        localStorage.setItem('flowneticAdminUsername', username);
        
        loginContainer.style.display = 'none';
        adminDashboard.style.display = 'grid';
        adminGreeting.textContent = `Welcome, ${username}`;
        
        // Clear form
        loginForm.reset();
    } else {
        alert('Invalid credentials. Please try again.');
    }
});

// Logout Functionality
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('flowneticAdminLoggedIn');
    localStorage.removeItem('flowneticAdminUsername');
    
    adminDashboard.style.display = 'none';
    loginContainer.style.display = 'flex';
});

// Product Management Functions (from previous implementation)
// ... [include all the product management code from previous implementation]

// Sample product data
let products = [
    {
        id: 1,
        name: "Premium Headphones",
        category: "electronics",
        price: 199.99,
        stock: 50,
        description: "High-quality noise-cancelling headphones with premium sound."
    },
    {
        id: 2,
        name: "Ergonomic Office Chair",
        category: "furniture",
        price: 299.99,
        stock: 25,
        description: "Comfortable chair designed for long work sessions."
    }
];

// Initialize product table
function initProductTable() {
    const tableBody = document.querySelector('#productsTable tbody');
    tableBody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="https://via.placeholder.com/50?text=Product" alt="${product.name}" style="width:50px;"></td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>
                <button class="btn-edit" data-id="${product.id}">Edit</button>
                <button class="btn-delete" data-id="${product.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Add event listeners to edit/delete buttons
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            editProduct(productId);
        });
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            if (confirm('Are you sure you want to delete this product?')) {
                deleteProduct(productId);
            }
        });
    });
}

// Initialize on page load
initProductTable();
