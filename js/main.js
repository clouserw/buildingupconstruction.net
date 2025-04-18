// Lightbox functionality with forward/backward navigation
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {  // Only initialize lightbox if it exists on the page
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));
        const leftArrow = lightbox.querySelector('.lightbox-arrow-left');
        const rightArrow = lightbox.querySelector('.lightbox-arrow-right');
        let currentIndex = -1;

        const showImage = (index) => {
            if (index >= 0 && index < galleryItems.length) {
                const item = galleryItems[index];
                lightboxImage.src = item.dataset.full || item.src;
                lightboxImage.alt = item.alt;
                currentIndex = index;
                lightbox.style.display = 'flex';
            }
        };

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                showImage(index);
            });
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImage && !e.target.classList.contains('lightbox-arrow')) {
                lightbox.style.display = 'none';
            }
        });

        // Arrow button functionality
        leftArrow.addEventListener('click', () => {
            showImage((currentIndex - 1 + galleryItems.length) % galleryItems.length);
        });

        rightArrow.addEventListener('click', () => {
            showImage((currentIndex + 1) % galleryItems.length);
        });

        // Add keyboard support for navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'Escape') {
                    lightbox.style.display = 'none';
                } else if (e.key === 'ArrowRight') {
                    showImage((currentIndex + 1) % galleryItems.length); // Next image
                } else if (e.key === 'ArrowLeft') {
                    showImage((currentIndex - 1 + galleryItems.length) % galleryItems.length); // Previous image
                }
            }
        });

        // Add swipe support for touch devices
        let startX = 0;
        lightbox.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        lightbox.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            if (endX - startX > 50) {
                // Swipe right (previous image)
                showImage((currentIndex - 1 + galleryItems.length) % galleryItems.length);
            } else if (startX - endX > 50) {
                // Swipe left (next image)
                showImage((currentIndex + 1) % galleryItems.length);
            }
        });
    }
});
