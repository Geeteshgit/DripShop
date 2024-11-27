// Mobile Navigation
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('nav');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Shopping Cart Functionality
let cart = [];

function addToCart(productId, name, price, image) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    saveCartToLocalStorage();
}

function updateCartDisplay() {
    const cartIcon = document.querySelector('#bag i');
    if (cartIcon) {
        cartIcon.setAttribute('data-count', cart.reduce((sum, item) => sum + item.quantity, 0));
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('dripshopCart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('dripshopCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Initialize cart from localStorage
document.addEventListener('DOMContentLoaded', loadCartFromLocalStorage);

// Add click handlers to all cart buttons
document.querySelectorAll('.cart').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const product = e.target.closest('.products');
        const productName = product.querySelector('h5').textContent;
        const productPrice = parseFloat(product.querySelector('h4').textContent.replace('$', ''));
        const productImage = product.querySelector('img').src;
        const productId = productName.toLowerCase().replace(/\s+/g, '-');
        
        addToCart(productId, productName, productPrice, productImage);
    });
});

// Newsletter Signup
const newsletterForm = document.querySelector('#newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Simulate API call
        console.log(`Newsletter signup for: ${email}`);
        newsletterForm.reset();
        alert('Thank you for subscribing to our newsletter!');
    });
}

// Product Search and Filter
function createProductSearch() {
    const featuredSection = document.getElementById('featured-products');
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="productSearch" placeholder="Search products...">
        <select id="priceFilter">
            <option value="">All Prices</option>
            <option value="0-20">$0 - $20</option>
            <option value="21-35">$21 - $35</option>
            <option value="36-50">$36 - $50</option>
        </select>
    `;
    
    featuredSection.insertBefore(searchContainer, featuredSection.querySelector('.f-apparels'));
    
    const searchInput = document.getElementById('productSearch');
    const priceFilter = document.getElementById('priceFilter');
    
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const priceRange = priceFilter.value;
        const products = document.querySelectorAll('.products');
        
        products.forEach(product => {
            const name = product.querySelector('h5').textContent.toLowerCase();
            const price = parseFloat(product.querySelector('h4').textContent.replace('$', ''));
            let priceMatch = true;
            
            if (priceRange) {
                const [min, max] = priceRange.split('-').map(Number);
                priceMatch = price >= min && price <= max;
            }
            
            const nameMatch = name.includes(searchTerm);
            product.style.display = (nameMatch && priceMatch) ? 'block' : 'none';
        });
    }
    
    searchInput.addEventListener('input', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
}

// Dynamic Product Rating
function initializeProductRatings() {
    document.querySelectorAll('.rating').forEach(ratingContainer => {
        const stars = ratingContainer.querySelectorAll('i');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                stars.forEach((s, i) => {
                    s.className = i <= index ? 'fa-solid fa-star' : 'fa-regular fa-star';
                });
            });
        });
    });
}

// Initialize all dynamic features
document.addEventListener('DOMContentLoaded', () => {
    createProductSearch();
    initializeProductRatings();
});