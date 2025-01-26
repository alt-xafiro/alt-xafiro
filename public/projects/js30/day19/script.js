const videoNode = document.querySelector('.player');
const takePhotoButtonNode = document.querySelector('.take-photo');
const snapAudioNode = document.querySelector('.snap');
const stripNode = document.querySelector('.strip');
const effectCheckboxNode = document.querySelector('.effect');
const canvasNode = document.querySelector('.photo');

const ctx = canvasNode.getContext('2d', { willReadFrequently: true });

let hasEffect = effectCheckboxNode.checked;

const renderWebcam = () => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((mediaStream) => {
      videoNode.srcObject = mediaStream;
      videoNode.play();
    })
    .catch((err) => {
      console.error(err);
    });
};

const addWebcamEffect = (imageData) => {
  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i + 500] = imageData.data[i + 1];
  }

  return imageData;
};

const renderCanvasWebcam = () => {
  const width = videoNode.videoWidth;
  const height = videoNode.videoHeight;

  canvasNode.width = width;
  canvasNode.height = height;

  return setInterval(
    () => {
      ctx.drawImage(videoNode, 0, 0, width, height);

      if (hasEffect) {
        let imageData = ctx.getImageData(0, 0, width, height);
        imageData = addWebcamEffect(imageData);
        ctx.putImageData(imageData, 0, 0);
      }
    },
    Math.floor(1000 / 60)
  );
};

const playSnapSound = () => {
  snapAudioNode.currentTime = 0;
  snapAudioNode.play();
};

const renderPhoto = (dataURL) => {
  const linkNode = document.createElement('a');

  linkNode.href = dataURL;
  linkNode.setAttribute('download', 'photo');

  linkNode.innerHTML = `<img src="${dataURL}" alt="Photo" />`;
  stripNode.insertBefore(linkNode, stripNode.firstChild);
};

const takePhoto = () => {
  playSnapSound();
  renderPhoto(canvasNode.toDataURL('image/jpeg'));
};

renderWebcam();

effectCheckboxNode.addEventListener(
  'click',
  () => (hasEffect = effectCheckboxNode.checked)
);

videoNode.addEventListener('canplay', () => renderCanvasWebcam());

takePhotoButtonNode.addEventListener('click', () => takePhoto());
