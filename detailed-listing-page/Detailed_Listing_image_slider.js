export function initializeImageSlider() {
    const slides = document.querySelectorAll(".js-detailed-image-container img");
    let slideIndex = 0;
    let interval = null;

    if (slides.length > 0) {
        slides[slideIndex].classList.add("DisplayImage");

        // Start the interval for automatic slide change
        interval = setInterval(() => {
            nextSlide();
        }, 1300);

        const leftButton = document.querySelector(".left-button");
        leftButton.addEventListener('click', () => {
            clearInterval(interval);
            slideIndex--;
            showSlide(slideIndex);
        });

        const rightButton = document.querySelector(".right-button");
        rightButton.addEventListener('click', () => {
            clearInterval(interval);
            slideIndex++;
            showSlide(slideIndex);
        });
    }

    function showSlide(index) {
        if (index >= slides.length) {
            slideIndex = 0;
        } else if (index < 0) {
            slideIndex = slides.length - 1;
        }

        slides.forEach(slide => {
            slide.classList.remove("DisplayImage");
        });

        slides[slideIndex].classList.add("DisplayImage");
    }

    function nextSlide() {
        slideIndex++;
        showSlide(slideIndex);
    }
}