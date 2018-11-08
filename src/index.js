import * as three from "three";
import shaders from "./shaders/index.js";
import createGifOnFrame from "./createGif";

// Type name of the shader you want to see
const shaderName = "lines";

// If you want a gif, set this to true and make your animation loop in 120frames
const takeGif = false;

const gifOnFrame = takeGif ? createGifOnFrame(1, 120) : null;

var container;
var camera, scene, renderer;
var uniforms, material, mesh;

init();
animate();

function init() {
  console.log("initing");
  container = document.getElementById("container");

  camera = new three.Camera();
  camera.position.z = 1;

  scene = new three.Scene();

  var geometry = new three.PlaneBufferGeometry(2, 2);

  uniforms = {
    u_time: { type: "f", value: 0 },
    u_resolution: { type: "v2", value: new three.Vector2() },
    u_mouse: { type: "v2", value: new three.Vector2() }
  };

  material = new three.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shaders[shaderName].vertex,
    fragmentShader: shaders[shaderName].fragment
  });
  mesh = new three.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new three.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  onWindowResize();
  window.addEventListener("resize", onWindowResize, false);

  document.onmousemove = function(e) {
    uniforms.u_mouse.value.x = e.pageX;
    uniforms.u_mouse.value.y = e.pageY;
  };
}

function onWindowResize() {
  renderer.setSize(window.innerHeight, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}
var frames = 0;
var frameInterval = 1;
var totalFrames = 120;
var r = false;
function animate() {
  requestAnimationFrame(animate);
  render();
  if (gifOnFrame) gifOnFrame(renderer.domElement.toDataURL("img/png"));
  // if (frames >= totalFrames && !r) {
  //   gif.render();
  //   r = true;
  // }
  // frames++;
}

function render() {
  uniforms.u_time.value += 0.05;
  renderer.render(scene, camera);
  // if (frames % frameInterval == 0 && !r && frames < totalFrames) {
  //   console.log("adding", frames, uniforms.u_time.value);
  //   var img2D = new Image();
  //   img2D.src = renderer.domElement.toDataURL("img/png");
  //   gif.addFrame(img2D, { delay: 15 });
  // }
}

if (module.hot) {
  module.hot.accept(["./shaders/index.js"], function() {
    console.log("Accepting the updated printMe module!");
    if (material) {
      material.vertexShader = shaders[shaderName].vertex;
      material.fragmentShader = shaders[shaderName].fragment;
      material.needsUpdate = !material.needsUpdate;
    }
  });
}
