// Renaissance Website Interactive JavaScript

// ==========================================
// 1. IMAGE GALLERY LIGHTBOX (Museum Page)
// ==========================================
// DOM Queries for artwork items
const artworkItems = document.querySelectorAll('.artwork-item');
const body = document.body;

// Create lightbox overlay element
const createLightbox = () => {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-img" src="" alt="">
            <div class="lightbox-info">
                <h3 class="lightbox-title"></h3>
                <p class="lightbox-artist"></p>
                <p class="lightbox-details"></p>
            </div>
        </div>
    `;
    body.appendChild(lightbox);
    return lightbox;
};

// Initialize lightbox if artwork items exist (Museum page)
if (artworkItems.length > 0) {
    const lightbox = createLightbox();
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxArtist = lightbox.querySelector('.lightbox-artist');
    const lightboxDetails = lightbox.querySelector('.lightbox-details');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Function to open lightbox - responds to click event
    const openLightbox = (artwork) => {
        const img = artwork.querySelector('.artwork-frame img');
        const title = artwork.querySelector('h4').textContent;
        const artist = artwork.querySelector('.artwork-artist').textContent;
        const details = artwork.querySelector('.artwork-details').textContent;

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxTitle.textContent = title;
        lightboxArtist.textContent = artist;
        lightboxDetails.textContent = details;

        // Update CSS properties - show lightbox
        lightbox.style.display = 'flex';
        body.style.overflow = 'hidden'; // Prevent scrolling
    };

    // Function to close lightbox
    const closeLightbox = () => {
        // Update CSS properties - hide lightbox
        lightbox.style.display = 'none';
        body.style.overflow = 'auto'; // Restore scrolling
    };

    // Add click event listeners to all artwork items
    artworkItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => openLightbox(item));
    });

    // Close lightbox events
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
}

// ==========================================
// 2. SMOOTH SCROLL TO TOP BUTTON
// ==========================================
// Create scroll-to-top button
const createScrollButton = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    body.appendChild(scrollBtn);
    return scrollBtn;
};

const scrollBtn = createScrollButton();

// Function to toggle button visibility - responds to scroll event
const toggleScrollButton = () => {
    if (window.pageYOffset > 300) {
        // Update CSS properties - show button
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
    } else {
        // Update CSS properties - hide button
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
    }
};

// Function to scroll to top - responds to click event
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Event listeners for scroll button
window.addEventListener('scroll', toggleScrollButton);
scrollBtn.addEventListener('click', scrollToTop);

// ==========================================
// 3. ARTIST CARD FILTER (Artists Page)
// ==========================================
// DOM Query for artist profiles
const artistProfiles = document.querySelectorAll('.artist-profile');
const artistsGrid = document.querySelector('.artists-grid');

// Create filter buttons if on Artists page
if (artistsGrid && artistProfiles.length > 0) {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.innerHTML = `
        <h3>Filter by Specialty</h3>
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All Masters</button>
            <button class="filter-btn" data-filter="painter">Painters</button>
            <button class="filter-btn" data-filter="sculptor">Sculptors</button>
            <button class="filter-btn" data-filter="architect">Architects</button>
        </div>
    `;
    
    artistsGrid.parentElement.insertBefore(filterContainer, artistsGrid);
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Function to filter artists - responds to click event
    const filterArtists = (specialty) => {
        artistProfiles.forEach(profile => {
            const role = profile.querySelector('.artist-role').textContent.toLowerCase();
            
            if (specialty === 'all' || role.includes(specialty)) {
                // Update CSS properties and content - show profile
                profile.style.display = 'block';
                profile.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                // Update CSS properties - hide profile
                profile.style.display = 'none';
            }
        });
    };
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update CSS - remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Update CSS - add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterArtists(filter);
        });
    });
}

// ==========================================
// 4. CENTURY CARD REVEAL ON SCROLL (Home Page)
// ==========================================
// DOM Query for century cards
const cards = document.querySelectorAll('.card');

// Function to reveal cards on scroll - responds to scroll event
const revealOnScroll = () => {
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            // Update CSS properties - add visible class
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// Initialize cards as hidden
if (cards.length > 0) {
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Event listener for scroll
    window.addEventListener('scroll', revealOnScroll);
    // Initial check on page load
    revealOnScroll();
}

// ==========================================
// 5. FORM VALIDATION ENHANCEMENT (Museum Page)
// ==========================================
// DOM Query for contact form
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Function to validate input - responds to blur event
    const validateInput = (input) => {
        if (input.hasAttribute('required') && input.value.trim() === '') {
            // Update CSS properties - show error state
            input.style.borderColor = '#c0392b';
            input.style.background = 'rgba(192, 57, 43, 0.05)';
        } else {
            // Update CSS properties - show valid state
            input.style.borderColor = 'var(--accent-gold)';
            input.style.background = 'var(--bg-white)';
        }
    };
    
    // Function to reset input styling - responds to focus event
    const resetInputStyle = (input) => {
        // Update CSS properties
        input.style.borderColor = 'var(--border-light)';
        input.style.background = 'var(--bg-cream)';
    };
    
    // Add event listeners to form inputs
    formInputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('focus', () => resetInputStyle(input));
    });
    
    // Function to handle form submission - responds to submit event
    contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        
        formInputs.forEach(input => {
            if (input.hasAttribute('required') && input.value.trim() === '') {
                validateInput(input);
                isValid = false;
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            // Update page content - show error message
            let errorMsg = contactForm.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('p');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Please fill in all required fields.';
                errorMsg.style.color = '#c0392b';
                errorMsg.style.textAlign = 'center';
                errorMsg.style.marginTop = '20px';
                errorMsg.style.fontWeight = '500';
                contactForm.appendChild(errorMsg);
            }
        }
    });
}

// ==========================================
// 6. NAVIGATION HIGHLIGHT ON SCROLL
// ==========================================
// DOM Query for navigation links
const navLinks = document.querySelectorAll('nav a');

// Function to update active nav link based on scroll position
const updateActiveNav = () => {
    const sections = document.querySelectorAll('main section');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('class');
        }
    });
    
    // Update CSS properties for nav links
    navLinks.forEach(link => {
        link.style.transform = 'scale(1)';
        if (link.classList.contains('active')) {
            link.style.transform = 'scale(1.05)';
        }
    });
};

window.addEventListener('scroll', updateActiveNav);

console.log('Renaissance website JavaScript loaded successfully!');
