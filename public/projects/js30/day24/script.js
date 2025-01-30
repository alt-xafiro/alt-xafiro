const navigationNode = document.querySelector('#main');
let navigationTop = navigationNode.offsetTop;

function handleWindowScroll() {
  if (window.scrollY >= navigationTop) {
    document.body.style.paddingTop = `${navigationNode.offsetHeight}px`;
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}

window.addEventListener('scroll', handleWindowScroll);
