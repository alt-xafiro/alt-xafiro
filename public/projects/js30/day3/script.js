'use strict';

const inputNodes = document.querySelectorAll('input');

for (let node of inputNodes) {
  node.addEventListener('input', () =>
    document.documentElement.style.setProperty(
      `--${node.name}`,
      `${node.value}${node.dataset.sizing ?? ''}`
    )
  );
}
