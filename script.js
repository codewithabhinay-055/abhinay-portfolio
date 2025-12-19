// Typewriter Effect
// Optimized Typewriter Effect - Minimizes Forced Reflows
(function() {
    // Cache DOM elements and text at the start
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return; // Exit if element not found
    
    const texts = ["I'M A TECHNICAL TRAINER", "EXPERT IN EXCEL & DATA ANALYSIS", "BEST TUTOR IN CHANDIGARH"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100; // Base speed

    // Function to type, using requestAnimationFrame for batching
    function type() {
        const currentText = texts[textIndex];
        
        // Calculate the text to display
        let displayText = isDeleting 
            ? currentText.substring(0, charIndex - 1)
            : currentText.substring(0, charIndex + 1);
        
        // Update the DOM ONCE per frame
        typewriterElement.textContent = displayText;
        
        // Determine next step and delay
        if (!isDeleting && displayText === currentText) {
            // Done typing, wait then start deleting
            typingDelay = 1500;
            isDeleting = true;
        } else if (isDeleting && displayText === '') {
            // Done deleting, move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingDelay = 500;
        } else {
            // Continue typing/deleting
            typingDelay = isDeleting ? 50 : 100;
            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        }
        
        // Schedule next step using setTimeout
        setTimeout(type, typingDelay);
    }

    // START the effect after a brief initial delay
    // This ensures initial styles are settled to prevent first reflow
    setTimeout(type, 500);
})();
// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements to animate
document.querySelectorAll('.skill-category, .project-card, .mentee-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Add hover effect to social icons
document.querySelectorAll('.social-icons-vertical i, .footer-social i').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
