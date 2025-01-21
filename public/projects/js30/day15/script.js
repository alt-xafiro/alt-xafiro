const addItemsNode = document.querySelector('.add-items');
const clearItemsNode = document.querySelector('.clear-items');
const itemsListNode = document.querySelector('.plates');

let items = JSON.parse(localStorage.getItem('items')) || [];

const handleAddItemsClick = (evt) => {
  evt.preventDefault();

  const item = {
    text: addItemsNode.querySelector('[name=item]').value,
    done: false
  };

  items.push(item);
  renderItems();
  updateLocalStorage();
  addItemsNode.reset();
};

const handleClearItemsClick = () => {
  items = [];
  itemsListNode.innerHTML = '';
  localStorage.clear();
};

const handleItemsListClick = (evt) => {
  if (!evt.target.matches('input')) return;

  const targetNode = evt.target;

  const index = targetNode.dataset.index;
  items[index].done = !items[index].done;

  renderItems();
  updateLocalStorage();
};

const renderItems = () => {
  itemsListNode.innerHTML = items
    .map((plate, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
          <label for="item${i}">${plate.text}</label>
        </li>
      `;
    })
    .join('');
};

const updateLocalStorage = () => {
  localStorage.setItem('items', JSON.stringify(items));
};

addItemsNode.addEventListener('submit', handleAddItemsClick);
clearItemsNode.addEventListener('click', handleClearItemsClick);
itemsListNode.addEventListener('click', handleItemsListClick);

renderItems();
