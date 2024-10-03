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

    // Calendly modal
    const calendlyButtons = document.querySelectorAll('#hero-calendly-button, #cta-calendly-button');
    calendlyButtons.forEach(button => {
        button.addEventListener('click', () => {
            Calendly.initPopupWidget({url: 'https://calendly.com/your-calendly-link'});
            return false;
        });
    });

    // Get Started form submission
    const getStartedForm = document.getElementById('get-started-form');
    if (getStartedForm) {
        getStartedForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(getStartedForm);
            const data = Object.fromEntries(formData.entries());
            data.jobTitle = data['job-title'];
            delete data['job-title'];

            try {
                const response = await fetch('/get-started', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const result = await response.json();
                    alert(result.message);
                    getStartedForm.reset();
                } else {
                    alert('An error occurred. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }
});
