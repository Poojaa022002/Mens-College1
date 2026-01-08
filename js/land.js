// Initialize functions
function initializeTicker() {
    console.log("Ticker initialized");
}

function initializeNoticeFilter() {
    console.log("Notice filter initialized");
    const filterItems = document.querySelectorAll('.notice-categories li');
    const noticeItems = document.querySelectorAll('.notice-item');

    filterItems.forEach(item => {
        item.addEventListener('click', function () {
            filterItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            noticeItems.forEach(notice => {
                if (category === 'all' || notice.getAttribute('data-category') === category) {
                    notice.style.display = 'flex';
                } else {
                    notice.style.display = 'none';
                }
            });
            const visibleCount = document.querySelectorAll('.notice-item[style="display: flex;"]').length;
            const noticeCount = document.querySelector('.notice-count');
            if (noticeCount) noticeCount.textContent = `Showing ${visibleCount} notices`;
        });
    });
}

// DOM Content Loaded - Combined everything here for reliability
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    // Initialize components
    initializeTicker();
    initializeNoticeFilter();

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');

    if (menuToggle && navbar) {
        console.log("Found menuToggle and navbar");

        menuToggle.onclick = function (e) {
            e.stopPropagation();
            console.log("Menu button clicked via onclick");
            navbar.classList.toggle('active');

            const isActive = navbar.classList.contains('active');
            console.log("Menu active state:", isActive);

            // Switch icons
            if (isActive) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                document.body.classList.add('menu-open');
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.classList.remove('menu-open');
            }
        };

        // Close menu when clicking links
        const navLinks = navbar.querySelectorAll('ul li a');
        navLinks.forEach(link => {
            link.onclick = function () {
                console.log("Nav link clicked - closing menu");
                navbar.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            };
        });

        // Close menu when clicking elsewhere
        document.addEventListener('click', function (e) {
            if (navbar.classList.contains('active') && !navbar.contains(e.target) && e.target !== menuToggle) {
                console.log("Clicked outside - closing menu");
                navbar.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    } else {
        console.error("Critical: Mobile menu elements NOT found!");
    }

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;

    // Function to show a specific slide
    function showSlide(index) {
        const prevSlide = currentSlide;

        // Hide all slides and handle exit class
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'exit');
            if (i === prevSlide && i !== index) {
                slide.classList.add('exit');
            }
        });

        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show the current slide and activate its dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Next slide
    nextBtn.addEventListener('click', function () {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    });

    // Previous slide
    prevBtn.addEventListener('click', function () {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    });

    // Dot click event
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            showSlide(index);
        });
    });

    // Auto slide every 5 seconds
    let slideInterval = setInterval(() => {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }, 5000);

    // Pause auto slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', function () {
        clearInterval(slideInterval);
    });

    heroSlider.addEventListener('mouseleave', function () {
        slideInterval = setInterval(() => {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }, 5000);
    });

    // Popup Modal
    const popupModal = document.getElementById('announcementPopup');
    const closeBtn = document.querySelector('.close-btn');
    const popupActionBtn = document.querySelector('.popup-action-btn');

    // Show popup after 2 seconds
    setTimeout(() => {
        popupModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }, 2000);

    // Close popup
    closeBtn.addEventListener('click', function () {
        popupModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close popup when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === popupModal) {
            popupModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Popup action button
    popupActionBtn.addEventListener('click', function () {
        alert('Redirecting to admission portal...');
        popupModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Scroll animations
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.animate-on-scroll');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };

    // Initial check on page load
    animateOnScroll();

    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Contact form submission
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;

        // Simple validation
        if (name && email) {
            // In a real application, you would send this data to a server
            alert(`Thank you ${name}! Your message has been received. We will contact you at ${email} soon.`);
            this.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header');

        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
            header.style.padding = '15px 0';
        }
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');

    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;

        if (email) {
            alert(`Thank you for subscribing with ${email}! You will receive our newsletter soon.`);
            this.reset();
        } else {
            alert('Please enter your email address.');
        }
    });

    // Event registration buttons
    document.querySelectorAll('.event-register').forEach(button => {
        button.addEventListener('click', function () {
            const eventTitle = this.closest('.event-item').querySelector('h3').textContent;
            alert(`You have registered for: ${eventTitle}\nFurther details will be sent to your email.`);
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
