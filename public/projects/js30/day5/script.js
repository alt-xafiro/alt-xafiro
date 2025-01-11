const panelsNode = document.querySelector('.panels');
const panelNodes = document.querySelectorAll('.panel');

const togglePanel = (evt) => {
  if (evt.target.classList.contains('panel')) {
    evt.preventDefault();
    evt.target.classList.toggle('open');
  }
};

const toggleText = (panelNode) => {
  return (evt) => {
    if (evt.propertyName.includes('flex')) {
      panelNode.classList.toggle('open-active');
    }
  };
};

panelsNode.addEventListener('click', togglePanel);
panelNodes.forEach((panelNode) =>
  panelNode.addEventListener('transitionend', toggleText(panelNode))
);
