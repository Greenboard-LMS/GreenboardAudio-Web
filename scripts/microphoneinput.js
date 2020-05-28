function recordDirectly() {
  if (hasGetUserMedia()) {
    getMedia({ video: true}); // Get MediaStream of audio
  } else {
    alert('getUserMedia() is not supported by your browser');
  }
}

function hasGetUserMedia() {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}

function getMedia(constraints) {
  navigator.mediaDevices.getUserMedia(constraints)
  .then(useStream)
  .catch(function(err) {
    alert("Your audio will not be shared to the browser");
  });
}

function useStream(stream) {
  const video = document.querySelector('video');
  video.srcObject = stream;
  console.log(video.srcObject)
  document.querySelector('button.stop-recording').onclick = () => {
    stream.getVideoTracks().forEach(item => item.stop());
  };
}
