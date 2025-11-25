class Ship {
  #length;
  #timesBeenHit;
  #sunk;

  constructor(l, tbh, s) {
    this.#length = l;
    this.#timesBeenHit = tbh;
    this.#sunk = s;
  }

  get getLength() {
    return this.#length;
  }

  get getTBH() {
    return this.#timesBeenHit;
  }

  get getSunk() {
    return this.#sunk;
  }

  hit() {
    this.#timesBeenHit += 1;
    this.#isSunk();
  }

  #isSunk() {
    if (this.#timesBeenHit === this.#length) {
      this.#sunk = true;
    }
  }
}

export { Ship };
