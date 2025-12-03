import { Gameboard } from "./gameboard";
class Player {
  #type;
  #gameboard;

  constructor(t) {
    this.#type = t;
    this.#gameboard = new Gameboard();
  }

  get getType() {
    return this.#type;
  }

  get getGameBoard() {
    return this.#gameboard;
  }
}

export { Player };
