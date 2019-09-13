// Billy McIntyre
// N320 Patterns Lab

// creates the ball and its properties to be instantitated later
class Ball {
  constructor() {
    // declares the starting position of the ball
    this.position = { x: 100, y: 100 };
    // declares that the ball will move at a speed of 10 on the x axis
    this.velocity = { x: 10, y: 0 };
  }

  //
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    circle(this.position.x, this.position.y, 20);

    if (this.position.x < 0 || this.position.x > 400) {
      World.ballBeyond(this);
    }
  }
}

var World = {
  // an array of colors for the background color to rotate through
  bgcolor: [237, 119, 83],
  ballBeyond: function(whichBall) {
    // performs an equation to randomly change the first 2 rgb values of the background color
    this.bgcolor = [Math.random() * 255, Math.random() * 255, 83];
    // stating a starting point for the ball
    whichBall.position.x = 100;
    // determines the random speed of each instance of the ball
    whichBall.velocity.x = (Math.random() - 0.5) * 20;
  }
};

//class for a box
//Grows in size every time a ball hits an edge and is reset
// "For fun": multiple balls

// creates a new instance of the class ball to run in the program
var ball = new Ball();

// creates the space that the program will run inside of
function setup() {
  createCanvas(400, 300);
}

//
function draw() {
  // states the background color for the canvas's background color
  background(World.bgcolor);
  //
  ball.update();
}
