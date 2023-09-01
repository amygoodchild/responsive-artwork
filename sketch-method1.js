// Dimension calculations 

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
  strokeWeight(artCircle.strokeWeight);
  ellipse(artCircle.pos.x, artCircle.pos.y, artCircle.width);

  rs.ready = true;
  checkIfResizeNeeded();
}

function createArt(){
  // Every dimension is written as a multiple of a canvas dimension
  artCircle = {
    pos: sz.center,
    width: sz.minDim * 0.7,
    strokeWeight: sz.w * 0.003
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

  // Round down to the nearest pixel so we have whole numbers
  sz.w = Math.floor(sz.w);
  sz.h = Math.floor(sz.h);

  // Useful to have
  sz.center = {x: sz.w * 0.5, y: sz.h * 0.5}
  sz.minDim = min(sz.w, sz.h);
  sz.maxDim = max(sz.w, sz.h);

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

  // Regenerate at new size 
  // **IMPORTANT: You must reset the random seed before regenerating**
  createArt();

}

// Event called whenever the browser window is resized
function resizeDetected() {
  rs.time = millis();
  rs.needed = true;
}

window.addEventListener('resize', resizeDetected);