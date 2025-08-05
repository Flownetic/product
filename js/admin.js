// Admin Product Management System
document.addEventListener('DOMContentLoaded', function() {
    // Initialize products
    let products = JSON.parse(localStorage.getItem('flowneticProducts')) || [
        {
            id: 1,
            name: "Sample Product",
            category: "electronics",
            price: 99.99,
            stock: 10,
            description: "This is a sample product",
            images: ["https://via.placeholder.com/500"]
        }
    ];

    // DOM Elements
    const productForm = document.getElementById('productForm');
    const addProductBtn = document.getElementById('addProductBtn');
    const cancelProductBtn = document.getElementById('cancelProductBtn');
    const productsTable = document.getElementById('productsTable').querySelector('tbody');
    const productFormContainer = document.getElementById('productFormContainer');

    // Initialize the product table
    renderProductTable();

    // Event Listeners
    addProductBtn.addEventListener('click', showProductForm);
    cancelProductBtn.addEventListener('click', hideProductForm);
    productForm.addEventListener('submit', handleFormSubmit);

    // Functions
    function renderProductTable() {
        productsTable.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td><img src="${product.images[0]}" alt="${product.name}" width="50"></td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn-edit" data-id="${product.id}">Edit</button>
                    <button class="btn-delete" data-id="${product.id}">Delete</button>
                </td>
            `;
            productsTable.appendChild(row);
        });

        // Add event listeners to edit/delete buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                editProduct(productId);
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                if (confirm('Are you sure you want to delete this product?')) {
                    deleteProduct(productId);
                }
            });
        });
    }

    function showProductForm() {
        productForm.reset();
        productForm.dataset.mode = 'add';
        productFormContainer.style.display = 'block';
        window.scrollTo(0, document.body.scrollHeight);
    }

    function hideProductForm() {
        productFormContainer.style.display = 'none';
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(productForm);
        const productId = parseInt(formData.get('productId')) || generateId();
        const productImages = Array.from(document.getElementById('productImages').files).map(file => 
            URL.createObjectURL(file)
        );

        const product = {
            id: productId,
            name: formData.get('productName'),
            category: formData.get('productCategory'),
            price: parseFloat(formData.get('productPrice')),
            stock: parseInt(formData.get('productStock')),
            description: formData.get('productDescription'),
            images: productImages.length > 0 ? productImages : ['https://via.placeholder.com/500']
        };

        if (productForm.dataset.mode === 'edit') {
            // Update existing product
            const index = products.findIndex(p => p.id === productId);
            if (index !== -1) {
                products[index] = product;
            }
        } else {
            // Add new product
            products.push(product);
        }

        // Save to localStorage
        localStorage.setItem('flowneticProducts', JSON.stringify(products));
        
        // Refresh table and hide form
        renderProductTable();
        hideProductForm();
    }

    function editProduct(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productStock').value = product.stock;
            document.getElementById('productDescription').value = product.description;
            
            // Handle images (simplified for demo)
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.innerHTML = '';
            product.images.forEach(img => {
                const imgEl = document.createElement('img');
                imgEl.src = img;
                imgEl.style.height = '100px';
                imagePreview.appendChild(imgEl);
            });

            productForm.dataset.mode = 'edit';
            productFormContainer.style.display = 'block';
            window.scrollTo(0, document.body.scrollHeight);
        }
    }

    function deleteProduct(productId) {
        products = products.filter(p => p.id !== productId);
        localStorage.setItem('flowneticProducts', JSON.stringify(products));
        renderProductTable();
    }

    function generateId() {
        return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    }

    // Image preview functionality
    document.getElementById('productImages').addEventListener('change', function(e) {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.innerHTML = '';
        
        Array.from(e.target.files).forEach(file => {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.style.height = '100px';
            img.style.margin = '5px';
            imagePreview.appendChild(img);
        });
    });
});
