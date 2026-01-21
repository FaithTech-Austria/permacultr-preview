// Gallery Configuration
const images = [
    { src: 'images/1.png', caption: 'Screenshot 1' },
    { src: 'images/2.png', caption: 'Screenshot 2' },
    { src: 'images/3.png', caption: 'Screenshot 3' },
    { src: 'images/4.png', caption: 'Screenshot 4' },
    { src: 'images/5.png', caption: 'Screenshot 5' },
    { src: 'images/6.png', caption: 'Screenshot 6' },
    { src: 'images/7.png', caption: 'Screenshot 7' },
    { src: 'images/8.png', caption: 'Screenshot 8' },
    { src: 'images/9.png', caption: 'Screenshot 9' },
    { src: 'images/10.png', caption: 'Screenshot 10' },
];

let currentIndex = 0;

// DOM Elements
const galleryImage = document.getElementById('gallery-image');
const progressEl = document.getElementById('progress');

// Initialize gallery
function initGallery() {
    if (images.length === 0) {
        return;
    }
    showImage(0);
}

// Show specific image
function showImage(index) {
    if (images.length === 0) return;

    currentIndex = index;
    const image = images[index];

    galleryImage.src = image.src;
    galleryImage.alt = image.caption || `Permacultr screenshot ${index + 1}`;
    progressEl.textContent = `${index + 1} / ${images.length}`;
}

// Navigation functions
function nextImage() {
    const newIndex = (currentIndex + 1) % images.length;
    showImage(newIndex);
}

function prevImage() {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(newIndex);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevImage();
    }
});

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextImage();
        } else {
            prevImage();
        }
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initGallery);
