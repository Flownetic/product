// Product Data
let products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "electronics",
        price: 199.99,
        stock: 50,
        description: "Experience crystal-clear sound with our premium wireless headphones featuring noise cancellation and 30-hour battery life.",
        images: [
            "https://source.unsplash.com/random/800x600/?headphones",
            "https://source.unsplash.com/random/800x600/?headphones2",
            "https://source.unsplash.com/random/800x600/?headphones3"
        ],
        featured: true
    },
    {
        id: 2,
        name: "Ergonomic Office Chair",
        category: "furniture",
        price: 299.99,
        stock: 25,
        description: "Stay comfortable during long work sessions with this ergonomic chair designed for proper posture and support.",
        images: [
            "https://source.unsplash.com/random/800x600/?office,chair",
            "https://source.unsplash.com/random/800x600/?office,chair2"
        ],
        featured: true
    },
    {
        id: 3,
        name: "Smart Fitness Watch",
        category: "electronics",
        price: 159.99,
        stock: 75,
        description: "Track your fitness goals with this smart watch featuring heart rate monitoring, GPS, and 7-day battery life.",
        images: [
            "https://source.unsplash.com/random/800x600/?smartwatch",
            "https://source.unsplash.com/random/800x600/?smartwatch2"
        ],
        featured: false
    }
];

// Initialize Products on Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Load featured products on homepage
    if (document.getElementById('featuredProducts')) {
        loadFeaturedProducts();
    }
    
    // Load all products on products page
    if (document.getElementById('allProducts')) {
        loadAllProducts();
    }
    
    // Load single product on detail page
    if (document.querySelector('.product-detail')) {
        loadProductDetail();
    }
});

// Load Featured Products
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    const featuredProducts = products.filter(product => product.featured);
    
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredContainer.appendChild(productCard);
    });
}

// Load All Products
function loadAllProducts() {
    const productsContainer = document.getElementById('allProducts');
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

// Create Product Card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.images[0]}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <span class="product-category">${product.category}</span>
            <p>${product.description.substring(0, 100)}...</p>
            <a href="product-detail.html?id=${product.id}" class="btn">View Details</a>
        </div>
    `;
    
    return card;
}

// Load Product Detail
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    
    if (product) {
        document.title = `${product.name} | Flownetic`;
        
        // Set main product image
        const mainImage = document.querySelector('.main-image');
        mainImage.src = product.images[0];
        mainImage.alt = product.name;
        
        // Set thumbnails
        const gallery = document.querySelector('.product-gallery');
        product.images.forEach((image, index) => {
            if (index > 0) {
                const thumbnail = document.createElement('img');
                thumbnail.src = image;
                thumbnail.alt = `${product.name} ${index + 1}`;
                thumbnail.className = 'thumbnail';
                gallery.appendChild(thumbnail);
            }
        });
        
        // Set product info
        document.querySelector('.product-title').textContent = product.name;
        document.querySelector('.product-price').textContent = `$${product.price.toFixed(2)}`;
        document.querySelector('.product-description').textContent = product.description;
        
        // Set meta info
        document.getElementById('product-category').textContent = product.category;
        document.getElementById('product-stock').textContent = product.stock > 0 ? 'In Stock' : 'Out of Stock';
    } else {
        // Product not found, redirect to products page
        window.location.href = 'products.html';
    }
}
