const arrowNode = document.querySelector('.arrow');
const speedNode = document.querySelector('.speed-value');

navigator.geolocation.watchPosition(
  (data) => {
    console.log(data);
    speedNode.textContent = data.coords.speed;
    arrowNode.style.transform = `rotate(${data.coords.heading}deg)`;
  },
  (err) => {
    console.error(err);
  }
);
