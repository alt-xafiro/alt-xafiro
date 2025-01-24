const timeNodes = document.querySelectorAll('[data-time]');

const totalTime = [...timeNodes]
  .map((node) => node.dataset.time)
  .map((time) => {
    const [min, sec] = time.split(':').map((el) => +el);
    return min * 60 + sec;
  })
  .reduce((acc, time) => acc + time, 0);

let seconds;

const hours = Math.floor(totalTime / 3600);
seconds = totalTime % 3600;

const minutes = Math.floor(seconds / 60);
seconds = seconds % 60;

console.group('Total time');
console.log('Hours:', hours);
console.log('Minutes:', minutes);
console.log('Seconds:', seconds);
console.groupEnd();
