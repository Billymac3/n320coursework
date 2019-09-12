class vehicle {
  constructor(brand, name, color) {
    this.brand = brand;
    this.name = name;
    this.color = color;
  }
}

// Travis's example code
class Noodle {
  constructor(wigglyness) {
    this.wigglyness = wigglyness;
  }
}

class snek extends Noodle {
  constructor(wigglyness) {
    super(wigglyness);
    this.name = "Snek";
  }

  wiggle() {
    this.wigglyness--;

    if (this.wigglyness < 0) {
      console.log(this.name + " hisses!");
    }
  }
}

var mySnake = new snek(5);

for (var i = 0; i < 10; i++) {
  console.log("wiggling snake");
  mySnake.wiggle();
}
