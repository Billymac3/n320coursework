// Billy McIntyre
// N320 Travis Faas

// creates a ball object
class Ball {
  // constructs the position and how fast it is moving
  constructor() {
    this.position = { x: 100, y: 100 };
    this.velocity = { x: 10, y: 0 };
  }

  update() {
    // makes the ball move
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    //   gives the circle an x coordinate, y coordinate, and a diameter
    circle(this.position.x, this.position.y, 20);

    //   says that if the ball goes outside of the walls it will be put back inside of the walls
    if (this.position.x < 0 || this.position.x > 400) {
      World.ballBeyond(this);
    }
  }
}

var World = {
  //   sets initial background color
  bgcolor: [237, 119, 83],
  // creates a box array
  boxes: [],
  // for this array, update the function each time World is run
  update: function() {
    for (var i = 0; i < this.boxes.length; i++) {
      this.boxes[i].update();
    }
  },
  // creates the ball beyond function to apply to *this* whichBall, which references whatever ball has been created
  ballBeyond: function(whichBall) {
    // changes the background color to another random color
    this.bgcolor = [Math.random() * 255, Math.random() * 255, 83];
    //   sets another position for the ball selected
    whichBall.position.x = 100;
    //   increases the velocity to a random number of speed
    whichBall.velocity.x = (Math.random() - 0.5) * 20;
    //   grows the boxes
    for (var i = 0; i < this.boxes.length; i++) {
      this.boxes[i].grow();
    }
  }
};

//class for a box
class Box {
  // construct position
  constructor(x, y) {
    // set position
    this.position = { x: x, y: y };
    // make the size of the box at the beginning
    this.size = 35;
  }

  // update the box, give the box a background color, and make the squares
  update() {
    fill(166, 7, 126);
    square(this.position.x, this.position.y, this.size);
  }

  // makes the squares grow by 5
  grow() {
    this.size += 5;
  }
}

//   creates the ball object
var ball = new Ball();
World.boxes.push(new Box(200, 110));
World.boxes.push(new Box(150, 150));

//   creates the canvas
function setup() {
  createCanvas(400, 300);
}

//   draws the background to the page with the background color selescted from the ballBeyond function
function draw() {
  background(World.bgcolor);

  // invokes the ball update function
  World.update();
  ball.update();
}
