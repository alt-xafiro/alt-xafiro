const sliderNode = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

sliderNode.addEventListener('mousedown', (evt) => {
  isDown = true;
  sliderNode.classList.add('active');
  startX = evt.pageX - sliderNode.offsetLeft;
  scrollLeft = sliderNode.scrollLeft;
});

sliderNode.addEventListener('mouseup', () => {
  isDown = false;
  sliderNode.classList.remove('active');
});

sliderNode.addEventListener('mousemove', (evt) => {
  if (!isDown) return;

  evt.preventDefault();

  sliderNode.scrollLeft =
    scrollLeft - evt.pageX + sliderNode.offsetLeft + startX;
});
