// Custom Cursor
const cursorDot = document.querySelector(".custom-cursor-dot");
const cursorOutline = document.querySelector(".custom-cursor-outline");

if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Animate the outline to follow smoothly
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Show cursor when mouse enters the window
    document.addEventListener("mouseenter", () => {
        cursorDot.style.opacity = 1;
        cursorOutline.style.opacity = 1;
    });

    // Hide cursor when mouse leaves the window
    document.addEventListener("mouseleave", () => {
        cursorDot.style.opacity = 0;
        cursorOutline.style.opacity = 0;
    });

    // Handle hover states for interactive elements
    document.querySelectorAll('a, button, .btn, .skill-tag, .feature-card, .cta-card, .contact-info-card, .social-links a, .project-link, .timeline-content').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-grow');
            cursorDot.classList.add('cursor-dot-grow');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-grow');
            cursorDot.classList.remove('cursor-dot-grow');
        });
    });
}


// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        mobileMenuBtn.classList.toggle('open');
        document.body.classList.toggle('no-scroll'); // Optional: to prevent scrolling when menu is open
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                mobileMenuBtn.classList.remove('open');
                document.body.classList.remove('no-scroll');
            }
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Fade-in-up animation on scroll
const faders = document.querySelectorAll('.fade-in-up');

const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('animated');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});


// Form Validation (Contact Page Specific)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual form submission

        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Reset errors
        document.querySelectorAll('.form-error').forEach(error => error.classList.remove('active'));
        document.querySelectorAll('.form-input, .form-textarea').forEach(input => input.classList.remove('error'));

        // Validate Name
        if (nameInput.value.trim() === '') {
            isValid = false;
            nameInput.classList.add('error');
            nameInput.nextElementSibling.classList.add('active'); // Show error message
        }

        // Validate Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            isValid = false;
            emailInput.classList.add('error');
            emailInput.nextElementSibling.classList.add('active');
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            isValid = false;
            messageInput.classList.add('error');
            messageInput.nextElementSibling.classList.add('active');
        }

        if (isValid) {
            // Simulate form submission
            console.log('Form Submitted Successfully!', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });

            // Show success message
            document.getElementById('contactFormContainer').style.display = 'none';
            document.getElementById('successMessageContainer').style.display = 'block';
        }
    });
}


// Download Resume Button (Resume Page Specific)
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // We cannot use alert() as it's forbidden
        console.log('Download button clicked. In a real app, this would trigger a PDF download.');
        // Example: window.open('path/to/your/resume.pdf', '_blank');
        
        // Show a temporary message
        const originalText = downloadBtn.querySelector('span').textContent;
        downloadBtn.querySelector('span').textContent = 'Starting...';
        downloadBtn.disabled = true;

        setTimeout(() => {
            downloadBtn.querySelector('span').textContent = originalText;
            downloadBtn.disabled = false;
        }, 2000);
    });
}

