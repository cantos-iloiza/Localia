// =====================
// MOBILE MENU TOGGLE
// =====================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// =====================
// TAB FUNCTIONALITY & DYNAMIC FILTERS
// =====================

const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');

const categories = {
    items: [
        { value: 'all', text: 'All Categories' },
        { value: 'electronics', text: 'Electronics' },
        { value: 'furniture', text: 'Furniture' },
        { value: 'clothing', text: 'Clothing' },
        { value: 'books', text: 'Books' },
        { value: 'other', text: 'Other' }
    ],
    services: [
        { value: 'all', text: 'All Categories' },
        { value: 'education', text: 'Education' },
        { value: 'pet-care', text: 'Pet Care' },
        { value: 'home-services', text: 'Home Services' },
        { value: 'creative', text: 'Creative' },
        { value: 'other', text: 'Other' }
    ]
};

const priceRanges = {
    items: [
        { value: 'all', text: 'All Prices' },
        { value: '0-50', text: '$0 - $50' },
        { value: '50-100', text: '$50 - $100' },
        { value: '100-200', text: '$100 - $200' },
        { value: '200+', text: '$200+' }
    ],
    services: [
        { value: 'all', text: 'All Rates' },
        { value: '0-25', text: '$0 - $25/hr' },
        { value: '25-50', text: '$25 - $50/hr' },
        { value: '50-100', text: '$50 - $100/hr' },
        { value: '100+', text: '$100+/hr' }
    ]
};

function updateCategoryFilter(type) {
    if (!categoryFilter) return;
    categoryFilter.innerHTML = '';
    const options = categories[type] || categories['items'];
    
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        categoryFilter.appendChild(option);
    });
}

function updatePriceFilter(type) {
    if (!priceFilter) return;
    priceFilter.innerHTML = '';
    const options = priceRanges[type] || priceRanges['items'];
    
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        priceFilter.appendChild(option);
    });
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        tab.classList.add('active');
        const activeContent = document.getElementById(targetTab);
        if (activeContent) activeContent.classList.add('active');

        updateCategoryFilter(targetTab);
        updatePriceFilter(targetTab);
    });
});

const addItemBtn = document.getElementById('addItemBtn');
const addItemModal = document.getElementById('addItemModal');

if (addItemBtn && addItemModal) {
    addItemBtn.addEventListener('click', () => {
        addItemModal.classList.add('active');
    });
}

const addServiceBtn = document.getElementById('addServiceBtn');
const addServiceModal = document.getElementById('addServiceModal');

if (addServiceBtn && addServiceModal) {
    addServiceBtn.addEventListener('click', () => {
        addServiceModal.classList.add('active');
    });
}

const modalCloses = document.querySelectorAll('.modal-close');
modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal').classList.remove('active');
    });
});

const modals = document.querySelectorAll('.modal');
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        console.log('Login attempt:', { email, password });
        alert('Login successful! (This is a demo)');
        window.location.href = 'marketplace.html';
    });
}

const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const location = document.getElementById('signupLocation').value;

        console.log('Signup attempt:', { name, email, password, location });
        alert('Account created successfully! (This is a demo)');
        window.location.href = 'marketplace.html';
    });
}

const itemForm = document.getElementById('itemForm');
if (itemForm) {
    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const itemName = document.getElementById('itemName').value;
        const itemPrice = document.getElementById('itemPrice').value;
        const itemDescription = document.getElementById('itemDescription').value;
        const itemImageInput = document.getElementById('itemImage');

        const itemsGrid = document.getElementById("itemsGrid");
        if (!itemsGrid) {
            console.error("❌ itemsGrid NOT FOUND in DOM");
            return;
        }

        let imageURL = "placeholder.jpg";
        const file = itemImageInput.files[0];

        if (file) {
            imageURL = URL.createObjectURL(file);
        }

        const itemCard = document.createElement("div");
        itemCard.classList.add("card", "item-card");

        itemCard.innerHTML = `
            <img src="${imageURL}" class="card-image" alt="${itemName}">
            <div class="card-content">
                <h3 class="card-title">${itemName}</h3>
                <p class="card-price">$${itemPrice}</p>
                <p class="card-description">${itemDescription}</p>
                <div class="card-meta">
                    <span class="card-location">📍 Location Not Set</span>
                    <span class="card-time">Just now</span>
                </div>
                <button class="btn btn-primary btn-block">View Details</button>
            </div>
        `;

        itemsGrid.prepend(itemCard);

        itemCard.querySelector(".btn-primary").addEventListener("click", () => {
            alert("This would open item details. (Demo)");
        });

        addItemModal.classList.remove('active');
        itemForm.reset();
    });
}

const serviceForm = document.getElementById('serviceForm');
if (serviceForm) {
    serviceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const serviceName = document.getElementById('serviceName').value;
        const serviceRate = document.getElementById('serviceRate').value;
        const serviceCategory = document.getElementById('serviceCategory').value;
        const serviceDescription = document.getElementById('serviceDescription').value;
        
        console.log('New service:', { serviceName, serviceRate, serviceCategory, serviceDescription });
        alert('Service posted successfully! (This is a demo)');

        addServiceModal.classList.remove('active');
        serviceForm.reset();
    });
}

const settingsForm = document.querySelector('.settings-form');
if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Settings saved successfully! (This is a demo)');
    });
}

const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const loginBox = document.getElementById('loginBox');
const signupBox = document.getElementById('signupBox');

if (showSignup) {
    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginBox.style.display = 'none';
        signupBox.style.display = 'block';
    });
}

if (showLogin) {
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupBox.style.display = 'none';
        loginBox.style.display = 'block';
    });
}

const termsLink = document.getElementById('termsLink');
const privacyLink = document.getElementById('privacyLink');
const termsModal = document.getElementById('termsModal');
const privacyModal = document.getElementById('privacyModal');

if (termsLink && termsModal) {
    termsLink.addEventListener('click', (e) => {
        e.preventDefault(); 
        e.stopPropagation();
        termsModal.classList.add('active');
    });
}

if (privacyLink && privacyModal) {
    privacyLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        privacyModal.classList.add('active');
    });
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            alert('Logged out successfully! (This is a demo)');
            window.location.href = 'index.html';
        }
    });
}

const editProfileBtn = document.getElementById('editProfileBtn');
if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
        const settingsTab = document.querySelector('[data-tab="settings"]');
        if (settingsTab) {
            settingsTab.click();
        }
    });
}

const searchInput = document.getElementById('searchInput');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log('Searching for:', searchTerm);
    });
}

if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
        const category = e.target.value;
        console.log('Filter by category:', category);
    });
}

if (priceFilter) {
    priceFilter.addEventListener('change', (e) => {
        const priceRange = e.target.value;
        console.log('Filter by price:', priceRange);
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const itemDetailsModal = document.getElementById('itemDetailsModal');
const serviceDetailsModal = document.getElementById('serviceDetailsModal');

document.addEventListener('click', (e) => {

    if (e.target.matches('.card .btn-primary')) {
        const btn = e.target;
        const card = btn.closest('.card'); 

        if (card.classList.contains('item-card')) {
            const img = card.querySelector('.card-image').src;
            const title = card.querySelector('.card-title').textContent;
            const price = card.querySelector('.card-price').textContent;
            const desc = card.querySelector('.card-description').textContent;
            const loc = card.querySelector('.card-location').textContent;
            const time = card.querySelector('.card-time').textContent;

            const contentDiv = document.getElementById('itemModalContent');
            contentDiv.innerHTML = `
                <img src="${img}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                <h2>${title}</h2>
                <h3 style="color: #C96445;">${price}</h3>
                <p style="line-height: 1.6;">${desc}</p>
                <div style="margin-top: 1rem; background: #f9f9f9; padding: 10px; border-radius: 8px;">
                    <p style="margin: 0;"><strong>Location:</strong> ${loc}</p>
                    <p style="margin: 0;"><strong>Posted:</strong> ${time}</p>
                </div>
            `;

            itemDetailsModal.classList.add('active');
        }

        else if (card.classList.contains('service-card')) {
            const title = card.querySelector('.card-title').textContent;
            const price = card.querySelector('.card-price').textContent;
            const desc = card.querySelector('.card-description').textContent;
            const tags = card.querySelector('.service-tags').innerHTML;
            const loc = card.querySelector('.card-location').textContent;

            const contentDiv = document.getElementById('serviceModalContent');
            contentDiv.innerHTML = `
                <h2>${title}</h2>
                <h3 style="color: #6B8E23;">${price}</h3>
                <div style="margin: 10px 0;">${tags}</div>
                <p style="line-height: 1.6;">${desc}</p>
                <div style="margin-top: 1rem; background: #f9f9f9; padding: 10px; border-radius: 8px;">
                     <p style="margin: 0;"><strong>Service Area:</strong> ${loc}</p>
                </div>
            `;

            serviceDetailsModal.classList.add('active');
        }
    }
});

const forms = document.querySelectorAll('form');
forms.forEach(form => {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ff0000';
            } else {
                input.style.borderColor = '#CCCCCC';
            }
        });
        
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.style.borderColor = '#6B8E23';
            }
        });
    });
});

let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(63, 47, 47, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(63, 47, 47, 0.1)';
    }
    
    lastScroll = currentScroll;
});

const addNewListing = document.getElementById('addNewListing');
if (addNewListing) {
    addNewListing.addEventListener('click', () => {
        window.location.href = 'marketplace.html';
    });
}

const messageItems = document.querySelectorAll('.message-item');
messageItems.forEach(item => {
    item.addEventListener('click', () => {
        messageItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        if (window.innerWidth <= 768) {
            const conversation = document.querySelector('.message-conversation');
            if (conversation) {
                conversation.style.display = 'flex';
            }
        }
    });
});

const itemImage = document.getElementById('itemImage');
if (itemImage) {
    itemImage.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('Image selected:', file.name);
            alert('Image uploaded: ' + file.name + ' (This is a demo)');
        }
    });
}

console.log('Localia - Interactive Prototype Loaded');
console.log('Features: Responsive Design, Tab Navigation, Modal System, Form Validation');
console.log('Color Palette: #6B8E23 (Primary Green), #C96445 (Accent Orange), #F1E4D4 (Light Beige), #3F2F2F (Dark Brown)');