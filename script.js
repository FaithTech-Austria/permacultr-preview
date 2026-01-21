// Gallery Configuration
const images = [
    { src: 'images/1.png', title: 'Get started with Permacultr', subtitle: 'Create a new project, resume an existing one, or import from a file.' },
    { src: 'images/2.png', title: 'Create a new project for your land', subtitle: 'Start a dedicated project to plan and design your land.' },
    { src: 'images/3.png', title: 'Easily draw your area of interest', subtitle: 'Draw your land boundaries directly on the map in seconds.' },
    { src: 'images/4.png', title: 'Get data from your current infrastructure', subtitle: 'View and manage existing infrastructure already on your land.' },
    { src: 'images/5.png', title: 'Integrate data sources', subtitle: 'Combine multiple data sources into one unified map.' },
    { src: 'images/6.png', title: 'Toggle on and off the layers you need for your planning step', subtitle: 'Turn map layers on or off to focus on what matters now.' },
    { src: 'images/7.png', title: 'See how water flows at your land', subtitle: 'Visualize natural water flow across your landscape.' },
    { src: 'images/8.png', title: 'Choose to see only the main streams', subtitle: 'Filter the map to display only major waterways.' },
    { src: 'images/9.png', title: 'Check climatic indicators on the environmental dashboard', subtitle: 'Explore key climate insights for your land in one dashboard.' },
    { src: 'images/10.png', title: 'Print or export the map data you need', subtitle: 'Export or print your maps for fieldwork and planning.' },
    { src: 'images/11.png', title: 'Create custom layers and design your system', subtitle: 'Add your own layers and draw plants, zones, and sections directly on the map.' },
];

let currentIndex = 0;

// DOM Elements
const galleryImage = document.getElementById('gallery-image');
const progressEl = document.getElementById('progress');
const captionTitleEl = document.getElementById('caption-title');
const captionSubtitleEl = document.getElementById('caption-subtitle');

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
    galleryImage.alt = image.title || `Permacultr screenshot ${index + 1}`;
    captionTitleEl.textContent = image.title || '';
    captionSubtitleEl.textContent = image.subtitle || '';
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
