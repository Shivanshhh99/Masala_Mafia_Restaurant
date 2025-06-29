let cart = [];
let menuItems = [];
let currentFilter = 'all';

// Menu Data
const menuData = [
    // Appetizers
    {
        id: 1,
        name: "Samosa Chaat",
        price: 120,
        description: "Crispy samosas topped with tangy chutneys, yogurt, and fresh herbs",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
        category: "appetizers",
        spiceLevel: "mild"
    },
    {
        id: 2,
        name: "Paneer Tikka",
        price: 180,
        description: "Marinated cottage cheese grilled to perfection with aromatic spices",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400",
        category: "appetizers",
        spiceLevel: "medium"
    },
    {
        id: 3,
        name: "Chicken 65",
        price: 220,
        description: "Spicy deep-fried chicken with curry leaves and green chilies",
        image: "assets/maxresdefault.jpg",
        category: "appetizers",
        spiceLevel: "hot"
    },
    {
        id: 4,
        name: "Aloo Tikki",
        price: 100,
        description: "Golden potato patties served with mint and tamarind chutney",
        image: "assets/tikki-thumbnail.jpg",
        category: "appetizers",
        spiceLevel: "mild"
    },
    
    // Main Course
    {
        id: 5,
        name: "Butter Chicken",
        price: 280,
        description: "Tender chicken in rich tomato-based curry with cream and aromatic spices",
        image: "assets/images (1).jpeg",
        category: "mains",
        spiceLevel: "mild"
    },
    {
        id: 6,
        name: "Biryani Special",
        price: 320,
        description: "Fragrant basmati rice layered with marinated meat and exotic spices",
        image: "assets/hq720.jpg",
        category: "mains",
        spiceLevel: "medium"
    },
    {
        id: 7,
        name: "Dal Makhani",
        price: 180,
        description: "Creamy black lentils slow-cooked with butter and aromatic spices",
        image: "assets/dal-makhani7.webp",
        category: "mains",
        spiceLevel: "mild"
    },
    {
        id: 8,
        name: "Mutton Rogan Josh",
        price: 380,
        description: "Tender mutton cooked in traditional Kashmiri style with yogurt and spices",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
        category: "mains",
        spiceLevel: "hot"
    },
    {
        id: 9,
        name: "Palak Paneer",
        price: 200,
        description: "Fresh cottage cheese in creamy spinach gravy with Indian spices",
        image: "assets/Palak-Paneer-1-1-720x540.webp",
        category: "mains",
        spiceLevel: "mild"
    },
    {
        id: 10,
        name: "Fish Curry",
        price: 300,
        description: "Fresh fish cooked in coconut-based curry with traditional spices",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
        category: "mains",
        spiceLevel: "medium"
    },

    // Desserts
    {
        id: 11,
        name: "Gulab Jamun",
        price: 80,
        description: "Soft milk dumplings soaked in rose-flavored sugar syrup",
        image: "assets/gulab-jamun-desi-ghee.jpg",
        category: "desserts",
        spiceLevel: "none"
    },
    {
        id: 12,
        name: "Kulfi Faluda",
        price: 120,
        description: "Traditional Indian ice cream with vermicelli and rose syrup",
        image: "assets/1689-026.jpg",
        category: "desserts",
        spiceLevel: "none"
    },
    {
        id: 13,
        name: "Ras Malai",
        price: 100,
        description: "Soft cottage cheese dumplings in sweetened cardamom milk",
        image: "assets/Ras-Malai-07-1-500x375.jpg",
        category: "desserts",
        spiceLevel: "none"
    },

    // Beverages
    {
        id: 14,
        name: "Masala Chai",
        price: 40,
        description: "Traditional spiced tea brewed with aromatic herbs and spices",
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400",
        category: "beverages",
        spiceLevel: "mild"
    },
    {
        id: 15,
        name: "Mango Lassi",
        price: 80,
        description: "Creamy yogurt drink blended with fresh mango and cardamom",
        image: "assets/mango-lassi-recipe-c.jpg",
        category: "beverages",
        spiceLevel: "none"
    },
    {
        id: 16,
        name: "Fresh Lime Soda",
        price: 60,
        description: "Refreshing lime juice with soda water and a hint of black salt",
        image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400",
        category: "beverages",
        spiceLevel: "mild"
    }
];

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const orderModal = document.getElementById('order-modal');
const closeModal = document.getElementById('close-modal');
const orderSummary = document.getElementById('order-summary');
const orderForm = document.getElementById('order-form');
const menuGrid = document.getElementById('menu-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);

    // Initialize menu items
    menuItems = [...menuData];
    renderMenuItems();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize scroll effects
    handleScroll();
});

// Event Listeners Setup
function setupEventListeners() {
    // Navigation
    window.addEventListener('scroll', handleScroll);
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Cart functionality
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    checkoutBtn.addEventListener('click', openOrderModal);
    
    // Modal functionality
    closeModal.addEventListener('click', closeOrderModal);
    orderModal.addEventListener('click', function(e) {
        if (e.target === orderModal) closeOrderModal();
    });
    
    // Menu filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            setActiveFilter(this);
            filterMenuItems(filter);
        });
    });
    
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Form submissions
    orderForm.addEventListener('submit', handleOrderSubmission);
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId);
            closeMobileMenu();
        });
    });
    
    // Contact form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleTableReservation);
    }
}

// Scroll handling
function handleScroll() {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled', scrolled);
    
    // Update active navigation link
    updateActiveNavLink();
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = ['home', 'about', 'menu', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Smooth scroll to section
function scrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Scroll to menu function for hero button
function scrollToMenu() {
    scrollToSection('#menu');
}

// Menu rendering
function renderMenuItems(items = menuItems) {
    menuGrid.innerHTML = '';
    
    items.forEach(item => {
        const menuItemElement = createMenuItemElement(item);
        menuGrid.appendChild(menuItemElement);
    });
    
    // Add animation
    setTimeout(() => {
        document.querySelectorAll('.menu-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in');
            }, index * 100);
        });
    }, 100);
}

// Create menu item element
function createMenuItemElement(item) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.dataset.category = item.category;
    
    const spiceLevelText = {
        'mild': '🌶️ Mild',
        'medium': '🌶️🌶️ Medium',
        'hot': '🌶️🌶️🌶️ Hot',
        'none': 'No Spice'
    };
    
    
    menuItem.innerHTML = `
        <div class="menu-item-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <div class="spice-level ${item.spiceLevel}">
                ${spiceLevelText[item.spiceLevel]}
            </div>
        </div>
        <div class="menu-item-content">
            <div class="menu-item-header">
                <h3 class="menu-item-title">${item.name}</h3>
                <span class="menu-item-price">₹${item.price}</span>
            </div>
            <p class="menu-item-description">${item.description}</p>
            <div class="menu-item-footer">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                    <span class="quantity-display" id="qty-${item.id}">1</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <button class="add-to-cart" onclick="addToCart(${item.id})">
                    <i class="fas fa-plus"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    
    return menuItem;
}

// Quantity controls
function increaseQuantity(itemId) {
    const qtyElement = document.getElementById(`qty-${itemId}`);
    let currentQty = parseInt(qtyElement.textContent);
    if (currentQty < 10) {
        qtyElement.textContent = currentQty + 1;
    }
}

function decreaseQuantity(itemId) {
    const qtyElement = document.getElementById(`qty-${itemId}`);
    let currentQty = parseInt(qtyElement.textContent);
    if (currentQty > 1) {
        qtyElement.textContent = currentQty - 1;
    }
}

// Menu filtering
function setActiveFilter(activeBtn) {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

function filterMenuItems(filter) {
    currentFilter = filter;
    const filteredItems = filter === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === filter);
    
    // Add fade out effect
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.add('hidden');
    });
    
    setTimeout(() => {
        renderMenuItems(filteredItems);
    }, 300);
}

// Search functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    let filteredItems = menuItems;
    
    if (currentFilter !== 'all') {
        filteredItems = menuItems.filter(item => item.category === currentFilter);
    }
    
    if (searchTerm) {
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );
    }
    
    renderMenuItems(filteredItems);
}

// Cart functionality
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    const quantity = parseInt(document.getElementById(`qty-${itemId}`).textContent);
    
    const existingCartItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingCartItem) {
        existingCartItem.quantity += quantity;
    } else {
        cart.push({
            ...item,
            quantity: quantity
        });
    }
    
    updateCartUI();
    showToast(`${item.name} added to cart!`);
    
    // Reset quantity to 1
    document.getElementById(`qty-${itemId}`).textContent = '1';
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
    showToast('Item removed from cart');
}

function updateCartItemQuantity(itemId, newQuantity) {
    const cartItem = cart.find(item => item.id === itemId);
    if (cartItem) {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
        } else {
            cartItem.quantity = newQuantity;
            updateCartUI();
        }
    }
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 40px 0; color: #666;">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.3;"></i>
                <p>Your cart is empty</p>
                <p style="font-size: 0.9rem;">Add some delicious items to get started!</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const cartItemElement = createCartItemElement(item);
            cartItems.appendChild(cartItemElement);
        });
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total;
    
    // Update checkout button
    checkoutBtn.disabled = cart.length === 0;
    checkoutBtn.style.opacity = cart.length === 0 ? '0.5' : '1';
}

function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">₹${item.price} × ${item.quantity}</div>
        </div>
        <div class="cart-item-controls">
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="background: var(--accent-color); margin-left: 10px;">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    return cartItem;
}

// Cart sidebar
function openCart() {
    cartSidebar.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Order modal
function openOrderModal() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    orderModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Populate order summary
    let summaryHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        summaryHTML += `
            <div class="order-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>₹${itemTotal}</span>
            </div>
        `;
    });
    
    // Add delivery charges
    const deliveryCharges = total > 500 ? 0 : 50;
    if (deliveryCharges > 0) {
        summaryHTML += `
            <div class="order-item">
                <span>Delivery Charges</span>
                <span>₹${deliveryCharges}</span>
            </div>
        `;
    }
    
    const finalTotal = total + deliveryCharges;
    
    summaryHTML += `
        <div class="order-item">
            <span><strong>Total</strong></span>
            <span><strong>₹${finalTotal}</strong></span>
        </div>
    `;
    
    orderSummary.innerHTML = summaryHTML;
}

function closeOrderModal() {
    orderModal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Order submission
function handleOrderSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(orderForm);
    const orderData = {
        items: cart,
        customerDetails: {
            name: formData.get('name') || e.target.elements[0].value,
            phone: formData.get('phone') || e.target.elements[1].value,
            email: formData.get('email') || e.target.elements[2].value,
            address: formData.get('address') || e.target.elements[3].value,
            paymentMethod: formData.get('payment') || e.target.elements.payment.value
        },
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        orderTime: new Date().toISOString()
    };
    
    // Simulate order processing
    const submitBtn = orderForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Clear cart and close modal
        cart = [];
        updateCartUI();
        closeOrderModal();
        closeCartSidebar();
        
        // Show success message
        showToast('Order placed successfully! We\'ll call you to confirm.', 'success', 5000);
        
        // Reset form
        orderForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Log order data (in real app, send to server)
        console.log('Order placed:', orderData);
    }, 2000);
}

// Table reservation
function handleTableReservation(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const reservationData = {
        name: e.target.elements[0].value,
        email: e.target.elements[1].value,
        phone: e.target.elements[2].value,
        date: e.target.elements[3].value,
        time: e.target.elements[4].value
    };
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showToast('Table reserved successfully! We\'ll send you a confirmation email.', 'success', 5000);
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        console.log('Reservation made:', reservationData);
    }, 2000);
}

// Toast notifications
function showToast(message, type = 'success', duration = 3000) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    // Change color based on type
    if (type === 'success') {
        toast.style.background = 'var(--gradient-primary)';
    } else if (type === 'error') {
        toast.style.background = 'var(--accent-color)';
    }
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Responsive utilities
function handleResize() {
    if (window.innerWidth > 1024) {
        closeMobileMenu();
        closeCartSidebar();
    }
}

// Window resize handler
window.addEventListener('resize', handleResize);

// Smooth scroll for all anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        scrollToSection(targetId);
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const elementsToAnimate = document.querySelectorAll('.about-text, .stat, .contact-info, .footer-section');
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    }, 1000);
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        if (orderModal.classList.contains('open')) {
            closeOrderModal();
        }
        if (cartSidebar.classList.contains('open')) {
            closeCartSidebar();
        }
        if (navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
});

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Call lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Service Worker registration for PWA capabilities 
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for global access
window.scrollToMenu = scrollToMenu;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartItemQuantity = updateCartItemQuantity;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;


// Video Modal Functions
function openVideoModal() {
    // Add the active class to body to trigger CSS
    document.body.classList.add('video-modal-active');
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    
    // Optional: Start playing the video
    const video = document.querySelector('.video-wrapper video');
    if (video) {
      video.play();
    }
  }
  
  function closeVideoModal() {
    // Remove the active class
    document.body.classList.remove('video-modal-active');
    
    // Restore scrolling
    document.body.style.overflow = '';
    
    // Pause and reset video
    const video = document.querySelector('.video-wrapper video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }
  
  // Event Listeners
  document.addEventListener('DOMContentLoaded', function() {
    // Watch Story Button Click
    const watchStoryBtn = document.querySelector('.btn-watch-story');
    if (watchStoryBtn) {
      watchStoryBtn.addEventListener('click', openVideoModal);
    }
    
    // Close Button Click
    const closeBtn = document.querySelector('.video-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeVideoModal);
    }
    
    // Close on backdrop click
    document.addEventListener('click', function(e) {
      if (document.body.classList.contains('video-modal-active')) {
        const videoWrapper = document.querySelector('.video-wrapper');
        const isClickInsideVideo = videoWrapper && videoWrapper.contains(e.target);
        const isCloseButton = e.target.classList.contains('video-close-btn');
        const isWatchButton = e.target.classList.contains('btn-watch-story');
        
        if (!isClickInsideVideo && !isCloseButton && !isWatchButton) {
          closeVideoModal();
        }
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && document.body.classList.contains('video-modal-active')) {
        closeVideoModal();
      }
    });
  });


