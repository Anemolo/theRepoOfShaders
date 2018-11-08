import GIF from "gif.js";

const createGifOnFrame = function(frameInterval, totalFrames) {
  var frames = 0;
  var didRender = false;
  var gif = new GIF({
    workers: 4,
    quality: 40
  });
  gif.on("finished", function(blob) {
    window.open(URL.createObjectURL(blob));
  });
  gif.on("progress", function(p) {
    console.log(Math.round(p * 100), "%");
  });
  return dataURL => {
    if (didRender) return;
    if (frames % frameInterval == 0 && frames < totalFrames) {
      let img2D = new Image();
      // img2D.src = renderer.domElement.toDataURL("img/png");
      img2D.src = dataURL;
      gif.addFrame(img2D, { delay: 15 });
    }
    if (frames >= totalFrames) {
      console.log(didRender);
      gif.render();
      didRender = true;
      console.log(didRender);
    }
    frames++;
  };
};

export default createGifOnFrame;
