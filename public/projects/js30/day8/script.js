const canvasNode = document.querySelector('#draw');

canvasNode.width = window.innerWidth - 50;
canvasNode.height = window.innerHeight - 50;

const ctx = canvasNode.getContext('2d');

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;

let isDrawing = false;
let isIncreasing = true;
let x;
let y;
let hue = 0;

const draw = (evt) => {
  if (!isDrawing) return;

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(evt.offsetX, evt.offsetY);
  ctx.stroke();

  [x, y] = [evt.offsetX, evt.offsetY];

  hue = hue >= 360 ? 0 : hue + 1;

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    isIncreasing = !isIncreasing;
  }

  ctx.lineWidth = isIncreasing ? ctx.lineWidth + 1 : ctx.lineWidth - 1;
};

canvasNode.addEventListener('mousemove', draw.bind());
canvasNode.addEventListener('mouseup', () => (isDrawing = false));
canvasNode.addEventListener('mousedown', (evt) => {
  isDrawing = true;
  [x, y] = [evt.offsetX, evt.offsetY];
});
