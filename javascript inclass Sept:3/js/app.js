class energy {
  constructor() {
    this.amount = 100;
  }

  running() {
    this.amount--;
  }
}

class tired {
  constructor(energy) {
    this.energy = energy;
    this.sleepy = 0;
  }

  getSleepy() {
    this.energy.running();
    this.sleepy++;
  }
}

let myEnergy = new energy();
let myTired = new tired(myEnergy);
myTired.getSleepy();
