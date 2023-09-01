// Normalised dimensions scaled in p5js

let sz = {};
let rs = {
  delay: 300,
  needed: false,
  ready: false,
  time: 0
};

let artCircle = {};

function setup() {
  chooseFeatures();
  calculateCanvasSize();

  createArt();
  
  createCanvas(sz.w, sz.h);
  background(220);
}

function draw() {
  scale(sz.f.x, sz.f.y)

  strokeWeight(artCircle.strokeWeight);
  ellipse(artCircle.pos.x, artCircle.pos.y, artCircle.width);

  rs.ready = true;
  checkIfResizeNeeded();

}

function createArt(){
  // Every dimension is based on a 1000px canvas and scaled later
  artCircle = {
    pos: {x: sz.ncenter.x, y: sz.ncenter.y},
    width: 460,
    strokeWeight: 3
  }
}

function calculateCanvasSize(){
  // Set up the canvas size based on the window size and ratio 
  sz.w = window.innerWidth;
  sz.h = sz.w * sz.ratio;

  // If the canvas height is too big, work things out the other way around
  if(sz.h > window.innerHeight){
    sz.h = window.innerHeight;
    sz.w = sz.h / sz.ratio;
  }

  // Normalised dimensions
  sz.nw = 1000;
  sz.nh = sz.nw * sz.ratio;

  if (sz.nh > 1000) {
    sz.nh = 1000;
    sz.nw = sz.nh / sz.ratio;
  }

  // Scale factor
  sz.f = {
    x: sz.w / sz.nw,
    y: sz.h / sz.nh
  }

  // Round down to the nearest pixel so we have whole numbers
  sz.w = Math.floor(sz.w);
  sz.h = Math.floor(sz.h);

  // Useful to have 
  sz.center = {x: sz.w * 0.5, y: sz.h * 0.5};
  sz.ncenter = {x: sz.nw * 0.5, y: sz.nh * 0.5};

  console.log(sz)

}


function chooseFeatures(){
  // Choose a ratio for this output
  //let ratioOptions = [0.75, 1.333];
  //sz.ratio = random(ratioOptions);  

  sz.ratio = 1.5;

  // Set other features here (palette etc)
  // ...
}

function checkIfResizeNeeded(){
  if (rs.needed && rs.ready){
    if (rs.time + rs.delay < millis()){
      handleResize();
    }
  }
}

// Handle resizing and regenerating image
function handleResize(){
  // Reset variables 
  rs.needed = false;
  rs.ready = false;

  // Resize the canvas 
  calculateCanvasSize();
  resizeCanvas(sz.w, sz.h);

  // Set things up to draw again 
  clear();
  background(220);

}

// Event called whenever the browser window is resized
function resizeDetected() {
  rs.time = millis();
  rs.needed = true;
}

window.addEventListener('resize', resizeDetected);
