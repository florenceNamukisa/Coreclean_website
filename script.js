document.addEventListener('DOMContentLoaded', function() {
   
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
 
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });
    
    
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide);
    }, 5000);
    
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    const modals = {
        quote: document.getElementById('quoteModal'),
        booking: document.getElementById('bookingModal'),
        contact: document.getElementById('contactModal')
    };
    
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    document.querySelectorAll('[data-modal]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            if (modals[modalId]) {
                modals[modalId].classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    

    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        }
    });
    
   
    const quoteForm = document.getElementById('quoteForm');
    const bookingForm = document.getElementById('bookingForm');
    const contactForm = document.getElementById('contactForm');
    const modalContactForm = document.getElementById('modalContactForm');
    
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your quote request! We will contact you shortly with your free estimate.');
        this.reset();
        modals.quote.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your booking! We will confirm your appointment shortly.');
        this.reset();
        modals.booking.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
    
    modalContactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for contacting us! Our team will respond as soon as possible.');
        this.reset();
        modals.contact.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
   
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
  
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .value-card, .testimonial-card, .team-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
  
    document.querySelectorAll('.service-card, .value-card, .testimonial-card, .team-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);


    const track = document.querySelector('.testimonials-track');
    const pairs = document.querySelectorAll('.testimonial-pair');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const carouselIndicators = document.querySelectorAll('.carousel-indicators span');
    let currentIndex = 0;
    let autoSlideInterval;
    const slideDuration = 6000; 

    function updateCarousel() {
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
      
        carouselIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
       
        pairs.forEach((pair, index) => {
            pair.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % pairs.length;
        updateCarousel();
        resetAutoSlide();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + pairs.length) % pairs.length;
        updateCarousel();
        resetAutoSlide();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    carouselIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });


    updateCarousel();
    startAutoSlide();


    const carousel = document.querySelector('.testimonials-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    window.addEventListener('resize', function() {
        updateCarousel();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    
    function validateName(name) {
        const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
        return name.trim() !== '' && nameRegex.test(name.trim());
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email.trim() !== '' && emailRegex.test(email.trim());
    }

    function validatePhone(phone) {
    
        const phoneRegex = /^\+?[\d\s-]{7,20}$/;
        return phone.trim() !== '' && phoneRegex.test(phone.trim());
    }

    function validateDate(date) {
        if (!date) return false;
        
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
    }

    function validateMessage(message) {
        return message.trim() !== '' && message.trim().length >= 10 && message.trim().length <= 500;
    }

    function validateSelect(select) {
        return select.value !== '';
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let error = formGroup.querySelector('.error-message');
        
        if (!error) {
            error = document.createElement('div');
            error.className = 'error-message';
            formGroup.appendChild(error);
        }
        
        error.textContent = message;
        input.classList.add('error');
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message');
        
        if (error) {
            error.remove();
        }
        
        input.classList.remove('error');
    }

    function setupFormValidation(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
        
            if (input.type === 'submit') return;
            
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }

    function validateInput(input) {
        const value = input.value.trim();
        
        if (value === '') {
            showError(input, 'This field is required');
            return false;
        }
        
        if (input.type === 'text' && (input.id.includes('Name') || input.id.includes('name'))) {
            if (!validateName(value)) {
                showError(input, 'Please enter a valid name (2-50 characters)');
                return false;
            }
        }
        
        if (input.type === 'email') {
            if (!validateEmail(value)) {
                showError(input, 'Please enter a valid email address');
                return false;
            }
        }
        
        if (input.type === 'tel') {
            if (!validatePhone(value)) {
                showError(input, 'Please enter a valid phone number');
                return false;
            }
        }
        
        if (input.type === 'date') {
            if (!validateDate(value)) {
                showError(input, 'Please select a future date');
                return false;
            }
        }
        
        if (input.tagName === 'SELECT') {
            if (!validateSelect(input)) {
                showError(input, 'Please select an option');
                return false;
            }
        }
        
        if (input.type === 'textarea') {
            if (!validateMessage(value)) {
                showError(input, 'Message must be between 10-500 characters');
                return false;
            }
        }
        
        return true;
    }

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            if (input.type === 'submit') return;
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    // Initialize form validation for all forms
    const forms = [
        document.getElementById('quoteForm'),
        document.getElementById('bookingForm'),
        document.getElementById('contactForm'),
        document.getElementById('modalContactForm')
    ];
    
    forms.forEach(form => {
        if (form) {
            setupFormValidation(form);
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm(this)) {

                    const formId = this.id;
                    let successMessage = '';
                    
                    switch(formId) {
                        case 'quoteForm':
                            successMessage = 'Thank you for your quote request! We will contact you shortly with your free estimate.';
                            modals.quote.classList.remove('active');
                            break;
                        case 'bookingForm':
                            successMessage = 'Thank you for your booking! We will confirm your appointment shortly.';
                            modals.booking.classList.remove('active');
                            break;
                        case 'contactForm':
                            successMessage = 'Thank you for your message! We will get back to you soon.';
                            break;
                        case 'modalContactForm':
                            successMessage = 'Thank you for contacting us! Our team will respond as soon as possible.';
                            modals.contact.classList.remove('active');
                            break;
                        default:
                            successMessage = 'Thank you for your submission!';
                    }
                    
                    alert(successMessage);
                    this.reset();
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    const style = document.createElement('style');
    style.textContent = `
        .error-message {
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 5px;
        }
        
        .error {
            border-color: #e74c3c !important;
        }
        
        .error:focus {
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2) !important;
        }
    `;
    document.head.appendChild(style);
});