document.addEventListener("DOMContentLoaded", initialization);

function initialization() {
    const containers = document.querySelectorAll(".container");
    containers.forEach(container => {
        const slides = container.querySelectorAll(".js-image-container img");
        let slideIndex = 0;
        slides[slideIndex].classList.add("DisplayImage");

        const previousButton = container.querySelector(".left-button");
        const nextButton = container.querySelector(".right-button");

        previousButton.addEventListener("click", () => {
            slideIndex = previousSlide(slides, slideIndex);
        });

        nextButton.addEventListener("click", () => {
            slideIndex = nextSlide(slides, slideIndex);
        });
    });
}

function showSlide(slides, index) {
    slides.forEach(slide => {
        slide.classList.remove("DisplayImage");
    });

    slides[index].classList.add("DisplayImage");
}

function previousSlide(slides, index) {
    index--;
    if (index < 0) {
        index = slides.length - 1;
    }
    showSlide(slides, index);
    return index;
}

function nextSlide(slides, index) {
    index++;
    if (index >= slides.length) {
        index = 0;
    }
    showSlide(slides, index);
    return index;
}
