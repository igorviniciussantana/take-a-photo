var constraints = { video: { facingMode: "user" }, audio: false };

const cameraView = document.querySelector("#camera--view"),
  cameraOutput = document.querySelector("#camera--output"),
  cameraSensor = document.querySelector("#camera--sensor"),
  cameraTrigger = document.querySelector("#camera--trigger"),
  cameraChange = document.querySelector("#camera--change");

function cameraStart() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      track = stream.getTracks()[0];
      cameraView.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Oops. Something is broken.", error);
    });
}

cameraTrigger.onclick = function () {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor.toDataURL("image/webp");
  cameraOutput.classList.add("taken");
};

cameraChange.onclick = function () {
  if (constraints.video.facingMode == "user") {
    constraints.video.facingMode = "environment";
    cameraView.style.cssText = "transform: scaleX(1)";
    cameraOutput.style.cssText = "transform: scaleX(1)";
    cameraSensor.style.cssText = "transform: scaleX(1)";
  } else if (constraints.video.facingMode == "environment") {
    constraints.video.facingMode = "user";
    cameraView.style.cssText = "transform: scaleX(-1)";
    cameraOutput.style.cssText = "transform: scaleX(-1)";
    cameraSensor.style.cssText = "transform: scaleX(-1)";
  }

  cameraStart();
};

window.addEventListener("load", cameraStart, false);
