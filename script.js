
const carousel = document.querySelector('.carousel');
const dots = document.querySelectorAll('.dot');
const cards = document.querySelectorAll('.card');

let currentIndex = 0;
let startX;

function updateCarousel(index) {
    currentIndex = index;
    const offset = -index * 108.5;
    carousel.style.transform = `translateX(${offset}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    cards.forEach((card, i) => {
        card.classList.toggle('blur', i !== index);
    });
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        updateCarousel(index);
    });
});

function nextCard() {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= cards.length) {
        nextIndex = 0;
    }
    updateCarousel(nextIndex);
}

function previousCard() {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
        prevIndex = cards.length - 1;
    }
    updateCarousel(prevIndex);
}

carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
        nextCard();
    } else if (startX < endX - 50) {
        previousCard();
    }
});

setInterval(nextCard, 3000); // Change the card every 3 seconds
