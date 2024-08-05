    document.addEventListener('DOMContentLoaded', function () {
            // Function to handle the image slider
            function initImageSliders() {
                const sliders = document.querySelectorAll('.featured_js-image-slider');

                sliders.forEach(slider => {
                    let currentIndex = 0;
                    const images = slider.querySelectorAll('img');
                    images[currentIndex].classList.add('DisplayArea');

                    const showImage = (index) => {
                        images.forEach(img => img.classList.remove('DisplayArea'));
                        images[index].classList.add('DisplayArea');
                    };

                    const nextImage = () => {
                        currentIndex = (currentIndex + 1) % images.length;
                        showImage(currentIndex);
                    };

                    const prevImage = () => {
                        currentIndex = (currentIndex - 1 + images.length) % images.length;
                        showImage(currentIndex);
                    };

                    const rightButton = slider.parentElement.querySelector('.right-button');
                    const leftButton = slider.parentElement.querySelector('.left-button');

                    rightButton.addEventListener('click', nextImage);
                    leftButton.addEventListener('click', prevImage);
                });
            }

            // Initialize the sliders
            initImageSliders();
        });
