//Create the class for the ships
class Ship {
  #length; //Length of the ship
  #timesBeenHit; //How many times it has receive a hit
  #sunk; //Store if the ship has been sunk

  //Constructor
  constructor(l, tbh, s) {
    this.#length = l;
    this.#timesBeenHit = tbh;
    this.#sunk = s;
  }

  //Returns the length
  get getLength() {
    return this.#length;
  }

  //Returns how many times it has been hit
  get getTBH() {
    return this.#timesBeenHit;
  }

  //Returns if the ship has been sunk
  get getSunk() {
    return this.#sunk;
  }

  //Function that receives a hit
  hit() {
    //Increase the times it has been hit
    this.#timesBeenHit += 1;
    //Check if it has been sunk
    this.#isSunk();
  }

  //Function that checks if the ship has been sunk
  #isSunk() {
    //Check if the times it has been hit is equal to its length
    if (this.#timesBeenHit === this.#length) {
      //The ship has been sunk
      this.#sunk = true;
    }
  }
}

export { Ship };
