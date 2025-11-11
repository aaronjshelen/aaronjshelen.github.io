// Smooth scrolling for navigation links
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

// Carousel functionality
function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const container = carousel.querySelector('.carousel-container');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dotsContainer = carousel.querySelector('.carousel-dots');

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(carousel, index));
            dotsContainer.appendChild(dot);
        });

        // Set initial position
        carousel.dataset.currentSlide = '0';
    });
}

function moveSlide(button, direction) {
    const carousel = button.closest('.carousel');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const currentSlide = parseInt(carousel.dataset.currentSlide);
    let newSlide = currentSlide + direction;

    // Loop around
    if (newSlide < 0) newSlide = slides.length - 1;
    if (newSlide >= slides.length) newSlide = 0;

    goToSlide(carousel, newSlide);
}

function goToSlide(carousel, slideIndex) {
    const container = carousel.querySelector('.carousel-container');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');

    // Update position
    container.style.transform = `translateX(-${slideIndex * 100}%)`;

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });

    // Update current slide
    carousel.dataset.currentSlide = slideIndex.toString();
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCarousels);
