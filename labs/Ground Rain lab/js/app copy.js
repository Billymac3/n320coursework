class Ground {
  // sets starting color
  // start the drop hit count
  constructor(drops) {
    this.y = 275;
    this.x = 0;
    this.drops = drops;
    this.blue = 256;
    this.dropsGone = [];
  }

  // draws rectangle to screen
  update() {
    fill(0, 0, this.blue);
    rect(this.x, this.y, 400, 30);
    this.dropHit();
  }

  // drop hit- called when a rain drop gets low enough (how do you inform it?)
  // change color for every ten rain drops hit
  dropHit() {
    for (var i = 0; i < this.drops.length; i++) {
      if (this.drops[i].y >= 275) {
        if (!containsObject(this.drops[i], this.dropsGone)) {
          this.dropsGone.push(this.drops[i]);

          console.log("This drop has hit.");
          if (this.dropsGone.length % 10 == 0 && this.dropsGone.length != 0) {
            this.blue = this.blue - 20;
            console.log("Color change");
          }
        }
      }
    }
  }
}
//   end of ground class

class Drop {
  constructor() {
    this.x = Math.random() * 400;
    this.y = 0;
  }

  // update() {
  //   this.y++;
  //   fill(0, 0, 200);
  //   circle(this.x, this.y, 5);
  // }

  update() {
    this.y++;
    circle(this.x, this.y, 5);
    // informs that drop has hit the ground
    if (this.y == 280) {
      this.y = 0;
    }
  }
}

//  runs only once before the application starts up
class RainManager {
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

// class Ground {
//   //constructor
//   //set the starting color
//   //start the drop hit count
//   //update - draws the rectangle to the screen
//   //drop hit - called when a rain drop gets low enough (how do you inform it?)
//   //change the color for every ten rain drops hit
// }

//global variables
var RainManager = new RainManager();
var myGround = new Ground(Rainmanager.drops);

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
