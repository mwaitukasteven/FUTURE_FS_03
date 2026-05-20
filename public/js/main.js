// Mobile navigation toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu after click
            if (window.innerWidth <= 768 && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
        }
    });
});

// Form submission feedback (FormSubmit.co handles actual sending)
const contactForm = document.getElementById('contactForm');
const feedbackDiv = document.getElementById('formFeedback');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }
        
        if (feedbackDiv) {
            feedbackDiv.innerHTML = '<span style="color:#C17B4C;">⏳ Sending your message...</span>';
        }
        
        // FormSubmit will handle the actual submission
        // This just gives visual feedback
        setTimeout(() => {
            // Note: The actual redirect will happen via FormSubmit
            // This message will show briefly before redirect
            if (feedbackDiv && submitBtn) {
                feedbackDiv.innerHTML = '<span style="color:#2C6E2F;">✅ Message sent! You will be redirected...</span>';
            }
        }, 500);
        
        // Don't prevent default - let FormSubmit handle the POST
        // The form will redirect to FormSubmit's success page
    });
}

// Optional: Add year to footer automatically
const footerYear = document.querySelector('footer p');
if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2025', year);
}

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});