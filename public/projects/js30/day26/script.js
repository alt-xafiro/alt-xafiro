const listNode = document.querySelector('.cool');
const dropdownBackgroundNode = document.querySelector('.dropdownBackground');
const navigationNode = document.querySelector('.top');

const handleMouseEnter = (evt) => {
  if (
    evt.target.tagName !== 'LI' ||
    !evt.target.classList.contains('cool-dropdown')
  ) {
    return;
  }

  evt.target.classList.add('trigger-enter');

  setTimeout(() => {
    if (evt.target.classList.contains('trigger-enter')) {
      evt.target.classList.add('trigger-enter-active');
    }
  }, 150);

  dropdownBackgroundNode.classList.add('open');

  const dropdownNode = evt.target.querySelector('.dropdown');

  const dropdownPropeties = dropdownNode.getBoundingClientRect();
  const navProperties = navigationNode.getBoundingClientRect();

  const width = dropdownPropeties.width;
  const height = dropdownPropeties.height;
  const top = dropdownPropeties.top - navProperties.top;
  const left = dropdownPropeties.left - navProperties.left;

  dropdownBackgroundNode.style.setProperty('width', `${width}px`);
  dropdownBackgroundNode.style.setProperty('height', `${height}px`);
  dropdownBackgroundNode.style.setProperty(
    'transform',
    `translate(${left}px, ${top}px)`
  );
};

const handleMouseLeave = (evt) => {
  if (
    evt.target.tagName !== 'LI' ||
    !evt.target.classList.contains('cool-dropdown')
  ) {
    return;
  }

  evt.target.classList.remove('trigger-enter', 'trigger-enter-active');
  dropdownBackgroundNode.classList.remove('open');
};

listNode.addEventListener('mouseenter', handleMouseEnter, true);
listNode.addEventListener('mouseleave', handleMouseLeave, true);
