/**
 * HiTechSkyEnergy - Main JavaScript File
 * Handles interactive features and form submissions
 */

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-custom');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Form Validation Functions
function validateName(name) {
    // Name should only contain letters, spaces, hyphens, and apostrophes
    // Should not contain numbers
    const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
    if (!name || name.trim().length < 2) {
        return { valid: false, message: 'Name must be at least 2 characters long.' };
    }
    if (!nameRegex.test(name)) {
        return { valid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes.' };
    }
    if (/\d/.test(name)) {
        return { valid: false, message: 'Name cannot contain numbers.' };
    }
    return { valid: true };
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim().length === 0) {
        return { valid: false, message: 'Email is required.' };
    }
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Please enter a valid email address.' };
    }
    return { valid: true };
}

function validatePhone(phone) {
    if (!phone || phone.trim().length === 0) {
        return { valid: true }; // Phone is optional
    }
    // Allow digits, spaces, hyphens, parentheses, and + for international formats
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
        return { valid: false, message: 'Please enter a valid phone number.' };
    }
    // Remove non-digits for length check
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
        return { valid: false, message: 'Phone number must contain at least 10 digits.' };
    }
    return { valid: true };
}

function validateSubject(subject) {
    if (!subject || subject.trim().length === 0) {
        return { valid: true }; // Subject is optional
    }
    if (subject.trim().length < 3) {
        return { valid: false, message: 'Subject must be at least 3 characters long.' };
    }
    return { valid: true };
}

function validateMessage(message) {
    if (!message || message.trim().length === 0) {
        return { valid: false, message: 'Message is required.' };
    }
    if (message.trim().length < 10) {
        return { valid: false, message: 'Message must be at least 10 characters long.' };
    }
    return { valid: true };
}

// Show field error
function showFieldError(input, message) {
    const formGroup = input.closest('.form-group-enhanced');
    if (!formGroup) return;
    
    // Remove existing error
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Remove invalid class
    input.classList.remove('is-invalid');
    
    // Add error message
    if (message) {
        input.classList.add('is-invalid');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }
}

// Contact Form Handling with Enhanced Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Real-time validation on blur
        if (nameInput) {
            nameInput.addEventListener('blur', function() {
                const validation = validateName(this.value);
                showFieldError(this, validation.valid ? null : validation.message);
            });
            
            nameInput.addEventListener('input', function() {
                // Remove error on input
                if (this.classList.contains('is-invalid')) {
                    const validation = validateName(this.value);
                    if (validation.valid) {
                        showFieldError(this, null);
                    }
                }
            });
        }
        
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const validation = validateEmail(this.value);
                showFieldError(this, validation.valid ? null : validation.message);
            });
            
            emailInput.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    const validation = validateEmail(this.value);
                    if (validation.valid) {
                        showFieldError(this, null);
                    }
                }
            });
        }
        
        if (phoneInput) {
            phoneInput.addEventListener('blur', function() {
                const validation = validatePhone(this.value);
                showFieldError(this, validation.valid ? null : validation.message);
            });
            
            phoneInput.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    const validation = validatePhone(this.value);
                    if (validation.valid) {
                        showFieldError(this, null);
                    }
                }
            });
        }
        
        if (subjectInput) {
            subjectInput.addEventListener('blur', function() {
                const validation = validateSubject(this.value);
                showFieldError(this, validation.valid ? null : validation.message);
            });
        }
        
        if (messageInput) {
            messageInput.addEventListener('blur', function() {
                const validation = validateMessage(this.value);
                showFieldError(this, validation.valid ? null : validation.message);
            });
            
            messageInput.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    const validation = validateMessage(this.value);
                    if (validation.valid) {
                        showFieldError(this, null);
                    }
                }
            });
        }
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim()
            };
            
            // Validate all fields
            let isValid = true;
            let firstError = null;
            
            const nameValidation = validateName(formData.name);
            if (!nameValidation.valid) {
                showFieldError(nameInput, nameValidation.message);
                isValid = false;
                if (!firstError) firstError = nameInput;
            } else {
                showFieldError(nameInput, null);
            }
            
            const emailValidation = validateEmail(formData.email);
            if (!emailValidation.valid) {
                showFieldError(emailInput, emailValidation.message);
                isValid = false;
                if (!firstError) firstError = emailInput;
            } else {
                showFieldError(emailInput, null);
            }
            
            const phoneValidation = validatePhone(formData.phone);
            if (!phoneValidation.valid) {
                showFieldError(phoneInput, phoneValidation.message);
                isValid = false;
                if (!firstError) firstError = phoneInput;
            } else {
                showFieldError(phoneInput, null);
            }
            
            const subjectValidation = validateSubject(formData.subject);
            if (!subjectValidation.valid) {
                showFieldError(subjectInput, subjectValidation.message);
                isValid = false;
                if (!firstError) firstError = subjectInput;
            } else {
                showFieldError(subjectInput, null);
            }
            
            const messageValidation = validateMessage(formData.message);
            if (!messageValidation.valid) {
                showFieldError(messageInput, messageValidation.message);
                isValid = false;
                if (!firstError) firstError = messageInput;
            } else {
                showFieldError(messageInput, null);
            }
            
            if (!isValid) {
                // Scroll to first error
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
                showFormMessage('Please correct the errors in the form.', 'error');
                return;
            }
            
            // Check consent checkbox
            const consentCheckbox = document.getElementById('consent');
            if (!consentCheckbox || !consentCheckbox.checked) {
                showFormMessage('Please agree to the Privacy Policy to continue.', 'error');
                return;
            }
            
            // All validation passed - submit form
            showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
            
            // Remove all error states
            contactForm.querySelectorAll('.is-invalid').forEach(el => {
                el.classList.remove('is-invalid');
            });
            contactForm.querySelectorAll('.field-error').forEach(el => {
                el.remove();
            });
            
            // In a real application, you would send the data to a server:
            // fetch('contact.php', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            //     contactForm.reset();
            // })
            // .catch(error => {
            //     showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
            // });
        });
    }
});

// Show form message
function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = 'form-message ' + type;
        messageDiv.style.display = 'block';
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Remove message after 5 seconds
        setTimeout(function() {
            messageDiv.textContent = '';
            messageDiv.className = 'form-message';
            messageDiv.style.display = '';
        }, 5000);
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.card-custom, .stat-item, .mission-vision-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Initialize tooltips if Bootstrap is loaded
if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Mobile menu close on link click
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: true
            });
        }
    });
});

// Set active nav link based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Animate stats counter
    animateStats();
});

// Animate statistics counter
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number-enhanced');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}


// Initialize carousel properly
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('heroCarousel');
    if (carousel) {
        // Ensure all carousel items have background images loaded
        const carouselItems = carousel.querySelectorAll('.carousel-item');
        carouselItems.forEach((item, index) => {
            const bgImage = item.style.backgroundImage;
            if (bgImage) {
                // Preload images
                const img = new Image();
                img.src = bgImage.replace('url(', '').replace(')', '').replace(/['"]/g, '');
            }
        });
        
        // Initialize Bootstrap carousel if not already initialized
        if (typeof bootstrap !== 'undefined') {
            const bsCarousel = new bootstrap.Carousel(carousel, {
                interval: 5000,
                ride: 'carousel',
                wrap: true
            });
        }
    }
});

console.log('HiTechSkyEnergy website loaded successfully!');

