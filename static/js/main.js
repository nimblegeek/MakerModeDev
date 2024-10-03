document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission
    const form = document.getElementById('signup-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        alert(`Thank you for signing up with email: ${email}`);
        form.reset();
    });

    // Add animation to feature icons
    const featureIcons = document.querySelectorAll('#features img');
    featureIcons.forEach(icon => {
        icon.classList.add('feature-icon');
    });

    // Calendly modal
    const calendlyButton = document.getElementById('calendly-button');
    if (calendlyButton) {
        calendlyButton.addEventListener('click', () => {
            Calendly.initPopupWidget({url: 'https://calendly.com/your-calendly-link'});
            return false;
        });
    } else {
        console.error('Calendly button not found');
    }
});
