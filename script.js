// Gallery Configuration
// Add your images here with optional captions
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
const imageCaption = document.getElementById('image-caption');
const currentIndexEl = document.getElementById('current-index');
const totalImagesEl = document.getElementById('total-images');
const dotsContainer = document.getElementById('dots');

// Initialize gallery
function initGallery() {
    if (images.length === 0) {
        showNoImages();
        return;
    }

    totalImagesEl.textContent = images.length;
    createDots();
    showImage(0);
}

// Create navigation dots
function createDots() {
    dotsContainer.innerHTML = '';
    images.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.setAttribute('aria-label', `Go to image ${index + 1}`);
        dot.onclick = () => goToImage(index);
        dotsContainer.appendChild(dot);
    });
}

// Show specific image
function showImage(index) {
    if (images.length === 0) return;

    currentIndex = index;
    const image = images[index];

    galleryImage.src = image.src;
    galleryImage.alt = image.caption || `Permacultr screenshot ${index + 1}`;
    imageCaption.textContent = image.caption || '';
    currentIndexEl.textContent = index + 1;

    // Update dots
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
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

function goToImage(index) {
    showImage(index);
}

// Show no images message
function showNoImages() {
    const wrapper = document.querySelector('.image-wrapper');
    wrapper.innerHTML = `
        <div class="no-images">
            <h2>No images yet</h2>
            <p>Add your screenshots to the images folder and update script.js</p>
        </div>
    `;
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

// Click on image to go to next
galleryImage?.addEventListener('click', nextImage);

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
            nextImage(); // Swipe left = next
        } else {
            prevImage(); // Swipe right = prev
        }
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initGallery);
