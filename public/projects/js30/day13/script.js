const imageNodes = document.querySelectorAll('img');

const showImage = (imageNode) => {
  if (
    window.scrollY + window.innerHeight - imageNode.height / 3 >
    imageNode.offsetTop
  ) {
    imageNode.classList.add('active');
  }
};

const showImages = () => {
  imageNodes.forEach((imageNode) => {
    showImage(imageNode);
  });
};

const handleScroll = () => {
  showImages();
};

showImages();
window.addEventListener('scroll', handleScroll);
