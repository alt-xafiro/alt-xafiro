const linkNodes = document.querySelectorAll('a');

const highlightNode = document.createElement('span');
highlightNode.classList.add('highlight');
document.body.appendChild(highlightNode);

const handleLinkMouseEnter = (evt) => {
  const linkData = evt.target.getBoundingClientRect();
  const width = linkData.width;
  const height = linkData.height;
  const top = linkData.top + window.scrollY;
  const left = linkData.left + window.scrollX;

  highlightNode.style.width = `${width}px`;
  highlightNode.style.height = `${height}px`;
  highlightNode.style.transform = `translate(${left}px, ${top}px)`;
};

linkNodes.forEach((a) =>
  a.addEventListener('mouseenter', handleLinkMouseEnter)
);
