const heroNode = document.querySelector('.hero');
const textNode = heroNode.querySelector('h1');
const shadowOffset = 500;

const handleMouseMove = (evt) => {
  const { offsetWidth: heroWidth, offsetHeight: heroHeight } = heroNode;

  let { offsetX: mouseX, offsetY: mouseY } = evt;

  if (evt.target !== heroNode) {
    mouseX = mouseX + evt.target.offsetLeft;
    mouseY = mouseY + evt.target.offsetTop;
  }

  const shadowOffsetX = Math.round(
    (mouseX / heroWidth) * shadowOffset - shadowOffset / 2
  );
  const shadowOffsexY = Math.round(
    (mouseY / heroHeight) * shadowOffset - shadowOffset / 2
  );

  textNode.style.textShadow = `
      ${shadowOffsetX}px  ${shadowOffsexY}px  0 rgba(255, 0, 255, 0.7),
      ${-shadowOffsetX}px ${shadowOffsexY}px  0 rgba(0, 255, 255, 0.7),
      ${shadowOffsexY}px  ${-shadowOffsetX}px 0 rgba(0, 255, 0, 0.7),
      ${-shadowOffsexY}px ${shadowOffsetX}px  0 rgba(0, 0, 255, 0.7)
    `;
};

heroNode.addEventListener('mousemove', handleMouseMove);
