// Sheikh Maruf Hasan - Portfolio Website JavaScript
// This file contains interactive functionality for the portfolio website

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    // This function handles the mobile menu show/hide functionality
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            // Toggle the 'active' class on the navigation links
            navLinks.classList.toggle('active');
            
            // Change the menu icon based on menu state
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    // This function enables smooth scrolling when clicking navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target element id from the href attribute
            const targetId = this.getAttribute('href');
            
            // If the link is just "#", do nothing
            if (targetId === '#') return;
            
            // Find the target element
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate the position to scroll to (accounting for fixed navbar)
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                // Smooth scroll to the target position
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = menuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // ===== CONTACT FORM HANDLING =====
    // This function handles form submission with validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            let isValid = true;
            
            // Check if name is empty
            if (name === '') {
                showError('name', 'Name is required');
                isValid = false;
            } else {
                removeError('name');
            }
            
            // Check if email is valid
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError('email');
            }
            
            // Check if message is empty
            if (message === '') {
                showError('message', 'Message is required');
                isValid = false;
            } else {
                removeError('message');
            }
            
            // If form is valid, simulate submission
            if (isValid) {
                // In a real application, you would send the data to a server here
                // For this example, we'll just show a success message
                alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon at ${email}.`);
                
                // Reset the form
                contactForm.reset();
            }
        });
    }
    
    // Helper function to show error messages
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.parentElement;
        
        // Check if error already exists
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        // Set error message and style
        errorElement.textContent = message;
        errorElement.style.color = '#ff5252';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '5px';
        
        // Highlight the field with error
        field.style.borderColor = '#ff5252';
    }
    
    // Helper function to remove error messages
    function removeError(fieldId) {
        const field = document.getElementById(fieldId);
        const formGroup = field.parentElement;
        
        // Remove error message if it exists
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        // Reset field border color
        field.style.borderColor = '';
    }
    
    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    // This function highlights the current section in the navigation
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        // Get current scroll position
        const scrollPosition = window.scrollY + 100;
        
        // Loop through sections to find the current one
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if the current scroll position is within this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Call the function on scroll
    window.addEventListener('scroll', highlightActiveNavLink);
    
    // ===== ANIMATE ELEMENTS ON SCROLL =====
    // This function adds animation to elements when they come into view
    function animateOnScroll() {
        const elements = document.querySelectorAll('.channel-card, .skill-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            // If element is in view, add the animation class
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.channel-card, .skill-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Call the function on scroll and on initial load
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial call
    
    // ===== BACK TO TOP BUTTON VISIBILITY =====
    // This function shows/hides the back-to-top button based on scroll position
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            // Show button when user scrolls down 500px
            if (window.scrollY > 500) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
        
        // Initial state
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
        backToTopBtn.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    }
    
    // ===== ADDITIONAL TOUCH-UPS =====
    // Add a subtle hover effect to all cards
    const cards = document.querySelectorAll('.channel-card, .skill-card');
    cards.forEach(card => {
        // This enhances the hover effect that's already in the CSS
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Console welcome message (for fun)
    console.log('Welcome to Sheikh Maruf Hasan\'s Portfolio!');
    console.log('Hope you enjoy exploring my work as a YouTube content creator.');
});