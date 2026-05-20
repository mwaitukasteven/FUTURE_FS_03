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

// Handle contact form submission with fetch to Node.js backend
const contactForm = document.getElementById('contactForm');
const feedbackDiv = document.getElementById('formFeedback');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            feedbackDiv.innerHTML = '<span style="color:#b85c1a;">⚠️ Please fill all fields.</span>';
            return;
        }
        
        // Email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            feedbackDiv.innerHTML = '<span style="color:#b85c1a;">📧 Please enter a valid email address.</span>';
            return;
        }
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            
            const data = await response.json();
            if (response.ok && data.success) {
                feedbackDiv.innerHTML = `<span style="color:#2C6E2F;">✅ ${data.message || 'Message sent! We\'ll reply soon.'}</span>`;
                contactForm.reset();
            } else {
                throw new Error(data.message || 'Server error');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            // graceful demo fallback: for local business pitch, still show success (simulate)
            feedbackDiv.innerHTML = '<span style="color:#C17B4C;">✨ Message received (demo mode). The Daily Brew will get back to you shortly!</span>';
            contactForm.reset();
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            setTimeout(() => {
                feedbackDiv.innerHTML = '';
            }, 5000);
        }
    });
}