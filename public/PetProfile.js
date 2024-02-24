// carousel.js

const carousel = document.querySelector('.carousel');
const carouselWrapper = document.querySelector('.carousel-wrapper');

let isDown = false;
let startX;
let scrollLeft;

carouselWrapper.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - carouselWrapper.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carouselWrapper.addEventListener('mouseleave', () => {
  isDown = false;
});

carouselWrapper.addEventListener('mouseup', () => {
  isDown = false;
});

carouselWrapper.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carouselWrapper.offsetLeft;
  const walk = (x - startX) * 3; // Adjust speed
  carousel.scrollLeft = scrollLeft - walk;
});
