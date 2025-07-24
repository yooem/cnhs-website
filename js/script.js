document.addEventListener('DOMContentLoaded', function () {
    // 1. Sticky Header Logic
    const header = document.querySelector('.main-header');
    const nav = document.querySelector('.main-nav');
    // Get the height of the main navigation for sticky calculation
    // This value might need to be adjusted if the header structure changes significantly
    const navHeight = nav.offsetHeight;

    // Add a class to the header when scrolled past a certain point
    window.addEventListener('scroll', function () {
        if (window.scrollY > navHeight) { // Or a fixed value like 100px
            header.classList.add('sticky');
            document.body.style.paddingTop = header.offsetHeight + 'px'; // Prevent jump
        } else {
            header.classList.remove('sticky');
            document.body.style.paddingTop = '0';
        }
    });

    // 2. Hamburger Menu Toggle (for mobile responsiveness)
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active'); // Toggles a class that shows/hides the nav
            // Optional: Toggle icon (bars <-> times)
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when a link is clicked (optional)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                // Check if it's a dropdown toggle, if not, close menu
                if (!this.closest('.dropdown')) { // Only close if it's not a dropdown parent
                    navLinks.classList.remove('active');
                    hamburger.querySelector('i').classList.remove('fa-times');
                    hamburger.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }


    // 3. Testimonial Carousel (Basic Implementation)
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');

    if (testimonialCarousel && prevBtn && nextBtn) {
        let currentIndex = 0;
        const testimonials = testimonialCarousel.querySelectorAll('.testimonial-item');
        const totalTestimonials = testimonials.length;

        // Function to show a specific testimonial
        function showTestimonial(index) {
            if (index >= totalTestimonials) {
                currentIndex = 0; // Loop back to start
            } else if (index < 0) {
                currentIndex = totalTestimonials - 1; // Loop to end
            } else {
                currentIndex = index;
            }

            const offset = -currentIndex * 100; // Assuming each item takes 100% width
            testimonialCarousel.style.transform = `translateX(${offset}%)`;

            // For a smoother scroll, you might use:
            // testimonials[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            // This requires flex: 0 0 auto on testimonial-item and removing fixed width
        }

        // Event listeners for navigation buttons
        nextBtn.addEventListener('click', () => {
            showTestimonial(currentIndex + 1);
        });

        prevBtn.addEventListener('click', () => {
            showTestimonial(currentIndex - 1);
        });

        // Optional: Auto-play carousel
        let autoPlayInterval;
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                showTestimonial(currentIndex + 1);
            }, 5000); // Change slide every 5 seconds
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // Start autoplay on load
        startAutoPlay();

        // Pause autoplay on hover
        testimonialCarousel.addEventListener('mouseover', stopAutoPlay);
        testimonialCarousel.addEventListener('mouseleave', startAutoPlay);
        prevBtn.addEventListener('mouseover', stopAutoPlay);
        nextBtn.addEventListener('mouseover', stopAutoPlay);
        prevBtn.addEventListener('mouseleave', startAutoPlay);
        nextBtn.addEventListener('mouseleave', startAutoPlay);
    }

    // 4. Update Current Year in Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});