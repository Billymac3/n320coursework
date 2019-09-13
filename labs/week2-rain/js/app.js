// Billy McIntyre
// N320 Travis Faas

class Ground {
  // sets starting color
  constructor(drops) {
    this.x = 0;
    this.y = 275;
    this.drops = drops;
    this.blue = 13;
    this.dropsGone = [];
  }

  // creates a rectangle to act as the ground
  update() {
    // shows the fill color for the ground and rain
    fill(0, 0, this.blue);
    // creates the ground's size and placement
    rect(this.x, this.y, 400, 15);
    this.dropHit();
  }

  // drop hit- called when a rain drop gets low enough (how do you inform it?)
  dropHit() {
    for (var i = 0; i < this.drops.length; i++) {
      if (this.drops[i].y >= 271) {
        if ((this.drops[i], this.dropsGone)) {
          this.dropsGone.push(this.drops[i]);

          console.log("Splish, Splash");
          // change color for every ten rain drops hit
          if (this.dropsGone.length % 10 == 0 && this.dropsGone.length != 0) {
            this.blue = this.blue + 50;
            console.log(
              "All this Blue Dye falling from the sky has made me, the ground, more blue!!"
            );
          }
        }
      }
    }
  }
}

// spawn location for each rain drop
class Drop {
  constructor() {
    this.x = Math.random() * 400;
    this.y = 0;
  }

  update() {
    this.y++;
    circle(this.x, this.y, 5);
    // informs that drop has hit the ground
    if (this.y == 272) {
      // send the rain drops back to the top after they hit the ground
      this.y = 0;
    }
  }
}

//  runs only once before the application starts up
class rainManager {
  constructor() {
    this.drops = [];
  }

  createDrop() {
    //make a new drop
    var newDrop = new Drop();

    //add this drop to our collection of drops
    this.drops.push(newDrop);
  }

  update() {
    for (var i = 0; i < this.drops.length; i++) {
      this.drops[i].update();
    }
  }
}

//global variables
var RainManager = new rainManager();
var myGround = new Ground(RainManager.drops);

//Run once before the application starts
function setup() {
  createCanvas(400, 300);
}

//runs 60 times a second, or so
function draw() {
  //clear out background
  background(255);

  //create a new drop on a 1% chance
  if (Math.random() < 0.05) {
    RainManager.createDrop();
  }
  myGround.update();
  RainManager.update();
}
